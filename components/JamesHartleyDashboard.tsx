"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

const COLOR = "#7A746E";
const NAME = "James Hartley";
const INITIALS = "JH";
const ROLE = "Interim CPO · Executive Coach · Strategic Advisor";
const SESSION_LABEL = "Session 13 · March 2026";
const NEXT_MOVE = "Write your power statements. You've been collecting real client feedback — use their words, not yours. Start with one sentence: what they had before, what they have now. That's your foundation.";

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

// ─── TODOS ────────────────────────────────────────────────────────────────────

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [
  {
    id: "jh1",
    text: "Write your power statements",
    subtext: "Use the feedback your coaching clients have already given you — their words, not yours. Start with: what they had before working with you, what changed, what they now have. Three sentences. That's the foundation for everything else — headline, about section, how you pitch on calls.",
    section: "Priority — do this first",
  },
  {
    id: "jh2",
    text: "Ring-fence one BD day per week",
    subtext: "You tried this once and it worked. It wasn't magic — it was structure. Block a morning in your calendar and protect it. On that morning: reach out to 4–5 people, follow up on any open threads, and send your Calendly link to anyone who hasn't booked yet.",
    section: "Business development",
  },
  {
    id: "jh3",
    text: "Follow up on all open LinkedIn conversations within 48 hours",
    subtext: "You've had people engage with your posts — CEOs, directors, people who've sent connection requests. You're not following through. Message them: \"Thanks for engaging with the post — I'd love to know what resonated. Happy to chat if it's useful.\" That's it. No pitch.",
    section: "Business development",
  },
  {
    id: "jh4",
    text: "Post once a week minimum — use conversations as source material",
    subtext: "You don't need to write a long personal story every time. One insight from a client conversation is enough. What's something you heard recently that made you think? Write that. One observation, one angle, a question at the end. Done.",
    section: "LinkedIn content",
  },
  {
    id: "jh5",
    text: "Revisit the About section once power statements are written",
    subtext: "The current About section is good but the framing needs to evolve — more insight, more execution, more impact. Once the power statements are done, this update will be quick. Ben will help draft three options.",
    section: "Profile — when ready",
  },
];

// ─── SESSIONS ─────────────────────────────────────────────────────────────────

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
    number: 13,
    date: "3 March 2026",
    title: "Converting Conversations Into Content",
    summary: "James returned from holiday with noticeably better energy and a clearer headspace after the London Cat Clinic transaction finally completed. We focused on the mechanics of turning prospect and networking conversations into content — moving beyond personal story posts into market observation and client-derived insight. James had been building a contact tracker and had reached out to 19 people from his network and 19 warm LinkedIn connections since February. The gap isn't outreach — it's converting those conversations into both clients and content. We unpacked the three-step value chain: having the conversations, extracting the insight, and turning it into a post. James coined the phrase 'no one is alone in their problems' — a good reminder that a single conversation observation is enough to write about.",
    insights: [
      "The trains analogy landed — he's consciously slowing down the Cat Clinic work and speeding up his own BD",
      "19 network contacts reached out to since Feb 11 — good momentum, follow-through is the gap",
      "One signal from a conversation is enough to write a post — you don't need a pattern",
      "You are the voice for the things clients can't say publicly — that's the content brief",
      "'No one is alone in their problems' — spontaneous, but genuinely good framing",
    ],
    agreed: [
      "Use conversations intentionally — go in with questions, extract themes",
      "Write one insight-led post this week based on something you've heard recently",
      "Continue building the contact tracker — it's working",
      "Time-block BD activity rather than leaving it to willpower",
    ],
    nextSession: "TBC",
  },
  {
    number: 12,
    date: "13 February 2026",
    title: "Ring-Fencing Time and Re-Engaging the Network",
    summary: "The London Cat Clinic transaction was finally near completion, which freed significant mental space. James had tried ring-fencing a day for BD — it worked. He reached out to 8 network contacts and 8 headhunters on that day alone, with 5 responses. We talked through the mechanics of personalising outreach (referencing past work, shared history) and how headhunters should be treated as an active channel, not an afterthought. Ben introduced James to Jen at HR Heads — a key intro for interim CPO opportunities. We also covered how to show up in headhunter meetings: reinforce what you're good at, tell stories, be memorable, and always walk away with something concrete.",
    insights: [
      "Ring-fencing worked — willpower doesn't, structure does",
      "Personalised outreach (referencing past work) builds trust immediately",
      "Headhunters need to be actively maintained — they refer who's front of mind",
      "The psychological barrier to cold-ish outreach is real but unfounded — no one has rejected him yet",
    ],
    agreed: [
      "Post LinkedIn update about interim lunch — same day if possible",
      "Follow up on all open headhunter conversations",
      "Schedule next post for Monday or Tuesday",
      "Continue the contact tracker",
    ],
    nextSession: "March 2026",
  },
  {
    number: 10,
    date: "7 January 2026",
    title: "Recalibrating the Strategy for Q1",
    summary: "First session of the new year. James articulated 'Project James' clearly: sustainable income, working ~6 months of the year, feeling positive, confident, focused, and fit. The three pillars — interim/fractional, consulting, and coaching — with a goal of equal thirds over two years. We resolved the IgnitionCraft vs. James question: the brand is James. IgnitionCraft and Potentia are delivery vehicles. He also asked Ben directly to give an outside-in read of what his brand actually is — this is a standing request. We reviewed the LinkedIn About section and identified that the framing needs to evolve toward insight → execution → impact. The petulant child metaphor from Session 9 was revisited — James reported it had quietened, and he was feeling more positive about the business development piece.",
    insights: [
      "The brand is James — not IgnitionCraft, not Potentia. Say it, live it.",
      "Personal brand is 20x more memorable than a business brand (Daniel Priestley stat that landed)",
      "Project James goals: sustainable, positive, confident, focused, fit",
      "About section needs an evolution: more insight, more execution, stronger impact framing",
    ],
    agreed: [
      "Ben to draft three About section options focused on insight → execution → impact",
      "James to write power statements using real client feedback",
      "Continue posting at least once per week",
      "Keep coffee chats and conversations going — they fuel content and clients",
    ],
    nextSession: "February 2026",
  },
  {
    number: 9,
    date: "18 December 2025",
    title: "The Petulant Child and the Adult Voice",
    summary: "A breakthrough session. James arrived having had a significant psychological shift — he'd named the inner conflict that was blocking his business development: a 'whining petulant child' resisting BD versus an 'adult voice' that executes well on client work. Naming it had started to quieten it. He also shared that a friend had given him strong unsolicited feedback about his LinkedIn presence ('You're really pushing the boundaries — I look forward to your content'). We connected feedback from coaching clients directly to the power statement work — he had real quotes, in their words, ready to use. We worked on a sales conversation he'd had with a boutique consultancy CEO, unpacking how he'd asked great questions, identified the problem (growth mindset gap), and proposed a people plan. He'd done it naturally. He just didn't recognise it.",
    insights: [
      "Naming the psychological block ('petulant child') was enough to start reducing its power",
      "James can sell — he did it naturally in the CEO conversation without realising",
      "Client feedback in their own words ('spaghetti is unravelling') is the raw material for power statements",
      "Power statements need to come from client mouths, not your own assumptions about yourself",
    ],
    agreed: [
      "Write anchor statements / power statements — this time, start from real client feedback",
      "Break BD into smaller, manageable tasks rather than treating it as one overwhelming thing",
      "Keep asking coaching clients 'how much progress have you made?' — it feeds confidence and content",
    ],
    nextSession: "7 January 2026",
  },
];

// ─── POSITIONING ──────────────────────────────────────────────────────────────

const POSITIONING = {
  headline: "",
  differentiators: [],
  audiences: [],
};

// ─── HEADLINES ────────────────────────────────────────────────────────────────

const HEADLINES: { label: string; text: string; note: string }[] = [];

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [];

// ─── CONTENT IDEAS ────────────────────────────────────────────────────────────

const CONTENT_IDEAS: { hook: string; guidance: string; priority: boolean }[] = [
  {
    hook: "The thing your board agreed on faster than any people decision this year",
    guidance: "You observed this in a client's ExCo — a major commercial partnership agreed in one sharp meeting, followed by weeks of performance calibration. Flip it into a post: organisations make bold commercial bets daily but become risk-averse the moment it's a people decision. Why? What's the cost of that gap? End with a question: where are you playing it safe when you should be taking the risk? This is your performance vs. performance process territory — you've already written one great post here, but there's more in this seam.",
    priority: true,
  },
  {
    hook: "I chased the seat at the table — until I built my own table",
    guidance: "The title-to-purpose post landed well and has strong resonance. This is a natural extension: what does it feel like to stop measuring success by title, and start measuring it by the kind of work you're doing and the people you're with? Write it from the perspective of someone mid-transition — not someone who has it all figured out. The honesty is what makes it land. End with: what are you still chasing that you might not actually want?",
    priority: true,
  },
  {
    hook: "What I heard in a room this week that nobody's saying out loud",
    guidance: "Use something from a recent client conversation — one insight, one observation, one thing someone said that made you think. You don't need to name anyone or name the company. 'I was with a leadership team this week...' is enough. The point is to position yourself as someone who's in the room, doing real work, hearing real things. You are the voice for the things your clients can't say publicly. One observation is enough — if one person is thinking it, a hundred others are too.",
    priority: false,
  },
  {
    hook: "HR handed me a 60-page handbook. I handed it back.",
    guidance: "The risk post you wrote about the 25-person business with the watertight-but-culturally-wrong employee handbook is strong territory. Rework it as a sharper, more opinionated piece: the instinct to eliminate every conceivable risk often creates the one risk you didn't anticipate — the cultural one. Keep it punchy. Short paragraphs. Let the contrast do the work. End with: what risk are you managing that's actually costing you more than it's saving?",
    priority: false,
  },
  {
    hook: "Three years in. Here's what actually moves the needle.",
    guidance: "A reflective post on what you've learned since going independent — but not a greatest hits list. Pick one thing that surprised you. One belief you've had to unlearn. One thing that looked like progress but wasn't. The best version of this is honest and specific, not inspirational. 'I spent a year building a brand before I picked up the phone to anyone I already knew. That was a mistake.' Something like that. You have the material.",
    priority: false,
  },
];

// ─── RECOMMENDATIONS ──────────────────────────────────────────────────────────

const RECOMMENDATIONS: { title: string; body: string }[] = [
  {
    title: "1. Stop waiting for the power statements to feel ready",
    body: "You've been collecting real client feedback for months. You have quotes. You know what people say when they get off a call with you. The power statements don't need to be perfect — they need to exist. Write a first draft this week using their words. Bring it to the next session and we'll refine it together. Everything else — the About section, the headline, how you pitch on calls — flows from this.",
  },
  {
    title: "2. The brand is James — not IgnitionCraft, not Potentia",
    body: "We've said this more than once. But it needs to be lived, not just agreed. When you introduce yourself, lead with James. When you send a follow-up, it's from James. When you post, it's James's voice and James's perspective. IgnitionCraft and Potentia are delivery vehicles. A personal brand is 20x more memorable than a business brand — use that.",
  },
  {
    title: "3. Treat headhunters like a warm channel, not a passive one",
    body: "Headhunters refer who is front of mind. That means regular contact, not just when you're looking for work. Keep appearing in their feeds (LinkedIn), keep showing up in their inbox (quarterly check-in), and make it easy for them to remember exactly what you do and who you do it for. When a client calls with a need, you want to be the first name that comes up.",
  },
];

// ─── GOALS ────────────────────────────────────────────────────────────────────

const GOALS = {
  short: [
    "Write and finalise power statements using real client feedback",
    "Establish a consistent BD rhythm — one protected morning per week",
    "Post at least once per week on LinkedIn",
    "Keep headhunter relationships warm and active",
  ],
  long: [
    "Build a portfolio career that generates sustainable income — roughly 6 months of meaningful work per year",
    "Equal thirds across interim/fractional, consulting, and coaching over a 2-year window",
    "Be the first name headhunters call for senior interim CPO roles",
    "Position James (not a business brand) as the recognisable voice in purpose-led people leadership",
    "Spend more time in France — financial security that enables a portfolio life",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div style={{ background: "#fff", border: "1px dashed #E0DBD3", borderRadius: 4, padding: "48px 36px", textAlign: "center" }}>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, margin: "0 0 12px" }}>{label}</p>
      <p style={{ fontSize: "1rem", color: "#7A746E", margin: "0 0 8px" }}>Content coming after your next session with Ben.</p>
      <p style={{ fontSize: "0.82rem", color: "#B0A89E", margin: 0 }}>Check back here once Ben has updated your dashboard.</p>
    </div>
  );
}

function IdeaCard({ idea, index, slug }: { idea: { hook: string; guidance: string; priority: boolean }; index: number; slug: string }) {
  const [used, setUsed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("idea_states").select("used").eq("slug", slug).eq("idea_id", `jh-${index}`).single()
      .then(({ data }) => { if (data) setUsed(data.used); });
  }, [slug, index]);

  async function toggleUsed(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !used;
    setSaving(true);
    setUsed(next);
    const supabase = createClient();
    await supabase.from("idea_states").upsert(
      { slug, idea_id: `jh-${index}`, used: next },
      { onConflict: "slug,idea_id" }
    );
    setSaving(false);
  }

  return (
    <div style={{
      background: used ? "#f7f6f3" : idea.priority ? "#f5f3f0" : "#fff",
      border: "1px solid #E0DBD3",
      borderLeft: idea.priority ? `3px solid ${COLOR}` : "1px solid #E0DBD3",
      borderRadius: 4,
      padding: "20px 24px",
      marginBottom: 12,
      opacity: used ? 0.65 : 1,
      transition: "opacity 0.2s ease",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: idea.guidance ? 10 : 0 }}>
        <p style={{ fontSize: "0.92rem", fontWeight: 600, color: used ? "#9CA3AF" : "#1C1C1C", margin: 0, lineHeight: 1.5, textDecoration: used ? "line-through" : "none", flex: 1 }}>{idea.hook}</p>
        <button
          onClick={toggleUsed}
          disabled={saving}
          style={{
            flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: 2,
            border: `1px solid ${used ? "#B0A89E" : COLOR}`,
            background: used ? "#f3f2f0" : "#f5f3f0",
            color: used ? "#7A746E" : COLOR,
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

export default function JamesHartleyDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");

  const todoItems = TODOS.map(t => ({ id: t.id, text: t.text, owner: "James" }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "14px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              {INITIALS}
            </div>
            <div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>{NAME}</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>{ROLE} · {SESSION_LABEL}</p>
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
                borderBottom: activeTab === tab.id ? `2px solid ${COLOR}` : "2px solid transparent",
                marginBottom: -1,
                color: activeTab === tab.id ? COLOR : "#7A746E",
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
            <EmailOptIn slug={slug} accentColor={COLOR} />
            <NextMoveBox move={NEXT_MOVE} accentColor={COLOR} clientName={NAME} sessionLabel={SESSION_LABEL} />

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
                  <li>Session summaries — what was covered and agreed</li>
                  <li>Content ideas with guidance</li>
                  <li>Ben's recommendations</li>
                  <li>Goals — short and long term</li>
                </ul>
              </div>
            </div>

            <ClientTodoList
              items={todoItems}
              clientName={NAME}
              slug={slug}
              accentColor={COLOR}
              onTabLink={setActiveTab}
            />

            <DashboardFooter clientName={NAME} tabName="Home" slug={slug} />
          </div>
        )}

        {/* ── SESSIONS ── */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, margin: "0 0 6px" }}>Your Journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 36px" }}>A running record of what we've covered, what shifted, and what was decided.</p>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 19, top: 24, bottom: 24, width: 2, background: "#E0DBD3", zIndex: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[...SESSIONS].reverse().map((session, i) => (
                  <div key={session.number} style={{ display: "flex", gap: 28, position: "relative" }}>
                    <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: i === 0 ? COLOR : "#fff", border: `2px solid ${i === 0 ? COLOR : "#E0DBD3"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, color: i === 0 ? "#fff" : "#7A746E", zIndex: 1 }}>
                      {session.number}
                    </div>
                    <div style={{ flex: 1, background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${COLOR}` : "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                        <div>
                          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Session {session.number} · {session.date}</p>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{session.title}</h3>
                        </div>
                        {i === 0 && (
                          <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: `${COLOR}18`, color: COLOR, border: `1px solid ${COLOR}33` }}>Latest</span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 20px" }}>{session.summary}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div style={{ background: "#F9F8F6", borderRadius: 4, padding: "14px 16px" }}>
                          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Key insights</p>
                          {session.insights.map((insight, j) => (
                            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                              <span style={{ color: COLOR, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
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
            <CommentBox clientName={NAME} tabName="Sessions" slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={COLOR} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            <PlaceholderTab label="Positioning" />
            <CommentBox clientName={NAME} tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── HEADLINES ── */}
        {activeTab === "headlines" && (
          <div>
            <PlaceholderTab label="Headlines" />
            <CommentBox clientName={NAME} tabName="Headlines" slug={slug} />
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeTab === "about" && (
          <div>
            <PlaceholderTab label="About Section" />
            <CommentBox clientName={NAME} tabName="About Section" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, marginBottom: 8 }}>Content Strategy</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Ideas drawn from your sessions and your LinkedIn presence. Each one has a hook and guidance on how to write it. Mark them used once you've posted.</p>
            {CONTENT_IDEAS.map((idea, i) => (
              <IdeaCard key={i} idea={idea} index={i} slug={slug} />
            ))}
            <CommentBox clientName={NAME} tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, marginBottom: 8 }}>From Ben</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
            {RECOMMENDATIONS.map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 12px" }}>{r.title}</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{r.body}</p>
              </div>
            ))}
            <CommentBox clientName={NAME} tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, marginBottom: 8 }}>Where We're Headed</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Goals</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: COLOR, margin: "0 0 16px" }}>Short-term</p>
                {GOALS.short.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: COLOR, margin: "0 0 16px" }}>Long-term</p>
                {GOALS.long.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
            </div>
            <CommentBox clientName={NAME} tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}
