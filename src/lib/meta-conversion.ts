const CONVERSION_WORKER_URL = process.env.NEXT_PUBLIC_META_CONVERSION_WORKER_URL;

export function generateEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackConversion(
  eventName: string,
  eventId: string,
  customData?: Record<string, unknown>,
  phone?: string
) {
  window.fbq?.("track", eventName, customData, { eventID: eventId });

  if (!CONVERSION_WORKER_URL) return;

  fetch(`${CONVERSION_WORKER_URL}/meta-conversion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: customData,
      phone,
    }),
  }).catch(() => {});
}
