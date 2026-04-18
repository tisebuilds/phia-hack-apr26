"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { Company, Item } from "@/lib/types";

export function CapsuleScreenA({
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

  const [tab, setTab] = useState<"grid" | "outfits">("grid");
  const go = (t: "grid" | "outfits") => {
    setTab(t);
    if (t === "outfits") onOutfits();
  };

  return (
    <div style={{ ...prototypeFillColumn, padding: 0 }}>
      <div style={{ padding: "6px 16px 10px", flexShrink: 0 }}>
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
          size={26}
          style={{
            marginBottom: 6,
            fontSize: "clamp(20px, 5vmin, 28px)",
            lineHeight: 1.05,
          }}
        >
          Twelve pieces for
          <br />
          <em style={{ fontStyle: "italic" }}>{company?.name || "Deloitte"}</em>.
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(10px, 2.6vmin, 12px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.4,
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
            lineHeight: 1.4,
            marginBottom: 10,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {resaleCount} resale · {items.length - resaleCount} new · built to mix. Retail ${retail.toLocaleString()}, yours for ${total}.
        </div>

        <div style={{ display: "flex", gap: 16, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          {(["grid", "outfits"] as const).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => go(t)}
              style={{
                background: "none",
                border: "none",
                padding: "8px 0",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: tab === t ? "#1a1a1a" : "rgba(0,0,0,0.4)",
                borderBottom: tab === t ? `1.5px solid ${accent}` : "1.5px solid transparent",
                marginBottom: -1,
                cursor: "pointer",
                textTransform: "capitalize",
                letterSpacing: -0.2,
              }}
            >
              {t === "grid" ? "Grid" : `Outfits · 20+`}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button
            type="button"
            onClick={onSummary}
            style={{
              background: "none",
              border: "none",
              padding: "8px 0",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 12,
              color: "rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}
          >
            Summary →
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "10px 16px 12px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {items.map((it) => (
            <button
              type="button"
              key={it.id}
              onClick={() => onItem(it)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <ProductSlot item={it} compact />
              <div style={{ paddingTop: 6 }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 9,
                    color: "rgba(0,0,0,0.5)",
                    letterSpacing: 0.2,
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {it.brand}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 10,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                    marginTop: 2,
                    minHeight: 24,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {it.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 3 }}>
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
                        fontFamily: "var(--font-sans), sans-serif",
                        fontSize: 8,
                        color: "rgba(0,0,0,0.35)",
                        textDecoration: "line-through",
                      }}
                    >
                      ${it.retail}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
