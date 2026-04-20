"use client";

import { use } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import { useState } from "react";

// Client data
const clientData: Record<string, {
  name: string;
  role: string;
  color: string;
  initials: string;
  todos: { id: string; text: string; owner?: string }[];
  goals: { short: string[]; long: string[] };
  positioning: { headline: string; differentiators: string[]; audiences: { label: string; detail: string }[] };
  messaging: { frame: string; notes: string }[];
  content: { angle: string; notes: string }[];
}> = {
  "1": {
    name: "Andy Felton",
    role: "Founder, Equate Digital",
    color: "#2d5a8e",
    initials: "AF",
    todos: [
      { id: "c1", text: "Post the holiday story — with 2 or 3 photos (Cruise, Norway, husky ride, the storm, the norovirus)", owner: "Andy" },
      { id: "c2", text: "Post one SACK SALLY — owner absence angle. Hook: \"You started a business because of freedom. But right now, you ain't living that dream.\"", owner: "Andy" },
      { id: "c3", text: "Post the bold contrarian differentiator post: \"Most people in this space took a course. I've been building systems for 10 to 15 years. They're not the same thing.\"", owner: "Andy" },
      { id: "p1", text: "See David Maguire at AI networking event (~week of 14th April) — ask how progress is going; ask if he'd comment on SACK SALLY post", owner: "Andy" },
      { id: "p2", text: "Draft commercial approach for Chris Dillon media-monitoring POC", owner: "Andy" },
      { id: "p3", text: "Send Ben voice note on PAPA AI search work (detail: what was the problem, what you proposed, what outcome will be)", owner: "Andy" },
      { id: "o1", text: "Success manager call this week — send Ben recording or detailed notes", owner: "Andy" },
      { id: "o2", text: "Main AI/automation coach session next week — send same to Ben", owner: "Andy" },
      { id: "b1", text: "Maintain 2 posts per week on LinkedIn", owner: "Andy" },
      { id: "b2", text: "Networking: 2 events per week (East Midlands Chamber and AI networking)", owner: "Andy" },
      { id: "b3", text: "Land the first aligned implementation client", owner: "Andy" },
      { id: "b4", text: "Continue N8N community contributions", owner: "Andy" },
    ],
    goals: {
      short: [
        "Land 2–3 AI/automation implementation clients in Q1 2026",
        "Establish consistent LinkedIn presence — 2 posts per week minimum",
        "Complete and share at least one SACK SALLY post series",
        "Position clearly as an implementer, not a consultant or a course-seller",
      ],
      long: [
        "Be the go-to name in the East Midlands for AI-powered business systems",
        "Build a business that runs without Andy being the single point of failure",
        "Develop a repeatable productised service offering",
        "Grow N8N community presence into a lead generation channel",
      ],
    },
    positioning: {
      headline: "I build the AI and automation systems that let founders step back without things falling apart.",
      differentiators: [
        "10–15 years of real systems-building experience — not a course graduate",
        "Implementer, not a consultant — you get something working, not a slide deck",
        "Specialises in N8N, the open-source automation tool that doesn't lock you in",
        "Focused on owner-absence — building businesses that run without the founder in every loop",
        "East Midlands based — rare in this space, a genuine local advantage",
      ],
      audiences: [
        { label: "Primary", detail: "Founders of 5–20 person businesses who are the single point of failure in their own company. They're doing work their systems should be doing." },
        { label: "Secondary", detail: "Directors and ops leads at slightly larger SMEs who know they have a process problem but don't know what good looks like." },
        { label: "Avoid", detail: "People who want AI tools recommended to them. People who want a course. People who aren't ready to change how they work." },
      ],
    },
    messaging: [
      { frame: "The owner-absence test", notes: "If you couldn't step away for two weeks without the business wobbling — that's not a people problem, that's a systems problem. This is Andy's core provocation." },
      { frame: "Humans shouldn't act as API connectors", notes: "If someone in your business is copy-pasting between systems, exporting CSVs, or re-entering data — that's automation work. It's not a job." },
      { frame: "Repeatable beats heroic", notes: "Businesses that rely on one person's memory or heroic effort are fragile. Andy builds the repeatable infrastructure underneath." },
      { frame: "Implementer, not consultant", notes: "You don't get a deck. You get a working system. That distinction matters and it's what separates Andy from most people in this space." },
    ],
    content: [
      { angle: "SACK SALLY series", notes: "11 post ideas built around the owner-absence theme. Each one names a specific broken process (finance chasing, onboarding, reporting) and frames automation as the fix." },
      { angle: "The holiday story", notes: "Personal story post with photos — Cruise, Norway, husky ride, the storm, the norovirus. Human, warm, shareable. Gets engagement before the harder business content." },
      { angle: "Contrarian differentiator", notes: "\"Most people in this space took a course. I've been building systems for 10–15 years. They're not the same thing.\" Bold, direct, filters the right people in." },
      { angle: "N8N community content", notes: "Share what you're learning and building in N8N. Positions you as a practitioner, not a theorist. Attracts peers and potential referrers." },
      { angle: "Client results (when ready)", notes: "The PAPA AI search work, the Chris Dillon POC — once these are complete, the story of what the problem was, what you built, and what changed is gold." },
    ],
  },
  "2": {
    name: "Andy Scott Barrett",
    role: "Founder, Ascott Financial Direction",
    color: "#2e7d4f",
    initials: "ASB",
    todos: [
      { id: "t1", text: "Update LinkedIn headline to: \"I turn financial data into decisions — the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce\"", owner: "Andy" },
      { id: "t2", text: "Update LinkedIn banner with the three lines Ben sent", owner: "Andy" },
      { id: "t3", text: "Upload finalised About section to LinkedIn", owner: "Andy" },
      { id: "t4", text: "Book working photo session with father-in-law (photographer) — natural shots, not corporate headshot", owner: "Andy" },
      { id: "t5", text: "Pursue aerospace East Midlands prospect — follow up when owner returns from trip", owner: "Andy" },
      { id: "t6", text: "Follow up with Manchester client on visit date", owner: "Andy" },
      { id: "t7", text: "Set 30-minute content timer per post — past that point, post and move on", owner: "Andy" },
      { id: "w1", text: "Website: Change 'top-performing FTSE 100 company' to 'Rolls-Royce' throughout", owner: "Andy" },
      { id: "w2", text: "Website: Move Richard Waine testimonial to homepage", owner: "Andy" },
      { id: "w3", text: "Website: Replace contact page copy with the new version Ben sent", owner: "Andy" },
      { id: "w4", text: "Website: Fix name hyphenation — 'Ascott-Barrett' not 'Ascott Barrett'", owner: "Andy" },
      { id: "w5", text: "Website: Update copyright year", owner: "Andy" },
    ],
    goals: {
      short: [
        "LinkedIn headline and About section live and optimised",
        "Working photo session completed — natural, not corporate",
        "Website quick wins done (Rolls-Royce, testimonial, contact page)",
        "First post live — aim for one per week minimum",
      ],
      long: [
        "Become the known name for fractional FD work in UK SMEs",
        "Build inbound enquiry pipeline through LinkedIn content",
        "Land 2–3 more fractional FD clients in 2026",
        "Develop a content rhythm that doesn't feel like a chore",
      ],
    },
    positioning: {
      headline: "I turn financial data into decisions — the bit your accountant isn't there to do.",
      differentiators: [
        "Ex-Rolls-Royce — stress-tested business cases on jet engines, not just spreadsheets",
        "Fractional, not full-time — SMEs get FD-level thinking without the FD salary",
        "Translates numbers into decisions — not just reports",
        "Plain English — no jargon, no intimidation, just clarity",
        "Genuinely enjoys the problem-solving, not just the compliance",
      ],
      audiences: [
        { label: "Primary", detail: "UK SME owners (£1M–£20M revenue) who are making decisions without a proper financial framework. They have an accountant but need someone who thinks strategically." },
        { label: "Secondary", detail: "Business owners going through a growth inflection — raising money, hiring, expanding — who need financial direction, not just bookkeeping." },
        { label: "Avoid", detail: "Startups pre-revenue. Companies that just want cheaper accounting. Anyone who thinks an FD is a luxury." },
      ],
    },
    messaging: [
      { frame: "The accountant gap", notes: "Your accountant tells you what happened. An FD tells you what to do next. Most SMEs only have the first. That gap is expensive." },
      { frame: "Rolls-Royce as credibility", notes: "Stress-testing business cases on jet engines is a specific, visual, memorable credential. Use it deliberately — not as a boast, as a reference point for rigour." },
      { frame: "Data into decisions", notes: "Most businesses are data-rich and decision-poor. Andy turns the numbers into a clear next step. That's the offer in one line." },
      { frame: "Fractional as the smart choice", notes: "You don't need a full-time FD. You need FD-level thinking when it matters. Fractional is the intelligent middle ground." },
    ],
    content: [
      { angle: "The Rolls-Royce stories", notes: "Specific moments from aerospace — a business case that nearly went wrong, a decision that saved millions, what rigour actually looks like under pressure. Credibility through story." },
      { angle: "The accountant gap explained", notes: "What your accountant does vs. what a fractional FD does. Educational, non-threatening, answers the question before it's asked." },
      { angle: "SME financial mistakes", notes: "The most common financial decisions SME owners get wrong — not because they're incompetent, because no one told them. Practical, useful, shareable." },
      { angle: "Behind a client decision", notes: "Walk through a real decision (anonymised) — what the numbers said, what the options were, what you recommended, what happened. Proof of thinking." },
    ],
  },
  "3": {
    name: "Nikki McReynolds",
    role: "Founder, HushAway & The PeacePath",
    color: "#7c3aed",
    initials: "NM",
    todos: [
      { id: "t1", text: "HushAway Pod — build a simple case study framework for the 2-month school placement in Huddersfield", owner: "Nikki" },
      { id: "t2", text: "Post LinkedIn job ad — marketing assistant, ~15 hrs/week. Keep it open: \"email me if interested, we'll build the spec together\"", owner: "Nikki" },
      { id: "t3", text: "Switch outgoing emails to send from Nikki personally (not HushAway brand) — open rates will improve immediately", owner: "Nikki" },
      { id: "t4", text: "Expect an introduction from Colby — take the call, it's worth your time", owner: "Nikki" },
      { id: "t5", text: "Hire a social media VA — ~£20/hr, 15 hrs/week. You are the library. They are the librarian.", owner: "Nikki" },
      { id: "t6", text: "Check SEO weekly — now you're managing the website yourself", owner: "Nikki" },
      { id: "t7", text: "Use the May LinkedIn plan — copy the Claude prompt for each week and generate the post. Done in minutes.", owner: "Nikki" },
      { id: "t8", text: "Drop to 3 posts/week on Instagram, Facebook, TikTok from 1 May — quality over volume", owner: "Nikki" },
      { id: "t9", text: "Start collecting parent testimonials — the school Pod placement is the beginning. PR agencies need a parent saying \"here's what changed.\"", owner: "Nikki" },
      { id: "t10", text: "Protect your mornings — the business needs your best thinking, not your most hours", owner: "Nikki" },
    ],
    goals: {
      short: [
        "First paid HushAway members — from £14.50/month",
        "Migrate LinkedIn newsletter subscribers to your own email list",
        "At least one personal post per week on LinkedIn",
        "Hire marketing assistant and social media VA",
        "Land the right PR relationship",
      ],
      long: [
        "1,000 HushAway members by December 2026 — that's £14,500/month recurring",
        "HushAway in schools — licensing, toolkits for SENCOs, the HushAway POD",
        "Established thought leader in children's emotional regulation",
        "\"I want to look back in ten years and call them the HushAway children.\"",
      ],
    },
    positioning: {
      headline: "Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness.",
      differentiators: [
        "Customisable by design — what works for one ADHD child won't work for another",
        "Advisory circle of 11+ experts: doctors, ASMR researchers, sleep practitioners, neuro-psychologists",
        "55+ children across the world tested it before launch — real evidence, not a beta list",
        "No medical claims — holistic, honest, functional not scientific",
        "Treats children as capable of more than cartoons — enchanted but real",
        "Unusually broad background: nursery owner, corporate trainer, coach, voiceover artist",
      ],
      audiences: [
        { label: "Primary", detail: "Parents of children aged 4–10 with emotional regulation challenges — particularly neurodiverse children. Sceptical of medication, waiting for diagnosis, feel unseen." },
        { label: "Secondary", detail: "Schools — SENCOs, teachers, SEN leads. Underfunded and asked to support ND children without adequate resources." },
        { label: "Emerging", detail: "One-to-one home tutors working with children approved to leave mainstream school. A segment Calm and Headspace won't target specifically." },
      ],
    },
    messaging: [
      { frame: "Push the pause button", notes: "Parents are exhausted. HushAway isn't just for the child — it's for the parent who needs ten minutes of quiet. \"I just want to push the pause button.\" — a real parent. That's the whole brief." },
      { frame: "The bridge before diagnosis", notes: "Families wait years for assessment. HushAway is something they can start tonight — before the diagnosis, before the waiting list." },
      { frame: "Not every day is a superpower day", notes: "Challenge the 'superpower' narrative around ND children. Some days are messy and hard. Children deserve safety as they are — not conditional on being exceptional." },
      { frame: "The legacy", notes: "\"I want to look back in ten years and call them the HushAway children.\" Children who grew up with better emotional tools and a stronger foundation for navigating the world." },
    ],
    content: [
      { angle: "Mum's last words", notes: "\"You go out that door and you keep on walking.\" The most powerful post you haven't written yet. Warm and direct — connects her to why you built HushAway." },
      { angle: "The nursery origin story", notes: "130 children, 30 staff, parents coming in exhausted. You didn't have the tools to help them. That gap is why HushAway exists." },
      { angle: "Portugal sound retreat", notes: "You arrived in high beta. The sound therapist knew before you said a word. You experienced what HushAway does for children — that's your lived proof." },
      { angle: "The superpower myth", notes: "Not every day is a superpower day — some days are really messy. Your strongest contrarian position. Polarising but fair." },
      { angle: "55 children across the world", notes: "What they told you that no researcher could have. Real quotes from children: \"I felt brave.\" \"I feel safe.\" More powerful than any credential." },
    ],
  },
  "5": {
    name: "Solve People",
    role: "Luenna Knight — Director",
    color: "#c95e00",
    initials: "SP",
    todos: [
      { id: "t1", text: "Screenshot the troll comment and turn it into a follow-up post — this is content gold. Do this one first.", owner: "Lue" },
      { id: "t2", text: "LinkedIn to 250 connections by Session 7 (May 5) — connect with directors, accountants, site managers, CIS subcontractors", owner: "Lue" },
      { id: "t3", text: "Instagram to 250 followers — follow construction workers and UK self-employment accounts daily", owner: "Lue" },
      { id: "t4", text: "Decide on email platform with Brett — most commercially important thing not yet done", owner: "Lue + Brett" },
      { id: "t5", text: "Keep posting 2 times per week — story post + value/expertise post each week", owner: "Lue" },
      { id: "t6", text: "Add the plug emoji 🔌 to LinkedIn headline after \"Payroll plug\"", owner: "Lue" },
    ],
    goals: {
      short: [
        "LinkedIn → 250 connections by May 5",
        "Instagram → 250 followers",
        "Email funnel live — platform decided, sequence running",
        "2 posts per week consistently — story + value",
      ],
      long: [
        "People in UK construction know who Solve People is",
        "Workers recommending you to their directors — inbound without cold outreach",
        "Moving from \"new company\" to \"recognised player\" in the market",
        "Brand strong enough to attract inbound without relying on Brett's site connections",
      ],
    },
    positioning: {
      headline: "Guardians of the workers. Simple payroll. No scare tactics.",
      differentiators: [
        "Only construction payroll company that sides with the worker — everyone else talks to directors",
        "No scaremongering — competitors lead with HMRC threats, you lead with clarity",
        "Proactive, not reactive — fix things before they go wrong",
        "Proper insurance included — some leading payroll companies don't even include this",
        "A real face — Lue is the brand. Nobody in payroll is doing this.",
      ],
      audiences: [
        { label: "Workers (Instagram, TikTok)", detail: "Self-employed, paid via CIS. Never had payroll properly explained. Assumes their pay is right. Where they are: Instagram, TikTok." },
        { label: "Directors & Accountants (LinkedIn)", detail: "Runs a construction company using self-employed workers. Sick of fear tactics. Wants a real partner, not just an invoice." },
        { label: "Avoid", detail: "Companies or workers who want to stay in the grey area. Anyone looking for workarounds. People who only respond to fear-based marketing." },
      ],
    },
    messaging: [
      { frame: "Guardians of the workers", notes: "Most payroll companies tell you what could go wrong. You tell people what's actually going on, so nothing goes wrong. Say it clearly, say it often." },
      { frame: "No fear marketing", notes: "Competitors run on HMRC horror stories. You run on clarity. Education beats fear every time. Say so explicitly." },
      { frame: "The outsider advantage", notes: "You didn't come from payroll. You saw immediately what everyone else had stopped seeing — that workers were confused and no-one was helping them." },
      { frame: "Plain English, always", notes: "No jargon. No deliberately confusing language. No making people feel stupid for asking questions. Just proper payroll, done properly." },
    ],
    content: [
      { angle: "The troll comment", notes: "Screenshot it. Lead with the screenshot. Your gracious response is the whole story. Do this one first — don't let the moment pass." },
      { angle: "The KFC video lesson", notes: "Most viral video filmed in a KFC. Studio content got 43 views. Relaxed and real always wins. Keep doing the thing that works." },
      { angle: "\"Why would I speak to a random woman about payroll?\"", notes: "A director actually said this on a cold call. Tell the story exactly as it happened. His accountant outsources payroll anyway. High priority." },
      { angle: "What self-employed actually means", notes: "Most construction workers can't define it. Quick, clear explanation with real examples. Make the confusion visible so people recognise themselves." },
      { angle: "South Africa to Dubai to UK construction", notes: "The full life journey — not the career version. Disarming, warm, nothing like anything else in the payroll world." },
    ],
  },
};

const tabs = [
  { id: "todos", label: "To-Do" },
  { id: "goals", label: "Goals" },
  { id: "positioning", label: "Positioning" },
  { id: "messaging", label: "Messaging" },
  { id: "content", label: "Content Ideas" },
];

export default function ClientDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const client = clientData[id];
  const [activeTab, setActiveTab] = useState("todos");

  if (!client) {
    return (
      <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F1EC"}}>
        <p style={{color: "#7A746E", fontSize: "0.9rem"}}>Dashboard not found.</p>
      </div>
    );
  }

  return (
    <div style={{minHeight: "100vh", background: "#F5F1EC"}}>
      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(245,241,236,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3",
        padding: "14px 0",
      }}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <div style={{
              width: 36, height: 36, borderRadius: 3,
              background: client.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em",
            }}>
              {client.initials}
            </div>
            <div>
              <p style={{fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em"}}>{client.name}</p>
              <p style={{fontSize: "0.68rem", color: "#7A746E", margin: 0}}>{client.role}</p>
            </div>
          </div>
          <div style={{fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", fontFamily: "var(--font-dm-serif), serif"}}>
            BeMore<span style={{color: "#4ec9d0"}}>You</span>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div style={{borderBottom: "1px solid #E0DBD3", background: "rgba(245,241,236,0.6)"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", overflowX: "auto"}}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 20px",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                whiteSpace: "nowrap", border: "none", background: "transparent",
                cursor: "pointer", transition: "color 0.15s ease",
                borderBottom: activeTab === tab.id ? `2px solid ${client.color}` : "2px solid transparent",
                marginBottom: -1,
                color: activeTab === tab.id ? client.color : "#7A746E",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>

        {activeTab === "todos" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Your Actions
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              To-Do List
            </h2>
            <ClientTodoList items={client.todos} clientName={client.name} accentColor={client.color} />
            <CommentBox clientName={client.name} tabName="To-Do" />
          </div>
        )}

        {activeTab === "goals" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Where We're Headed
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              Your Goals
            </h2>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40}}>
              <div style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 20}}>Short Term</p>
                <ul style={{margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14}}>
                  {client.goals.short.map((g, i) => (
                    <li key={i} style={{display: "flex", gap: 12, alignItems: "flex-start"}}>
                      <span style={{width: 7, height: 7, borderRadius: "50%", background: client.color, flexShrink: 0, marginTop: 6}} />
                      <span style={{fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.6}}>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{background: "#1C1C1C", border: "1px solid #1C1C1C", borderRadius: 4, padding: "28px 32px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 20}}>Long Term</p>
                <ul style={{margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14}}>
                  {client.goals.long.map((g, i) => (
                    <li key={i} style={{display: "flex", gap: 12, alignItems: "flex-start"}}>
                      <span style={{width: 7, height: 7, borderRadius: "50%", background: client.color, flexShrink: 0, marginTop: 6}} />
                      <span style={{fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6}}>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <CommentBox clientName={client.name} tabName="Goals" />
          </div>
        )}

        {activeTab === "positioning" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Who You Are & Who You're For
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              Positioning
            </h2>

            <div style={{background: "#1C1C1C", borderRadius: 4, padding: "40px 48px", marginBottom: 24}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 16}}>Your Core Statement</p>
              <p style={{fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#fff", lineHeight: 1.5, fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, margin: 0, fontStyle: "italic"}}>
                "{client.positioning.headline}"
              </p>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24}}>
              <div style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 20}}>What Makes You Different</p>
                <ul style={{margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12}}>
                  {client.positioning.differentiators.map((d, i) => (
                    <li key={i} style={{display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 12, borderBottom: i < client.positioning.differentiators.length - 1 ? "1px solid #E0DBD3" : "none"}}>
                      <span style={{width: 7, height: 7, borderRadius: "50%", background: client.color, flexShrink: 0, marginTop: 5}} />
                      <span style={{fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6}}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 20}}>Who You're For</p>
                <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                  {client.positioning.audiences.map((a, i) => (
                    <div key={i} style={{paddingBottom: 16, borderBottom: i < client.positioning.audiences.length - 1 ? "1px solid #E0DBD3" : "none"}}>
                      <p style={{fontSize: "0.72rem", fontWeight: 700, color: client.color, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px"}}>{a.label}</p>
                      <p style={{fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, margin: 0}}>{a.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <CommentBox clientName={client.name} tabName="Positioning" />
          </div>
        )}

        {activeTab === "messaging" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              How to Talk About What You Do
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              Messaging for Social Media
            </h2>
            <div style={{display: "flex", flexDirection: "column", gap: 2, marginBottom: 40}}>
              {client.messaging.map((m, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 3, padding: "24px 28px"}}>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: client.color, margin: "0 0 8px"}}>{m.frame}</p>
                  <p style={{fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7, margin: 0}}>{m.notes}</p>
                </div>
              ))}
            </div>
            <CommentBox clientName={client.name} tabName="Messaging" />
          </div>
        )}

        {activeTab === "content" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              What to Post
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              Content Ideas
            </h2>
            <div style={{display: "flex", flexDirection: "column", gap: 2, marginBottom: 40}}>
              {client.content.map((c, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 3, padding: "24px 28px", borderLeft: `3px solid ${client.color}`}}>
                  <p style={{fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px"}}>{c.angle}</p>
                  <p style={{fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: 0}}>{c.notes}</p>
                </div>
              ))}
            </div>
            <CommentBox clientName={client.name} tabName="Content Ideas" />
          </div>
        )}

      </div>
    </div>
  );
}
