const STORAGE_KEY = "gh_uid";

export function getBrowserUid(): string {
  if (typeof window === "undefined") return "";
  let uid = localStorage.getItem(STORAGE_KEY);
  if (!uid) {
    uid = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(STORAGE_KEY, uid);
  }
  return uid;
}
