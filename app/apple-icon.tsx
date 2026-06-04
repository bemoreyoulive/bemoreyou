import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1C1C1C",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 62, fontWeight: 800, color: "#fff", letterSpacing: "-2px", fontFamily: "sans-serif" }}>BMY</span>
        </div>
        <div style={{ width: 22, height: 3, background: "#4ec9d0", borderRadius: 2, marginTop: -4 }} />
      </div>
    ),
    { ...size }
  );
}
