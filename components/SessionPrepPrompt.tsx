"use client";

import { useState, useEffect } from "react";

export default function SessionPrepPrompt() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 28,
      right: 28,
      zIndex: 999,
      width: 320,
      transform: visible ? "translateY(0)" : "translateY(120%)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{
        background: "#1C1C1C",
        borderRadius: 8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          background: "#E8521C",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "0.95rem" }}>📋</span>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", margin: 0 }}>
              Session prep
            </p>
          </div>
          <button
            onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 400); }}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 0 }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 18px 20px" }}>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "0 0 14px", lineHeight: 1.5 }}>
            Before your next session with Ben, take 5 minutes:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "What have you posted since we last spoke — and how did it feel?",
              "What conversations have you had that felt relevant?",
              "What felt aligned this fortnight? What felt forced?",
              "Any wins worth celebrating, however small?",
              "Anything you want to make sure we cover?",
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#E8521C", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0, marginTop: 1 }}>{i + 1}.</span>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.55 }}>{q}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", margin: "14px 0 0", lineHeight: 1.5 }}>
            Drop your answers in the comment box below — Ben will see them before the call.
          </p>
        </div>
      </div>
    </div>
  );
}
