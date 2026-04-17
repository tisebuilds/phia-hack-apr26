"use client";

export function StarterMark({
  size = 14,
  color = "#1a1a1a",
  subtle = false,
}: {
  size?: number;
  color?: string;
  subtle?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 4,
        fontFamily: "var(--font-serif), 'Times New Roman', serif",
        fontSize: size,
        color,
        letterSpacing: -0.2,
        lineHeight: 1,
      }}
    >
      <span style={{ fontStyle: "italic", fontWeight: 400 }}>phia</span>
      <span
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: size * 0.62,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 500,
          color: subtle ? "rgba(0,0,0,0.45)" : color,
        }}
      >
        Starter
      </span>
    </div>
  );
}
