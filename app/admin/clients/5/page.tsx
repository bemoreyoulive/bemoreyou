"use client";

import { useState } from "react";
import ClientLayout from "@/components/ClientLayout";
import TodoList from "@/components/TodoList";

const tabs = [
  { id: "home", label: "Home" },
  { id: "todos", label: "To-Do" },
  { id: "goals", label: "Goals" },
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines & Bios" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "email", label: "Email Automation" },
  { id: "benstake", label: "Ben's Take" },
];

const todos = [
  { id: "t1", text: "Screenshot the troll comment from the viral post and turn it into a follow-up post — this is content gold. See Content Ideas → May.", owner: "Lue" },
  { id: "t2", text: "LinkedIn to 250 connections by Session 7 (May 5) — connect with directors, accountants, site managers, and CIS subcontractors. See Goals tab for exactly who to search for.", owner: "Lue" },
  { id: "t3", text: "Instagram to 250 followers — follow construction workers, tradespeople, and UK self-employment accounts daily. Use relevant hashtags on every post.", owner: "Lue" },
  { id: "t4", text: "Decide on email platform — this conversation needs to happen before Session 7. A lead magnet is the most commercially important thing not yet in place. See Email tab. Once decided, get the sequence live and update all social bio links to point to the sign-up form.", owner: "Lue + Brett" },
  { id: "t5", text: "Keep posting 2 times per week — use the Content Ideas tab. Story post + value/expertise post each week.", owner: "Lue" },
  { id: "t6", text: "LinkedIn headline — don't forget to add the plug emoji 🔌 after \"Payroll plug\" — it makes it a visual catch when someone scans your profile.", owner: "Lue" },
  { id: "t7", text: "Weekly Monday email from Ben — check for the latest link and delete the old HTML file.", owner: "Lue" },
];

const emails = [
  {
    number: "Email 1",
    timing: "Send Immediately",
    subject: "Right, let's get you sorted 👷🏽",
    body: `Hi [First Name],

Welcome, and fair play for actually clicking the link. Most people just keep scrolling.

I'm Lue from Solve People. We sort out construction payroll, but not like the usual lot. No HMRC horror stories. No jargon. Just someone explaining your payroll in plain English and making sure you're actually set up correctly.

Over the next few emails I'll be sharing stuff that actually helps — what self-employment means, what you should be getting paid, what your payroll company should be doing that they probably aren't.

And if you want to talk it through sooner rather than later, book a quick call below. No pitch. Just a chat.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 2",
    timing: "Day 2",
    subject: "No one's ever properly explained this to you, have they?",
    body: `Hi [First Name],

Here's the honest truth about construction payroll:

Most workers have never had it properly explained.

Not because they're not smart — because the industry has been absolutely terrible at it. Payroll companies confuse everyone on purpose, directors assume you know what's going on, and HMRC sends letters that make no sense whatsoever.

So you just... hope it's right. And crack on.

That's not good enough. And it's not your fault it's ended up this way.

Over the next couple of emails I'll break down the actual basics — what self-employment means, what you should be getting, what questions you should be asking.

And if you want us to just check your setup now, book a call. It's free and I'll tell you straight what I think.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 3",
    timing: "Day 4",
    subject: "Quick question — can you define self-employment?",
    body: `Hi [First Name],

Go on then. What does self-employed actually mean?

Most construction workers say something like "I invoice for my work" or "I'm not on PAYE." That's not quite it, and the difference matters.

Self-employed means you're genuinely running your own business. You decide how you work. You take on financial risk. You can send someone else to do the job if you want.

If someone is telling you what to do, when to do it, and you have to turn up yourself — you're probably being treated as an employee, even if they're calling you self-employed. That's a problem.

If you're not sure which one you are, that's exactly the conversation we have. Free. No catch.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 4",
    timing: "Day 6",
    subject: "HMRC has a test. It's not scary. Here's what it checks.",
    body: `Hi [First Name],

HMRC has a self-employment status test. It sounds terrifying. It genuinely isn't.

It's just four questions:

Control — do you decide how and when you work? Or does your employer tell you?

Risk — if the job goes badly, do you lose money? Or is that all on them?

Substitution — can you send someone else to do the work? Or do they specifically need you?

Integration — are you clearly a separate business, or basically part of their team?

If you're in the grey area on any of those, better to know now than get a letter later.

We run through this with people all the time. Want us to do yours? Book a call and we'll go through it together.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 5",
    timing: "Day 8",
    subject: "Right, here's what we do",
    body: `Hi [First Name],

In case you're wondering what Solve People actually is — here's the short version.

We check you're genuinely self-employed (properly, with the SESS test). We give you contracts that actually protect you. We sort your payroll so you know exactly what you're getting and why. And we explain the whole thing without being weird about it.

We're not your average payroll company. No fear tactics, no deliberately confusing language, no making you feel stupid for asking questions.

Just proper payroll, done properly.

If that sounds like what you've been missing, book a call. We'll have a proper chat and work out if we're the right fit for each other.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 6",
    timing: "Day 10",
    subject: "What does it actually cost?",
    body: `Hi [First Name],

Fair question and I'm not going to dodge it.

The cost depends on your situation — how many workers, what setup you need, what's already in place. We don't do one-size-fits-all pricing because we don't do one-size-fits-all payroll.

What I can tell you: we're not the cheapest. But we include things that other companies charge extra for — like proper insurance and actual guidance, not just invoices.

Best way to find out what it looks like for your situation? Book a call. We'll talk it through honestly and if we're not the right fit, I'll tell you that too.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 7",
    timing: "Day 12",
    subject: "Five things workers keep getting wrong (not their fault)",
    body: `Hi [First Name],

Things I see workers getting wrong all the time. And honestly, none of it's their fault.

1. Assuming "just invoice them" is the same as being self-employed. It's not.

2. Not having a contract. If you haven't got one, you're not protected.

3. Not understanding their deductions. If you don't know what's being taken, you might be losing money you're entitled to.

4. Trusting a payroll company they've never actually spoken to.

5. Assuming it's fine because no-one's said otherwise. That's how the HMRC letters happen.

If any of those hit home, book a call. We'll sort it out.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 8",
    timing: "Day 14",
    subject: "You're not supposed to already know this stuff",
    body: `Hi [First Name],

One thing I keep hearing: "I feel like I should already know this."

You shouldn't. Nobody tells you this stuff. The industry has been rubbish at explaining it for years.

You're not behind. You're not stupid. You just haven't had the right person explain it properly yet.

That's the whole point of Solve People. You should be able to ask questions. You should understand what's on your payslip. And someone should give you a straight answer without making you feel like you've missed something obvious.

Want that conversation? Book a call. I'll explain whatever you're not sure on.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 9",
    timing: "Day 16",
    subject: "If you're a director and you're reading this 👀",
    body: `Hi [First Name],

Most of these emails have been aimed at workers. But if you're a director, this one's for you.

If you've got self-employed workers on your books, you've probably got a nagging feeling about whether your setup is actually right. You've been doing it the same way for years. No-one's complained. But you'd quite like someone to just... check.

That's exactly what we do. We come in, look at your setup, and tell you straight. No scare tactics. No "everything is broken, sign here." Just an honest look at what's in place and what, if anything, needs sorting.

Book a call if you want that conversation. No obligation, no sales pitch.

👉 [BOOK A CALL LINK]

Lue x`,
  },
  {
    number: "Email 10",
    timing: "Day 18",
    subject: "Right, shall we actually talk?",
    body: `Hi [First Name],

You've had ten emails from me now. You know what we think and how we work.

If nothing here has landed for you, no worries — you can unsubscribe below. No hard feelings.

But if any of it felt relevant — the confusion, the payslip questions, the wondering whether your setup is actually right — then let's just have a conversation. Proper one. Not a pitch.

Tell me your situation. I'll tell you what I think. And if we can help, brilliant. If we can't, I'll point you in the right direction anyway.

👉 [BOOK A CALL LINK]

Speak soon.

Lue x`,
  },
];

const contentMonths = [
  {
    month: "April — Already Posted",
    items: [
      { type: "Story", title: "Career journey carousel", notes: "Cabin crew → caravan sales → recruitment → Dubai real estate → Director of Payroll. Repurposed across LinkedIn and Instagram.", status: "Posted" },
      { type: "Story", title: "\"I had no payroll experience when I started this. Yep thats right.\"", notes: "Outsider credibility post on LinkedIn. VIRAL — 21,000 impressions, ~24,000 reach, +25 followers.", status: "Posted" },
      { type: "Story", title: "Work routine post", notes: "Calling out the 4am grind culture and finding a routine that actually works. Instagram.", status: "Posted" },
      { type: "Story", title: "\"It's not about where you are currently — it's about the connections & lessons you've learned along the way.\"", notes: "Instagram carousel.", status: "Posted" },
    ],
  },
  {
    month: "April — Week 3 (21 April)",
    items: [
      { type: "Story", title: "Running a Business on No Sleep", hook: "\"Baby woke me at 1am, 3am, 4am. Had a client call at 9. Honestly, great preparation for construction payroll.\"", notes: "Humanise the chaos. The overlap between being a new mum and building a business. Light and funny, not a pity story.", status: "Unused", platform: "Instagram or LinkedIn text" },
      { type: "Value", title: "Workers Deserve Better Than Confusion", hook: "\"Construction workers have been badly explained their own payroll for decades. That's not their fault. That's an industry failure.\"", notes: "Workers aren't stupid. The industry has failed them. Name the problem, own the solution.", status: "Unused", platform: "Instagram, TikTok, LinkedIn" },
    ],
  },
  {
    month: "April — Week 4 (28 April)",
    items: [
      { type: "Story", title: "Being \"Unmanageable\" Is a Superpower", hook: "\"Every manager I've ever had told me I'm unmanageable. Turns out that's exactly what you need to build a brand in payroll.\"", notes: "You can't be scripted. You don't do polished. You're direct and you push back. That's not a liability, that's what makes clients trust you.", status: "Unused", platform: "LinkedIn or short video" },
      { type: "Value", title: "What \"Self-Employed\" Actually Means", hook: "\"Most construction workers can't actually define self-employment. Their employers assume they understand. HMRC disagrees with everyone.\"", notes: "Quick, clear explanation of what self-employed actually means in construction. Real examples. Make the confusion visible so people recognise themselves.", status: "Unused", platform: "TikTok, Instagram Reels, LinkedIn video" },
    ],
  },
  {
    month: "May — Week 1 (5 May)",
    items: [
      { type: "Story", title: "The KFC Video Origin Story", hook: "\"My most viral video was filmed in a KFC. The most expensive studio content I've ever done got 43 views. I'll let you work out which one I'm doing more of.\"", notes: "The studio session felt forced. You looked like AI. The KFC video went viral because it was real. Talk about why.", status: "Unused", platform: "Short video" },
      { type: "Value", title: "Fear Marketing in Payroll Is Rubbish", hook: "\"Every payroll company in construction runs on fear. 'Do this or HMRC will come for you.' It's gross and it doesn't help anyone.\"", notes: "State your belief clearly. Fear marketing creates defensive clients, not educated ones. Education does the actual work.", status: "Unused", platform: "LinkedIn or TikTok" },
    ],
  },
  {
    month: "May — Week 2 (12 May)",
    items: [
      { type: "Story", title: "\"Why Would I Speak to a Random Woman About Payroll?\" 🔥", hook: "A director actually said this on a cold call. She got off the call fuming.", notes: "HIGH PRIORITY. Tell the story exactly as it happened. Then turn it: his accountant outsources his payroll anyway. The \"random woman\" was probably going to explain his setup better than anyone he'd spoken to. Rides the cultural conversation around exactly this kind of attitude without being preachy.", status: "Unused", platform: "LinkedIn or Instagram caption", priority: true },
      { type: "Value", title: "Three Questions Every Worker Should Ask Their Payroll Company", hook: "\"If your payroll company can't answer these three questions clearly, you probably have a problem.\"", notes: "Three simple questions any construction worker should be able to ask. What the answers should look like. What a bad answer sounds like.", status: "Unused", platform: "Carousel or video" },
    ],
  },
  {
    month: "May — Week 3 (19 May)",
    items: [
      { type: "Story", title: "The Troll Comment That Tried It 🔌", hook: "Posted viral content. Got a comment: \"Perhaps you need to continue getting your hair and nails done.\" Responded graciously. That response is now the post.", notes: "HIGH PRIORITY — DO THIS ONE FIRST. Lead with the screenshot. Lue's gracious reply shows class, confidence, and warmth. The contrast between the pettiness and the dignity is the whole story.", status: "Unused", platform: "LinkedIn or Instagram — screenshot carousel", priority: true },
      { type: "Value", title: "The SESS Test, Without the Drama", hook: "\"HMRC has a test to check if you're actually self-employed. It's not a trap. It takes about two minutes. Here's what it checks.\"", notes: "Walk through the four criteria (control, risk, substitution, integration) in plain English. Make it feel like a helpful check, not a compliance lecture.", status: "Unused", platform: "Carousel or short video" },
    ],
  },
  {
    month: "May — Week 4 (26 May)",
    items: [
      { type: "Story", title: "\"I Already Have a Payroll Company\" — What I Actually Want to Say", hook: "\"I've heard 'I already have a payroll company' more times this month than I've heard my own name.\"", notes: "Name the objection openly. Then: has your current payroll company ever sat down with your workers and explained their status to them?", status: "Unused", platform: "LinkedIn text or video" },
      { type: "Value", title: "20 Years With the Same Payroll Company — Is That Loyalty or Inertia?", hook: "\"The most common thing I hear from directors is: 'We've used the same payroll company for 20 years.' My question back: have you checked if they're still doing it right?\"", notes: "Twenty years doesn't mean twenty years of compliance. The rules change. This isn't a dig — it's just worth asking the question.", status: "Unused", platform: "LinkedIn — targets directors directly" },
    ],
  },
  {
    month: "June — Weeks 1–4",
    items: [
      { type: "Story", title: "First Clients Signed — What That Actually Felt Like", hook: "\"We signed our first clients in March. Here's what they actually wanted, and it wasn't what I expected.\"", notes: "What did they ask? What were they most worried about? What made them trust you? Builds credibility in real time.", status: "Unused", platform: "LinkedIn text or video" },
      { type: "Value", title: "Five Payroll Mistakes Directors Keep Making", hook: "\"Five things construction directors keep getting wrong on payroll. Not because they're incompetent, because no one told them.\"", notes: "Five real, specific mistakes. Non-judgemental. Tone: reassuring, not scolding.", status: "Unused", platform: "LinkedIn carousel or article" },
      { type: "Story", title: "South Africa to Dubai to a Construction Site in the UK", hook: "\"I grew up in South Africa, lived in Dubai, got married in Abu Dhabi, and ended up doing payroll for British construction workers. I couldn't have planned this if I tried.\"", notes: "The full personal journey — not the career version, but the life version. Disarming, warm, nothing like anything else in the payroll world.", status: "Unused", platform: "LinkedIn text or carousel" },
      { type: "Value", title: "What Your Accountant Probably Doesn't Tell You About Construction Payroll", hook: "\"Your accountant is brilliant. They're just not a construction payroll specialist. There's a difference.\"", notes: "Accountants are generalists. CIS and self-employment compliance is a specialism. Not a dig at accountants — just clarity on where the expertise lives.", status: "Unused", platform: "LinkedIn — targets directors and accountants directly" },
      { type: "Story", title: "What Caravan Sales Taught Me About Talking to People", hook: "\"I sold caravans at a holiday park. My clients were usually on their third drink. That's where I learned how to have an honest conversation.\"", notes: "That environment taught her to read people quickly, be direct, and have genuine conversations. That's exactly what makes her good at this now.", status: "Unused", platform: "LinkedIn or Instagram caption" },
      { type: "Value", title: "What Proper Insurance Actually Means for Construction Workers", hook: "\"Some of the biggest payroll companies in construction don't include insurance for workers. Let that sink in.\"", notes: "Break down what insurance workers should actually have, what most payroll companies include (or don't), and why this matters practically.", status: "Unused", platform: "Instagram, TikTok — targets workers directly" },
    ],
  },
  {
    month: "July — Banked",
    items: [
      { type: "Story", title: "Tenerife With a Baby and a Laptop", hook: "\"Booked a flight to Tenerife on Saturday morning for a Sunday 3am departure. Baby came with. Laptop too. Turns out that's my working style.\"", notes: "The chaos and the spontaneity. Filming content from a golf course in the sun. The contrast between 'construction payroll expert' and 'baby on hip in Tenerife.' That contrast IS the brand.", status: "Unused", platform: "Video or Instagram story series" },
      { type: "Value", title: "Decoding Your Payslip", hook: "\"I'm going to explain your payslip in 90 seconds. Every line. What it means. Why it's there.\"", notes: "Pull up a generic payslip. Walk through it line by line in your real voice. Maximum 90 seconds.", status: "Unused", platform: "Short video, TikTok or Reels" },
    ],
  },
];

export default function SolvePeopleDashboard() {
  const [openEmail, setOpenEmail] = useState<number | null>(null);

  return (
    <ClientLayout clientName="Solve People" clientRole="Luenna Knight & Brett Edyvane" clientColor="#c95e00" clientInitials="SP" tabs={tabs}>
      {(activeTab) => (
        <>
          {activeTab === "home" && (
            <div className="space-y-8">
              <div className="rounded-xl p-5" style={{background: "#fff7ed", borderLeft: "4px solid #c95e00"}}>
                <p className="text-sm font-semibold text-orange-800 mb-1">Session 6 — April 17, 2026</p>
                <p className="text-sm text-orange-700 leading-6">Big session. LinkedIn headline updated live. First viral post milestone hit. Real momentum building.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "LinkedIn connections", value: "63", sub: "Target: 250 by May 5" },
                  { label: "Instagram followers", value: "42", sub: "Target: 250" },
                  { label: "Viral post impressions", value: "21,000", sub: "+25 followers from one post" },
                  { label: "Sessions", value: "6", sub: "Since Feb 2026" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-xl font-bold" style={{color: "#c95e00"}}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Who Lue Is</p>
                  <p className="text-sm text-gray-700 leading-6">Director of Solve People. Unfiltered, warm, genuinely funny, and absolutely nothing like anyone else in construction payroll — and that's the entire point. ADHD, hates being pussyfooted around, and will go to Tenerife on 24 hours' notice with a baby in one arm and a laptop in the other. The studio content? Terrible. The KFC video? Viral. She already knows the difference.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">What Solve People Does</p>
                  <p className="text-sm text-gray-700 leading-6">Construction payroll, CIS, self-employed workers. In plain English: makes sure workers who are called "self-employed" actually are — legally, on paper, protected. Checks their status, sorts their contracts, handles their payroll, and explains the whole thing without scaring anyone. Workers get paid properly. Directors don't get a nasty letter from HMRC.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">What's Going Well</h3>
                <div className="space-y-2">
                  {[
                    "LinkedIn about section updated ✓",
                    "LinkedIn headline updated live in Session 6 ✓",
                    "Instagram bio strong and on-brand ✓",
                    "Raw photo carousel format adopted — right move ✓",
                    "Repurposing the same ideas across LinkedIn and Instagram ✓",
                    "Viral post: \"I had no payroll experience\" — 21,000 impressions, 24,000 reach, +25 followers from one post ✓",
                    "Connections up from 49 to 63 ✓",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-lg border border-green-100 px-4 py-2.5">
                      <span className="text-green-500 font-bold text-sm">✓</span>
                      <p className="text-sm text-gray-700">{item.replace(" ✓", "")}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">What Still Needs Fixing</h3>
                <div className="space-y-2">
                  {[
                    "Email funnel not live yet — Lue and Brett need to agree on the platform. A lead magnet is the most commercially important thing outstanding.",
                    "The link in bio still goes to the website — once the email sign-up form is live, this needs to change across every platform.",
                    "Troll comment follow-up post — screenshot it and turn it into content. Don't let the moment pass. See Content Ideas → May.",
                    "More of Lue's personal story still to mine — the viral post proved vulnerability works, keep going.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-red-100 px-4 py-2.5">
                      <span className="text-red-400 font-bold text-sm mt-0.5">!</span>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Next Session</p>
                <p className="text-sm font-bold text-gray-900">Session 7 — Tuesday 5 May, 10am</p>
                <p className="text-sm text-gray-500 mt-1">Between now and then: keep posting 2x per week, hit the connection targets, and get the email platform decision sorted with Brett. Come to the session with your numbers updated.</p>
              </div>
            </div>
          )}

          {activeTab === "todos" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">To-Do List</h2>
                <p className="text-sm text-gray-400">Actions from Session 6 · 17 April 2026</p>
              </div>
              <TodoList items={todos} accentColor="#c95e00" />
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Goals</h2>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Right Now — Next 4 Weeks</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm font-bold text-gray-900 mb-2">LinkedIn → 250 connections</p>
                    <p className="text-sm text-gray-500 mb-3">Currently 63 (up from 49). You need 187 more by Session 7 (May 5) — roughly 56 per week, well within the 30/day limit if you're consistent.</p>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Who to connect with:</p>
                    <ul className="space-y-1.5">
                      {[
                        "Construction company directors — search \"Director\" + \"Construction\". UK. Companies with 10–200 employees.",
                        "Site managers and project managers — they work with self-employed workers and talk to directors. Good referral nodes.",
                        "Accountants who service construction — search \"Accountant\" + \"Construction\" or firms that list CIS as a specialism.",
                        "CIS subcontractors and tradespeople — \"Groundworker\", \"Scaffolder\", \"Electrician\", \"Plasterer\" filtered to UK. These are the workers.",
                        "People who've engaged with your posts — anyone who liked or commented is a warm lead. Always send those requests first.",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-gray-300 mt-1 shrink-0">→</span>{tip}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 rounded-lg p-3" style={{background: "#fff7ed"}}>
                      <p className="text-xs text-orange-700"><strong>When sending requests:</strong> Don't mention payroll. Don't pitch anything. Just be Lue. Something like — "Hi [name], came across your profile and just wanted to say hi 👋 — would love to connect!" Warm, no agenda, no red flags.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm font-bold text-gray-900 mb-2">Instagram → 250 followers</p>
                    <p className="text-sm text-gray-500 mb-3">Currently 42. You need 208 more. Instagram follows back — if you follow the right people, a solid percentage follow back.</p>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Who to follow:</p>
                    <ul className="space-y-1.5">
                      {[
                        "Construction workers — hashtags like #constructionworker #constructionuk #cisscheme #selfemployeduk #tradesmen",
                        "Construction companies — UK-based accounts. Follow the company and the people running it.",
                        "People in the trades — #electrician #scaffolding #groundworks #bricklayer — UK accounts.",
                        "Adjacent self-employment accounts — people posting about working for yourself in the UK.",
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-gray-300 mt-1 shrink-0">→</span>{tip}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 rounded-lg p-3" style={{background: "#fff7ed"}}>
                      <p className="text-xs text-orange-700"><strong>Follow limit:</strong> Don't do it all at once — 50 follows a day over a few weeks is cleaner and avoids Instagram throttling. <strong>Hashtags on every post:</strong> #payrolluk #constructionuk #CIS #selfemployed #constructionpayroll #cisscheme — 5–8 per post, every time.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Next 4–12 Weeks</h3>
                <div className="space-y-3">
                  {[
                    { goal: "Email funnel live", detail: "CRM email sequence set up and running (Brett). Every content piece links to the sign-up form. Emails going out automatically while you sleep. Target: 200+ emails on the list within 12 weeks." },
                    { goal: "LinkedIn active", detail: "1–2 posts per week from personal profile (not the company page). Directors and accountants starting to find you and connect." },
                    { goal: "Positioning locked in", detail: "Everyone who follows you knows: pro-worker, plain English, no scare tactics. Right-fit people coming in, wrong-fit people self-selecting out." },
                    { goal: "Clarity", detail: "Never second-guess what to post. Know exactly who you're speaking to in each piece of content. Can explain the core concepts clearly in your own words." },
                  ].map((g, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{g.goal}</p>
                      <p className="text-sm text-gray-500 leading-6">{g.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Next 3–12 Months</h3>
                <div className="space-y-3">
                  {[
                    { goal: "Become known for this", detail: "People in UK construction know who Solve People is. Workers recommending you to their directors. Inbound enquiries coming in without cold outreach." },
                    { goal: "Content running itself", detail: "Consistent rhythm without it being a constant panic. Your own content instinct, not relying on prompts for every idea. Conversations feeding posts naturally." },
                    { goal: "Business growth", detail: "More enquiries, better quality conversations. Workers bringing their directors inbound. Moving from \"new company\" to \"recognised player\" in the market." },
                    { goal: "Longer term", detail: "Strong enough brand to attract inbound without relying on Brett's site connections. The brand carries weight on its own — people know who you are and what you stand for." },
                  ].map((g, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{g.goal}</p>
                      <p className="text-sm text-gray-500 leading-6">{g.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "positioning" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Positioning</h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">What You Want to Be Known For</p>
                <p className="text-base font-bold text-gray-900">"Guardians of the workers."</p>
                <p className="text-sm text-gray-600 mt-2 leading-6">Most payroll companies tell you what could go wrong. You tell people what's actually going on, so nothing goes wrong. That's the distinction. Say it clearly, say it often.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Your Two Audiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Construction Workers",
                      color: "#c95e00",
                      points: ["Self-employed, paid via CIS", "Never had payroll properly explained to them", "Assumes their pay is right, probably hasn't checked", "Vaguely worried but doesn't know who to ask", "Has received an HMRC letter and had no idea why"],
                      where: "Instagram, TikTok",
                    },
                    {
                      label: "Directors & Accountants",
                      color: "#1a1a18",
                      points: ["Runs a construction company using self-employed workers", "Doing it \"the way they've always done it\"", "Sick of payroll companies using fear tactics", "Wants a real partner, not just an invoice", "Would love to know they're set up correctly"],
                      where: "LinkedIn",
                    },
                  ].map((a, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <p className="text-sm font-bold mb-3" style={{color: a.color}}>{a.label}</p>
                      <ul className="space-y-1.5 mb-3">
                        {a.points.map((p, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-gray-300 mt-1 shrink-0">·</span>{p}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Where they are: {a.where}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl p-4" style={{background: "#fff7ed"}}>
                  <p className="text-sm font-semibold text-orange-800 mb-1">The smart play</p>
                  <p className="text-sm text-orange-700 leading-6">Build trust with workers. Workers talk to their directors. Directors come inbound. The workers are the influencer base. The directors are the revenue base. Lead with workers on Instagram and TikTok. Lead with directors on LinkedIn. Different tone, same mission.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">What Makes You Different</h3>
                <div className="space-y-3">
                  {[
                    { d: "You're on the workers' side", note: "You're the only construction payroll company that sides with the worker. Everyone else talks to directors. You talk to workers first. That's a genuine gap." },
                    { d: "No scaremongering", note: "Competitors lead with HMRC threats. You lead with clarity." },
                    { d: "Proactive, not reactive", note: "You fix things before they go wrong, not afterwards." },
                    { d: "Proper insurance", note: "Some leading payroll companies don't even include this. You do." },
                    { d: "A face", note: "No-one in payroll is putting a real person front and centre. Lue is the brand. That's the unfair advantage." },
                  ].map((d, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{d.d}</p>
                      <p className="text-sm text-gray-500">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Who You're Not For</h3>
                <ul className="space-y-2">
                  {[
                    "Companies or workers who want to stay in the grey area",
                    "Anyone looking for workarounds or rule-bending",
                    "People who only respond to fear-based marketing (you won't do it)",
                    "Directors who want a faceless admin company with no relationship",
                  ].map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                      <span className="text-gray-300 mt-0.5 shrink-0">×</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "headlines" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Headlines & Bios</h2>

              <div className="rounded-xl border-2 p-5" style={{borderColor: "#c95e00", background: "#fff7ed"}}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color: "#c95e00"}}>LinkedIn Headline — LIVE</p>
                <p className="text-sm font-bold text-gray-900">"Payroll plug | We stop self employed workers getting stitched up by paperwork they didn't even know mattered"</p>
                <p className="text-xs text-orange-700 mt-2">One thing to do: add the actual plug emoji 🔌 after "Payroll plug" — it makes it a visual catch when someone scans your profile.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">LinkedIn Headline Options</h3>
                <div className="space-y-3">
                  {[
                    { label: "Option 1 — Clear", chars: "79 chars", headline: "\"We're the payroll company that actually explains it. Director @ Solve People.\"", why: "\"Actually explains it\" does a lot of work in three words. Every director has dealt with a payroll company that confused them. This says: not here." },
                    { label: "Option 2 — Safer", chars: "91 chars", headline: "\"Payroll for construction companies that want to get it right. No scare tactics. Director @ Solve People.\"", why: "\"No scare tactics\" is a direct shot at every competitor. \"Want to get it right\" speaks to the low-level worry most directors carry without voicing it." },
                    { label: "Option 3 — Discussion", chars: "88 chars", headline: "\"Helping construction directors sleep at night since 2025 | Solve People | CIS Payroll\"", why: "\"Sleep at night\" is the real emotion directors feel — quiet dread about whether their setup is okay. Names it without being dramatic." },
                    { label: "Option 4 — Story-led", chars: "97 chars", headline: "\"I came into construction payroll as an outsider. Turns out that's exactly what it needed. | Solve People\"", why: "\"Outsider\" is intriguing. Positions the fresh perspective as a feature, not a drawback. Unusual for LinkedIn, which is exactly the point." },
                    { label: "Option 5 — Plain", chars: "74 chars", headline: "\"Solve People | CIS Payroll | Making sure your workers are actually protected.\"", why: "Simple, factual, and the word \"actually\" implies others are not protecting workers properly. Clean and professional." },
                  ].map((h, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold" style={{color: "#c95e00"}}>{h.label}</span>
                        <span className="text-xs text-gray-400">{h.chars}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{h.headline}</p>
                      <p className="text-sm text-gray-500 leading-6">{h.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">The Bolder Five</h3>
                <div className="space-y-3">
                  {[
                    { label: "Bold", headline: "\"Most payroll companies will scare you into signing. We'd rather just explain it properly.\"", why: "Directly calls out competitor behaviour without naming anyone. Directors who've been scared will nod." },
                    { label: "Bold", headline: "\"Payroll companies have been confusing construction workers for years. We're fixing that.\"", why: "The industry has been failing workers and this says so plainly. Directors who actually care about their people will feel it." },
                    { label: "Bold — Guardians", headline: "\"Guardians of construction workers. Simple payroll. No scare tactics. | Solve People\"", why: "\"Guardians\" is strong and Brett coined it. Paired with \"No scare tactics\" it says everything." },
                    { label: "Cheeky", headline: "\"Your current payroll company probably hasn't explained half of this to you. I will. | Solve People\"", why: "Very cheeky. Very Lue. This one will get comments. Directors who feel it's true will want to know more." },
                    { label: "Punchy", headline: "\"Stop getting stitched up by payroll you don't understand. | Solve People\"", why: "Echoes the Instagram bio language already in use. Consistent brand voice across platforms." },
                  ].map((h, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <span className="text-xs font-bold mb-2 inline-block" style={{color: "#c95e00"}}>{h.label}</span>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{h.headline}</p>
                      <p className="text-sm text-gray-500 leading-6">{h.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Instagram Bio (Workers & TikTok)</h3>
                <div className="space-y-3">
                  <div className="rounded-xl border-2 p-4" style={{borderColor: "#c95e00"}}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color: "#c95e00"}}>Current Bio — Active</p>
                    <p className="text-sm font-semibold text-gray-900">"We stop self employed workers getting stitched up by paperwork they didn't even know mattered. 👇🏽 Click the link below to check your payroll is correct"</p>
                    <p className="text-xs text-gray-500 mt-2">Once Brett's CRM email form is live, the link needs to change across every platform — the sign-up form is where you want people to land, not the homepage.</p>
                  </div>
                  {[
                    { label: "Option 2", bio: "\"Construction payroll, explained properly. No jargon. No scare tactics. Just what you actually need to know. 👇🏽\"", why: "Positions Solve People as the antidote to a confusing industry." },
                    { label: "Option 3 — Punchy", bio: "\"Your payroll might be wrong and no one's told you. We will. 👇🏽 Check your status, link below\"", why: "Alarm without scaremongering — factual, not threatening." },
                    { label: "Option 4 — Personality", bio: "\"Hi, I'm Lue 👋🏽 I explain construction payroll so it actually makes sense. Click below, let's check your setup is right.\"", why: "More personal. Works well once you have a stronger following and people recognise your face." },
                  ].map((b, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <span className="text-xs font-bold mb-2 inline-block" style={{color: "#c95e00"}}>{b.label}</span>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{b.bio}</p>
                      <p className="text-sm text-gray-500">{b.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">About Section</h2>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xs uppercase tracking-widest text-gray-400">Version 1 — Direct & Professional</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{background: "#c95e00"}}>Use this one</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">For LinkedIn · Directors & Accountants · ~1,050 of 2,600 chars</p>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-sm text-gray-700 leading-7 whitespace-pre-line">{`Most payroll companies in construction run on fear. 😬 They scare directors, confuse workers, send letters full of jargon, make everything feel complicated, and then charge you for the privilege of feeling stressed about it.

We built Solve People because honestly, that's just rubbish, and there's a much better way to do this.

🔑 We're on the workers' side, always. We explain self-employment clearly, what it actually means, what your workers are entitled to, and how to make sure everyone is properly set up. No HMRC-threat marketing, no deliberately vague answers, just honest plain-English guidance that actually helps people understand what's going on.

What we do: CIS payroll ✅, self-employment compliance checks ✅, contracts built specifically for construction workers ✅, proper insurance that actually covers people ✅, and proactive guidance so problems don't get a chance to start. ✅

Who we work with: Construction companies and directors using self-employed workers who want a payroll partner that talks to them like a human. Accountants who want clarity instead of confusion. And workers who've never had anyone explain their payroll properly and are quietly wondering if everything is actually right. 🙋🏽

Whether you end up working with us or not, we genuinely just want you to understand what self-employment actually means. That's the whole mission.

If that sounds like what you've been looking for, come say hello. 👋🏽`}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Version 2 — Lue's Voice, Her Story</h3>
                <p className="text-xs text-gray-400 mb-3">Personality-first · Also great for LinkedIn · ~960 of 2,600 chars</p>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-sm text-gray-700 leading-7 whitespace-pre-line">{`Honestly, when I started Solve People I didn't come from payroll. I came from South Africa, then Dubai, then the UK, and into an industry where nobody seemed to be on the workers' side. 🤷🏽‍♀️

That bit genuinely surprised me. The workers, the ones actually doing the job, are the ones paying the fee. And yet every payroll company out there talks to the directors, not them. They confuse the workers, scare the directors, and just kind of hope everyone stays quiet and doesn't ask too many questions.

💪🏽 We're doing the opposite. We sit with workers, explain what self-employment actually means, make sure they're properly set up with the right contracts and proper insurance, and then we tell directors the same thing in plain English without any of the HMRC horror stories.

Simple payroll, people protected. That's it.

If you're a director who wants a payroll partner that actually speaks to you like a human, or a worker who's never had anyone explain what's actually on your payslip, this is for you. 👇🏽

Come say hello. We don't bite. 👋🏽`}</p>
                </div>
                <div className="mt-3 rounded-lg p-4" style={{background: "#fff7ed"}}>
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-widest mb-1">Ben's lens</p>
                  <p className="text-sm text-orange-700 leading-6">Version 1 is the one to lead with on LinkedIn. Version 2 is brilliant and very Lue — it's worth having ready to swap in once you've built more of an audience. My suggestion: use Version 1 for now, and pull the opening two sentences from Version 2 as a short intro post when you launch the page.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Content Ideas</h2>
              <p className="text-sm text-gray-500">Story post + value/expertise post each week. 2 posts per week minimum. Use conversations you're having as fuel — what did a worker or director say this week that surprised you? Post that.</p>

              <div className="space-y-8">
                {contentMonths.map((month, mi) => (
                  <div key={mi}>
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-4" style={{color: "#c95e00"}}>{month.month}</h3>
                    <div className="space-y-4">
                      {month.items.map((item, ii) => (
                        <div key={ii} className={`bg-white rounded-xl border p-4 ${item.priority ? "border-orange-300" : "border-gray-200"}`}>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: item.type === "Story" ? "#fff7ed" : "#f0fdf4", color: item.type === "Story" ? "#c95e00" : "#16a34a"}}>{item.type}</span>
                              {item.priority && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">DO THIS FIRST</span>}
                              {item.status === "Posted" && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Posted</span>}
                            </div>
                            {item.platform && <span className="text-xs text-gray-400 shrink-0">{item.platform}</span>}
                          </div>
                          <p className="text-sm font-bold text-gray-900 mb-1">{item.title}</p>
                          {item.hook && <p className="text-sm text-gray-500 italic mb-2">Hook: {item.hook}</p>}
                          <p className="text-sm text-gray-600 leading-6">{item.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Email Automation</h2>
                <p className="text-sm text-gray-500 leading-6">10-email sequence. Templates are written — just needs a platform decision (Lue + Brett) and then paste and go. Once live, update all social bio links to point to the sign-up form, not the website. Sign every email off as Lue. Nobody opens company emails.</p>
              </div>

              <div className="rounded-xl p-4" style={{background: "#fff7ed", border: "1px solid #fed7aa"}}>
                <p className="text-sm font-bold text-orange-800 mb-1">Most commercially important thing not yet done</p>
                <p className="text-sm text-orange-700">Only 3% of people who see your content are ready to buy right now. The other 97% need nurturing — that's what email does. Without it, everyone who watches and thinks "interesting" just disappears.</p>
              </div>

              <div className="space-y-3">
                {emails.map((email, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setOpenEmail(openEmail === i ? null : i)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{color: "#c95e00"}}>{email.number}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{email.timing}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-sm font-semibold text-gray-700">{email.subject}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{openEmail === i ? "▲" : "▼"}</span>
                    </button>
                    {openEmail === i && (
                      <div className="px-5 pb-5 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-4 mb-2">Subject: {email.subject}</p>
                        <div className="rounded-lg p-4 border border-gray-100" style={{background: "#f9fafb"}}>
                          <p className="text-sm text-gray-700 leading-6 whitespace-pre-line">{email.body}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "benstake" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Ben's Take</h2>
                <p className="text-sm text-gray-400">Strategic recommendations — plain and direct.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Top 3 Priorities Right Now</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "1. Email funnel — Lue + Brett need to decide the platform",
                      flag: "Urgent",
                      flagColor: "#dc2626",
                      points: [
                        "Most commercially important thing not yet done",
                        "Only 3% of people who see your content are ready to buy right now",
                        "The other 97% need nurturing — that's what email does",
                        "Without it, everyone who watches and thinks \"interesting\" just disappears",
                        "Templates are written (see Email tab) — just needs a platform decision and then paste and go",
                        "Once it's live, update all social bio links to point to the sign-up form — not the website",
                        "Sign every email off as Lue. Nobody opens company emails.",
                      ],
                    },
                    {
                      title: "2. LinkedIn — keep going, it's working",
                      flag: "Ongoing",
                      flagColor: "#c95e00",
                      points: [
                        "Headline done ✓. About section done ✓. Viral post hit ✓.",
                        "Directors and accountants are on LinkedIn — this is the commercial channel",
                        "Post from personal profile only — company pages get almost no organic reach",
                        "Connections growing — target 250 by May 5",
                        "1–2 posts per week targeting directors keeps the momentum going",
                        "The viral post proves the formula: honest + personal + no polish = reach",
                      ],
                    },
                    {
                      title: "3. Content — keep going, use the Ideas tab",
                      flag: "Ongoing",
                      flagColor: "#c95e00",
                      points: [
                        "Use the conversations you're having every day as content fuel",
                        "What did a worker or director say to you this week that surprised you? Post that.",
                        "Move away from Canva toward raw carousel posts — more authentic, higher engagement",
                        "3–4 posts per week across channels is enough to build momentum",
                        "Relaxed and real always wins. The KFC video is still the proof.",
                      ],
                    },
                  ].map((r, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="text-sm font-bold text-gray-900">{r.title}</p>
                        <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{background: r.flagColor}}>{r.flag}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {r.points.map((p, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-gray-300 mt-1 shrink-0">→</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Handling the Kickbacks You're Getting</h3>
                <div className="space-y-3">
                  {[
                    {
                      objection: "\"I already have a payroll company\"",
                      response: "The most common one. The real question to ask back: \"Has your current payroll company ever sat down with your workers and explained their status to them?\" Almost certainly not. You're not just another payroll company. You're the one that actually looks after the workers. That's a different product, not just a different price.",
                      content: "Content angle: \"Why switching payroll companies isn't as complicated as you think — and why some directors do it anyway.\"",
                    },
                    {
                      objection: "\"I've got an accountant\"",
                      response: "Classic one. The answer is simple: your accountant has almost certainly outsourced your payroll to a specialist. We are the specialist. Accountants aren't payroll experts in the CIS/self-employment space. They're generalists.",
                      content: "Content angle: \"What your accountant probably doesn't tell you about construction payroll.\" Educational, not a dig — just clarity about where the expertise lives.",
                    },
                    {
                      objection: "The trust and credibility gap",
                      response: "Directors are handing over their workers' wages. They need to trust you won't disappear. The answer is: show the face. The whole reason Lue's personal brand matters is because people trust people, not companies. The more Lue is visible, the faster this barrier drops.",
                      content: "Content angle: \"How do you actually know if your payroll company is legitimate?\" Builds trust by educating people on what good looks like — and Solve People ticks every box.",
                    },
                  ].map((k, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <p className="text-sm font-bold text-gray-900 mb-2">{k.objection}</p>
                      <p className="text-sm text-gray-600 leading-6 mb-2">{k.response}</p>
                      <p className="text-xs text-gray-400 italic">{k.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Key Things to Resolve</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "Personal LinkedIn profile vs. company page — this needs to be settled",
                      body: "Brett wants company page posts. Ben disagrees. The numbers back Ben up. Company pages get almost no organic reach on LinkedIn. Personal profiles do. Lue IS Solve People in the audience's mind right now. You can't outsource that to a logo. Recommendation: Lue posts from personal profile only. Company page can exist but it shouldn't be the posting hub.",
                    },
                    {
                      title: "Speaking to workers vs. directors in the same post",
                      body: "Workers need warmth, plain English, relatable examples. Directors need confidence, credibility, no-nonsense clarity. Before each post, decide: who am I actually speaking to here? Instagram/TikTok → workers. LinkedIn → directors. Simple split.",
                    },
                    {
                      title: "What won't work — don't do this",
                      body: "Generic payroll tips that any company could post. Fear-based messaging — you've said you won't, so don't slip into it. Overly scripted or staged content — relaxed and real always wins. Waiting for perfect before posting — good enough and live beats perfect and unsent. Sending everyone to the website with no email capture.",
                    },
                  ].map((r, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <p className="text-sm font-bold text-gray-900 mb-2">{r.title}</p>
                      <p className="text-sm text-gray-600 leading-6">{r.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">The Bigger Picture</p>
                <p className="text-sm text-gray-700 leading-6">Payroll is boring. You are not. The personality is the whole point — people follow you first, then they start caring about the expertise. That's the order it works in.</p>
                <p className="text-sm text-gray-700 leading-6 mt-2">The KFC video went viral because it was you. The studio content flopped because it wasn't. You already know this. Just keep doing the thing that works.</p>
              </div>
            </div>
          )}
        </>
      )}
    </ClientLayout>
  );
}
