"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Caption } from "@/components/primitives/Caption";
import { ProductSlot } from "@/components/primitives/ProductSlot";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { Item } from "@/lib/types";

const orange = "#E07320";
const orangeSoft = "#FFF4EC";
const greenUsed = "#2D8A5E";
const redHigh = "#E85D5D";
const greenLow = "#2D8A5E";

function IconWell({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        border: "none",
        background: "#E8E8E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        padding: 0,
        flexShrink: 0,
        color: "#333",
      }}
    >
      {children}
    </button>
  );
}

function pctLess(row: Item) {
  if (row.retail <= 0) return 0;
  return Math.max(0, Math.min(99, Math.round(((row.retail - row.price) / row.retail) * 100)));
}

export function ItemDetailScreen({
  accent,
  item,
  itemIndex,
  similarItems,
  onBack,
}: {
  accent: string;
  item: Item;
  itemIndex: number;
  similarItems: Item[];
  onBack: () => void;
}) {
  const [priceOpen, setPriceOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  const low = useMemo(() => Math.max(1, Math.round(item.retail * 0.31)), [item.retail]);
  const high = item.retail;
  const span = Math.max(1, high - low);
  const tMarker = Math.min(1, Math.max(0, (item.price - low) / span));
  const pctLeft = `${tMarker * 100}%`;

  const sans = "var(--font-sans), system-ui, sans-serif";
  const serif = "var(--font-serif), serif";

  return (
    <div style={{ ...prototypeFillColumn, padding: 0 }}>
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 6px",
        }}
      >
        <span style={{ fontFamily: serif, fontSize: 26, fontStyle: "italic", color: "#1a1a1a" }}>phia</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconWell label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 14h18c0-7-3-7-3-14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
            </svg>
          </IconWell>
          <IconWell label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
            </svg>
          </IconWell>
          <IconWell label="Close" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </IconWell>
        </div>
      </div>
      <Caption style={{ padding: "0 16px 8px", fontSize: 9, color: "rgba(0,0,0,0.45)" }}>
        Item · {String(itemIndex).padStart(2, "0")} of 12
      </Caption>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
          padding: "0 16px 20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            padding: 14,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 88, flexShrink: 0, borderRadius: 12, overflow: "hidden" }}>
              <ProductSlot
                item={item}
                showBadge={false}
                showOverlays={false}
                style={{ aspectRatio: "1", borderRadius: 12, background: "#EEE" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.5)",
                  fontWeight: 600,
                }}
              >
                {item.brand}
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  letterSpacing: -0.8,
                  marginTop: 4,
                }}
              >
                ${item.retail}
              </div>
            </div>
            <button
              type="button"
              aria-label={saved ? "Remove save" : "Save"}
              onClick={() => setSaved((s) => !s)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                border: `1px solid ${saved ? accent : "rgba(0,0,0,0.08)"}`,
                background: saved ? `${accent}14` : "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                color: saved ? accent : "#1a1a1a",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M6 4h12v16l-6-4-6 4V4z" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPriceOpen((o) => !o)}
            style={{
              width: "100%",
              marginTop: 14,
              border: "none",
              borderRadius: 12,
              background: orangeSoft,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={orange} strokeWidth="1.8">
                <path d="M4 18V6M8 18V10M12 18v-8M16 18V8M20 18V4" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: sans, fontSize: 13, color: "#1a1a1a", textAlign: "left" }}>
                This price is <span style={{ color: orange, fontWeight: 600 }}>typical</span>
              </span>
            </div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
              style={{ transform: priceOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {priceOpen ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ position: "relative", paddingTop: 28, marginBottom: 6 }}>
                <div
                  style={{
                    position: "absolute",
                    left: pctLeft,
                    top: 0,
                    transform: "translateX(-50%)",
                    background: orangeSoft,
                    border: `1px solid ${orange}`,
                    color: orange,
                    fontFamily: sans,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  ${item.retail} is typical
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${greenLow} 0%, ${greenLow} 28%, ${orange} 28%, ${orange} 72%, ${redHigh} 72%, ${redHigh} 100%)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: pctLeft,
                    top: 25,
                    transform: "translateX(-50%)",
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: orange,
                    border: "2px solid #fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: sans, fontSize: 11, color: "rgba(0,0,0,0.45)" }}>
                <span>${low}</span>
                <span>${high}</span>
              </div>
              <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(0,0,0,0.55)", lineHeight: 1.45, margin: "10px 0 0" }}>
                Other options cost between ${low} secondhand to ${high} new.
              </p>
              <button
                type="button"
                style={{
                  marginTop: 10,
                  border: "none",
                  background: "none",
                  padding: 0,
                  fontFamily: sans,
                  fontSize: 12,
                  color: "#1a1a1a",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                How was this calculated?
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 16v-1M12 8h.01" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            style={{
              width: "100%",
              marginTop: 16,
              height: 46,
              borderRadius: 12,
              border: "none",
              background: "#ECECEC",
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 600,
              color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "default",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 14h18c0-7-3-7-3-14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
            </svg>
            Track price
          </button>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: sans, fontSize: 17, fontWeight: 700, color: "#1a1a1a" }}>See visually similar</span>
            <div style={{ display: "flex", gap: 6 }}>
              <IconWell label="Grid view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </IconWell>
              <IconWell label="Filters">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
                </svg>
              </IconWell>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 12,
              marginRight: -4,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {[
              { label: "Women Size: L", active: true },
              { label: "Price", active: false },
              { label: "Brand", active: false },
              { label: "Color", active: false },
              { label: "Material", active: false },
            ].map((c) => (
              <button
                key={c.label}
                type="button"
                style={{
                  flexShrink: 0,
                  borderRadius: 999,
                  padding: "8px 14px",
                  border: c.active ? "none" : "1px solid rgba(0,0,0,0.12)",
                  background: c.active ? "#1a1a1a" : "#fff",
                  color: c.active ? "#fff" : "#333",
                  fontFamily: sans,
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "default",
                }}
              >
                {c.label}
                {c.active ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {similarItems.map((row) => {
              const p = pctLess(row);
              return (
                <div
                  key={row.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: 10,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ width: 64, flexShrink: 0, borderRadius: 10, overflow: "hidden" }}>
                    <ProductSlot
                      item={row}
                      showBadge={false}
                      showOverlays={false}
                      compact
                      style={{ aspectRatio: "1", borderRadius: 10, background: "#EEE" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: sans,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1a1a1a",
                        lineHeight: 1.25,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {row.name}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: sans,
                        fontSize: 11,
                        color: "rgba(0,0,0,0.45)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      {row.resale ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={greenUsed} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21C8 17 5 13 5 9a4 4 0 0 1 7-2.5A4 4 0 0 1 19 9c0 4-3 8-7 12z" />
                        </svg>
                      ) : null}
                      <span style={{ color: row.resale ? greenUsed : "inherit", fontWeight: 600 }}>{row.resale ? "Used" : "New"}</span>
                      <span>·</span>
                      <span>{row.source}</span>
                      <span>·</span>
                      <span>Size L</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>${row.price}</div>
                    {row.retail > row.price ? (
                      <div style={{ fontFamily: sans, fontSize: 11, color: "rgba(0,0,0,0.45)", marginTop: 2 }}>{p}% less</div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
