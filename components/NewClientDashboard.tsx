"use client";

// ─────────────────────────────────────────────────────────────────────────────
// NEW CLIENT DASHBOARD TEMPLATE
//
// HOW TO USE WHEN ONBOARDING A NEW CLIENT:
//
// 1. In app/client/[slug]/page.tsx, import this component at the top:
//      import NewClientDashboard from "@/components/NewClientDashboard"
//
// 2. Add a route near the top of ClientDashboard (before the !client check):
//      if (slug === "their-slug") return <NewClientDashboard slug={slug} config={THEIR_CONFIG} />;
//
// 3. Define their config object above that line:
//      const THEIR_CONFIG: ClientConfig = {
//        name: "Jane Smith",
//        role: "Founder, Acme Co.",
//        initials: "JS",
//        color: "#2d5a8e",       // pick any hex colour
//        sessionLabel: "Session 1 · May 2026",
//      };
//
// 4. Add their todos to lib/todos.ts so the Monday email cron picks them up:
//      "their-slug": [
//        { id: "t1", text: "First action item" },
//        ...
//      ]
//
// 5. Add their slug to Supabase client_profiles with their email address.
//
// 6. Git commit and push to main — Railway deploys automatically.
//    They can log in at: bemoreyoulive.com/client/their-slug
//
// Fill in the tab content (Positioning, Headlines, etc.) as you go
// session by session — just edit this file directly.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

export interface ClientConfig {
  name: string;
  role: string;
  initials: string;
  color: string;
  sessionLabel: string;
  nextMove: string;
}

const TABS = [
  { id: "home", label: "Home & To-Do" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];



// ─── TODO LIST ───────────────────────────────────────────────────────────────
// Add items here after each session. Keep in sync with lib/todos.ts.

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [
  // Example — replace with real items after Session 1:
  // { id: "t1", text: "Update LinkedIn headline", subtext: "Use the version Ben sent after the positioning session.", section: "Profile" },
];

// ─── POSITIONING ─────────────────────────────────────────────────────────────
// Fill in after Session 2.

const POSITIONING: {
  headline: string;
  differentiators: string[];
  audiences: { label: string; detail: string }[];
} = {
  headline: "", // e.g. "I help X do Y so they can Z"
  differentiators: [],
  audiences: [],
};

// ─── HEADLINES ───────────────────────────────────────────────────────────────
// Add LinkedIn headline options after Session 2.

const HEADLINES: { label: string; text: string; note: string }[] = [
  // { label: "Option 1 — Problem-led", text: "...", note: "Why this works" },
];

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
// Add About section drafts after Session 2.

const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [
  // { label: "Version 1", text: "...", note: "Why this version" },
];

// ─── CONTENT IDEAS ───────────────────────────────────────────────────────────
// Add content ideas as they emerge from sessions.

const CONTENT_IDEAS: { hook: string; guidance: string; priority: boolean }[] = [
  // { hook: "Hook / angle", guidance: "What to write and why", priority: true },
];

// ─── MESSAGING ───────────────────────────────────────────────────────────────
// Key messaging themes to build content around.

const MESSAGING: { title: string; body: string }[] = [
  // { title: "Theme name", body: "Why this matters for their brand" },
];

// ─── BEN'S RECOMMENDATIONS ───────────────────────────────────────────────────
// Add Ben's post-session recommendations here.

const RECOMMENDATIONS: { title: string; body: string }[] = [
  // { title: "1. First recommendation", body: "Detail and reasoning" },
];

// ─── GOALS ───────────────────────────────────────────────────────────────────

const GOALS = {
  short: [
    // "Short-term goal 1",
  ],
  long: [
    // "Long-term goal 1",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────


function PlaceholderTab({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "48px 36px", textAlign: "center" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 12px" }}>{label}</p>
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Content coming after your next session with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>Check back here once Ben has updated your dashboard.</p>
    </div>
  );
}

export default function NewClientDashboard({ slug, config }: { slug: string; config: ClientConfig }) {
  const [activeTab, setActiveTab] = useState("home");
  const { name, role, initials, color, sessionLabel } = config;
  const firstName = name.split(" ")[0];

  const todoItems = TODOS.map(t => ({ id: t.id, text: t.text, owner: firstName }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "14px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>{name}</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>{role} · {sessionLabel}</p>
            </div>
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", fontFamily: "var(--font-dm-serif), serif" }}>
            BeMore<span style={{ color: "#4ec9d0" }}>You</span>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #E0DBD3", background: "rgba(245,241,236,0.6)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", overflowX: "auto" }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 20px",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                whiteSpace: "nowrap", border: "none", background: "transparent",
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? `2px solid ${color}` : "2px solid transparent",
                marginBottom: -1,
                color: activeTab === tab.id ? color : "#7A746E",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 36px" }}>

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={color} />
            <NextMoveBox move={config.nextMove} accentColor={color} clientName={name} sessionLabel={sessionLabel} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What this is</h3>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>A working strategy document — not a polished deck. Everything in here is based on your sessions with Ben. It'll evolve as things move forward. Use it to review, challenge, and track what you're building. If something doesn't feel right, say so.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What's in here</h3>
                <ul style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
                  <li>Your to-do list — updated after each session</li>
                  <li>Milestone tracker — your 6-month journey</li>
                  <li>Positioning, headlines, and About section</li>
                  <li>Content ideas with guidance</li>
                  <li>Ben's recommendations</li>
                  <li>Goals — short and long term</li>
                </ul>
              </div>
            </div>

            {todoItems.length > 0 ? (
              <ClientTodoList
                items={todoItems}
                clientName={name}
                slug={slug}
                accentColor={color}
                onTabLink={setActiveTab}
              />
            ) : (
              <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "32px", textAlign: "center", marginBottom: 24 }}>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", margin: 0 }}>To-do items will appear here after your first session with Ben.</p>
              </div>
            )}

            <DashboardFooter clientName={name} tabName="Home" slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={color} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            {POSITIONING.headline ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Who You're For & How You're Different</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Positioning</h2>

                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 24 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 10px" }}>Core positioning statement</p>
                  <p style={{ fontSize: "1.1rem", fontFamily: "var(--font-dm-serif), serif", color: "#1C1C1C", lineHeight: 1.6, margin: 0 }}>{POSITIONING.headline}</p>
                </div>

                {POSITIONING.differentiators.length > 0 && (
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 24 }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>What makes you different</p>
                    {POSITIONING.differentiators.map((d, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{d}</p>
                      </div>
                    ))}
                  </div>
                )}

                {POSITIONING.audiences.length > 0 && (
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 24 }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>Your audience</p>
                    {POSITIONING.audiences.map((a, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "0 0 4px" }}>{a.label}</p>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
                      </div>
                    ))}
                  </div>
                )}

                {MESSAGING.length > 0 && (
                  <>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>Messaging Angles</p>
                    {MESSAGING.map((m, i) => (
                      <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 12 }}>
                        <p style={{ fontSize: "0.88rem", fontWeight: 700, color, margin: "0 0 10px" }}>{m.title}</p>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{m.body}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : <PlaceholderTab label="Positioning" color={color} />}
            <CommentBox clientName={name} tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── HEADLINES ── */}
        {activeTab === "headlines" && (
          <div>
            {HEADLINES.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>LinkedIn Headline Options</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Headlines</h2>
                {HEADLINES.map((h, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "0 0 10px" }}>{h.label}</p>
                    <p style={{ fontSize: "1rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.5, margin: "0 0 12px" }}>{h.text}</p>
                    <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>{h.note}</p>
                  </div>
                ))}
              </div>
            ) : <PlaceholderTab label="Headlines" color={color} />}
            <CommentBox clientName={name} tabName="Headlines" slug={slug} />
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeTab === "about" && (
          <div>
            {ABOUT_VERSIONS.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>LinkedIn About Section</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>About Section</h2>
                {ABOUT_VERSIONS.map((v, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "0 0 10px" }}>{v.label}</p>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{v.text}</p>
                    <p style={{ fontSize: "0.78rem", color: "#7A746E", borderTop: "1px solid #E0DBD3", paddingTop: 12, margin: 0 }}>{v.note}</p>
                  </div>
                ))}
              </div>
            ) : <PlaceholderTab label="About Section" color={color} />}
            <CommentBox clientName={name} tabName="About Section" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            {CONTENT_IDEAS.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Content Strategy</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
                {CONTENT_IDEAS.map((idea, i) => (
                  <NewClientIdeaCard key={i} idea={idea} index={i} slug={slug} color={color} />
                ))}
              </div>
            ) : <PlaceholderTab label="Content Ideas" color={color} />}
            <CommentBox clientName={name} tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          <div>
            {RECOMMENDATIONS.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>From Ben</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
                {RECOMMENDATIONS.map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 12px" }}>{r.title}</p>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{r.body}</p>
                  </div>
                ))}
              </div>
            ) : <PlaceholderTab label="Ben's Recommendations" color={color} />}
            <CommentBox clientName={name} tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            {GOALS.short.length > 0 || GOALS.long.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Where We're Headed</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Goals</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 16px" }}>Short-term</p>
                    {GOALS.short.map((g, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 16px" }}>Long-term</p>
                    {GOALS.long.map((g, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <span style={{ color, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : <PlaceholderTab label="Goals" color={color} />}
            <CommentBox clientName={name} tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}

function NewClientIdeaCard({ idea, index, slug, color }: { idea: { hook: string; guidance: string; priority: boolean }; index: number; slug: string; color: string }) {
  const [used, setUsed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("idea_states").select("used").eq("slug", slug).eq("idea_id", `nc-${index}`).single()
      .then(({ data }) => { if (data) setUsed(data.used); });
  }, [slug, index]);

  async function toggleUsed(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !used;
    setSaving(true);
    setUsed(next);
    const supabase = createClient();
    await supabase.from("idea_states").upsert(
      { slug, idea_id: `nc-${index}`, used: next },
      { onConflict: "slug,idea_id" }
    );
    setSaving(false);
  }

  return (
    <div style={{ background: used ? "#f7f6f3" : idea.priority ? "#f0f7ed" : "#fff", border: "1px solid #E0DBD3", borderLeft: idea.priority ? `3px solid ${color}` : "1px solid #E0DBD3", borderRadius: 4, padding: "20px 24px", marginBottom: 12, opacity: used ? 0.65 : 1, transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: idea.guidance ? 10 : 0 }}>
        <p style={{ fontSize: "0.92rem", fontWeight: 600, color: used ? "#9CA3AF" : "#1C1C1C", margin: 0, lineHeight: 1.5, textDecoration: used ? "line-through" : "none", flex: 1 }}>{idea.hook}</p>
        <button
          onClick={toggleUsed}
          disabled={saving}
          style={{
            flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: 2,
            border: `1px solid ${used ? "#B0A89E" : color}`,
            background: used ? "#f3f2f0" : "#f0f7ed",
            color: used ? "#7A746E" : color,
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {used ? "Used ✓" : "Mark used"}
        </button>
      </div>
      {idea.guidance && <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{idea.guidance}</p>}
    </div>
  );
}
