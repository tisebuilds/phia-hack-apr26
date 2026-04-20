import type { Item } from "./types";

/** Phia library: tops, bottoms, outerwear (space encoded in URLs). */
const PHIA_IMAGE_DIR = "/Phia clothing";

/** Original stock photos for bags and footwear (boot filenames use `boots-` prefix). */
const LEGACY_LABELED_DIR = "/products/labeled";

function usesLegacyLabeledPath(category: string): boolean {
  return category === "Bag" || category === "Shoes";
}

function phiaBasenames(prefix: "outerwear" | "top" | "bottom"): readonly string[] {
  return Array.from({ length: 19 }, (_, i) => `${prefix}-phia-${String(i + 1).padStart(2, "0")}`);
}

/**
 * Basename (no path, no ext). Heroes may resolve from Phia or legacy depending on `Item.category`.
 * Keep in sync with `ITEM_EXPORT` in `scripts/sync-product-photos.py` if you use that script.
 */
const ITEM_LABELED: Record<number, string> = {
  1: "shoes-mule-sarto-beige",
  2: "bag-tote-cognac-pebble-leather",
  3: "outerwear-phia-01",
  4: "boots-slouch-black-knee-white-skirt",
  5: "bag-shoulder-slouch-rust",
  6: "bottom-phia-01",
  7: "top-phia-01",
  8: "top-phia-02",
  9: "top-phia-03",
  10: "top-phia-04",
  11: "outerwear-phia-02",
  12: "boots-chelsea-platform-brown",
};

/** JPEGs under `public/products/labeled/` — bags and shoes/boots only. */
const LEGACY_BAG_SHOE_BASES: readonly string[] = [
  "bag-shoulder-slouch-rust",
  "bag-tote-cognac-pebble-leather",
  "boots-ankle-suede-brown-kitten",
  "boots-chelsea-platform-brown",
  "boots-slouch-black-knee-white-skirt",
  "shoes-loafer-horsebit-tan-suede",
  "shoes-mule-sarto-beige",
  "shoes-pump-beige-stiletto",
] as const;

/** JPEGs under `public/Phia clothing/` — re-uploaded Phia set (`outerwear|top|bottom`-phia-NN). */
const PHIA_CLOTHING_BASES: readonly string[] = [
  ...phiaBasenames("outerwear"),
  ...phiaBasenames("top"),
  ...phiaBasenames("bottom"),
].sort((a, b) => a.localeCompare(b));

/** Union of both libraries, sorted (for reference / tooling). */
export const ALL_LABELED_BASES: readonly string[] = [...LEGACY_BAG_SHOE_BASES, ...PHIA_CLOTHING_BASES].sort((a, b) =>
  a.localeCompare(b),
);

function urlForItemPhoto(item: Item, base: string): string {
  if (usesLegacyLabeledPath(item.category)) {
    return `${LEGACY_LABELED_DIR}/${base}.jpg`;
  }
  return encodeURI(`${PHIA_IMAGE_DIR}/${base}.jpg`);
}

function categoryPrefixes(category: string): readonly string[] {
  switch (category) {
    case "Shoes":
      return ["shoes-", "boots-"];
    case "Bag":
      return ["bag-"];
    case "Outerwear":
      return ["outerwear-"];
    case "Top":
      return ["top-"];
    case "Bottom":
      return ["bottom-"];
    case "Accessory":
      return ["accessory-"];
    default:
      return [];
  }
}

/** Labeled assets whose filename prefix matches this catalog `Item.category`. */
export function labeledBasesForItemCategory(category: string): string[] {
  const pfxs = categoryPrefixes(category);
  if (!pfxs.length) return [];
  const pool = usesLegacyLabeledPath(category) ? LEGACY_BAG_SHOE_BASES : PHIA_CLOTHING_BASES;
  return pool.filter((b) => pfxs.some((p) => b.startsWith(p)));
}

/**
 * Rotate through category-matching shots so outfit grids surface the full library over time.
 * Falls back to the default hero for this item id when the pool is empty.
 */
export function productImageSrcVariant(item: Item, salt: number): string {
  const pool = labeledBasesForItemCategory(item.category);
  if (!pool.length) return productImageSrc(item);

  const primary = ITEM_LABELED[item.id];
  const ordered =
    primary && pool.includes(primary)
      ? [primary, ...pool.filter((b) => b !== primary)]
      : [...pool];

  const base = ordered[Math.abs(salt) % ordered.length]!;
  return urlForItemPhoto(item, base);
}

export function productImageSrc(item: Item): string {
  const base = ITEM_LABELED[item.id];
  if (base) return urlForItemPhoto(item, base);
  return usesLegacyLabeledPath(item.category)
    ? `${LEGACY_LABELED_DIR}/catalog-${item.id}.jpg`
    : encodeURI(`${PHIA_IMAGE_DIR}/catalog-${item.id}.jpg`);
}
