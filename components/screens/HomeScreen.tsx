"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bell,
  Library,
  LineChart,
  ScanSearch,
  TrendingDown,
  UserRound,
  X,
} from "lucide-react";
import { Caption } from "@/components/primitives/Caption";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { StarterHomeHero } from "@/lib/packs";

const iconStroke = 1.5 as const;

const topIconColor = "#3a3a3a";
const topIconBtn = {
  width: 32,
  height: 32,
  borderRadius: 999,
  border: "none",
  background: "#e6e6e4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: topIconColor,
  cursor: "pointer",
  flexShrink: 0,
  padding: 0,
} as const;

export function HomeScreen({
  accent,
  homeHero,
  onOpen,
  onNotifications,
  onClose,
}: {
  accent: string;
  homeHero: StarterHomeHero;
  onOpen: () => void;
  onNotifications?: () => void;
  onClose?: () => void;
}) {
  const tiles: ReadonlyArray<{ label: string; caption: string; Icon: LucideIcon }> = [
    { label: "Price check", caption: "Scan any link", Icon: ScanSearch },
    { label: "Collections", caption: "41 saved", Icon: Library },
    { label: "Trend report", caption: "Updated today", Icon: LineChart },
    { label: "Price drops", caption: "3 new", Icon: TrendingDown },
  ];

  return (
    <div style={{ ...prototypeFillColumn, padding: "0 14px 6px", color: "#000" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          marginLeft: -14,
          marginRight: -14,
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: "clamp(6px, 1.2svh, 10px)",
          paddingBottom: "clamp(10px, 2svh, 16px)",
          background: "#f0f0ee",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif), serif",
            fontSize: "clamp(22px, 5.5vmin, 28px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            textTransform: "lowercase",
          }}
        >
          phia
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button type="button" aria-label="Notifications" style={topIconBtn} onClick={() => onNotifications?.()}>
            <Bell size={14} strokeWidth={iconStroke} aria-hidden />
          </button>
          <button type="button" aria-label="Account" style={topIconBtn}>
            <UserRound size={14} strokeWidth={iconStroke} aria-hidden />
          </button>
          <button type="button" aria-label="Close" style={topIconBtn} onClick={() => onClose?.()}>
            <X size={13} strokeWidth={iconStroke} aria-hidden />
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          marginTop: "clamp(6px, 1.4svh, 14px)",
          gap: "clamp(6px, 1svh, 10px)",
        }}
      >
        <button
          type="button"
          onClick={onOpen}
          style={{
            flex: 1,
            minHeight: 0,
            maxHeight: "37.5%",
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
                top: "clamp(10px, 2svh, 16px)",
                right: "clamp(12px, 3.5vmin, 18px)",
                zIndex: 1,
                borderRadius: 999,
                padding: "5px 10px",
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
              }}
            >
              <Caption
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 9,
                  letterSpacing: 0.55,
                }}
              >
                {homeHero.badge}
              </Caption>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                paddingRight: "clamp(72px, 22vmin, 118px)",
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
                {homeHero.headline}
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
                {homeHero.body}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexShrink: 0,
                paddingTop: "clamp(8px, 1.6svh, 14px)",
                marginTop: "auto",
              }}
            >
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
                {homeHero.cta}
                <ArrowRight size={14} strokeWidth={iconStroke} aria-hidden style={{ flexShrink: 0 }} />
              </div>
            </div>
          </div>
        </button>

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
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f0f0ee",
                  color: "#3a3a3a",
                }}
                aria-hidden
              >
                <t.Icon size={20} strokeWidth={iconStroke} aria-hidden />
              </div>
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
    </div>
  );
}
