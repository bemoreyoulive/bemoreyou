"use client";

// Neil Robbins Dashboard
// Founder & CEO, Silverbean. Global affiliate & performance partnerships agency,
// ~75-80 people across Newcastle, Sydney and Chicago. 6-month engagement.
// Blueprint call (90-min Session 1) is 16 June 2026. Most tabs below are
// pre-call placeholders, filled in after the blueprint call.
// Voice rules: no em-dashes, no "quietly", no one or two word sentence fragments.
// NextMoveBox: 40-45 words MAX.

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

const NR_CONFIG = {
  name: "Neil Robbins",
  role: "Founder & CEO, Silverbean",
  initials: "NR",
  color: "#2E6F5E", // Deep Silverbean green
  sessionLabel: "Blueprint Call · 16 June 2026",
  nextMove:
    "Your blueprint call is tomorrow. Come ready to be candid and open, no prep needed. This is where we get clear on who you are, what you stand for, and how Silverbean's story becomes yours. Block the 90 minutes and bring your honesty.",
};

const TABS = [
  { id: "home", label: "Home & To-Do" },
  { id: "sessions", label: "Sessions" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

// ─── TODO LIST ───────────────────────────────────────────────────────────────
// Pre-call items. Keep in sync with lib/todos.ts. Replace with real actions
// after the blueprint call.

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [
  {
    id: "nr1",
    text: "Come to your blueprint call ready to be candid and open. There is nothing to prepare, just turn up honest. It runs 90 minutes and it sets the foundation for everything we build over the next six months.",
    section: "This week",
  },
  {
    id: "nr2",
    text: "Have a think about which one or two leaders at Silverbean might build their profiles alongside you in time. Nicky Yates and Rebecca Marnie already came up as people who do this well.",
    section: "This week",
  },
  {
    id: "nr3",
    text: "Keep an eye on your two hours a week. That is the only time commitment I am asking for. If you can protect it, the rest takes care of itself.",
    section: "Ongoing",
  },
];

// ─── POSITIONING ─────────────────────────────────────────────────────────────
// Fill in after the blueprint call. Left empty on purpose, this comes out of
// the session, not before it.

const POSITIONING: {
  headline: string;
  differentiators: string[];
  audiences: { label: string; detail: string }[];
} = {
  headline: "",
  differentiators: [],
  audiences: [],
};

// ─── HEADLINES ───────────────────────────────────────────────────────────────
const HEADLINES: { label: string; text: string; note: string }[] = [];

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [];

// ─── CONTENT IDEAS ───────────────────────────────────────────────────────────
// Left empty until after the blueprint call. Seed angles from his discovery call
// and onboarding answers are held in the master MD, ready to add once positioning
// is confirmed.

const CONTENT_IDEAS: { hook: string; guidance: string; priority: boolean }[] = [];

// ─── MESSAGING ───────────────────────────────────────────────────────────────
const MESSAGING: { title: string; body: string }[] = [];

// ─── BEN'S RECOMMENDATIONS ───────────────────────────────────────────────────
// Filled in after the blueprint call.
const RECOMMENDATIONS: { title: string; body: string }[] = [];

// ─── SESSIONS ────────────────────────────────────────────────────────────────
// First entry added after the blueprint call on 16 June 2026.
const SESSIONS: {
  number: number;
  date: string;
  title: string;
  summary: string;
  insights: string[];
  agreed: string[];
  nextSession: string;
}[] = [];

// ─── GOALS ───────────────────────────────────────────────────────────────────
// Drawn straight from the discovery call and onboarding answers.

const GOALS = {
  short: [
    "Start showing up consistently on LinkedIn with a clear point of view, two hours a week maximum",
    "Build visibility with senior marketing leaders and shift how performance partnerships are seen at decision-maker level",
    "See a measurable sales benefit for Silverbean within 12 months as your profile grows",
    "Help one or two other leaders at Silverbean start building their own profiles alongside you",
  ],
  long: [
    "Build credibility ahead of the 2027 investment round, so the trust is already there before conversations start",
    "Create a personal profile that opens doors beyond Silverbean, for whatever you choose to build next",
    "Raise the whole channel's reputation at senior level, the hill you said you are willing to die on",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

function PlaceholderTab({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "48px 36px", textAlign: "center" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 12px" }}>{label}</p>
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Content coming after your blueprint call with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>Check back here once Ben has updated your dashboard.</p>
    </div>
  );
}

export default function NeilRobbinsDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");
  const config = NR_CONFIG;
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
            <NextMoveBox move={config.nextMove} accentColor={color} clientName={name} sessionLabel={sessionLabel} animateIn />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What this is</h3>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>A working strategy document, not a polished deck. Everything in here is based on your sessions with Ben. It will evolve as things move forward. Use it to review, challenge, and track what you are building. If something does not feel right, say so.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What's in here</h3>
                <ul style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
                  <li>Your to-do list, updated after each session</li>
                  <li>Milestone tracker, your 6-month journey</li>
                  <li>Positioning, headlines, and About section</li>
                  <li>Content ideas with guidance</li>
                  <li>Ben's recommendations</li>
                  <li>Goals, short and long term</li>
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
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Draft angles pulled from your discovery call and onboarding answers. These are starting points to validate together on the blueprint call, not a confirmed plan. Every one comes from your own words.</p>
                {CONTENT_IDEAS.map((idea, i) => (
                  <NeilIdeaCard key={i} idea={idea} index={i} slug={slug} color={color} />
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

        {/* ── SESSIONS ── */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 6px" }}>Your Journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 36px" }}>A running record of what we have covered, what shifted, and what was decided. Your whole journey, in one place. Your first entry lands after the blueprint call.</p>

            {SESSIONS.length === 0 ? (
              <PlaceholderTab label="Sessions" color={color} />
            ) : (
              <div style={{ position: "relative" }}>
                {/* Timeline line */}
                <div style={{ position: "absolute", left: 19, top: 24, bottom: 24, width: 2, background: "#E0DBD3", zIndex: 0 }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {[...SESSIONS].reverse().map((session, i) => (
                    <div key={session.number} style={{ display: "flex", gap: 28, position: "relative" }}>
                      {/* Number dot */}
                      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: i === 0 ? color : "#fff", border: `2px solid ${i === 0 ? color : "#E0DBD3"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: i === 0 ? "#fff" : "#7A746E", zIndex: 1 }}>
                        {session.number}
                      </div>

                      <div style={{ flex: 1, background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${color}` : "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 4 }}>
                        {/* Header */}
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                          <div>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Session {session.number} · {session.date}</p>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{session.title}</h3>
                          </div>
                          {i === 0 && (
                            <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}33` }}>Latest</span>
                          )}
                        </div>

                        {/* Summary */}
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 20px" }}>{session.summary}</p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                          {/* Key insights */}
                          <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "14px 16px" }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Key insights</p>
                            {session.insights.map((insight, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
                                <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{insight}</p>
                              </div>
                            ))}
                          </div>

                          {/* Agreed actions */}
                          <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "14px 16px" }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>What was agreed</p>
                            {session.agreed.map((action, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color: "#2e7d4f", fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>✓</span>
                                <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{action}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Next session */}
                        <div style={{ borderTop: "1px solid #E0DBD3", paddingTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                          <p style={{ fontSize: "0.72rem", color: "#9CA3AF", margin: 0 }}>Next session:</p>
                          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#3D3935", margin: 0 }}>{session.nextSession}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <CommentBox clientName={name} tabName="Sessions" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            {GOALS.short.length > 0 || GOALS.long.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Where We're Headed</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Goals</h2>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Pulled from our discovery call and your onboarding answers. We will sharpen and prioritise these together on the blueprint call.</p>

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

function NeilIdeaCard({ idea, index, slug, color }: { idea: { hook: string; guidance: string; priority: boolean }; index: number; slug: string; color: string }) {
  const [used, setUsed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("idea_states").select("used").eq("slug", slug).eq("idea_id", `nr-${index}`).single()
      .then(({ data }) => { if (data) setUsed(data.used); });
  }, [slug, index]);

  async function toggleUsed(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !used;
    setSaving(true);
    setUsed(next);
    const supabase = createClient();
    await supabase.from("idea_states").upsert(
      { slug, idea_id: `nr-${index}`, used: next },
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
