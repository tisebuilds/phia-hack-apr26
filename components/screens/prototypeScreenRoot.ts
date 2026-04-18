import type { CSSProperties } from "react";

/** Fills the cream panel; parent is flex + min-h-0 so the outer shell does not scroll. */
export const prototypeFillColumn: CSSProperties = {
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#F5F5F5",
  color: "#1a1a1a",
  boxSizing: "border-box",
};
