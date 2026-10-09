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
import kuskavoyImg from "@/assets/kuskavoy.png.asset.json";
import qiymaImg from "@/assets/qiyma.png.asset.json";
import tabakaImg from "@/assets/tabaka.png.asset.json";
import baliqImg from "@/assets/baliq.png.asset.json";
import oshImg from "@/assets/osh-real.png.asset.json";
import shorvaImg from "@/assets/shorva.png.asset.json";
import somsaImg from "@/assets/jizzax-somsa.png.asset.json";
import jizImg from "@/assets/jiz.png.asset.json";
import choy from "@/assets/choy.jpg";

export const restaurant = {
  name: "Rustambek Choyxona",
  tagline: "Milliy ta’m, samimiy muhit",
  subtitle: "An’anaviy o‘zbek taomlari va unutilmas choyxona muhiti.",
  heroImage: hero,
  aboutImage: interior,

  // --- ALOQA (haqiqiy ma'lumotlarni kiriting) ---
  contact: {
    address: "Rustambek bazimgohi, Alamli",
    phone: "+998 99 196 31 54", // asosiy raqam
    phones: ["+998 99 196 31 54", "+998 94 196 31 54"],
    hours: "Har kuni 08:00–00:00",
    telegram: "https://t.me/Rustambek_choyxonasi",
    instagram: "https://www.instagram.com/rustambek_bazimgohi/",
    mapUrl: "https://maps.app.goo.gl/e4bgrrfbKLxomTaL7",
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

// Haqiqiy menyu
export const dishes: Dish[] = [
  { id: "kuskavoy-shashlik", name: "Kuskavoy shashlik", description: "Saralangan go‘sht bo‘laklaridan tayyorlangan, olovda qizartirib pishirilgan shirali shashlik.", category: "asosiy", image: kuskavoyImg.url, price: "35 000 so‘m" },
  { id: "qiyma-shashlik", name: "Qiyma shashlik", description: "Mayin qiymadan tayyorlangan, xushbo‘y ziravorlar bilan mazasi boyitilgan shashlik.", category: "asosiy", image: qiymaImg.url, price: "25 000 so‘m" },
  { id: "tabaka", name: "Tabaka", description: "Usti tillarang bo‘lguncha qovurilgan, ichi yumshoq va shirali tovuq taomi.", category: "asosiy", image: tabakaImg.url, price: "60 000 so‘m" },
  { id: "baliq", name: "Baliq", description: "Mazali va xushbo‘y, ishtaha ochar qilib tayyorlangan baliq taomi.", category: "asosiy", image: baliqImg.url, price: "75 000 so‘m / kg" },
  { id: "osh", name: "Osh", description: "Guruch, go‘sht, sabzi va xushbo‘y ziravorlar uyg‘unligida tayyorlangan an’anaviy o‘zbek oshi.", category: "asosiy", image: oshImg.url, price: "50 000 so‘m / porsiya", featured: true },
  { id: "shorva", name: "Sho‘rva", description: "Go‘sht va sabzavotlardan tayyorlangan, to‘yimli va xushbo‘y milliy sho‘rva.", category: "asosiy", image: shorvaImg.url, price: "30 000 so‘m" },
  { id: "jizzax-somsa", name: "Katta Jizzax somsa", description: "Katta hajmli, ichi go‘shtli, usti qizargan va mazasi bilan ajralib turadigan Jizzax somsasi.", category: "somsa", image: somsaImg.url, price: "45 000 so‘m" },
  { id: "jiz", name: "Jiz", description: "Go‘sht bo‘laklaridan tayyorlangan, shirali, to‘yimli va xushbo‘y milliy taom.", category: "asosiy", image: jizImg.url, price: "250 000 so‘m / kg" },
];

export const gallery = [
  { src: osh, alt: "O‘zbek oshi lagan likopchada" },
  { src: interior, alt: "Choyxona uslubidagi shinam burchak" },
  { src: shashlik, alt: "Cho‘g‘da pishirilgan shashlik" },
  { src: choy, alt: "Choynak va piyolalarda ko‘k choy" },
  { src: somsa, alt: "Tandir somsa va non" },
];
