import { useEffect, useState } from "react";
import { dishes } from "@/config/restaurant";
import { FAVORITES_KEY, parseFavorites, toggleFavorite } from "@/lib/restaurant-utilities";

const validIds = dishes.map((dish) => dish.id);

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const load = () => {
      try {
        setFavorites(parseFavorites(window.localStorage.getItem(FAVORITES_KEY), validIds));
      } catch { /* Favorites still work when browser storage is unavailable. */ }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const toggle = (id: string) => {
    const next = toggleFavorite(favorites, id);
    setFavorites(next);
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch { /* Do not interrupt the menu if browser storage is blocked. */ }
  };
  return { favorites, toggle };
}