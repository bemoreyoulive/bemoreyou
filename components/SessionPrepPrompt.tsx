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
  const [crossed, setCrossed] = useState<boolean[]>(QUESTIONS.map(() => false));

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const allDone = crossed.every(Boolean);

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
          background: allDone ? "#2e7d4f" : "#E8521C",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "background 0.3s ease",
        }} onClick={() => setMinimised(m => !m)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "0.95rem" }}>{allDone ? "✅" : "📋"}</span>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", margin: 0 }}>
              {allDone ? "Session prep — all done" : "Session prep"}
            </p>
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>{minimised ? "▲" : "▼"}</span>
        </div>

        {/* Body */}
        {!minimised && (
          <div style={{ padding: "16px 18px 20px" }}>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "0 0 14px", lineHeight: 1.5 }}>
              Before your next session with Ben, take 5 minutes. Tick each one off as you go.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  onClick={() => setCrossed(prev => { const next = [...prev]; next[i] = !next[i]; return next; })}
                  style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    cursor: "pointer", padding: "6px 0",
                    borderBottom: i < QUESTIONS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <span style={{
                    flexShrink: 0, width: 18, height: 18, borderRadius: 3,
                    border: `2px solid ${crossed[i] ? "#2e7d4f" : "rgba(255,255,255,0.3)"}`,
                    background: crossed[i] ? "#2e7d4f" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 1, transition: "all 0.15s ease",
                  }}>
                    {crossed[i] && <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>✓</span>}
                  </span>
                  <p style={{
                    fontSize: "0.8rem",
                    color: crossed[i] ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.85)",
                    margin: 0, lineHeight: 1.55,
                    textDecoration: crossed[i] ? "line-through" : "none",
                    transition: "all 0.15s ease",
                  }}>{q}</p>
                </div>
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
