import { timingSafeEqual as nodeTimingSafeEqual } from "node:crypto";

export interface Env {
  ALLOWED_ORIGIN: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface Settings {
  metaPixelId: string;
  metaConversionApiToken: string;
  bizmationApiToken: string;
  bizmationInventoryId: string;
  missingOrdersApiKey1: string;
  missingOrdersApiKey2: string;
}

interface MetaConversionBody {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  phone?: string;
}

interface SupabaseOrderRow {
  id: string;
  package_name: string;
  quantity: number;
  unit_price: number;
  delivery_fee: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  notes: string | null;
  created_at: string;
}

function supabaseHeaders(env: Env): Record<string, string> {
  return {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

async function loadSettings(env: Env): Promise<Settings> {
  const [mediaRes, secretsRes] = await Promise.all([
    fetch(`${env.SUPABASE_URL}/rest/v1/site_media?select=key,value&key=eq.meta_pixel_id`, {
      headers: supabaseHeaders(env),
    }),
    fetch(`${env.SUPABASE_URL}/rest/v1/site_secrets?select=key,value`, {
      headers: supabaseHeaders(env),
    }),
  ]);

  const mediaRows = mediaRes.ok ? ((await mediaRes.json()) as { key: string; value: string }[]) : [];
  const secretRows = secretsRes.ok ? ((await secretsRes.json()) as { key: string; value: string }[]) : [];

  const lookup = new Map<string, string>();
  for (const row of [...mediaRows, ...secretRows]) lookup.set(row.key, row.value);

  return {
    metaPixelId: lookup.get("meta_pixel_id") || "",
    metaConversionApiToken: lookup.get("meta_conversion_api_token") || "",
    bizmationApiToken: lookup.get("bizmation_api_token") || "",
    bizmationInventoryId: lookup.get("bizmation_inventory_id") || "",
    missingOrdersApiKey1: lookup.get("missing_orders_api_key_1") || "",
    missingOrdersApiKey2: lookup.get("missing_orders_api_key_2") || "",
  };
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

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return nodeTimingSafeEqual(aBuf, bBuf);
}

function formatTimestamp(iso: string): string {
  return iso.replace("T", " ").split(".")[0].split("+")[0];
}

async function handleMetaConversion(
  request: Request,
  settings: Settings,
  headers: Record<string, string>
): Promise<Response> {
  let body: MetaConversionBody;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers });
  }

  const { event_name, event_id, event_source_url, custom_data, phone } = body;
  if (!event_name || !event_id) {
    return new Response("event_name and event_id required", { status: 400, headers });
  }

  if (!settings.metaPixelId || !settings.metaConversionApiToken) {
    return new Response("Meta Pixel not configured", { status: 500, headers });
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
    `https://graph.facebook.com/v21.0/${settings.metaPixelId}/events?access_token=${settings.metaConversionApiToken}`,
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
}

async function handleBizmationProxy(
  request: Request,
  settings: Settings,
  headers: Record<string, string>,
  bizmationPath: string
): Promise<Response> {
  if (!settings.bizmationApiToken || !settings.bizmationInventoryId) {
    return new Response("BizMation not configured", { status: 500, headers });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers });
  }

  const payload = {
    ...body,
    inventory_id: Number(settings.bizmationInventoryId),
    user_ip: request.headers.get("cf-connecting-ip") ?? undefined,
    user_agent: request.headers.get("user-agent") ?? undefined,
  };

  const res = await fetch(`https://api.bizmation.io/api${bizmationPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${settings.bizmationApiToken}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

async function handleMissingOrders(request: Request, env: Env, settings: Settings): Promise<Response> {
  const url = new URL(request.url);
  const api1 = url.searchParams.get("api_1") ?? "";
  const api2 = url.searchParams.get("api_2") ?? "";

  if (
    !settings.missingOrdersApiKey1 ||
    !settings.missingOrdersApiKey2 ||
    !safeEqual(api1, settings.missingOrdersApiKey1) ||
    !safeEqual(api2, settings.missingOrdersApiKey2)
  ) {
    return new Response(JSON.stringify({ success: false, code: 401, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const skip = url.searchParams.get("skip");
  const take = url.searchParams.get("take") ?? "30";
  const after = url.searchParams.get("after");
  const before = url.searchParams.get("before");

  const supabaseUrl = new URL(`${env.SUPABASE_URL}/rest/v1/orders`);
  supabaseUrl.searchParams.set("select", "*");
  supabaseUrl.searchParams.set("order", "created_at.desc");
  supabaseUrl.searchParams.set("limit", take);
  if (skip) supabaseUrl.searchParams.set("offset", skip);
  if (after) supabaseUrl.searchParams.append("created_at", `gte.${after}`);
  if (before) supabaseUrl.searchParams.append("created_at", `lte.${before}`);

  const supabaseRes = await fetch(supabaseUrl, { headers: supabaseHeaders(env) });

  if (!supabaseRes.ok) {
    const text = await supabaseRes.text();
    return new Response(JSON.stringify({ success: false, code: 502, message: text }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rows = (await supabaseRes.json()) as SupabaseOrderRow[];

  const data = rows.map((o) => ({
    reference_no: o.id,
    created_at: formatTimestamp(o.created_at),
    name: o.customer_name,
    mobile_number: o.customer_phone,
    address: o.customer_address,
    shipping_charge: o.delivery_fee,
    discount: 0,
    paid_amount: 0,
    note: o.notes,
    order_items: [
      {
        product_title: o.package_name,
        price: o.unit_price,
        quantity: o.quantity,
      },
    ],
  }));

  return new Response(JSON.stringify({ success: true, code: 200, message: "Data fetched Success.", data }), {
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const headers = corsHeaders(env.ALLOWED_ORIGIN);
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (pathname === "/missing-orders" && request.method === "GET") {
      const settings = await loadSettings(env);
      return handleMissingOrders(request, env, settings);
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    if (pathname === "/meta-conversion") {
      const settings = await loadSettings(env);
      return handleMetaConversion(request, settings, headers);
    }

    if (pathname === "/bizmation/order") {
      const settings = await loadSettings(env);
      return handleBizmationProxy(request, settings, headers, "/orders/store");
    }

    if (pathname === "/bizmation/failed-order") {
      const settings = await loadSettings(env);
      return handleBizmationProxy(request, settings, headers, "/orders/custom-ft");
    }

    return new Response("Not found", { status: 404, headers });
  },
} satisfies ExportedHandler<Env>;
