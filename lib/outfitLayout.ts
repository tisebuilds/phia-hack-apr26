import type { Item } from "@/lib/types";

/** Round-robin pull order so duplicate categories (e.g. several tops) rarely sit side-by-side. */
export const OUTFIT_CATEGORY_ROTATION = [
  "Outerwear",
  "Top",
  "Bottom",
  "Shoes",
  "Bag",
  "Accessory",
] as const;

/** At most one tile per product id (first occurrence wins). */
export function dedupeOutfitItemIds(ids: number[]): number[] {
  const seen = new Set<number>();
  return ids.filter((id) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function interleaveOutfitItemIds(ids: number[], resolve: (id: number) => Item | undefined): number[] {
  const queues = new Map<string, number[]>();
  for (const id of ids) {
    const it = resolve(id);
    if (!it) continue;
    const list = queues.get(it.category) ?? [];
    list.push(id);
    queues.set(it.category, list);
  }
  Array.from(queues.values()).forEach((q) => {
    q.sort((a, b) => a - b);
  });
  const known = OUTFIT_CATEGORY_ROTATION.filter((c) => (queues.get(c)?.length ?? 0) > 0);
  const rotationKeys = OUTFIT_CATEGORY_ROTATION as readonly string[];
  const extra = Array.from(queues.keys()).filter((c) => !rotationKeys.includes(c));
  const rotation = [...known, ...extra.filter((c) => (queues.get(c)?.length ?? 0) > 0)];
  const out: number[] = [];
  let remaining = ids.reduce((n, id) => (resolve(id) ? n + 1 : n), 0);
  while (remaining > 0) {
    for (const c of rotation) {
      const q = queues.get(c);
      if (q?.length) {
        out.push(q.shift()!);
        remaining -= 1;
      }
    }
  }
  return out;
}
