"use client";

import { useEffect } from "react";
import { NavStrip } from "@/components/NavStrip";
import type { ScreenId } from "@/lib/types";

export function LabSheet({
  open,
  onClose,
  contextLine,
  showDevNav,
  screen,
  onGoScreen,
  onRestartDemo,
}: {
  open: boolean;
  onClose: () => void;
  contextLine: string;
  showDevNav: boolean;
  screen: ScreenId;
  onGoScreen: (s: ScreenId) => void;
  onRestartDemo: () => void;
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
        aria-label="Close settings"
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
        aria-labelledby="settings-sheet-title"
        onClick={(e) => e.stopPropagation()}
        id="settings-sheet-panel"
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
              id="settings-sheet-title"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: -0.2,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Settings
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

        <button
          type="button"
          onClick={() => {
            onRestartDemo();
            onClose();
          }}
          style={{
            width: "100%",
            flexShrink: 0,
            marginBottom: showDevNav ? 16 : 0,
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(255,80,80,0.35)",
            background: "rgba(255,80,80,0.08)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: -0.1,
            color: "rgba(255,200,200,0.95)",
            cursor: "pointer",
          }}
        >
          Restart demo
        </button>

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
                marginTop: 4,
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
