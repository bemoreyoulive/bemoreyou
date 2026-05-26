"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ALEX SHIELL DASHBOARD
// 18-year-old founder of Shiell Joinery. 13 sessions over 6 months.
// Mission: inspire the next generation to see the trades as a legitimate
// business opportunity. Not commercial — about changing hearts and minds.
// Platform: Instagram & TikTok (video-first). No LinkedIn.
// Blueprint call: 26 May 2026. Fill in Brand Assets, Goals etc. after Session 1.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

const AS_COLOR = "#d97706"; // Amber — trades energy, young, bold

const AS_NEXT_MOVE = "Your blueprint call is today — 26 May 2026. Come ready to talk about who you want to reach, what you want people to think differently about, and the stories you've never told publicly. Your school years, the two apprenticeships, the 30 rejected quotes — that's your material. We'll build the foundation from there.";

// ─── TODOS ───────────────────────────────────────────────────────────────────
// Updated after each session. Keep in sync with lib/todos.ts.

const AS_TODOS: { id: string; text: string; subtext?: string; owner: string }[] = [
  // Todos added after Session 1 (Blueprint Call — 26 May 2026)
];

// ─── SESSIONS ────────────────────────────────────────────────────────────────

const AS_SESSIONS: {
  number: number;
  date: string;
  title: string;
  summary: string;
  insights: string[];
  agreed: string[];
  nextSession: string;
}[] = [
  // Sessions added after each call.
];

// ─── POSITIONING ─────────────────────────────────────────────────────────────
// Filled in after Session 1.

const AS_POSITIONING = {
  headline: "",
  differentiators: [] as string[],
  audiences: [] as { label: string; detail: string }[],
};

// ─── CONTENT IDEAS ───────────────────────────────────────────────────────────

const AS_CONTENT: { hook: string; guidance: string; priority: boolean }[] = [];

// ─── RECOMMENDATIONS ─────────────────────────────────────────────────────────

const AS_RECS: { title: string; body: string }[] = [];

// ─── GOALS ───────────────────────────────────────────────────────────────────

const AS_GOALS = {
  short: [] as string[],
  long: [] as string[],
};

// ─────────────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "home", label: "Home" },
  { id: "sessions", label: "Sessions" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 6, padding: "56px 36px", textAlign: "center" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 12px" }}>{label}</p>
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Content coming after your next session with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>Check back here once Ben has updated your dashboard.</p>
    </div>
  );
}

export default function AlexShiellDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");

  const todoItems = AS_TODOS.map(t => ({ id: t.id, text: t.text, owner: "Alex" }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "0 32px", display: "flex", alignItems: "stretch", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 32, borderRight: "1px solid #E0DBD3", marginRight: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: AS_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>AS</div>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>Alex Shiell</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Shiell Joinery · Session 1 of 13</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto" }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", padding: "0 18px",
                fontSize: "0.8rem", fontWeight: 500,
                color: activeTab === tab.id ? AS_COLOR : "#7A746E",
                cursor: "pointer", border: "none", background: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${AS_COLOR}` : "2px solid transparent",
                whiteSpace: "nowrap", height: 52, transition: "color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 32px" }}>

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={AS_COLOR} />
            <NextMoveBox move={AS_NEXT_MOVE} accentColor={AS_COLOR} clientName="Alex Shiell" sessionLabel="Blueprint Call · 26 May 2026" animateIn />

            {/* Welcome card */}
            <div style={{ background: AS_COLOR, borderRadius: 8, padding: "28px 32px", marginBottom: 20, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>👋</div>
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Welcome, Alex.</p>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: 0 }}>
                  This is your personal brand dashboard — a working document that'll grow with you over the next 6 months and 13 sessions. It's not a polished deck. It's a strategy that lives and evolves. Everything in here is grounded in your own words, your own stories, and your own vision. After every session, Ben updates it and you'll find the latest thinking here.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions", value: "0 of 13", sub: "Blueprint call: 26 May 2026" },
                { label: "Programme length", value: "6 months", sub: "May — November 2026" },
                { label: "Platform", value: "Instagram & TikTok", sub: "Video-first content" },
                { label: "Content live", value: "Coming soon", sub: "First video after Session 1" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 20px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.02em", margin: "0 0 4px" }}>{s.value}</p>
                  <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* To-do list */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 16px" }}>Your To-Do List</p>
              {todoItems.length > 0 ? (
                <ClientTodoList items={todoItems} clientName="Alex Shiell" slug={slug} accentColor={AS_COLOR} onTabLink={setActiveTab} />
              ) : (
                <p style={{ fontSize: "0.88rem", color: "#B0A89E", margin: 0 }}>Your action items will appear here after your blueprint session with Ben.</p>
              )}
            </div>

            {/* What's in this dashboard / what this is */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {[
                    "Your positioning — who you're speaking to and what you stand for",
                    "Brand assets — your messaging, bio, and core narrative",
                    "Content ideas — video hooks, angles, and what to do with them",
                    "Ben's recommendations from each session",
                    "Your short and long-term goals",
                    "A session-by-session record of your journey",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What this is (and isn't)</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {[
                    "A working document — not a polished presentation",
                    "Everything grounded in your own words and stories",
                    "Something to review together, not handed over and filed",
                    "Not a script — it's scaffolding. You film in your own voice.",
                    "Living — it gets updated after every session",
                    "Built for a mission, not a marketing funnel",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why you're here */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 8, padding: "22px 26px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: AS_COLOR, margin: "0 0 10px" }}>Why you're here</p>
              <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>
                You're not building a personal brand to get more joinery enquiries. You're building it because you want to change the way a generation of young people think about the trades, about apprenticeships, about what's actually possible at 18. That's a bigger mission — and it's exactly the right reason to do this. The most credible personal brands come from people who genuinely mean it.
              </p>
            </div>

            <DashboardFooter clientName="Alex Shiell" tabName="Home" slug={slug} />
          </div>
        )}

        {/* ── SESSIONS ── */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Your Journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 36px" }}>A running record of what we've covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {AS_SESSIONS.length === 0 ? (
              <PlaceholderTab label="Sessions" />
            ) : (
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 19, top: 24, bottom: 24, width: 2, background: "#E0DBD3", zIndex: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {[...AS_SESSIONS].reverse().map((session, i) => (
                    <div key={session.number} style={{ display: "flex", gap: 28, position: "relative" }}>
                      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: i === 0 ? AS_COLOR : "#fff", border: `2px solid ${i === 0 ? AS_COLOR : "#E0DBD3"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: i === 0 ? "#fff" : "#7A746E", zIndex: 1 }}>
                        {session.number}
                      </div>
                      <div style={{ flex: 1, background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${AS_COLOR}` : "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                          <div>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Session {session.number} · {session.date}</p>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{session.title}</h3>
                          </div>
                          {i === 0 && (
                            <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: `${AS_COLOR}18`, color: AS_COLOR, border: `1px solid ${AS_COLOR}33` }}>Latest</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 20px" }}>{session.summary}</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                          <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "14px 16px" }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Key insights</p>
                            {session.insights.map((insight, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
                                <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{insight}</p>
                              </div>
                            ))}
                          </div>
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
            <CommentBox clientName="Alex Shiell" tabName="Sessions" slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={AS_COLOR} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            {AS_POSITIONING.headline ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Who You're For & How You're Different</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Brand Assets</h2>

                <div style={{ background: AS_COLOR, borderRadius: 6, padding: "28px 32px", marginBottom: 20 }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 10px" }}>Positioning Statement</p>
                  <p style={{ fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", color: "#fff", lineHeight: 1.6, margin: 0 }}>{AS_POSITIONING.headline}</p>
                </div>

                {AS_POSITIONING.differentiators.length > 0 && (
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>What makes you different</p>
                    {AS_POSITIONING.differentiators.map((d, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                        <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{d}</p>
                      </div>
                    ))}
                  </div>
                )}

                {AS_POSITIONING.audiences.length > 0 && (
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>Your audience</p>
                    {AS_POSITIONING.audiences.map((a, i) => (
                      <div key={i} style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: AS_COLOR, margin: "0 0 4px" }}>{a.label}</p>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : <PlaceholderTab label="Brand Assets" />}
            <CommentBox clientName="Alex Shiell" tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            {AS_CONTENT.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Content Strategy</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
                {AS_CONTENT.map((idea, i) => (
                  <div key={i} style={{ background: idea.priority ? "#fffbf2" : "#fff", border: "1px solid #E0DBD3", borderLeft: idea.priority ? `3px solid ${AS_COLOR}` : "1px solid #E0DBD3", borderRadius: 6, padding: "20px 24px", marginBottom: 12 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.5 }}>{idea.hook}</p>
                    {idea.guidance && <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{idea.guidance}</p>}
                  </div>
                ))}
              </div>
            ) : <PlaceholderTab label="Content Ideas" />}
            <CommentBox clientName="Alex Shiell" tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          <div>
            {AS_RECS.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>From Ben</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
                {AS_RECS.map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 12px" }}>{r.title}</p>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{r.body}</p>
                  </div>
                ))}
              </div>
            ) : <PlaceholderTab label="Ben's Recommendations" />}
            <CommentBox clientName="Alex Shiell" tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            {AS_GOALS.short.length > 0 || AS_GOALS.long.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Where We're Headed</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Goals</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 16px" }}>Short-term</p>
                    {AS_GOALS.short.map((g, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 16px" }}>Long-term</p>
                    {AS_GOALS.long.map((g, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : <PlaceholderTab label="Goals" />}
            <CommentBox clientName="Alex Shiell" tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}
