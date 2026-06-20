"use client";

// Neil Robbins Dashboard
// Founder & CEO, Silverbean (registered as N21). Global performance partnerships
// agency, ~75-80 people across Newcastle, Sydney and Chicago. 6-month engagement,
// 13 sessions. Blueprint (Session 1) done 16 June 2026. Session 2 (messaging &
// positioning) is 23 June 2026, 10am — access granted to Neil then.
// Voice rules: no em-dashes, no "quietly", no one or two word sentence fragments.
// Messages from Ben: personal, second person, warm and direct. CEO-level humour
// is welcome; he runs his business on it. NextMoveBox: 40-45 words MAX.

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
  color: "#2E6F5E",
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
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

const NR_PILLARS: { title: string; tag: string; body: string; short: string; audience: string }[] = [
  {
    title: "Calling a spade a spade on performance marketing",
    tag: "The Hand Grenade",
    body: "Your unfiltered, plain-English view of the industry, the things most agency CEOs will not say out loud. You are full of genuinely valuable contrarian views on performance marketing, and that is the engine of your authority, the reason senior people stop scrolling. Not anger, just honesty and a sharper eye than the rest. Think senior marketers leaving 15 to 20% of ecommerce revenue on the table because they misjudge affiliate, only pay when it works against rising Google and Meta costs, and why the industry keeps grabbing slices instead of making the pie much bigger.",
    short: "Your unfiltered take on the industry. You have valuable contrarian views and you are not afraid to say them. That edge is what makes you worth listening to.",
    audience: "Senior marketing decision-makers, the CMOs and marketing leaders. Also reaches practitioners and industry peers.",
  },
  {
    title: "24 years of graft",
    tag: "The Graft",
    body: "Twenty-four years of building, nearly losing and growing a market-leading agency from scratch. Not theory. Scars. The Ferrari boss who showed you exactly who not to be. The performance-only deal in Gibraltar that you hated but that kept the lights on through the 2008 crash. Downsizing before Christmas, then rebuilding. When you told a room of agency owners you had been at it for 24 years, most of them looked like you had just told them you climbed Everest in your lunch break. This is the pillar that earns trust from founders, fellow leaders and the people who might one day back you.",
    short: "The story of building the agency over 24 years. The mistakes, the near-misses, the hard-won lessons and the scars that come with graft.",
    audience: "Founders, agency owners and potential acquirers or investors. It also deepens your authority with marketing leaders.",
  },
  {
    title: "People, people, people",
    tag: "The Gaffer",
    body: "The reality of leading 75 to 80 people across three continents, and everything that comes with it. People are 80% of your success and 80% of your failure, and you have lived that truth in every direction. Hiring Louise from a barbecue on nothing more than attitude, 23 years later she is your Global Services Director with shares in the business. Leading through humour. Fairness and enjoyment as values that sometimes cost you. The calls that never make the highlight reel. This is the operator and the human behind the title.",
    short: "The day-to-day of leading people. Hiring, culture and the calls that never make the highlight reel. The real stuff, not the managed version.",
    audience: "Your team and future talent, fellow leaders and founders. It also reassures potential buyers.",
  },
  {
    title: "Neil: the man, the myth, the legend",
    tag: "Off the Clock",
    body: "You off the clock, the texture that makes the other three land. A London lad, a copper's son, a Man Utd fan since the age of six. Coaching an U16 girls football team. The golf convert who got the bug and now plays three times a week. Three kids, a Geordie wife and a very clear sense of what freedom actually means to you. People follow people, not agencies. This is the connective tissue that stops you reading as a faceless CEO and makes everything else you put out feel human.",
    short: "You off the clock. Football, family, golf and what actually matters to you. The human glue that ties it all together.",
    audience: "Everyone. This is the connective tissue across all your audiences.",
  },
];

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [];

const POSITIONING: {
  headline: string;
  differentiators: string[];
  audiences: { label: string; detail: string }[];
} = {
  headline: "",
  differentiators: [],
  audiences: [],
};

// Headlines: 5 options, max 220 characters. Scale 1 (ballsy) to 5 (beige) so
// Neil can judge appetite in Session 2. Drafts, not final.
const HEADLINES: { label: string; text: string; scale: number; note: string }[] = [
  {
    label: "Option 1",
    scale: 1,
    text: "Founder & CEO, Silverbean | Most senior marketers misjudge affiliate, and it costs them 15-20% of revenue | I say the things other agency CEOs won't | Performance partnerships in plain English",
    note: "The full hand grenade. Leads with the number and the contrarian promise. Stands out a mile, and sets the expectation that you will be straight with people.",
  },
  {
    label: "Option 2",
    scale: 2,
    text: "CEO, Silverbean | 24 years on the channel most marketers ignore, the one where you only pay when it works | Performance partnerships for DTC and ecommerce brands | Plain English, no jargon",
    note: "Confident and commercial without picking a fight. The 'only pay when it works' line does the selling, the longevity does the credibility.",
  },
  {
    label: "Option 3",
    scale: 3,
    text: "Founder & CEO at Silverbean | Helping DTC and ecommerce brands grow revenue through performance partnerships | 24 years in, still saying what most agency CEOs won't",
    note: "The balanced middle. Clear on what you do and who for, with one line of edge at the end. A safe pick that still has a pulse.",
  },
  {
    label: "Option 4",
    scale: 4,
    text: "Founder & CEO, Silverbean | Performance partnerships agency helping DTC and ecommerce brands grow revenue | 24 years building one of the UK's leading affiliate agencies",
    note: "Credible and straight down the line. Reads well to a buyer who wants reassurance, but it does not turn many heads.",
  },
  {
    label: "Option 5",
    scale: 5,
    text: "Founder & CEO @ Silverbean | Global Performance Partnerships Agency | Helping DTC Brands Grow Revenue Across 40+ Countries | Back-to-Back Global Agency of the Year",
    note: "Close to what you have now, the beige benchmark. Nothing wrong with it, but it sounds like the agency talking, not you. Here so you can feel the difference.",
  },
];

// Two About drafts: one short (~1250 chars), one long (~2000 chars). Both first
// person, commercial, personal, with a wry smile. Drafts to review in Session 2.
const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [
  {
    label: "Option A · the short one (~1,250 characters)",
    text: `I have been running an affiliate agency for 24 years, which in agency terms is roughly 9 lifetimes.

I started Silverbean in 2002 selling performance marketing to bookmakers, back when most marketers thought affiliate was the slightly dodgy corner of the internet you did not bring up at dinner.

A lot has changed. Performance partnerships now drive 15 to 20% of revenue for serious ecommerce brands. HelloFresh, John Lewis, New Balance and Under Armour all trust us with theirs.

Here is the bit that still surprises people. Most senior marketers underrate it. They keep feeding Google and Meta as costs climb, while the one channel where you only pay when it actually works sits in the corner, underused.

That is the thing I will keep banging on about here.

24 years in, I have hired a director I met at a barbecue, survived a crash that wiped out our client base in 3 weeks, and learned the hard way that people are 80% of your success and 80% of your failure.

I am here to share what I have picked up, and to say a few things most agency CEOs would rather I did not.

Father of 3. Man Utd since I was 6. Still convinced this is our year.`,
    note: "Punchy, scannable, ends on a smile. Strong default if you want something people actually read to the bottom of.",
  },
  {
    label: "Option B · the long one (~2,000 characters)",
    text: `I have been running a performance marketing agency for 24 years. In agency years that is roughly 9 lifetimes and at least 4 industry name changes.

I started Silverbean in 2002, selling affiliate marketing to bookmakers, back when most marketers thought affiliate was the slightly dodgy corner of the internet you did not mention at dinner.

The reason I started it at all was a boss. At 25 I worked for a man who came in one morning, told us he had been test driving Ferraris, and said if we all worked a bit harder he would buy one with cash. He was not joking. That night I wrote 'business plan' on a notepad. Best terrible boss I ever had.

A year into Silverbean I pitched a betting client in Gibraltar. He stopped me mid flow and asked if the agency was just me. It was. He offered me a performance only deal, no fee, which I did not want. That deal kept the company alive when the 2008 crash wiped out nearly all our betting clients in 3 weeks. The thing I did not want saved the thing I had built.

Two decades on, performance partnerships drive 15 to 20% of revenue for serious ecommerce brands. We look after it for HelloFresh, John Lewis, New Balance and Under Armour.

And yet most senior marketers still misjudge the channel. They keep feeding Google and Meta as costs rise, while the one place you only pay when it works sits underused in the corner. That is the conversation I want to have here, in plain English, minus the jargon.

A few things I believe after 24 years. People are 80% of your success and 80% of your failure. I once hired someone at a barbecue who knew nothing about marketing, and she is now our Global Services Director. Fairness costs you sometimes, and it is still worth it. And you should enjoy the thing you spend most of your life doing.

Father of 3. Coach of an under 16 girls football team. Man Utd since I was 6, which has taught me more about suffering than business ever could.

If you work in or around ecommerce, stick around. I will share what 24 years has taught me, and say a few things most agency CEOs would rather I did not.`,
    note: "More room for the stories that make you you. Better if you want the profile to do the storytelling before you have posted much.",
  },
];

const MESSAGING: { title: string; body: string }[] = [];

const RECOMMENDATIONS: { title: string; body: string }[] = [
  {
    title: "This process is going to do more for you than you think",
    body: "You said you don't quite know what you want to build after Silverbean, and that is completely fine. But here is what I have seen again and again: the process of building your personal brand, of articulating your stories, your values and your point of view, has a funny way of bringing that into focus. Think of it as therapy without the awkward silences. You will come out of this six months with far more clarity about the next chapter than you went in with. For a lot of people at your stage, that turns out to be the main benefit.",
  },
  {
    title: "Watch the jargon, even with the suits",
    body: "Your audience is senior marketing decision-makers, the CMOs and brand leaders at ecommerce businesses. But here is the thing: many of them checked out of affiliate when it had a dodgy reputation, and words like 'channel', 'incrementality' and 'publisher mix' mean something very different depending on who you are talking to. Write for someone who is smart and commercially sharp but not steeped in your world. Plain English is not dumbing it down. It is how you earn the attention of people who have been burned by jargon before and have learned to ignore it.",
  },
  {
    title: "Capture the hand grenade moments. Every single one.",
    body: "Your best content is going to come from things that happen in the meeting room, on a client call, at a conference. The moment where you say something and the room goes quiet. The stat that stops a CMO in their tracks. The reframe that saves a client account. Those moments happen every week and they disappear unless you capture them. Voice note it immediately, then WhatsApp it to me. Thirty seconds is enough. You already named them yourself. Those are the posts that build reputations.",
  },
  {
    title: "Your contrarian views are a competitive advantage, not a liability",
    body: "You are full of genuinely valuable contrarian views on this industry, and that is the most brandable thing about you. Most agency CEOs play it safe, smile at conferences and say nothing interesting. You see things clearly, call them plainly, and you are willing to say the thing most people only think. That is rare at your level, and we are going to use it carefully and diplomatically, because the blue-chip clients are watching, but we are absolutely going to use it. In this industry, vanilla is the enemy, and you are already the opposite.",
  },
  {
    title: "The danger zone: month two and three",
    body: "I will always be straight with you about this one. The most common reason founders stop posting is not lack of ideas or time. It is posting for six or eight weeks, getting decent engagement, then hitting a quieter fortnight and thinking 'what is the point.' LinkedIn rewards consistency over months, not sprints. The algorithm is basically Ferguson: put the work in during pre-season and the results show up later. Month two and three is the danger zone, when the novelty has worn off and the traction has not fully arrived yet. If you are ever tempted to go quiet, message me first. That is exactly what I am here for.",
  },
];

// 5 starter content ideas. Each has two hook options (A and B), short guidance
// on how to write it, rhetorical questions that make the reader think "yep,
// that's me", and who it is aimed at.
const CONTENT_IDEAS: {
  pillar: string;
  hookA: string;
  hookB: string;
  guidance: string;
  questions: string[];
  audience: string;
}[] = [
  {
    pillar: "Pillar 1 · The Hand Grenade",
    hookA: "Most CMOs are leaving 15 to 20% of their revenue on the table. And they have no idea.",
    hookB: "There is a channel that only charges you when it works. Most senior marketers still ignore it.",
    guidance:
      "Your flagship contrarian take, and a strong first post. Open with the number, it stops the scroll. Then explain, calmly, why senior marketers underrate affiliate. No 'incrementality' or 'publisher mix', you are talking to a smart CMO who has been burned by jargon. End on a thought, not a pitch. Confident, never cross.",
    questions: [
      "When did you last properly interrogate where your performance budget actually goes?",
      "If a channel only charged you when it delivered, why would you not look harder at it?",
    ],
    audience: "Senior marketing decision-makers (CMOs and brand leaders).",
  },
  {
    pillar: "Pillar 2 · The Graft",
    hookA: "The worst boss I ever had bought a Ferrari with money he did not have. He taught me everything.",
    hookB: "At 25, my boss said he would buy a Ferrari with cash if we worked harder. That night I quit in my head.",
    guidance:
      "A story post, and people love a villain. Tell it like you would in the pub: the fantasy forecasts, the Ferrari, the moment you wrote 'business plan' on a notepad. Then land one lesson about leadership or over-promising. Do not over-explain the moral, let the story carry it. This builds the founder credibility that matters to peers and future backers.",
    questions: [
      "Have you ever worked for someone who taught you exactly who you did not want to become?",
    ],
    audience: "Founders, agency owners and peers.",
  },
  {
    pillar: "Pillar 3 · The Gaffer",
    hookA: "I hired our Global Services Director at a barbecue. She knew nothing about marketing.",
    hookB: "The best hire I ever made could not use Google when I met her. 23 years later she has shares in the business.",
    guidance:
      "A people-first story with a warm payoff. Set the scene, the barbecue, the daft interview question, then the 23 year arc. The point underneath: hire for attitude and potential, not the CV. Keep it humble and human. This is the pillar that shows the operator behind the title, and it reassures anyone weighing up how you lead.",
    questions: [
      "How many brilliant people have you walked past because their CV did not tick the box?",
    ],
    audience: "Your team, future talent and fellow leaders.",
  },
  {
    pillar: "Pillar 1 · The Hand Grenade",
    hookA: "Everyone in affiliate says we are all friends. We are not.",
    hookB: "At industry events we shake hands and smile. Then we go back and compete like our lives depend on it.",
    guidance:
      "A spicier grenade, so handle with a bit of care, clients are watching. The honesty is the value, not the aggression. Compare it to footballers at an awards do: handshakes off the pitch, ruthless on it. Make the point about why the industry fails to sell its own value upward to leaders. Confident opinion, never a rant. This is the post people remember you for.",
    questions: [
      "How many industries smile in public and knife each other in private?",
    ],
    audience: "Industry peers and senior marketers.",
  },
  {
    pillar: "Pillar 4 · Off the Clock",
    hookA: "I coach an under 16 girls football team. It has taught me more about motivation than 24 years in business.",
    hookB: "Man Utd have taught me more about suffering than running a company ever has.",
    guidance:
      "A personal post to balance the sharper ones. Pick one thread, the coaching or the football, and tie it to something real about leadership, resilience or simply enjoying the thing you do. People follow people, so let your character show. Light, warm, a wry smile. Do not shoehorn a business lesson in if it does not fit. This is the glue that makes the other posts land.",
    questions: [
      "What did your hobby teach you that your job never could?",
    ],
    audience: "Everyone. The connective tissue across all your audiences.",
  },
];

// Homepage "who you're for / not for", 4 bullets each.
const WHO_FOR = [
  "Senior marketing leaders at DTC and ecommerce brands who suspect they are underusing performance partnerships",
  "Founders and agency owners who want the honest version of building a business, scars and all",
  "Marketers who are tired of the jargon and want the channel explained in plain English",
];
const WHO_NOT_FOR = [
  "Affiliate and digital managers after tactical, in-the-weeds how-tos. You write for the people they answer to",
  "Anyone who wrote affiliate off 15 years ago and is not open to a rethink",
  "Anyone here for rage-bait and pile-ons. Your strong opinions come without the anger",
];

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
      "Our 90 minute blueprint, and a brilliant first session. We went deep on your story, from a London copper's son who moved north for a Geordie wife, to building a market-leading performance partnerships agency over 24 years. The stories that become content came thick and fast: the wild boss and the Ferrari moment that pushed you to start your own thing at 25, the performance-only deal in Gibraltar that ended up saving the company through the 2008 crash, and hiring Louise from a barbecue with the line 'do you know how to use Google'. We landed your three values, progression, fairness and enjoyment, and the belief that runs through everything, that people are 80% of your success and 80% of your failure. The big realisation: you are not an angry contrarian, but you hold a lot of genuinely valuable contrarian views about this industry, and that is exactly what we build the brand on. Your audience is the senior marketing decision-maker, so the language has to be plain and commercial, not affiliate jargon. Next week we turn all of this into your messaging and positioning.",
    insights: [
      "You are full of genuinely valuable contrarian views. Not anger, just clarity. That edge is the most brandable thing you have.",
      "Your authority comes from 24 years of scars, not theory. Lead with the stories only you can tell.",
      "Your audience is the senior marketing leader, not the affiliate manager. The language has to match.",
      "You are comfortable posting, no real topics off-limits. The main risk is not starting, it is going quiet in month two or three when the traction is still building. That is the danger zone and we are going to watch it together.",
    ],
    agreed: [
      "Ben to draft your content pillars, positioning, headline and About section for Session 2.",
      "You to start capturing hand grenade moments and insights as voice notes, and WhatsApp them to Ben.",
      "Be more conscious of the conversations where you are making a difference.",
      "Next session booked, Tuesday 23 June at 10am, messaging and positioning.",
    ],
    nextSession: "Session 2 · Tuesday 23 June 2026, 10am — messaging & positioning",
  },
];

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

const STARTING_LINE = {
  now: [
    "Posting on LinkedIn: not at all, zero posts so far",
    "On LinkedIn every day, but only reading",
    "Comfortable to post, no real topics off-limits",
    "The only barrier is sitting down and doing it consistently",
  ],
  aim: [
    "Show up consistently with a clear point of view, two hours a week",
    "Be seen by senior marketing leaders as someone worth listening to",
    "A measurable sales benefit for Silverbean within 12 months",
  ],
};

function PlaceholderTab({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "48px 36px", textAlign: "center" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 12px" }}>{label}</p>
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Coming after your next session with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>We lock this in at the messaging session on 23 June.</p>
    </div>
  );
}

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

            {/* A note from Ben */}
            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 8, padding: "22px 26px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 12px" }}>A note from Ben</p>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>
                Welcome to your dashboard, Neil. This is home base for the next six months, and it gets richer after every session. Twenty-four years running Silverbean and you have never really told your story publicly, so this is where that changes. Everything in here comes from your own words on our calls, so treat it as a working document, not a polished deck. Start in Brand Assets and have a read through your content pillars, they are your north star. Anything that does not feel like you, tell me. And remember, every hand grenade moment between now and 23 June, voice note it immediately. Those are your first posts.
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

            {/* To-Do list */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 16px" }}>Your To-Do List</p>
              {todoItems.length > 0 ? (
                <ClientTodoList items={todoItems} clientName={name} slug={slug} accentColor={color} onTabLink={setActiveTab} />
              ) : (
                <p style={{ fontSize: "0.86rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>Your first to-dos land after our next session on Tuesday 23 June. Until then, have a read through your pillars in Brand Assets and check out your goals. Literally nothing else to do. For once.</p>
              )}
            </div>

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {[
                    "Your four content pillars, the territories we want you known for",
                    "Positioning, headline and About section, all in Brand Assets",
                    "Content ideas with direction, added as we go",
                    "Milestone tracker, your 6-month journey",
                    "Ben's recommendations from every session",
                    "Your goals, short and long term",
                    "A record of every session, and where you started",
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
                    "A working document, not a polished presentation",
                    "Everything grounded in your own words and stories",
                    "Something we review together, not handed over and filed",
                    "Not a script. It is scaffolding. You write in your own voice.",
                    "Living. It gets updated after every session.",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Who you're for / not for */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${color}`, borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color, margin: "0 0 12px" }}>Who you're for</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, margin: 0, padding: 0 }}>
                  {WHO_FOR.map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#3D3935", paddingLeft: 18, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color, fontWeight: 700 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: "4px solid #B0A89E", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8A837B", margin: "0 0 12px" }}>Who you're not for</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, margin: 0, padding: 0 }}>
                  {WHO_NOT_FOR.map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#3D3935", paddingLeft: 18, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#B0A89E", fontWeight: 700 }}>✕</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DashboardFooter clientName={name} tabName="Home" slug={slug} />
          </div>
        )}

        {/* ── SESSIONS ── */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 6px" }}>Your Journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>A running record of what we have covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {/* Your starting line */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 36 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color, margin: "0 0 6px" }}>Your starting line · June 2026</p>
              <p style={{ fontSize: "0.86rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 18px" }}>A snapshot of where you are today, Neil, so we can look back in three and six months and see how far you have come.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#F9F8F6", borderRadius: 6, padding: "16px 18px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Where you are now</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                    {STARTING_LINE.now.map((item, i) => (
                      <li key={i} style={{ fontSize: "0.83rem", color: "#3D3935", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, color: color }}>–</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "#F9F8F6", borderRadius: 6, padding: "16px 18px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>What we are aiming for</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                    {STARTING_LINE.aim.map((item, i) => (
                      <li key={i} style={{ fontSize: "0.83rem", color: "#3D3935", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, color: color }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: "0.76rem", color: "#7A746E", margin: "12px 0 0" }}>Full list in the Goals tab.</p>
                </div>
              </div>
            </div>

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

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={color} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, margin: "0 0 4px" }}>Your Brand Foundation</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Brand Assets</h2>

            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 6, padding: "18px 22px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>Your content pillars · your north star</p>
              <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>These aren't set in stone, Neil. They are general guidance, the north star for your content, not a rulebook. Not every post has to sit inside one, and the best ones often blend two. They are here to keep your voice coherent, so everything you put out adds up to a single, recognisable point of view over time.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 28 }}>
              {NR_PILLARS.map((p, i) => (
                <PillarCard key={i} pillar={p} index={i} mode="full" />
              ))}
            </div>

            {/* Core positioning statement — locked Session 2 */}
            {POSITIONING.headline ? (
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 32 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 10px" }}>Core positioning statement</p>
                <p style={{ fontSize: "1.1rem", fontFamily: "var(--font-dm-serif), serif", color: "#1C1C1C", lineHeight: 1.6, margin: 0 }}>{POSITIONING.headline}</p>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 6, padding: "22px 26px", marginBottom: 32 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 8px" }}>One thing still to come: your positioning statement</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>We lock your single positioning line in together on Tuesday 23 June, once you have read the headline and About drafts below. That one stays blank on purpose, it is the one thing I do not want to write at you.</p>
              </div>
            )}

            {/* LinkedIn About drafts */}
            {ABOUT_VERSIONS.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>LinkedIn About section · 2 drafts</p>
                <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>Two directions to react to, Neil, not finished articles. Read them out loud. The one that sounds like you talking is the one we build from on the 23rd.</p>
                {ABOUT_VERSIONS.map((v, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 14 }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: "0 0 12px" }}>{v.label}</p>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{v.text}</p>
                    <p style={{ fontSize: "0.78rem", color: "#7A746E", borderTop: "1px solid #E0DBD3", paddingTop: 12, margin: 0 }}>{v.note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* LinkedIn headline options with ballsy-to-beige meter */}
            {HEADLINES.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>LinkedIn headline · 5 options</p>
                <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>All under LinkedIn's 220 character limit. The meter runs from ballsy to beige, so you can pick how much edge you are in the mood for. We choose one together on the 23rd.</p>
                {HEADLINES.map((h, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "20px 24px", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: 0 }}>{h.label} · {h.text.length} characters</p>
                      <BallsyMeter scale={h.scale} color={color} />
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.5, margin: "0 0 12px" }}>{h.text}</p>
                    <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>{h.note}</p>
                  </div>
                ))}
              </div>
            )}

            <CommentBox clientName={name} tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>Content Strategy</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Content Ideas</h2>

            <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 6, padding: "18px 22px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>Start here · your content pillars</p>
              <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>A quick reminder before the ideas land, Neil. These four pillars are your north star, not set in stone. When you are not sure what to post, come back to this page, pick a pillar, and start from there. The full breakdown of each one lives in Brand Assets.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 28 }}>
              {NR_PILLARS.map((p, i) => (
                <PillarCard key={i} pillar={p} index={i} mode="short" />
              ))}
            </div>

            {CONTENT_IDEAS.length > 0 && (
              <>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "20px 24px", marginBottom: 20 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 8px" }}>5 posts to get you off the mark</p>
                  <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 10px" }}>Each one gives you two hook options, A and B, so you pick the opener that feels most like you. Then a few words on how to write it and who it is for. I have also dropped in a rhetorical question or two per post, the kind that make the right reader think "yep, that is me". Use one to open or close if it fits.</p>
                  <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}><strong>On a CTA:</strong> you are right, you do not need one. You are the CEO, not a course seller, and "book a call" at the bottom would cheapen it. Let the rhetorical question do the work and let people come to you. The only soft ask worth making now and then is an invitation to share their own take in the comments, because that feeds reach without ever looking like selling.</p>
                </div>
                {CONTENT_IDEAS.map((idea, i) => (
                  <NeilIdeaCard key={i} idea={idea} index={i} slug={slug} color={color} />
                ))}
              </>
            )}
            <CommentBox clientName={name} tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color, marginBottom: 8 }}>From Ben</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Things I wanted to say to you after our blueprint call that did not fit neatly anywhere else. Read these, and if any of them do not land, tell me.</p>

            {RECOMMENDATIONS.map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 12px" }}>{r.title}</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>{r.body}</p>
              </div>
            ))}
            <CommentBox clientName={name} tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
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
            <CommentBox clientName={name} tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}

// Ballsy-to-beige meter for headline options. scale 1 (ballsy) to 5 (beige).
function BallsyMeter({ scale, color }: { scale: number; color: string }) {
  const label = ["Ballsy", "Bold", "Balanced", "Safe", "Beige"][scale - 1] ?? "";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E" }}>Ballsy</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} style={{ width: 9, height: 9, borderRadius: "50%", background: n === scale ? color : "#E4DED5", border: n === scale ? `1px solid ${color}` : "1px solid #E0DBD3" }} />
        ))}
      </div>
      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E" }}>Beige</span>
      <span style={{ fontSize: "0.62rem", fontWeight: 700, color, marginLeft: 2 }}>{label}</span>
    </div>
  );
}

function NeilIdeaCard({ idea, index, slug, color }: { idea: { pillar: string; hookA: string; hookB: string; guidance: string; questions: string[]; audience: string }; index: number; slug: string; color: string }) {
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
    <div style={{ background: used ? "#f7f6f3" : "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "22px 26px", marginBottom: 14, opacity: used ? 0.65 : 1, transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: 0 }}>Post {index + 1} · {idea.pillar}</p>
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

      {/* Hook options A and B */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[{ k: "A", v: idea.hookA }, { k: "B", v: idea.hookB }].map(h => (
          <div key={h.k} style={{ background: "#F9F8F6", border: "1px solid #ECE7DF", borderRadius: 6, padding: "12px 14px" }}>
            <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 6px" }}>Hook {h.k}</p>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.45, margin: 0 }}>{h.v}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 14px" }}>{idea.guidance}</p>

      {idea.questions.length > 0 && (
        <div style={{ background: `${color}0d`, border: `1px solid ${color}26`, borderRadius: 6, padding: "12px 14px", marginBottom: 14 }}>
          <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 8px" }}>Questions that make them think "yep, that's me"</p>
          {idea.questions.map((q, j) => (
            <div key={j} style={{ display: "flex", gap: 8, marginBottom: j === idea.questions.length - 1 ? 0 : 6 }}>
              <span style={{ color, fontWeight: 700, flexShrink: 0, fontSize: "0.82rem" }}>?</span>
              <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>{q}</p>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: "0.76rem", color: "#7A746E", margin: 0 }}><span style={{ fontWeight: 700, color: "#3D3935" }}>Aimed at:</span> {idea.audience}</p>
    </div>
  );
}
