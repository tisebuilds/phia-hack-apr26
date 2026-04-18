"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import type { Company } from "@/lib/types";

export function LoadingScreen({
  accent,
  company,
  onDone,
}: {
  accent: string;
  company: Company;
  onDone: () => void;
}) {
  const lines = [
    `Reading ${company?.name || "Deloitte"}'s dress code`,
    "Finding the best resale matches",
    "Building your capsule",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setI(1), 900);
    const t2 = setTimeout(() => setI(2), 1800);
    const t3 = setTimeout(() => onDone(), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [company?.name, onDone]);

  return (
    <div
      style={{
        ...prototypeFillColumn,
        padding: "0 22px 16px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 999,
          border: `2px solid ${accent}`,
          borderTopColor: "transparent",
          animation: "starterSpin 1s linear infinite",
          marginBottom: "clamp(16px, 4svh, 28px)",
          flexShrink: 0,
        }}
      />
      <style>{`@keyframes starterSpin { to { transform: rotate(360deg); } }`}</style>

      <Caption style={{ marginBottom: 6, flexShrink: 0 }}>Building · {company?.name || "Deloitte"}</Caption>
      <Display
        size={26}
        style={{
          marginBottom: "clamp(12px, 3svh, 22px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5vmin, 28px)",
          lineHeight: 1.08,
        }}
      >
        One moment.
        <br />
        <em style={{ fontStyle: "italic", opacity: 0.5 }}>Tailoring</em> the details.
      </Display>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
        {lines.map((line, idx) => (
          <div
            key={line}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: idx <= i ? 1 : 0.25,
              transition: "opacity 280ms",
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 999,
                background: idx < i ? accent : "transparent",
                border: `1.5px solid ${idx <= i ? accent : "rgba(0,0,0,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 8,
                flexShrink: 0,
              }}
            >
              {idx < i ? "✓" : ""}
            </div>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "clamp(12px, 3.2vmin, 14px)", color: "#1a1a1a", lineHeight: 1.35 }}>
              {line}…
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
