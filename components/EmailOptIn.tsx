"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

interface EmailOptInProps {
  slug: string;
  accentColor?: string;
}

export default function EmailOptIn({ slug, accentColor = "#E8521C" }: EmailOptInProps) {
  const [opted, setOpted] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("email_optins")
        .select("opted_in")
        .eq("slug", slug)
        .single();
      setOpted(data?.opted_in ?? false);
    }
    load();
  }, [slug]);

  async function toggle() {
    if (opted === null) return;
    const next = !opted;
    setSaving(true);
    setOpted(next);
    const supabase = createClient();
    await supabase
      .from("email_optins")
      .upsert({ slug, opted_in: next, updated_at: new Date().toISOString() }, { onConflict: "slug" });
    setSaving(false);
  }

  if (opted === null) return null;

  return (
    <div style={{
      background: opted ? accentColor : "#1C1C1C",
      borderRadius: 6,
      padding: "28px 32px",
      marginBottom: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      transition: "background 0.3s ease",
    }}>
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: opted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
          margin: "0 0 6px",
        }}>
          {opted ? "✓ You're all set" : "Stay connected between sessions"}
        </p>
        <p style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 8px",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {opted
            ? "Weekly reminders & fortnightly opportunities are on"
            : "Get coached between sessions — straight to your inbox"}
        </p>
        <p style={{
          fontSize: "0.82rem",
          color: opted ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 480,
        }}>
          {opted
            ? "Every Monday at 9am: a personalised to-do snapshot — what's done, what's outstanding, and a link back here. Every fortnight: an opportunity email from Ben reviewing where you are, what to chase, and who to follow up with."
            : "Two emails, both written around you. Every Monday: your to-do list, your progress, your dashboard link. Every fortnight: Ben reviews your momentum and sends you specific opportunities to act on — conversations to turn into content, leads to chase, platforms to show up on."}
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={saving}
        aria-pressed={opted}
        style={{
          flexShrink: 0,
          width: 56,
          height: 30,
          borderRadius: 15,
          background: opted ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.4)",
          cursor: saving ? "not-allowed" : "pointer",
          position: "relative",
          transition: "background 0.2s ease",
          opacity: saving ? 0.7 : 1,
        }}
      >
        <span style={{
          position: "absolute",
          top: 3,
          left: opted ? 28 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }} />
      </button>
    </div>
  );
}
