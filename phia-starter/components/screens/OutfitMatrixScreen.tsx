"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { STARTER_DATA } from "@/lib/data";
import type { Item } from "@/lib/types";

export function OutfitMatrixScreen({
  accent,
  items,
  onBack,
  onSummary,
}: {
  accent: string;
  items: Item[];
  onBack: () => void;
  onSummary: () => void;
}) {
  const getItem = (id: number) => items.find((i) => i.id === id);
  const outfits = STARTER_DATA.outfits;

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
        <Caption>Outfits · 20+</Caption>
        <div style={{ width: 20 }} />
      </div>

      <div style={{ padding: "0 20px 18px" }}>
        <Display size={28} style={{ marginBottom: 6 }}>
          Twenty outfits
          <br />
          for your <em style={{ fontStyle: "italic" }}>first 90 days.</em>
        </Display>
        <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.55)" }}>
          Every piece earns its place by pairing with at least four others.
        </div>
      </div>

      <div
        style={{
          margin: "0 20px 16px",
          padding: "14px 16px",
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
              letterSpacing: 0.8,
              opacity: 0.65,
            }}
          >
            RETURNS DATA
          </div>
          <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 18, marginTop: 2 }}>
            50% fewer returns than panic-shopping
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 34, color: accent }}>½</div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {outfits.map((o, i) => (
          <div
            key={o.day}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 14,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 9,
                    color: "rgba(0,0,0,0.4)",
                    letterSpacing: 0.4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 18 }}>{o.day}</div>
              </div>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>
                {o.note}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {o.items.map((id) => {
                const it = getItem(id);
                if (!it) return null;
                return (
                  <div key={id} style={{ flex: 1 }}>
                    <ProductSlot item={it} compact showBadge={false} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <PrimaryButton accent={accent} onClick={onSummary}>
          Save this capsule →
        </PrimaryButton>
      </div>
    </div>
  );
}
