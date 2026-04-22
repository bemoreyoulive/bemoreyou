"use client";

interface Props {
  move: string;
  accentColor: string;
}

export default function NextMoveBox({ move, accentColor }: Props) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 12,
      background: accentColor,
      borderRadius: 6,
      padding: "14px 18px",
      marginBottom: 28,
      maxWidth: 560,
    }}>
      <div style={{
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.7)",
        whiteSpace: "nowrap",
        paddingTop: 2,
      }}>
        What will move the needle this week
      </div>
      <p style={{
        fontSize: "0.88rem",
        fontWeight: 600,
        color: "#fff",
        margin: 0,
        lineHeight: 1.5,
      }}>
        {move}
      </p>
    </div>
  );
}
