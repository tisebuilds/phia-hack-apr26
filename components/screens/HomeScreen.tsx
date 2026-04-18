"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";

export function HomeScreen({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  const tiles = [
    { label: "Price check", caption: "Scan any link" },
    { label: "Collections", caption: "41 saved" },
    { label: "Trend report", caption: "Updated today" },
    { label: "Price drops", caption: "3 new" },
  ];

  return (
    <div style={{ ...prototypeFillColumn, padding: "0 14px 6px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          paddingTop: 4,
          paddingBottom: "clamp(8px, 1.8svh, 14px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(22px, 5.5vmin, 28px)",
            fontStyle: "italic",
            color: "#1a1a1a",
          }}
        >
          phia
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: "#e6e2d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: "#1a1a1a",
            flexShrink: 0,
          }}
        >
          S
        </div>
      </div>

      <Caption style={{ marginBottom: 4, flexShrink: 0 }}>Good morning, Sarah</Caption>
      <Display
        size={30}
        style={{
          marginBottom: "clamp(8px, 1.6svh, 18px)",
          flexShrink: 0,
          fontSize: "clamp(22px, 6.2vmin, 30px)",
          lineHeight: 1.05,
        }}
      >
        Your <em style={{ fontStyle: "italic" }}>first‑day</em> closet
        <br />
        is two weeks out.
      </Display>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          type="button"
          onClick={onOpen}
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              background: accent,
              color: "#fff",
              borderRadius: 16,
              padding: "clamp(12px, 2.2svh, 18px) clamp(14px, 3.5vmin, 20px) clamp(10px, 1.8svh, 16px)",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 8.5,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: 0.8,
              }}
            >
              NEW · MODE
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 4,
                fontFamily: "var(--font-serif), serif",
                fontSize: 12,
                marginBottom: "clamp(6px, 1.4svh, 16px)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontStyle: "italic" }}>phia</span>
              <span
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 8,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Starter
              </span>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(19px, 5.4vmin, 30px)",
                  lineHeight: 1.05,
                  letterSpacing: -0.4,
                  marginBottom: "clamp(4px, 1svh, 10px)",
                }}
              >
                For the <em style={{ fontStyle: "italic" }}>first job</em>
                <br />
                you haven&apos;t figured
                <br />
                out yet.
              </div>

              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(11px, 2.9vmin, 13px)",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                A 12-piece capsule, built for your company, your budget, your first 90 days.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                paddingTop: "clamp(8px, 1.6svh, 14px)",
                marginTop: "auto",
                borderTop: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <Caption style={{ color: "rgba(255,255,255,0.6)" }}>Takes 90 seconds</Caption>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(11px, 2.8vmin, 13px)",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                Start building <span>→</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <Caption style={{ marginTop: "clamp(8px, 1.8svh, 14px)", marginBottom: 8, flexShrink: 0 }}>Your Phia</Caption>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {tiles.map((t) => (
          <div
            key={t.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "8px 10px 10px",
              minHeight: "clamp(56px, 12svh, 76px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                flexShrink: 0,
                background:
                  "repeating-linear-gradient(135deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 5px)",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(12px, 3.2vmin, 14px)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(9px, 2.5vmin, 11px)",
                  color: "rgba(0,0,0,0.5)",
                  marginTop: 2,
                  lineHeight: 1.2,
                }}
              >
                {t.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
