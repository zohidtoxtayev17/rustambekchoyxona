/**
 * ===========================================================
 *  RUSTAMBEK CHOYXONA — BARCHA TAHRIRLANADIGAN MA'LUMOTLAR
 * ===========================================================
 * Telefon, manzil, ish vaqti, ijtimoiy tarmoqlar, taomlar,
 * narxlar va rasmlarni shu fayldan o'zgartiring.
 * Bo'sh qoldirilgan ("") qiymatlar saytda "kiritiladi" deb
 * ko'rsatiladi va ularga bog'liq tugmalar faol bo'lmaydi.
 */
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";
import osh from "@/assets/osh.jpg";
import somsa from "@/assets/somsa.jpg";
import shashlik from "@/assets/shashlik.jpg";
import manti from "@/assets/manti.jpg";
import lagmon from "@/assets/lagmon.jpg";
import chuchvara from "@/assets/chuchvara.jpg";
import achchiq from "@/assets/achchiq.jpg";
import choy from "@/assets/choy.jpg";

export const restaurant = {
  name: "Rustambek Choyxona",
  tagline: "Milliy ta’m, samimiy muhit",
  subtitle: "An’anaviy o‘zbek taomlari va unutilmas choyxona muhiti.",
  heroImage: hero,
  aboutImage: interior,

  // --- ALOQA (haqiqiy ma'lumotlarni kiriting) ---
  contact: {
    address: "", // masalan: "Toshkent sh., ... ko‘chasi, 12-uy"
    phone: "", // masalan: "+998901234567"
    hours: "", // masalan: "Har kuni 09:00 – 23:00"
    telegram: "", // masalan: "https://t.me/rustambek_choyxona"
    instagram: "", // masalan: "https://instagram.com/rustambek_choyxona"
    mapUrl: "", // Google Maps havolasi
  },
};

export type CategoryId = "all" | "asosiy" | "somsa" | "salat" | "ichimlik" | "shirinlik";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "all", label: "Barchasi" },
  { id: "asosiy", label: "Asosiy taomlar" },
  { id: "somsa", label: "Somsa va non" },
  { id: "salat", label: "Salatlar" },
  { id: "ichimlik", label: "Ichimliklar" },
  { id: "shirinlik", label: "Shirinliklar" },
];

export type Dish = {
  id: string;
  name: string;
  description: string;
  category: Exclude<CategoryId, "all">;
  image: string;
  price: string; // "" bo'lsa "Narx kiritiladi" ko'rinadi
  featured?: boolean;
};

// Namuna (demo) taomlar — haqiqiy menyu emas.
export const dishes: Dish[] = [
  { id: "osh", name: "Osh", description: "Sabzi, guruch va yumshoq go‘sht bilan qozonda damlangan milliy palov.", category: "asosiy", image: osh, price: "", featured: true },
  { id: "somsa", name: "Somsa", description: "Tandirda yopilgan, qatlamli xamir ichida suvli go‘sht.", category: "somsa", image: somsa, price: "" },
  { id: "shashlik", name: "Shashlik", description: "Cho‘g‘da pishirilgan ziravorli go‘sht, piyoz bilan.", category: "asosiy", image: shashlik, price: "" },
  { id: "manti", name: "Manti", description: "Bug‘da pishirilgan, go‘sht va piyozli nozik chuchvara.", category: "asosiy", image: manti, price: "" },
  { id: "lagmon", name: "Lagʻmon", description: "Qo‘lda cho‘zilgan xamir, go‘sht va sabzavotli quyuq sous.", category: "asosiy", image: lagmon, price: "" },
  { id: "chuchvara", name: "Chuchvara", description: "Shaffof sho‘rvada mayda go‘shtli chuchvara, ukrop bilan.", category: "asosiy", image: chuchvara, price: "" },
  { id: "achchiq-chuchuk", name: "Achchiq-chuchuk", description: "Pomidor, piyoz va rayhondan tayyorlangan yengil salat.", category: "salat", image: achchiq, price: "" },
  { id: "kok-choy", name: "Koʻk choy", description: "Choynakda damlangan xushbo‘y ko‘k choy — suhbat hamrohi.", category: "ichimlik", image: choy, price: "" },
];

export const gallery = [
  { src: osh, alt: "O‘zbek oshi lagan likopchada" },
  { src: interior, alt: "Choyxona uslubidagi shinam burchak" },
  { src: shashlik, alt: "Cho‘g‘da pishirilgan shashlik" },
  { src: choy, alt: "Choynak va piyolalarda ko‘k choy" },
  { src: somsa, alt: "Tandir somsa va non" },
];
