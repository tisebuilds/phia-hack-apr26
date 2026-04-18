"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
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
        <Caption>Outfits · 20+</Caption>
        <div style={{ width: 20 }} />
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
          Twenty outfits
          <br />
          for your <em style={{ fontStyle: "italic" }}>first 90 days.</em>
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(10px, 2.6vmin, 12px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Every piece earns its place by pairing with at least four others.
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
        {outfits.map((o, i) => (
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
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 8,
                    color: "rgba(0,0,0,0.4)",
                    letterSpacing: 0.4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 16 }}>{o.day}</div>
              </div>
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
            <div style={{ display: "flex", gap: 5 }}>
              {o.items.map((id) => {
                const it = getItem(id);
                if (!it) return null;
                return (
                  <div key={id} style={{ flex: 1, minWidth: 0 }}>
                    <ProductSlot item={it} compact showBadge={false} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "8px 16px 10px", flexShrink: 0 }}>
        <PrimaryButton accent={accent} onClick={onSummary}>
          Save this capsule →
        </PrimaryButton>
      </div>
    </div>
  );
}
