"use client";

import { useState } from "react";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { StarterMark } from "@/components/primitives/StarterMark";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import { dedupeOutfitItemIds, interleaveOutfitItemIds } from "@/lib/outfitLayout";
import type { Item, Outfit } from "@/lib/types";

export function SummaryScreen({
  accent,
  items,
  outfits,
  summaryTitleBefore,
  summaryTitleItalic,
  summaryTitleAfter,
  summaryBudgetBlurb,
  onBack,
  onItem,
  onStartShopping,
}: {
  accent: string;
  items: Item[];
  outfits: Outfit[];
  summaryTitleBefore: string;
  summaryTitleItalic: string;
  summaryTitleAfter: string;
  summaryBudgetBlurb: string;
  onBack: () => void;
  onItem?: (it: Item) => void;
  onStartShopping?: () => void;
}) {
  const [capsuleSaved, setCapsuleSaved] = useState(false);

  const total = items.reduce((s, i) => s + i.price, 0);
  const retail = items.reduce((s, i) => s + i.retail, 0);
  const resaleCount = items.filter((i) => i.resale).length;
  const savings = retail - total;
  const getItem = (id: number) => items.find((i) => i.id === id);

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
        <StarterMark size={12} />
        <div style={{ width: 20 }} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "0 16px 24px",
        }}
      >
        <Display
          size={34}
          style={{
            marginBottom: 6,
            fontSize: "clamp(24px, 6.5vmin, 38px)",
            lineHeight: 1.05,
          }}
        >
          {summaryTitleBefore}
          <em style={{ fontStyle: "italic" }}>{summaryTitleItalic}</em>
          {summaryTitleAfter}
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(11px, 2.8vmin, 13px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.45,
            marginBottom: 14,
          }}
        >
          {summaryBudgetBlurb}
        </div>

        <div
          style={{
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: 16,
            padding: "16px 16px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 7,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 0.6,
                }}
              >
                PRICE
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(36px, 10vmin, 52px)",
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                ${total}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 7,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 0.6,
                }}
              >
                RETAIL VALUE
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(22px, 6vmin, 28px)",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "line-through",
                  lineHeight: 1,
                }}
              >
                ${retail.toLocaleString()}
              </div>
            </div>
          </div>

          <div
            style={{
              marginBottom: 12,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 6,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {(
              [
                ["Mix", `${items.length - resaleCount} new · ${resaleCount} resale`],
                ["Savings", `$${savings.toLocaleString()}`],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 7,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: 0.6,
                  }}
                >
                  {k.toUpperCase()}
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 17, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              paddingTop: 12,
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
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(13px, 3.5vmin, 17px)",
                  marginTop: 4,
                  lineHeight: 1.2,
                }}
              >
                50% fewer returns than panic-shopping
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {outfits.map((o, outfitIdx) => (
            <div
              key={`${o.day}-${o.note}`}
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
                    maxWidth: "48%",
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
                    (it.category === "Top" && prev?.category === "Top") || (it.category === "Bag" && prev?.category === "Bag");
                  return (
                    <span key={`${o.day}-${id}-${idx}`} style={{ display: "contents" }}>
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
                        onClick={() => onItem?.(it)}
                        disabled={!onItem}
                        style={{
                          flex: "1 1 0",
                          minWidth: 0,
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: onItem ? "pointer" : "default",
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
        </div>
      </div>

      <div
        style={{
          padding: "10px 16px max(12px, env(safe-area-inset-bottom))",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flexShrink: 0,
          background: "#F5F5F5",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <PrimaryButton accent={accent} onClick={onStartShopping}>
          Start shopping · ${total}
        </PrimaryButton>
        <button
          type="button"
          disabled={capsuleSaved}
          onClick={() => setCapsuleSaved(true)}
          style={{
            width: "100%",
            height: 44,
            borderRadius: 999,
            background: capsuleSaved ? "rgba(0,0,0,0.04)" : "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: capsuleSaved ? "default" : "pointer",
            color: capsuleSaved ? "rgba(0,0,0,0.45)" : "#1a1a1a",
          }}
        >
          {capsuleSaved ? "Saved" : "Save capsule"}
        </button>
      </div>
    </div>
  );
}
