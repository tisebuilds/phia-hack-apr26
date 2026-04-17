"use client";

import { useEffect } from "react";
import { NavStrip } from "@/components/NavStrip";
import type { ScreenId } from "@/lib/types";

export function LabSheet({
  open,
  onClose,
  accent,
  flow,
  onFlowChange,
  contextLine,
  showDevNav,
  screen,
  onGoScreen,
}: {
  open: boolean;
  onClose: () => void;
  accent: string;
  flow: "A" | "B";
  onFlowChange: (f: "A" | "B") => void;
  contextLine: string;
  showDevNav: boolean;
  screen: ScreenId;
  onGoScreen: (s: ScreenId) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 210,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        aria-label="Close lab"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          padding: 0,
          margin: 0,
          background: "rgba(0,0,0,0.52)",
          cursor: "pointer",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-sheet-title"
        onClick={(e) => e.stopPropagation()}
        id="lab-sheet-panel"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          background: "#16161a",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          boxShadow: "0 -12px 48px rgba(0,0,0,0.45)",
          paddingTop: 10,
          paddingLeft: "max(16px, env(safe-area-inset-left))",
          paddingRight: "max(16px, env(safe-area-inset-right))",
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
          maxHeight: "min(85dvh, 640px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 40,
            height: 4,
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            margin: "0 auto 14px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 14,
            flexShrink: 0,
          }}
        >
          <div>
            <div
              id="lab-sheet-title"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: -0.2,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Lab
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                letterSpacing: 0.5,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.4,
              }}
            >
              {contextLine}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              flexShrink: 0,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "6px 12px",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              cursor: "pointer",
            }}
          >
            Done
          </button>
        </div>

        <div
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 10,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(255,255,255,0.38)",
            marginBottom: 8,
            flexShrink: 0,
          }}
        >
          Flow
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
          {(["A", "B"] as const).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => onFlowChange(f)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 12,
                border: `1px solid ${flow === f ? accent : "rgba(255,255,255,0.12)"}`,
                background: flow === f ? accent : "rgba(255,255,255,0.04)",
                color: flow === f ? "#fff" : "rgba(255,255,255,0.78)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 0.1,
                cursor: "pointer",
              }}
            >
              Flow {f} · {f === "A" ? "Editorial grid" : "Mosaic hero"}
            </button>
          ))}
        </div>

        {showDevNav ? (
          <>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
                color: "rgba(255,255,255,0.38)",
                marginTop: 20,
                marginBottom: 8,
                flexShrink: 0,
              }}
            >
              Screens
            </div>
            <div
              style={{
                maxHeight: "min(42dvh, 280px)",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                marginLeft: -4,
                marginRight: -4,
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
              }}
            >
              <NavStrip screen={screen} onGo={onGoScreen} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
