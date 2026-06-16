"use client";

// Neil Robbins Dashboard
// Founder & CEO, Silverbean (registered as N21). Global performance partnerships
// agency, ~75-80 people across Newcastle, Sydney and Chicago. 6-month engagement,
// 13 sessions. Blueprint (Session 1) done 16 June 2026. Session 2 (messaging &
// positioning) is 23 June 2026, 10am — access granted to Neil then.
// Voice rules: no em-dashes, no "quietly", no one or two word sentence fragments.
// Any message/comment FROM Ben is written personally, second person, like writing
// to a mate. NextMoveBox: 40-45 words MAX.

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
  sessionLabel: "Session 1 of 13 · June 2026",
  nextMove:
    "Welcome to your dashboard, Neil. Start in Brand Assets, those four content pillars are your north star. Our next session is the messaging and positioning one, Tuesday 23 June at 10am, where we turn your stories into how you actually sound.",
};

const PILLAR_COLORS = ["#2E6F5E", "#2d5a8e", "#b45309", "#7c3aed"];

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

// ─── CONTENT PILLARS ─────────────────────────────────────────────────────────
// Four pillars set after the blueprint call. North star, not a rulebook.
// Each has a full version (Brand Assets) and a short version (Content Ideas),
// plus the target audience it mainly serves.

const NR_PILLARS: { title: string; tag: string; body: string; short: string; audience: string }[] = [
  {
    title: "Straight talk on performance marketing",
    tag: "The Spike",
    body: "Your unfiltered, plain-English view of the industry, the things most agency CEOs will not say out loud. Not anger, just honesty and a sharper eye than the rest. This is your differentiator and the engine of your authority, the reason senior people stop scrolling. Think senior marketers misjudging affiliate, only pay when it works against rising Google and Meta costs, and making the pie bigger rather than fighting over slices.",
    short: "Your unfiltered, honest take on the industry. The contrarian edge that makes you worth listening to and sets you apart from the vanilla.",
    audience: "Senior marketing decision-makers, the CMOs and marketing leaders. Also reaches practitioners and industry peers.",
  },
  {
    title: "Built from scratch: 24 years of founder lessons",
    tag: "The Journey",
    body: "The story of building, nearly losing and growing a market-leading agency. Credibility through scars, not theory. The Ferrari boss who taught you who not to be, the performance-only deal you did not want that saved you through the 2008 crash, downsizing before Christmas then rebuilding. This is the pillar that earns trust from founders and the people who might one day buy or back you.",
    short: "The journey of building the agency over 24 years. The mistakes, the near-misses and the hard-won lessons.",
    audience: "Founders, agency owners and potential acquirers or investors. It also deepens your authority with marketing leaders.",
  },
  {
    title: "It's all about the people",
    tag: "The Operator",
    body: "The reality of leading 75 to 80 people across three continents. Hiring, culture and the calls that never make the highlight reel. People are 80% of your success and 80% of your failure, hiring Louise on attitude alone, leading through humour, and the values of fairness and enjoyment that sometimes cost you. This is the operator and the human behind the title.",
    short: "The day-to-day of running the business and leading people. Hiring, culture and the lessons that come with it.",
    audience: "Your team and future talent, fellow leaders and founders. It also reassures potential buyers.",
  },
  {
    title: "The man behind the agency",
    tag: "The Human",
    body: "You off the clock, the texture that makes the other three land. A London lad and a Man Utd fan since the age of six, coaching an U16 girls football team, the golf convert, and what happy and freedom actually mean to you. People follow people, so this is the trust-builder that stops you reading as a faceless CEO.",
    short: "You off the clock. Football, family, golf and what really matters to you. The human glue that ties it all together.",
    audience: "Everyone. This is the connective tissue across all your audiences.",
  },
];

// ─── TODO LIST ───────────────────────────────────────────────────────────────
// Empty until after Session 2 (messaging & positioning). First todos will be:
// finalise LinkedIn headline + About, write first post. Keep in sync with lib/todos.ts.

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [];

// ─── POSITIONING ─────────────────────────────────────────────────────────────
// Filled in at Session 2. Pillars (above) render regardless; this is the
// statement, differentiators and audiences, locked on 23 June.

const POSITIONING: {
  headline: string;
  differentiators: string[];
  audiences: { label: string; detail: string }[];
} = {
  headline: "",
  differentiators: [],
  audiences: [],
};

const HEADLINES: { label: string; text: string; note: string }[] = [];
const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [];
const MESSAGING: { title: string; body: string }[] = [];
const RECOMMENDATIONS: { title: string; body: string }[] = [];
const CONTENT_IDEAS: { hook: string; guidance: string; priority: boolean }[] = [];

// ─── SESSIONS ────────────────────────────────────────────────────────────────

const SESSIONS: {
  number: number;
  date: string;
  title: string;
  summary: string;
  insights: string[];
  agreed: string[];
  nextSession: string;
}[] = [
  {
    number: 1,
    date: "16 June 2026",
    title: "Blueprint call. Getting under the skin of who you are.",
    summary:
      "Our 90 minute blueprint, and a brilliant first session. We went deep on your story, from a London copper's son who moved north for a Geordie wife, to building a market-leading performance partnerships agency over 24 years. The stories that become content came thick and fast: the wild boss and the Ferrari moment that pushed you to start your own thing at 25, the performance-only deal in Gibraltar that ended up saving the company through the 2008 crash, and hiring Louise from a barbecue with the line 'do you know how to use Google'. We landed your three values, progression, fairness and enjoyment, and the belief that runs through everything, that people are 80% of your success and 80% of your failure. The big realisation: you are not an angry contrarian, but you hold a lot of genuinely contrarian views about the industry, and that is exactly what we build the brand on. Your audience is the senior marketing decision-maker, so the language has to be plain and commercial, not affiliate jargon. Next week we turn all of this into your messaging and positioning.",
    insights: [
      "You are not angry, but you are full of contrarian views. That edge is the most brandable thing you have.",
      "Your authority comes from 24 years of scars, not theory. Lead with the stories only you can tell.",
      "Your audience is the senior marketing leader, not the affiliate manager. The language has to change to match.",
      "You are comfortable posting. The only real barrier is sitting down and doing it consistently.",
    ],
    agreed: [
      "Ben to draft your content pillars, positioning, headline and About section for Session 2.",
      "You to start capturing 'hand grenade' moments and insights as voice notes, and WhatsApp them to Ben.",
      "Be more conscious of the conversations where you are making a difference.",
      "Next session booked, Tuesday 23 June at 10am, messaging and positioning.",
    ],
    nextSession: "Session 2 · Tuesday 23 June 2026, 10am — messaging & positioning",
  },
];

// ─── GOALS ───────────────────────────────────────────────────────────────────

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
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Coming after your next session with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>We lock this in at the messaging session on 23 June.</p>
    </div>
  );
}

// Pillar card, used in both Brand Assets (full) and Content Ideas (short).
function PillarCard({ pillar, index, mode }: { pillar: typeof NR_PILLARS[number]; index: number; mode: "full" | "short" }) {
  const pc = PILLAR_COLORS[index % PILLAR_COLORS.length];
  return (
    <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${pc}`, borderRadius: 6, padding: "20px 20px 20px", display: "flex", flexDirection: "column" }}>
      <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pc, margin: "0 0 8px" }}>Pillar {index + 1} · {pillar.tag}</p>
      <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.3 }}>{pillar.title}</p>
      <p style={{ fontSize: "0.83rem", color: "#3D3935", lineHeight: 1.55, margin: "0 0 14px", flex: 1 }}>{mode === "full" ? pillar.body : pillar.short}</p>
      <div style={{ background: `${pc}12`, border: `1px solid ${pc}33`, borderRadius: 5, padding: "10px 12px" }}>
        <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: pc, margin: "0 0 4px" }}>Who this is for</p>
        <p style={{ fontSize: "0.78rem", color: "#3D3935", lineHeight: 1.45, margin: 0 }}>{pillar.audience}</p>
      </div>
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

            {/* A note from Ben — personal */}
            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 8, padding: "22px 26px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 12px" }}>A note from Ben</p>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>
                Right then Neil, welcome to your dashboard. This is home base for the next six months, and it grows with you after every session. Everything in here comes from your own words on our calls, so treat it as a working document, not a polished deck. Start in Brand Assets and have a proper look at the four content pillars I have pulled out for you. They are your north star, the territories we want you known for. Our next session is the messaging and positioning one, where we turn all those stories into how you actually sound. If anything in here does not feel like you, tell me. That is the whole point.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "1 of 13", sub: "Next: Tue 23 June, 10am" },
                { label: "Content pillars", value: "4 set", sub: "See Brand Assets" },
                { label: "Headline", value: "Session 2", sub: "Being written with Ben" },
                { label: "About section", value: "Session 2", sub: "Being written with Ben" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 20px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.02em", margin: "0 0 4px" }}>{s.value}</p>
                  <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Your starting line — baseline to reflect against */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color, margin: "0 0 6px" }}>Your starting line · June 2026</p>
              <p style={{ fontSize: "0.86rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 18px" }}>A snapshot of where you are today, Neil, so we can look back in three and six months and see how far you have come.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#F9F8F6", borderRadius: 6, padding: "16px 18px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Where you are now</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                    {["Posting on LinkedIn: not at all, zero posts so far", "On LinkedIn every day, but only reading", "Comfortable to post, no real topics off-limits", "The only barrier is sitting down and doing it consistently"].map((item, i) => (
                      <li key={i} style={{ fontSize: "0.83rem", color: "#3D3935", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, color: color }}>–</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "#F9F8F6", borderRadius: 6, padding: "16px 18px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>What we are aiming for</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                    {["Show up consistently with a clear point of view, two hours a week", "Be seen by senior marketing leaders as someone worth listening to", "A measurable sales benefit for Silverbean within 12 months"].map((item, i) => (
                      <li key={i} style={{ fontSize: "0.83rem", color: "#3D3935", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, color: color }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "0.76rem", color: "#7A746E", margin: "12px 0 0" }}>Full list in the Goals tab.</p>
                </div>
              </div>
            </div>

            {/* To-Do list */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 16px" }}>Your To-Do List</p>
              {todoItems.length > 0 ? (
                <ClientTodoList items={todoItems} clientName={name} slug={slug} accentColor={color} onTabLink={setActiveTab} />
              ) : (
                <p style={{ fontSize: "0.86rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>Your first to-dos land after our next session on Tuesday 23 June. For now, have a read through your pillars in Brand Assets and your goals. Nothing else to do yet.</p>
              )}
            </div>

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["Your four content pillars, the territories we want you known for", "Positioning, headline and About section, finalised in Session 2", "Content ideas with direction, added as we go", "Milestone tracker, your 6-month journey", "Ben's recommendations after each session", "Your goals, short and long term"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What this is (and isn't)</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["A working document, not a polished presentation", "Everything grounded in your own words and stories", "Something we review together, not handed over and filed", "Not a script. It is scaffolding. You write in your own voice.", "Living. It gets updated after every session."].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 4px" }}>Your Brand Foundation</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Brand Assets</h2>

            {/* North-star blurb */}
            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 6, padding: "18px 22px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>Your content pillars · your north star</p>
              <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>These aren't set in stone, Neil. They are general guidance, the north star for your content, not a rulebook. Not every post has to sit inside one, and the best ones often blend two. They are here to keep your voice coherent, so everything you put out adds up to a single, recognisable point of view over time.</p>
            </div>

            {/* Pillars — full version */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 28 }}>
              {NR_PILLARS.map((p, i) => (
                <PillarCard key={i} pillar={p} index={i} mode="full" />
              ))}
            </div>

            {/* Positioning — locked Session 2 */}
            {POSITIONING.headline ? (
              <div>
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
            ) : (
              <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 6, padding: "28px 32px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 8px" }}>Coming next: positioning, headline & About</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Your positioning statement, LinkedIn headline and About section get locked in at our messaging session on Tuesday 23 June. They will land here, and in the Headlines and About tabs, straight after.</p>
              </div>
            )}
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
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Content Strategy</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Content Ideas</h2>

            {/* North-star blurb — set the scene */}
            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 6, padding: "18px 22px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>Start here · your content pillars</p>
              <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>A quick reminder before the ideas land, Neil. These four pillars are your north star, not set in stone. When you are not sure what to post, come back to this page, pick a pillar, and start from there. The full breakdown of each one lives in Brand Assets.</p>
            </div>

            {/* Pillars — short version */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 28 }}>
              {NR_PILLARS.map((p, i) => (
                <PillarCard key={i} pillar={p} index={i} mode="short" />
              ))}
            </div>

            {CONTENT_IDEAS.length > 0 ? (
              CONTENT_IDEAS.map((idea, i) => (
                <NeilIdeaCard key={i} idea={idea} index={i} slug={slug} color={color} />
              ))
            ) : (
              <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 6, padding: "28px 32px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 8px" }}>Post ideas coming soon</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Specific post ideas, hooks and angles get added here as we go, starting after your messaging session. For now, the pillars above set the direction.</p>
              </div>
            )}
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
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 36px" }}>A running record of what we have covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {SESSIONS.length === 0 ? (
              <PlaceholderTab label="Sessions" color={color} />
            ) : (
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 19, top: 24, bottom: 24, width: 2, background: "#E0DBD3", zIndex: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {[...SESSIONS].reverse().map((session, i) => (
                    <div key={session.number} style={{ display: "flex", gap: 28, position: "relative" }}>
                      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: i === 0 ? color : "#fff", border: `2px solid ${i === 0 ? color : "#E0DBD3"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: i === 0 ? "#fff" : "#7A746E", zIndex: 1 }}>
                        {session.number}
                      </div>
                      <div style={{ flex: 1, background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${color}` : "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                          <div>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Session {session.number} · {session.date}</p>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{session.title}</h3>
                          </div>
                          {i === 0 && (
                            <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}33` }}>Latest</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 20px" }}>{session.summary}</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                          <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "14px 16px" }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Key insights</p>
                            {session.insights.map((insight, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
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
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Pulled from our discovery call and the blueprint. We will keep sharpening these as we go.</p>

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
