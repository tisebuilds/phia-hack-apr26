"use client";

import Image from "next/image";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { ALL_LABELED_BASES } from "@/lib/itemPhotoPath";
import { StarterMark } from "@/components/primitives/StarterMark";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { Company, Item } from "@/lib/types";

export function SummaryScreen({
  accent,
  items,
  company,
  budget,
  onBack,
}: {
  accent: string;
  items: Item[];
  company: Company;
  budget: number;
  onBack: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price, 0);
  const retail = items.reduce((s, i) => s + i.retail, 0);
  const resaleCount = items.filter((i) => i.resale).length;
  const savings = retail - total;

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
          padding: "0 16px 8px",
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
          Your <em style={{ fontStyle: "italic" }}>first day</em>, handled.
        </Display>
        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(11px, 2.8vmin, 13px)",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.45,
            marginBottom: 12,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          A 90-day starter wardrobe for {company?.name || "Deloitte"}, built to your ${budget} budget. Every piece pairs with every other piece.
        </div>

        <div
          style={{
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: 16,
            padding: "16px 16px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(40px, 11vmin, 52px)", letterSpacing: -1, lineHeight: 1 }}>
                ${total}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "line-through",
                }}
              >
                ${retail.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                flexWrap: "wrap",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              <span>You saved</span>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 18, color: accent }}>${savings.toLocaleString()}</span>
              <span>vs. retail</span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 6,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {(
              [
                ["Mix", `${items.length - resaleCount} new · ${resaleCount} resale`],
                ["Outfits", "20+"],
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
                <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 18, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <Caption style={{ marginBottom: 6 }}>Your picks</Caption>
        <div style={{ display: "flex", gap: 5, overflowX: "auto", marginBottom: 12, paddingBottom: 2 }}>
          {items.map((it) => (
            <div key={it.id} style={{ flexShrink: 0, width: 52 }}>
              <ProductSlot item={it} compact labeledVariantSalt={it.id * 41 + 3} />
            </div>
          ))}
        </div>

        <Caption style={{ marginBottom: 6 }}>Full look library</Caption>
        <div
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            marginBottom: 12,
            paddingBottom: 2,
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
                background: "rgba(255,255,255,0.08)",
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

      <div style={{ padding: "0 16px 10px", display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        <PrimaryButton accent={accent}>Start shopping · ${total}</PrimaryButton>
        <button
          type="button"
          style={{
            width: "100%",
            height: 44,
            borderRadius: 999,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            color: "#1a1a1a",
          }}
        >
          Save capsule to Phia
        </button>
      </div>
    </div>
  );
}
