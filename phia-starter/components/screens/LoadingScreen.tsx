"use client";

import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
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
        background: "#fafaf7",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 30px",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 999,
          border: `2px solid ${accent}`,
          borderTopColor: "transparent",
          animation: "starterSpin 1s linear infinite",
          marginBottom: 40,
        }}
      />
      <style>{`@keyframes starterSpin { to { transform: rotate(360deg); } }`}</style>

      <Caption style={{ marginBottom: 8 }}>Building · {company?.name || "Deloitte"}</Caption>
      <Display size={28} style={{ marginBottom: 28 }}>
        One moment.
        <br />
        <em style={{ fontStyle: "italic", opacity: 0.5 }}>Tailoring</em> the details.
      </Display>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lines.map((line, idx) => (
          <div
            key={line}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: idx <= i ? 1 : 0.25,
              transition: "opacity 280ms",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: idx < i ? accent : "transparent",
                border: `1.5px solid ${idx <= i ? accent : "rgba(0,0,0,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 9,
              }}
            >
              {idx < i ? "✓" : ""}
            </div>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: 14, color: "#1a1a1a" }}>{line}…</div>
          </div>
        ))}
      </div>
    </div>
  );
}
