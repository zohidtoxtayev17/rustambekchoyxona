import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Coffee, HeartHandshake, Instagram, MapPin, Phone, Send, UtensilsCrossed, X } from "lucide-react";
import { gallery, restaurant } from "@/config/restaurant";
import { Brand, Ornament, Reveal, nav, telHref } from "./common";

export function About() {
  const items = [
    { icon: UtensilsCrossed, label: "Milliy taomlar" },
    { icon: HeartHandshake, label: "Samimiy muhit" },
    { icon: Coffee, label: "An’anaviy choyxona ruhi" },
  ];
  return (
    <section id="biz-haqimizda" className="bg-forest py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <img src={restaurant.aboutImage} alt="Choyxona uslubidagi shinam burchak (namuna rasm)" loading="lazy" width={864} height={1088} className="aspect-[4/5] w-full rounded-2xl object-cover" />
        </Reveal>
        <Reveal>
          <Ornament />
          <h2 className="mt-5 text-4xl text-on-dark md:text-5xl">Biz haqimizda</h2>
          <p className="mt-6 font-serif text-2xl leading-snug text-gold-soft">
            Rustambek Choyxona — milliy ta’mlar va samimiy suhbatlar uyg‘unlashadigan maskan.
          </p>
          <p className="mt-5 leading-relaxed text-on-dark-muted">
            Bu yerda har bir mehmon aziz. Issiq choy, qozondan uzilgan taom va shoshilmasdan o‘tkaziladigan suhbat — choyxona an’anasining eng go‘zal jihatlari.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {items.map(({ icon: Icon, label }) => (
              <li key={label} className="border-t border-gold/25 pt-5">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.2} />
                <p className="mt-3 text-sm text-on-dark">{label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const close = () => setIdx(null);
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (idx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [idx, step]);

  const spans = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2"];

  return (
    <section id="galereya" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <Ornament className="justify-center" />
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Galereya</h2>
        </Reveal>
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:auto-rows-[220px] md:grid-cols-4 md:overflow-visible md:px-0">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`group relative w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl md:w-auto ${spans[i] ?? ""}`} aria-label={`Rasmni kattalashtirish: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:aspect-auto" />
            </button>
          ))}
        </div>
      </div>

      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Rasm ko‘rish" className="fixed inset-0 z-[60] flex animate-in fade-in items-center justify-center bg-forest-deep/95 p-4" onClick={close}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[idx].src} alt={gallery[idx].alt} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-on-dark-muted">{gallery[idx].alt}</figcaption>
          </figure>
          <button autoFocus onClick={close} className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-on-dark hover:text-gold" aria-label="Yopish"><X className="h-6 w-6" /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-on-dark hover:text-gold" aria-label="Oldingi rasm"><ChevronLeft className="h-7 w-7" /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-on-dark hover:text-gold" aria-label="Keyingi rasm"><ChevronRight className="h-7 w-7" /></button>
        </div>
      )}
    </section>
  );
}

function ActionLink({ href, icon: Icon, label }: { href: string; icon: typeof Phone; label: string }) {
  if (!href)
    return (
      <span className="inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-input px-5 text-sm text-muted-foreground" title="Ma’lumot hali kiritilmagan" aria-disabled="true">
        <Icon className="h-4 w-4" /> {label}
      </span>
    );
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-forest px-5 text-sm text-forest transition-colors hover:bg-forest hover:text-cream">
      <Icon className="h-4 w-4" /> {label}
    </a>
  );
}

export function Contact() {
  const c = restaurant.contact;
  const rows = [
    { icon: MapPin, title: "Manzil", value: c.address || "Manzil kiritiladi" },
    { icon: Clock, title: "Ish vaqti", value: c.hours || "Ish vaqti kiritiladi" },
    { icon: Phone, title: "Telefon", value: c.phone || "Telefon raqami kiritiladi" },
  ];
  return (
    <section id="aloqa" className="border-t bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 lg:px-8">
        <Reveal>
          <Ornament />
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Manzil va aloqa</h2>
          <dl className="mt-10 space-y-6">
            {rows.map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-forest"><Icon className="h-5 w-5" strokeWidth={1.4} /></span>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</dt>
                  <dd className="mt-1 text-lg text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <ActionLink href={c.phone ? telHref(c.phone) : ""} icon={Phone} label="Qo‘ng‘iroq qilish" />
            <ActionLink href={c.telegram} icon={Send} label="Telegram orqali bog‘lanish" />
            <ActionLink href={c.mapUrl} icon={MapPin} label="Xaritada ochish" />
            <ActionLink href={c.instagram} icon={Instagram} label="Instagram" />
          </div>
        </Reveal>
        <Reveal>
          <div className="relative flex aspect-[4/3] h-full min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl bg-forest p-8 text-center">
            <svg className="absolute inset-0 h-full w-full text-gold/10" aria-hidden="true">
              <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="currentColor" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <MapPin className="relative h-10 w-10 text-gold" strokeWidth={1.2} />
            <p className="relative mt-4 font-serif text-2xl text-on-dark">Xarita tez orada</p>
            <p className="relative mt-2 max-w-xs text-sm text-on-dark-muted">Manzil kiritilgach, bu yerda joylashuvni ochish imkoniyati paydo bo‘ladi.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const c = restaurant.contact;
  return (
    <footer className="bg-forest-deep pb-28 pt-14 lg:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:flex-row md:items-start md:justify-between lg:px-8">
        <Brand />
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Pastki navigatsiya">
          {nav.map((n) => <a key={n.href} href={n.href} className="text-sm text-on-dark-muted hover:text-gold">{n.label}</a>)}
        </nav>
        <div className="space-y-2 text-sm text-on-dark-muted">
          {c.phone && <a href={telHref(c.phone)} className="block hover:text-gold">{c.phone}</a>}
          {c.address && <p>{c.address}</p>}
          <div className="flex gap-4">
            {c.telegram && <a href={c.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Telegram</a>}
            {c.instagram && <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a>}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-on-dark/10 px-5 pt-6 text-xs text-on-dark-muted lg:px-8">
        © {new Date().getFullYear()} {restaurant.name}. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  );
}

export function MobileBar() {
  const c = restaurant.contact;
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.7rem]";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-gold/20 bg-forest-deep/95 backdrop-blur lg:hidden" aria-label="Tezkor amallar">
      <a href="#menyu" className={`${item} text-gold`}><UtensilsCrossed className="h-5 w-5" strokeWidth={1.4} />Menyu</a>
      {c.phone ? (
        <a href={telHref(c.phone)} className={`${item} text-gold`}><Phone className="h-5 w-5" strokeWidth={1.4} />Qo‘ng‘iroq</a>
      ) : (
        <span className={`${item} text-on-dark-muted opacity-50`} aria-disabled="true"><Phone className="h-5 w-5" strokeWidth={1.4} />Qo‘ng‘iroq</span>
      )}
      {c.mapUrl ? (
        <a href={c.mapUrl} target="_blank" rel="noopener noreferrer" className={`${item} text-gold`}><MapPin className="h-5 w-5" strokeWidth={1.4} />Manzil</a>
      ) : (
        <a href="#aloqa" className={`${item} text-on-dark-muted`}><MapPin className="h-5 w-5" strokeWidth={1.4} />Manzil</a>
      )}
    </nav>
  );
}
