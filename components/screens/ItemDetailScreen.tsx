"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { StarterMark } from "@/components/primitives/StarterMark";
import type { Item } from "@/lib/types";

export function ItemDetailScreen({
  accent,
  item,
  itemIndex,
  onBack,
}: {
  accent: string;
  item: Item;
  itemIndex: number;
  onBack: () => void;
}) {
  const savings = item.retail - item.price;
  const pct = Math.round((savings / item.retail) * 100);

  return (
    <div style={{ background: "#fafaf7", minHeight: "100%", paddingBottom: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 20px 14px",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#1a1a1a",
            padding: 0,
          }}
        >
          ←
        </button>
        <Caption>
          Item · {String(itemIndex).padStart(2, "0")} of 12
        </Caption>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: "0 20px" }}>
        <ProductSlot item={item} style={{ aspectRatio: "4/5" }} showBadge={false} />
      </div>

      <div style={{ padding: "18px 20px 0" }}>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 11,
            color: "rgba(0,0,0,0.55)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {item.brand}
        </div>
        <Display size={26} style={{ marginTop: 4, marginBottom: 20 }}>
          {item.name}
        </Display>

        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 16,
            border: "1px solid rgba(0,0,0,0.06)",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 12,
              borderBottom: "1px dashed rgba(0,0,0,0.1)",
            }}
          >
            <div>
              <Caption>Retail</Caption>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 22,
                  color: "rgba(0,0,0,0.4)",
                  textDecoration: "line-through",
                  marginTop: 2,
                }}
              >
                ${item.retail}
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>
              {item.resale ? `at ${item.brand.toLowerCase()}.com` : item.source}
            </div>
          </div>
          {item.resale ? (
            <div style={{ paddingTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <StarterMark size={10} />
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 9,
                        color: accent,
                        letterSpacing: 0.4,
                      }}
                    >
                      FOUND IT
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 13, color: "#1a1a1a" }}>
                    on {item.source}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 40,
                    color: accent,
                    letterSpacing: -0.5,
                  }}
                >
                  ${item.price}
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 12,
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                {item.condition || "Excellent condition"}
              </div>
            </div>
          ) : (
            <div style={{ paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <Caption style={{ color: accent }}>New · Best price</Caption>
                <div
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 12,
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 4,
                  }}
                >
                  No better price found.
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 40, letterSpacing: -0.5 }}>
                ${item.price}
              </div>
            </div>
          )}
        </div>

        {item.resale ? (
          <div
            style={{
              background: accent,
              color: "#fff",
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9,
                  letterSpacing: 0.8,
                  opacity: 0.75,
                  marginBottom: 2,
                }}
              >
                YOU SAVE
              </div>
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 28, letterSpacing: -0.4 }}>
                ${savings}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 32, letterSpacing: -0.4 }}>{pct}%</div>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 10, opacity: 0.75 }}>off retail</div>
            </div>
          </div>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
          {(
            [
              ["Category", item.category],
              ["Condition", item.condition || "New"],
              ["Source", item.source],
              ["Est. delivery", item.resale ? "4–6 days" : "2–3 days"],
            ] as const
          ).map(([k, v]) => (
            <div
              key={k}
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: "10px 12px",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Caption style={{ fontSize: 8 }}>{k}</Caption>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12, color: "#1a1a1a", marginTop: 2 }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton accent={accent}>Add to capsule cart</PrimaryButton>
        <button
          type="button"
          style={{
            width: "100%",
            height: 44,
            marginTop: 8,
            background: "none",
            border: "none",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            color: "rgba(0,0,0,0.55)",
            cursor: "pointer",
          }}
        >
          Swap for an alternative →
        </button>
      </div>
    </div>
  );
}
