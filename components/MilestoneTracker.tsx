"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const MILESTONES: { id: string; label: string; description: string }[] = [
  {
    id: "m1",
    label: "Blueprint complete",
    description: "90-minute deep dive done. Ben has the full picture — your experiences, values, beliefs, personality, and where you're headed commercially.",
  },
  {
    id: "m2",
    label: "Positioning statement finalised",
    description: "You have a clear, specific positioning statement that reflects who you are now — not your last chapter.",
  },
  {
    id: "m3",
    label: "LinkedIn profile updated",
    description: "Headline, About section, and banner all updated to reflect your new positioning and voice.",
  },
  {
    id: "m4",
    label: "First aligned post published",
    description: "Your first piece of content that sounds genuinely like you — not performed, not softened, not beige.",
  },
  {
    id: "m5",
    label: "First 'that's exactly me' response received",
    description: "Someone has reached out saying you described their situation perfectly — a DM, a comment, or a conversation that started because of your content.",
  },
  {
    id: "m6",
    label: "Posting rhythm established",
    description: "2+ posts per week for 4 consecutive weeks. The habit is real, not forced.",
  },
  {
    id: "m7",
    label: "First inbound enquiry from content",
    description: "A genuine lead has come in through your personal brand — not a referral, not a warm intro. Your brand is working.",
  },
  {
    id: "m8",
    label: "First 'shit, you just get me' moment",
    description: "A prospect or client used those words — or something very close. The positioning is doing its job commercially.",
  },
];

interface Props {
  slug: string;
  color: string;
}

export default function MilestoneTracker({ slug, color }: Props) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("milestone_states")
        .select("milestone_id, completed")
        .eq("slug", slug);
      const map: Record<string, boolean> = {};
      (data ?? []).forEach(r => { map[r.milestone_id] = r.completed; });
      setCompleted(map);
      setLoaded(true);
    }
    load();
  }, [slug]);

  async function toggle(milestoneId: string) {
    const next = !completed[milestoneId];
    setSaving(milestoneId);
    setCompleted(prev => ({ ...prev, [milestoneId]: next }));
    const supabase = createClient();
    await supabase
      .from("milestone_states")
      .upsert({
        slug,
        milestone_id: milestoneId,
        completed: next,
        completed_at: next ? new Date().toISOString() : null,
      }, { onConflict: "slug,milestone_id" });
    setSaving(null);
  }

  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / MILESTONES.length) * 100);

  if (!loaded) return null;

  return (
    <div>
      {/* Header + progress */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 4px" }}>Your Journey</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>Milestones</h2>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: "2.2rem", fontWeight: 700, color, margin: 0, lineHeight: 1 }}>{doneCount}<span style={{ fontSize: "1.2rem", color: "#B0A89E" }}>/{MILESTONES.length}</span></p>
          <p style={{ fontSize: "0.72rem", color: "#7A746E", margin: "4px 0 0" }}>completed</p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#E0DBD3", borderRadius: 4, height: 6, marginBottom: 36, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>

      {/* Milestone cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MILESTONES.map((m, i) => {
          const done = !!completed[m.id];
          const isSaving = saving === m.id;
          return (
            <div
              key={m.id}
              onClick={() => !isSaving && toggle(m.id)}
              style={{
                background: done ? "#fff" : "#fff",
                border: done ? `1px solid ${color}` : "1px solid #E0DBD3",
                borderLeft: done ? `4px solid ${color}` : "4px solid #E0DBD3",
                borderRadius: 4,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                cursor: isSaving ? "not-allowed" : "pointer",
                transition: "border-color 0.2s ease",
                opacity: isSaving ? 0.6 : 1,
              }}
            >
              {/* Step number */}
              <span style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: done ? color : "#E0DBD3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#fff",
                transition: "background 0.2s ease",
              }}>
                {i + 1}
              </span>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#1C1C1C",
                  margin: "0 0 3px",
                  textDecoration: done ? "line-through" : "none",
                  opacity: done ? 0.5 : 1,
                }}>
                  {m.label}
                </p>
                <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0, lineHeight: 1.6, opacity: done ? 0.6 : 1 }}>
                  {m.description}
                </p>
              </div>

              {/* Sliding toggle */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  background: done ? color : "#E0DBD3",
                  position: "relative",
                  transition: "background 0.2s ease",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 3,
                    left: done ? 25 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transition: "left 0.2s ease",
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: "0.75rem", color: "#B0A89E", marginTop: 20, lineHeight: 1.6 }}>
        Toggle any milestone to mark it complete — your progress saves automatically.
      </p>
    </div>
  );
}
