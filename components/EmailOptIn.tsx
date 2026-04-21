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
      background: "#fff",
      border: "1px solid #E0DBD3",
      borderRadius: 4,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      marginTop: 24,
    }}>
      <div>
        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px" }}>
          Weekly to-do reminders
        </p>
        <p style={{ fontSize: "0.8rem", color: "#7A746E", margin: 0, lineHeight: 1.5 }}>
          Receive a Monday 9am email with your outstanding to-do items and anything you've ticked off that week.
        </p>
      </div>
      <button
        onClick={toggle}
        disabled={saving}
        aria-pressed={opted}
        style={{
          flexShrink: 0,
          width: 48,
          height: 26,
          borderRadius: 13,
          background: opted ? accentColor : "#E0DBD3",
          border: "none",
          cursor: saving ? "not-allowed" : "pointer",
          position: "relative",
          transition: "background 0.2s ease",
          opacity: saving ? 0.7 : 1,
        }}
      >
        <span style={{
          position: "absolute",
          top: 3,
          left: opted ? 25 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
}
