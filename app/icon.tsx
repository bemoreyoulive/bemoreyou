import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: "#1C1C1C",
          borderRadius: 112,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
          <span style={{ fontSize: 180, fontWeight: 800, color: "#fff", letterSpacing: "-6px", fontFamily: "sans-serif" }}>BMY</span>
        </div>
        <div style={{ width: 60, height: 5, background: "#4ec9d0", borderRadius: 3, marginTop: -8 }} />
      </div>
    ),
    { ...size }
  );
}
