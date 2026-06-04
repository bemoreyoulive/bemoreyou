"use client";

import { useState, useEffect } from "react";

const QUESTIONS = [
  "What have you posted since we last spoke — and how did it feel?",
  "What conversations have you had that felt relevant?",
  "What felt aligned this fortnight? What felt forced?",
  "Any wins worth celebrating, however small?",
  "Anything you want to make sure we cover?",
];

export default function SessionPrepPrompt() {
  const [visible, setVisible] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    if (mobile) setMinimised(true);
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? 12 : 28,
        right: isMobile ? 12 : 28,
        width: (isMobile && minimised) ? "auto" : isMobile ? "calc(100vw - 24px)" : 320,
        zIndex: 999,
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div style={{
        background: "#1C1C1C",
        borderRadius: (isMobile && minimised) ? 20 : 8,
        boxShadow: "0 4px 18px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}>
        {/* Header / pill */}
        <div style={{
          background: "#E8521C",
          padding: (isMobile && minimised) ? "8px 14px" : "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          cursor: "pointer",
        }} onClick={() => setMinimised(m => !m)}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: (isMobile && minimised) ? "0.8rem" : "0.95rem" }}>📋</span>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", margin: 0, whiteSpace: "nowrap" }}>
              {(isMobile && minimised) ? "Prep" : "Session prep"}
            </p>
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem" }}>{minimised ? "▲" : "▼"}</span>
        </div>

        {/* Body */}
        {!minimised && (
          <div style={{ padding: "16px 18px 20px" }}>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "0 0 14px", lineHeight: 1.5 }}>
              Before your next session with Ben, take 5 minutes to think through these.
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {QUESTIONS.map((q, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.85)",
                    margin: 0,
                    lineHeight: 1.55,
                    padding: "8px 0",
                    borderBottom: i < QUESTIONS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  {q}
                </p>
              ))}
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", margin: "14px 0 0", lineHeight: 1.5 }}>
              Drop your answers in the comment box below — Ben will see them before the call.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
