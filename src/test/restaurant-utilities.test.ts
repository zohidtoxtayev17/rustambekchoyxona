import { describe, expect, it } from "vitest";
import { isRestaurantOpen, parseFavorites, toggleFavorite } from "@/lib/restaurant-utilities";

describe("Daily opening hours in Asia/Tashkent", () => {
  it.each([
    ["2026-10-26T02:59:59Z", false],
    ["2026-10-26T03:00:00Z", true],
    ["2026-10-26T18:59:59Z", true],
    ["2026-10-26T19:00:00Z", false],
    ["2026-10-26T19:01:00Z", false],
    ["2026-10-25T03:00:00Z", true],
  ])("at %s returns %s", (time, expected) => {
    expect(isRestaurantOpen(new Date(time))).toBe(expected);
  });
});

describe("Local dish favorites", () => {
  it("adds and removes a dish", () => {
    expect(toggleFavorite([], "osh")).toEqual(["osh"]);
    expect(toggleFavorite(["osh", "choy"], "osh")).toEqual(["choy"]);
  });
  it("restores saved favorites and ignores invalid entries", () => {
    expect(parseFavorites('["osh","osh","removed",5]', ["osh", "choy"])).toEqual(["osh"]);
    expect(parseFavorites("bad json", ["osh"])).toEqual([]);
    expect(parseFavorites('{"osh":true}', ["osh"])).toEqual([]);
  });
});