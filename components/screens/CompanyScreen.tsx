"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { STARTER_DATA } from "@/lib/data";
import type { Company } from "@/lib/types";

export function CompanyScreen({
  accent,
  value,
  setValue,
  onBack,
  onNext,
}: {
  accent: string;
  value: Company;
  setValue: (c: Company) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [typed, setTyped] = useState(value?.name || "");
  const [selected, setSelected] = useState<Company | null>(value || null);
  const D = STARTER_DATA.companies;
  const matches = typed ? D.filter((c) => c.name.toLowerCase().includes(typed.toLowerCase())) : [];

  const pick = (c: Company) => {
    setSelected(c);
    setTyped(c.name);
    setValue(c);
  };

  useEffect(() => {
    setTyped(value.name);
    setSelected(value);
  }, [value]);

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
        <ProgressDots step={1} accent={accent} />
        <div style={{ width: 20 }} />
      </div>

      <Caption style={{ marginBottom: 6 }}>Step 1 of 4</Caption>
      <Display size={32} style={{ marginBottom: 28 }}>
        Where do you <em style={{ fontStyle: "italic" }}>start</em>?
      </Display>

      <div
        style={{
          borderBottom: `1.5px solid ${typed ? accent : "rgba(0,0,0,0.15)"}`,
          paddingBottom: 10,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <input
          autoFocus
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            if (selected && e.target.value !== selected.name) setSelected(null);
          }}
          placeholder="Start typing your company…"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-serif), serif",
            fontSize: 22,
            color: "#1a1a1a",
          }}
        />
        {selected && <span style={{ color: accent, fontSize: 16 }}>✓</span>}
      </div>
      <Caption style={{ marginBottom: 20 }}>Full-time · Client-facing role</Caption>

      {!selected && matches.length > 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {matches.map((c, i) => (
            <button
              type="button"
              key={c.id}
              onClick={() => pick(c)}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "none",
                border: "none",
                borderTop: i ? "1px solid rgba(0,0,0,0.05)" : "none",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: "#1a1a1a",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                {c.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 14, fontWeight: 500 }}>
                  {c.name}
                </div>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>
                  {c.role}
                </div>
              </div>
              <span style={{ color: "rgba(0,0,0,0.3)", fontSize: 14 }}>→</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 18,
            border: "1px solid rgba(0,0,0,0.06)",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#1a1a1a",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif), serif",
                fontSize: 22,
                fontStyle: "italic",
              }}
            >
              {selected.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 15, fontWeight: 500 }}>
                {selected.name}
              </div>
              <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
                {selected.role}
              </div>
            </div>
          </div>
          <Caption style={{ marginBottom: 8 }}>What we know about the dress code</Caption>
          <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 }}>
            {selected.vibe}.
          </div>
          <div
            style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid rgba(0,0,0,0.06)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9,
              color: "rgba(0,0,0,0.4)",
              letterSpacing: 0.4,
            }}
          >
            Sourced from 2,140 current employees · updated weekly
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />
      <PrimaryButton accent={accent} disabled={!selected} onClick={onNext}>
        Continue
      </PrimaryButton>
    </div>
  );
}
