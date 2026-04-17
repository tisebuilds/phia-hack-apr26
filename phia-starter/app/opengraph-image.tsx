import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0e0e10",
          color: "#fafaf7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontStyle: "italic", marginBottom: 12 }}>phia Starter</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            padding: "0 80px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "3/4",
                borderRadius: 8,
                background: "#f4f1ec",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 22, fontSize: 18, color: "rgba(250,250,247,0.65)" }}>
          Twelve-piece first-day capsule — demo
        </div>
      </div>
    ),
    size,
  );
}
