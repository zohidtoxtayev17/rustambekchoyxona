import { z } from "zod";
import { booking } from "@/config/booking";

export type BookingValues = { name: string; phone: string; date: string; time: string; guests: string; note: string };
export const emptyBooking: BookingValues = { name: "", phone: "", date: "", time: "", guests: "", note: "" };

export function tashkentNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: booking.timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, seconds: Number(get("hour")) * 3600 + Number(get("minute")) * 60 + Number(get("second")) };
}

export const arrivalSlots = Array.from({ length: 32 }, (_, index) => {
  const minutes = 480 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export function availableSlots(date: string, now: Date) {
  const current = tashkentNow(now);
  if (!date || date < current.date) return [];
  return arrivalSlots.filter((slot) => date > current.date || Number(slot.slice(0, 2)) * 3600 + Number(slot.slice(3)) * 60 >= current.seconds);
}

export function bookingSchema(now: Date) {
  return z.object({
    name: z.string().trim().min(1, "Iltimos, ismingizni kiriting.").max(100, "Ismingiz 100 belgidan oshmasin.").regex(/^[\p{L}\p{M}\s‘’ʻʼ'`.\-]+$/u, "Ismingizni to‘g‘ri kiriting."),
    phone: z.string().trim().regex(/^[+\d\s()\-]+$/, "Telefon raqamingizni to‘g‘ri kiriting.").refine((phone) => /^\+998\d{9}$/.test(phone.replace(/[\s()\-]/g, "")), "Telefon raqamingizni to‘g‘ri kiriting."),
    date: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date && date >= tashkentNow(now).date, "Bugungi yoki keyingi sanani tanlang."),
    time: z.string(),
    guests: z.string().regex(/^[1-9]\d*$/, "Mehmonlar sonini tanlang.").refine((value) => Number.isSafeInteger(Number(value)), "Mehmonlar sonini to‘g‘ri kiriting."),
    note: z.string().trim().max(booking.noteLimit, "Izoh 300 belgidan oshmasin."),
  }).superRefine((values, context) => {
    if (!availableSlots(values.date, now).includes(values.time)) context.addIssue({ code: z.ZodIssueCode.custom, path: ["time"], message: "Kelish uchun amaldagi vaqtni tanlang." });
  });
}

export function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("uz-Latn-UZ", { timeZone: booking.timeZone, day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00Z`));
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}

export function bookingMessage(values: BookingValues) {
  return ["JOY BAND QILISH SO‘ROVI", "", "Assalomu alaykum!", "", "Rustambek Choyxonadan joy band qilmoqchiman.", "", `Ism: ${values.name.trim()}`, `Telefon: ${formatPhone(values.phone)}`, `Sana: ${formatBookingDate(values.date)}`, `Vaqt: ${values.time}`, `Mehmonlar soni: ${values.guests} kishi`, ...(values.note.trim() ? [`Qo‘shimcha izoh: ${values.note.trim()}`] : []), "", "Iltimos, shu sana va vaqtda bo‘sh joy borligini tasdiqlang."].join("\n");
}

export function telegramBookingUrl(values: BookingValues) {
  return `https://t.me/${booking.recipient}?text=${encodeURIComponent(bookingMessage(values))}`;
}