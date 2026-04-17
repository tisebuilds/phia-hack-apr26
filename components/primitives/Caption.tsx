"use client";

import type { CSSProperties, ReactNode } from "react";

export function Caption({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        fontSize: 10,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: "rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
