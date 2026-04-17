"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Item } from "@/lib/types";

export function ProductSlot({
  item,
  style = {},
  showBadge = true,
  compact = false,
}: {
  item: Item;
  style?: CSSProperties;
  showBadge?: boolean;
  compact?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const stripe =
    "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 8px)";
  const src = `/products/${item.id}.png`;
  const showImage = !imgFailed;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3/4",
        background: "#f4f1ec",
        backgroundImage: stripe,
        borderRadius: 6,
        overflow: "hidden",
        ...style,
      }}
    >
      {showImage ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="120px"
          style={{ objectFit: "cover" }}
          onError={() => setImgFailed(true)}
          unoptimized
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: "18% 22%",
            background: item.tone,
            opacity: 0.85,
            borderRadius: 4,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          right: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: compact ? 7 : 8,
          color: "rgba(0,0,0,0.45)",
          letterSpacing: 0.3,
          textTransform: "uppercase",
        }}
      >
        <span>{item.category}</span>
        <span>#{String(item.id).padStart(2, "0")}</span>
      </div>
      {showBadge && item.resale && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "3px 6px",
            borderRadius: 4,
            background: "#1a1a1a",
            color: "#fff",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          Resale
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 6,
          right: 6,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: compact ? 7 : 8,
          color: "rgba(0,0,0,0.42)",
          textAlign: "center",
          letterSpacing: 0.3,
        }}
      >
        [{item.category.toLowerCase()} shot]
      </div>
    </div>
  );
}
