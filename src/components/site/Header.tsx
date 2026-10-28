import { useLanguage, LanguageSwitcher } from "@/i18n/LanguageProvider";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { restaurant } from "@/config/restaurant";
import { Brand, nav, telHref } from "./common";

export function Header() {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phone = restaurant.contact.phone;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-gold/15 bg-forest-deep/95 backdrop-blur" : "border-on-dark/10 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 lg:px-8">
        <Brand compact />
        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label={t('Asosiy navigatsiya')}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap text-sm text-on-dark-muted transition-colors hover:text-gold">
              {t(n.label)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block"><LanguageSwitcher /></div>
          {phone ? (
            <a href={telHref(phone)} className="hidden items-center gap-2 rounded-full border border-gold/50 px-3 py-2.5 text-sm text-gold transition-colors hover:bg-gold hover:text-forest-deep lg:inline-flex">
              <Phone className="h-4 w-4" /><span className="hidden xl:inline">{t("Qo‘ng‘iroq qilish")}</span></a>
          ) : (
            <a href="#aloqa" className="hidden rounded-full border border-gold/40 px-3 py-2.5 text-sm text-gold transition-colors hover:bg-gold hover:text-forest-deep lg:inline-flex">
              {t('Aloqa')}
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-on-dark lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menyu"
            aria-label={t(open ? "Menyuni yopish" : "Menyuni ochish")}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobil-menyu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gold/15 px-5 pb-6 lg:hidden" aria-label={t('Mobil navigatsiya')}>
          <LanguageSwitcher />
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-on-dark/10 font-serif text-2xl text-on-dark">
              {t(n.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
