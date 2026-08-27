export interface Env {
  META_PIXEL_ID: string;
  META_CONVERSION_API_TOKEN: string;
  ALLOWED_ORIGIN: string;
}

interface ConversionRequestBody {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  phone?: string;
}

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return digits.startsWith("880") ? digits : `880${digits.replace(/^0/, "")}`;
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const headers = corsHeaders(env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    let body: ConversionRequestBody;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers });
    }

    const { event_name, event_id, event_source_url, custom_data, phone } = body;
    if (!event_name || !event_id) {
      return new Response("event_name and event_id required", { status: 400, headers });
    }

    const clientIp = request.headers.get("cf-connecting-ip") ?? undefined;
    const userAgent = request.headers.get("user-agent") ?? undefined;

    const userData: Record<string, unknown> = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };

    const normalizedPhone = phone ? normalizePhone(phone) : null;
    if (normalizedPhone) {
      userData.ph = [await sha256Hex(normalizedPhone)];
    }

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          event_source_url,
          action_source: "website",
          user_data: userData,
          custom_data,
        },
      ],
    };

    const metaRes = await fetch(
      `https://graph.facebook.com/v21.0/${env.META_PIXEL_ID}/events?access_token=${env.META_CONVERSION_API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!metaRes.ok) {
      const text = await metaRes.text();
      return new Response(text, { status: 502, headers });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", ...headers },
    });
  },
} satisfies ExportedHandler<Env>;
