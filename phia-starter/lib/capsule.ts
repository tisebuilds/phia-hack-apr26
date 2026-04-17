import type { Item } from "./types";

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function sumPrices(prices: number[]): number {
  return prices.reduce((a, b) => a + b, 0);
}

/** Ensure totals never exceed budget (rounding + mins can overshoot the prototype). */
function enforceBudgetCap(prices: number[], budget: number): number[] {
  const minEach = 1;
  let p = prices.map((x) => Math.max(minEach, Math.round(x)));
  let s = sumPrices(p);
  if (s <= budget) return p;

  const factor = budget / s;
  p = p.map((x) => Math.max(minEach, Math.floor(x * factor)));
  s = sumPrices(p);

  let guard = 0;
  while (s > budget && guard < 10000) {
    const idx = p.indexOf(Math.max(...p));
    if (p[idx] <= minEach) break;
    p[idx] -= 1;
    s -= 1;
    guard += 1;
  }
  return p;
}

type WorkingItem = Item & { rawPrice: number };

/**
 * Derives the 12 displayed capsule items: resale mix, vibe-aware resale selection,
 * then uniform rescale targeting ~97% of budget, capped to never exceed budget.
 */
export function deriveCapsule(
  baseItems: Item[],
  budget: number,
  resaleMix: number,
  vibe: string,
): Item[] {
  const base = baseItems.map((i) => ({ ...i }));
  const targetResale = Math.round((resaleMix / 100) * 12);
  const sortedByRatio = [...base].sort(
    (a, b) => a.price / a.retail - b.price / b.retail,
  );
  const offset = hashString(vibe) % Math.max(1, sortedByRatio.length);
  const rotated = [
    ...sortedByRatio.slice(offset),
    ...sortedByRatio.slice(0, offset),
  ];
  const resaleIds = new Set(rotated.slice(0, targetResale).map((i) => i.id));

  const adjusted: WorkingItem[] = base.map((i) => {
    const resale = resaleIds.has(i.id);
    const rawPrice = resale ? i.price : i.retail;
    return { ...i, resale, rawPrice };
  });

  const rawSum = adjusted.reduce((s, i) => s + i.rawPrice, 0);
  const target = budget * 0.97;
  const k = rawSum > 0 ? target / rawSum : 1;

  const rawScaled = adjusted.map((i) => Math.max(25, Math.round(i.rawPrice * k)));

  const finalPrices = enforceBudgetCap(rawScaled, budget);

  return adjusted.map((i, idx) => ({
    id: i.id,
    brand: i.brand,
    name: i.name,
    category: i.category,
    retail: i.retail,
    price: finalPrices[idx],
    resale: i.resale,
    source: i.source,
    condition: i.condition,
    tone: i.tone,
  }));
}
