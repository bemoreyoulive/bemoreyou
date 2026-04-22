"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

interface Props {
  clientName: string;
  tabName: string;
  slug: string;
}

interface Comment {
  id: string;
  text: string;
  created_at: string;
}

export default function DashboardFooter({ clientName, tabName, slug }: Props) {
  // ── Client comment state ──
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentStatus, setCommentStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // ── Ben update state ──
  const [updateText, setUpdateText] = useState("");
  const [updateStatus, setUpdateStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentStatus("sending");

    const supabase = createClient();
    const { data: saved, error } = await supabase
      .from("comments")
      .insert({ slug, tab_name: tabName, client_name: clientName, text: commentText.trim() })
      .select("id, text, created_at")
      .single();

    if (error) { setCommentStatus("error"); return; }

    setComments(prev => [...prev, saved]);
    setCommentText("");
    setCommentStatus("idle");

    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "comment",
        clientName,
        detail: `[${tabName} tab]\n\n${commentText.trim()}`,
      }),
    });
  }

  async function handleUpdate() {
    if (!updateText.trim()) return;
    setUpdateStatus("sending");
    try {
      const res = await fetch("/api/ben-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, message: updateText }),
      });
      setUpdateStatus(res.ok ? "sent" : "error");
      if (res.ok) setUpdateText("");
    } catch {
      setUpdateStatus("error");
    }
  }

  return (
    <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid #E0DBD3" }}>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24, alignItems: "start" }}>

        {/* ── Client comment box (primary, left) ── */}
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>
            Leave a comment for Ben
          </p>
          <p style={{ fontSize: "0.78rem", color: "#9e9b94", margin: "0 0 16px", lineHeight: 1.5 }}>
            Question, feedback, or anything you want Ben to look at — he&apos;ll get a notification.
          </p>

          {comments.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {comments.map(c => (
                <div key={c.id} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3, padding: "14px 18px" }}>
                  <p style={{ fontSize: "0.9rem", color: "#1C1C1C", margin: "0 0 6px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{c.text}</p>
                  <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>
                    {new Date(c.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleComment} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea
              value={commentText}
              onChange={e => { setCommentText(e.target.value); setCommentStatus("idle"); }}
              placeholder="e.g. Hi Ben, love the updates — could you check this content idea / headline for me?"
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
            {commentStatus === "error" && <p style={{ fontSize: "0.8rem", color: "#E8521C", margin: 0 }}>Something went wrong — try again.</p>}
            <button
              type="submit"
              disabled={commentStatus === "sending" || !commentText.trim()}
              style={{
                alignSelf: "flex-start", padding: "11px 28px",
                background: commentStatus === "sending" ? "#7A746E" : "#E8521C",
                color: "#fff", border: "none", borderRadius: 3,
                fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: commentText.trim() ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
              }}
            >
              {commentStatus === "sending" ? "Sending..." : "Send Comment"}
            </button>
          </form>
        </div>

        {/* ── Ben update box (secondary, right) ── */}
        <div style={{ background: "#1a1916", border: "1px solid #3a3835", borderRadius: 8, padding: "18px 20px" }}>
          <p style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#E8521C", margin: "0 0 4px" }}>
            Ben only
          </p>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#f5f3f0", margin: "0 0 10px" }}>
            Send a dashboard update
          </p>
          <p style={{ fontSize: "0.72rem", color: "#7a7672", lineHeight: 1.5, margin: "0 0 12px" }}>
            Sends an email to the client with your message and a link to their dashboard.
          </p>
          <textarea
            value={updateText}
            onChange={e => { setUpdateText(e.target.value); setUpdateStatus("idle"); }}
            rows={4}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#111110", border: "1px solid #3a3835", borderRadius: 6,
              padding: "10px 12px", fontSize: "0.8rem", color: "#f5f3f0",
              lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", outline: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <button
              onClick={handleUpdate}
              disabled={updateStatus === "sending" || !updateText.trim()}
              style={{
                padding: "8px 18px",
                background: updateStatus === "sent" ? "#2e7d4f" : "#E8521C",
                color: "#fff", border: "none", borderRadius: 5,
                fontSize: "0.75rem", fontWeight: 700, cursor: updateText.trim() ? "pointer" : "not-allowed",
                opacity: !updateText.trim() || updateStatus === "sending" ? 0.5 : 1,
                transition: "background 0.2s",
              }}
            >
              {updateStatus === "sending" ? "Sending…" : updateStatus === "sent" ? "Sent ✓" : "Send to client"}
            </button>
            {updateStatus === "error" && <p style={{ fontSize: "0.72rem", color: "#c0392b", margin: 0 }}>Something went wrong.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
