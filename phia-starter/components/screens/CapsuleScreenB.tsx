"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import type { Company, Item } from "@/lib/types";

export function CapsuleScreenB({
  accent,
  items,
  company,
  budget,
  onItem,
  onOutfits,
  onSummary,
}: {
  accent: string;
  items: Item[];
  company: Company;
  budget: number;
  onItem: (it: Item) => void;
  onOutfits: () => void;
  onSummary: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price, 0);
  const retail = items.reduce((s, i) => s + i.retail, 0);
  const resaleCount = items.filter((i) => i.resale).length;

  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const dur = 900;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(Math.round(eased * total));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const hero = items[0];
  const rest = items.slice(1);

  return (
    <div style={{ background: "#fafaf7", minHeight: "100%", paddingBottom: 40 }}>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <Caption>Your starter capsule</Caption>
          <div
            style={{
              padding: "5px 10px",
              borderRadius: 999,
              background: "#1a1a1a",
              color: "#fff",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
              letterSpacing: 0.8,
            }}
          >
            ${display} / ${budget}
          </div>
        </div>
        <Display size={30} style={{ marginBottom: 6 }}>
          A wardrobe,
          <br />
          <em style={{ fontStyle: "italic" }}>one tap away.</em>
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
            color: "rgba(0,0,0,0.55)",
            marginBottom: 6,
          }}
        >
          {company?.vibe}
        </div>
        <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 16 }}>
          12 pieces for {company?.name || "Deloitte"} · {resaleCount} resale · retail ${retail.toLocaleString()}
        </div>
      </div>

      <div style={{ padding: "0 20px 10px" }}>
        <button
          type="button"
          onClick={() => onItem(hero)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "16/11" }}>
              <ProductSlot item={hero} style={{ aspectRatio: "16/11", height: "100%" }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 16,
                bottom: 14,
                right: 16,
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 9,
                    letterSpacing: 0.8,
                    marginBottom: 4,
                    opacity: 0.8,
                  }}
                >
                  CORNERSTONE · 01
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 22, lineHeight: 1.1 }}>
                  {hero.brand} {hero.name}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 22 }}>${hero.price}</div>
                {hero.resale ? (
                  <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 10, opacity: 0.8 }}>
                    via {hero.source}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </button>
      </div>

      <div style={{ padding: "10px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {rest.map((it) => (
          <button
            type="button"
            key={it.id}
            onClick={() => onItem(it)}
            style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: 12,
              padding: 8,
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div style={{ width: 56, flexShrink: 0 }}>
              <ProductSlot item={it} compact />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 9.5,
                  color: "rgba(0,0,0,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                }}
              >
                {it.brand}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 11,
                  lineHeight: 1.2,
                  marginTop: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {it.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 3 }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 13,
                    color: it.resale ? accent : "#1a1a1a",
                  }}
                >
                  ${it.price}
                </span>
                {it.resale ? (
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 8,
                      color: "rgba(0,0,0,0.4)",
                      letterSpacing: 0.3,
                    }}
                  >
                    RESALE
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: "22px 20px 0", display: "flex", gap: 10 }}>
        <button
          type="button"
          onClick={onOutfits}
          style={{
            flex: 1,
            height: 48,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            color: "#1a1a1a",
          }}
        >
          See 20+ outfits
        </button>
        <button
          type="button"
          onClick={onSummary}
          style={{
            flex: 1,
            height: 48,
            borderRadius: 999,
            border: "none",
            background: accent,
            color: "#fff",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Review capsule
        </button>
      </div>
    </div>
  );
}
