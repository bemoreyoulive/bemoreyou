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

const AS_NEXT_MOVE = "Session 2 is Wednesday 3 June at 6pm. Before then: get the profile photo sorted — mysterious is the right call (your instinct, I agree). One idea — hold a joinery tool in the shot. A bit of satire, plants the trades flag, keeps the curiosity. Then sit with the two reflection questions on this page — what does happy actually look like right now, and what do you want someone watching your content in 3 or 6 months to walk away thinking. Don't write it, dictate it on a walk. In Session 2 we lock messaging, finalise Instagram + TikTok, and walk through this dashboard.";

// ─── TODOS ───────────────────────────────────────────────────────────────────
// Updated after each session. Keep in sync with lib/todos.ts.

const AS_TODOS: { id: string; text: string; subtext?: string; owner: string }[] = [
  { id: "as1-1", text: "Get a profile photo sorted for Instagram + TikTok — mysterious (your word, and I agree it's the most authentic for you). Suggestion: hold a joinery tool in shot as a bit of satire / humour — raises curiosity, plants the trades flag, keeps the mystery.", owner: "Alex" },
  { id: "as1-2", text: "Reflect on the two questions below — what does happy actually look like right now, and what do you want viewers walking away thinking in 3 or 6 months. Dictate, don't write.", owner: "Alex" },
  { id: "as1-3", text: "Send Ben a list of content creators you admire (any platform, any niche).", owner: "Alex" },
  { id: "as1-4", text: "Next session: Wednesday 3 June 2026 at 6pm — locking messaging, finalising Instagram + TikTok, walking through this dashboard.", owner: "Alex" },
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
  {
    number: 1,
    date: "26 May 2026",
    title: "Blueprint Call — laying the foundation",
    summary: "Our blueprint call ran 103 minutes — 13 minutes over — and that was a good sign. You arrived already articulate, already opinionated, already on camera comfortable, and already with content getting 100k-150k views without any positioning behind it. Most clients spend months unearthing their voice. You came pre-packaged. We spent the session pulling out the stories you've never told publicly — the £7.55 firing and the tribunal win, the four silent years at school, the McDonald's conversation that flipped your social confidence, the 30 rejected quotes, the Geronimo SMMA past. We agreed the mission is bigger than getting joinery enquiries — you're trying to start a 'mini revolution' aimed at the young people being sold get-rich-quick lies by SMMA gurus, dropshippers and Dubai crypto bros. The strategic frame we landed on: document the journey, don't lead with how-tos. Your enemy list is sharp (hustle culture, the manosphere, apprenticeship exploitation, old-school tradesmen, university as default). Your hero is Charlie Mullins. Your one-liner is 'become bigger than the company that fired me.' Platforms: TikTok primary, Instagram secondary, no LinkedIn for now. Cadence: minimum 2 pieces of content per week, no scripts, no pre-approval. You'll be away 1 July to mid-August — we're turning that travel into content, not letting it kill momentum.",
    insights: [
      "You came pre-packaged — opinions, voice, on-camera confidence already there. That's rare. Our job is focus, not creation.",
      "You're chasing clout, not money — and at 18 you intuitively get the long game. That's the unlock.",
      "The £7.55 firing is the single biggest fuel source for everything you're building. Don't lose it.",
      "'Documenting the journey' beats 'lived experiences' for you because you're 18 — the journey IS the content.",
      "Your rant format works (100k-150k views with no positioning). Don't change the format. Point it at the right thing.",
    ],
    agreed: [
      "Post minimum 2 pieces of content per week — TikTok primary, Instagram secondary",
      "Personal Instagram + TikTok to be set up properly in Session 2",
      "No scripts, no pre-approval — film authentically, review at sessions",
      "6-week travel (1 July – mid-August) becomes content goldmine, not a momentum killer",
      "Ben delivers ~10 content ideas per fortnight, calibrate after Session 3",
      "Reflect on 'what does happy actually look like' before Session 2",
    ],
    nextSession: "Session 2 — Wednesday 3 June 2026 at 6pm. Lock messaging + positioning, finalise Instagram & TikTok profiles, walk through this dashboard.",
  },
];

// ─── POSITIONING ─────────────────────────────────────────────────────────────
// Filled in after Session 1.

const AS_POSITIONING = {
  headline: "Mogging the construction industry. 18, building Shiell Joinery in Edinburgh, and starting a mini revolution for a generation being sold get-rich-quick lies. Going to be bigger than the company that fired me.",
  differentiators: [
    "18 years old, in the trades, with a business mindset and an anti-guru position — no-one else is in this lane.",
    "Already lived the thing you're calling out. Did SMMA with Geronimo. Walked away. That's not theoretical, that's receipts.",
    "Not a qualified joiner — run the business as a project manager. Itself a contrarian story: you don't need 15 years on the tools.",
    "Format already proven — rant videos hitting 100k–150k views with zero positioning. We're just pointing it at the right thing.",
    "You understand clout > money at 18. Most people don't get that until 40.",
    "Articulate, fast-thinking, no filter. Pre-packaged voice. Most clients take months to find theirs.",
  ],
  audiences: [
    { label: "Primary — Young people, 15–25", detail: "Apprentices being underpaid and underdeveloped. Kids being sold SMMA, dropshipping, crypto and 'make £10k from your laptop' lies. They're online looking for a way out — you're showing them a real one." },
    { label: "Secondary — Older tradesmen (the controversy generators)", detail: "You want them disputing you in the comments. They've built the business by being in the game long enough, not because they're businessmen. They'll hate you. That's the algorithm working." },
    { label: "Tertiary — People without an opinion yet", detail: "Not 'changing perspectives' — giving them a perspective they hadn't considered. The kid who hadn't thought about the trades at all." },
  ],
  bios: [
    { platform: "Instagram", text: "18 · Shiell Joinery, Edinburgh · Mogging the construction industry · Going to be bigger than the company that fired me · TikTok ↓" },
    { platform: "Instagram (alt)", text: "Founder, Shiell Joinery · Starting a mini revolution in the trades · Edinburgh · 18" },
    { platform: "TikTok", text: "18 · Joinery in Edinburgh · Trades is the new dropshipping (you're early) · Not a guru. Not in Dubai." },
    { platform: "TikTok (alt)", text: "Building Shiell Joinery at 18 · Mogging the construction industry · Get your hands dirty" },
  ],
  uniqueAngles: [
    "The 'company van' bit — when you spot a building company van, snap a photo there and then. Later, film a short: 'Saw this van today. Here's what I'd do differently.' Recurring format. Audience starts sending you vans. Free content engine.",
    "The construction industry is living in 2005. You're here to drag it into now. Position every rant against that backdrop.",
    "Call out hustle culture in real time every time you see it. Don't wait — quote-stitch a Tate clip, screen-record a Dubai dropshipper post, film a reaction. The contrarian voice has to be in the conversation, not adjacent to it.",
    "The 'I'm not a qualified joiner' angle. Lean into it. The trades love telling young people they need 15 years on the tools — you're proof they don't.",
    "Documenting the path to becoming bigger than the company that fired you. A long-running narrative thread. Every milestone — first employee, first 50k job, first piece of press — laddered back to the £7.55.",
  ],
  forAgainst: {
    for: [
      "Young entrepreneurs in the trades — treating construction as a real business industry.",
      "Apprentices being respected, paid fairly, taught business skills, not just labour.",
      "Living a normal life while building a business — friends, dating, beach, parents.",
      "Chasing experiences over money.",
      "Building wealth that doesn't cost your mental health.",
    ],
    against: [
      "Hustle culture, cold-shower-monk-mode, the 'black pill guru' mentality.",
      "Andrew Tate and the manosphere.",
      "SMMA, dropshipping, crypto, 'make £10k from a laptop in Dubai' gurus.",
      "Old-school tradesmen who refuse to innovate.",
      "Apprenticeship exploitation — paying labourer work at apprentice wages.",
      "University as the default, especially business degrees.",
      "The '15 years on site before you can build something' mindset.",
    ],
  },
  contentPillars: [
    { title: "The Mini Revolution", body: "The big-picture contrarian takes. Trades as the new untapped opportunity. SMMA / dropshipping / Dubai bros are the wrong path. Joinery is the new dropshipping — you're early. Anchor pillar. Rant format. The £7.55 story, the school years, the 30 rejected quotes — all live here." },
    { title: "Mogging the Construction Industry", body: "Calling out what's broken in trades. The company van series. Apprenticeship exploitation. Tradesmen who think it's 2005. Customer service in an industry that has none. This is where the older tradesmen come and fight you in the comments — exactly what you want." },
    { title: "Documenting the Journey", body: "Real-time business reality. Hiring your first employee. Quoting jobs. Winning jobs. Losing jobs. The path to becoming bigger than the company that fired you. Behind-the-scenes of running Shiell Joinery at 18. People follow this because it's actually happening — not a course, not a guru, a real business in real time." },
    { title: "The Life Behind The Hustle", body: "The proof point. Friends, dating, parents, beach days, travelling 6 weeks at 18 while the business runs. You can be ambitious AND have a life. This pillar is the answer to the hustle bros — and the reason people trust you over them." },
  ],
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
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Shiell Joinery · Session 2 of 13</p>
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
                { label: "Sessions", value: "1 of 13", sub: "Next: Wed 3 June, 6pm" },
                { label: "Programme length", value: "6 months", sub: "May — November 2026" },
                { label: "Platform", value: "Instagram & TikTok", sub: "Video-first content" },
                { label: "Content live", value: "Coming soon", sub: "First video after Session 2" },
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

            {/* Reflection prompts — sit with these before Session 2 */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Sit With These</p>
              <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Two questions to bring to Session 2</h3>

              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "22px 26px", marginBottom: 14 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: AS_COLOR, margin: "0 0 10px" }}>Question 1 — What does happy actually look like?</p>
                <p style={{ fontSize: "0.92rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>Right now — not in 5 years, not when you've "made it" — what does happy actually look like for you?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>You said in the blueprint that you'd choose clout over money, that you'd rather chase experiences than chase a number. You said a family on £60k who go to Spain together is more successful than a rich family who barely see each other. So the question is — what's that look like for YOU? Beach days with your girlfriend? Time with your parents? A pint with the school mates who knew you when you didn't speak? Travelling for 6 weeks at 18 while your business runs in the background?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>This matters because the content only works if the life behind it is real. People follow you because you've cracked something they haven't — that you can be ambitious AND happy. Without an answer to this, the content drifts into the hustle-culture lane you've spent the last year calling out.</p>
                <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>How to do it: don't sit at a laptop. Go for a walk, hit dictate on your phone, talk for 5 minutes. Send it to Ben on WhatsApp or bring it to Session 2.</p>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "22px 26px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: AS_COLOR, margin: "0 0 10px" }}>Question 2 — What do you want them walking away thinking?</p>
                <p style={{ fontSize: "0.92rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>Someone watches your content for 3 months. Then someone watches for 6 months. What do they walk away thinking, believing, or doing differently?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>Be specific. Not "they think trades are cool." That's not it. Is it the 16-year-old who was about to sign up to a business degree and instead picks up the phone to a local joinery firm? Is it the apprentice on £7.55/hr who finally pushes back on their boss? Is it the older tradesman in the comments arguing — and slowly realising you might be right? Is it the kid in Dubai who shuts the laptop and books a flight home?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>You said you want a "mini revolution" and you want people to think they're early. Early on what? Articulate the thing they're early on. The clearer you can describe the person at the end of the video — what they now believe that they didn't before — the easier every single piece of content gets to make.</p>
                <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>How to do it: try answering it for both timeframes. 3 months: what's the first shift? 6 months: what's the bigger one? Dictate it. Don't overthink.</p>
              </div>
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
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 24px" }}>A running record of what we've covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {/* Starting Line Snapshot — Day One baseline */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "24px 28px", marginBottom: 36 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 8px" }}>📸 Starting Line Snapshot — 26 May 2026</p>
              <h3 style={{ fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Where you are on Day One</h3>
              <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 16px" }}>A frozen picture of where you are the day this programme begins. We don't update this. We come back to it at 3 months (late August) and 6 months (November) to compare. It's the only honest way to measure how far you've actually moved.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Audience</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Personal Instagram: ~43–45 followers, zero posts</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Personal TikTok: no active account — ~20 rant videos, some hit 100k–150k views</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Shiell Joinery Instagram: low followers, captions shifting from corporate to Gen Z</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>The Business</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>8 months trading</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Zero employees, 2–3 subcontractors as needed</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Sales conversion ~1 in 2–3</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Content output</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Inconsistent rant videos. No schedule, no positioning, no call to action, no funnel. Just rants in the car with a backdrop.</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Confidence on camera</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>High. Zero barrier. Already comfortable filming solo phone videos in the car.</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Mindset</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>High energy. Excited. Hungry. Fixated on follower counts, views, likes. Impatient. No expressed anxiety.</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Stories never told publicly yet</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>The £7.55 firing + tribunal win, the four silent school years, McDonald's confidence moment, the 30 rejected quotes, the SMMA past, the "Dubai crypto bro" take.</p>
                </div>
              </div>
            </div>

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

                {/* Bios — Instagram & TikTok */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Bio options — Instagram & TikTok</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>Starting drafts. Pick one per platform in Session 2, or mix and match. Bios are cheap to swap — change them as you go.</p>
                  {AS_POSITIONING.bios.map((b, i) => (
                    <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid #F0EBE3", paddingTop: i === 0 ? 0 : 12, marginTop: i === 0 ? 0 : 12 }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: AS_COLOR, margin: "0 0 4px" }}>{b.platform}</p>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{b.text}</p>
                    </div>
                  ))}
                </div>

                {/* Unique angles */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Unique angles & opinions</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>The signature moves nobody else is doing in this space.</p>
                  {AS_POSITIONING.uniqueAngles.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.65, margin: 0 }}>{a}</p>
                    </div>
                  ))}
                </div>

                {/* Stand For / Stand Against — side by side */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>What you stand for & against</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>The enemy list and the flag list. Every piece of content should be plantable into one of these columns. If it doesn't fit either side, it's probably off-brand.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "16px 18px" }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#2e7d4f", margin: "0 0 12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Stand FOR</p>
                      {AS_POSITIONING.forAgainst.for.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          <span style={{ color: "#2e7d4f", fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>✓</span>
                          <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.55, margin: 0 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "16px 18px" }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#c0392b", margin: "0 0 12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Stand AGAINST</p>
                      {AS_POSITIONING.forAgainst.against.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          <span style={{ color: "#c0392b", fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>✕</span>
                          <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.55, margin: 0 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content pillars */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Content pillars</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 18px" }}>Four buckets your content lives in. Every video drops into one of these. Rough mix to aim for over time — feel it, don't measure it.</p>
                  {AS_POSITIONING.contentPillars.map((p, i) => (
                    <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid #F0EBE3", paddingTop: i === 0 ? 0 : 14, marginTop: i === 0 ? 0 : 14 }}>
                      <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 6px" }}>{i + 1}. {p.title}</p>
                      <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
                    </div>
                  ))}
                </div>
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
