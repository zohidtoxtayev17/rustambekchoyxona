import { describe, expect, it } from "vitest";
import { dishes } from "@/config/restaurant";

describe("Confirmed drink menu", () => {
  const drinks = dishes.filter((dish) => dish.category === "ichimlik");
  it("contains exactly the five drinks in the supplied order", () => {
    expect(drinks.map((dish) => dish.name)).toEqual(["Coca-Cola", "Pepsi", "Fanta", "Dena", "Choy"]);
  });
  it.each([
    ["Coca-Cola", "1.5 L", "15 000 so‘m"],
    ["Pepsi", "1.5 L", "15 000 so‘m"],
    ["Fanta", "1.5 L", "15 000 so‘m"],
    ["Dena", "1 L", "14 000 so‘m"],
    ["Choy", undefined, "5 000 so‘m"],
  ])("keeps %s at its exact size and price", (name, size, price) => {
    const drink = drinks.find((dish) => dish.name === name);
    expect(drink).toBeDefined();
    expect(drink?.size).toBe(size);
    expect(drink?.price).toBe(price);
  });
  it("keeps tea varieties under one shared price without separate servings", () => {
    const tea = drinks.find((dish) => dish.id === "choy");
    expect(tea?.varieties).toEqual(["Oddiy choy", "Limonli choy", "Boshqa turlari"]);
    expect(tea?.size).toBeUndefined();
    expect(tea?.price).toBe("5 000 so‘m");
  });
  it("preserves the existing main dish and salad prices", () => {
    expect(dishes.filter((dish) => dish.category !== "ichimlik").map((dish) => [dish.id, dish.price])).toEqual([
      ["kuskavoy-shashlik", "35 000 so‘m"], ["qiyma-shashlik", "25 000 so‘m"],
      ["tabaka", "60 000 so‘m"], ["baliq", "75 000 so‘m / kg"],
      ["osh", "50 000 so‘m / porsiya"], ["shorva", "30 000 so‘m"],
      ["jizzax-somsa", "45 000 so‘m"], ["jiz", "250 000 so‘m / kg"],
      ["achchiq-chuchuk", "15 000 so‘m"], ["suzma", "15 000 so‘m"],
      ["karam-salat", "12 000 so‘m"], ["sezar", "35 000 so‘m"],
    ]);
  });
});