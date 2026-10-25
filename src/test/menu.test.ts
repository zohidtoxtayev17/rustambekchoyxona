import { describe, expect, it } from "vitest";
import { categories, dishes } from "@/config/restaurant";

describe("Menu categories", () => {
  it("has no desserts category", () => {
    expect(categories.some((category) => category.id === "shirinlik")).toBe(false);
    expect(categories.some((category) => category.label === "Shirinliklar")).toBe(false);
  });
  it("shows exactly the five remaining tabs in order", () => {
    expect(categories.map((category) => category.id)).toEqual([
      "all",
      "asosiy",
      "somsa",
      "salat",
      "ichimlik",
    ]);
  });
  it("keeps every dish in a category that is still offered", () => {
    const offered = categories.map((category) => category.id);
    for (const dish of dishes) {
      expect(offered).toContain(dish.category);
    }
  });
});
