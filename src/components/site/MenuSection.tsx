import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Share2, Sparkles, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { categories, dishes, type CategoryId, type Dish } from "@/config/restaurant";
import { Ornament, Reveal } from "./common";

function DishCard({ dish, highlight, index, favorite, onFavorite }: { dish: Dish; highlight: boolean; index: number; favorite: boolean; onFavorite: () => void }) {
  const [copied, setCopied] = useState(false);
  const [broken, setBroken] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#taom-${dish.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${dish.name} — Rustambek Choyxona`, text: dish.description, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* foydalanuvchi bekor qildi */
    }
  };

  return (
    <Reveal delay={(index % 4) * 55} className="min-w-0">
    <article
      id={`taom-${dish.id}`}
      className={`dish-card group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card ${
        highlight ? "ring-2 ring-gold ring-offset-4 ring-offset-cream" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {broken ? (
          <div className="flex h-full items-center justify-center font-serif text-2xl text-muted-foreground">{dish.name}</div>
        ) : (
          <img src={dish.image} alt={dish.name} loading="lazy" width={1024} height={768} onError={() => setBroken(true)} className={`dish-img h-full w-full ${dish.category === "ichimlik" ? "object-contain" : "object-cover"}`} />
        )}
        {dish.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-gold">Tavsiya</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl text-ink">{dish.name}</h3>
        {dish.size && <p className="mt-1 text-sm font-medium text-forest">{dish.size}</p>}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
        {dish.varieties && <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{dish.varieties.map((variety) => <li key={variety}>{variety}</li>)}</ul>}
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <span className={dish.price ? "font-semibold text-forest" : "text-sm italic text-muted-foreground"}>
            {dish.price || "Narx kiritiladi"}
          </span>
           <div className="flex shrink-0 items-center">
           <Button type="button" variant="ghost" size="icon" onClick={onFavorite} aria-pressed={favorite} aria-label={`${dish.name}: ${favorite ? "sevimlilardan olib tashlash" : "sevimlilarga qo‘shish"}`} title={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish"} className="h-11 w-11 rounded-full text-forest hover:bg-secondary">
             <Heart className={favorite ? "fill-current" : ""} />
           </Button>
          <button type="button" onClick={share} className="inline-flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-secondary" aria-label={`${dish.name} havolasini ulashish`}>
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          </button>
           </div>
        </div>
        {copied && <span className="sr-only" role="status">Havola nusxalandi</span>}
      </div>
    </article>
    </Reveal>
  );
}

export function MenuSection() {
  const [cat, setCat] = useState<CategoryId | "favorites">("all");
  const { favorites, toggle } = useFavorites();
  const [q, setQ] = useState("");
  const [highlight, setHighlight] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<Dish | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLocaleLowerCase("uz");
    return dishes.filter(
      (d) => (cat === "all" || (cat === "favorites" ? favorites.includes(d.id) : d.category === cat)) && (!s || d.name.toLocaleLowerCase("uz").includes(s) || d.description.toLocaleLowerCase("uz").includes(s)),
    );
  }, [cat, q, favorites]);

  const focusDish = (id: string) => {
    setCat("all");
    setQ("");
    setHighlight(id);
    requestAnimationFrame(() => document.getElementById(`taom-${id}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" }));
    setTimeout(() => setHighlight(null), 2600);
  };

  useEffect(() => {
    const m = window.location.hash.match(/^#taom-(.+)$/);
    const id = m?.[1];
    if (!id || !dishes.some((d) => d.id === id)) return;
    const timer = setTimeout(() => focusDish(id), 300);
    return () => clearTimeout(timer);
  }, []);

  const suggest = () => {
    const pool = dishes.filter((d) => d.id !== suggestion?.id);
    setSuggestion(pool[Math.floor(Math.random() * pool.length)] ?? null);
  };

  return (
    <section id="menyu" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <Ornament className="justify-center" />
          <h2 className="mt-5 text-4xl text-ink md:text-5xl">Bizning menyu</h2>
          <p className="mt-3 text-muted-foreground">Sevimli milliy taomlaringizni kashf eting.</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Taom toifalari">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`min-h-11 shrink-0 rounded-full border px-5 text-sm transition-colors ${
                  cat === c.id ? "border-forest bg-forest text-cream" : "border-input text-ink hover:border-forest"
                }`}
              >
                {c.label}
              </button>
            ))}
             <Button type="button" variant="outline" role="tab" aria-selected={cat === "favorites"} onClick={() => setCat("favorites")} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm shadow-none ${cat === "favorites" ? "border-forest bg-forest text-cream hover:bg-forest hover:text-cream" : "border-input bg-transparent text-ink hover:border-forest"}`}>
               <Heart /> Sevimlilar
             </Button>
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Taom qidirish</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Taom qidirish..." className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm outline-none focus:border-gold" />
          </label>
        </div>

        {filtered.length ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((d, i) => (
              <DishCard key={d.id} index={i} dish={d} highlight={highlight === d.id} favorite={favorites.includes(d.id)} onFavorite={() => toggle(d.id)} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed p-12 text-center">
            <p className="font-serif text-2xl text-ink">Hech narsa topilmadi</p>
            <p className="mt-2 text-sm text-muted-foreground">Boshqa so‘z bilan qidirib ko‘ring yoki boshqa toifani tanlang.</p>
            <button onClick={() => { setQ(""); setCat("all"); }} className="mt-5 min-h-11 rounded-full border border-forest px-5 text-sm text-forest hover:bg-forest hover:text-cream">
              Barcha taomlarni ko‘rsatish
            </button>
          </div>
        )}

        <Reveal className="mt-16 overflow-hidden rounded-2xl bg-forest px-6 py-10 text-center md:px-12">
          <Sparkles className="mx-auto h-6 w-6 text-gold" strokeWidth={1.4} />
          <h3 className="mt-4 text-3xl text-on-dark md:text-4xl">Nima tanlasam ekan?</h3>
          <p className="mt-2 text-on-dark-muted">Bugun qaysi taomni tatib ko‘rishni bilmayapsizmi?</p>
          <button onClick={suggest} className="mt-6 min-h-12 rounded-full bg-gold px-7 text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft">
            Taom tavsiya qil
          </button>
          <div aria-live="polite" className="min-h-0">
            {suggestion && (
              <div key={suggestion.id} className="mx-auto mt-8 flex max-w-md animate-fade-up items-center gap-4 rounded-xl bg-forest-deep/60 p-3 text-left">
                <img src={suggestion.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="eyebrow">Bugungi tavsiya</p>
                  <p className="font-serif text-2xl text-on-dark">{suggestion.name}</p>
                </div>
                <button onClick={() => focusDish(suggestion.id)} className="group inline-flex min-h-11 items-center gap-1 px-2 text-sm text-gold">
                  Ko‘rish <ArrowRight className="h-4 w-4 transition-transform arrow-nudge" />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
