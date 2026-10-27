import { describe, expect, it } from "vitest";
import { arrivalSlots, availableSlots, bookingMessage, bookingSchema, tashkentNow, telegramBookingUrl, type BookingValues } from "@/lib/booking";

const valid: BookingValues = { name: "O‘tkir", phone: "+998 (90) 123-45-67", date: "2026-10-27", time: "14:00", guests: "4", note: "Oilaviy dasturxon" };
const now = new Date("2026-10-27T06:46:00Z");
describe("Reservation rules", () => {
  it("offers only half-hour arrivals 08:00 through 23:30, never midnight", () => {
    expect(arrivalSlots).toHaveLength(32);
    expect(arrivalSlots[0]).toBe("08:00");
    expect(arrivalSlots.at(-1)).toBe("23:30");
    expect(arrivalSlots).not.toContain("00:00");
  });
  it("uses Tashkent date through the midnight boundary", () => {
    expect(tashkentNow(new Date("2026-10-27T19:00:00Z"))).toEqual({ date: "2026-10-28", seconds: 0 });
    expect(availableSlots("2026-10-27", new Date("2026-10-27T18:30:01Z"))).toEqual([]);
    expect(availableSlots("2026-10-28", new Date("2026-10-27T19:00:00Z"))[0]).toBe("08:00");
  });
  it("rejects past dates and times and revalidates after midnight", () => {
    expect(bookingSchema(now).safeParse({ ...valid, date: "2026-10-26" }).success).toBe(false);
    expect(bookingSchema(now).safeParse({ ...valid, time: "11:30" }).success).toBe(false);
    expect(bookingSchema(new Date("2026-10-27T19:00:00Z")).safeParse(valid).success).toBe(false);
    expect(bookingSchema(now).safeParse(valid).success).toBe(true);
  });
  it.each(["", "0", "8+", "1.5", "-2"])("rejects non-exact positive guest count %s", (guests) => {
    expect(bookingSchema(now).safeParse({ ...valid, guests }).success).toBe(false);
  });
  it("accepts exact large groups without invented capacity", () => {
    expect(bookingSchema(now).safeParse({ ...valid, guests: "250" }).success).toBe(true);
  });
  it("validates names, Uzbekistan phones and 300-character notes", () => {
    expect(bookingSchema(now).safeParse({ ...valid, name: "   " }).success).toBe(false);
    expect(bookingSchema(now).safeParse({ ...valid, name: "Зоҳид" }).success).toBe(true);
    expect(bookingSchema(now).safeParse({ ...valid, phone: "+99890" }).success).toBe(false);
    expect(bookingSchema(now).safeParse({ ...valid, note: "a".repeat(301) }).success).toBe(false);
  });
  it("uses the exact booking recipient and encodes real Uzbek text", () => {
    const url = new URL(telegramBookingUrl(valid));
    expect(url.origin + url.pathname).toBe("https://t.me/+998941963154");
    expect(url.searchParams.get("text")).toBe(bookingMessage(valid));
    expect(bookingMessage(valid)).toContain("Mehmonlar soni: 4 kishi");
    expect(bookingMessage(valid)).toContain("Telefon: +998 90 123 45 67");
    expect(bookingMessage({ ...valid, note: "" })).not.toContain("Qo‘shimcha izoh:");
  });
});