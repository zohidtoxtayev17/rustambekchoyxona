import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { uz, enGB } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CalendarDays, Copy, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking } from "@/config/booking";
import { restaurant } from "@/config/restaurant";
import { availableSlots, bookingMessage, bookingSchema, emptyBooking, formatBookingDate, formatPhone, tashkentNow, telegramBookingUrl, type BookingValues } from "@/lib/booking";
import { Reveal, telHref } from "./common";

const fieldClass = "h-12 bg-card text-base md:text-base focus-visible:ring-gold";
const confirmationNote = "Bandlov xodimimiz tasdiqlaganidan keyin kuchga kiradi.";

export function ReservationSection() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [now, setNow] = useState<Date | null>{t('(null);\n  const [calendarOpen, setCalendarOpen] = useState(false);\n  const [eightPlus, setEightPlus] = useState(false);\n  const [copyStatus, setCopyStatus] = useState("");\n  const [manualCopy, setManualCopy] = useState(false);\n  const summaryRef = useRef')}<HTMLHeadingElement>{t('(null);\n  const copyRef = useRef')}<HTMLTextAreaElement>(null);
  const { register, watch, getValues, setValue, setError, clearErrors, setFocus, formState: { errors } } = useForm<BookingValues>({ defaultValues: emptyBooking });
  const values = watch();
  const current = now ? tashkentNow(now) : null;
  const slots = now ? availableSlots(values.date, now) : [];

  useEffect(() => {
    if (!open) return;
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, [open]);

  useEffect(() => {
    if (step === 2 && open) summaryRef.current?.focus();
  }, [step, open]);

  useEffect(() => {
    if (manualCopy) { copyRef.current?.focus(); copyRef.current?.select(); }
  }, [manualCopy]);

  const validate = () => {
    clearErrors();
    const result = bookingSchema(new Date(), language).safeParse(getValues());
    if (!result.success) {
      const reported = new Set<string>();
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BookingValues;
        if (!reported.has(field)) setError(field, { type: "validate", message: issue.message });
        reported.add(field);
      }
      setStep(1);
      const field = result.error.issues[0]?.path[0] as keyof BookingValues | undefined;
      window.setTimeout(() => {
        if (field === "date") document.getElementById("booking-date")?.focus();
        else if (field) setFocus(field);
      }, 0);
      return false;
    }
    return true;
  };

  const next = () => { if (validate()) { setCopyStatus(""); setStep(2); } };
  const copy = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(bookingMessage(getValues(), language));
      setCopyStatus("Xabar nusxalandi.");
      setManualCopy(false);
    } catch {
      setManualCopy(true);
      setCopyStatus("Xabarni quyidagi maydondan qo‘lda nusxalang.");
    }
  };
  const error = (field: keyof BookingValues) =>{t('errors[field] ?')}<p id={`booking-${field}-error`} className="mt-1 text-sm text-destructive" role="alert">{t(errors[field]?.message ?? "")}</p> : null;
  const a11y = (field: keyof BookingValues) => ({ "aria-invalid": Boolean(errors[field]), "aria-describedby": errors[field] ? `booking-${field}-error` : undefined });
  const selectedDate = values.date ? new Date(`${values.date}T12:00:00`) : undefined;
  const today = current ? new Date(`${current.date}T12:00:00`) : undefined;

  return (
    <section id="joy-band-qilish" className="bg-forest py-16 md:py-20">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <CalendarDays className="mx-auto h-7 w-7 text-gold" strokeWidth={1.4} />
        <h2 className="mt-4 text-3xl text-cream md:text-4xl">{t('Tashrifingizni oldindan rejalashtiring')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-on-dark-muted">{t('Rustambek Choyxonada joy band qilish uchun qulay sana va vaqtni tanlang.')}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="group mt-6 h-12 rounded-full bg-gold px-7 text-forest-deep hover:bg-gold-soft">{t('Joy band qilish')}<ArrowRight className="arrow-nudge" /></Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="z-[70] bg-forest-deep/75 duration-250" />
            <DialogPrimitive.Content className="booking-dialog fixed left-1/2 top-1/2 z-[71] flex max-h-[94dvh] w-[calc(100%-1rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-cream shadow-card duration-250 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95" onOpenAutoFocus={(event) => { event.preventDefault(); setFocus("name"); }}>
              <div className="relative shrink-0 border-b px-5 py-5 text-left sm:px-7">
                <p className="flex items-center gap-2 pr-10 text-xs font-medium text-forest"><CalendarDays className="h-4 w-4 text-gold" /> RUSTAMBEK CHOYXONA</p>
                <DialogTitle className="mt-2 font-serif text-3xl font-medium text-forest">{t('Joy band qilish')}</DialogTitle>
                <DialogDescription className="mt-1">{t('Tashrifingizni oldindan rejalashtiring')}</DialogDescription>
                <DialogClose asChild><Button variant="ghost" size="icon" className="absolute right-3 top-3 h-11 w-11 text-forest" aria-label={t('Bandlov oynasini yopish')}><X /></Button></DialogClose>
              </div>
              <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pb-6 pt-4 text-left sm:px-7">
                <p className="mb-5 text-xs font-medium text-muted-foreground">{step} / 2 — {t(step === 1 ? "Ma’lumotlarni kiritish" : "Bandlovni tekshirish")}</p>
                {step === 1 ? (
                  <form className="booking-step grid gap-4 sm:grid-cols-2" noValidate onSubmit={(event) => { event.preventDefault(); next(); }}>
                    <div><label htmlFor="booking-name" className="mb-2 block text-sm font-medium">{t('Ismingiz')} *</label><Input id="booking-name" placeholder={t('Ismingizni kiriting')} autoComplete="given-name" maxLength={100} className={fieldClass} {...register("name")} {...a11y("name")} />{error("name")}</div>
                    <div><label htmlFor="booking-phone" className="mb-2 block text-sm font-medium">{t('Telefon raqamingiz')} *</label><Input id="booking-phone" type="tel" inputMode="tel" placeholder={t('+998 90 123 45 67')} autoComplete="tel" maxLength={30} className={fieldClass} {...register("phone")} {...a11y("phone")} />{error("phone")}</div>
                    <div><label id="booking-date-label" className="mb-2 block text-sm font-medium">{t('Kelish sanasi')} *</label>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}><PopoverTrigger asChild><Button id="booking-date" variant="outline" aria-labelledby="booking-date-label" {...a11y("date")} className="h-12 w-full justify-between bg-card px-3 text-base font-normal">{values.date ? formatBookingDate(values.date, language) : t("Sanani tanlang")}<CalendarDays className="text-gold" /></Button></PopoverTrigger>
                        <PopoverContent className="pointer-events-auto z-[80] w-auto max-w-[calc(100vw-2rem)] p-0" align="start"><Calendar mode="single" locale={language === "en" ? enGB : uz} labels={{ labelPrevious: () => t("Oldingi oy"), labelNext: () => t("Keyingi oy"), labelGrid: () => t("Taqvim"), labelDayButton: (date, modifiers) => `${date.toLocaleDateString(language === "en" ? "en-GB" : "uz-Latn-UZ", { day: "numeric", month: "long", year: "numeric" })}${modifiers.today ? `, ${t("bugun")}` : ""}${modifiers.selected ? `, ${t("tanlangan")}` : ""}` }} selected={selectedDate} {...(selectedDate ? { defaultMonth: selectedDate } : today ? { defaultMonth: today } : {})} {...(today ? { today, disabled: { before: today } } : {})} autoFocus className="[--cell-size:2.5rem]" onSelect={(date) => { if (date) { const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; setValue("date", value); setValue("time", ""); clearErrors("date"); setCalendarOpen(false); } }} /></PopoverContent>
                      </Popover>{error("date")}</div>
                    <div><label htmlFor="booking-time" className="mb-2 block text-sm font-medium">{t('Kelish vaqti')} *</label><select id="booking-time" className="h-12 w-full rounded-md border border-input bg-card px-3 text-base focus:border-gold" {...register("time")} {...a11y("time")}><option value="">{t('Vaqtni tanlang')}</option>{slots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select>{error("time")}{current && values.date === current.date && slots.length === 0 && <p className="mt-2 text-sm text-muted-foreground">{t('Bugun uchun vaqtlar tugagan. Iltimos, keyingi sanani tanlang.')}</p>}</div>
                    <fieldset className="sm:col-span-2"><legend className="mb-2 text-sm font-medium">{t('Mehmonlar soni')} *</legend><div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label={t('Mehmonlar soni')}>{[2, 4, 6, 8].map((count) => { const selected = count === 8 ? eightPlus : !eightPlus && values.guests === String(count); return <Button key={count} type="button" variant={selected ? "default" : "outline"} role="radio" aria-checked={selected} className={`h-11 px-1 ${selected ? "text-cream" : "bg-card"}`} onClick={() => { setEightPlus(count === 8); setValue("guests", count === 8 ? "" : String(count)); clearErrors("guests"); if (count === 8) setFocus("guests"); }}>{count === 8 ? "8+" : count} {t("kishi")}</Button>; })}</div><label htmlFor="booking-guests" className="mb-2 mt-3 block text-sm">{t('Aniq mehmonlar soni')}</label><Input id="booking-guests" type="number" inputMode="numeric" min={1} step={1} placeholder={t(eightPlus ? "Aniq sonni kiriting" : "Mehmonlar soni")} className={fieldClass} {...register("guests")} {...a11y("guests")} />{error("guests")}</fieldset>
                    <div className="sm:col-span-2"><label htmlFor="booking-note" className="mb-2 block text-sm font-medium">{t('Qo‘shimcha izoh')}</label><Textarea id="booking-note" placeholder={t('Maxsus istaklaringiz bo‘lsa yozing...')} rows={3} maxLength={booking.noteLimit} className="bg-card text-base md:text-base" {...register("note")} {...a11y("note")} /><p className="mt-1 text-right text-xs text-muted-foreground">{values.note.length} / {booking.noteLimit}</p>{error("note")}</div>
                    <Button type="submit" className="h-12 w-full sm:col-span-2">{t('Bandlovni tekshirish')}<ArrowRight className="text-gold" /></Button>
                  </form>
                ) : (
                  <div className="booking-step">
                    <h3 ref={summaryRef} tabIndex={-1} className="font-serif text-2xl text-forest">{t('Bandlov ma’lumotlarini tekshiring')}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t('Telegramga o‘tishdan oldin ma’lumotlaringiz to‘g‘riligini tekshiring.')}</p>
                    <dl className="my-5 grid gap-3 border-y py-4 text-sm">{[["Ism", values.name.trim()], ["Telefon", formatPhone(values.phone)], ["Sana", formatBookingDate(values.date, language)], ["Vaqt", values.time], ["Mehmonlar", `${values.guests} ${t("kishi")}`], ...(values.note.trim() ? [["Izoh", values.note.trim()]] : [])].map(([label, value]) => <div key={label} className="grid grid-cols-[90px_1fr] gap-3"><dt className="text-muted-foreground">{t(label)}</dt><dd className="min-w-0 whitespace-pre-wrap break-words font-medium">{value}</dd></div>)}</dl>
                    <Button variant="ghost" className="mb-3 h-11 px-0 text-forest" onClick={() => { setStep(1); setTimeout(() => setFocus("name"), 0); }}><ArrowLeft />{t('O‘zgartirish')}</Button>
                    <p className="text-sm font-medium text-forest">{t(confirmationNote)}</p>
                    <p className="mb-5 mt-2 text-xs leading-relaxed text-muted-foreground">{t('Davom etish orqali ma’lumotlaringiz Telegram orqali yuborish uchun tayyorlanadi.')}</p>
                    <Button asChild className="h-auto min-h-12 w-full whitespace-normal py-3 text-center"><a href={telegramBookingUrl(values, language)} target="_blank" rel="noopener noreferrer" onClick={(event) => { if (!validate()) event.preventDefault(); }}><Send className="text-gold" />{t('Telegram orqali davom etish')}</a></Button>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t('Telegram ochiladi. Xabarni yuborish uchun Telegramdagi Yuborish tugmasini bosing.')}</p>
                    <div className="mt-4 flex flex-wrap gap-2"><Button variant="outline" className="h-11 bg-card" onClick={copy}><Copy />{t('Xabarni nusxalash')}</Button><Button asChild variant="ghost" className="h-11"><a href={`https://t.me/${booking.recipient}`} target="_blank" rel="noopener noreferrer">{t('Telegramni ochish')}</a></Button></div>
                    <p role="status" className="mt-2 min-h-5 text-xs text-forest">{t(copyStatus)}</p>
                    {manualCopy && <Textarea ref={copyRef} readOnly aria-label={t('Nusxalash uchun bandlov xabari')} value={bookingMessage(values, language)} rows={8} className="mt-2 bg-card text-base md:text-base" />}
                  </div>
                )}
                <div className="mt-6 border-t pt-4"><p className="text-xs text-muted-foreground">{t('Telefon orqali bog‘lanish')}</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{restaurant.contact.phones.map((phone) => <a key={phone} href={telHref(phone)} className="inline-flex min-h-11 items-center text-sm text-forest underline-offset-4 hover:underline">{phone}</a>)}</div></div>
              </div>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
        <p className="mt-4 text-xs text-on-dark-muted">{t(confirmationNote)}</p>
      </Reveal>
    </section>
  );
}