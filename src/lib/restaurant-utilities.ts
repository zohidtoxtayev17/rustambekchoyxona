export const FAVORITES_KEY = "rustambek-favorites";

export function isRestaurantOpen(now: Date): boolean {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tashkent",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(now);
  return Number(hour) >= 8;
}

export function parseFavorites(value: string | null, validIds: string[]): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((id): id is string => typeof id === "string" && validIds.includes(id)))];
  } catch {
    return [];
  }
}

export function toggleFavorite(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}