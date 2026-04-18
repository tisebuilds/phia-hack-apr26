"use client";

import Image from "next/image";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { ALL_LABELED_BASES } from "@/lib/itemPhotoPath";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import { STARTER_DATA } from "@/lib/data";
import type { Item } from "@/lib/types";

/** Round-robin pull order so duplicate categories (e.g. several tops) rarely sit side-by-side. */
const OUTFIT_CATEGORY_ROTATION = [
  "Outerwear",
  "Top",
  "Bottom",
  "Shoes",
  "Bag",
  "Accessory",
] as const;

/** At most one tile per product id (first occurrence wins). */
function dedupeOutfitItemIds(ids: number[]): number[] {
  const seen = new Set<number>();
  return ids.filter((id) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function interleaveOutfitItemIds(ids: number[], resolve: (id: number) => Item | undefined): number[] {
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

export function OutfitMatrixScreen({
  accent,
  items,
  onItem,
  onBack,
  onSummary,
}: {
  accent: string;
  items: Item[];
  onItem: (it: Item) => void;
  onBack: () => void;
  onSummary: () => void;
}) {
  const getItem = (id: number) => items.find((i) => i.id === id);
  const outfits = STARTER_DATA.outfits;

  const total = items.reduce((s, i) => s + i.price, 0);
  const retail = items.reduce((s, i) => s + i.retail, 0);
  const resaleCount = items.filter((i) => i.resale).length;

  return (
    <div style={{ ...prototypeFillColumn, padding: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 16px 8px",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: "#1a1a1a",
            padding: 0,
          }}
        >
          ←
        </button>
      </div>

      <div style={{ padding: "0 16px 10px", flexShrink: 0 }}>
        <Display
          size={26}
          style={{
            marginBottom: 4,
            fontSize: "clamp(20px, 5vmin, 28px)",
            lineHeight: 1.05,
          }}
        >
          Twenty outfits for <em style={{ fontStyle: "italic" }}>first 90 days</em>.
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(10px, 2.6vmin, 12px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.4,
            marginBottom: 10,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {resaleCount} resale · {items.length - resaleCount} new. Retail ${retail.toLocaleString()},{" "}
          <strong>yours for ${total}.</strong>
        </div>
      </div>

      <div
        style={{
          margin: "0 16px 10px",
          padding: "12px 14px",
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 8,
              letterSpacing: 0.8,
              opacity: 0.65,
            }}
          >
            RETURNS DATA
          </div>
          <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(14px, 3.8vmin, 18px)", marginTop: 2, lineHeight: 1.15 }}>
            50% fewer returns than panic-shopping
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(26px, 7vmin, 34px)", color: accent, flexShrink: 0 }}>½</div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {outfits.map((o, outfitIdx) => (
          <div
            key={o.day}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 12,
              border: "1px solid rgba(0,0,0,0.05)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 8,
                gap: 8,
              }}
            >
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 16, minWidth: 0 }}>{o.day}</div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 10,
                  color: "rgba(0,0,0,0.5)",
                  textAlign: "right",
                  maxWidth: "45%",
                }}
              >
                {o.note}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {interleaveOutfitItemIds(dedupeOutfitItemIds(o.items), getItem).map((id, idx, arr) => {
                const it = getItem(id);
                if (!it) return null;
                const prev = idx > 0 ? getItem(arr[idx - 1]!) : undefined;
                const forceRowBreak =
                  (it.category === "Top" && prev?.category === "Top") ||
                  (it.category === "Bag" && prev?.category === "Bag");
                return (
                  <span key={id} style={{ display: "contents" }}>
                    {forceRowBreak ? (
                      <span
                        aria-hidden
                        style={{
                          flexBasis: "100%",
                          width: 0,
                          height: 0,
                          overflow: "hidden",
                        }}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onItem(it)}
                      style={{
                        flex: "1 1 0",
                        minWidth: 0,
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <ProductSlot
                        item={it}
                        compact
                        showBadge={false}
                        labeledVariantSalt={outfitIdx * 83 + idx * 17 + it.id}
                      />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            paddingBottom: 4,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {ALL_LABELED_BASES.map((base) => (
            <div
              key={base}
              style={{
                position: "relative",
                flexShrink: 0,
                width: 44,
                aspectRatio: "3/4",
                borderRadius: 5,
                overflow: "hidden",
                background: "rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src={`/products/labeled/${base}.jpg`}
                alt=""
                fill
                sizes="44px"
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "8px 16px 10px", flexShrink: 0 }}>
        <PrimaryButton accent={accent} onClick={onSummary}>
          Save this capsule →
        </PrimaryButton>
      </div>
    </div>
  );
}
