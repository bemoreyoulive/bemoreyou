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
        .from("client_profiles")
        .select("monday_reminders")
        .eq("slug", slug)
        .single();
      setOpted(data?.monday_reminders ?? false);
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
      .from("client_profiles")
      .update({ monday_reminders: next })
      .eq("slug", slug);
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
          {opted ? "✓ You're all set" : "Free bonus — don't miss this"}
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
            ? "Weekly to-do reminders are on"
            : "Get your to-do list delivered every Monday morning"}
        </p>
        <p style={{
          fontSize: "0.82rem",
          color: opted ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 480,
        }}>
          {opted
            ? "Ben will send you a personalised email every Monday at 9am — what's done, what's outstanding, and a direct link back here."
            : "Every Monday at 9am, Ben sends you a personalised snapshot of your progress — what you've knocked off, what's still on the list, and a direct link back to your dashboard. Takes 30 seconds to read. Keeps you moving."}
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
