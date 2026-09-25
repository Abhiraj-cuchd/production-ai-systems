import { ImageResponse } from "next/og";

export const alt = "Abhiraj Ghosh — Backend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#151516",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            color: "#79776f",
            textTransform: "uppercase",
          }}
        >
          <span>Portfolio — 2026</span>
          <span>Chandigarh, IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 108, color: "#efeee9", letterSpacing: -4, lineHeight: 1 }}>
            Abhiraj Ghosh<span style={{ color: "#7c9cbf" }}>.</span>
          </span>
          <span style={{ fontSize: 32, color: "#b4b2ab", marginTop: 28 }}>
            Backend Software Engineer — Node.js · NestJS · Applied AI
          </span>
        </div>
        <div style={{ width: 160, height: 6, background: "#7c9cbf" }} />
      </div>
    ),
    size,
  );
}
