"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { StarterMark } from "@/components/primitives/StarterMark";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
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
    <div style={{ ...prototypeFillColumn, padding: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
        <Caption>
          Item · {String(itemIndex).padStart(2, "0")} of 12
        </Caption>
        <div style={{ width: 20 }} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "0 16px 12px",
        }}
      >
        <ProductSlot item={item} style={{ aspectRatio: "4/5", maxHeight: "min(32svh, 240px)", width: "100%" }} showBadge={false} />

        <div style={{ paddingTop: 12 }}>
          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 10,
              color: "rgba(0,0,0,0.55)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {item.brand}
          </div>
          <Display
            size={24}
            style={{
              marginTop: 4,
              marginBottom: 14,
              fontSize: "clamp(18px, 4.8vmin, 26px)",
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </Display>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 10,
                borderBottom: "1px dashed rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <Caption>Retail</Caption>
                <div
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 20,
                    color: "rgba(0,0,0,0.4)",
                    textDecoration: "line-through",
                    marginTop: 2,
                  }}
                >
                  ${item.retail}
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)" }}>
                {item.resale ? `at ${item.brand.toLowerCase()}.com` : item.source}
              </div>
            </div>
            {item.resale ? (
              <div style={{ paddingTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <StarterMark size={10} />
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 8,
                          color: accent,
                          letterSpacing: 0.4,
                        }}
                      >
                        FOUND IT
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12, color: "#1a1a1a" }}>on {item.source}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: "clamp(28px, 8vmin, 36px)",
                      color: accent,
                      letterSpacing: -0.5,
                    }}
                  >
                    ${item.price}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 11,
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  {item.condition || "Excellent condition"}
                </div>
              </div>
            ) : (
              <div style={{ paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <Caption style={{ color: accent }}>New · Best price</Caption>
                  <div
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: 11,
                      color: "rgba(0,0,0,0.55)",
                      marginTop: 4,
                    }}
                  >
                    No better price found.
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(28px, 8vmin, 36px)", letterSpacing: -0.5 }}>
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
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 8,
                    letterSpacing: 0.8,
                    opacity: 0.75,
                    marginBottom: 2,
                  }}
                >
                  YOU SAVE
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 24, letterSpacing: -0.4 }}>${savings}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 28, letterSpacing: -0.4 }}>{pct}%</div>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 9, opacity: 0.75 }}>off retail</div>
              </div>
            </div>
          ) : null}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
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
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <Caption style={{ fontSize: 7 }}>{k}</Caption>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 11, color: "#1a1a1a", marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <PrimaryButton accent={accent}>Add to capsule cart</PrimaryButton>
          <button
            type="button"
            style={{
              width: "100%",
              height: 40,
              marginTop: 6,
              background: "none",
              border: "none",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 12,
              color: "rgba(0,0,0,0.55)",
              cursor: "pointer",
            }}
          >
            Swap for an alternative →
          </button>
        </div>
      </div>
    </div>
  );
}
