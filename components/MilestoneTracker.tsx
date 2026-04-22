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
    label: "First inbound enquiry from content",
    description: "A genuine lead has come in through your personal brand — not a referral, not a warm intro. Your brand is working.",
  },
  {
    id: "m6",
    label: "First 'you just get me' moment reported",
    description: "A prospect or client said you described their situation perfectly. The positioning is doing its job commercially.",
  },
];

const SIGNALS: { id: string; label: string; description: string }[] = [
  {
    id: "s1",
    label: "Inbound DM from content",
    description: "Someone reached out directly because of something you posted — not because they already knew you.",
  },
  {
    id: "s2",
    label: "Someone repeated my wording back to me",
    description: "Your language has stuck. They used your phrase, your framing, your words — without knowing it came from you.",
  },
  {
    id: "s3",
    label: "Better quality enquiry came in",
    description: "The type of person getting in touch has shifted — more aligned, more serious, less price-sensitive.",
  },
  {
    id: "s4",
    label: "Compliment on my clarity or confidence",
    description: "Someone noticed that you communicate differently — that you know what you stand for and you say it plainly.",
  },
  {
    id: "s5",
    label: "Podcast or speaking opportunity appeared",
    description: "You were invited to someone else's platform. Your positioning is making you visible to the people who curate audiences.",
  },
  {
    id: "s6",
    label: "Referral mentioned my content",
    description: "Someone referred you and specifically mentioned something you'd posted. Your content is doing the selling before you arrive.",
  },
  {
    id: "s7",
    label: "Someone said 'I really get your problem'",
    description: "A prospect or connection reflected your own problem back at you — unprompted. That's resonance. That's the work landing.",
  },
];

interface Props {
  slug: string;
  color: string;
}

function ItemCard({
  item,
  done,
  saving,
  onToggle,
  color,
  symbol,
}: {
  item: { id: string; label: string; description: string };
  done: boolean;
  saving: boolean;
  onToggle: () => void;
  color: string;
  symbol: string;
}) {
  return (
    <div
      onClick={() => !saving && onToggle()}
      style={{
        border: done ? `1px solid ${color}` : "1px solid #E0DBD3",
        borderLeft: done ? `4px solid ${color}` : "4px solid #E0DBD3",
        borderRadius: 4,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: saving ? "not-allowed" : "pointer",
        transition: "border-color 0.2s ease",
        opacity: saving ? 0.6 : 1,
        background: "#fff",
      }}
    >
      <span style={{
        flexShrink: 0,
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: done ? color : "#E0DBD3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.65rem",
        fontWeight: 700,
        color: "#fff",
        transition: "background 0.2s ease",
      }}>
        {done ? "✓" : symbol}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: "0.88rem",
          fontWeight: 600,
          color: "#1C1C1C",
          margin: "0 0 2px",
          textDecoration: done ? "line-through" : "none",
          opacity: done ? 0.5 : 1,
        }}>
          {item.label}
        </p>
        <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0, lineHeight: 1.55, opacity: done ? 0.6 : 1 }}>
          {item.description}
        </p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 42,
          height: 23,
          borderRadius: 12,
          background: done ? color : "#E0DBD3",
          position: "relative",
          transition: "background 0.2s ease",
        }}>
          <div style={{
            position: "absolute",
            top: 3,
            left: done ? 22 : 3,
            width: 17,
            height: 17,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.2s ease",
          }} />
        </div>
      </div>
    </div>
  );
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

  async function toggle(id: string) {
    const next = !completed[id];
    setSaving(id);
    setCompleted(prev => ({ ...prev, [id]: next }));
    const supabase = createClient();
    await supabase
      .from("milestone_states")
      .upsert({
        slug,
        milestone_id: id,
        completed: next,
        completed_at: next ? new Date().toISOString() : null,
      }, { onConflict: "slug,milestone_id" });
    setSaving(null);
  }

  const mDone = MILESTONES.filter(m => !!completed[m.id]).length;
  const sDone = SIGNALS.filter(s => !!completed[s.id]).length;

  if (!loaded) return null;

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 4px" }}>Your Journey</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>Milestones & Signals</h2>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        alignItems: "start",
      }}>

        {/* ── LEFT: Milestones ── */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1C1C", margin: 0 }}>Milestones</h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color }}>{mDone}/{MILESTONES.length}</span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: "0 0 10px", lineHeight: 1.5 }}>The key shifts and assets we've built together.</p>
            <div style={{ background: "#E0DBD3", borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((mDone / MILESTONES.length) * 100)}%`, background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MILESTONES.map((m, i) => (
              <ItemCard
                key={m.id}
                item={m}
                done={!!completed[m.id]}
                saving={saving === m.id}
                onToggle={() => toggle(m.id)}
                color={color}
                symbol={String(i + 1)}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Signals ── */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1C1C", margin: 0 }}>Signals</h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color }}>{sDone}/{SIGNALS.length}</span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: "0 0 10px", lineHeight: 1.5 }}>Real signs your message and positioning are landing.</p>
            <div style={{ background: "#E0DBD3", borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((sDone / SIGNALS.length) * 100)}%`, background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SIGNALS.map((s) => (
              <ItemCard
                key={s.id}
                item={s}
                done={!!completed[s.id]}
                saving={saving === s.id}
                onToggle={() => toggle(s.id)}
                color={color}
                symbol="→"
              />
            ))}
          </div>
        </div>

      </div>

      <p style={{ fontSize: "0.75rem", color: "#B0A89E", marginTop: 24, lineHeight: 1.6 }}>
        Tap any item to mark it — your progress saves automatically.
      </p>
    </div>
  );
}
