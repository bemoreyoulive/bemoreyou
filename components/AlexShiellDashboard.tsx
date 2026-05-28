"use client";

// Alex Shiell Dashboard
// 18yo founder, Shiell Joinery. 13 sessions over 6 months.
// Mission: start a mini revolution. Not commercial. No LinkedIn.
// No em-dashes anywhere in this file. Use commas or full stops instead.
// No sunglasses in profile photo (Ben's rule).
// NextMoveBox: 40-45 words MAX.

import { useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

const AS_COLOR = "#d97706"; // Amber, trades energy, young, bold

const AS_NEXT_MOVE = "Before Session 2 (Wed 3 June, 6pm). Profile photo sorted, mysterious, no bloody sunglasses, joinery tool optional but funny. Then dictate the two reflection questions below. Walk and talk, don't write. We lock the messaging in the session, mate.";

// TODOS. Updated after each session. Keep in sync with lib/todos.ts.

const AS_TODOS: { id: string; text: string; subtext?: string; owner: string }[] = [
  { id: "as1-1", text: "Get a profile photo sorted for Instagram and TikTok. Mysterious (your word, agreed, it suits you). No bloody sunglasses. Hold a joinery tool in shot if you fancy a bit of satire, raises curiosity and plants the trades flag straight away.", owner: "Alex" },
  { id: "as1-2", text: "Sit with the two questions on this page. What does happy actually look like right now, and what do you want viewers walking away thinking in 3 or 6 months. Dictate it, don't write it, that's how you sound like you.", owner: "Alex" },
  { id: "as1-3", text: "Send me a list of content creators you actually admire. Any platform, any niche. Helps me read your taste.", owner: "Alex" },
  { id: "as1-4", text: "Next session: Wednesday 3 June 2026, 6pm. We lock messaging, finalise Instagram and TikTok, and I walk you through this dashboard properly.", owner: "Alex" },
];

// SESSIONS

const AS_SESSIONS: {
  number: number;
  date: string;
  title: string;
  summary: string;
  insights: string[];
  takeaways: string[];
  nextSession: string;
}[] = [
  {
    number: 1,
    date: "26 May 2026",
    title: "Blueprint Call. Laying the foundation.",
    summary: "The blueprint call ran 103 minutes, 13 over, and that was a good sign. You arrived already articulate, already opinionated, already comfortable on camera, and already with content hitting 100k to 150k views with zero positioning behind it. Most clients spend months finding their voice. You came pre-packaged. We spent the session pulling out the stories you've never told publicly: the £7.55 firing and the tribunal win, the four silent years at school, the McDonald's conversation that flipped your social confidence, the 30 rejected quotes, the SMMA past with Geronimo. The mission is bigger than joinery enquiries. You want to start a mini revolution aimed at young people being sold get-rich-quick lies by SMMA wankers, dropshippers and Dubai crypto bros. The strategic frame we landed on: document the journey, don't lead with how-tos. Your enemy list is sharp. Hustle culture, the manosphere, apprenticeship exploitation, old-school tradesmen, university as default. Your hero is Charlie Mullins. Your one-liner is become bigger than the company that fired me. Platforms: TikTok primary, Instagram secondary, no LinkedIn for now. Minimum 2 pieces of content per week. No scripts, no pre-approval. Away 1 July to mid-August. That travel becomes content, not a momentum killer.",
    insights: [
      "You came pre-packaged. Opinions, voice, on-camera confidence already there. That's rare. Our job is focus, not creation.",
      "You're chasing clout, not money. At 18 you intuitively get the long game. That's the unlock.",
      "The £7.55 firing is the single biggest fuel source for everything you're building. Don't lose it.",
      "Documenting the journey beats lived experiences for you because you're 18. The journey IS the content.",
      "Your rant format already works (100k to 150k views with no positioning). Don't change the format. Just point it at the right thing.",
    ],
    takeaways: [
      "Three to-dos set for before Session 2. Profile photo, two reflection questions, list of creators you admire.",
      "Session 2 will lock messaging and positioning, finalise Instagram and TikTok profiles, and walk through this dashboard.",
      "Content ideas and brand assets in this dashboard are starting points only. Nothing is confirmed until we review together.",
    ],
    nextSession: "Session 2. Wednesday 3 June 2026 at 6pm. Lock messaging and positioning, finalise Instagram and TikTok, walk through this dashboard.",
  },
];

// POSITIONING. These are ideas and starting points only. Nothing confirmed until Session 2.

const AS_POSITIONING = {
  headlineDrafts: [
    { risk: 1, text: "18, building Shiell Joinery in Edinburgh. Documenting what it actually takes, the wins, the losses, the people I'm hiring along the way. Going to be GODDAMN bigger than the company that fired me." },
    { risk: 1, text: "Founder of Shiell Joinery at 18. Showing you what nobody else in the trades is showing. The real numbers, the real jobs, the real graft. No gurus, no Dubai, no laptops in coffee shops." },
    { risk: 2, text: "Building a proper joinery business at 18 while everyone else my age is being sold dropshipping dreams. Documenting the journey to becoming GODDAMN bigger than the company that fired me." },
    { risk: 2, text: "18, no joinery qualifications, running a real construction business in Edinburgh. Trades is the new dropshipping, and you're early. Hiring my first employees on camera. Going to be GODDAMN bigger than the company that fired me." },
    { risk: 3, text: "Starting a mini revolution in the trades. 18, founder of Shiell Joinery, going to be GODDAMN bigger than the company that fired me. Apprentices are being taken the piss out of and someone needs to bloody say it." },
  ],
  differentiators: [
    "18 years old, in the trades, with a business mindset and an anti-guru position. No one else is in this lane right now, mate.",
    "You've already lived the thing you're calling out. Did SMMA with Geronimo. Walked away. That's not theoretical, that's receipts.",
    "Not a qualified joiner. You run the business as a project manager. That's itself a contrarian story, you don't need 15 years on the tools.",
    "Format already proven. Rant videos hitting 100k to 150k views with zero positioning. We're just pointing it at the right thing.",
    "You understand clout over money at 18. Most people don't get that until they're 40 and already burnt out.",
    "Articulate, fast-thinking, no filter. Pre-packaged voice. Most clients take months to find theirs.",
  ],
  audiences: [
    { label: "Primary. Young people, 15 to 25.", detail: "Apprentices being underpaid and underdeveloped. Kids being sold SMMA, dropshipping, crypto and make £10k from your laptop lies. They're online looking for a way out, and you're showing them a real one." },
    { label: "Secondary. Older tradesmen. The controversy generators.", detail: "You want them trolling you in the comments. They've built their business by being in the game long enough, not because they're proper businessmen. They'll hate you. That's the algorithm working." },
    { label: "Tertiary. People without an opinion yet.", detail: "Not changing perspectives, but giving them a perspective they hadn't considered. The kid who hadn't thought about the trades at all." },
  ],
  bios: [
    { platform: "Instagram (option 1)", text: "18 · Founder of Shiell Joinery, Edinburgh · Going to be GODDAMN bigger than the company that fired me" },
    { platform: "Instagram (option 2)", text: "Shiell Joinery · 18 · Documenting the journey · Edinburgh" },
    { platform: "TikTok (option 1)", text: "18 · Joinery in Edinburgh · Trades is the new dropshipping. You're early." },
    { platform: "TikTok (option 2)", text: "Building Shiell Joinery at 18 · Not a guru. Not in Dubai. · Documenting the lot" },
  ],
  uniqueAngles: [
    "The company van series. Every time you spot a building company van, snap a photo. Film a short later: saw this van today, here's what I'd do differently. Recurring format, audience starts sending you vans, free content engine.",
    "The construction industry is living in 2005. You're here to drag it into now. Position every rant against that backdrop.",
    "Call out hustle culture in real time, every time you see it. Quote-stitch a Tate clip, screen-record a Dubai dropshipper post, film a reaction. The contrarian voice has to be in the conversation, not watching from the sidelines.",
    "The 'I'm not a qualified joiner' angle. Lean into it. The trades love telling young people they need 15 years on the tools. You're proof they don't.",
    "Documenting the path to becoming GODDAMN bigger than the company that fired you. A long-running thread. Every milestone, first employee, first 50k job, first press mention, laddered back to the £7.55.",
  ],
  forAgainst: {
    for: [
      "Young entrepreneurs in the trades. Treating construction as a real, modern business industry.",
      "Apprentices being respected, paid fairly, taught business skills and not just used as cheap labour.",
      "Living a normal life while building a business. Friends, dating, beach, parents.",
      "Chasing experiences over money, always.",
      "Building wealth that doesn't cost your mental health or your relationships.",
    ],
    against: [
      "Hustle culture, cold-shower-monk-mode, the black pill guru mentality.",
      "Andrew Tate and the manosphere.",
      "SMMA, dropshipping, crypto. The make £10k from a laptop in Dubai wankers.",
      "Old-school tradesmen who refuse to innovate.",
      "Apprenticeship exploitation. Paying labourer work at apprentice wages, it's bloody criminal.",
      "University as the default, especially business degrees.",
      "The 15 years on site before you can build something mindset.",
    ],
  },
  contentPillars: [
    { title: "Documenting the Journey", body: "This is the big one, mate. The most important pillar. Real-time business reality, hiring your first employee, quoting jobs, winning jobs, losing jobs, the path to becoming bigger than the company that fired you. Behind the scenes of running Shiell Joinery at 18. Younger people build trust and familiarity by watching the journey unfold, not by being lectured at. This is how they end up rooting for you. People follow this because it's actually happening, not a course, not a guru, a real business in real time.", short: "The big one. Real-time business reality, hiring, quoting, winning, losing. Younger people build trust by watching the journey unfold. This is the pillar that compounds." },
    { title: "Contrarian Takes & Mini Revolution", body: "The big-picture contrarian opinions. Trades as the new untapped opportunity. SMMA, dropshipping, Dubai bros are the wrong path. Joinery is the new dropshipping, you're early. The £7.55 story, the school years, the 30 rejected quotes, all live here. Rant format you already know works. This is where the older tradesmen come and troll you in the comments, exactly what you want.", short: "The contrarian opinions and the rant format. Joinery is the new dropshipping. The £7.55 story. Where the older tradesmen come and troll you, mate." },
    { title: "Calling Out What's Broken", body: "Calling out what's wrong in the trades. The company van series. Apprenticeship exploitation. Tradesmen who think it's 2005. Customer service in an industry that has none. The bits of the industry that need dragging into now, said by someone actually inside it. Not a journalist, not an outsider, you.", short: "What's broken in the trades. Company van series, apprentice exploitation, customer service, the 2005 mindset. Said by someone inside the industry." },
    { title: "You Can Have A Life And A Successful Business", body: "The proof point pillar. You don't need to grind 16 hour days, you don't need cold showers and 4am wake-ups, you don't need to sacrifice friends, family, dating, weekends. Show the balance. Beach days, parents, your girlfriend, travelling 6 weeks at 18 while the business still runs. This is the direct answer to the hustle bros, and it's the reason people will trust you over them.", short: "You don't need 16 hour days to win. Show the balance. Friends, family, travel, dating. The direct answer to the hustle bros." },
  ],
};

// MILESTONES (Alex-specific. No LinkedIn here, video-first.)

const AS_MILESTONES = [
  { id: "m1", label: "Blueprint complete", description: "Blueprint call done. Ben has the full picture, your stories, your enemy list, your audience, your mission. Foundation laid." },
  { id: "m2", label: "Positioning statement finalised", description: "We've picked the positioning. Clear, specific, your voice, not soft. The thing you say in 10 seconds when someone asks what you're doing online." },
  { id: "m3", label: "Social media profiles set up", description: "Personal Instagram and TikTok set up properly. Mysterious profile photo (no bloody sunglasses), bio locked, link in bio sorted. Account ready to ship." },
  { id: "m4", label: "First aligned video published", description: "Your first piece of content under the new positioning. Sounds like you, points at the right enemy, lands in one of the four pillars." },
  { id: "m5", label: "First inbound DM from content", description: "Someone reaches out because of a video. An apprentice, a peer, a podcast, anyone who found you through the content, not a referral." },
  { id: "m6", label: "First 'you just get me' moment", description: "Someone tells you you've said the thing they've been thinking. The message has landed where you wanted it to land. That's the bullseye." },
];

// CONTENT IDEAS

const AS_CONTENT: { hook: string; guidance: string; priority: boolean }[] = [];

// RECOMMENDATIONS

const AS_RECS: { title: string; body: string }[] = [];

// GOALS

const AS_GOALS = {
  threeMonth: [
    "Personal Instagram and TikTok set up properly with positioning, bio and a proper photo.",
    "Followers actually moving. Low thousands on at least one platform.",
    "A handful of videos that genuinely land under the new positioning.",
    "DMs starting to come in. Apprentices, peers, the odd troll. We want all three.",
    "At least one signal worth logging. Recognition, an opportunity, a comment that shows the message is landing where you want it.",
    "How you talk about the work has shifted. Less about follower counts, more about who you're reaching.",
  ],
  sixMonth: [
    "A recognisable presence on TikTok and Instagram. The contrarian young-trades voice in the UK.",
    "A real audience. Enough that a single post is reaching thousands.",
    "Real-world signals. DMs from apprentices saying you changed their mind. Podcast appearance requests. Trolls in the comments, the good kind.",
    "Shiell Joinery has at least one full-time employee or a clear path to one.",
    "Monetisation conversations starting to open up. Course ideas, speaking, partnerships, the kind of stuff that says the brand is doing actual work.",
    "You look back at the Day One snapshot on the Sessions tab and the May 2026 version of you feels GODDAMN far away.",
  ],
  business: [
    "6 employees on the Shiell Joinery payroll within 12 months.",
    "Biggest joinery company in Edinburgh.",
    "GODDAMN bigger than the company that fired you.",
  ],
  notThisGame: [
    "We are not chasing follower counts for the sake of it.",
    "We are not optimising for views over authenticity.",
    "We are not building a funnel or a personal brand to generate more joinery enquiries.",
    "Vanity metrics are a side effect of doing it right. They are not the goal, mate.",
  ],
};

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

        {/* HOME */}
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
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Welcome, mate.</p>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, margin: 0 }}>
                  This is your personal brand dashboard. A working document that grows with you over 6 months and 13 sessions, not a polished deck. Everything in here is grounded in your own words, your own stories, your own vision, all pulled from the blueprint call. After every session I update it and the latest thinking lives here. Read it like I'm sat across from you, because that's how it's written.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions", value: "1 of 13", sub: "Next: Wed 3 June, 6pm" },
                { label: "Programme length", value: "6 months", sub: "May to November 2026" },
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

            {/* Reflection prompts */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Sit With These</p>
              <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Two questions to bring to Session 2</h3>

              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "22px 26px", marginBottom: 14 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: AS_COLOR, margin: "0 0 10px" }}>Question 1. What does happy actually look like?</p>
                <p style={{ fontSize: "0.92rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>Right now. Not in 5 years, not when you've made it. What does happy actually look like for you?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>You said in the blueprint that you'd choose clout over money, that you'd rather chase experiences than chase a number. You said a family on £60k who go to Spain together is more successful than a rich family who barely see each other. So what does that look like for you? Beach days with your girlfriend? Time with your parents? A pint with the school mates who knew you when you didn't speak? Travelling 6 weeks at 18 while your business runs in the background?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>This matters because the content only works if the life behind it is real. People follow you because you've cracked something they haven't. That you can be ambitious and happy. Without an answer to this, the content drifts into the hustle-culture lane you've spent the last year calling out.</p>
                <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>How to do it: don't sit at a laptop. Go for a walk, hit dictate on your phone, talk for 5 minutes. Send it to Ben on WhatsApp or bring it to Session 2.</p>
              </div>

              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "22px 26px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: AS_COLOR, margin: "0 0 10px" }}>Question 2. What do you want them walking away thinking?</p>
                <p style={{ fontSize: "0.92rem", color: "#1C1C1C", fontWeight: 600, lineHeight: 1.55, margin: "0 0 12px" }}>Someone watches your content for 3 months. Then someone watches for 6 months. What do they walk away thinking, believing, or doing differently?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>Be specific. Not "they think trades are cool." That's not it. Is it the 16-year-old who was about to sign up to a business degree and instead picks up the phone to a local joinery firm? Is it the apprentice on £7.55/hr who finally pushes back on their boss? Is it the older tradesman in the comments arguing, slowly realising you might be right? Is it the kid in Dubai who shuts the laptop and books a flight home?</p>
                <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>You said you want a mini revolution and you want people to think they're early. Early on what? Articulate the thing they're early on. The clearer you can describe the person at the end of the video, what they now believe that they didn't before, the easier every single piece of content gets to make.</p>
                <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>How to do it: answer it for both timeframes. 3 months: what's the first shift? 6 months: what's the bigger one? Dictate it. Don't overthink.</p>
              </div>
            </div>

            {/* What's in this dashboard / what this is */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {[
                    "Your positioning. Who you're speaking to and what you stand for.",
                    "Brand assets. Your messaging, bio ideas, and core narrative.",
                    "Content ideas. Video hooks, angles, and what to do with them.",
                    "Ben's recommendations from each session.",
                    "Your short and long-term goals.",
                    "A session-by-session record of your journey.",
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
                    "A working document. Not a polished presentation.",
                    "Everything grounded in your own words and stories.",
                    "Something to review together, not handed over and filed.",
                    "Not a script. It's scaffolding. You film in your own voice.",
                    "Living. It gets updated after every session.",
                    "Built for a mission, not a marketing funnel.",
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
                You're not building a personal brand to get more joinery enquiries, mate. You're building it because you want to change the way a generation of young people think about the trades, about apprenticeships, about what's actually possible at 18. That's a bigger mission and it's exactly the right bloody reason to do this. The most credible personal brands come from people who genuinely mean it, and you mean it.
              </p>
            </div>

            <DashboardFooter clientName="Alex Shiell" tabName="Home" slug={slug} />
          </div>
        )}

        {/* SESSIONS */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Your Journey</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 24px" }}>A running record of what we've covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {/* Starting Line Snapshot */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "24px 28px", marginBottom: 36 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 8px" }}>📸 Starting Line Snapshot. 26 May 2026.</p>
              <h3 style={{ fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.01em" }}>Where you are on Day One</h3>
              <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 16px" }}>A frozen picture of where you are the day this programme begins. We don't update this. We come back to it at 3 months (late August) and 6 months (November) to compare. It's the only honest way to measure how far you've actually moved.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Audience</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Personal Instagram: ~43 to 45 followers, zero posts</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Personal TikTok: no active account. About 20 rant videos, some hitting 100k to 150k views</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Shiell Joinery Instagram: low followers, captions shifting from corporate to Gen Z</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>The Business</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>8 months trading</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: "0 0 4px" }}>Zero employees, 2 to 3 subcontractors as needed</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>Sales conversion roughly 1 in 2 to 3</p>
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
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>High energy. Excited. Hungry. Numbers-driven right now, all about follower counts and views. Impatient. No expressed anxiety.</p>
                </div>
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 8px" }}>Stories never told publicly yet</p>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>The £7.55 firing and tribunal win, the four silent school years, the McDonald's confidence moment, the 30 rejected quotes, the SMMA past, the Dubai crypto bro take.</p>
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
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Takeaways</p>
                            {session.takeaways.map((action, j) => (
                              <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
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

        {/* MILESTONES */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={AS_COLOR} milestones={AS_MILESTONES} />
        )}

        {/* BRAND ASSETS */}
        {activeTab === "brand" && (
          <div>
            {AS_POSITIONING.headlineDrafts.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Ideas & Starting Points</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Brand Assets</h2>
                <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "14px 18px", marginBottom: 28 }}>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>Nothing in here is confirmed or approved yet, mate. These are starting points built from the blueprint call. We work through them together in Session 2 and lock what we like. Mix and match, pick favourite bits, throw out the rest. Treat everything as a draft.</p>
                </div>

                {/* Content pillars — top of brand tab, colour-differentiated */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Content pillars</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 18px" }}>Four buckets your content lives in. Every video drops into one of these. Documenting the Journey is the most important one for a guy your age, don't lose sight of that.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                    {AS_POSITIONING.contentPillars.map((p, i) => {
                      const pillarColors = ["#d97706", "#9333ea", "#0891b2", "#16a34a"];
                      const pc = pillarColors[i % pillarColors.length];
                      return (
                        <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${pc}`, borderRadius: 6, padding: "20px 20px 22px" }}>
                          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pc, margin: "0 0 8px" }}>Pillar {i + 1}{i === 0 ? " · The Big One" : ""}</p>
                          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.3 }}>{p.title}</p>
                          <p style={{ fontSize: "0.83rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{p.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Positioning drafts — 5 options, risk-ranked */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Positioning drafts. Pick one. Or mix bits.</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 14px" }}>Five options to mull over for Session 2. We can blend them. Ranked from safe to risky on a scale of 1 to 3 dots so you know what we're playing with.</p>
                  {/* Risk legend */}
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "10px 14px", background: "#F9F8F6", borderRadius: 4, marginBottom: 18, fontSize: "0.75rem", color: "#3D3935" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#16a34a", letterSpacing: "1px" }}>●</span>
                      <span>Safe. Says what you do, leaves the spice for the content itself.</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#d97706", letterSpacing: "1px" }}>●●</span>
                      <span>Bit of edge. Plants a flag without picking a fight on the bio line.</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#c0392b", letterSpacing: "1px" }}>●●●</span>
                      <span>Loud and pointed. Filter's off. Some people won't follow because of it. That's the point.</span>
                    </div>
                  </div>
                  {AS_POSITIONING.headlineDrafts.map((d, i) => {
                    const riskColor = d.risk === 1 ? "#16a34a" : d.risk === 2 ? "#d97706" : "#c0392b";
                    const riskDots = "●".repeat(d.risk);
                    return (
                      <div key={i} style={{ background: "#F9F8F6", border: `1px solid #E0DBD3`, borderLeft: `3px solid ${riskColor}`, borderRadius: 4, padding: "16px 20px", marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7A746E", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Draft {i + 1}</p>
                          <span style={{ color: riskColor, fontSize: "0.85rem", letterSpacing: "2px" }}>{riskDots}</span>
                        </div>
                        <p style={{ fontSize: "0.92rem", color: "#1C1C1C", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-dm-serif), serif" }}>{d.text}</p>
                      </div>
                    );
                  })}
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

                {/* Bios */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Bio ideas. Instagram and TikTok.</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>Starting drafts only. We pick one per platform in Session 2, or write something fresh. Bios are cheap to change.</p>
                  {AS_POSITIONING.bios.map((b, i) => (
                    <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid #F0EBE3", paddingTop: i === 0 ? 0 : 12, marginTop: i === 0 ? 0 : 12 }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: AS_COLOR, margin: "0 0 4px" }}>{b.platform}</p>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{b.text}</p>
                    </div>
                  ))}
                </div>

                {/* Unique angles */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Unique angles and opinions</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>The signature moves nobody else is doing in this space.</p>
                  {AS_POSITIONING.uniqueAngles.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.65, margin: 0 }}>{a}</p>
                    </div>
                  ))}
                </div>

                {/* Stand For / Stand Against */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>What you stand for and against</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 16px" }}>The enemy list and the flag list. Every piece of content should fit into one of these columns. If it doesn't, it's probably off-brand.</p>
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
              </div>
            ) : <PlaceholderTab label="Brand Assets" />}
            <CommentBox clientName="Alex Shiell" tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* CONTENT IDEAS */}
        {activeTab === "content" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Your Content Foundation</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 28px" }}>Specific video ideas and hooks land here after each session. For now, start with the four pillars below. Every video you make fits into one of them.</p>

            {/* Pillars in content tab — short summaries only, full versions in Brand Assets */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Your four content pillars</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.65, margin: "0 0 18px" }}>The buckets your content drops into. When you don't know what to film, come back here, pick a pillar, then just talk. Full breakdown of each lives in Brand Assets.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {AS_POSITIONING.contentPillars.map((p, i) => {
                  const pillarColors = ["#d97706", "#9333ea", "#0891b2", "#16a34a"];
                  const pc = pillarColors[i % pillarColors.length];
                  return (
                    <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${pc}`, borderRadius: 6, padding: "20px 20px 22px" }}>
                      <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pc, margin: "0 0 8px" }}>Pillar {i + 1}{i === 0 ? " · The Big One" : ""}</p>
                      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.3 }}>{p.title}</p>
                      <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.65, margin: 0 }}>{p.short}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {AS_CONTENT.length > 0 && (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 14px" }}>Video ideas</p>
                {AS_CONTENT.map((idea, i) => (
                  <div key={i} style={{ background: idea.priority ? "#fffbf2" : "#fff", border: "1px solid #E0DBD3", borderLeft: idea.priority ? `3px solid ${AS_COLOR}` : "1px solid #E0DBD3", borderRadius: 6, padding: "20px 24px", marginBottom: 12 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.5 }}>{idea.hook}</p>
                    {idea.guidance && <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{idea.guidance}</p>}
                  </div>
                ))}
              </div>
            )}
            <CommentBox clientName="Alex Shiell" tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* RECOMMENDATIONS */}
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

        {/* GOALS */}
        {activeTab === "goals" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Where We're Headed</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Goals</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 28px" }}>These aren't vanity metrics, mate. They're the things that actually tell us the work is landing. Numbers will follow as a byproduct, not as the target.</p>

            {/* Not this game — top of goals */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "20px 24px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: AS_COLOR, margin: "0 0 12px" }}>Not this game</p>
              {AS_GOALS.notThisGame.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "#c0392b", fontWeight: 700, flexShrink: 0, fontSize: "0.85rem" }}>✕</span>
                  <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 16px" }}>3 months. Late August 2026.</p>
                {AS_GOALS.threeMonth.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 16px" }}>6 months. November 2026.</p>
                {AS_GOALS.sixMonth.map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 16px" }}>The business. 12 months.</p>
              {AS_GOALS.business.map((g, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                </div>
              ))}
            </div>

            <CommentBox clientName="Alex Shiell" tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}
