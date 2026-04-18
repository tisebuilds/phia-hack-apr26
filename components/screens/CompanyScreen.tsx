"use client";

import { useEffect, useState } from "react";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { Company } from "@/lib/types";
import type { ContextOption } from "@/lib/packs";

export function CompanyScreen({
  accent,
  value,
  setValue,
  companies,
  contextOptions,
  contextStepTitle,
  contextDetailTitle,
  contextSourceLine,
  onBack,
  onNext,
}: {
  accent: string;
  value: Company;
  setValue: (c: Company) => void;
  companies: Company[];
  contextOptions: ContextOption[];
  contextStepTitle: string;
  contextDetailTitle: string;
  contextSourceLine: (c: Company) => string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<Company | null>(value || null);

  const resolveCompany = (companyId: string) => companies.find((c) => c.id === companyId);

  const pick = (c: Company) => {
    setSelected(c);
    setValue(c);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const activeOptionId = selected
    ? contextOptions.find((o) => o.companyId === selected.id)?.id
    : undefined;

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
        <ProgressDots step={1} accent={accent} />
        <div style={{ width: 20 }} />
      </div>

      <Display
        size={28}
        style={{
          marginBottom: "clamp(8px, 1.6svh, 16px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        {contextStepTitle}
      </Display>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorY: "contain",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {contextOptions.map((opt) => {
            const company = resolveCompany(opt.companyId);
            if (!company) return null;
            const on = activeOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => pick(company)}
                style={{
                  width: "100%",
                  height: "clamp(42px, 7.8vmin, 48px)",
                  minHeight: 0,
                  boxSizing: "border-box",
                  padding: "6px 8px",
                  borderRadius: 10,
                  border: on ? `1.5px solid ${accent}` : "1.5px solid rgba(0,0,0,0.12)",
                  background: on ? `${accent}12` : "#fff",
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(10px, 2.8vmin, 12px)",
                  fontWeight: 500,
                  color: "#1a1a1a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  lineHeight: 1.2,
                  hyphens: "auto",
                  overflowWrap: "break-word",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          style={{
            flexShrink: 0,
            background: "#fff",
            borderRadius: 12,
            padding: 14,
            border: "1px solid rgba(0,0,0,0.06)",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: 10,
              lineHeight: 1.25,
            }}
          >
            {contextDetailTitle}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "clamp(11px, 2.8vmin, 13px)",
              color: "#1a1a1a",
              lineHeight: 1.45,
              marginBottom: 12,
            }}
          >
            {selected.vibe}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
              color: "rgba(0,0,0,0.45)",
              letterSpacing: 0.35,
              lineHeight: 1.35,
            }}
          >
            {contextSourceLine(selected)}
          </div>
        </div>
      )}

      <div style={{ flexShrink: 0, marginTop: selected ? 0 : 8 }}>
        <PrimaryButton accent={accent} disabled={!selected} onClick={onNext}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
