"use client";

export function ProgressDots({
  step,
  total = 4,
  accent = "#1a1a1a",
}: {
  step: number;
  total?: number;
  accent?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 3,
            width: i < step ? 22 : 10,
            background: i < step ? accent : "rgba(0,0,0,0.12)",
            borderRadius: 2,
            transition: "all 0.35s ease",
          }}
        />
      ))}
    </div>
  );
}
