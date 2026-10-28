import { useLanguage } from "@/i18n/LanguageProvider";
import { useEffect, useState } from "react";
import { isRestaurantOpen } from "@/lib/restaurant-utilities";

export function OpeningStatus() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setOpen(isRestaurantOpen(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <p className="mt-1 min-h-5 text-sm font-medium text-forest" title={t('Belgilangan ish vaqti bo‘yicha; bayram va kutilmagan yopilishlar hisobga olinmaydi.')} aria-live="polite">
      {open === null ? "\u00a0" : t(open ? "Hozir ochiq" : "Hozir yopiq")}
    </p>
  );
}