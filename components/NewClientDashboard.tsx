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

import { useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import EmailOptIn from "@/components/EmailOptIn";

export interface ClientConfig {
  name: string;
  role: string;
  initials: string;
  color: string;
  sessionLabel: string;
}

const TABS = [
  { id: "home", label: "Home & To-Do" },
  { id: "milestones", label: "Milestones" },
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "messaging", label: "Messaging" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

// ─── MILESTONE DEFINITIONS ───────────────────────────────────────────────────
// These are the 8 core milestones every client works through.
// Mark completed ones by changing `done: false` to `done: true` as they happen.

const MILESTONES = [
  {
    id: "m1",
    label: "Blueprint complete",
    description: "90-minute deep dive done. Ben has a full picture of your experiences, values, beliefs, personality, and where you're headed.",
    done: false,
  },
  {
    id: "m2",
    label: "Positioning statement finalised",
    description: "You have a clear, specific positioning statement that reflects who you are now — not who you used to be.",
    done: false,
  },
  {
    id: "m3",
    label: "LinkedIn profile updated",
    description: "Headline, About section, and banner all updated to reflect your new positioning and voice.",
    done: false,
  },
  {
    id: "m4",
    label: "First aligned post published",
    description: "Your first piece of content that sounds genuinely like you — not performed, not diluted.",
    done: false,
  },
  {
    id: "m5",
    label: "First 'that's exactly me' DM received",
    description: "Someone has reached out off the back of your content or profile saying you described their problem perfectly.",
    done: false,
  },
  {
    id: "m6",
    label: "First inbound enquiry from content",
    description: "A genuine lead has come in who found you through your personal brand — not a referral, not a warm intro.",
    done: false,
  },
  {
    id: "m7",
    label: "Consistent posting rhythm established",
    description: "2+ posts per week for 4 consecutive weeks. The habit is real, not forced.",
    done: false,
  },
  {
    id: "m8",
    label: "First 'shit, you just get me' moment",
    description: "A prospect or client has used those words — or something close. The positioning is doing its job.",
    done: false,
  },
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

function MilestoneTracker({ color }: { color: string }) {
  const done = MILESTONES.filter(m => m.done).length;
  const total = MILESTONES.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 4px" }}>Your Journey</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>Milestones</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "2rem", fontWeight: 700, color, margin: 0, lineHeight: 1 }}>{done}/{total}</p>
          <p style={{ fontSize: "0.72rem", color: "#7A746E", margin: "4px 0 0" }}>completed</p>
        </div>
      </div>

      <div style={{ background: "#E0DBD3", borderRadius: 4, height: 6, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MILESTONES.map((m, i) => (
          <div key={m.id} style={{
            background: m.done ? "#fff" : "#fff",
            border: m.done ? `1px solid ${color}` : "1px solid #E0DBD3",
            borderLeft: m.done ? `4px solid ${color}` : "4px solid #E0DBD3",
            borderRadius: 4,
            padding: "18px 22px",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            opacity: m.done ? 1 : 0.7,
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: m.done ? color : "#E0DBD3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}>
              {m.done ? "✓" : i + 1}
            </div>
            <div>
              <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px" }}>{m.label}</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>{m.description}</p>
              {m.done && (
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "8px 0 0", letterSpacing: "0.05em" }}>COMPLETE</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <EmailOptIn slug={slug} accentColor={color} />

            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>{sessionLabel}</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>{firstName} — Client Dashboard</h2>

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
              />
            ) : (
              <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "32px", textAlign: "center", marginBottom: 24 }}>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", margin: 0 }}>To-do items will appear here after your first session with Ben.</p>
              </div>
            )}

            <CommentBox clientName={name} tabName="Home" slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker color={color} />
        )}

        {/* ── POSITIONING ── */}
        {activeTab === "positioning" && (
          POSITIONING.headline ? (
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
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>Your audience</p>
                  {POSITIONING.audiences.map((a, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "0 0 4px" }}>{a.label}</p>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : <PlaceholderTab label="Positioning" color={color} />
        )}

        {/* ── HEADLINES ── */}
        {activeTab === "headlines" && (
          HEADLINES.length > 0 ? (
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
          ) : <PlaceholderTab label="Headlines" color={color} />
        )}

        {/* ── ABOUT ── */}
        {activeTab === "about" && (
          ABOUT_VERSIONS.length > 0 ? (
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
          ) : <PlaceholderTab label="About Section" color={color} />
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          CONTENT_IDEAS.length > 0 ? (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Content Strategy</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
              {CONTENT_IDEAS.map((idea, i) => (
                <div key={i} style={{ background: idea.priority ? "#f0f7ed" : "#fff", border: "1px solid #E0DBD3", borderLeft: idea.priority ? `3px solid ${color}` : "1px solid #E0DBD3", borderRadius: 4, padding: "20px 24px", marginBottom: 12 }}>
                  <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.5 }}>{idea.hook}</p>
                  <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{idea.guidance}</p>
                </div>
              ))}
            </div>
          ) : <PlaceholderTab label="Content Ideas" color={color} />
        )}

        {/* ── MESSAGING ── */}
        {activeTab === "messaging" && (
          MESSAGING.length > 0 ? (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Key Themes</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Messaging</h2>
              {MESSAGING.map((m, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color, margin: "0 0 10px" }}>{m.title}</p>
                  <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{m.body}</p>
                </div>
              ))}
            </div>
          ) : <PlaceholderTab label="Messaging" color={color} />
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          RECOMMENDATIONS.length > 0 ? (
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
          ) : <PlaceholderTab label="Ben's Recommendations" color={color} />
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          GOALS.short.length > 0 || GOALS.long.length > 0 ? (
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
          ) : <PlaceholderTab label="Goals" color={color} />
        )}

      </div>
    </div>
  );
}
