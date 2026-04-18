"use client";

import type { ScreenId } from "@/lib/types";

const SCREENS: ScreenId[] = [
  "home",
  "company",
  "datebudget",
  "quiz",
  "loading",
  "item",
  "outfits",
  "summary",
];

const LABELS: Record<ScreenId, string> = {
  home: "1 · Home",
  company: "2 · Company",
  datebudget: "3 · Season + Budget",
  quiz: "4 · Vibe",
  loading: "5 · Loading",
  item: "6 · Item",
  outfits: "7 · Outfits",
  summary: "8 · Summary",
};

export function NavStrip({
  screen,
  onGo,
}: {
  screen: ScreenId;
  onGo: (s: ScreenId) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        justifyContent: "center",
        padding: "10px 0",
        flexWrap: "wrap",
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {SCREENS.map((s) => (
        <button
          type="button"
          key={s}
          onClick={() => onGo(s)}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: `1px solid ${screen === s ? "#1a1a1a" : "rgba(255,255,255,0.15)"}`,
            background: screen === s ? "#1a1a1a" : "rgba(255,255,255,0.04)",
            color: screen === s ? "#fff" : "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: 0.4,
            cursor: "pointer",
          }}
        >
          {LABELS[s]}
        </button>
      ))}
    </div>
  );
}
