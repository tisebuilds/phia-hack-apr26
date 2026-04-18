"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import { SEASONS, type Season } from "@/lib/types";

const SEASON_LABEL: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
  winter: "Winter",
};

const BUDGET_MIN = 1;
const BUDGET_MAX = 50_000;

function formatBudgetDraft(n: number): string {
  return String(n);
}

function parseBudgetDollars(raw: string): { value: number } | { error: string } {
  const cleaned = raw.replace(/[$,\s]/g, "");
  if (!cleaned.trim()) return { error: "Enter a budget amount." };
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n)) return { error: "Enter a valid number." };
  const rounded = Math.round(n);
  if (rounded < BUDGET_MIN) return { error: `Budget must be at least $${BUDGET_MIN}.` };
  const value = Math.min(BUDGET_MAX, rounded);
  return { value };
}

export function DateBudgetScreen({
  accent,
  season,
  setSeason,
  budget,
  setBudget,
  seasonCaption,
  dateBudgetHeadline,
  onBack,
  onNext,
}: {
  accent: string;
  season: Season;
  setSeason: (s: Season) => void;
  budget: number;
  setBudget: (n: number) => void;
  seasonCaption: string;
  dateBudgetHeadline:
    | { type: "split"; before: string; italic: string; after: string }
    | { type: "plain"; text: string };
  onBack: () => void;
  onNext: () => void;
}) {
  const [budgetDraft, setBudgetDraft] = useState(() => formatBudgetDraft(budget));
  const [budgetError, setBudgetError] = useState<string | null>(null);

  useEffect(() => {
    setBudgetDraft(formatBudgetDraft(budget));
  }, [budget]);

  const handleContinue = () => {
    const parsed = parseBudgetDollars(budgetDraft);
    if ("error" in parsed) {
      setBudgetError(parsed.error);
      return;
    }
    setBudgetError(null);
    setBudget(parsed.value);
    setBudgetDraft(formatBudgetDraft(parsed.value));
    onNext();
  };

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

      <Display
        size={28}
        style={{
          marginBottom: "clamp(6px, 1.4svh, 14px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        {dateBudgetHeadline.type === "split" ? (
          <>
            {dateBudgetHeadline.before}
            <em style={{ fontStyle: "italic" }}>{dateBudgetHeadline.italic}</em>
            {dateBudgetHeadline.after}
          </>
        ) : (
          dateBudgetHeadline.text
        )}
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
            flexShrink: 0,
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
          <Caption style={{ marginBottom: 10, flexShrink: 0 }}>{seasonCaption}</Caption>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              alignContent: "start",
            }}
          >
            {SEASONS.map((s) => {
              const on = season === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  style={{
                    padding: "12px 10px",
                    borderRadius: 12,
                    border: on ? `1.5px solid ${accent}` : "1.5px solid rgba(0,0,0,0.12)",
                    background: on ? accent : "#fff",
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: on ? "#fff" : "#1a1a1a",
                    cursor: "pointer",
                  }}
                >
                  {SEASON_LABEL[s]}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
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
          <Caption style={{ marginBottom: 8, flexShrink: 0 }}>Budget</Caption>
          <label style={{ flexShrink: 0, display: "block" }}>
            <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Budget in dollars</span>
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="850"
              value={budgetDraft}
              onChange={(e) => {
                setBudgetDraft(e.target.value);
                if (budgetError) setBudgetError(null);
              }}
              onBlur={() => {
                const parsed = parseBudgetDollars(budgetDraft);
                if ("value" in parsed) {
                  setBudgetDraft(formatBudgetDraft(parsed.value));
                  setBudget(parsed.value);
                } else {
                  setBudgetDraft(formatBudgetDraft(budget));
                }
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                borderRadius: 10,
                border: `1px solid ${budgetError ? "#c62828" : "rgba(0,0,0,0.12)"}`,
                fontFamily: "var(--font-serif), serif",
                fontSize: "clamp(18px, 5vmin, 22px)",
                color: "#1a1a1a",
                outline: "none",
              }}
            />
          </label>
          {budgetError ? (
            <div
              style={{
                marginTop: 6,
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 12,
                color: "#c62828",
                flexShrink: 0,
              }}
            >
              {budgetError}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ flexShrink: 0, marginTop: 8 }}>
        <PrimaryButton accent={accent} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
