"use client";

import { useState } from "react";

export default function BenUpdateBox({ slug }: { slug: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSend() {
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/ben-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, message }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{
      background: "#1a1916",
      border: "1px solid #3a3835",
      borderRadius: 8,
      padding: "20px 24px",
      marginTop: 32,
    }}>
      <p style={{
        fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.18em", color: "#E8521C", margin: "0 0 4px",
      }}>
        Ben only
      </p>
      <p style={{
        fontSize: "0.88rem", fontWeight: 600, color: "#f5f3f0",
        margin: "0 0 12px",
      }}>
        Send a dashboard update
      </p>
      <p style={{
        fontSize: "0.78rem", color: "#7a7672", lineHeight: 1.55, margin: "0 0 14px",
      }}>
        Write a note — let the client know you&apos;ve updated their dashboard, added content ideas, or anything else. Sends directly to their email.
      </p>
      <textarea
        value={message}
        onChange={e => { setMessage(e.target.value); setStatus("idle"); }}
        placeholder="e.g. I've added a new Behind the Hush workspace to your Content Ideas tab — worth a look before our session on 6 May."
        rows={4}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "#111110", border: "1px solid #3a3835", borderRadius: 6,
          padding: "12px 14px", fontSize: "0.84rem", color: "#f5f3f0",
          lineHeight: 1.6, resize: "vertical", fontFamily: "inherit",
          outline: "none",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
        <button
          onClick={handleSend}
          disabled={status === "sending" || !message.trim()}
          style={{
            padding: "9px 22px", background: status === "sent" ? "#2e7d4f" : "#E8521C",
            color: "#fff", border: "none", borderRadius: 5,
            fontSize: "0.8rem", fontWeight: 700, cursor: message.trim() ? "pointer" : "not-allowed",
            opacity: !message.trim() || status === "sending" ? 0.5 : 1,
            transition: "background 0.2s",
          }}
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send to client"}
        </button>
        {status === "error" && (
          <p style={{ fontSize: "0.78rem", color: "#c0392b", margin: 0 }}>
            Something went wrong — check the console.
          </p>
        )}
        {status === "sent" && (
          <p style={{ fontSize: "0.78rem", color: "#2e7d4f", margin: 0 }}>
            Email delivered.
          </p>
        )}
      </div>
    </div>
  );
}
