import { describe, expect, it } from "vitest";
import { deriveCapsule } from "./capsule";
import { STARTER_DATA } from "./data";

describe("deriveCapsule", () => {
  it("never exceeds budget for sampled budgets, mixes, and vibes", () => {
    const vibes = ["minimal", "editorial", "preppy", "edge-case"];
    for (let budget = 200; budget <= 1500; budget += 50) {
      for (let mix = 0; mix <= 100; mix += 10) {
        for (const vibe of vibes) {
          const items = deriveCapsule(STARTER_DATA.items, budget, mix, vibe);
          const total = items.reduce((s, i) => s + i.price, 0);
          expect(total).toBeLessThanOrEqual(budget);
        }
      }
    }
  });

  it("tracks roughly 90–100% of budget for mid-to-high budgets (post-cap sanity)", () => {
    for (const budget of [600, 900, 1200, 1500]) {
      const items = deriveCapsule(STARTER_DATA.items, budget, 50, "minimal");
      const total = items.reduce((s, i) => s + i.price, 0);
      expect(total).toBeGreaterThanOrEqual(budget * 0.88);
      expect(total).toBeLessThanOrEqual(budget);
    }
  });
});
