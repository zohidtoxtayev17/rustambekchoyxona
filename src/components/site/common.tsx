import { useEffect, useRef, type ReactNode } from "react";
import { restaurant } from "@/config/restaurant";

export function Emblem({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 42V22c0-9 7-15 16-17 9 2 16 8 16 17v20" />
      <path d="M14 42V24c0-5 4-9 10-11 6 2 10 6 10 11v18" />
      <path d="M4 42h40" />
      <path d="M20 42v-9a4 4 0 0 1 8 0v9" />
      <circle cx="24" cy="5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#bosh" className="flex items-center gap-3 text-gold" aria-label={`${restaurant.name} — bosh sahifa`}>
      <Emblem className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-wide text-on-dark sm:text-2xl">Rustambek</span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-gold">Choyxona</span>
      </span>
    </a>
  );
}

export function Reveal({ children, className = "", as: Tag = "div", delay = 0 }: { children: ReactNode; className?: string; as?: "div" | "section"; delay?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || !el.animate) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    let animation: Animation | undefined;
    const stop = () => animation?.cancel();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          io.disconnect();
          if (reducedMotion.matches) return;
          animation = el.animate(
            [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 600, delay: Math.min(Math.max(delay, 0), 180), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
          );
        }
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    reducedMotion.addEventListener("change", stop);
    return () => {
      io.disconnect();
      stop();
      reducedMotion.removeEventListener("change", stop);
    };
  }, [delay]);
  return (
    <Tag ref={(node) => { ref.current = node; }} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-gold/60" />
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor"><path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12 4.5 7.5 0 6l4.5-1.5z" /></svg>
      <span className="h-px w-10 bg-gold/60" />
    </div>
  );
}

export const nav = [
  { href: "#bosh", label: "Bosh sahifa" },
  { href: "#menyu", label: "Menyu" },
  { href: "#biz-haqimizda", label: "Biz haqimizda" },
  { href: "#galereya", label: "Galereya" },
  { href: "#aloqa", label: "Aloqa" },
];

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
