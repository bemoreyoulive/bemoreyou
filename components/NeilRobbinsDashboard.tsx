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
  sessionLabel: "Session 2 of 13 · June 2026",
  nextMove:
    "Neil, your profile is live. Headline and About done, and both are brilliant. Session 3 has moved to Friday 10 July at 11am. Two posts before then is the only job left. Use your Content Ideas tab, pick a hook and hit publish.",
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
    body: "Your unfiltered, plain-English view of the industry, the things most agency CEOs will not say out loud. You are full of genuinely valuable contrarian views on performance marketing, and that is the engine of your authority, the reason senior people stop scrolling, coming from honesty and a sharper eye rather than any kind of anger. Think senior marketers leaving 15 to 20% of ecommerce revenue on the table because they misjudge affiliate, only pay when it works against rising Google and Meta costs, and why the industry keeps grabbing slices instead of making the pie much bigger.",
    short: "Your unfiltered take on the industry, the valuable contrarian views you are not afraid to say out loud, and the edge that makes you worth listening to.",
    audience: "Senior marketing decision-makers, the CMOs and marketing leaders. Also reaches practitioners and industry peers.",
  },
  {
    title: "24 years of graft",
    tag: "The Graft",
    body: "Twenty-four years of building, nearly losing and growing a market-leading agency from scratch, told through the scars rather than the theory. There was the Ferrari boss who showed you exactly who not to be, the performance-only deal in Gibraltar that you hated but that kept the lights on through the 2008 crash, and the downsizing before Christmas that you then had to rebuild from. When you told a room of agency owners you had been at it for 24 years, most of them looked like you had just told them you climbed Everest in your lunch break. This is the pillar that earns trust from founders, fellow leaders and the people who might one day back you.",
    short: "The story of building the agency over 24 years, the mistakes, the near-misses and the hard-won lessons that come with the graft.",
    audience: "Founders, agency owners and potential acquirers or investors. It also deepens your authority with marketing leaders.",
  },
  {
    title: "People, people, people",
    tag: "The Gaffer",
    body: "The reality of leading 75 to 80 people across three continents, and everything that comes with it. People are 80% of your success and 80% of your failure, and you have lived that truth in every direction. You hired Louise from a barbecue on nothing more than attitude, and 23 years later she is your Global Services Director with shares in the business. Then there is the leading through humour, the fairness and enjoyment that sometimes cost you, and the calls that never make the highlight reel. This is the operator and the human behind the title.",
    short: "The day-to-day of leading people, the hiring, the culture and the calls that never make the highlight reel, the real stuff rather than the managed version.",
    audience: "Your team and future talent, fellow leaders and founders. It also reassures potential buyers.",
  },
  {
    title: "Neil: the man, the myth, the legend",
    tag: "Off the Clock",
    body: "This is you off the clock, the texture that makes the other three land. You are a London lad and a copper's son, a Man Utd fan since the age of six, the coach of an U16 girls football team and a golf convert who now plays three times a week, with three kids, a Geordie wife and a clear sense of what freedom actually means to you. People follow people, not agencies, so this is the connective tissue that stops you reading as a faceless CEO and makes everything else you put out feel human.",
    short: "This is you off the clock, the football, the family, the golf and what actually matters to you, the human glue that ties it all together.",
    audience: "Everyone. This is the connective tissue across all your audiences.",
  },
];

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [
  {
    id: "nr-posts",
    text: "Aim for two posts before Session 3 on Friday 10 July. Use the content ideas in your Content tab. Pick a hook, build it, hit publish.",
    section: "content",
  },
  {
    id: "nr-grenades",
    text: "Keep capturing grenade moments as they happen. Voice note it straight away, then WhatsApp it to Ben.",
    section: "home",
  },
];

const POSITIONING: {
  headline: string;
  differentiators: string[];
  audiences: { label: string; detail: string }[];
} = {
  headline: "",
  differentiators: [],
  audiences: [],
};

// Live headline — what Neil went with after reviewing the options. Updated 28 June 2026.
const HEADLINES: { label: string; text: string; note: string }[] = [
  {
    label: "Live on LinkedIn · 26 June 2026",
    text: "Founder & CEO, Silverbean. We build Affiliate, Creator, and PR growth engines for DTC & Ecommerce brands. Affiliate Agency of the Year, back to back.",
    note: "Neil's own version, built on Option 5. He broadened it to include Creator and PR alongside Affiliate, which better reflects Silverbean's current offer. Cleaner and more confident than the old headline, and the Agency of the Year credential does the credibility work without any fuss.",
  },
];

// Live About section — what Neil went with after reviewing the drafts. Updated 28 June 2026.
const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [
  {
    label: "Live on LinkedIn · 26 June 2026",
    text: `I talk to many DTC and Ecommerce leaders responsible growth and I'm finding they are typically stuck in one of three camps:

👉 They're pouring budget into Google and Meta but the costs are climbing and the returns are diminishing
👉 They suspect affiliate and partnerships could do more, but are concerned whether they will be paying for sale they would have got anyway
👉 They're under pressure to deliver more growth and more profit but with no more budget and with a small team who give everything but who can't do anymore

If any of that rings true, you're in good company, and you're in the right place.

I started Silverbean back in 2002 because I believed affiliates could be a primary driver of real, measurable growth for ambitious brands, rather than the afterthought everyone had it down as.

24 years and a fair few grey hairs later, that belief has been proven right more times than I can count.

These days we're a global performance partnerships agency with teams across the UK, Australia and the US, working with DTC brands in 40+ countries. Our clients see an average 40% lift in affiliate revenue in their first 100 days, and we've been named Affiliate Agency of the Year back to back.

As nice as the awards are, the bit I'm actually proudest of is the team we've built and the clients who've stuck with us for years.

After all this time, I've got a fairly good idea of who I'm most useful to. You'll get the most out of following me if:

✅ You suspect affiliate and partnerships could be a serious growth driver and want to prove it
✅ You'd rather hear the truth than a nicely polished version of it
✅ You like your marketing explained in plain English, not buzzwords

When I'm not banging that drum, I coach kids football teams, which has taught me more about leadership, patience and herding strong personalities than 24 years in business ever has.

I don't try to be for everyone, and that's kinda the point. But if any of that sounds like you, come and connect.`,
    note: "Neil's own version, built on Option B. He adapted the three-camps opening to start with 'I talk to many DTC and Ecommerce leaders' rather than 'Most marketing leaders', which grounds it in his experience. He also changed the green tick filter to say 'want to prove it' rather than 'want someone to prove it', which is subtly stronger. The structure is identical to Option B: reader's situation first, then why, results, filter, personal texture.",
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
  {
    title: "You do not need a call to action",
    body: "A quick word on something that trips a lot of people up. You will see endless posts that sign off with 'book a call' or 'DM me to find out more.' You do not need any of that, and at your level it would actually work against you. You are the founder of a 24 year old agency, not someone flogging a course from the back of the room. Your job here is to be worth listening to, not to chase a click. Let the writing earn the attention and let people come to you, because they will. The only soft ask worth making, now and then, is inviting people to share their own take in the comments. That lifts the reach of a post without ever looking like selling, and more often than not it starts the conversations that actually matter.",
  },
];

// 5 starter content ideas. Each has two hook options (A and B), short guidance
// on how to write it, rhetorical questions that make the reader think "yep,
// that's me", and who it is aimed at.
const CONTENT_IDEAS: {
  pillars: number[];
  hookA: string;
  hookB: string;
  guidance: string;
  tips: string[];
  questions: string[];
  audience: string;
}[] = [
  {
    pillars: [0],
    hookA: "Finance love affiliate. Marketing keep forgetting it exists. Worth asking why.",
    hookB: "It's the one kind of marketing that only charges you when it works. So why does it still get treated like the poor relation?",
    guidance:
      "A strong first post and the cleanest way into your point of view. Make the case calmly, in plain English, for why something that only pays out on results gets sidelined while paid keeps eating the budget. No 'incrementality' or 'publisher mix'. You are talking to a smart marketing leader who has been put off by jargon before. End on a thought, not a pitch.",
    tips: [
      "Find the one number or comparison that makes a CMO pause, like paid costs climbing while a results-only option sits unused. Lead with that, not the explanation.",
      "Open with something mildly uncomfortable for the reader, the money going on impressions and promises, then show the alternative. A little discomfort earns the read.",
      "Include a real figure and a plain example anyone could follow. Leave out 'incrementality', 'publisher mix' and anything that needs a glossary.",
    ],
    questions: [
      "When did you last properly check where your performance budget actually ends up?",
      "If something only charged you when it delivered, would you really leave it in the corner?",
    ],
    audience: "Senior marketing decision-makers and brand leaders.",
  },
  {
    pillars: [1],
    hookA: "My old boss came in one Monday and said he was buying a Ferrari with cash if we worked harder. He could not afford lunch.",
    hookB: "I started my agency because of a boss, a Ferrari, and a forecast with nothing behind it.",
    guidance:
      "A story post, and people love a good villain. Tell it the way you would in the pub: the fantasy forecasts, the Ferrari, the moment you decided you would rather make your own mistakes. Then land one quiet point about leadership or over-promising. Do not spell out the moral, let the story carry it. This is the stuff that builds credibility with founders and the people who might back you one day.",
    tips: [
      "Tell it as a proper story. Set the scene first, the boss, the Ferrari, the forecast with nothing behind it, before you go anywhere near the lesson.",
      "The absurd detail is the hook. The cash, the fantasy numbers on the whiteboard. Specifics make people stop, vague life-lessons make them scroll.",
      "Include the one thing it taught you about leadership or over-promising, in a full sentence. Leave out the tidy moral and the 'and that is why you should' ending.",
    ],
    questions: [
      "Ever worked for someone who showed you exactly who you did not want to become?",
    ],
    audience: "Founders, agency owners and peers.",
  },
  {
    pillars: [2, 1],
    hookA: "I hired the person who now runs a big chunk of the company at a barbecue. She knew nothing about marketing at the time.",
    hookB: "23 years ago I gave a job to someone who could not use Google. It is the best hiring decision I ever made.",
    guidance:
      "A people-first story with a warm payoff. Set the scene, the barbecue, the daft interview question, then the long arc of where she got to. The point underneath is simple: hire for attitude and potential, not the CV. Keep it humble. This is the one that shows the human behind the title, and it reassures anyone wondering how you actually lead.",
    tips: [
      "The gap between how she started, could not use Google, and where she got to, Global Services Director with shares, is the whole point. Make that arc clear.",
      "Open on the unlikely bit, hiring someone with no marketing experience off the back of a barbecue. It sounds reckless, which is exactly why people read on.",
      "Include what you actually hired her for, attitude over CV. Keep her the hero and leave out anything that turns it into a humblebrag about you.",
    ],
    questions: [
      "How many good people have you walked past because their CV did not tick the box?",
    ],
    audience: "Your team, future talent and fellow leaders.",
  },
  {
    pillars: [0],
    hookA: "Everyone in this industry says we are all friends. We are mostly not.",
    hookB: "We shake hands at the awards do and compete like animals the rest of the year. Nobody says it out loud.",
    guidance:
      "A spicier one, so handle with a bit of care given clients are watching. The honesty is the value, not the aggression. The footballers-at-an-awards-do comparison does the work nicely. Underneath it, make the real point: the industry is so busy competing that it never bothers to sell its own worth to the people holding the budget. Confident, never a rant.",
    tips: [
      "You are saying a quiet industry truth out loud, so be honest rather than bitter. You are describing how it works, not having a go at anyone by name.",
      "The flat contradiction is the hook, everyone says we are all friends, we are not. The footballers-at-the-awards image then makes it land.",
      "Include why it matters, that the infighting stops the industry selling its real worth to the people holding the budget. Leave out names and anything a blue-chip client would wince at.",
    ],
    questions: [
      "How many industries are all smiles in public and all elbows in private?",
    ],
    audience: "Industry peers and senior marketers.",
  },
  {
    pillars: [3],
    hookA: "I coach an under 16s girls football team. Some weeks it is the most useful management training I get.",
    hookB: "Supporting Man Utd for 40 years has prepared me for business in ways I would rather not admit.",
    guidance:
      "A personal one to balance the sharper posts. Pick a single thread, the coaching or the football, and tie it to something real about leading people, staying patient, or just enjoying what you do. Let your character show, that is the whole point of this pillar. Keep it light and a bit self-deprecating. Do not force a business lesson in if it does not belong.",
    tips: [
      "Pick one thread, the coaching or the football, and one honest thing it has taught you. Do not try to cover your whole life in a single post.",
      "The unexpected link is the draw, what an under 16s girls team has to do with running an 80-person business. Lean into that surprise up top.",
      "Include a real moment from a session or a match. Leave out any forced business lesson if it does not genuinely fit, a bit of warmth is plenty.",
    ],
    questions: [
      "What has something outside work taught you that the job never could?",
    ],
    audience: "Everyone. The thread that ties the rest together.",
  },
];

// Content sub-tabs by month. Only Month 1 is live for now.
const CONTENT_MONTHS = [
  { id: "m1", label: "Month 1" },
  { id: "m2", label: "Month 2" },
];

// Homepage "who you're for / not for", 4 bullets each.
const WHO_FOR = [
  "Senior marketing leaders at DTC and ecommerce brands who suspect they are underusing performance partnerships",
  "Founders and agency owners who want the honest version of building a business, scars and all",
  "Marketers who are tired of the jargon and want affiliate explained in plain English",
];
const WHO_NOT_FOR = [
  "Affiliate and digital managers after tactical, in-the-weeds how-tos. You write for the people they answer to",
  "Anyone who wants a polished, say-nothing corporate feed. You will have opinions and you will share them",
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
    nextSession: "Session 2 · Tuesday 23 June 2026, 10am · messaging & positioning",
  },
  {
    number: 2,
    date: "23 June 2026",
    title: "Messaging & positioning. Turning your story into how you sound.",
    summary:
      "Our 60 minute messaging session, and a good one. We walked through your pillars, headlines, About section drafts and content ideas together. Your honest verdict on your current LinkedIn was 'mildly interesting', and you are right, that is not the ceiling. You are leaning towards Option B on the About section and Option 5 on the headline, and you have the next two weeks to review, tweak and decide before we next speak. We also talked through the market problem you face in conversations every week, the CMOs stuck with 80% of their budget locked into paid, attribution chaos and boards wanting more from less. That is prime content territory. Carrie Rose at Rise at Seven is the benchmark you named for what this can look like at its best.",
    insights: [
      "Your honest read on your current LinkedIn: 'mildly interesting.' That is the right diagnosis, and it is exactly the bar we are raising.",
      "Option B About and Option 5 headline are your leanings. Reader-first, credential-led, no jargon.",
      "The CMO pain points you live with every week, paid dependency, attribution chaos, boards wanting more from a shrinking budget, are your richest content territory. Those are the posts that build authority.",
      "Carrie Rose at Rise at Seven is the benchmark. That gives us a clear north star for what this looks like at its best.",
    ],
    agreed: [
      "You to review the About and headline options over the next two weeks and decide which to go with before Session 3.",
      "Aim for two posts before Session 3. Use the content ideas in your Content tab, pick a hook and go from there.",
      "Keep capturing grenade moments as voice notes and WhatsApp them to Ben straight away.",
      "Session 3 booked, Monday 7 July at 11am, since moved to Friday 10 July at 11am.",
    ],
    nextSession: "Session 3 · Friday 10 July 2026, 11am · content review and grenade harvest",
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
    "Raise affiliate's whole reputation at senior level, the hill you said you are willing to die on",
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
  const [contentMonth, setContentMonth] = useState("m1");
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
                Two sessions in, Neil. Your pillars are set, your LinkedIn profile is live with the new headline and About, and your content ideas are ready. Session 3 has moved to Friday 10 July at 11am. One job left before then: two posts. Pick a hook from your Content Ideas tab and hit publish. Neither has to be perfect.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "2 of 13", sub: "Next: Fri 10 July, 11am" },
                { label: "Content pillars", value: "4 set", sub: "See Brand Assets" },
                { label: "Headline", value: "Live ✓", sub: "Updated 26 June 2026" },
                { label: "About section", value: "Live ✓", sub: "Updated 26 June 2026" },
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
                    "Positioning, live headline and About section in Brand Assets",
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

            {/* CMO challenges / market problem */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 26px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color, margin: "0 0 6px" }}>The market problem you speak to</p>
              <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>The challenges your ideal clients are living with right now. These pain points, articulated in plain English, are the fuel for a lot of your best content.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { label: "Paid dependency", body: "Around 80% of most ecommerce budgets locked into Google and Meta. Costs climbing, returns flattening, and no easy way out." },
                  { label: "Attribution chaos", body: "CMOs genuinely cannot tell the board what is working. Everything claims credit, nothing adds up, and the P&L pressure is relentless." },
                  { label: "Board squeeze", body: "More revenue from a smaller budget. Every quarter. The CFO wants it controllable and provable, and most of what they are spending is neither." },
                  { label: "Affiliate is underinvested", body: "Not written off, the smart ones know better than that now. But still sitting in the corner, treated as a nice extra rather than the fixed-cost, results-only growth driver it actually is." },
                ].map((c, i) => (
                  <div key={i} style={{ background: "#F9F8F6", borderRadius: 6, padding: "14px 16px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, margin: "0 0 6px" }}>{c.label}</p>
                    <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.55, margin: 0 }}>{c.body}</p>
                  </div>
                ))}
              </div>
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
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>We will nail your single positioning line once you have locked the headline and About section. That one stays blank on purpose, it is the one thing I do not want to write at you.</p>
              </div>
            )}

            {/* LinkedIn About drafts */}
            {ABOUT_VERSIONS.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                {/* A note from Ben on why these work */}
                <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 8, padding: "18px 22px", marginBottom: 20 }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>A note from Ben</p>
                  <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>Neil, both look great live. The About works because it opens with the reader's situation, not yours or Silverbean's. Anyone in that target audience reads the first line and recognises themselves before they know anything about you, and that's the whole point of leading this way. You've pulled it off. The green tick filter does the same job from a different angle: instead of selling at someone, you're filtering for them. The right person leans in, the wrong ones bugger off, and you never had to pitch either of them. The headline is cleaner and more confident than the old one too. The Agency of the Year line does the credibility work, so nothing else needs to.</p>
                </div>

                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>LinkedIn About section · live version</p>
                <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>What is live on Neil's profile as of 26 June 2026. His own version, built on the Option B structure with a few smart tweaks.</p>
                {ABOUT_VERSIONS.map((v, i) => (
                  <div key={i} style={{ background: "#eef4f1", border: `1px solid ${color}`, borderRadius: 6, padding: "24px 28px", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: 0 }}>{v.label}</p>
                      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: color, borderRadius: 20, padding: "3px 9px" }}>Live</span>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{v.text}</p>
                    <p style={{ fontSize: "0.78rem", color: "#7A746E", borderTop: "1px solid #E0DBD3", paddingTop: 12, margin: 0 }}>{v.note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* LinkedIn headline options with ballsy-to-beige meter */}
            {HEADLINES.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>LinkedIn headline · live version</p>
                <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>What is live on Neil's profile as of 26 June 2026. His own version, built on Option 5, expanded to include Creator and PR alongside Affiliate.</p>
                {HEADLINES.map((h, i) => (
                  <div key={i} style={{ background: "#eef4f1", border: `1px solid ${color}`, borderRadius: 6, padding: "20px 24px", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color, margin: 0 }}>{h.label} · {h.text.length} characters</p>
                      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: color, borderRadius: 20, padding: "3px 9px" }}>Live</span>
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
                {/* Month sub-tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {CONTENT_MONTHS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => m.id === "m1" && setContentMonth(m.id)}
                      disabled={m.id !== "m1"}
                      style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                        padding: "8px 16px", borderRadius: 20, cursor: m.id === "m1" ? "pointer" : "not-allowed",
                        border: contentMonth === m.id ? `1px solid ${color}` : "1px solid #E0DBD3",
                        background: contentMonth === m.id ? color : "#fff",
                        color: contentMonth === m.id ? "#fff" : m.id === "m1" ? "#7A746E" : "#B0A89E",
                      }}
                    >
                      {m.label}{m.id !== "m1" ? " · soon" : ""}
                    </button>
                  ))}
                </div>

                {contentMonth === "m1" && (
                  <>
                    <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "20px 24px", marginBottom: 20 }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color, margin: "0 0 8px" }}>Month 1 · 5 posts to get you off the mark</p>
                      <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 10px" }}>Each one gives you two hook options, A and B, so you pick the opener that feels most like you. Then a few words on how to write it and who it is for. I have also dropped in a rhetorical question or two per post, the kind that make the right reader think "yep, that is me". Use one to open or close if it fits. The colour tags show which pillar or two each post leans on.</p>
                      <p style={{ fontSize: "0.86rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>The target is two posts per week. These five are a starting point, not the full picture. After each session, we add more, built around what has been happening in the business, who you have been talking to, and what has come up in your life outside it. The library grows with you.</p>
                    </div>
                    <div style={{ background: "#eef4f1", border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: 6, padding: "18px 22px", marginBottom: 20 }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color, margin: "0 0 10px" }}>Before you hit publish</p>
                      <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                        <li style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6 }}>Schedule for <strong>07:30am</strong> before people start work. That is when it gets seen.</li>
                        <li style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6 }}>Always add a photo. It does not have to be directly related to the post, even something from around that time in your life works and makes a real difference to engagement.</li>
                        <li style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6 }}>If your headline is a quote from someone else, put it in speech marks so people know it is a quote, not your own words.</li>
                      </ul>
                    </div>
                    {CONTENT_IDEAS.map((idea, i) => (
                      <NeilIdeaCard key={i} idea={idea} index={i} slug={slug} color={color} />
                    ))}
                  </>
                )}
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

// Beige-to-ballsy meter for headline options. scale 1 (ballsy) to 5 (beige).
// Rendered beige on the left, ballsy on the right, so the active dot sits at
// visual position (6 - scale).
function BallsyMeter({ scale, color }: { scale: number; color: string }) {
  const label = ["Ballsy", "Bold", "Balanced", "Safe", "Beige"][scale - 1] ?? "";
  const activePos = 6 - scale;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E" }}>Beige</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <span key={n} style={{ width: 9, height: 9, borderRadius: "50%", background: n === activePos ? color : "#E4DED5", border: n === activePos ? `1px solid ${color}` : "1px solid #E0DBD3" }} />
        ))}
      </div>
      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E" }}>Ballsy</span>
      <span style={{ fontSize: "0.62rem", fontWeight: 700, color, marginLeft: 2 }}>{label}</span>
    </div>
  );
}

function NeilIdeaCard({ idea, index, slug, color }: { idea: { pillars: number[]; hookA: string; hookB: string; guidance: string; tips: string[]; questions: string[]; audience: string }; index: number; slug: string; color: string }) {
  const [used, setUsed] = useState(false);
  const [saving, setSaving] = useState(false);
  const primary = PILLAR_COLORS[idea.pillars[0] % PILLAR_COLORS.length];

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
    <div style={{ background: used ? "#f7f6f3" : "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${primary}`, borderRadius: 6, padding: "22px 26px", marginBottom: 14, opacity: used ? 0.65 : 1, transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF" }}>Post {index + 1}</span>
          {idea.pillars.map(pi => {
            const pc = PILLAR_COLORS[pi % PILLAR_COLORS.length];
            return (
              <span key={pi} style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: pc, background: `${pc}14`, border: `1px solid ${pc}40`, borderRadius: 20, padding: "3px 9px" }}>
                {NR_PILLARS[pi].tag}
              </span>
            );
          })}
        </div>
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
            <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: primary, margin: "0 0 6px" }}>Hook {h.k}</p>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.45, margin: 0 }}>{h.v}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 14px" }}>{idea.guidance}</p>

      {idea.tips.length > 0 && (
        <div style={{ background: "#F9F8F6", border: "1px solid #ECE7DF", borderRadius: 6, padding: "14px 16px", marginBottom: 14 }}>
          <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: primary, margin: "0 0 10px" }}>How to build it</p>
          {idea.tips.map((tip, j) => {
            const label = ["What to think about", "How to turn heads", "What to include, what to leave out"][j] ?? "";
            return (
              <div key={j} style={{ display: "flex", gap: 9, marginBottom: j === idea.tips.length - 1 ? 0 : 10 }}>
                <span style={{ color: primary, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem", lineHeight: 1.5 }}>{j + 1}</span>
                <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>
                  <span style={{ fontWeight: 700, color: "#1C1C1C" }}>{label}. </span>{tip}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {idea.questions.length > 0 && (
        <div style={{ background: `${primary}0d`, border: `1px solid ${primary}26`, borderRadius: 6, padding: "12px 14px", marginBottom: 14 }}>
          <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: primary, margin: "0 0 8px" }}>Questions that make them think "yep, that's me"</p>
          {idea.questions.map((q, j) => (
            <div key={j} style={{ display: "flex", gap: 8, marginBottom: j === idea.questions.length - 1 ? 0 : 6 }}>
              <span style={{ color: primary, fontWeight: 700, flexShrink: 0, fontSize: "0.82rem" }}>?</span>
              <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>{q}</p>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: "0.76rem", color: "#7A746E", margin: 0 }}><span style={{ fontWeight: 700, color: "#3D3935" }}>Aimed at:</span> {idea.audience}</p>
    </div>
  );
}
