"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
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
    <div style={{ ...prototypeFillColumn, padding: 0 }}>
      <div style={{ padding: "6px 16px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Caption>Your starter capsule</Caption>
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 999,
              background: "#1a1a1a",
              color: "#fff",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 8,
              letterSpacing: 0.8,
            }}
          >
            ${display} / ${budget}
          </div>
        </div>
        <Display
          size={28}
          style={{
            marginBottom: 4,
            fontSize: "clamp(20px, 5vmin, 30px)",
            lineHeight: 1.05,
          }}
        >
          A wardrobe,
          <br />
          <em style={{ fontStyle: "italic" }}>one tap away.</em>
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(10px, 2.6vmin, 12px)",
            color: "rgba(0,0,0,0.55)",
            marginBottom: 4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {company?.vibe}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(10px, 2.6vmin, 12px)",
            color: "rgba(0,0,0,0.55)",
            marginBottom: 8,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          12 pieces for {company?.name || "Deloitte"} · {resaleCount} resale · retail ${retail.toLocaleString()}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "0 16px",
        }}
      >
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
            <div style={{ aspectRatio: "16/11", maxHeight: "min(38svh, 220px)" }}>
              <ProductSlot item={hero} style={{ aspectRatio: "16/11", height: "100%" }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 10,
                right: 12,
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
                    fontSize: 8,
                    letterSpacing: 0.8,
                    marginBottom: 3,
                    opacity: 0.8,
                  }}
                >
                  CORNERSTONE · 01
                </div>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(16px, 4.5vmin, 20px)", lineHeight: 1.1 }}>
                  {hero.brand} {hero.name}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(16px, 4.5vmin, 20px)" }}>${hero.price}</div>
                {hero.resale ? (
                  <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 9, opacity: 0.8 }}>via {hero.source}</div>
                ) : null}
              </div>
            </div>
          </div>
        </button>

        <div style={{ padding: "10px 0 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {rest.map((it) => (
            <button
              type="button"
              key={it.id}
              onClick={() => onItem(it)}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: 10,
                padding: 6,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div style={{ width: 48, flexShrink: 0 }}>
                <ProductSlot item={it} compact />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 9,
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
                    fontSize: 10,
                    lineHeight: 1.2,
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {it.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-serif), serif",
                      fontSize: 12,
                      color: it.resale ? accent : "#1a1a1a",
                    }}
                  >
                    ${it.price}
                  </span>
                  {it.resale ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 7,
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
      </div>

      <div style={{ padding: "10px 16px 10px", display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          onClick={onOutfits}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
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
            height: 44,
            borderRadius: 999,
            border: "none",
            background: accent,
            color: "#fff",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
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
