"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
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

      <Caption style={{ marginBottom: 4, flexShrink: 0 }}>Step 1 of 4</Caption>
      <Display
        size={28}
        style={{
          marginBottom: "clamp(8px, 1.6svh, 16px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        Where do you <em style={{ fontStyle: "italic" }}>start</em>?
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
            borderBottom: `1.5px solid ${typed ? accent : "rgba(0,0,0,0.15)"}`,
            paddingBottom: 8,
            marginBottom: 6,
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
              fontSize: "clamp(18px, 4.5vmin, 22px)",
              color: "#1a1a1a",
            }}
          />
          {selected && <span style={{ color: accent, fontSize: 15 }}>✓</span>}
        </div>
        <Caption style={{ marginBottom: 12 }}>Full-time · Client-facing role</Caption>

        {!selected && matches.length > 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.06)",
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            {matches.slice(0, 6).map((c, i) => (
              <button
                type="button"
                key={c.id}
                onClick={() => pick(c)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "none",
                  border: "none",
                  borderTop: i ? "1px solid rgba(0,0,0,0.05)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    background: "#1a1a1a",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-serif), serif",
                    fontSize: 14,
                    fontStyle: "italic",
                    flexShrink: 0,
                  }}
                >
                  {c.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 10, color: "rgba(0,0,0,0.5)" }}>{c.role}</div>
                </div>
                <span style={{ color: "rgba(0,0,0,0.3)", fontSize: 13 }}>→</span>
              </button>
            ))}
          </div>
        )}

        {selected && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#1a1a1a",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif), serif",
                  fontSize: 20,
                  fontStyle: "italic",
                  flexShrink: 0,
                }}
              >
                {selected.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 14, fontWeight: 500 }}>{selected.name}</div>
                <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>{selected.role}</div>
              </div>
            </div>
            <Caption style={{ marginBottom: 6 }}>What we know about the dress code</Caption>
            <div
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "clamp(11px, 2.8vmin, 13px)",
                color: "#1a1a1a",
                lineHeight: 1.45,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {selected.vibe}.
            </div>
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: "1px solid rgba(0,0,0,0.06)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 8,
                color: "rgba(0,0,0,0.4)",
                letterSpacing: 0.4,
              }}
            >
              Sourced from 2,140 current employees · updated weekly
            </div>
          </div>
        )}
      </div>

      <div style={{ flexShrink: 0, marginTop: 8 }}>
        <PrimaryButton accent={accent} disabled={!selected} onClick={onNext}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
