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
const SESSION_LABEL = "Session 15 · 29 April 2026";
const NEXT_MOVE = "This month: post at least once a week and close your leads. Pick up where your conversations left off — follow up, offer a clear next step, and use your Calendly link. Content ideas from today's session are on the Content tab — they came directly from your notes. Your goal this month is to turn at least one of those conversations into a signed client.";

const TABS = [
  { id: "home", label: "Home & To-Do" },
  { id: "sessions", label: "Sessions" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

// ─── TODOS ────────────────────────────────────────────────────────────────────

const TODOS: { id: string; text: string; subtext?: string; section: string }[] = [
  {
    id: "jh1",
    text: "Post at least once a week this month",
    subtext: "Consistency is the priority. You have content ideas from today's session — they're on the Content tab. Pick one, write it, post it. You don't need a long personal story every time. One insight, one angle, a question at the end. Done.",
    section: "Priority — do this first",
  },
  {
    id: "jh2",
    text: "Close your leads this month",
    subtext: "This is the most commercially urgent thing. Follow up on every live conversation — reference something specific from last time, offer a clear next step, and use your Calendly link. The goal is at least one signed client this month. You've done the hard work of getting in the room. Now close the loop.",
    section: "Priority — do this first",
  },
  {
    id: "jh3",
    text: "Ring-fence one BD morning per week",
    subtext: "Structure beats willpower every time. Block a morning in your calendar — same morning each week — and protect it. On that morning: follow up on live conversations, reach out to 3–4 new contacts, and send your Calendly link to anyone who hasn't booked yet.",
    section: "Business development",
  },
  {
    id: "jh4",
    text: "Revisit the About section once power statements are written",
    subtext: "The current About section is good but the framing needs to evolve — more insight, more execution, more impact. Ben will help draft options once you've put words on the page.",
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
    number: 15,
    date: "29 April 2026",
    title: "Back in the Room — Leads, Content, and the Month Ahead",
    summary: "Monthly session. James came in having had a month with limited LinkedIn activity but lots of ideas captured in his phone notes — which we worked through together to extract content angles. We checked in on the live conversations from session 14 and talked through where each one had gone. The session had a practical focus: extracting what's already in his head and turning it into usable content ideas, now live on the dashboard. The two clear priorities for May: post at least once a week (using the ideas we pulled out today) and close the live leads — converting at least one into a signed client.",
    insights: [
      "Ideas exist — they just need to be extracted and structured, not invented from scratch",
      "Monthly sessions suit James's rhythm — gives space between while keeping the accountability alive",
      "Posting consistency matters more than posting perfectly — one observation per week is enough",
      "The leads won't close themselves — follow-up with a specific reference and a clear next step is the mechanism",
    ],
    agreed: [
      "Post at least once a week in May — use content ideas from this session (now on the Content tab)",
      "Follow up on all live conversations this week — specific, personal, clear next step",
      "Ring-fence one BD morning per week in May",
      "Next session: end of May 2026",
    ],
    nextSession: "End of May 2026",
  },
  {
    number: 14,
    date: "Late March 2026 · London (in-person)",
    title: "Duality, Recognition and Redefining Success",
    summary: "First face-to-face session in London. The conversation was less structured than usual — deliberately so. James was reflective, candid, and honest about the duality he's been living: optimistic by default but with a real shadow side that surfaces when stimulation drops. He talked openly about how compliments and recognition still motivate him — and how that's not a flaw, it's a lever to use intentionally. He's actively redefining what success looks like — measuring quality of conversations, not just income. At the time of meeting: 8 live conversations, 2 potential clients in flight. We agreed his next move is the power statements (still outstanding), and a follow-up working session was set for 29 April.",
    insights: [
      "The duality is the human condition — naming it removes its grip",
      "Title has historically been linked to self-worth — that's the work he's actively unwinding",
      "Adrenaline and stimulation are non-negotiable for him — boredom is a trigger, not a state",
      "Recognition matters — own it, don't apologise for it, channel it into the work",
      "Redefining success: measure the quality of the conversations, not just the invoices",
    ],
    agreed: [
      "Write the power statements before 29 April — using real client feedback, not assumptions",
      "Follow through on the 8 live conversations — momentum needs continuity",
      "Continue posting weekly — keep the rhythm going",
      "Bring the brand draft to the next session for joint refinement",
    ],
    nextSession: "29 April 2026",
  },
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

const POSITIONING_FIRST_PERSON: { label: string; text: string; note: string }[] = [
  {
    label: "Option 1 — purpose-led",
    text: "I help leaders move from position to purpose. After 30 years in global people leadership — most recently at Swiss Re — I went independent to do the work I find most meaningful: stepping in as an interim or fractional CPO, advising on people and culture strategy, and coaching senior leaders through the transitions that actually matter. I bring commercial rigour and a human edge. I've been in the room at board level. I've also lived the identity shift myself. That's the combination my clients don't find anywhere else.",
    note: "Use this at networking events or when meeting people 1:1. Lead with the purpose, land on what makes you different. Flows naturally into a conversation.",
  },
  {
    label: "Option 2 — outcome-led",
    text: "I work with leaders and organisations at inflection points — the moments where the people decisions are the commercial decisions. Over 30 years I've run people functions across Zurich, Hong Kong, Tokyo, Paris, and London. Now I operate independently: as an interim or fractional CPO, as a consulting partner on culture and transformation, and as an executive coach. What my clients say about working with me: straight-talking, calm clarity, simplifying the complex. I call out what others won't — with both empathy and edge.",
    note: "Use this when you want to lead with credibility and outcomes rather than identity. Stronger in more formal introductions or with boards and senior stakeholders.",
  },
];

const POSITIONING: {
  headline: string;
  subline: string;
  differentiators: { title: string; body: string }[];
  audiences: { label: string; body: string }[];
  themes: string[];
} = {
  headline: "James Hartley helps leaders move from position to purpose — bringing 30 years of global people leadership, the commercial rigour of a board operator, and the human edge of a coach who's lived the transition himself.",
  subline: "Three delivery vehicles, one voice: Interim & Fractional CPO · Consulting (People, Culture & Transformation) · Executive Coaching.",
  differentiators: [
    {
      title: "30 years inside the room — not theorising from the outside",
      body: "Zurich, Hong Kong, Tokyo, Paris, Singapore, London. Lived through complexity at scale. Most recently in contention for the top HR role at Swiss Re before going independent.",
    },
    {
      title: "Commercial rigour with a human edge",
      body: "His own phrase: execution discipline without being stifled by structure, challenge without ego, momentum without the mess. Brings entrepreneurial risk-taking to people decisions where most go conservative.",
    },
    {
      title: "Purpose as a diagnostic, not a slogan",
      body: "Built 'Our Little Book of Why' for an EMEA HR function — engagement up 30 points, customer satisfaction up 50. Lived proof, not theory. Uses 'why' as a tool in coaching too.",
    },
    {
      title: "Agile, co-creative, allergic to corporate theatre",
      body: "Goes where the energy is. Iterates. Doesn't wait for perfect. Co-creates with clients rather than presenting polished decks at them.",
    },
    {
      title: "Lived experience of identity transition",
      body: "Has been through the title-to-purpose shift himself — not as theory, but as life. Coaches others through similar inflection points with credibility, warmth, and edge.",
    },
    {
      title: "Founder credibility through skin in the game",
      body: "Co-owns the London Cat Clinic with his husband Javier. Has lived through the highs and lows of having personal money at risk. He understands what founders actually feel.",
    },
  ],
  audiences: [
    {
      label: "CEOs & C-Suite of mid-size organisations",
      body: "PE-backed, financial services, professional services, start-up to scale-up. Leaders at genuine inflection points — new leadership, growth phase, cultural shift, post-merger integration. They already know something isn't working. They don't need a framework, they need someone who's been in the room and can move fast. James steps in as an interim or fractional CPO and operates from day one. No ramp-up, no handholding.",
    },
    {
      label: "Senior & emerging leaders at career transitions",
      body: "High-performers who've tied their identity to a title and found it hollow when the title changes or disappears. People who've made it to the C-suite and realised the seat doesn't feel how they expected. Ambitious but not arrogant. Smart but stuck. They want to be challenged, not handled. James coaches them through the identity shift — from what they've built to who they actually are. He's done this himself. That credibility is real.",
    },
    {
      label: "Boards making people decisions that matter",
      body: "Where the cost of a wrong hire, a delayed transformation, or a misread culture is measured in millions — and where the people risk is consistently underestimated relative to commercial risk. Boards that need an honest outside voice before they make a call, not after. James brings 30 years of operational credibility to those conversations. He's not there to validate the decision — he's there to pressure-test it.",
    },
    {
      label: "Who you're not for",
      body: "Leaders who want someone to nod politely and colour inside the lines. Organisations looking for another workshop, another framework, another 60-page deck. People who confuse activity with progress. If you want cautious, consensus-led, everything-approved-by-committee — James is not the right fit and he'll tell you that upfront.",
    },
  ],
  themes: [
    "Title is not identity — and the seat you really want is your own",
    "People risk vs. commercial risk — why organisations get the second right and the first wrong",
    "Performance vs. performance management — when the process consumes the goal",
    "Culture change is doing more of what you want to be known for, not running another workshop",
    "The portfolio career — what it actually takes after 30 years inside one",
    "From the boardroom: what's not being said",
  ],
};

// ─── HEADLINES ────────────────────────────────────────────────────────────────

const HEADLINES: { label: string; text: string; note: string }[] = [
  {
    label: "Current LinkedIn headline",
    text: "Passionate about purpose. Challenges the status quo. Brings energy, empathy & results. Chief People Officer | Executive Coach & Advisor | Culture, Strategy & Transformation Leader | Interim & Fractional Executive",
    note: "Live as of March 2026. Strong values cues but dense and keyword-heavy — works for search, less for human-first impression. Worth a tighter alternative.",
  },
  {
    label: "Alternative — human-first",
    text: "Helping leaders move from position to purpose · Interim & Fractional CPO · Executive Coach · 30 years across Zurich, Hong Kong, Tokyo, Paris, London",
    note: "Leads with the work and the perspective. Geography signals the breadth without listing every credential. Test against the current version for two weeks.",
  },
  {
    label: "Alternative — outcome-led",
    text: "Bringing commercial rigour and a human edge to people decisions that matter · Interim CPO · Coach · Advisor",
    note: "More confident framing of the differentiator. Slightly less searchable — better for the people already in your network.",
  },
];

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

const ABOUT_VERSIONS: { label: string; text: string; note: string }[] = [
  {
    label: "Current About section (live on LinkedIn)",
    text: `I'm a people, culture and transformation leader who's spent 30 years helping organisations get the human side of business right.

After a long corporate career — most recently in senior people leadership at Swiss Re — I went independent to do the work I find most meaningful: stepping in as an interim or fractional Chief People Officer, partnering with leadership teams on culture and transformation, and coaching senior and emerging leaders through career inflection points.

What clients tend to say about working with me: straight-talking, calm clarity, simplifying the complex. I'm motivated by mission. I call out what others won't — with both empathy and edge. I bring execution discipline without being stifled by structure, challenge without ego, momentum without the mess.

If you want someone to nod politely and colour inside the lines, I'm not for you. If you want a partner who'll do the real work — purpose ahead of policy, pragmatism ahead of process — let's talk.`,
    note: "Good values framing. Next iteration should lead with the insight and open with a stronger hook. Will draft three evolved options once power statements are written.",
  },
  {
    label: "Next iteration (draft — for refinement after power statements are done)",
    text: `Thirty years inside organisations teaches you a lot. Some of it you wish you'd learned sooner.

I spent thirty years in corporate life — most of it in large, complex organisations, most recently in senior HR leadership at Swiss Re, before choosing to go independent. Not because corporate life stopped working, but because I wanted to do the parts of it I find most meaningful, with more of the people I actually want to work with.

That's what I do now. I step in as an interim or fractional CPO for organisations at inflection points — the moments where the people decisions and the commercial decisions are the same decision. I partner with leadership teams on culture and transformation. And I coach senior leaders through the transitions that matter: the ones where the title stops feeling like the answer and something more interesting starts to emerge.

I've been through that transition myself. It changes how you coach people through it.

What clients tend to say about working with me: straight-talking, calm clarity, simplifying the complex. I call out what others won't — with both empathy and edge. I bring execution discipline without being stifled by structure, challenge without ego, momentum without the mess.

If you want a partner who'll do the real work, let's talk.`,
    note: "Draft for the next evolution — warmer open, more honest about the journey, keeps the voice. To be finalised once power statements are written and we've refined together.",
  },
];

// ─── PROSPECT CONVERSION QUESTIONS ───────────────────────────────────────────

const PROSPECT_QUESTIONS: { phase: string; intro: string; questions: string[] }[] = [
  {
    phase: "1. Open them up — understand where they are",
    intro: "Before you pitch anything, get them talking. Your goal in the first 5 minutes is to understand what they're actually carrying.",
    questions: [
      "What's taking up most of your headspace at the moment?",
      "What's shifted for you in the last 6–12 months — professionally or personally?",
      "If you could change one thing about how things are going right now, what would it be?",
    ],
  },
  {
    phase: "2. Understand what they've already tried",
    intro: "Most people have attempted to fix this themselves. Find out what hasn't worked and why — that's where the real conversation starts.",
    questions: [
      "Have you worked with a coach or advisor before? What worked and what didn't?",
      "What have you already tried when it comes to [the challenge they've described]?",
      "Why do you think it hasn't shifted yet?",
    ],
  },
  {
    phase: "3. Career direction and clarity",
    intro: "For coaching prospects especially — get specific about what they're trying to achieve, not just what they're trying to escape.",
    questions: [
      "Where do you want to be in two years — and does the path feel clear to you?",
      "Is there a version of your career that excites you that you haven't given yourself permission to pursue?",
      "What does success actually look like for you right now — not what it looked like five years ago?",
    ],
  },
  {
    phase: "4. Influence, visibility and recognition",
    intro: "These often sit underneath the surface. People rarely volunteer it — but when you name it, something shifts.",
    questions: [
      "Do you feel like your contribution is being recognised at the level it should be?",
      "Is there a gap between how you see yourself and how others see you — and does that gap frustrate you?",
      "What would it mean for you to be known for the right things — not just the things that got you here?",
    ],
  },
  {
    phase: "5. Surfacing urgency",
    intro: "This is the most important part of the conversation. Without urgency, there's no decision. Find out what happens if nothing changes.",
    questions: [
      "How long have you been sitting with this?",
      "What's the cost of it staying the same — to you, your career, the people around you?",
      "Is there a point where this becomes a real problem if it's not addressed?",
    ],
  },
  {
    phase: "6. Commitment and readiness",
    intro: "You're not there to convince anyone. But you can help them work out whether they're ready to do the work.",
    questions: [
      "What would have to be true for you to feel like this was the right investment right now?",
      "What's your honest hesitation — is it the time, the cost, or something else?",
      "On a scale of 1–10, how important is resolving this for you right now?",
    ],
  },
  {
    phase: "7. Money resistance",
    intro: "Don't run from it. Address it directly and reframe the investment.",
    questions: [
      "What's the cost of the problem you've just described — in real terms, to you or the business?",
      "If you had clarity / the right person in the CPO seat / a resolved culture issue, what would that be worth?",
      "Is price the real hesitation, or is there something underneath that?",
    ],
  },
  {
    phase: "8. Permission-based close",
    intro: "Don't pitch — invite. The best close is a question that makes the next step feel like their idea.",
    questions: [
      "Based on what you've shared, I think I can help — do you want me to tell you how I work?",
      "Would it be useful for me to outline what a first engagement might look like?",
      "I'm not going to push — but if this resonates, the easiest next step is [X]. Want to do that?",
    ],
  },
];

// ─── CONTENT IDEAS ────────────────────────────────────────────────────────────

const CONTENT_IDEAS: { hook: string; guidance: string; priority: boolean }[] = [
  {
    hook: "The thing your board agreed on faster than any people decision this year",
    guidance: "You observed this in a client's ExCo — a major commercial partnership agreed in one sharp meeting, followed by weeks of performance calibration. Flip it into a post: organisations make bold commercial bets daily but become risk-averse the moment it's a people decision. Why? What's the cost of that gap? End with a question: where are you playing it safe when you should be taking the risk? You've written one strong post in this territory already (the performance vs. performance process one) — this is the next angle in that seam.",
    priority: true,
  },
  {
    hook: "What I heard in a room this week that nobody's saying out loud",
    guidance: "Use something from a recent client conversation — one insight, one observation, one thing someone said that made you think. You don't need to name anyone. 'I was with a leadership team this week...' is enough. The point is to position yourself as someone who's in the room, doing real work, hearing real things. You are the voice for things your clients can't say publicly. One observation is enough — if one person is thinking it, a hundred others are too.",
    priority: true,
  },
  {
    hook: "I used to hide behind a plant pot to avoid an executive I didn't like. Here's what changed.",
    guidance: "You mentioned this in your onboarding — literally hiding to avoid difficult conversations early in your career. That's the hook. The post isn't about the hiding — it's about what happened when you stopped. How facing those conversations with confidence unlocked something you didn't expect. This lands both as a leadership story and as a coaching story. It's also very you — specific, self-deprecating, and with a real point underneath it.",
    priority: false,
  },
  {
    hook: "Three years in. Here's what I got wrong about going independent.",
    guidance: "A reflective post on what you've learned since leaving corporate — but not a greatest hits list. Pick one thing that surprised you. One belief you've had to unlearn. One thing that looked like progress but wasn't. The best version of this is honest and specific. 'I spent the first year waiting for the work to find me. That was a mistake.' You have the material — use it.",
    priority: false,
  },
  {
    hook: "If you want a more courageous culture, you have to do things that require courage.",
    guidance: "You said this on the Powered by People podcast and it's one of your sharpest lines. Build a post around it. Most culture programmes are about explaining the new behaviour. The faster route is doing it visibly — leaders go first. Use a short example (you have plenty: the Swiss Re EMEA story, the offsite where you let the team push back, the moment you stopped explaining and started modelling). End with: what's one thing you keep talking about that you haven't actually done yet?",
    priority: false,
  },
  {
    hook: "Metrics without purpose are meaningless. Here's how I learned that the hard way.",
    guidance: "From the podcast: the EMEA HR function story — engagement up 30 points, customer satisfaction up 50, after you built 'Our Little Book of Why'. The numbers came after the meaning, not the other way round. Tell that story tightly. The post writes itself when you frame it as: 'I used to lead with the dashboard. Now I lead with the why.' Real proof, your voice, lands without sounding like LinkedIn fluff.",
    priority: false,
  },
  {
    hook: "Nobody's alone in their problems. So why does it feel that way in a boardroom?",
    guidance: "You said this spontaneously in session 13 — 'no one is alone in their problems' — and it's genuinely good. Build a post around it: the paradox that senior leaders are surrounded by people but often the most isolated when it comes to the real conversations. Connect it to what you actually do — create the conditions where those conversations can happen. End with a question that makes people feel seen.",
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
  {
    title: "4. Posting weekly is not a vanity exercise — it's how you stay commercially alive",
    body: "Every week you don't post, someone who might have hired you doesn't know you exist. Every week you do post, you're front of mind for the headhunter who saw it, the CEO who shared it with a peer, the former colleague who finally plucked up the courage to reach out. You've already seen this work — CEOs commenting, voice DMs from strangers, people referencing your posts in conversations. That doesn't happen by accident and it doesn't happen in silence. One post a week is not a big ask. It is, however, the difference between a pipeline that refills itself and one that dries up every time you stop looking.",
  },
  {
    title: "5. Visibility builds the reputation that converts to work — but only if it's consistent",
    body: "The people who will hire you are watching you long before they contact you. They read three posts, check your About section, and decide whether you seem like someone worth talking to — before you've said a word to them. That's the job LinkedIn is actually doing for you: running a slow, silent sales process on your behalf, 24 hours a day. But it only works if you keep showing up. A month of silence doesn't just mean missed impressions — it means the impression you leave is of someone who's gone quiet, possibly busy with other things, possibly not that active. Consistent visibility tells the market you're present, in demand, and worth reaching out to. Inconsistency tells them nothing useful.",
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

function GoalItem({ goal, id, slug, accentColor }: { goal: string; id: string; slug: string; accentColor: string }) {
  const [achieved, setAchieved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("goal_states").select("achieved").eq("slug", slug).eq("goal_id", id).single()
      .then(({ data }) => { if (data) setAchieved(data.achieved); });
  }, [slug, id]);

  async function toggle() {
    const next = !achieved;
    setSaving(true);
    setAchieved(next);
    const supabase = createClient();
    await supabase.from("goal_states").upsert(
      { slug, goal_id: id, achieved: next },
      { onConflict: "slug,goal_id" }
    );
    setSaving(false);
  }

  return (
    <div
      onClick={toggle}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10,
        cursor: saving ? "not-allowed" : "pointer",
        opacity: saving ? 0.7 : 1,
      }}
    >
      <div style={{
        flexShrink: 0, width: 20, height: 20, borderRadius: 4, marginTop: 1,
        border: `2px solid ${achieved ? accentColor : "#D1CBC3"}`,
        background: achieved ? accentColor : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s ease",
      }}>
        {achieved && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <p style={{
        fontSize: "0.88rem", color: achieved ? "#9CA3AF" : "#3D3935", lineHeight: 1.6, margin: 0,
        textDecoration: achieved ? "line-through" : "none", transition: "all 0.15s ease",
      }}>{goal}</p>
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
            <NextMoveBox move={NEXT_MOVE} accentColor={COLOR} clientName={NAME} sessionLabel={SESSION_LABEL} animateIn />

            {/* Latest session recap */}
            <div style={{ background: "#f5f3f0", border: `1px solid #d9d4ce`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
              <div style={{ width: 36, height: 36, background: COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>15</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: COLOR, margin: "0 0 4px" }}>Session 15 — 29 April 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#5a544e", margin: 0, lineHeight: 1.6 }}>Monthly session. We extracted content ideas from James's phone notes — they're now live on the Content tab. Two priorities for May: post at least once a week, and close the live leads — converting at least one into a signed client. Next session: end of May 2026.</p>
              </div>
            </div>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "15", sub: "Since July 2025" },
                { label: "Next session", value: "End of May", sub: "Monthly cadence" },
                { label: "Goal this month", value: "Post weekly", sub: "And close at least one lead" },
                { label: "Content ideas", value: "Live", sub: "Check the Content tab" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 20px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.02em", margin: "0 0 4px" }}>{s.value}</p>
                  <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* To-do list */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 16px" }}>Your To-Do List</p>
              <ClientTodoList items={todoItems} clientName={NAME} slug={slug} accentColor={COLOR} onTabLink={setActiveTab} />
            </div>

            {/* Who James is + why we're working together */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>Who you are</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 12px" }}>30 years in corporate HR — most recently in contention for the top people role at Swiss Re — before walking away to build something of his own. Now operating as an interim and fractional CPO, an executive coach, and a consulting partner through IgnitionCraft.</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>Based in London. Spends time in South-West France. Married to Javier. Francophile, cook, entertainer. Optimistic by default — and honest about when that slips.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>Why we're working together</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0 }}>
                  {[
                    "Build a personal brand that reflects who James actually is — not just what he does",
                    "Create a consistent LinkedIn presence that attracts the right interim and coaching work",
                    "Clarify the positioning: one voice across fractional CPO, consulting, and coaching",
                    "Build the business development discipline that corporate life never required",
                    "Move from waiting for work to actively and confidently creating it",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#3D3935", paddingLeft: 16, position: "relative", lineHeight: 1.55 }}>
                      <span style={{ position: "absolute", left: 0, color: COLOR, fontWeight: 700 }}>→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What's in here + what this is */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["Session summaries — what was covered and agreed", "Milestone tracker — your 6-month journey", "Brand assets — positioning, differentiators, audiences", "Content ideas with hooks and guidance", "Ben's recommendations", "Goals — short and long term"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What this is (and isn't)</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["A working document — not a polished presentation", "Everything grounded in your own words and sessions", "Something to review together, not filed and forgotten", "Not a script — scaffolding. You write in your own voice.", "Living — updated after every session"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
                {SESSIONS.map((session, i) => (
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
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: COLOR, marginBottom: 8 }}>Who you are, on the page</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Brand Assets</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Your positioning, headline, About section, differentiators, and target audiences — drawn directly from your sessions, your LinkedIn, and the work we've done together.</p>

            {/* Positioning banner */}
            <div style={{ background: COLOR, color: "#fff", borderRadius: 8, padding: "32px 36px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, margin: "0 0 14px" }}>Positioning Statement</p>
              <p style={{ fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, lineHeight: 1.5, margin: "0 0 14px", letterSpacing: "-0.01em" }}>{POSITIONING.headline}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.85, lineHeight: 1.6, margin: 0 }}>{POSITIONING.subline}</p>
            </div>

            {/* First-person positioning */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 6px" }}>Your Positioning — First Person</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 14px" }}>Two options to use at networking events, in meetings, or when someone asks "so what do you do?". Read them, pick one, make it yours.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {POSITIONING_FIRST_PERSON.map((p, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${COLOR}`, borderRadius: 4, padding: "22px 26px" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: COLOR, margin: "0 0 12px" }}>{p.label}</p>
                    <p style={{ fontSize: "0.92rem", color: "#1C1C1C", lineHeight: 1.8, margin: "0 0 12px", fontStyle: "italic" }}>"{p.text}"</p>
                    <p style={{ fontSize: "0.8rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>{p.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn headline options */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 14px" }}>LinkedIn Headline</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {HEADLINES.map((h, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${COLOR}` : "1px solid #E0DBD3", borderRadius: 4, padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: COLOR, margin: 0 }}>{h.label}</p>
                      {i === 0 && <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 20, background: `${COLOR}18`, color: COLOR, border: `1px solid ${COLOR}33` }}>Live</span>}
                    </div>
                    <p style={{ fontSize: "0.92rem", color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.55, fontWeight: 500 }}>{h.text}</p>
                    <p style={{ fontSize: "0.8rem", color: "#7A746E", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{h.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About section */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 14px" }}>LinkedIn About Section</p>
              {ABOUT_VERSIONS.map((a, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `3px solid ${COLOR}`, borderRadius: 4, padding: "24px 28px", marginBottom: 12 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: COLOR, margin: "0 0 14px" }}>{a.label}</p>
                  <p style={{ fontSize: "0.9rem", color: "#1C1C1C", lineHeight: 1.8, margin: "0 0 14px", whiteSpace: "pre-wrap" }}>{a.text}</p>
                  <div style={{ borderTop: "1px solid #E0DBD3", paddingTop: 12 }}>
                    <p style={{ fontSize: "0.8rem", color: "#7A746E", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{a.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Differentiators */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 14px" }}>What makes you different</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {POSITIONING.differentiators.map((d, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 22px" }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.4 }}>{d.title}</p>
                    <p style={{ fontSize: "0.85rem", color: "#3D3935", margin: 0, lineHeight: 1.65 }}>{d.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audiences */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 14px" }}>Who you're for</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {POSITIONING.audiences.map((a, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 24px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, background: `${COLOR}18`, color: COLOR, border: `1px solid ${COLOR}33` }}>0{i + 1}</div>
                    <div>
                      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 6px" }}>{a.label}</p>
                      <p style={{ fontSize: "0.85rem", color: "#3D3935", margin: 0, lineHeight: 1.65 }}>{a.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messaging themes */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 14px" }}>Messaging themes to mine</p>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "22px 26px" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
                  {POSITIONING.themes.map((t, i) => (
                    <li key={i} style={{ fontSize: "0.88rem", color: "#3D3935", paddingLeft: 18, position: "relative", lineHeight: 1.6 }}>
                      <span style={{ position: "absolute", left: 0, color: COLOR, fontWeight: 700 }}>→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prospect conversion questions */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 6px" }}>Prospect Conversion — Questions That Work</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 14px" }}>Use these in sales conversations and exploratory calls. Not a script — a structure. Work through the phases in order, but follow the conversation. Your goal is to help them articulate what they're carrying, not to pitch at them.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PROSPECT_QUESTIONS.map((section, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 24px" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: COLOR, margin: "0 0 6px" }}>{section.phase}</p>
                    <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.55, margin: "0 0 12px", fontStyle: "italic" }}>{section.intro}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {section.questions.map((q, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: COLOR, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem", marginTop: 1 }}>→</span>
                          <p style={{ fontSize: "0.86rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>"{q}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <CommentBox clientName={NAME} tabName="Brand Assets" slug={slug} />
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
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Goals</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 32px" }}>Tick off goals as you achieve them. Progress saves automatically.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: COLOR, margin: "0 0 16px" }}>Short-term</p>
                {GOALS.short.map((g, i) => (
                  <GoalItem key={i} goal={g} id={`jh-short-${i}`} slug={slug} accentColor={COLOR} />
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: COLOR, margin: "0 0 16px" }}>Long-term</p>
                {GOALS.long.map((g, i) => (
                  <GoalItem key={i} goal={g} id={`jh-long-${i}`} slug={slug} accentColor={COLOR} />
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
