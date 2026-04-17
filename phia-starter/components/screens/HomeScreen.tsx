"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";

export function HomeScreen({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  const tiles = [
    { label: "Price check", caption: "Scan any link" },
    { label: "Collections", caption: "41 saved" },
    { label: "Trend report", caption: "Updated today" },
    { label: "Price drops", caption: "3 new" },
  ];

  return (
    <div style={{ padding: "0 20px 120px", background: "#fafaf7", minHeight: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          paddingBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: 28,
            fontStyle: "italic",
            color: "#1a1a1a",
          }}
        >
          phia
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            background: "#e6e2d9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "#1a1a1a",
          }}
        >
          S
        </div>
      </div>

      <Caption style={{ marginBottom: 6 }}>Good morning, Sarah</Caption>
      <Display size={30} style={{ marginBottom: 22 }}>
        Your <em style={{ fontStyle: "italic" }}>first‑day</em> closet
        <br />
        is two weeks out.
      </Display>

      <button
        type="button"
        onClick={onOpen}
        style={{
          width: "100%",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            background: accent,
            color: "#fff",
            borderRadius: 18,
            padding: "22px 20px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
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
              fontSize: 13,
              marginBottom: 28,
            }}
          >
            <span style={{ fontStyle: "italic" }}>phia</span>
            <span
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 8.5,
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
              fontFamily: "var(--font-serif), serif",
              fontSize: 32,
              lineHeight: 1.02,
              letterSpacing: -0.4,
              marginBottom: 10,
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
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.45,
              marginBottom: 24,
            }}
          >
            A 12-piece capsule, built for your company, your budget, your first 90 days.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <Caption style={{ color: "rgba(255,255,255,0.6)" }}>Takes 90 seconds</Caption>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Start building <span>→</span>
            </div>
          </div>
        </div>
      </button>

      <Caption style={{ marginTop: 32, marginBottom: 14 }}>Your Phia</Caption>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {tiles.map((t) => (
          <div
            key={t.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "14px 14px 16px",
              minHeight: 92,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                background:
                  "repeating-linear-gradient(135deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 5px)",
              }}
            />
            <div>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 14, fontWeight: 500 }}>
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 11,
                  color: "rgba(0,0,0,0.5)",
                  marginTop: 2,
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
