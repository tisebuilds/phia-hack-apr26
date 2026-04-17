"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";

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
    <div
      style={{
        padding: "0 20px 40px",
        background: "#fafaf7",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          paddingBottom: 22,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
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

      <Caption style={{ marginBottom: 6 }}>Step 2 of 4</Caption>
      <Display size={32} style={{ marginBottom: 24 }}>
        When <em style={{ fontStyle: "italic" }}>and</em> how much?
      </Display>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 18,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 14, fontWeight: 500 }}>May 2026</div>
          <div style={{ display: "flex", gap: 16, fontSize: 14, color: "rgba(0,0,0,0.3)" }}>
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
          {weeks.map((w, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9,
                color: "rgba(0,0,0,0.4)",
                textAlign: "center",
                padding: "4px 0",
              }}
            >
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
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
                  aspectRatio: "1/1",
                  border: "none",
                  cursor: "pointer",
                  background: isSel ? accent : "transparent",
                  color: isSel ? "#fff" : "#1a1a1a",
                  borderRadius: 999,
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 13,
                  fontWeight: isSel ? 600 : 400,
                  transition: "all 140ms",
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
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Caption>Start date</Caption>
            <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 17 }}>
              May {selectedDay}, 2026 · {["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"][(firstDayOffset + selectedDay - 1) % 7]}
            </div>
          </div>
        ) : null}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 18,
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <Caption>Budget</Caption>
          <div
            style={{
              fontFamily: "var(--font-serif), serif",
              fontSize: 36,
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
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9,
            color: "rgba(0,0,0,0.4)",
            letterSpacing: 0.4,
            marginTop: 6,
          }}
        >
          <span>$200</span>
          <span>$1,500</span>
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
            color: "rgba(0,0,0,0.5)",
            lineHeight: 1.5,
          }}
        >
          We&apos;ll cap every capsule at this amount. Half from resale, by default.
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <PrimaryButton accent={accent} onClick={onNext}>
        Continue
      </PrimaryButton>
    </div>
  );
}
