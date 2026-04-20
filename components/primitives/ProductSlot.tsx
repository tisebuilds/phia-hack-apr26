"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { productImageSrc, productImageSrcVariant } from "@/lib/itemPhotoPath";
import type { Item } from "@/lib/types";

export function ProductSlot({
  item,
  style = {},
  showBadge = true,
  compact = false,
  showOverlays = true,
  /** When set, cycles through all labeled shots for this item's category (outfits / capsule density). */
  labeledVariantSalt,
}: {
  item: Item;
  style?: CSSProperties;
  showBadge?: boolean;
  compact?: boolean;
  /** When false, hides category/ID row and placeholder caption (clean tile for lists). */
  showOverlays?: boolean;
  labeledVariantSalt?: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const stripe =
    "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 8px)";
  const src =
    labeledVariantSalt != null
      ? productImageSrcVariant(item, labeledVariantSalt)
      : productImageSrc(item);
  const showImage = !imgFailed;

  useEffect(() => {
    setImgFailed(false);
  }, [src]);

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
          key={src}
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
      {showOverlays ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            padding: compact ? "5px 7px" : "6px 8px",
            background: "rgba(26, 26, 26, 0.78)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: compact ? 7 : 8,
            fontWeight: 600,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: 0.35,
            textTransform: "uppercase",
          }}
        >
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.category}
          </span>
          <span style={{ flexShrink: 0, opacity: 0.85 }}>#{String(item.id).padStart(2, "0")}</span>
        </div>
      ) : null}
      {showBadge && item.resale && (
        <div
          style={{
            position: "absolute",
            bottom: showOverlays ? 6 : 8,
            right: showOverlays ? 6 : 8,
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
      {showOverlays && !showImage ? (
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
      ) : null}
    </div>
  );
}
