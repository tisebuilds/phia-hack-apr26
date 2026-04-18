"use client";

import type { CSSProperties } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";

const dayCell: CSSProperties = {
  height: "clamp(22px, 5.2vmin, 30px)",
  border: "none",
  cursor: "pointer",
  borderRadius: 999,
  fontFamily: "var(--font-sans), sans-serif",
  fontSize: "clamp(10px, 2.8vmin, 12px)",
  fontWeight: 400,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 140ms, color 140ms",
};

export function DateBudgetScreen({
  accent,
  date,
  setDate,
  budget,
  setBudget,
  onBack,
  onNext,
}: {
  accent: string;
  date: number;
  setDate: (n: number) => void;
  budget: number;
  setBudget: (n: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const weeks = ["S", "M", "T", "W", "T", "F", "S"];
  const firstDayOffset = 5;
  const daysInMonth = 31;
  const selectedDay = date;

  return (
    <div style={{ ...prototypeFillColumn, padding: "0 14px 10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          paddingTop: 4,
          paddingBottom: "clamp(6px, 1.4svh, 12px)",
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
        <ProgressDots step={2} accent={accent} />
        <div style={{ width: 20 }} />
      </div>

      <Caption style={{ marginBottom: 4, flexShrink: 0 }}>Step 2 of 4</Caption>
      <Display
        size={28}
        style={{
          marginBottom: "clamp(6px, 1.4svh, 14px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        When <em style={{ fontStyle: "italic" }}>and</em> how much?
      </Display>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1.15,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: 14,
            padding: "clamp(8px, 1.8svh, 14px)",
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6,
              flexShrink: 0,
            }}
          >
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 13, fontWeight: 500 }}>May 2026</div>
            <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(0,0,0,0.3)" }}>
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 2, flexShrink: 0 }}>
            {weeks.map((w, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 8,
                  color: "rgba(0,0,0,0.4)",
                  textAlign: "center",
                  padding: "2px 0",
                }}
              >
                {w}
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 2,
              alignContent: "start",
            }}
          >
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`e${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const isSel = d === selectedDay;
              return (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDate(d)}
                  style={{
                    ...dayCell,
                    background: isSel ? accent : "transparent",
                    color: isSel ? "#fff" : "#1a1a1a",
                    fontWeight: isSel ? 600 : 400,
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {selectedDay ? (
            <div
              style={{
                marginTop: 6,
                paddingTop: 8,
                borderTop: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <Caption>Start date</Caption>
              <div
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "clamp(12px, 3.2vmin, 15px)",
                  textAlign: "right",
                  lineHeight: 1.2,
                }}
              >
                May {selectedDay}, 2026 ·{" "}
                {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"][(firstDayOffset + selectedDay - 1) % 7]}
              </div>
            </div>
          ) : null}
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            borderRadius: 14,
            padding: "clamp(8px, 1.6svh, 14px)",
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 8,
              flexShrink: 0,
            }}
          >
            <Caption>Budget</Caption>
            <div
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "clamp(24px, 7vmin, 32px)",
                color: accent,
                letterSpacing: -0.5,
              }}
            >
              ${budget}
            </div>
          </div>
          <input
            type="range"
            min={200}
            max={1500}
            step={50}
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
            style={{
              width: "100%",
              accentColor: accent,
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 8,
              color: "rgba(0,0,0,0.4)",
              letterSpacing: 0.4,
              marginTop: 4,
              flexShrink: 0,
            }}
          >
            <span>$200</span>
            <span>$1,500</span>
          </div>
          <div
            style={{
              marginTop: 6,
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "clamp(10px, 2.6vmin, 12px)",
              color: "rgba(0,0,0,0.5)",
              lineHeight: 1.4,
              flex: 1,
              minHeight: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            We&apos;ll cap every capsule at this amount. Half from resale, by default.
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, marginTop: 8 }}>
        <PrimaryButton accent={accent} onClick={onNext}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
