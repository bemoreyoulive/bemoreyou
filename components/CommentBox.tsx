"use client";

import { useState } from "react";

interface CommentBoxProps {
  clientName: string;
  tabName: string;
}

export default function CommentBox({ clientName, tabName }: CommentBoxProps) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "comment",
          clientName,
          detail: `[${tabName} tab]\n\n${text.trim()}`,
        }),
      });
      setStatus("sent");
      setText("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{marginTop: 56, paddingTop: 40, borderTop: "1px solid #E0DBD3"}}>
      <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 12}}>
        Leave a comment for Ben
      </p>
      {status === "sent" ? (
        <div style={{padding: "16px 20px", background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3}}>
          <p style={{fontSize: "0.9rem", color: "#1C1C1C", margin: 0}}>Comment sent — Ben will get back to you.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 10}}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type your comment or question here..."
            rows={4}
            style={{
              width: "100%", padding: "14px 16px",
              border: "1px solid #E0DBD3", borderRadius: 3,
              fontSize: "0.9rem", color: "#1C1C1C",
              background: "#fff", resize: "vertical",
              fontFamily: "inherit", lineHeight: 1.6,
              outline: "none", boxSizing: "border-box",
            }}
          />
          {status === "error" && <p style={{fontSize: "0.8rem", color: "#E8521C", margin: 0}}>Something went wrong — try again.</p>}
          <button
            type="submit"
            disabled={status === "sending" || !text.trim()}
            style={{
              alignSelf: "flex-start", padding: "11px 28px",
              background: status === "sending" ? "#7A746E" : "#E8521C",
              color: "#fff", border: "none", borderRadius: 3,
              fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "background 0.15s ease",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Comment"}
          </button>
        </form>
      )}
    </div>
  );
}
