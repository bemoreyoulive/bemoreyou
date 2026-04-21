"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

interface CommentBoxProps {
  clientName: string;
  tabName: string;
  slug: string;
}

interface Comment {
  id: string;
  text: string;
  created_at: string;
}

export default function CommentBox({ clientName, tabName, slug }: CommentBoxProps) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    async function loadComments() {
      const supabase = createClient();
      const { data } = await supabase
        .from("comments")
        .select("id, text, created_at")
        .eq("slug", slug)
        .eq("tab_name", tabName)
        .order("created_at", { ascending: true });
      setComments(data ?? []);
    }
    loadComments();
  }, [slug, tabName]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");

    const supabase = createClient();
    const { data: saved, error } = await supabase
      .from("comments")
      .insert({ slug, tab_name: tabName, client_name: clientName, text: text.trim() })
      .select("id, text, created_at")
      .single();

    if (error) { setStatus("error"); return; }

    setComments(prev => [...prev, saved]);
    setText("");
    setStatus("idle");

    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "comment",
        clientName,
        detail: `[${tabName} tab]\n\n${text.trim()}`,
      }),
    });
  }

  return (
    <div style={{marginTop: 56, paddingTop: 40, borderTop: "1px solid #E0DBD3"}}>
      <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 20}}>
        Leave a comment for Ben
      </p>

      {comments.length > 0 && (
        <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 20}}>
          {comments.map(c => (
            <div key={c.id} style={{background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3, padding: "14px 18px"}}>
              <p style={{fontSize: "0.9rem", color: "#1C1C1C", margin: "0 0 6px", lineHeight: 1.6, whiteSpace: "pre-wrap"}}>{c.text}</p>
              <p style={{fontSize: "0.68rem", color: "#7A746E", margin: 0}}>
                {new Date(c.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}

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
          onFocus={e => e.target.style.borderColor = "#E8521C"}
          onBlur={e => e.target.style.borderColor = "#E0DBD3"}
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
    </div>
  );
}
