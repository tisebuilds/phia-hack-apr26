"use client";

import type { CSSProperties, ReactNode } from "react";

export function PrimaryButton({
  children,
  onClick,
  accent = "#1a1a1a",
  disabled = false,
  style = {},
}: {
  children: ReactNode;
  onClick?: () => void;
  accent?: string;
  disabled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: 52,
        borderRadius: 999,
        background: disabled ? "#cfcfcf" : accent,
        color: "#fff",
        border: "none",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: -0.1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 120ms ease, opacity 120ms ease",
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}
