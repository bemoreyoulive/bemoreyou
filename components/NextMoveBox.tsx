"use client";

import { useEffect, useState } from "react";

interface Props {
  move: string;
  accentColor: string;
  clientName?: string;
  sessionLabel?: string;
  animateIn?: boolean;
}

export default function NextMoveBox({ move, accentColor, clientName, sessionLabel, animateIn }: Props) {
  const firstName = clientName?.split(" ")[0];
  const [visible, setVisible] = useState(false);
  const [minimised, setMinimised] = useState(false);

  useEffect(() => {
    if (!animateIn) return;
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, [animateIn]);

  if (animateIn) {
    return (
      <>
        {/* Inline title header */}
        {clientName && sessionLabel && (
          <div style={{ marginBottom: 36 }}>
            <p style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: accentColor,
              margin: "0 0 6px",
            }}>
              {sessionLabel}
            </p>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontFamily: "var(--font-dm-serif), serif",
              fontWeight: 400,
              color: "#1C1C1C",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}>
              {firstName} — Client Dashboard
            </h2>
          </div>
        )}

        {/* Fixed bottom-left — persistent, minimisable */}
        <div style={{
          position: "fixed",
          bottom: 28,
          left: 28,
          zIndex: 999,
          width: minimised ? 160 : 220,
          transform: visible ? "translateX(0)" : "translateX(-120%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, width 0.2s ease",
          pointerEvents: visible ? "auto" : "none",
        }}>
          {minimised ? (
            <button
              onClick={() => setMinimised(false)}
              style={{
                width: "100%", padding: "10px 14px",
                background: "#1a1916", borderRadius: 8,
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, flexShrink: 0 }} />
              <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>This week</span>
            </button>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMinimised(true)}
                style={{
                  position: "absolute", top: 10, right: 10, zIndex: 1,
                  background: "none", border: "none",
                  color: "rgba(255,255,255,0.5)", cursor: "pointer",
                  fontSize: "0.75rem", lineHeight: 1, padding: 0,
                }}
              >▼</button>
              <NeedleCard move={move} accentColor={accentColor} />
            </div>
          )}
        </div>
      </>
    );
  }

  if (clientName && sessionLabel) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 28,
        alignItems: "start",
        marginBottom: 36,
      }}>
        <div>
          <p style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: accentColor,
            margin: "0 0 6px",
          }}>
            {sessionLabel}
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontFamily: "var(--font-dm-serif), serif",
            fontWeight: 400,
            color: "#1C1C1C",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}>
            {firstName} — Client Dashboard
          </h2>
        </div>
        <NeedleCard move={move} accentColor={accentColor} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
      <NeedleCard move={move} accentColor={accentColor} />
    </div>
  );
}

function NeedleCard({ move, accentColor }: { move: string; accentColor: string }) {
  return (
    <div style={{
      width: 220,
      minHeight: 220,
      background: "#1a1916",
      borderRadius: 10,
      padding: "22px 22px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    }}>
      {/* Accent bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: accentColor,
      }} />

      {/* Label */}
      <p style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.85)",
        margin: 0,
        lineHeight: 1.5,
      }}>
        What will move<br />the needle this week
      </p>

      {/* Move text */}
      <p style={{
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "#fff",
        margin: 0,
        lineHeight: 1.45,
        letterSpacing: "-0.01em",
      }}>
        {move}
      </p>

      {/* Bottom accent dot */}
      <div style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: accentColor,
        opacity: 0.2,
        alignSelf: "flex-end",
      }} />
    </div>
  );
}
