import { getSupabaseClient } from "@/lib/supabase";
import { MEDIA_KEYS } from "./media-keys";

const DEFAULTS: Record<string, string> = Object.fromEntries(
  MEDIA_KEYS.map((k) => [k.key, k.fallback])
);

export async function fetchSiteMedia(): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ...DEFAULTS };

  const { data, error } = await supabase.from("site_media").select("key, value");
  if (error || !data) return { ...DEFAULTS };

  const result = { ...DEFAULTS };
  for (const row of data as { key: string; value: string }[]) {
    if (row.value) result[row.key] = row.value;
  }
  return result;
}
