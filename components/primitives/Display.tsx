"use client";

import type { CSSProperties, ReactNode } from "react";

export function Display({
  children,
  size = 40,
  style = {},
}: {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-serif), 'Times New Roman', serif",
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: -0.5,
        color: "#1a1a1a",
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
