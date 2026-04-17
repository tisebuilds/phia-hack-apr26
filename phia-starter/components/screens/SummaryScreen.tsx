"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { StarterMark } from "@/components/primitives/StarterMark";
import type { Company, Item } from "@/lib/types";

export function SummaryScreen({
  accent,
  items,
  company,
  budget,
  onBack,
  onRestart,
}: {
  accent: string;
  items: Item[];
  company: Company;
  budget: number;
  onBack: () => void;
  onRestart: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price, 0);
  const retail = items.reduce((s, i) => s + i.retail, 0);
  const resaleCount = items.filter((i) => i.resale).length;
  const savings = retail - total;

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
        <StarterMark size={12} />
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: "20px 20px 24px" }}>
        <Caption style={{ marginBottom: 10 }}>Your capsule is ready</Caption>
        <Display size={38} style={{ marginBottom: 8 }}>
          Your <em style={{ fontStyle: "italic" }}>first day</em>,<br />
          handled.
        </Display>
        <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 13, color: "rgba(0,0,0,0.55)", lineHeight: 1.55 }}>
          A 90-day starter wardrobe for {company?.name || "Deloitte"}, built to your ${budget} budget. Every piece pairs with every other piece.
        </div>
      </div>

      <div style={{ padding: "0 20px 14px" }}>
        <div
          style={{
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: 18,
            padding: "22px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
            <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 56, letterSpacing: -1, lineHeight: 1 }}>
              ${total}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "line-through",
              }}
            >
              ${retail.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {(
              [
                ["Pieces", items.length],
                ["New", items.length - resaleCount],
                ["Resale", resaleCount],
                ["Outfits", "20+"],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: 0.6,
                  }}
                >
                  {k.toUpperCase()}
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 22, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              padding: "12px 14px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12 }}>You saved vs. retail</div>
            <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 20, color: accent }}>${savings.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px 18px" }}>
        <Caption style={{ marginBottom: 8 }}>12 pieces</Caption>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          {items.map((it) => (
            <div key={it.id} style={{ flexShrink: 0, width: 58 }}>
              <ProductSlot item={it} compact />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <PrimaryButton accent={accent}>Add all to cart · ${total}</PrimaryButton>
        <button
          type="button"
          style={{
            width: "100%",
            height: 48,
            borderRadius: 999,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            color: "#1a1a1a",
          }}
        >
          Save capsule to Phia
        </button>
        <button
          type="button"
          onClick={onRestart}
          style={{
            width: "100%",
            height: 40,
            marginTop: 4,
            background: "none",
            border: "none",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
            color: "rgba(0,0,0,0.45)",
            cursor: "pointer",
          }}
        >
          Restart demo ↺
        </button>
      </div>
    </div>
  );
}
