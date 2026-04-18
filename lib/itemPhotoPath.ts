import type { Item } from "./types";

/**
 * Basename under `/products/labeled/{name}.jpg`.
 * Keep in sync with `ITEM_EXPORT` in `scripts/sync-product-photos.py`.
 */
const ITEM_LABELED: Record<number, string> = {
  1: "shoes-mule-sarto-beige",
  2: "bag-tote-cognac-pebble-leather",
  3: "outerwear-blazer-white-open",
  4: "boots-slouch-black-knee-white-skirt",
  5: "bag-shoulder-slouch-rust",
  6: "bottom-trousers-white-wide-crop",
  7: "top-cardigan-ivory-halogen",
  8: "top-rib-tee-white-denim-cargo",
  9: "top-bodysuit-cream-snaps",
  10: "top-blouse-wrap-cream",
  11: "outerwear-wrap-knit-shawl-oatmeal",
  12: "boots-chelsea-platform-brown",
};

/**
 * Every JPEG emitted under `public/products/labeled/` by `scripts/sync-product-photos.py`.
 * Keep alphabetically sorted when you add/remove assets.
 */
export const ALL_LABELED_BASES: readonly string[] = [
  "accessory-beanie-rib-oatmeal",
  "accessory-belt-black-gold-buckle",
  "accessory-sunglasses-tortoise-diff",
  "bag-shoulder-slouch-rust",
  "bag-tote-cognac-pebble-leather",
  "boots-ankle-suede-brown-kitten",
  "boots-chelsea-platform-brown",
  "boots-slouch-black-knee-white-skirt",
  "bottom-jeans-wide-leg-loafers",
  "bottom-leggings-black-studio",
  "bottom-skirt-maxi-satin-champagne",
  "bottom-trousers-black-pleated",
  "bottom-trousers-cream-pleated-belt",
  "bottom-trousers-white-wide-crop",
  "outerwear-blazer-camel-on-model",
  "outerwear-blazer-white-open",
  "outerwear-coat-black-funnel-zip",
  "outerwear-wrap-coat-full-body",
  "outerwear-wrap-knit-shawl-oatmeal",
  "shoes-loafer-horsebit-tan-suede",
  "shoes-mule-sarto-beige",
  "shoes-pump-beige-stiletto",
  "top-blouse-twist-front-tan",
  "top-blouse-wrap-cream",
  "top-bodysuit-cream-snaps",
  "top-cardigan-ivory-halogen",
  "top-dress-shirt-stripe-tie-waist",
  "top-dress-white-shift-vneck",
  "top-knit-sweater-boatneck-brown",
  "top-rib-tee-white-denim-cargo",
  "top-shirt-powder-blue-button",
  "top-shirt-white-long-sleeve",
  "top-sweater-turtleneck-charcoal",
  "top-tank-ruffle-pink-express",
  "top-turtleneck-black-with-jeans",
] as const;

function urlForBase(base: string): string {
  return `/products/labeled/${base}.jpg`;
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
  return ALL_LABELED_BASES.filter((b) => pfxs.some((p) => b.startsWith(p)));
}

/**
 * Rotate through category-matching labeled shots so outfit grids surface the full library over time.
 * Falls back to the default hero for this item id when the pool is empty.
 */
export function productImageSrcVariant(item: Item, salt: number): string {
  const pool = labeledBasesForItemCategory(item.category);
  if (!pool.length) return productImageSrc(item.id);

  const primary = ITEM_LABELED[item.id];
  const ordered =
    primary && pool.includes(primary)
      ? [primary, ...pool.filter((b) => b !== primary)]
      : [...pool];

  const base = ordered[Math.abs(salt) % ordered.length]!;
  return urlForBase(base);
}

export function productImageSrc(itemId: number): string {
  const base = ITEM_LABELED[itemId];
  if (base) return urlForBase(base);
  return `/products/${itemId}.jpg`;
}
