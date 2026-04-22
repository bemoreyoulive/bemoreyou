"use client";

interface Props {
  move: string;
  accentColor: string;
  // When provided, renders the page title + session label to the left of the box
  clientName?: string;
  sessionLabel?: string;
}

export default function NextMoveBox({ move, accentColor, clientName, sessionLabel }: Props) {
  const firstName = clientName?.split(" ")[0];

  if (clientName && sessionLabel) {
    // Two-column header: title left, needle box right
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

  // Standalone: just the box, floated right
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
        fontSize: "0.55rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.75)",
        margin: 0,
        lineHeight: 1.6,
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
