"use client";

import { use, useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import BenUpdateBox from "@/components/BenUpdateBox";
import CommentBox from "@/components/CommentBox";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

// ─── ANDY FELTON DASHBOARD ───────────────────────────────────────────────────

const AF_COLOR = "#2d5a8e";

const afTodos = [
  { id: "c1", text: "Post the holiday story — with 2 or 3 photos", subtext: "Cruise, Norway, husky ride, the storm, the norovirus. Be honest about the ups and downs. Bring in the business subtly at the end — no hard CTA. This is your first post back and it will land well. Don't overthink it.", section: "Content — this fortnight" },
  { id: "c2", text: "Post one SACK SALLY — owner absence angle", subtext: "Shift the focus from Sally to the owner who can't step away. Hook: \"You started a business because of freedom. But right now, you ain't living that dream.\" See the updated SACK SALLY section in Content Ideas for the full brief.", section: "Content — this fortnight" },
  { id: "c3", text: "Post the bold contrarian differentiator post", subtext: "\"Most people in this space took a course. I've been building systems for 10 to 15 years. They're not the same thing.\" Your words from Session 8 — they're ready. Dry tone. Don't over-explain it. Let it land.", section: "Content — this fortnight" },
  { id: "p1", text: "See David Maguire at the AI networking event (~week of 14th April)", subtext: "Ask him in person how things are progressing with the client. Also ask if he'd be willing to comment on a SACK SALLY post — one well-placed comment from someone with the right audience is worth more than another post into the void.", section: "Pipeline actions" },
  { id: "p2", text: "Draft commercial approach for the Chris Dillon media-monitoring POC", subtext: "He's going back to the Mars-owned company with an initial price. You need to have your numbers ready. If that doesn't materialise, he wants to do it anyway. Work out what you'd charge and how you'd structure it.", section: "Pipeline actions" },
  { id: "p3", text: "Send Ben a voice note on the PAPA AI search work", subtext: "Give Ben the detail: what was the problem, what you proposed, what the outcome will be. Don't name the client. Then Ben can help draft a vague case study post once funding is confirmed.", section: "Pipeline actions" },
  { id: "o1", text: "Success manager call this week — send Ben the recording or detailed notes", subtext: "Not a one-minute voice note. Ben needs the substance of what was discussed so he can translate it into updated messaging, headline, and content. If you can record the call, send that.", section: "Offer clarity — critical" },
  { id: "o2", text: "Main AI/automation coach session next week — same deal", subtext: "This is the one that should unlock the niche and offer question. Whatever comes out of it needs to reach Ben in detail. That's what updates the headline, About section, and content direction before 22nd April.", section: "Offer clarity — critical" },
  { id: "b1", text: "Maintain 2 posts per week on LinkedIn", subtext: "Holiday story + SACK SALLY + bold contrarian = three posts for this fortnight. You've got the content. Use the ideas tab if you need a fourth.", section: "Ongoing baseline" },
  { id: "b2", text: "Networking: 2 events per week", subtext: "East Midlands Chamber and AI networking are the constants. Rework your opening intro — lead with the problem you solve, not \"AI and automation.\" People glaze over before you get to the good bit.", section: "Ongoing baseline" },
  { id: "b3", text: "Land the first aligned implementation client", subtext: "Hold outreach until offer clarity lands from your coach sessions. Then go. Don't throw against the wall with an offer that isn't sharp yet.", section: "Ongoing baseline" },
  { id: "b4", text: "Continue N8N community contributions", subtext: "Long-game authority-building. Keep going even when it feels slow.", section: "Ongoing baseline" },
];

const afPositioningDiffs = [
  { title: "You implement. You don't just advise.", body: "A consultant tells a business what's wrong and what they should do. You go in and build it. You're not selling analysis — you're selling a system that works when you walk away. Different promise, different deliverable, different relationship.\n\nYour own words: \"I'm an implementor. I go in and do it.\" That's the thing to build everything else around." },
  { title: "You won't over-promise", body: "\"I'd rather be honest and lose the client than knowingly over-promise.\" You've walked away from clients who expected timelines you knew were fantasy. In a space full of people selling magic, saying the uncomfortable thing is rarer than it should be." },
  { title: "You think before you build", body: "You don't just build whatever the client asks for. You question whether it should exist at all. That slows the sale down. It also means you don't hand off a mess six months later and pretend it's someone else's problem — which is what most people in this space do." },
  { title: "You're deeply technical, not just technically literate", body: "You can talk technical all day. Most people in this space took a course and started selling. You have 20 years of complex delivery work behind you, and you can spot what's going to break before it breaks — because you've seen it break before. You use N8N as your primary platform and you're contributing back to the open-source community. That's not dabbling." },
  { title: "You're honest about complexity", body: "You tell clients what's actually involved rather than what sounds good in a pitch. Someone who tells you the difficult truth before you sign is genuinely rare in this space. The right clients notice." },
  { title: "Your systems have been running for 10 to 15 years — theirs haven't", body: "The new wave of AI and automation practitioners took a course. What they've built has only existed for a year or two — it hasn't been tested under real conditions over time. You've built platforms for national sporting bodies that have been running reliably for over a decade. You know what makes things break at month three, month twelve, year five. They don't. That's not a small gap.\n\nYour words from Session 8: \"I've got the knowledge of delivering those systems that have been running for 10, 15 years, which these guys starting in AI and automation, who haven't come from a technical developer background, don't have.\"\n\nThis belongs in your About section and in your content. It's a specific, earned, and unchallengeable differentiator." },
];

const afHeadlinesCurrent = [
  { text: '"The \'Sheldon\' of AI & automation, connecting systems, fixing fragile workflows, and protecting teams from burnout"', chars: 115, note: "This is the live version as of March 2026. The Sheldon reference is earned. The weakness: it leads with \"AI & automation\" before the value lands, and it reads more like a consultant than an implementor." },
];
const afHeadlinesStrong = [
  { text: '"If your business runs on spreadsheets, workarounds, and people quietly filling in the gaps — I build the systems that fix that | Equate Digital"', chars: 155, note: "Problem-first. Specific. Directly mirrors what your ideal client is living with. \"I build the systems\" is implementor language — not advisory." },
  { text: '"I build systems that hold up — for growing businesses scaling past the point where spreadsheets still work | N8N specialist | Equate Digital"', chars: 148, note: "\"I build\" and \"hold up\" are both doing useful work here. N8N specificity adds technical legitimacy without leading with buzzwords." },
  { text: '"The implementor your growing business needs — someone who doesn\'t just say what needs fixing, but goes in and fixes it | Equate Digital"', chars: 140, note: "Makes the consultant vs implementor distinction explicit and turns it into a positioning advantage." },
  { text: '"I go in and fix the fragile processes holding your business together — before they break properly | The \'Sheldon\' of process and systems | Equate Digital"', chars: 158, note: "Keeps the Sheldon persona. \"Go in and fix\" is active, concrete implementor language. \"Before they break properly\" creates useful urgency without being alarmist." },
  { text: '"Fragile processes, disconnected systems, and people quietly holding it together — I build the fix | 20+ years in complex systems | Equate Digital"', chars: 152, note: "Leads with three specific pain points before the offer. \"I build the fix\" is punchy implementor framing." },
];
const afHeadlinesBold = [
  { text: '"Spreadsheets are where data goes to die. I build what replaces them. | Growing businesses | Process and systems implementor | Equate Digital"', chars: 144, note: "Your best line, used as an opener. \"I build what replaces them\" is clean implementor positioning. No buzzwords, no AI or automation in sight." },
  { text: '"Most people in this space will tell you what to build. I\'m the one who actually builds it — and makes sure it doesn\'t break | Equate Digital"', chars: 143, note: "Calls out the consultant / implementor distinction directly. Confident without being arrogant. Will polarise slightly — which is the point." },
  { text: '"I\'ve built systems for UK Athletics, SwimEngland & England Golf. Now I build them for growing businesses that can\'t afford them to break | Equate Digital"', chars: 158, note: "Uses the credibility you almost never mention. \"Can't afford them to break\" connects the old work to the new context cleanly and honestly." },
  { text: '"Whilst anyone can build a system, the question is whether it\'ll still work in 6 months | I\'m the one who makes sure it does | Equate Digital"', chars: 143, note: "Taken from your own strongest quote, adapted for implementor framing. Positions you as someone who thinks past the build — which is rare." },
  { text: '"Diagnosed with autism. Obsessed with edge cases. Builds systems that hold up under real conditions. That\'s probably related. | Equate Digital"', chars: 144, note: "The most distinctive option. Uses your disclosure openly and turns it into a differentiator. High risk, high reward. Only use this if you're ready to own it." },
];

const afAboutVersions = [
  {
    label: "Version 1 — Problem-led",
    text: `Typically businesses come to me when they're being held together by manual processes, workarounds, and someone quietly filling in the gaps.

They know it's not sustainable. They just don't know what to replace it with, or who to trust to build it properly.

I'm an implementor. Not a consultant who tells you what needs doing. I go in and build it — systems that connect your tools, cut out the manual admin, and replace the fragile workarounds before they become a real problem.

My background is in bespoke software development. I built long-running platforms for UK Athletics, SwimEngland, and England Golf. Not small projects. I think through edge cases before I build anything, and I won't build something unless it's the right answer.

I won't over-promise. If a timeline isn't realistic, I'll say so. If systems work isn't what your problem actually needs, I'll say that too.

I work with founder-led businesses in the 1 to 10 person range where things are starting to crack. If that's you, get in touch.

Founder, Equate Digital. East Midlands.`,
    note: "Leads with the ideal client's own experience. Introduces \"implementor\" plainly and defines it immediately. Keeps the honesty signal prominent. No buzzwords — process and systems language throughout.",
  },
  {
    label: "Version 2 — Credibility-led",
    text: `I've built systems for UK Athletics, SwimEngland, and England Golf. Long-running platforms that had to work reliably. Not just cleverly.

This space is full of people who can tell you what to build. Fewer of them will actually go in and build it. Even fewer have spent two decades figuring out what breaks under real conditions before it breaks.

I build systems for growing businesses — the kind that connect your tools, replace manual processes, and get rid of the fragile workarounds that are quietly slowing your team down.

Whilst anyone can build a system, the question is whether it'll still work in six months. I won't build something for the sake of it. And I'll tell you if it's the wrong answer, even if that's not what you wanted to hear.

I'm autistic. I mention it because it explains how I work: I think in systems, I don't skip edge cases, and I'd rather be thorough than fast. Some clients find that frustrating. The right ones find it exactly what they needed.

If your processes are starting to crack, let's talk.

Founder, Equate Digital. East Midlands.`,
    note: "Opens with proof points. Makes the implementor distinction explicit early. Includes autism disclosure in the context of how you work, not as a personal revelation. More confident in tone.",
  },
  {
    label: "Version 3 — Human-led",
    text: `A few years ago I went through therapy and was diagnosed with autism.

I'm a different person since then. More settled. A lot clearer about how I actually work: methodically, thoroughly, with a strong preference for doing it right over doing it fast.

I build systems for growing businesses — the kind that replace manual processes, connect your tools, and remove the workarounds holding your team back. I go in and do it. I don't just advise. My background is in bespoke software development. Serious platforms for RunBritain, SwimEngland, and England Golf. The businesses I work with now are smaller. The standards aren't.

I work with founder-led businesses in the 1 to 10 person range. Growth has happened, the processes haven't kept up, and they need someone to fix it properly rather than bodge it.

If that's you, I'm worth talking to.

Founder, Equate Digital. East Midlands.`,
    note: "Opens with the personal story — highest risk, highest reward. Works best once you've built some audience trust. \"I go in and do it. I don't just advise.\" is the clearest implementor line in any version.",
  },
];

const afContentStory = [
  { hook: "\"Norway, a storm from Iceland, norovirus, and a husky ride. Three weeks away and here's what I came back thinking.\"", grade: 1, tag: "Post this week", badge: "Personal story + photos", priority: true, guidance: "Your first post back. Lead with the holiday — the waves, the eventful cruise, the norovirus that knocked you out for 36 hours on a sea day, the husky ride in Norway. Be honest and human about it. Then land lightly on the business at the end: what you're back doing, what you're working on. No hard CTA. 2 or 3 photos. This is a reconnection post, not a sales post — but it will land better than almost anything else you could put out right now.", prompts: "What was the best moment of the trip? What was the worst? What did properly switching off for three weeks give you that you hadn't had in a while?", cta: "" },
  { hook: "\"I let my only employee go. And I paid his salary for a year before I did it.\"", grade: 2, tag: "Unused", badge: "Long-form post", priority: false, guidance: "The pivot story — the bespoke web development market collapsing, the decision to let your employee go, the year of covering his salary before making the call. Not a tragedy — a considered, honest decision made with integrity. The move into systems and process implementation follows naturally.", prompts: "What was going through your head in the months before you made the call? What made you keep covering his salary? What did the decision finally feel like when you made it?", cta: "" },
  { hook: "\"I was diagnosed with autism at 30-something. Here's what changed — and what it explained.\"", grade: 4, tag: "Unused", badge: "Long-form post", priority: false, guidance: "Not a trauma narrative — a self-knowledge story. The point: it explained the way you work (methodical, edge-case obsessive, honest to a fault) and made you better at what you do, not worse. You arrive early to understand the room. You think in systems. That's not a bug. Be precise with this — don't leave it open to interpretation.", prompts: "What did you understand about yourself afterwards that you hadn't before? What changed practically in how you work? What did you stop apologising for?", cta: "" },
  { hook: "\"I built the system that handicaps every golfer in England. Nobody I meet at networking events knows that.\"", grade: 1, tag: "Unused", badge: "Story post", priority: false, guidance: "Use the England Golf, UK Athletics, SwimEngland credibility you almost never mention. Deliver it with your natural understatement — which makes it land harder, not softer. Connect the complexity of those systems to the complexity you handle today. This is the implementor credibility story.", prompts: "What made those projects technically hard? What would have happened if they'd broken? Why do you think you rarely bring them up?", cta: "" },
  { hook: "\"On a boat, you can't bodge the navigation and hope for the best. I don't work that way on land either.\"", grade: 1, tag: "Unused", badge: "Story post, no CTA", priority: false, guidance: "The sailing post. Connect the systematic thinking required on a boat — preparation, edge cases, understanding what fails under pressure — to how you approach systems work. Human, grounded, and makes a technical point without sounding technical. No CTA needed for this one.", prompts: "What does sailing actually teach you about preparation? What's the equivalent of \"the conditions changed and your plan didn't\" in a client project?", cta: "" },
];

const afContentBelief = [
  { hook: "\"Whilst anyone can build a system, the question is whether it'll still work in six months.\"", grade: 2, tag: "Unused", badge: "Opinion post", priority: false, guidance: "Your strongest philosophical statement — adapted from your own words and pointed at the implementor positioning. Build a post around it. What does it actually mean in practice? Give examples of systems that get built and break. Position yourself as the person who thinks past the build.", prompts: "What's an example of a system you were asked to build and pushed back on? What did you see that the client didn't? What happened to people who built it anyway?", cta: "If you want someone who'll tell you what the right answer actually is — and then go and build it — I'm in the comments." },
  { hook: "\"I'd rather be honest and lose the client than knowingly over-promise. This has cost me work. I'd do it again.\"", grade: 3, tag: "Unused", badge: "Belief post", priority: false, guidance: "Your integrity as a differentiator — made concrete with a specific instance. The point isn't \"look how honest I am.\" It's \"this is what working with me actually looks like.\" Speak to the client who's been burned by someone who overpromised before.", prompts: "Can you think of a specific conversation where you said the difficult thing and it cost you the work? What did you say? How did the client react?", cta: "If you've had enough of being sold to — let's have a proper conversation instead." },
  { hook: "\"The most expensive thing in a growing business isn't the software. It's the manual processes nobody's noticed yet.\"", grade: 2, tag: "Unused", badge: "Belief post", priority: false, guidance: "Reframe cost. Most founders think of systems work as an added cost — they should be thinking about the hidden cost of not having it. What does it cost in time, errors, and growth ceiling to stay on manual processes?", prompts: "What's the most invisible manual process you've seen in a client's business? What was it actually costing them that they hadn't calculated?", cta: "Happy to do a quick sense-check on what your manual processes are actually costing. No pitch, just an honest number." },
];

const afContentBold = [
  { hook: "\"Everyone's building their own systems now. Good luck with the security audit.\"", grade: 4, tag: "Post this fortnight", badge: "Timely — Claude Code wave", priority: true, guidance: "Claude Code, vibe-coding, AI builders — everyone is suddenly building things they don't fully understand. The wave is real. This is your golden window to talk about the risks from a place of genuine authority. You had this exact conversation with a founder who replaced her entire team with AI, non-technical, and when you asked about security said \"I just tell it to check it.\" That's your post. Not alarmist — factual. Position yourself as the person who can see what they can't.", prompts: "What are the three most common things non-technical builders miss? What's the difference between \"it works on my machine\" and \"it works in production under real conditions\"?", cta: "If you've built something yourself and want a technical eye over it before it causes a problem — that's exactly what I do." },
  { hook: "\"Spreadsheets are where data goes to die.\"", grade: 3, tag: "Unused", badge: "Short punchy post", priority: false, guidance: "One of your best lines. Build a short, punchy post around it. Describe what happens to data in a spreadsheet over time — the drift, the errors, the one person who's the only one who understands the formula. Then explain what replaces it. Direct and specific.", prompts: "What's the most alarming spreadsheet you've encountered in a client's business? What was it supposed to do and what was it actually doing?", cta: "If your spreadsheets have spreadsheets, it might be time to talk." },
  { hook: "\"Most people in this space took a course. I built systems national sports bodies have relied on for years. These are not the same thing.\"", grade: 4, tag: "Unused", badge: "Contrarian, use carefully", priority: false, guidance: "Calls out the market problem directly. Not arrogant — factual. The point is that technical depth matters and most of what's being sold doesn't have it. Deliver it in your natural understated tone. Too much heat and it reads as bitter. Keep it dry.", prompts: "What's the practical difference between what you build and what a non-technical person builds? Where does it actually show up six months down the line?", cta: "If you've been burned by over-confident, under-technical work before, I'm worth a conversation." },
  { hook: "\"A broken process doesn't get better when you build a system around it. It gets faster and more broken.\"", grade: 3, tag: "Unused", badge: "Contrarian post", priority: false, guidance: "Counter-narrative to the hype. The message: systems and process work amplifies what's already there — if your process is broken, systematising it makes things worse. Position yourself as someone who looks at the process first, not the tool.", prompts: "Have you seen this happen? What was the process they systematised and what went wrong? What did it take to unpick it?", cta: "Worth understanding your process before you systematise it. Happy to talk through what that looks like." },
];

const afContentPractical = [
  { hook: "\"Here's what I actually check before I build anything for anyone.\"", grade: 1, tag: "Unused", badge: "Educational post", priority: false, guidance: "A transparency post about your pre-build process. Walk through the questions you ask before touching anything. This isn't a template — it's a demonstration of how you think as an implementor. The right readers will find it reassuring. The wrong ones will find it slow. That's the filter working as it should.", prompts: "What are the first three things you check? What are you actually looking for? What would make you advise against building anything at all?", cta: "If you're thinking about systematising something and want a second opinion before you commit, drop me a message." },
  { hook: "\"The three signs your business has outgrown its processes — and what each one actually means.\"", grade: 1, tag: "Unused", badge: "List post", priority: false, guidance: "Practical, list-based content aimed directly at your ideal client. Be specific — not abstract (\"you're growing\") but concrete (\"your onboarding involves copy-pasting the same information into four different places\"). This is the content that makes people tag their business owner colleagues.", prompts: "What are the patterns you see most often? What do founders usually say when you describe the problem back to them?", cta: "If any of these hit close to home, let's have a conversation about what the fix looks like." },
  { hook: "\"What N8N can actually do — and where it falls short. An honest view.\"", grade: 2, tag: "Unused", badge: "Technical post", priority: false, guidance: "Honest comparison content from someone who uses it daily and contributes back to the community. Share when it's the right choice and when it isn't. This builds technical credibility without being a sales pitch. The N8N community may amplify it.", prompts: "When is N8N genuinely the right choice? When is it the wrong one? What's the most common misunderstanding about what it does?", cta: "Happy to talk through whether it's the right fit for what you're trying to do." },
];

const afContentAuthority = [
  { hook: "\"I've been contributing to N8N's open-source community. Here's what I've learned from it.\"", grade: 1, tag: "Unused", badge: "Authority post", priority: false, guidance: "Authority-building in the process and systems community. Contributing to open source is itself a credibility signal — you're improving the tool, not just using it. A post about what you've been working on and why positions you as a practitioner, not a commentator.", prompts: "What have you contributed? What problem were you solving? What surprised you about the community or the process of contributing?", cta: "If you're working in N8N and want to talk through a problem, I'm usually in the community forum anyway." },
  { hook: "\"A business coach told me my LinkedIn was finally saying something. Here's what changed.\"", grade: 2, tag: "Unused", badge: "Journey post", priority: false, guidance: "Use the third-party validation from Session 7 — the business coach who said your LinkedIn was in the right place. A before/after post about what you changed and what you learned. Shows self-awareness and process without being self-congratulatory.", prompts: "What was your LinkedIn like six months ago? What were you posting and who was it for? What changed? What made the difference?", cta: "If you're in a similar position — posting regularly but not sure it's landing — let's talk." },
  { hook: "\"I implement process and systems for growing businesses. Here's what that actually involves — step by step.\"", grade: 1, tag: "Unused", badge: "Authority / Process post", priority: false, guidance: "A post that walks through what a real engagement looks like from your side. Discovery, diagnosis, build, testing, handover. No jargon — just plain English about how you work. This is the kind of content that makes a business owner think \"that's exactly what I need.\"", prompts: "What does a typical first conversation look like? What do you actually do in the first week? How do you know when the job is done properly?", cta: "If that's the kind of work you need doing, let's have a conversation." },
];

const afContentSack = [
  { hook: "The owner who can't step away", whiteboard: "\"You Started A Business For Freedom. So Why Can't You Leave?\"", grade: 3, tag: "Post this fortnight", priority: true, postCopy: "Most people start a business because of freedom. The idea that you'll work for yourself, set your own hours, take a proper holiday without your laptop open.\n\nBut I keep speaking to founders who can't take a week off without the business quietly wobbling.\n\nNot because their team isn't capable. Because too much of how things actually work lives in the owner's head.\n\nWhat to do when something breaks. How to handle the edge cases. What the process actually is when it isn't written down anywhere.\n\nThat's not a people problem. That's a systems problem.\n\nAnd it's exactly the kind of thing I fix.", cta: "If you couldn't step away from your business for two weeks without it feeling risky — let's talk about what that's actually costing you." },
  { hook: "Data copying between systems", whiteboard: "\"Stop Paying Humans To Copy & Paste\"", grade: 2, tag: "Unused", priority: false, postCopy: "If someone in your business is exporting CSVs, updating spreadsheets, and re-entering data into another system — that's exactly the kind of thing I fix. Humans shouldn't be acting as connectors between tools. If Sally is your integration layer, that's not efficiency. That's fragility. Copy and paste is not a growth strategy.", cta: "If Sally is holding your data together, let's have a conversation about what replaces her." },
  { hook: "Chasing invoices manually", whiteboard: "\"Your Finance Department Shouldn't Be Awkward Emails\"", grade: 2, tag: "Unused", priority: false, postCopy: "If someone is manually checking overdue invoices and sending reminder emails — that's exactly the kind of thing I fix. Software can chase politely. Consistently. Without emotion. If your cash flow depends on Sally remembering who hasn't paid — that's a systems problem. This is plumbing. Not magic.", cta: "If Sally is your accounts receivable process, let's talk about what that's actually costing you." },
  { hook: "Client onboarding chaos", whiteboard: "\"Onboarding Shouldn't Feel Like Panic\"", grade: 2, tag: "Unused", priority: false, postCopy: "New client signs. And someone has to create folders, send welcome emails, set up Slack, update the CRM, and build the tasks. Every single time. From scratch. If onboarding relies on memory, it's fragile. If Sally going on holiday breaks it, it's broken. Repeatable beats heroic every time.", cta: "If your onboarding process lives in Sally's head, let's get it out of there." },
  { hook: "Weekly reporting theatre", whiteboard: "\"Stop Building Monday Morning PowerPoints\"", grade: 2, tag: "Unused", priority: false, postCopy: "If someone spends Monday morning pulling metrics into slides and taking screenshots — that's exactly the kind of thing I fix. Dashboards don't get tired. Screenshots are not infrastructure. Humans should analyse. Systems should aggregate. If your reporting starts with \"log into six platforms,\" we need to talk.", cta: "If Sally is your reporting department, there's a better way to spend her Monday morning." },
  { hook: "The spreadsheet that runs everything", whiteboard: "\"Your Business Is Not A Google Sheet\"", grade: 3, tag: "Unused", priority: false, postCopy: "If your entire operation lives inside one giant spreadsheet — that's exactly the kind of fragility I fix. Spreadsheets are tools. They're not operating systems. If Sally is your workflow engine, that's risky. One accidental delete shouldn't be able to break your business. Infrastructure beats improvisation.", cta: "If your spreadsheets have spreadsheets, it might be time to replace them with something that holds up." },
  { hook: "The handover that breaks everything", whiteboard: "\"Your Business Shouldn't Break When Someone Goes On Holiday\"", grade: 3, tag: "Unused", priority: false, postCopy: "If someone books two weeks off and the whole team quietly panics — that's exactly the kind of thing I fix. When one person holds your processes in their head, you don't have a process. You have a dependency. Holidays should be a break, not a business risk.", cta: "If Sally going on holiday is genuinely a problem for your business, let's fix that before she books the next one." },
  { hook: "The \"I'll just do it quickly myself\" trap", whiteboard: "\"Your Founder Shouldn't Be Your IT Department\"", grade: 4, tag: "Unused", priority: false, postCopy: "If you're the founder and you're the one who knows how everything connects — that's not efficiency. That's a single point of failure. If you're doing the thing nobody else understands, you're not running a business. You're running Sally. And Sally shouldn't be you.", cta: "If you're the person holding your own systems together, let's get that out of your hands." },
  { hook: "The new starter who needs Sally to explain everything", whiteboard: "\"Your Onboarding Manual Shouldn't Be A Person\"", grade: 3, tag: "Unused", priority: false, postCopy: "If every new hire spends their first two weeks following Sally around to understand how things work — that's not training. That's your undocumented process surviving by word of mouth. It worked at three people. It doesn't work at ten. Every time someone new starts and gets trained by Sally, you're proving you need a system.", cta: "If your knowledge lives in people rather than systems, let's talk about what happens when those people leave." },
  { hook: "The proposal that takes Sally four hours to put together", whiteboard: "\"Your Sales Process Shouldn't Start From Scratch Every Time\"", grade: 2, tag: "Unused", priority: false, postCopy: "If every proposal involves copying a previous one, reformatting it, chasing the right numbers from three different places, and hoping Sally remembers to update the client name — that's exactly the kind of thing I fix. A proposal that takes four hours should take forty minutes. The difference is a system that does the legwork.", cta: "If your proposals start with \"where's the last one we sent?\" — let's look at what that's actually costing you in time." },
  { hook: "The Slack message that substitutes for a system", whiteboard: "\"Your Comms Tools Aren't Your Workflow\"", grade: 3, tag: "Unused", priority: false, postCopy: "If your team runs on Slack messages that say \"can you just send me that thing again\" and \"has anyone updated the client yet\" — that's not communication. That's what happens when the system doesn't exist. Slack is for conversations. Not for replacing the process your business is supposed to have. Sally shouldn't need a Slack message to know what to do next.", cta: "If your workflow lives in a chat thread, let's get it out of there and into something that doesn't rely on everyone being online at the same time." },
];

const afMessaging = [
  { title: "Implementor, not consultant", body: "The positioning shift from Session 7. You go in and build it — you don't just advise on it. This is a more specific, more credible, and more honest description of what you do. It also filters the right kind of client (someone who needs it done, not someone who needs a strategy document) and opens the consultant partnership channel.", quote: "\"I'm an implementor. I go in and do it. That's the thing.\"" },
  { title: "The \"don't build it just because you can\" position", body: "Counter-cultural in a space full of hype. Most people build whatever they're asked for. You question whether it should be built at all. This could become your most distinctive voice if you lean into it consistently. It's also what makes you a trustworthy implementor — you won't build something for the sake of billing hours.", quote: "\"Whilst anyone can create systems, the question is whether they should.\"" },
  { title: "The Sheldon persona", body: "Memorable, distinctive, and already sticking with people who meet you. \"Sheldon of AI\" was an unsolicited label from Keith Walker — that's earned, not manufactured. The \"Sheldon says\" device is developing on LinkedIn. Lean into it deliberately. It works because it combines warmth and precision — which is exactly what you are.", quote: "" },
  { title: "Major project credibility — ported across", body: "RunBritain, SwimEngland, England Golf. National governing bodies. You almost never bring these up. The key is making them relevant now: not \"I built big stuff\" but \"I built things that had to work under pressure, reliably, for years — and I bring that same standard to what I do today.\" That's implementor credibility.", quote: "" },
  { title: "Autism as a positioning asset", body: "You're starting to talk about this publicly. Done right — not as a trauma narrative but as an explanation of why you work the way you do — this is genuine differentiation. You arrive early to understand the room. You think through edge cases obsessively. You don't over-promise because ambiguity creates anxiety. For the right clients, these are exactly the qualities they're paying for. Be precise with how you frame it — don't leave it open to interpretation.", quote: "" },
  { title: "SACK SALLY — the recurring content hook", body: "Sally is the person in every growing business who fills the gaps that a system should fill. The format names the specific process, calls out the human cost, and ends with \"that's exactly the kind of thing I fix.\" It's a recognisable recurring series — the more consistent the format, the more memorable it becomes. The whiteboard format on camera gives it a visual identity. Keep going.", quote: "" },
];

const afRecs = [
  { title: "1. Implementor is confirmed — now wait for the offer clarity before updating LinkedIn", body: "You're an implementor. That's settled. You've had the conversation with multiple people and they all agree. The coach sessions this week and next should sharpen the niche and offer within that — what kind of implementation, for whom, doing what specifically.\n\nOnce that's clear: headline updates, About section updates, and content direction all change. Do not update LinkedIn before that conversation. Changing it twice is worse than waiting and doing it once properly. Send Ben the coach session recording or notes as soon as you have them." },
  { title: "2. SACK SALLY — keep it, but interspace it and shift the angle", body: "The low engagement on SACK SALLY isn't because the content is wrong. It's because it's too close to the truth. Business owners don't want to publicly admit they have a Sally problem, especially if Sally or their clients might see it. They're lurking, not liking.\n\nTwo things to do: (1) interspace SACK SALLY with personal story posts that people are more willing to engage with — holiday story, the employee story, the sailing post. (2) Shift some SACK SALLY posts to focus on the owner's absence rather than Sally specifically — it's more emotional, less accusatory, and speaks to the freedom reason people started their business.\n\nAsk David Maguire to comment on a post when you see him at networking. One comment from the right person reaches a whole new audience." },
  { title: "3. Don't lead with \"AI\" or \"automation\" — ever", body: "You know this. People glaze over. Those words have been used so many times in the past few years that they've stopped meaning anything — and they trigger scepticism before you've said a single useful thing. Lead with the problem: manual processes, fragile systems, someone holding things together with sheer effort. The tools are the answer, not the opener.\n\nHeadline, About, posts, networking intro. All of it." },
  { title: "4. Stop underselling your background", body: "You built platforms for national governing bodies. You're not an amateur who took a course. The gap between what you've actually done and how you describe yourself to people is costing you.\n\nRunBritain, SwimEngland, England Golf — that's not a previous career you've moved on from. It's twenty years of building things that had to work under pressure. That's the connection to draw. Not \"I used to do software, now I do this.\" More like: \"I've been building systems that can't break for twenty years. That's exactly what I'm doing now.\"" },
  { title: "5. The first aligned client is the unlock — focus there", body: "The personal brand work is necessary. It's not sufficient on its own. You still need to be actively working the pipeline — the content builds the audience, but the outreach is what converts.\n\nPost-holiday: warm outreach, proper follow-up, and the discipline of booking the next call before you end the current one. That last one sounds small. It isn't." },
  { title: "6. The photos and video — it's time", body: "You know this is a friction point. You also know it's a ceiling if it stays there. The bar isn't a polished headshot — one real photo of you at your desk or on the boat is worth more than a hundred posts without a face. The SACK SALLY whiteboard format actually gives you a natural reason to be on camera without it feeling like a performance. Use it." },
  { title: "7. The autism disclosure — when you're ready, frame it as a feature", body: "You're starting to talk about this publicly. The framing that works is: not \"here's something difficult about me\" but \"here's why I work the way I do.\" The edge-case obsession, the pre-work ritual, arriving early to understand the room before it fills up — those are how you operate. The right clients will find that reassuring. Be precise with it. Don't leave it vague or it'll get interpreted in ways you didn't intend.\n\nWhen you're ready. Not before." },
  { title: "8. The AI self-build wave — this is your window", body: "Claude Code, vibe-coding, AI builders — it's everywhere right now. Everyone is building their own systems and most of them don't know what they don't know. Security vulnerabilities, accessibility failures, SEO problems, code that breaks under real conditions. You've seen this up close — the founder who replaced her team with AI and when asked about security said \"I just tell it to check it.\"\n\nThis is a genuine content window. The people building these things are going to need help when they go wrong. You're the person who can see the problems they can't. Write that post. Don't hide behind a rock thinking this is a threat. It's the opposite." },
  { title: "9. Keep an eye on the runway", body: "As of December 2025, roughly nine months of runway. If conversations aren't converting by mid-2026, the financial pressure changes. You're not in crisis now — active work is on the board and pipeline opportunities are live. But this is worth holding honestly rather than quietly parking. Content builds the pipeline slowly. Outreach works it directly. Both need to be running at the same time." },
];

function GradeDots({ grade }: { grade: number }) {
  const colors = ["#E0DBD3", "#E0DBD3", "#E0DBD3", "#E0DBD3", "#E0DBD3"];
  const activeColors = ["#2e7d4f", "#78b84a", "#c8850a", "#d4680a", "#c0392b"];
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {colors.map((_, i) => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < grade ? activeColors[grade - 1] : "#E0DBD3" }} />
      ))}
      <span style={{ fontSize: "0.7rem", color: "#7A746E", marginLeft: 4 }}>{grade} / 5</span>
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid #E0DBD3", borderRadius: 3, marginBottom: 8, overflow: "hidden" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", background: open ? "#F5F1EC" : "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", fontWeight: 600, fontSize: "0.9rem", color: "#1C1C1C", textAlign: "left" }}>
        {title}
        <span style={{ fontSize: "0.7rem", color: "#7A746E", marginLeft: 8, flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px", background: "#fff", fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  );
}

type ContentIdea = {
  hook: string;
  grade: number;
  tag: string;
  badge?: string;
  priority: boolean;
  guidance?: string;
  prompts?: string;
  cta?: string;
  whiteboard?: string;
  postCopy?: string;
};

function IdeaCard({ idea, isSack = false }: { idea: ContentIdea; isSack?: boolean }) {
  const [open, setOpen] = useState(false);
  const priorityBg = isSack ? "#fff5ee" : idea.priority ? "#f0f7ed" : "#fff";
  const leftBorder = isSack ? "3px solid #6b2a00" : idea.priority ? `3px solid ${AF_COLOR}` : "1px solid #E0DBD3";
  return (
    <div style={{ background: priorityBg, border: "1px solid #E0DBD3", borderLeft: leftBorder, borderRadius: 3, padding: "20px 24px", marginBottom: 8 }}>
      <div style={{ fontWeight: 600, fontSize: "0.95rem", color: isSack ? "#6b2a00" : "#1C1C1C", marginBottom: isSack ? 4 : 12, lineHeight: 1.5 }}>
        {idea.hook}
        {isSack && idea.whiteboard && <div style={{ fontSize: "0.78rem", color: "#8a3a00", fontWeight: 700, marginTop: 4 }}>{idea.whiteboard}</div>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" as const, marginBottom: 12 }}>
        <GradeDots grade={idea.grade} />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 8px", borderRadius: 2, background: idea.priority ? "#e8f5ee" : "#f3f2f0", color: idea.priority ? "#2e7d4f" : "#7A746E" }}>{idea.tag}</span>
        {idea.badge && <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, padding: "3px 8px", borderRadius: 2, background: isSack ? "#fff0e6" : "#f0f4ff", color: isSack ? "#8a3a00" : "#2d5a8e" }}>{idea.badge}</span>}
      </div>
      <button onClick={() => setOpen(o => !o)} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: AF_COLOR, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
        {open ? "Hide detail ▲" : "Show detail ▼"}
      </button>
      {open && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #E0DBD3", display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {isSack && idea.postCopy && (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Post copy</p>
              <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" as const }}>{idea.postCopy}</p>
            </div>
          )}
          {!isSack && idea.guidance && (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Guidance</p>
              <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.7 }}>{idea.guidance}</p>
            </div>
          )}
          {idea.prompts && (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Prompting questions</p>
              <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.7 }}>{idea.prompts}</p>
            </div>
          )}
          {idea.cta && (
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>CTA</p>
              <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.7 }}>{idea.cta}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const AF_TABS = [
  { id: "home", label: "Home & To-Do" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

function Callout({ type, children }: { type: "green" | "amber" | "blue" | "orange"; children: React.ReactNode }) {
  const styles: Record<string, { background: string; borderColor: string; color: string }> = {
    green: { background: "#edf7f0", borderColor: "#2e7d4f", color: "#1a4a2e" },
    amber: { background: "#fff8e6", borderColor: "#c8850a", color: "#5a3a00" },
    blue: { background: "#e8f0fa", borderColor: "#2d5a8e", color: "#1a3a5c" },
    orange: { background: "#fff0e6", borderColor: "#c95e00", color: "#6b2a00" },
  };
  const s = styles[type];
  return (
    <div style={{ background: s.background, borderLeft: `3px solid ${s.borderColor}`, borderRadius: 3, padding: "14px 18px", fontSize: "0.88rem", color: s.color, lineHeight: 1.7, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function AndyFeltonDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");
  const [contentSubTab, setContentSubTab] = useState("story");
  const [aboutVersion, setAboutVersion] = useState(0);

  const afTodoItems = afTodos.map(t => ({ id: t.id, text: t.text, owner: "Andy" }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "14px 0" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: AF_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>AF</div>
            <div>
              <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>Andy Felton</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Equate Digital · April 2026 · Session 8</p>
            </div>
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", fontFamily: "var(--font-dm-serif), serif" }}>BeMore<span style={{ color: "#4ec9d0" }}>You</span></div>
        </div>
      </nav>

      <div style={{ borderBottom: "1px solid #E0DBD3", background: "rgba(245,241,236,0.6)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", overflowX: "auto" }}>
          {AF_TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "14px 20px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", border: "none", background: "transparent", cursor: "pointer", borderBottom: activeTab === tab.id ? `2px solid ${AF_COLOR}` : "2px solid transparent", marginBottom: -1, color: activeTab === tab.id ? AF_COLOR : "#7A746E" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 36px" }}>

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={AF_COLOR} />
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>April 2026 · Session 8</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Andy F — Client Dashboard</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What this is</h3>
                <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>A working strategy document — not a polished deck. Everything in here is based on our sessions together. It'll evolve as things move forward. Use it to review, challenge, and track what we're building. If something doesn't feel right, say so.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>What's in here</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Positioning strategy, audience, and implementor shift", "LinkedIn headline options", "About section drafts", "Content ideas by type, including SACK SALLY", "Messaging and differentiation", "Ben's strategic recommendations", "Short and long-term goals"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.85rem", color: "#7A746E" }}>→ {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 28 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 6px" }}>Who you are and what you actually do</h2>
              <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: "0 0 16px" }}>Plain English. No jargon. No buzzwords that make people glaze over.</p>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 12px" }}>You're the founder of Equate Digital, a one-person implementation business based in the East Midlands. You build systems for growing businesses — connecting their tools, stripping out the manual processes that slow them down, getting rid of the fragile workarounds that only hold together because someone is doing it manually.</p>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 12px" }}>Your background is in bespoke software development. You built long-running platforms for RunBritain (UK Athletics), BUCScore (BUCS), OMS (SwimEngland), and the England Golf Handicapping system. Not small projects. That same instinct — edge cases, reliability, doing it properly — is what you bring now.</p>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>You're deeply technical. Most people in this space aren't. That gap matters more than anything else on the list.</p>
            </div>

            <Callout type="green">
              <strong>Where we are, April 2026 — post Session 8:</strong> Implementor positioning is confirmed. You've landed a piece of AI work with an existing client (PAPA), have a media-monitoring opportunity with Chris Dillon, and David Maguire looks likely to convert in May. An external AI/automation business coach is now helping you nail the offer and niche. Hold outreach until that clarity lands — then it all updates: headline, About section, content direction. Next session: <strong>22nd April, 11am BST.</strong>
            </Callout>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "28px 32px", marginBottom: 32 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 12px" }}>Why we're working on this</h2>
              <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>You pivoted from software development to process and systems implementation in early 2025 after the bespoke web dev market dried up. Strong skills, real integrity, no clear story about who you were for. Three months in, the positioning is largely sorted. Content is landing with the right people offline. The sticking point is converting the first properly-aligned client, and getting the LinkedIn work in front of enough of the right people — not just thrown against a wall and hoped for.</p>
            </div>

            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px" }}>Your To-Do List — Now to 22nd April</h2>
            <p style={{ fontSize: "0.8rem", color: "#7A746E", margin: "0 0 24px" }}>Updated after Session 8 on 8th April. Tick things off as you go.</p>

            {["Content — this fortnight", "Pipeline actions", "Offer clarity — critical", "Ongoing baseline"].map(section => {
              const sectionItems = afTodos.filter(t => t.section === section);
              return (
                <div key={section} style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 10 }}>{section}</p>
                  <ClientTodoList
                    items={sectionItems.map(t => ({ id: t.id, text: t.text, owner: "Andy" }))}
                    clientName="Andy Felton"
                    slug={slug}
                    accentColor={AF_COLOR}
                  />
                </div>
              );
            })}

            <CommentBox clientName="Andy Felton" tabName="Home" slug={slug} />
            <BenUpdateBox slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={AF_COLOR} />
        )}

        {/* ── POSITIONING ── */}
        {activeTab === "brand" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>Your Brand Foundation</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Positioning</h2>

            <Callout type="green">
              <strong>Session 8 confirmed — implementor positioning is settled:</strong> You've had the implementor conversation with multiple people and all of them agree it's the right distinction. You go in and build it. You don't advise. The offer and niche are being refined with a specialist AI/automation business coach — once that lands, the headline, About section, and content direction all update. Hold for that clarity. Don't change anything on LinkedIn until you have it.
            </Callout>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 16 }}>Primary audience</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 16px", paddingBottom: 16, borderBottom: "1px solid #E0DBD3" }}>Growing businesses in the 1 to 10 employee range. Founder-led. Processes are breaking under growth pressure. Spreadsheets have become a liability. The founder knows it's unsustainable but doesn't know what to replace it with. Also: consultants and agencies who need a trusted implementor as a delivery partner.</p>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 12 }}>Secondary audience</p>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>Other consultants — specifically, those who identify the problems but need someone technically capable of delivering the solution. David's introduction is the first version of this model. Worth treating as a test bed.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2e7d4f", marginBottom: 12 }}>Good fit</p>
                <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, paddingBottom: 16, borderBottom: "1px solid #E0DBD3" }}>
                  {["Recognises they have process problems, not defensive about it", "Has budget and is ready to invest in a proper fix", "Respects technical expertise, doesn't want cheap", "Values honesty over a polished pitch", "Open to being educated, not just sold to"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.88rem", color: "#3D3935", display: "flex", gap: 8 }}><span style={{ color: "#2e7d4f", fontWeight: 700 }}>✓</span>{item}</li>
                  ))}
                </ul>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8850a", marginBottom: 12 }}>Poor fit</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                  {["Charities — no budget", "Solopreneurs — often no budget, not ready", "Clients who want \"clever\" without caring if it works long-term", "Anyone who doesn't respect technical expertise", "Anyone who drains your social energy — you know who these people are"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.88rem", color: "#3D3935", paddingBottom: 6, borderBottom: i < 4 ? "1px solid #E0DBD3" : "none" }}>— {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>What Makes You Different</h3>
            {afPositioningDiffs.map((d, i) => (
              <Collapsible key={i} title={d.title} defaultOpen={i === 0}>
                <p style={{ whiteSpace: "pre-line", margin: 0 }}>{d.body}</p>
              </Collapsible>
            ))}

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>The Core Positioning Insight</h3>
            <Callout type="blue"><strong>Implementation matters more than the idea.</strong> Most selling in this space happens at the idea level. You work at the delivery level — where things actually fail. That's the distinction. It's underweighted in how you talk about yourself, and it shouldn't be.</Callout>
            <Callout type="amber"><strong>Gap to close: No social proof in the new niche yet.</strong> Your credibility from RunBritain, SwimEngland, and England Golf is real — but it needs to be translated into the current context. The first aligned client is the unlock.</Callout>

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px" }}>Prep for 22nd April — Offer Clarity Session</h3>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 16px" }}>This session is about translating whatever comes out of the coach sessions into concrete positioning, messaging, and content updates.</p>
            {[
              { q: "What did the coach sessions clarify about your offer and niche?", a: "Send Ben the details before the session — the recording or full notes, not a one-minute summary. If the niche is sharpened, that changes the headline, the About section, and the content direction. Come with your thinking on what's changed." },
              { q: "How does the networking intro need to change?", a: "Right now you still lead with AI and automation when you introduce yourself at networking events. People glaze over before you've got to anything useful. The fix: lead with the problem — \"I help growing businesses that are being held together by manual processes and fragile workarounds\" — and mention the tools further in, once they're already interested." },
              { q: "What's the PAPA case study angle?", a: "You upsold AI work to an existing web client by identifying an opportunity they hadn't seen. That's a strong content story — spotting the gap, proposing the fix, getting the yes. Once funding is confirmed and you've sent Ben the voice note, there's a post there. Bring an update on 22nd April." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fffaf6", border: "1px solid #e8c4a0", borderRadius: 4, padding: "18px 22px", marginBottom: 12 }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#8a3a00", margin: "0 0 8px" }}>{item.q}</h4>
                <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
              </div>
            ))}

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>Key Messaging Angles</h3>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 20px" }}>The angles, language patterns, and distinctions that define how you communicate. Note: you've been advised not to lead with "AI" or "automation" — people glaze over. Process and systems language lands better.</p>
            {afMessaging.map((m, i) => (
              <Collapsible key={i} title={m.title} defaultOpen={i === 0}>
                <p style={{ margin: "0 0 12px" }}>{m.body}</p>
                {m.quote && <blockquote style={{ borderLeft: "3px solid #E0DBD3", paddingLeft: 16, margin: "12px 0 0", color: "#7A746E", fontStyle: "italic", fontSize: "0.9rem" }}>{m.quote}</blockquote>}
              </Collapsible>
            ))}

            <div style={{ height: 1, background: "#E0DBD3", margin: "28px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>Language That Works</h3>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 28px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.8rem", color: "#7A746E", marginBottom: 14 }}>From your own words. This is the language that sounds like you and resonates with the right audience.</p>
              {[
                "\"Building and solving stuff is my pet subject.\"",
                "\"Whilst anyone can create systems, the question is whether they should.\"",
                "\"I'd rather be honest and lose the client than knowingly over-promise.\"",
                "\"If your agency runs on spreadsheets, workarounds, and outdated systems, we should probably talk.\"",
                "\"Spreadsheets are where data goes to die.\"",
                "\"This is plumbing. Not magic.\"",
                "\"I'm an implementor. I go in and do it.\"",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "0.9rem", color: "#1C1C1C", padding: "8px 0", borderBottom: i < 6 ? "1px solid #E0DBD3" : "none", margin: 0 }}>{line}</p>
              ))}
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>What Your Ideal Client Is Thinking</h3>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 28px", marginBottom: 40 }}>
              {[
                "\"I know this is a problem. I just don't know how to fix it.\"",
                "\"I need someone who understands the technical side so I don't have to.\"",
                "\"I've wasted money on people who over-promised. I need someone straight.\"",
                "\"We've outgrown our processes but I don't know what the next step looks like.\"",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "0.9rem", color: "#1C1C1C", padding: "8px 0", borderBottom: i < 3 ? "1px solid #E0DBD3" : "none", margin: 0 }}>{line}</p>
              ))}
            </div>

            <CommentBox clientName="Andy Felton" tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── HEADLINES ── */}
        {activeTab === "headlines" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>LinkedIn Headlines</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Headlines</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 32px" }}>Current headline, strong options, and bolder options — all reflecting the implementor positioning. Max 220 characters. Avoid leading with "AI" or "automation" — people glaze over.</p>

            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 12 }}>Current headline</p>
            {afHeadlinesCurrent.map((h, i) => (
              <div key={i} style={{ background: "#fff8e6", border: "1px solid #e8c97a", borderRadius: 4, padding: "16px 20px", marginBottom: 12 }}>
                <p style={{ fontStyle: "italic", fontSize: "0.95rem", color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.5 }}>{h.text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>{h.note}</p>
                  <span style={{ fontSize: "0.7rem", color: "#7A746E", flexShrink: 0 }}>{h.chars} chars</span>
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 12 }}>5 strong options — implementor-led</p>
            {afHeadlinesStrong.map((h, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "16px 20px", marginBottom: 10 }}>
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.5 }}>{h.text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>{h.note}</p>
                  <span style={{ fontSize: "0.7rem", color: "#7A746E", flexShrink: 0 }}>{h.chars} chars</span>
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 12 }}>5 bolder options</p>
            {afHeadlinesBold.map((h, i) => (
              <div key={i} style={{ background: "#f0efe9", border: "1px solid #E0DBD3", borderRadius: 4, padding: "16px 20px", marginBottom: 10 }}>
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.5 }}>{h.text}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>{h.note}</p>
                  <span style={{ fontSize: "0.7rem", color: "#7A746E", flexShrink: 0 }}>{h.chars} chars</span>
                </div>
              </div>
            ))}

            <CommentBox clientName="Andy Felton" tabName="Headlines" slug={slug} />
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeTab === "about" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>About Section</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>About Section</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 20px" }}>Three versions. All under LinkedIn's 2,200 character limit. Note: "AI" and "automation" are avoided as openers — process and systems language used instead.</p>

            <Callout type="blue">
              Your current About section leads with "Typically businesses come to me when they're being held together by manual processes, workarounds, and people quietly filling in the gaps." That's a strong opening. What the versions below do is bring the implementor positioning into the rest of it — and sharpen who it's written for.
            </Callout>

            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" as const }}>
              {afAboutVersions.map((v, i) => (
                <button key={i} onClick={() => setAboutVersion(i)} style={{ padding: "10px 18px", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", border: "1px solid #E0DBD3", borderRadius: 3, cursor: "pointer", background: aboutVersion === i ? AF_COLOR : "#fff", color: aboutVersion === i ? "#fff" : "#7A746E" }}>
                  {v.label}
                </button>
              ))}
            </div>

            <div style={{ background: "#F5F1EC", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 12, fontFamily: "inherit" }}>
              <pre style={{ fontFamily: "inherit", fontSize: "0.9rem", color: "#1C1C1C", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>{afAboutVersions[aboutVersion].text}</pre>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, marginBottom: 40 }}>{afAboutVersions[aboutVersion].note}</p>

            <CommentBox clientName="Andy Felton" tabName="About Section" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>What to Post</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 24px" }}>Ideas by type, plus the full SACK SALLY series. Each idea has a boldness grade: 1 is safe, 5 is ballsy. Avoid leading with "AI" or "automation" as your hook — lead with the problem first.</p>

            <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" as const }}>
              {[
                { id: "story", label: "Story" },
                { id: "belief", label: "Belief / Opinion" },
                { id: "bold", label: "Bold / Contrarian" },
                { id: "practical", label: "Practical" },
                { id: "authority", label: "Authority" },
                { id: "sack", label: "SACK SALLY" },
              ].map(st => (
                <button key={st.id} onClick={() => setContentSubTab(st.id)} style={{ padding: "9px 16px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #E0DBD3", borderRadius: 3, cursor: "pointer", background: contentSubTab === st.id ? (st.id === "sack" ? "#6b2a00" : AF_COLOR) : "#fff", color: contentSubTab === st.id ? "#fff" : "#7A746E" }}>
                  {st.label}
                </button>
              ))}
            </div>

            {contentSubTab === "story" && afContentStory.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
            {contentSubTab === "belief" && afContentBelief.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
            {contentSubTab === "bold" && afContentBold.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
            {contentSubTab === "practical" && afContentPractical.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
            {contentSubTab === "authority" && afContentAuthority.map((idea, i) => <IdeaCard key={i} idea={idea} />)}
            {contentSubTab === "sack" && (
              <div>
                <div style={{ background: "linear-gradient(135deg, #fff0e6, #fde8d4)", border: "1px solid #e8a87c", borderRadius: 4, padding: "18px 22px", marginBottom: 20 }}>
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#8a3a00", margin: "0 0 6px" }}>SACK SALLY</p>
                  <p style={{ fontSize: "0.85rem", color: "#a05020", margin: 0 }}>Stop paying humans to do what systems should do. Each post names a specific manual process and the person (Sally) holding it together. Format: whiteboard headline on camera, then the post copy. The through-line: "That's exactly the kind of thing I fix." Avoids process and systems buzzwords — leads with the human cost instead.</p>
                </div>
                <Callout type="amber">
                  <strong>Session 8 update:</strong> SACK SALLY is the right instinct — keep it. The low engagement isn't a content problem, it's a psychology problem. Business owners don't want to publicly admit they have a Sally, especially if Sally might see the post. Interspace SACK SALLY with story posts and personal content that people are more willing to engage with. And shift some SACK SALLY posts toward the <strong>owner's absence</strong> as the primary point of failure — it's more emotional, less accusatory, and directly speaks to why people started a business in the first place. Ask David Maguire if he'd comment on a post — one well-placed comment from a consultant reaches the right people.
                </Callout>
                <Callout type="orange">
                  <strong>April 2026 — keeping Andy aligned:</strong> Andy drafted a holiday post using the old Sally-as-the-problem framing. Feedback given: keep the opening email hook (it's concrete and works) but pivot the frame — Sally isn't the problem, the owner's reaction to that email is. When Sally is the villain, the reader feels exposed rather than understood. The new version leads with freedom (why they started the business) and lands on the owner as the single point of failure. Less accusatory, more emotional, same destination. CTA shifted to the owner stepping away rather than replacing Sally — avoids feeling like a threat to anyone on their team.
                </Callout>
                {afContentSack.map((idea, i) => <IdeaCard key={i} idea={idea} isSack={true} />)}
              </div>
            )}

            <CommentBox clientName="Andy Felton" tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {activeTab === "recommendations" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>Strategic Guidance</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 20px" }}>Strategic guidance — not instructions. Push back on anything that doesn't feel right. This section is written directly to you.</p>

            <Callout type="green">
              <strong>Where we are in April 2026 — post Session 8:</strong> Implementor positioning is confirmed and multiple people have validated it in conversation. Active work is on the board (UK Swimming, PAPA). Pipeline opportunities are live (Chris Dillon, David Maguire). Offer/niche clarity is being worked with a specialist coach. The challenge now: get that clarity, update the positioning, and convert the first aligned client.
            </Callout>

            {afRecs.map((r, i) => (
              <Collapsible key={i} title={r.title} defaultOpen={i === 0}>
                <p style={{ whiteSpace: "pre-line", margin: 0 }}>{r.body}</p>
              </Collapsible>
            ))}

            <CommentBox clientName="Andy Felton" tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>Where We're Headed</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Your Goals</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 24px" }}>Short-term and longer-term — based on what you've said across our sessions together.</p>

            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", marginBottom: 16 }}>Short term — now to 12 weeks</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { label: "Commercial goal", value: "First aligned client", sub: "The unlock. Everything is pointed at this." },
                { label: "Positioning", value: "Offer clarity next", sub: "Implementor confirmed. Niche/offer being refined with specialist coach. Update LinkedIn once that lands — not before." },
                { label: "LinkedIn", value: "2 posts per week", sub: "Holiday story first. Then SACK SALLY (owner absence angle) + bold contrarian. Interspace with personal content." },
                { label: "Pipeline", value: "3 opportunities live", sub: "PAPA (AI search, pending funding), Chris Dillon (media monitoring POC), David Maguire (likely May)." },
              ].map((stat, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "18px 22px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>{stat.label}</p>
                  <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 4px" }}>{stat.value}</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0 }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            <Callout type="amber">
              <strong>Runway context:</strong> As of December 2025, approximately nine months of runway. Conversations need to be converting by mid-2026. You're not in crisis — but this is the frame around the next few months.
            </Callout>

            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: "24px 0 16px" }}>Longer term</p>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "24px 28px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 14px" }}>The longer-term picture, inferred carefully from what you've said across our sessions together:</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "A steady flow of inbound from the right kind of client — businesses who come to you because they've seen your content, heard about you, or been referred by someone who trusts you",
                  "Social proof in the process and systems implementation niche — case studies, visible client wins, and the credibility gap closed",
                  "A personal brand that does real work — LinkedIn generating conversations, not just recording your thinking",
                  "A business that matches your values: honest, technically rigorous, and built on clients who respect expertise",
                  "Financial confidence — consistent, recurring revenue, off the runway clock",
                  "Recognition in the N8N and wider process and systems community — the open-source contributions paying off slowly but for a long time",
                  "The consultant partnership channel working — David and others referring implementation work your way as a trusted delivery partner",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: AF_COLOR, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Callout type="green">
              <strong>What's working, April 2026:</strong> Implementor positioning confirmed and validated across multiple conversations. Confidence in calls is measurably up — you pushed back on a founder's assumptions about AI self-builds and she respected it. You upsold AI work to an existing client by spotting an opportunity they hadn't seen. You have three pipeline opportunities live. The Sheldon persona is sticking. The SACK SALLY posts are getting the right offline reaction even if engagement is quiet. None of that is nothing. The clarity → confidence → client flywheel is moving.
            </Callout>

            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px" }}>The tension to hold</h3>
            <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7 }}>Slow build, real deadline. The brand pulls people toward you. The outreach gets you in front of them. Neither works without the other.</p>

            <CommentBox clientName="Andy Felton" tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}

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
  "andy-felton": {
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
  "andy-scott-barrett": {
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
  "nikki-mcreynolds": {
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
  "solve-people": {
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
  { id: "milestones", label: "Milestones" },
  { id: "goals", label: "Goals" },
  { id: "brand", label: "Brand Assets" },
  { id: "content", label: "Content Ideas" },
];

function PendingDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("todos");
  const placeholderMsg = "This will be filled in after your 90 Minute Blueprint Call.";
  return (
    <div style={{minHeight: "100vh", background: "#F5F1EC"}}>
      <nav style={{position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "14px 0"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <div style={{width: 36, height: 36, borderRadius: 3, background: "#E0DBD3", display: "flex", alignItems: "center", justifyContent: "center", color: "#7A746E", fontSize: "0.7rem", fontWeight: 700}}>
              ✓
            </div>
            <div>
              <p style={{fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0}}>Welcome</p>
              <p style={{fontSize: "0.68rem", color: "#7A746E", margin: 0}}>Your dashboard is being set up</p>
            </div>
          </div>
          <div style={{fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", fontFamily: "var(--font-dm-serif), serif"}}>
            BeMore<span style={{color: "#4ec9d0"}}>You</span>
          </div>
        </div>
      </nav>

      <div style={{borderBottom: "1px solid #E0DBD3", background: "rgba(245,241,236,0.6)"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", overflowX: "auto"}}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{padding: "14px 20px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", border: "none", background: "transparent", cursor: "pointer", borderBottom: activeTab === tab.id ? "2px solid #E8521C" : "2px solid transparent", marginBottom: -1, color: activeTab === tab.id ? "#E8521C" : "#7A746E"}}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>
        <div style={{background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3, padding: "40px 48px"}}>
          <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 16}}>
            Coming soon
          </p>
          <h2 style={{fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 16px", lineHeight: 1.2}}>
            {placeholderMsg}
          </h2>
          <p style={{fontSize: "0.9rem", color: "#7A746E", lineHeight: 1.7, margin: 0}}>
            Ben has your questionnaire answers and will have everything ready for you here after your first session. Speak soon.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── NIKKI McREYNOLDS DASHBOARD ──────────────────────────────────────────────

const NM_COLOR = "#7c3aed";

const nmTodos = [
  { id: "nm1", text: "Land the CMO / 3-month consultant hire this week. Four interviews booked (two Wednesday, one Thursday, one Friday). Hold the line on your terms — project-based fee, 40% up front, KPI of 50 paid members by end of three months. Don't bend on the payment structure again." },
  { id: "nm2", text: "Once CMO is signed, brief them on the Open Sanctuary → 14-day trial switch and the funnel diagnostic. Their first job is the 10–15 parent interviews. You are not doing those yourself — that's the whole point." },
  { id: "nm3", text: "Start 'Behind the Hush' concept work with Claude. You said you'd send your first pass to Ben — do it before 6 May so we can shape it in the last fortnightly session. One-line format idea: reel hook → written post → newsletter CTA via ManyChat." },
  { id: "nm4", text: "HushAway Pod — Huddersfield is live and mid-baseline. Day 30 check-in is coming. Make sure NDA + media consent forms are signed by all five parents. Collect one usable story or parent reaction now, even if it's just a quote — don't wait for the full 60-day data." },
  { id: "nm5", text: "Switch the email sender name from HushAway to Nikki (founder of HushAway). This one has been on the list too long. It's a 5-minute job in Kajabi and it materially lifts open rates. Do it before the next send." },
  { id: "nm6", text: "Happy Place Festival — lock the capture plan. Who's filming, what's the interview list, what assets do you want out of the day. Treat it like a content shoot, not a day out. You'll use this content for months." },
  { id: "nm7", text: "Protect the mornings. You told Ben you were in a dark place two weeks ago — the 45-minute gym window is non-negotiable. Don't trade it for another interview. You cannot pour from an empty cup and the business needs your clearest thinking, not your most hours." },
  { id: "nm8", text: "Let April's scheduled LinkedIn posts run their course. Do not change them. Do not obsess over them. All energy goes into the CMO hire and the Behind the Hush concept — that is where the next 3 months of output actually gets built." },
];

function NikkiMcReynoldsDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");
  const [openTensions, setOpenTensions] = useState<Record<number, boolean>>({});
  const [contentSubTab, setContentSubTab] = useState("video");

  const nmTabs = [
    { id: "home", label: "Home" },
    { id: "milestones", label: "Milestones" },
    { id: "brand", label: "Brand Assets" },
    { id: "content", label: "Content Ideas" },
    { id: "recs", label: "Ben's Recommendations" },
    { id: "goals", label: "Your Goals" },
  ];

  return (
    <div style={{minHeight: "100vh", background: "#f7f6f3"}}>
      <nav style={{position: "sticky", top: 0, zIndex: 100, background: "rgba(247,246,243,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid #e4e2dc", padding: "0 32px", display: "flex", alignItems: "stretch", gap: 0}}>
        <div style={{display: "flex", alignItems: "center", paddingRight: 32, borderRight: "1px solid #e4e2dc", marginRight: 8, flexShrink: 0}}>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <div style={{width: 36, height: 36, borderRadius: 3, background: NM_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700}}>NM</div>
            <div>
              <p style={{fontSize: "0.88rem", fontWeight: 600, color: "#1a1916", margin: 0}}>Nikki McReynolds</p>
              <p style={{fontSize: "0.68rem", color: "#6b6860", margin: 0}}>Founder, HushAway</p>
            </div>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto"}}>
          {nmTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{display: "flex", alignItems: "center", padding: "0 18px", fontSize: "0.8rem", fontWeight: 500, color: activeTab === tab.id ? NM_COLOR : "#6b6860", cursor: "pointer", border: "none", background: "none", borderBottom: activeTab === tab.id ? `2px solid ${NM_COLOR}` : "2px solid transparent", whiteSpace: "nowrap", height: 52, transition: "color 0.15s"}}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{maxWidth: 1080, margin: "0 auto", padding: "32px 32px"}}>

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={NM_COLOR} />
            <div style={{background: "#eef4f2", border: "1px solid #cfe0db", borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28}}>
              <div style={{width: 36, height: 36, background: NM_COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0}}>12</div>
              <div>
                <p style={{fontSize: "0.88rem", fontWeight: 600, color: NM_COLOR, margin: "0 0 4px"}}>Session 12 — 22 April 2026</p>
                <p style={{fontSize: "0.84rem", color: "#4a6b62", margin: 0, lineHeight: 1.6}}>Phase 1 learnings banked. The agency path didn&apos;t convert — you&apos;ve cut your losses and are now hunting a fractional CMO / 3-month consultant to fix the funnel before any more ad spend. Four interviews booked this week, clear KPI set: 50 paid members in three months. On personal content, you pushed back — you&apos;ve lost faith in personal posts for now but agreed &quot;Behind the Hush&quot; as the bridge. One final fortnightly on 6 May, then a break while the CMO does the heavy lifting. Everything in Ben&apos;s Recommendations tab has been updated to reflect where we are.</p>
              </div>
            </div>

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28}}>
              {[
                { label: "Sessions completed", value: "12", sub: "Since November 2025" },
                { label: "Email list (warm)", value: "65", sub: "Direct subscribers — priority audience" },
                { label: "LinkedIn following", value: "~5,000", sub: "Growing" },
                { label: "HushAway Pod", value: "🏫 Live", sub: "First school placement — Huddersfield" },
              ].map((s, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "18px 20px"}}>
                  <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>{s.label}</p>
                  <p style={{fontSize: "1.5rem", fontWeight: 700, color: "#1a1916", letterSpacing: "-0.02em", margin: "0 0 4px"}}>{s.value}</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: 0}}>{s.sub}</p>
                </div>
              ))}
            </div>

            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 28}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 16, margin: "0 0 16px"}}>Your To-Do List</p>
              <ClientTodoList items={nmTodos} clientName="Nikki McReynolds" slug={slug} accentColor={NM_COLOR} />
            </div>

            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28}}>
              <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "20px 22px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 10, margin: "0 0 10px"}}>What's in this dashboard</p>
                <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0}}>
                  {["Your current positioning and who you're for", "The messaging angles with the most potential", "Specific content ideas built around your story and opinions", "Ben's strategic recommendations, plain and direct", "Short and long-term goals based on where you're heading"].map((item, i) => (
                    <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative", lineHeight: 1.5}}>
                      <span style={{position: "absolute", left: 0, color: "#9e9b94"}}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "20px 22px"}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 10, margin: "0 0 10px"}}>What this is (and isn't)</p>
                <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0}}>
                  {["A working document — not a polished presentation", "Evidence-based — nothing here is invented", "Something to review together, not hand over", "Not a business plan — Ben is your personal brand and visibility layer", "Living — it gets updated as the work evolves"].map((item, i) => (
                    <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative", lineHeight: 1.5}}>
                      <span style={{position: "absolute", left: 0, color: "#9e9b94"}}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 28}}>
              <h3 style={{fontSize: "0.95rem", fontWeight: 600, color: "#1a1916", marginBottom: 16, margin: "0 0 16px"}}>Who you are and what you're building</h3>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}}>
                {[
                  { title: "What you actually do", body: "You're the founder of HushAway® — a subscription-based digital platform (£14.50/month) that uses ASMR-inspired audio stories, soundscapes, and sensory rituals to help children aged 4–10 regulate their emotions. You sit underneath a master brand called The PeacePath®." },
                  { title: "What makes it different", body: "It's customisable (every child is different), it's backed by a circle of 11+ experts including doctors and researchers, and it makes no medical claims. It's holistic — a bridge for families who are waiting for a diagnosis, sceptical of medication, or just exhausted and need something they can use tonight." },
                  { title: "Who you've been before this", body: "Nursery owner (130 children, 30 staff). Corporate trainer at board level. Dale Carnegie-certified trainer (600+ Saudi delegates). Coach. Voiceover artist. You bring a combination of business, education, coaching, therapy, and lived proximity to the space that very few competitors have." },
                  { title: "Why we're working together", body: "You've built something credible and real. The job now is making sure the right people can find you, trust you, and feel like they already know you — before they ever sign up. That's what this work is: your visibility, your voice, and your positioning, done properly." },
                ].map((block, i) => (
                  <div key={i}>
                    <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>{block.title}</p>
                    <p style={{fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.65, margin: 0}}>{block.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <CommentBox clientName="Nikki McReynolds" tabName="Home" slug={slug} />
            <BenUpdateBox slug={slug} />
          </div>
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={NM_COLOR} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: NM_COLOR, margin: "0 0 4px"}}>Your Brand Foundation</p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em"}}>Brand Assets</h2>

            {/* Positioning Statement */}
            <div style={{background: NM_COLOR, borderRadius: 6, padding: "28px 32px", marginBottom: 20}}>
              <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 10px"}}>Positioning Statement</p>
              <p style={{fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", color: "#fff", lineHeight: 1.6, margin: 0}}>
                "I help parents of children aged 4–10 find calm without the fight — through sound, story, and sensory tools that actually work at home, before bed, and before the diagnosis lands."
              </p>
            </div>

            {/* Headline + One-liner */}
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20}}>
              <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "22px 24px"}}>
                <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9e9b94", margin: "0 0 6px"}}>LinkedIn Headline — Live</p>
                <p style={{fontSize: "0.72rem", color: "#c4793a", fontWeight: 600, margin: "0 0 10px"}}>⚠ "Dale Carnegie Trainer" still showing — remove this (you resigned Session 9)</p>
                <p style={{fontSize: "0.88rem", fontWeight: 600, color: "#1a1916", lineHeight: 1.5, margin: "0 0 12px"}}>
                  "Championing children's emotional regulation & peace through sound & story, especially neurodivergent minds | Founder, The PeacePath® & HushAway® | Neurodiversity Coach | Sound Therapy Practitioner | Dale Carnegie Trainer"
                </p>
                <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9e9b94", margin: "0 0 6px"}}>Recommended headline</p>
                <p style={{fontSize: "0.88rem", fontWeight: 600, color: NM_COLOR, lineHeight: 1.5, margin: "0 0 10px"}}>
                  "Helping children aged 4–10 find calm through sound & story | Founder, HushAway® & The PeacePath® | Emotional regulation without the fight"
                </p>
                <p style={{fontSize: "0.78rem", color: "#9e9b94", margin: 0, lineHeight: 1.5}}>Lead with the outcome parents want, not your credentials. Credentials follow.</p>
              </div>
              <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "22px 24px"}}>
                <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9e9b94", margin: "0 0 10px"}}>Networking One-Liner</p>
                <p style={{fontSize: "0.92rem", fontWeight: 600, color: "#1a1916", lineHeight: 1.5, margin: "0 0 10px"}}>
                  "I help parents of children who struggle with emotional regulation — think ADHD, anxiety, or kids who just won't switch off at night — find calm through sound and story. No medication needed, no diagnosis required."
                </p>
                <p style={{fontSize: "0.78rem", color: "#9e9b94", margin: 0, lineHeight: 1.5}}>Use this when someone asks what you do. Lead with the parent's pain, then HushAway as the answer.</p>
              </div>
            </div>

            {/* About section */}
            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "24px 28px", marginBottom: 20}}>
              <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9e9b94", margin: "0 0 14px"}}>About Section — Live on LinkedIn</p>
              <p style={{fontSize: "0.88rem", color: "#3d3935", lineHeight: 1.8, margin: "0 0 10px", whiteSpace: "pre-wrap"}}>{`The PeacePath® and HushAway® exist for one simple reason: to give every child a place that feels like a hug when the world gets too loud.

I kept meeting parents who were exhausted, overwhelmed, and still showing up with so much love… and little ones who were carrying far more emotion than their tiny bodies could hold.

AND..I strongly believe every child, neurodivergent or neurotypical, deserves safety, softness, and somewhere predictable to land. Sound and storytelling became my way of offering that: gentle, sensory-aware stories and soundscapes that help busy brains settle and bodies breathe again.

So, I champion children's emotional regulation and peace through the science of sound and the power of storytelling. Through The PeacePath® and HushAway®, we create gentle, research-informed audio sanctuaries that support big feelings, busy minds and especially neurodivergent children who often feel overwhelmed by the world.

What we do:
• Support children who feel everything deeply (and the grown-ups who love them), along with teachers, SENCOs and clinicians.
• Blend science × storytelling × sound to create short, predictable listens and simple rituals that support grounding, focus, transitions and sleep readiness.
• Design calm experiences and tools: digital soundscapes, guided affirmations, HushAway PODs, PeacePacks and ready-to-use toolkits for home and school.
• Partner with parents, practitioners, universities and an Advisory Circle of doctors, scientists and neurodiversity experts so what we build is kind, credible and truly useful.
• Grow our CIC, The PeacePath Project, to widen access for under-served communities through grants, sponsorships and supported school placements.`}</p>
              <div style={{background: "#fdf8ec", borderLeft: "3px solid #c4793a", borderRadius: "0 4px 4px 0", padding: "10px 14px", marginTop: 12}}>
                <p style={{fontSize: "0.78rem", color: "#8a6e2a", margin: 0, lineHeight: 1.6}}>Ben's note: Strong opening. The "hug when the world gets too loud" line is your best. Consider leading with Nikki more personally — the About section currently leads with the brand. Starting with "I kept meeting parents…" as your first line would make it land harder.</p>
              </div>
            </div>

            {/* ICP */}
            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "24px 28px", marginBottom: 20}}>
              <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9e9b94", margin: "0 0 18px"}}>Your Ideal Client (ICP)</p>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16}}>
                <div>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, color: NM_COLOR, margin: "0 0 6px"}}>Who they are</p>
                  <p style={{fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.6, margin: 0}}>Parent of a child aged 4–10 with emotional regulation challenges — neurodiverse (ADHD, autism, sensory processing disorder) or simply a child who won't regulate. Exhausted, overwhelmed, and out of ideas. Sceptical of medication. Waiting for a diagnosis or just wanting something they can use tonight.</p>
                </div>
                <div>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, color: NM_COLOR, margin: "0 0 6px"}}>What they say</p>
                  {[
                    '"I just want to push the pause button."',
                    '"I don\'t know how to help them."',
                    '"I\'ve tried everything and nothing works."',
                    '"I\'m waiting months for an assessment — what do I do now?"',
                    '"I don\'t want to medicate unless we have to."',
                  ].map((q, i) => (
                    <p key={i} style={{fontSize: "0.82rem", color: "#6b6860", margin: "0 0 6px", fontStyle: "italic"}}>{q}</p>
                  ))}
                </div>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
                <div>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, color: "#2e7d4f", margin: "0 0 8px"}}>Green flags</p>
                  {["Willing to try something holistic", "Parent-led, not waiting for school to fix it", "Wants tools they can use at home tonight", "Open to a subscription product if it works", "Follows wellness, parenting, or ND accounts"].map((f, i) => (
                    <div key={i} style={{display: "flex", gap: 8, marginBottom: 6}}>
                      <span style={{color: "#2e7d4f", fontWeight: 700, flexShrink: 0}}>✓</span>
                      <p style={{fontSize: "0.82rem", color: "#6b6860", margin: 0}}>{f}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, color: "#c0392b", margin: "0 0 8px"}}>Red flags</p>
                  {["Expects a medical cure or clinical outcome", "Wants a one-size solution", "Doesn't believe in holistic approaches", "Will argue with the product instead of using it", "Looking for free content only"].map((f, i) => (
                    <div key={i} style={{display: "flex", gap: 8, marginBottom: 6}}>
                      <span style={{color: "#c0392b", fontWeight: 700, flexShrink: 0}}>✗</span>
                      <p style={{fontSize: "0.82rem", color: "#6b6860", margin: 0}}>{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience tiers */}
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", margin: "0 0 12px"}}>Audience Tiers</p>
            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "0 22px", marginBottom: 20}}>
              {[
                { badge: "Primary", badgeBg: "#eef4f2", badgeColor: "#3d6b5e", text: "Parents of children aged 4–10 with emotional regulation challenges — particularly neurodiverse children (ADHD, autism, sensory processing disorders) who are sceptical of medication, waiting for a diagnosis, and feel unseen and unsupported." },
                { badge: "Secondary", badgeBg: "#eef2f7", badgeColor: "#3a5c7a", text: "Schools — SENCOs, classroom teachers, and special educational needs leads. Demand is growing as the SEN review forces ND children into underprepared mainstream schools." },
                { badge: "Tertiary", badgeBg: "#fdf8ec", badgeColor: "#8a6e2a", text: "Therapists and clinicians working with children. Researchers. University partners. These audiences build credibility more than revenue." },
                { badge: "Emerging", badgeBg: "#fdf3ea", badgeColor: "#c4793a", text: "One-to-one home tutors working with children approved to leave mainstream school — a segment Calm and Headspace won't specifically target." },
                { badge: "Avoid", badgeBg: "#fdf0f0", badgeColor: "#8a3a3a", text: "Parents expecting a medical cure or quick fix. People who want a one-size solution. They'll drain your energy and argue with your product." },
              ].map((row, i) => (
                <div key={i} style={{display: "flex", alignItems: "flex-start", gap: 14, padding: "11px 0", borderBottom: i < 4 ? "1px solid #e4e2dc" : "none"}}>
                  <span style={{fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0, marginTop: 1, background: row.badgeBg, color: row.badgeColor}}>{row.badge}</span>
                  <p style={{fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.5, margin: 0}}>{row.text}</p>
                </div>
              ))}
            </div>

            {/* Differentiators */}
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", margin: "0 0 12px"}}>What Makes You Different</p>
            <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 20}}>
              {[
                { title: "Customisable by design", body: "What works for one ADHD child won't work for another. You've built that in from day one — children choose how they listen. That's both a product differentiator and a philosophical stance." },
                { title: "An expert circle, not just a founder's opinion", body: "11+ doctors, ASMR researchers, sleep practitioners, and neuro-psychologists on your advisory board. Plus The Sleep Charity as a partner. Unusual for a startup at this stage." },
                { title: "55+ children across the world have tested it", body: "Your SoundSonic Ambassadors are real families who've been using HushAway for months. That's evidence — not a beta list." },
                { title: "Holistic and honest about what it is", body: "No medical claims. \"Functional, not scientific.\" This is a strength — it's what separates you from anything that overpromises and lets families down." },
                { title: "You treat children like they can handle more than cartoons", body: "Enchanted but real. No fluffy dogs, no pastel teddies. You're making something for children that respects their intelligence. That's rare." },
                { title: "An unusually broad background", body: "Education, business leadership, corporate training, coaching, nursery operations, sound therapy — most competitors come from one of those. You've come from all of them." },
              ].map((diff, i) => (
                <div key={i} style={{display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "#f2f1ee", borderRadius: 6}}>
                  <div style={{width: 28, height: 28, borderRadius: 6, background: "#eef4f2", color: NM_COLOR, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0}}>✦</div>
                  <div>
                    <p style={{fontSize: "0.84rem", fontWeight: 600, color: "#1a1916", margin: "0 0 2px"}}>{diff.title}</p>
                    <p style={{fontSize: "0.8rem", color: "#6b6860", margin: 0, lineHeight: 1.5}}>{diff.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Messaging angles */}
            <div style={{height: 1, background: "#e4e2dc", margin: "24px 0"}} />
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", margin: "0 0 8px"}}>Key Messaging Angles</p>
            <p style={{fontSize: "0.84rem", color: "#6b6860", margin: "0 0 20px", lineHeight: 1.6}}>The angles with the most potential, grounded in your own words.</p>
            <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 20}}>
              {[
                { num: 1, title: "Push the pause button", body: "This came from a parent you overheard — and it went straight into your product thinking. Parents are exhausted. They're not failing their children; they're just running on empty with nowhere to put the child safely while they breathe. HushAway isn't just for the child. It's for the parent who needs ten minutes of quiet.", quote: '"I just want to push the pause button." — a parent. That\'s it. That\'s the whole brief.' },
                { num: 2, title: "The bridge before diagnosis", body: "Families wait years for a formal assessment. Children are struggling now. HushAway is something they can start today — before the diagnosis, before the waiting list, before anyone's decided what label fits. It doesn't require permission from a specialist. It just requires a parent who's willing to try something gentle.", quote: null },
                { num: 3, title: "Holistic, not clinical — and honest about it", body: "You make no medical claims and you're proud of that. HushAway isn't a cure. It isn't a fix. It's functional, not scientific — something that sits alongside whatever else the family is doing, whether that's medication, therapy, or nothing yet. For parents who are exhausted by clinical language and overpromising products, this framing builds trust fast.", quote: '"It\'s holistic. And it is functional, not scientific."' },
                { num: 4, title: "Every child is different — and HushAway is built that way", body: "One child loves Blueberry Moon. Another finds it overstimulating. One responds to running water; another needs the sound of a fan. You've built in customisation because the alternative — one size for all — is exactly what you've been fighting against. This is both a product message and a values message.", quote: '"Belonging over fixing. Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness."' },
                { num: 5, title: "From corporate to this — and why", body: "You spent years at board level in corporate. You were a Dale Carnegie trainer to 600+ people across the world. You ran a nursery with 30 staff. And yet none of that compares to what you're building now. That journey — corporate rigidity to something genuinely purposeful — is a story that resonates with an enormous audience of people still stuck in a nine-to-five they've outgrown.", quote: null },
                { num: 6, title: "The legacy", body: "In ten years, you want to look back and call them \"the HushAway children.\" Not because of the brand — because they grew up with better emotional tools, more self-awareness, and a stronger foundation for navigating the world. That's the legacy frame. It's the biggest, most human version of what this is.", quote: '"HushAway is bigger than stories, meditations, and sounds. That\'s just the conduit."' },
                { num: 7, title: "The unfixed child", body: "The \"superpower\" narrative around neurodiverse children puts pressure on them to be exceptional to earn their place. You reject that. Not every day is a superpower day. Some days are messy and hard and no one wants to be told their struggle is actually a gift. Children deserve safety as they are — not conditional on being remarkable.", quote: '"Not every day is a superpower day — some days are really messy."' },
              ].map((msg, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 6, padding: "18px 20px"}}>
                  <div style={{width: 22, height: 22, borderRadius: "50%", background: NM_COLOR, color: "#fff", fontSize: "0.68rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10}}>{msg.num}</div>
                  <p style={{fontSize: "0.9rem", fontWeight: 600, color: "#1a1916", margin: "0 0 6px"}}>{msg.title}</p>
                  <p style={{fontSize: "0.82rem", color: "#6b6860", lineHeight: 1.65, margin: 0}}>{msg.body}</p>
                  {msg.quote && (
                    <div style={{background: "#eef4f2", borderLeft: "3px solid #3d6b5e", borderRadius: "0 6px 6px 0", padding: "10px 14px", marginTop: 10}}>
                      <p style={{fontSize: "0.78rem", fontStyle: "italic", color: "#3d6b5e", margin: 0}}>{msg.quote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <CommentBox clientName="Nikki McReynolds" tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <NikkiContentTab slug={slug} contentSubTab={contentSubTab} setContentSubTab={setContentSubTab} />
        )}

        {/* ── RECS ── */}
        {activeTab === "recs" && (
          <div>
            <h2 style={{fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1916", margin: "0 0 4px"}}>Ben's Recommendations</h2>
            <p style={{fontSize: "0.88rem", color: "#6b6860", marginBottom: 28}}>Where the work actually needs to go right now.</p>

            {/* ── NURTURE WORKFLOW ── */}
            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "24px 26px", marginBottom: 20}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: NM_COLOR, margin: "0 0 6px"}}>The System</p>
              <h3 style={{fontSize: "1.15rem", fontWeight: 700, color: "#1a1916", margin: "0 0 6px"}}>How a stranger becomes a member — the 8-touchpoint nurture</h3>
              <p style={{fontSize: "0.85rem", color: "#6b6860", lineHeight: 1.65, margin: "0 0 20px"}}>Research is boringly consistent on this: most buyers need <strong>at least 8 meaningful touchpoints</strong> before they pay. LinkedIn alone can't deliver 8 — the feed moves too fast and people forget. This is why we push everything toward your owned channels (newsletter, YouTube, website). Those are the places where a stranger racks up the touches that turn into trust.</p>

              {/* Stage 1: Top of funnel */}
              <div style={{display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, marginBottom: 14}}>
                <div style={{background: "#fdf0f0", borderRadius: 8, padding: "14px 12px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <p style={{fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8a3a3a", margin: "0 0 4px"}}>Stage 1</p>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: 0, lineHeight: 1.3}}>Attention</p>
                  <p style={{fontSize: "0.7rem", color: "#8a3a3a", margin: "4px 0 0"}}>Touch 1–2</p>
                </div>
                <div style={{background: "#fdfaf6", border: "1px dashed #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: "0 0 4px"}}>LinkedIn — light, personal, scroll-stopping</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: "0 0 6px", lineHeight: 1.55}}>One personal post per week. A story, a moment, a reaction, a photo of a real thing. This is the hook — the job is to make someone stop scrolling and think <em>"who is this woman?"</em></p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: "0 0 6px", lineHeight: 1.55}}>You don't need to come up with this from scratch — that's exactly what the <strong>Content Ideas</strong> tab is for. Every week has a direction, a hook, and the angle mapped out. Open the tab, pick the week, write it in your own voice. If you're short on time, copy the guidance into Claude and let it draft — then edit it so it sounds like you. The goal is to <em>reduce</em> the weight of content creation, not add another thinking task on top.</p>
                  <p style={{fontSize: "0.72rem", color: "#8a3a3a", fontWeight: 600, margin: 0}}>→ Call to action: "Full conversation on YouTube" / "I wrote about this in the newsletter — link in comments"</p>
                </div>
              </div>

              {/* Arrow */}
              <div style={{textAlign: "center", color: NM_COLOR, fontSize: "1.2rem", margin: "4px 0", fontWeight: 700}}>↓</div>

              {/* Stage 2: Owned discovery */}
              <div style={{display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, marginBottom: 14}}>
                <div style={{background: "#fdf3ea", borderRadius: 8, padding: "14px 12px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <p style={{fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a86725", margin: "0 0 4px"}}>Stage 2</p>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: 0, lineHeight: 1.3}}>Interest</p>
                  <p style={{fontSize: "0.7rem", color: "#a86725", margin: "4px 0 0"}}>Touch 3–4</p>
                </div>
                <div style={{background: "#fdfaf6", border: "1px dashed #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: "0 0 4px"}}>YouTube (@hushaway_peace) + hushaway.com</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: "0 0 6px", lineHeight: 1.55}}>They clicked. Now they land on a full Conversations interview, a Sound Sanctuary explainer, or a blog post. This is where all the <strong>heavy expertise content</strong> goes — the stuff that was cluttering your LinkedIn feed. It's also where Google sends people searching "ASMR children regulation."</p>
                  <p style={{fontSize: "0.72rem", color: "#a86725", fontWeight: 600, margin: 0}}>→ Call to action: "Subscribe to the newsletter for the next one" / "Get the free Sound Sanctuary tracks"</p>
                </div>
              </div>

              <div style={{textAlign: "center", color: NM_COLOR, fontSize: "1.2rem", margin: "4px 0", fontWeight: 700}}>↓</div>

              {/* Stage 3: Nurture */}
              <div style={{display: "grid", gridTemplateColumns: "110px 1fr", gap: 16, marginBottom: 14}}>
                <div style={{background: "#eef4f2", borderRadius: 8, padding: "14px 12px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <p style={{fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3d6b5e", margin: "0 0 4px"}}>Stage 3</p>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: 0, lineHeight: 1.3}}>Trust</p>
                  <p style={{fontSize: "0.7rem", color: "#3d6b5e", margin: "4px 0 0"}}>Touch 5–7</p>
                </div>
                <div style={{background: "#fdfaf6", border: "1px dashed #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: "0 0 4px"}}>The email newsletter (from Nikki, not HushAway)</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: "0 0 6px", lineHeight: 1.55}}>Fortnightly. Personal tone, sent from your name. One deeper takeaway per email, a line of real context at the top, one soft link. This is where most of the 8 touches happen — the newsletter is doing the work while LinkedIn is just the doorway.</p>
                  <p style={{fontSize: "0.72rem", color: "#3d6b5e", fontWeight: 600, margin: 0}}>→ Call to action: Start a free Kajabi trial / Join the Sound Sanctuary</p>
                </div>
              </div>

              <div style={{textAlign: "center", color: NM_COLOR, fontSize: "1.2rem", margin: "4px 0", fontWeight: 700}}>↓</div>

              {/* Stage 4: Conversion */}
              <div style={{display: "grid", gridTemplateColumns: "110px 1fr", gap: 16}}>
                <div style={{background: "#ede4f7", borderRadius: 8, padding: "14px 12px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <p style={{fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: NM_COLOR, margin: "0 0 4px"}}>Stage 4</p>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: 0, lineHeight: 1.3}}>Member</p>
                  <p style={{fontSize: "0.7rem", color: NM_COLOR, margin: "4px 0 0"}}>Touch 8+</p>
                </div>
                <div style={{background: "#fdfaf6", border: "1px dashed #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <p style={{fontSize: "0.82rem", fontWeight: 700, color: "#1a1916", margin: "0 0 4px"}}>Kajabi trial → paid HushAway member</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", margin: "0 0 6px", lineHeight: 1.55}}>By the time they sign up, they've already consumed you across 3+ channels and 8+ moments. The sale is almost a formality — they've already decided they trust you. This is the 1,000-member goal, and it compounds.</p>
                  <p style={{fontSize: "0.72rem", color: NM_COLOR, fontWeight: 600, margin: 0}}>→ Then: onboarding sequence, keep them, ask for testimonial, PR unlock</p>
                </div>
              </div>

              <div style={{background: "#fdf8ec", borderLeft: `3px solid ${NM_COLOR}`, borderRadius: 4, padding: "14px 16px", marginTop: 22}}>
                <p style={{fontSize: "0.78rem", color: "#6b5a2a", margin: 0, lineHeight: 1.6}}><strong>The point:</strong> you have already built every layer of this funnel. The gap isn't the infrastructure — it's that you keep trying to do stages 2–3 <em>on LinkedIn</em>, where they don't work. Let each channel do the job it's designed for.</p>
              </div>
            </div>

            {/* ── THE NEW COACHING STRUCTURE — POST SESSION 12 ── */}
            <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "24px 26px", marginBottom: 20}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: NM_COLOR, margin: "0 0 6px"}}>Agreed in Session 12 — what happens next</p>
              <h3 style={{fontSize: "1.15rem", fontWeight: 700, color: "#1a1916", margin: "0 0 6px"}}>One final fortnightly → break → maintenance sessions from August</h3>
              <p style={{fontSize: "0.85rem", color: "#6b6860", lineHeight: 1.65, margin: "0 0 20px"}}>You said it yourself in Session 12: &quot;one person landing on that website and turning and switching off is lost — I will never get them back.&quot; Pushing more LinkedIn content through a funnel that isn&apos;t converting is the wrong move. The right move is to pause fortnightly coaching, let the CMO fix the funnel over the next three months, and come back together once the back end is actually working. Then we go hell-for-leather on personal / opinion content to drive people to the newsletter and on to HushAway.</p>

              <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 16}}>
                {[
                  { when: "Wed 6 May 2026 · 12:30pm", theme: "Final fortnightly session (1 hour)", focus: "Wrap Phase 1 cleanly. Lock the Behind the Hush format so you&apos;ve got a live-able weekly routine through the break. Agree content capture plan for the Happy Place Festival and the Pod day-30 check-in. Confirm who the CMO / 3-month consultant is and what success looks like by end of three months (target: 50 paid members)." },
                  { when: "May — June — July 2026", theme: "The break — CMO project runs", focus: "No coaching sessions. The CMO is doing the funnel diagnostic, parent interviews, Open Sanctuary → 14-day trial switch, and conversion fix. Your job is to brief them, unblock them, and protect your own mornings. The dashboard stays live throughout — automated Monday email, to-do list, comment box — so we stay connected async." },
                  { when: "July 2026", theme: "Reconnect — kick off monthly maintenance", focus: "We&apos;ll talk in July to review how the CMO project is landing and, if the ducks are in a row, kick off one session a month from there. The focus shifts to personal / opinion / Behind the Hush content to drive traffic to the (now-working) funnel — going hell-for-leather on your personal brand once the back end can hold the traffic." },
                ].map((m, i) => (
                  <div key={i} style={{background: "#fdfaf6", border: "1px solid #e4dbc8", borderRadius: 8, padding: "16px 18px"}}>
                    <div style={{display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8}}>
                      <span style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: NM_COLOR}}>{m.when}</span>
                      <span style={{fontSize: "0.95rem", fontWeight: 700, color: "#1a1916"}}>{m.theme}</span>
                    </div>
                    <p style={{fontSize: "0.82rem", color: "#3d3935", lineHeight: 1.6, margin: 0}}>{m.focus}</p>
                  </div>
                ))}
              </div>

              <div style={{background: "#ede4f7", borderLeft: `3px solid ${NM_COLOR}`, borderRadius: 4, padding: "14px 16px", marginTop: 8}}>
                <p style={{fontSize: "0.78rem", color: "#3d2f55", margin: 0, lineHeight: 1.6}}>When we come back, we&apos;re not starting from scratch — I&apos;ve got everything on you already. It&apos;s about taking the work from third gear to fifth gear. The break gives you space to get the funnel fixed so that when we go hell-for-leather on your personal brand, there&apos;s actually something for people to land on.</p>
              </div>

            </div>

            <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
              {[
                { icon: "🎯", iconBg: "#fdf0f0", title: "The CMO hire is the whole game for the next three months", flag: "This week", flagBg: "#fdf0f0", flagColor: "#8a3a3a", paras: ["You&apos;ve already done the hard thinking: project-based fee, 40% up front, KPI of 50 paid members in three months, £500 bonus attached. Four interviews this week. Don&apos;t bend on the payment structure — the one who wanted monthly-up-front was a red flag, not a negotiation.", "The one thing to be ruthless about is strategic depth. The first candidate you rejected wasn&apos;t a doer. The second nearly worked but got the terms wrong. The right person will understand that their first job is the parent interviews and the funnel diagnostic — not posting content. If they try to pitch you \"I&apos;ll do some posts for you\", walk.", "If you can&apos;t find one person who covers the full brief, split the role — strategic consultant (the diagnostic, the interviews, the funnel fix) paired with the Vert Talent social-media operator. Don&apos;t let a hiring delay become another month lost."] },
                { icon: "🤫", iconBg: "#eef4f2", title: "Behind the Hush is your personal-brand unlock — let&apos;s build it properly", flag: "Your idea, shape it", flagBg: "#eef4f2", flagColor: "#3d6b5e", paras: ["You came up with this in Session 12 and I think it&apos;s the single best personal-content idea we&apos;ve had. It sidesteps the &quot;too personal / too soft&quot; block because it&apos;s framed as business content — but it&apos;s deeply personal by nature. Weekly series, Friday, one key insight from the week, 30-second reel + written post + CTA to newsletter via ManyChat.", "Action: do your first pass with Claude before 6 May and send it over. We&apos;ll shape the format, the four-week topic arc, and the ManyChat flow in the last fortnightly session. There&apos;s a new workspace for it in the Content Ideas tab — open Behind the Hush, drop your thinking in, or just read what&apos;s there to start.", "One nudge: don&apos;t route people through a separate blog. You said it yourself — &quot;another click, another reason for them to go, I can&apos;t be asked.&quot; Push the CTA straight to newsletter signup. You&apos;ve got 30 seconds of attention — use it."] },
                { icon: "🧪", iconBg: "#fdf3ea", title: "Funnel first, ads second — you already proved this", flag: "Hold the line", flagBg: "#fdf3ea", flagColor: "#a86725", paras: ["The £30 Instagram test was incredibly useful. +25 followers / 5% in 4 days, zero conversions. That&apos;s not a failure — it&apos;s the cleanest signal you could have asked for: top-of-funnel traffic is easy, conversion is the problem. You&apos;ve read it correctly.", "So no more ad spend until the funnel converts. The CMO&apos;s 3-month project is: diagnose the drop-off, kill the Open Sanctuary freemium, stand up the 14-day trial, lift the ManyChat and email mechanics. Then ads go behind a funnel that actually converts — that&apos;s when the £30 becomes £300 becomes £3,000 sensibly."] },
                { icon: "🏫", iconBg: "#fdf3ea", title: "The Pod + Happy Place Festival are your content goldmine — don&apos;t waste them", flag: "Now", flagBg: "#fdf0f0", flagColor: "#8a3a3a", paras: ["The Huddersfield Pod is live with five named children, NDAs and media consent in motion, day-30 check-in coming. That pipeline gives you 5 case studies by end of June, 8–10 by end of August once the University of East London research centre placement runs. This is your DfE proposal proof, and it&apos;s also your PR unlock.", "Action now, don&apos;t wait for the full data: capture one parent reaction, one teacher observation, and one before/after at the day-30 checkpoint. Don&apos;t wait for day 60 — by then the moment is gone.", "Happy Place Festival: treat it like a content shoot. Interview list, filming plan, capture assets. You&apos;ll use this content through autumn and into the schools pipeline."] },
                { icon: "🚫", iconBg: "#fdf8ec", title: "Freemium → 14-day trial — a call you&apos;ve made, let the CMO execute", flag: "CMO scope", flagBg: "#fdf8ec", flagColor: "#8a6e2a", paras: ["You&apos;ve decided Open Sanctuary goes. Expert interviews come out from behind the paywall onto a free landing page. Paid content becomes the stories, audio, signs. 14-day trial as the conversion mechanism.", "I pushed back on &quot;free stuff is a dangerous game&quot; but I accept my service sells differently to a product like HushAway. You&apos;re right that reducing friction at this stage matters more than filtering early — you have to get people to the product before you can get them to value it. The CMO&apos;s first two weeks should include mapping exactly what moves where."] },
                { icon: "📧", iconBg: "#fdf8ec", title: "Switch the email sender name — it&apos;s been on the list too long", flag: "5-minute job", flagBg: "#fdf8ec", flagColor: "#8a6e2a", paras: ["Emails go from &quot;Nikki (founder of HushAway)&quot;, not &quot;HushAway&quot;. Personal sender names lift open rates meaningfully because to a cold inbox, &quot;HushAway&quot; means nothing. This is a 5-minute change in Kajabi. Do it before the next send or give the CMO ownership of the whole email stack on day one."] },
                { icon: "🩺", iconBg: "#eef4f2", title: "Protect your mornings — seriously this time", flag: "Non-negotiable", flagBg: "#eef4f2", flagColor: "#3d6b5e", paras: ["You told me two weeks ago you were in a dark place. You&apos;re forcing yourself to the gym for 45 minutes to avoid a crash. Good. Don&apos;t negotiate that down for another interview slot.", "The whole point of the break from May is so you can step off the treadmill while the CMO fixes the back end. If you fill the gap with more hustle, we&apos;ve lost the whole purpose of the structural shift. You can&apos;t pour from an empty cup — your words. Come back in August clear, rested, and ready to go hell-for-leather on Behind the Hush."] },
                { icon: "📊", iconBg: "#fdf8ec", title: "On personal content — we disagree, and that&apos;s fine", flag: "Noted", flagBg: "#fdf8ec", flagColor: "#8a6e2a", paras: ["You pushed back hard in Session 12: you&apos;ve tried personal posts, they flopped, you&apos;ve lost faith, and the one post that cut through (70+ likes) was your opinion on the &quot;superpower&quot; framing. You also said likes ARE a barometer — people see low-engagement posts and discount the author. I hear you on all of it.", "My position hasn&apos;t changed: personal content is the long-term unlock. But I&apos;m not going to keep pushing it through May, because we&apos;ve agreed Behind the Hush is the bridge. It&apos;s business content wrapped around personal truth. That&apos;s the compromise and it&apos;s a good one.", "When we pick back up in August, the funnel will be fixed and we&apos;ll have three months of Behind the Hush under your belt. Then we open the door wider on personal content — but only because you&apos;ll actually have the evidence that it&apos;s converting, not just my opinion that it will."] },
              ].map((rec, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start"}}>
                  <div style={{width: 36, height: 36, borderRadius: 8, background: rec.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0}}>{rec.icon}</div>
                  <div style={{flex: 1}}>
                    <h3 style={{fontSize: "0.95rem", fontWeight: 600, color: "#1a1916", marginBottom: 8, margin: "0 0 8px"}}>{rec.title}</h3>
                    {rec.paras.map((p, j) => <p key={j} style={{fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.65, margin: j < rec.paras.length - 1 ? "0 0 8px" : 0}}>{p}</p>)}
                    <span style={{display: "inline-block", marginTop: 10, fontSize: "0.75rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: rec.flagBg, color: rec.flagColor}}>{rec.flag}</span>
                  </div>
                </div>
              ))}
            </div>
            <CommentBox clientName="Nikki McReynolds" tabName="Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            <h2 style={{fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1916", margin: "0 0 4px"}}>Your Goals</h2>
            <p style={{fontSize: "0.88rem", color: "#6b6860", marginBottom: 28}}>Where you're heading — short and long term.</p>

            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 12, margin: "0 0 12px"}}>Short Term — Next 4–12 Weeks</p>
            <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 28}}>
              {[
                { icon: "🎯", title: "Build early HushAway membership momentum", body: "Target: 1,000 members by December 2026 — that's £14,500/month and proof of concept. Every sign-up matters and every piece of personal LinkedIn content is moving people closer to that decision." },
                { icon: "📣", title: "Establish a consistent personal content rhythm on LinkedIn", body: "At least one genuinely personal post per week — opinion, story, or lived experience — mixed in with the expert and value content. This isn't about volume, it's about pattern. People need to see your face and hear your voice regularly enough that they remember who you are." },
                { icon: "📧", title: "Own your audience — get them off LinkedIn", body: "Migrate LinkedIn newsletter subscribers to your own email list. Grow that list through the launch email, the Kajabi free tier, and the ManyChat DM flows. This is the most important infrastructure move you can make in the next four weeks." },
                { icon: "🤝", title: "Land the right PR relationship", body: "You're between PR consultants. The right agency will get what HushAway is about, have genuine contacts in the parenting and SEN press space, and come back to you with results — not excuses." },
                { icon: "🎬", title: "Establish your opinion-led video presence", body: "Get the strategy mapped, the format decided, and the first batch recorded. The goal is to position you as an opinion former in the children's emotional regulation and neurodiversity space. The Content Ideas tab has a full three-month roadmap with scripts ready to go." },
                { icon: "📊", title: "Agency review and rebalance", body: "The review needs to result in a clear picture of what they're responsible for and what you're responsible for. Right now you're doing 90% of the management work on top of paying for theirs. That's not sustainable." },
              ].map((goal, i) => (
                <div key={i} style={{display: "flex", alignItems: "flex-start", gap: 14, background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "16px 18px"}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: "#eef4f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0}}>{goal.icon}</div>
                  <div>
                    <p style={{fontSize: "0.88rem", fontWeight: 600, color: "#1a1916", margin: "0 0 3px"}}>{goal.title}</p>
                    <p style={{fontSize: "0.8rem", color: "#6b6860", margin: 0, lineHeight: 1.55}}>{goal.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{height: 1, background: "#e4e2dc", margin: "24px 0"}} />

            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9e9b94", marginBottom: 12, margin: "0 0 12px"}}>Long Term — 6–18 Months</p>
            <div style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 40}}>
              {[
                { icon: "💷", title: "1,000 HushAway members by December 2026", body: "£14,500/month recurring. That's the financial turning point — the moment HushAway stops being funded by your training income and starts standing on its own. Everything in this dashboard is upstream of that number." },
                { icon: "🏫", title: "HushAway in schools", body: "You've planned this from day one — licensing to schools, toolkits for SENCOs, the HushAway POD. The SEN review makes this more urgent, not less. Schools are being asked to do more with less. You have something they can use." },
                { icon: "🎤", title: "Established thought leader in children's emotional regulation", body: "Known by name in the neurodiversity and SEN space. Invited to speak. Referenced in the press. Sought out by researchers and clinicians. You were on this trajectory before — the pivot disrupted it, but you're building it back faster this time." },
                { icon: "🌍", title: "The HushAway children", body: "In your own words: \"I want to look back in ten years and call them the HushAway children.\" Children who grew up with better emotional tools. Better self-awareness. A stronger foundation for navigating the world. That's the legacy. Everything else is just the work that gets you there." },
              ].map((goal, i) => (
                <div key={i} style={{display: "flex", alignItems: "flex-start", gap: 14, background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "16px 18px"}}>
                  <div style={{width: 32, height: 32, borderRadius: 8, background: "#eef2f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0}}>{goal.icon}</div>
                  <div>
                    <p style={{fontSize: "0.88rem", fontWeight: 600, color: "#1a1916", margin: "0 0 3px"}}>{goal.title}</p>
                    <p style={{fontSize: "0.8rem", color: "#6b6860", margin: 0, lineHeight: 1.55}}>{goal.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <CommentBox clientName="Nikki McReynolds" tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}

// ─── NIKKI CONTENT TAB (split out to keep component manageable) ───────────────

function NikkiContentTab({ slug, contentSubTab, setContentSubTab }: { slug: string; contentSubTab: string; setContentSubTab: (t: string) => void }) {
  const [openIdeas, setOpenIdeas] = useState<Record<string, boolean>>({});

  const subTabs = [
    { id: "behindthehush", label: "🤫 Behind the Hush" },
    { id: "video", label: "🎥 Video Strategy" },
    { id: "story", label: "📅 May LinkedIn Plan" },
    { id: "belief", label: "Belief & Opinion" },
    { id: "contrarian", label: "Bold & Contrarian" },
    { id: "practical", label: "Practical & Educational" },
    { id: "authority", label: "Authority" },
  ];

  function IdeaCard({ id, hook, format, why, prompt, extra }: { id: string; hook: string; format: string; why?: string; prompt?: string; extra?: React.ReactNode }) {
    const isOpen = openIdeas[id];
    return (
      <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, overflow: "hidden"}}>
        <div onClick={() => setOpenIdeas(prev => ({...prev, [id]: !prev[id]}))} style={{display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer", userSelect: "none"}}>
          <p style={{flex: 1, fontSize: "0.9rem", fontWeight: 600, color: "#1a1916", lineHeight: 1.4, margin: 0}}>{hook}</p>
          <div style={{display: "flex", alignItems: "center", gap: 8, flexShrink: 0}}>
            <span style={{fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "#eef2f7", color: "#3a5c7a"}}>{format}</span>
          </div>
          <span style={{color: "#9e9b94", fontSize: "0.68rem", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none", flexShrink: 0}}>▶</span>
        </div>
        {isOpen && (
          <div style={{padding: "0 20px 18px 20px", borderTop: "1px solid #e4e2dc"}}>
            {why && (
              <div style={{marginTop: 14}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Why this post</p>
                <p style={{fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.55, margin: 0}}>{why}</p>
              </div>
            )}
            {prompt && (
              <div style={{marginTop: 14}}>
                <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Claude prompt — copy and paste this</p>
                <div style={{background: "#eef4f2", borderRadius: 6, padding: "14px 16px"}}>
                  <p style={{fontFamily: "monospace", fontSize: "0.78rem", color: "#1a1916", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0}}>{prompt}</p>
                </div>
              </div>
            )}
            {extra}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1916", margin: "0 0 4px"}}>Content Ideas</h2>
      <p style={{fontSize: "0.88rem", color: "#6b6860", marginBottom: 20}}>Specific ideas built around your experience, opinions, and voice. Click to expand.</p>

      <div style={{display: "flex", gap: 0, borderBottom: "1px solid #e4e2dc", marginBottom: 20, overflowX: "auto"}}>
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setContentSubTab(t.id)} style={{padding: "10px 18px", fontSize: "0.8rem", fontWeight: 500, color: contentSubTab === t.id ? NM_COLOR : "#6b6860", cursor: "pointer", border: "none", background: "none", borderBottom: contentSubTab === t.id ? `2px solid ${NM_COLOR}` : "2px solid transparent", whiteSpace: "nowrap", transition: "color 0.15s"}}>
            {t.label}
          </button>
        ))}
      </div>

      {contentSubTab === "behindthehush" && (
        <div>
          <div style={{background: "#eef4f2", border: "1px solid #3d6b5e", borderRadius: 8, padding: "20px 24px", marginBottom: 20}}>
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3d6b5e", margin: "0 0 6px"}}>Your series, started in Session 12</p>
            <h3 style={{fontSize: "1.15rem", fontWeight: 700, color: "#1a1916", margin: "0 0 10px"}}>Behind the Hush — a weekly series</h3>
            <p style={{fontSize: "0.84rem", color: "#2a4d44", marginBottom: 10, margin: "0 0 10px"}}>This was your idea. You said: <em>&quot;behind the hush — this is what I learned this week, or this is a watch-out&quot;</em> — a Friday weekly post, moving away from straight personal background into &quot;business content, but incredibly personal and trust-building&quot;.</p>
            <p style={{fontSize: "0.84rem", color: "#2a4d44", margin: 0}}>The point isn&apos;t to be perfect — it&apos;s to document the journey of building HushAway in real time. One insight or one watch-out per week. Founders who win at personal branding (The Real David Lloyd, Fern Cotton&apos;s wellness content) all do this.</p>
          </div>

          <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 16}}>
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", margin: "0 0 10px"}}>The format we discussed</p>
            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 14}}>
              {[
                { step: "1", title: "30-second reel", body: "One lesson, one watch-out, or one unfiltered moment from the week. Filmed on your phone, no production. The hook is in the first three seconds." },
                { step: "2", title: "Written post under the reel", body: "Short — 80–150 words. The same insight in text, so people who don&apos;t watch still get value. Ends with a CTA." },
                { step: "3", title: "CTA via ManyChat", body: "&quot;Comment HUSH below and I&apos;ll send you the newsletter signup.&quot; Captures the email without them leaving the app. Low friction." },
                { step: "4", title: "Newsletter tie-in", body: "The next fortnightly newsletter expands the same theme with 400–600 words of depth. The reel hooks. The newsletter builds trust." },
              ].map((s, i) => (
                <div key={i} style={{background: "#fdfaf6", border: "1px solid #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <div style={{width: 24, height: 24, borderRadius: "50%", background: "#3d6b5e", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8}}>{s.step}</div>
                  <p style={{fontSize: "0.85rem", fontWeight: 700, color: "#1a1916", margin: "0 0 4px"}}>{s.title}</p>
                  <p style={{fontSize: "0.78rem", color: "#6b6860", lineHeight: 1.55, margin: 0}}>{s.body}</p>
                </div>
              ))}
            </div>
            <div style={{background: "#fdf8ec", borderLeft: "3px solid #8a6e2a", borderRadius: 4, padding: "12px 14px"}}>
              <p style={{fontSize: "0.78rem", color: "#6b5a2a", margin: 0, lineHeight: 1.6}}>Don&apos;t route people to a separate blog — as you said yourself: &quot;another click, another reason for them to go, I can&apos;t be asked.&quot; The reel + post + ManyChat = newsletter signup. That&apos;s the whole funnel. Save the depth for the newsletter itself.</p>
            </div>
          </div>

          <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 16}}>
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", margin: "0 0 4px"}}>Starter topic bank — first four weeks</p>
            <p style={{fontSize: "0.82rem", color: "#6b6860", lineHeight: 1.6, margin: "0 0 14px"}}>These are first-pass themes to react against, not a locked plan. The whole point of Behind the Hush is that the topic comes from whatever actually happened that week. Use these as a safety net.</p>
            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
              {[
                { week: "Week 1", title: "The agency lesson", hook: "&quot;I paid six-figure agency fees for 12 months. Here&apos;s what I&apos;d tell any founder considering the same.&quot;", body: "The real lesson from Phase 1. You don&apos;t need to name names — and shouldn&apos;t — but the insight is powerful: agencies will build the thing but they won&apos;t own the conversion. Founders need to know this before they sign the contract." },
                { week: "Week 2", title: "The 2am number", hook: "&quot;I check my LinkedIn likes at 2am. I know it&apos;s not healthy. I also can&apos;t stop.&quot;", body: "The honest contradiction you named in Session 12 — likes ARE a barometer even when you know they shouldn&apos;t be. Permission-giving, relatable, and unusually honest for a founder on LinkedIn." },
                { week: "Week 3", title: "What Portugal actually did", hook: "&quot;I went to a sound therapy retreat in high beta. The practitioner knew before I said a word.&quot;", body: "The Portugal story, reframed as what it taught you about your own business. Not grief, not drama — what changed in your thinking about the product roadmap. Brings the 2028 sound-frequency retreat idea forward." },
                { week: "Week 4", title: "The Pod day it actually happened", hook: "&quot;I spent 18 months talking about HushAway in schools. Last Friday, we walked in.&quot;", body: "The Huddersfield moment. The doubt, the logistics, the head teacher saying yes. The first five children, including the non-verbal one you&apos;re most curious about. Tie it to the wider mission — this is why the funnel matters." },
              ].map((t, i) => (
                <div key={i} style={{background: "#fdfaf6", border: "1px solid #e4dbc8", borderRadius: 8, padding: "14px 16px"}}>
                  <div style={{display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6}}>
                    <span style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3d6b5e"}}>{t.week}</span>
                    <span style={{fontSize: "0.9rem", fontWeight: 700, color: "#1a1916"}}>{t.title}</span>
                  </div>
                  <p style={{fontSize: "0.82rem", color: "#1a1916", fontStyle: "italic", margin: "0 0 6px", lineHeight: 1.5}} dangerouslySetInnerHTML={{__html: t.hook}} />
                  <p style={{fontSize: "0.78rem", color: "#6b6860", lineHeight: 1.55, margin: 0}}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 16}}>
            <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", margin: "0 0 10px"}}>Claude starter prompt — for your first pass</p>
            <p style={{fontSize: "0.82rem", color: "#6b6860", lineHeight: 1.6, margin: "0 0 12px"}}>You said in Session 12 you&apos;d do some work with Claude on this and send it over. Here&apos;s a prompt to get started. Copy it, paste into Claude, iterate — then drop your output in the comment box below so we can shape it together on 6 May.</p>
            <div style={{background: "#eef4f2", borderRadius: 6, padding: "14px 16px", marginBottom: 10}}>
              <p style={{fontFamily: "monospace", fontSize: "0.78rem", color: "#1a1916", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0}}>{`I'm Nikki McReynolds, founder of HushAway — a sound-based emotional regulation platform for children aged 4–10.

I'm starting a weekly LinkedIn series called "Behind the Hush". It runs every Friday. Each post is one key insight or one watch-out from that week of building the business. The format is:
  - 30-second reel (filmed on my phone, no production)
  - 80–150 word written post underneath, same insight in text
  - CTA: "Comment HUSH below and I'll send you the newsletter signup"

The tone is: honest, founder-first, business content but deeply personal. Think "The Real David Lloyd" or Fern Cotton's journey content — not corporate, not polished, not AI-sounding.

I want you to:
1. Help me design a repeatable format template I can use every Friday in 15 minutes
2. Generate 12 weeks of starter topic ideas based on what I'm actually going through — hiring a fractional CMO, the Huddersfield Pod launch, the Open Sanctuary → 14-day trial switch, the Happy Place Festival, the agency lessons, the Portugal retreat, menopause + founder burnout, the "I'm not a parent and not neurodiverse" credibility gap
3. For each topic, give me: a reel hook (first 3 seconds), a post opening line, and a tone note

Rules: no hyphens between words, no three-word staccato sentences, no "delve into" or "in today's fast-paced world." Write like a real person talking to another real person. Short paragraphs, flowing, a bit unvarnished.`}</p>
            </div>
            <p style={{fontSize: "0.75rem", color: "#9e9b94", fontStyle: "italic", margin: 0, lineHeight: 1.5}}>Tip: run it twice. The first output will feel a bit AI. Push back: &quot;this sounds like a LinkedIn guru wrote it. Make it sound like a 55-year-old founder having a coffee with a friend.&quot; That&apos;s usually where it lands.</p>
          </div>

          <CommentBox clientName="Nikki McReynolds" tabName="Behind the Hush" slug={slug} />
        </div>
      )}

      {contentSubTab === "story" && (
        <div>
          <div style={{background: "#eef4f2", border: "1px solid #3d6b5e", borderRadius: 8, padding: "18px 22px", marginBottom: 20}}>
            <h3 style={{fontSize: "0.95rem", fontWeight: 600, color: "#3d6b5e", marginBottom: 8, margin: "0 0 8px"}}>How to use this tab</h3>
            <p style={{fontSize: "0.84rem", color: "#2a4d44", marginBottom: 10, margin: "0 0 10px"}}>Each week has one personal LinkedIn post. These are the posts that build trust and awareness — which Windsor.ai confirmed are your two biggest priorities right now, and personal stories are what drives both.</p>
            <p style={{fontSize: "0.84rem", color: "#2a4d44", marginBottom: 10, margin: "0 0 10px"}}>Under each week you'll find a <strong>ready-to-use Claude prompt</strong>. Copy it exactly, paste it into your Claude, and it will generate the post. Tweak the output until it sounds like you — remove any hyphens, short staccato lines, or anything that feels robotic.</p>
            <p style={{fontSize: "0.84rem", color: "#2a4d44", margin: 0}}>You don't need to post these in order. Pick the week that feels most timely.</p>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
            <IdeaCard id="s1" hook={`Week 1 — "My mum's last words to me were: 'You go out that door and you keep on walking.'"`} format="Text + photo"
              why="Your mum is the emotional engine underneath everything you've built. She died in 2020. Her final words are one of the most powerful things you've ever shared. This post will stop people mid-scroll — not because it's dramatic, but because it's true. You're not posting for sympathy. You're posting to show people who you are and what drives you. That's exactly what builds trust."
              prompt={`Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway — a sound-based emotional regulation platform for children aged 4–10.

My mum died in 2020. Her last words to me were: "You go out that door and you keep on walking." She was my biggest supporter and my compass. Losing her, combined with selling my nursery and everything else that happened that year, was the hardest period of my life. I didn't feel ready to build something new until 2024.

I want to write a short, honest LinkedIn post that starts with her words — or something close to them. The post should feel warm and direct, not heavy or grief-led. It should connect her to why I built HushAway and what keeps me going. End with something real, not a sales pitch.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases like "delve into" or "in today's world." Keep it under 200 words. Sound like a real human being who has lived something.`}
              extra={<div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Photo</p><p style={{fontSize: "0.84rem", color: "#6b6860", margin: 0}}>Use a photo of you and your mum together if you have one. If not, a photo of you — warm, not corporate.</p></div>}
            />
            <IdeaCard id="s2" hook={`Week 2 — "I ran a nursery with 130 children and 30 staff. I still didn't know how to help the parents who were really struggling."`} format="Text post"
              why="This is the origin story of HushAway and it's one you haven't told properly yet. You watched parents struggle, felt like you were failing them, and couldn't yet give them anything useful. That gap became HushAway. It's a vulnerable, honest post that shows exactly why you're credible."
              prompt={`Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

I ran a nursery for around five years — 130 children, 30 staff. It was the most formative professional experience of my life. But one of the things that stayed with me was watching parents come in exhausted, overwhelmed, and not knowing what to do for their children who were dysregulated, distressed, or undiagnosed. And I didn't have the tools to give them anything useful. I felt like I was failing them.

That gap — between what those families needed and what existed — is why I eventually built HushAway.

Write a post that starts with the nursery setting and leads into why that experience is the foundation of what I'm doing now. It should feel honest and a little bit humble — this isn't a post about how impressive the nursery was. It's about what I noticed I couldn't do, and why that matters.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. No sales pitch at the end.`}
            />
            <IdeaCard id="s3" hook={`Week 3 — "I arrived in Portugal in high beta. The sound therapist knew before I said a word."`} format="Text + photo"
              why="This post works on two levels. One: the contrast between your corporate background and going to Portugal for sound therapy is inherently interesting. Two: you experienced exactly what HushAway does for children. You were a dysregulated adult, and sound brought you back. That's your lived proof."
              prompt={`Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

In February 2026, I attended a two-weekend immersive sound therapy course in Portugal. I went in at full pace — high cortisol, running at full capacity, the way I'd been running for months. The first session was intense: I was shaking, felt completely overwhelmed, and came out the other side feeling like something had genuinely shifted. I came back at a different speed.

The reason this matters is that I'm building a product that uses sound to help children regulate themselves. I experienced what that actually does — not as a researcher, but as a person who needed it.

Write a post that starts with landing in Portugal and builds to what I experienced and what it proved to me. The contrast angle — corporate trainer to sound therapy retreat — should be in there, but not played for laughs.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. End with something real, not a product pitch.`}
            />
            <IdeaCard id="s4" hook={`Week 4 — "I've got a chopper bike in the shed. Here's what growing up on a farm actually taught me about emotional regulation."`} format="Text + photo"
              why="This is the lightest post in the month — a bit of warmth and personality before getting serious again. Your generation will latch onto the chopper bike immediately. Children used to regulate instinctively through nature, movement, boredom, and outdoor sounds. The contrast between what you had as a child and what today's children are living in is HushAway's whole reason for existing."
              prompt={`Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

I grew up on a farm. I had a chopper bike. If you had a chopper in the 70s, you were cool — and I was absolutely that child. Unstructured time, outdoor sounds, boredom, mud, animals. Nobody called it emotional regulation, but that's exactly what it was.

I want to write a warm, slightly nostalgic LinkedIn post that opens with the bike and the farm, and then connects it to what I've learned about why children today struggle to regulate. Not in a "kids these days" way. More in a "something was happening in those unstructured hours that we didn't have a word for, and now we do" way.

End with why that realisation feeds into what HushAway tries to give children now.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. Make it feel warm and a bit personal, not preachy.`}
              extra={<div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Photo</p><p style={{fontSize: "0.84rem", color: "#6b6860", margin: 0}}>A childhood photo if you have one. People love a throwback. It'll double the engagement.</p></div>}
            />
            <IdeaCard id="s5" hook={`Bonus — "Someone tried to take my business from me. Here's what I did the morning after the hardest night of my career."`} format="Text post"
              why="This is the nursery sabotage story — a manager who spread rumours, tampered with records, and reported you to Ofsted with 25 fabricated allegations. Ofsted dismissed everything after a full investigation. Resilience stories land as proof of who someone is — people who read it will trust you more, not feel sorry for you."
              prompt={`Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

When I ran my nursery, a manager I'd hired turned out to be someone who worked against me — spreading false rumours, interfering with records, and eventually reporting me to Ofsted with 25 fabricated allegations. Ofsted investigated all day. They dismissed every single one. But I didn't know they would. The night before their decision, I was in the worst place I've ever been.

What I want to write is a post about what happened the next morning — the decision I made, and what it changed in how I ran the business from that day on. This isn't a victim story. I don't want it to feel like one. It's a story about what you do when someone tries to take something you've built.

Write the post starting in that moment — don't explain the whole backstory. Just enough context so the reader understands the weight of it. Then lead into the decision and what followed.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Under 250 words. No corporate language. Start in the scene, not the setup.`}
            />
          </div>
          <CommentBox clientName="Nikki McReynolds" tabName="Content — May LinkedIn Plan" slug={slug} />
        </div>
      )}

      {contentSubTab === "belief" && (
        <div>
          <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
            <IdeaCard id="b1" hook={`"I believe empathy can't be taught. The most empathetic people I know are the ones who've been hurt the most."`} format="Text post"
              why="This is one of your deepest beliefs and you said it directly in your onboarding answers. It's also personal — you've lived it. Post it as an opinion, not as a lesson. Don't hedge it. Let people agree or disagree. The ones who agree are your people."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["Who in your life embodies this? (Without naming them if private)", "What does this mean for how you built HushAway?", "How does this connect to why you're drawn to working with families who are struggling?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>Do you agree? Disagree? I'd genuinely like to know — drop it in the comments.</p></div></div>}
            />
            <IdeaCard id="b2" hook={`"We say we want children to be seen. But do we actually let them feel what they feel, or do we rush them past it?"`} format="Text post"
              why="One of the things you feel strongly about is that children aren't given permission to sit with their emotions. We say 'you're okay' when they're not. You've talked about HushAway creating space for children to explore how they feel, not just calm down fast. That distinction is worth making explicitly."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What's the difference between regulating a child and helping them understand what they're feeling?", "When did you first notice adults rushing children past their emotions rather than through them?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>What do you do when your child is in the middle of something big emotionally? I'm curious how other parents handle this.</p></div></div>}
            />
            <IdeaCard id="b3" hook={`"I'm not a parent. I'm not neurodiverse. Here's why I'm building this anyway."`} format="Text post"
              why="You know this is the question sitting in the back of people's minds. Address it directly, once, on your terms. This is one of the most powerful posts you haven't written yet — because it pre-empts the doubt and replaces it with your actual answer: the nursery, the coaching, the training, the families, the years spent walking alongside parents who were struggling."
              extra={<div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["When did you first feel you had enough credibility to do this?", "What do you have that a parent of an ND child wouldn't necessarily have?", "What do the 11 experts, the 55+ children, and hundreds of families tell you that your own parenthood can't?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div>}
            />
          </div>
          <CommentBox clientName="Nikki McReynolds" tabName="Content — Belief & Opinion" slug={slug} />
        </div>
      )}

      {contentSubTab === "contrarian" && (
        <div>
          <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
            <IdeaCard id="c1" hook={`"Stop calling ADHD a superpower. Not every day is a superpower day."`} format="Text post"
              why="This is your strongest contrarian position and it's already embedded in your onboarding answers. It's polarising but fair — you're not attacking the idea of ND children having strengths, you're calling out the pressure that the narrative puts on families. Let this be blunt. It'll attract exactly the right people and filter out exactly the wrong ones."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What do parents actually say to you when the 'superpower' framing doesn't match their reality?", "What message does it send to a neurotypical child when superpowers only belong to ND children?", "What framing would you use instead?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>What do you think? Does this framing help your family or put pressure on it?</p></div></div>}
            />
            <IdeaCard id="c2" hook={`"Handing your personal brand to an agency is one of the most expensive mistakes you'll make."`} format="Text post"
              why="This is lived experience — you've been through it and come out the other side with a clear view. You kept your LinkedIn yourself, which is exactly right. This post isn't a complaint — it's advice to other founders who might be about to make the same mistake."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What specifically goes wrong when a brand's social voice is handed over?", "What should a founder keep control of, always?", "What's the one question to ask any agency before you sign?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div></div>}
            />
            <IdeaCard id="c3" hook={`"The school system doesn't have a behaviour problem. It has a support problem. And closing special schools won't fix it."`} format="Text post"
              why="The SEN review closing specialist schools and pushing ND children into mainstream is actively happening right now. You have direct insight into what this means for families. This is a topical, urgent, credible opinion you are uniquely placed to hold."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What does a non-verbal, severely autistic child actually experience in a mainstream classroom?", "What do teachers need that they're not getting?", "What would you say directly to the Department of Education if you had five minutes?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>If you're a SENCO, a teacher, or a parent navigating this — what are you seeing on the ground?</p></div></div>}
            />
          </div>
          <CommentBox clientName="Nikki McReynolds" tabName="Content — Bold & Contrarian" slug={slug} />
        </div>
      )}

      {contentSubTab === "practical" && (
        <div>
          <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
            <IdeaCard id="p1" hook={`"This weekend: try one of these three sounds before you reach for your phone. The results might surprise you."`} format="Text post"
              why="This gives parents something concrete to try today, at home, for free — a weekend sound challenge using household sounds (hairdryer, kettle, fan, running water, birds outside). The practical post that follows up from what they tried is the content gold."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["Which three sounds are easiest for parents to try at home with zero effort?", "What should they notice in their child? What are the signs it's helping?", "How long should they try it for before drawing any conclusion?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>Try it this weekend and let me know what you notice. DM me or comment — I want to hear what worked.</p></div></div>}
            />
            <IdeaCard id="p2" hook={`"Sunday to Monday is the hardest transition of the week for ND children. Here's why — and what actually helps."`} format="Text post / video"
              why="You identified transitions as the key pain point for ND families. Sunday night to Monday morning. Friday to Saturday. After lunch at school. These moments of change are where the nervous system struggles most. Make this practical and specific — not 'sound can help' but 'this is what you do Sunday night at 7pm.'"
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What's actually happening neurologically during a transition for an ND child?", "What's the simplest thing a parent can do to introduce predictability before Monday?", "How does playing a familiar sound earlier in the day prime the nervous system for later?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>Which transition is hardest in your household? I'm collecting this for something — drop it below.</p></div></div>}
            />
          </div>
          <CommentBox clientName="Nikki McReynolds" tabName="Content — Practical & Educational" slug={slug} />
        </div>
      )}

      {contentSubTab === "authority" && (
        <div>
          <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 40}}>
            <IdeaCard id="a1" hook={`"One in five children in the UK. If you're a teacher in a class of 30, six of your students are carrying more than you know."`} format="Text post"
              why="You mentioned this statistic in Session 10 in the context of the Dale Carnegie network. It's a simple, striking reframe — take a percentage and make it a classroom. The authority here is in the specificity: not just 'this is common,' but 'here's what that number looks like in a room you're standing in.'"
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What does a classroom actually feel like when six children are in emotional dysregulation simultaneously?", "What do teachers tell you they most need but aren't getting?", "What would change in that classroom if those six children had one consistent regulatory anchor?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>If you're a teacher or SENCO, I'd love to hear what you're seeing. What would actually help? My inbox is open.</p></div></div>}
            />
            <IdeaCard id="a2" hook={`"55 children across the world. Here's what they told us that no researcher could have."`} format="Text + carousel"
              why="Your SoundSonic Ambassadors are real children who tested HushAway before launch. Real quotes from children: 'I felt sad before, and now I don't.' 'I wiggle on my chair and I thought I wasn't allowed, but it's okay.' 'I feel brave.' These quotes are more powerful than any credential."
              extra={<div><div style={{marginTop: 14}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Prompting questions</p><ul style={{listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4}}>{["What were the most unexpected things children told you about how the sounds made them feel?", "Were there any children for whom it didn't work — and what did that teach you?", "What did parents notice that the children couldn't articulate themselves?"].map((q, i) => <li key={i} style={{fontSize: "0.84rem", color: "#6b6860", paddingLeft: 14, position: "relative"}}><span style={{position: "absolute", left: 0}}>·</span>{q}</li>)}</ul></div><div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}>The Open Sanctuary is free. Let your child try it this week and tell me what they say.</p></div></div>}
            />
          </div>
          <CommentBox clientName="Nikki McReynolds" tabName="Content — Authority" slug={slug} />
        </div>
      )}

      {contentSubTab === "video" && (
        <NikkiVideoTab slug={slug} />
      )}
    </div>
  );
}

function NikkiVideoTab({ slug }: { slug: string }) {
  const [openVideos, setOpenVideos] = useState<Record<string, boolean>>({});

  function VideoCard({ id, title, format, benNote, hookA, hookB, script, cta, repurpose }: { id: string; title: string; format: string; benNote: string; hookA: string; hookB: string; script: string; cta: string; repurpose: string }) {
    const isOpen = openVideos[id];
    return (
      <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, overflow: "hidden"}}>
        <div onClick={() => setOpenVideos(prev => ({...prev, [id]: !prev[id]}))} style={{display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer", userSelect: "none"}}>
          <p style={{flex: 1, fontSize: "0.9rem", fontWeight: 600, color: "#1a1916", lineHeight: 1.4, margin: 0}}>{title}</p>
          <span style={{fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: "#eef2f7", color: "#3a5c7a", flexShrink: 0}}>{format}</span>
          <span style={{color: "#9e9b94", fontSize: "0.68rem", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none", flexShrink: 0}}>▶</span>
        </div>
        {isOpen && (
          <div style={{padding: "0 20px 18px 20px", borderTop: "1px solid #e4e2dc"}}>
            <div style={{fontSize: "0.84rem", color: "#3d6b5e", background: "#eef4f2", borderLeft: "2px solid #3d6b5e", padding: "8px 12px", borderRadius: "0 6px 6px 0", marginTop: 14, lineHeight: 1.55}}><strong>Ben: </strong>{benNote}</div>
            <div style={{marginTop: 14}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Hook option A</p>
              <div style={{background: "#fdf8ec", border: "1px solid #ede0b8", borderRadius: 6, padding: "10px 14px"}}><p style={{fontSize: "0.84rem", color: "#6b5020", fontStyle: "italic", margin: 0, lineHeight: 1.55}}>{hookA}</p></div>
            </div>
            <div style={{marginTop: 10}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Hook option B</p>
              <div style={{background: "#fdf8ec", border: "1px solid #ede0b8", borderRadius: 6, padding: "10px 14px"}}><p style={{fontSize: "0.84rem", color: "#6b5020", fontStyle: "italic", margin: 0, lineHeight: 1.55}}>{hookB}</p></div>
            </div>
            <div style={{marginTop: 14}}>
              <p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 6, margin: "0 0 6px"}}>Full script</p>
              <div style={{background: "#f2f1ee", border: "1px solid #e4e2dc", borderRadius: 6, padding: "14px 16px"}}><p style={{fontSize: "0.8rem", color: "#1a1916", lineHeight: 1.75, whiteSpace: "pre-wrap", margin: 0}}>{script}</p></div>
            </div>
            <div style={{background: "#eef4f2", borderRadius: 6, padding: "10px 14px", marginTop: 14}}><p style={{fontSize: "0.8rem", color: "#3d6b5e", margin: 0}}><strong>CTA:</strong> {cta}</p></div>
            <div style={{marginTop: 10}}><p style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9e9b94", marginBottom: 4, margin: "0 0 4px"}}>Repurpose as</p><p style={{fontSize: "0.8rem", color: "#6b6860", margin: 0}}>{repurpose}</p></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{background: "#eef4f2", border: "1px solid #cfe0db", borderRadius: 8, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12}}>
        <span style={{fontSize: 16, flexShrink: 0}}>💬</span>
        <p style={{fontSize: "0.84rem", color: "#2a4d44", margin: 0, lineHeight: 1.55}}><strong>A note from Ben:</strong> I know you've been looking at a video strategy offer from someone else. I've looked at it properly. It's a good model — a weekly live show with a full content repurposing system built around it. I want to be honest with you about both sides, because I think you deserve that more than a sales pitch.</p>
      </div>

      <div style={{background: "#fff", border: "1px solid #e4e2dc", borderRadius: 8, padding: "22px 24px", marginBottom: 20}}>
        <h3 style={{fontSize: "0.95rem", fontWeight: 600, color: "#1a1916", marginBottom: 10, margin: "0 0 10px"}}>The strategy — what we're building and why</h3>
        <p style={{fontSize: "0.84rem", color: "#6b6860", marginBottom: 12, lineHeight: 1.65, margin: "0 0 12px"}}>The goal isn't to become a podcaster. It's to become a thought leader people have a reaction to — ideally "I really like her" or "she's not for me," both of which are fine. Indifference is the only thing that doesn't work. Short, punchy, solo talking-head videos where you are the content. Your opinion, your experience, your direct challenge to how things are currently done.</p>
        <p style={{fontSize: "0.84rem", color: "#6b6860", marginBottom: 12, lineHeight: 1.65, margin: "0 0 12px"}}>Everything we've already built together — the LinkedIn posts, the newsletter, the messaging framework, the positioning work — feeds directly into this. These videos aren't separate from that work, they are the next layer of it. Each video becomes a LinkedIn post, a newsletter section, a short clip, a quote.</p>
        <p style={{fontSize: "0.84rem", color: "#6b6860", marginBottom: 14, lineHeight: 1.65, margin: "0 0 14px"}}>The three-month arc below is designed to build trust at scale. Month 1 is about introducing who you are. Month 2 is about expertise and taking stronger positions. Month 3 is about drawing potential HushAway members into your world. You batch record each month in one sitting — 4–6 videos, one Saturday morning.</p>
        <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
          {["2–4 mins per video", "Solo talking head — no guests needed", "Batch record 4–6 per session", "LinkedIn · Instagram · TikTok · YouTube", "Phone + tripod + natural light — that's all"].map((tag, i) => (
            <span key={i} style={{fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: "#eef4f2", color: "#3d6b5e"}}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Month 1 */}
      <div style={{marginBottom: 36}}>
        <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 6}}>
          <span style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", padding: "4px 12px", borderRadius: 20, background: "#eef4f2", color: "#3d6b5e", border: "1px solid #cfe0db", whiteSpace: "nowrap"}}>Month 1</span>
          <p style={{fontSize: "0.84rem", fontWeight: 600, color: "#6b6860", borderLeft: "2px solid #e4e2dc", paddingLeft: 12, lineHeight: 1.5, flex: 1, margin: 0}}>Establish who you are. Make people feel something. Give them a reason to follow you — not just HushAway.</p>
        </div>
        <div style={{height: 1, background: "#e4e2dc", marginBottom: 18}} />
        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <VideoCard id="v1" title={`Video 1 — "I had an idea. It didn't exist. So I built it."`} format="Talking head"
            benNote="This is your origin story — the one that makes people stop scrolling. We've used this line in your LinkedIn work and it lands every time. In video, with your face and voice behind it, it will be even stronger. Don't polish it. The rawer this feels, the better it works."
            hookA={"I had an idea for something that I couldn't find anywhere in the world. So I stopped looking and started building it instead."}
            hookB={"In 2024 I walked away from a twenty-year career to build something from scratch. Not because I had a plan. Because I couldn't not."}
            script={`"I've spent the last eighteen months building something that, hand on heart, I couldn't find anywhere else in the world. And believe me, I looked.

I'm Nikki McReynolds. I'm the founder of HushAway — a sound-based platform that helps children aged four to ten manage their emotions. Not through medication. Not through clinical intervention. Through sound. Through story. Through something they can actually use at home, tonight, before anything else has worked out.

I came to this from a very particular set of experiences. I ran a nursery with 130 children and 30 staff for five years near Hampton Court. I trained 600 business leaders in communication and executive presence. I coached families through some of the hardest periods of their lives.

And across all of it, I kept seeing the same thing. Children who were dysregulated and parents who were exhausted and a gap between the two that nobody was filling.

HushAway launched three weeks ago. And I am nowhere near done.

If you're a parent of a child who finds the world a bit much — or a teacher who sees those children every day — I'd love you to stick around. Follow along. Because I'm going to keep talking about this, honestly, for as long as it takes.

Link in the comments if you want to try the free tier tonight."`}
            cta="Follow along if you want to see where this goes. And if you have a child who finds it hard to settle — the first tier of HushAway is free. Link in the comments."
            repurpose="LinkedIn text post (pull 'I had an idea. It didn't exist. So I built it.' as the opener). Newsletter intro. Pin to your LinkedIn profile for the month."
          />
          <VideoCard id="v2" title={`Video 2 — "The 'superpower' narrative is doing ND children real harm. I'm going to explain why."`} format="Opinion / Contrarian"
            benNote="This is your dividing line video. You said in our sessions that you hate the superpower framing — use that energy. People will either nod and share it, or disagree loudly, and both are exactly what you want. Do not soften it."
            hookA={"Superpower. I hate that word in this context. And I want to tell you why — because I think it's doing real harm to the families it's supposed to help."}
            hookB={"We've been telling neurodiverse children they're superheroes. And I think, on some days, that's the cruellest thing we could say."}
            script={`"I want to talk about a word that's become so common in the neurodiversity space that nobody questions it anymore. And that word is superpower.

Now I understand why it happened. It came from a place of love. Parents wanting their children to feel proud, not broken. And that instinct is right.

But here's what I keep seeing. On the hard days — the days where a child can't get dressed without a meltdown, can't transition between activities, can't fall asleep, can't stop crying and doesn't know why — the superpower framing doesn't help. It excludes them. Because on that day, they don't feel like a superhero. They feel like they're failing at something everyone else finds easy.

And the parents watching that? They feel it too.

Not every day is a superpower day. Some days are just messy and hard and exhausting for everyone involved. And I think those children — and those families — deserve language that makes room for that. Dignity doesn't have to mean exceptional. Safety doesn't require being remarkable.

That's the whole philosophy behind what I've built with HushAway. Not 'your child is extraordinary.' Just: your child deserves to feel okay. That's enough.

What do you think? Am I wrong about this?"`}
            cta="Drop a 🤍 in the comments if you've ever had a day where that framing felt like pressure rather than comfort."
            repurpose="Strong standalone LinkedIn text post using 'Not every day is a superpower day' as the hook. Clip the first 30 seconds for TikTok/Reels. Will generate comments — respond to every one."
          />
          <VideoCard id="v3" title={`Video 3 — "I ran a nursery with 130 children. Here's what I wish I'd known."`} format="Story / Credibility"
            benNote="We've talked about the nursery story in sessions but you haven't told it on video yet. This is the one that closes the credibility gap fastest — not because it proves you're an expert, but because it shows you were in the room. The vulnerability is the point."
            hookA={"I ran a nursery near Hampton Court for five years. 130 children. 30 staff. And looking back, I failed some of those families — not because I didn't care, but because I didn't know enough."}
            hookB={"There were children in my nursery who I could never quite reach. I thought about them for years after I sold it. HushAway is my answer to them."}
            script={`"Before I built HushAway, I ran a nursery.

130 children. 30 staff. Near Hampton Court. For five years. And it was the most formative professional experience of my life — not because it went smoothly, but because of what I saw there that I couldn't fix at the time.

Parents dropping off children who were already dysregulated before nine in the morning. Children who couldn't transition between activities, couldn't manage noise, couldn't settle. Parents picking them up at the end of the day — exhausted, worried, sometimes in tears.

And what I know now, that I didn't know then, is that many of those children were probably neurodiverse. And many of those parents were completely alone in it, waiting on lists, trying to make sense of something that had no name for them yet.

I sold that nursery just before COVID. And for a long time, I carried a quiet guilt about the gap I'd seen and hadn't known how to fill.

HushAway came out of that. Not as a product — as an answer to a question I'd been sitting with for years.

I can't go back and help those families. But I can make sure the next generation of them has somewhere to go.

That's why I built it."`}
            cta="I built HushAway for the children I saw in that nursery — and for every family like them. If that's you, the first tier is free. Link in the comments."
            repurpose="LinkedIn post with the hook 'There were children in my nursery I could never quite reach.' Pin after Video 1's pin period ends."
          />
          <VideoCard id="v4" title={`Video 4 — "My mum's last words to me were: 'You go out that door and you keep on walking.'"`} format="Personal / Story"
            benNote="You've mentioned your mum multiple times across our sessions. You haven't posted about her yet — not properly. This doesn't need to be heavy. It can be warm and funny and full of her. But it's the video that will make people fall in love with who you are. Save it for a day when you feel grounded and ready."
            hookA={"My mum died in 2020. And to this day, when something goes wrong, I hear her voice before I hear my own."}
            hookB={"Her last words to me were: 'You go out that door and you keep on walking.' I've thought about that most days since."}
            script={`"My mum died in 2020.

She was my compass. The person who knew, before I did, what I was capable of. The one who didn't require proof before she believed in me.

2020 was the year I sold my nursery. Ended a relationship. Sold my flat. And then COVID happened, and then she was gone, and all of it landed at once.

I won't pretend I handled it well. I didn't.

It took me until 2023 to really accept that she wasn't coming back. And 2024 to feel ready to build something new.

Her last words to me were: 'You go out that door and you keep on walking.' She said it like she knew I'd need reminding.

She was right.

HushAway launched a few weeks ago. And whenever I doubt whether I should be doing this — whether it'll work, whether I'm the right person to do it — I hear her.

I don't share this for sympathy. I'm not a victim and I don't want to be. I share it because I think most people who build something hard have a reason that goes beyond the product. Mine is partially her.

If you had someone like that — someone who believed in you unreasonably — you'll know what I mean."`}
            cta="No hard sell here. If you're building something and you're doing it partly for someone — tell me. I'd love to know."
            repurpose="Standalone LinkedIn text post. High engagement potential — deeply human. The photo of you both, if you use it, will significantly increase reach."
          />
        </div>
      </div>

      {/* Month 2 */}
      <div style={{marginBottom: 36}}>
        <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 6}}>
          <span style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", padding: "4px 12px", borderRadius: 20, background: "#eef2f7", color: "#3a5c7a", border: "1px solid #c8d9e8", whiteSpace: "nowrap"}}>Month 2</span>
          <p style={{fontSize: "0.84rem", fontWeight: 600, color: "#6b6860", borderLeft: "2px solid #e4e2dc", paddingLeft: 12, lineHeight: 1.5, flex: 1, margin: 0}}>Establish expertise and take positions. Build the trust that converts a follower into someone who believes you know what you're talking about.</p>
        </div>
        <div style={{height: 1, background: "#e4e2dc", marginBottom: 18}} />
        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <VideoCard id="v5" title={`Video 5 — "We've been telling parents to wait for a diagnosis. I want to challenge that."`} format="Opinion / Timely"
            benNote="The diagnostic waiting list issue is live right now — the SEN review in March 2026 has put this front and centre. You're the person who can speak to this without a clinical background making you cautious. You're an advocate, not a clinician, and that's exactly what these families need."
            hookA={"The average wait for an ADHD assessment in the UK is currently over three years. And the advice most families get in the meantime is: be patient. I want to talk about why that's not good enough."}
            hookB={"You don't need a diagnosis to need support. I feel like this needs saying clearly, because nobody seems to be saying it."}
            script={`"Let me paint you a picture.

A family notices their seven-year-old is struggling. Not in a dramatic way — in a quiet, grinding, daily way. Transitions are hard. Sleep is a battle. School is exhausting for everyone. Meltdowns happen at home because she's been holding it together all day.

They go to the GP. They get referred. And then they wait.

Three years, in many cases. Three years of not knowing. Three years of managing the symptoms without a framework for understanding them.

I'm not anti-diagnosis. Please hear that. A diagnosis can be a profound relief for a family — it gives language, it unlocks support, it says: this is real, this is not your fault.

But here's what I believe: you don't need a diagnosis to need support. And you shouldn't have to wait three years to find something that helps.

There are tools — holistic, non-clinical, evidence-informed tools — that families can use right now. In the home. Tonight. That don't require a letter from a consultant.

HushAway is one of them. It won't diagnose your child. It won't replace medication or therapy. But it will give your child somewhere safe to land when the world gets too loud. And it will give you ten minutes to breathe.

If you're in that waiting room right now — you don't have to just wait."`}
            cta="If you're in that waiting period and want something you can use tonight, the Open Sanctuary is free. Link in the comments. No card required."
            repurpose="LinkedIn post with 'You don't need a diagnosis to need support' as the standalone hook. Also a natural email newsletter section."
          />
          <VideoCard id="v6" title={`Video 6 — "Schools are being asked to absorb children they don't have the tools to support."`} format="Opinion / Policy"
            benNote="The March 2026 SEN review is a genuine hook for this video — it's current, it affects your whole secondary audience, and it positions you as someone watching the sector closely. Calm and measured is the right register here. This is the video that gets shared in staff rooms."
            hookA={"Following the SEN review in March, mainstream schools in England are now responsible for children whose needs they weren't set up to meet. I want to talk about what that actually looks like in a classroom."}
            hookB={"There's a teacher somewhere right now with 30 children in a classroom, one of whom is dysregulated, and no additional support available. I think about that teacher a lot."}
            script={`"I want to talk about something that came out of the SEN review in March, because I don't think it's been discussed clearly enough.

Mainstream schools are now being asked to include and support children with a much wider range of needs than they were designed for. The intention is right — inclusion matters. But the resource to back it up hasn't followed.

So here's what that looks like in practice. A class teacher with 30 children, one of whom has ADHD and sensory processing difficulties, is dysregulating in the classroom. The SENCO is covering three schools. There's no one-to-one support available today. And the teacher has twenty-nine other children who also need to learn.

This isn't a criticism of teachers. They are doing something extraordinary under impossible conditions.

But children who are struggling don't stop struggling because the adults around them are stretched. They need practical tools — tools that work in a real classroom, not in a specialist setting. Tools that can be used before a meltdown, not just after one.

That's what I've been building with HushAway. Audio-based sensory tools that a child can access independently. That a teacher can suggest without needing training. That don't require a diagnosis or a referral or a budget line.

I'm talking to schools at the moment. If you're a SENCO or a teacher reading this and you'd like to explore what that looks like — I'd genuinely love to hear from you."`}
            cta="If you work in a school and you're seeing this on the ground — I'd love to know what it looks like from where you are. Comment below or get in touch directly."
            repurpose="LinkedIn post targeting educators — leads with the teacher image. Share into SENCO and teacher groups where possible. This is your best school pipeline video."
          />
          <VideoCard id="v7" title={`Video 7 — "What emotional dysregulation actually looks like — and why most people have it wrong."`} format="Educational + Demo"
            benNote="Most people picture the dramatic version — the full meltdown in a supermarket. The subtler, daily version is what your audience is actually living with and rarely sees reflected back at them accurately. This video validates families who've been misunderstood, and provides the perfect context to demo a HushAway audio clip."
            hookA={"When people picture emotional dysregulation, they think meltdown. But most families living with it are dealing with something quieter, more chronic, and much harder to explain to anyone who isn't in it."}
            hookB={"The child who cries on the way home from school every day — not because anything bad happened, but because they held it together all day and now they can't. That's dysregulation. And most people don't recognise it."}
            script={`"I want to talk about what emotional dysregulation actually looks like — because I think there's a real gap between what people expect to see and what families are actually living through.

The dramatic version — the full meltdown, the screaming in a public place — that's the one people imagine. And yes, that happens. But it's not the daily reality for most families.

The daily reality is often quieter than that. It's the child who can't transition between activities without a battle. The one who's fine until they're not, and when they're not it seems to come from nowhere. The one who falls apart on the way home from school because they've been keeping it together all day and they've got nothing left.

It's the child who can't settle at bedtime — not because they're not tired, but because their nervous system hasn't had a chance to come down from the day.

None of these look dramatic. Many of them look like behaviour problems, or defiance, or anxiety. And so families spend years managing what looks like the symptom, without understanding the system underneath.

Sound, it turns out, is one of the most effective regulators of the nervous system — this is well-established in sensory integration research and it's the foundation of what I've built with HushAway.

[At this point, play 15–20 seconds of a HushAway audio clip directly]

What you're hearing isn't just background noise. It's been designed specifically to help a dysregulated nervous system find its way back down.

That's what HushAway does. And I'm proud of it."`}
            cta="Try the Open Sanctuary for free — let your child pick what they want to listen to. See what happens. Link in the comments."
            repurpose="The 'held it together all day' hook works brilliantly as a standalone LinkedIn text post. The demo clip makes this a good YouTube long-form candidate too."
          />
          <VideoCard id="v8" title={`Video 8 — "I resigned from Dale Carnegie in March. It was harder than I expected."`} format="Personal / Behind the scenes"
            benNote="You mentioned this in Session 9 and said the culture had changed — that the people who made it feel right had gone. That's a very human and relatable experience of leaving something you'd invested in. The LinkedIn audience of people still in corporate jobs will feel this deeply."
            hookA={"In March I resigned from a role I'd held for years. One I'd genuinely loved. The leaving was harder than I thought it would be — not because I wanted to stay, but because it was the last piece of an old identity."}
            hookB={"I've spent twenty years helping other people find their voice. Last month I finally cleared the last thing that was stopping me using mine."}
            script={`"I want to talk about something I haven't mentioned publicly yet. In March, I resigned from a training role I'd had for years.

It wasn't a dramatic decision. There was no big falling out. But the culture had shifted. The people who had made it feel like somewhere I belonged had moved on, and what was left didn't align with who I am now.

The strange thing is, I was at peace with the decision before I made it. I knew it was right. But the day I actually resigned — the day it was real — I felt the loss of it more than I expected.

Because it wasn't just a role. It was a significant part of how I'd identified professionally for a long time. Walking away from that, even when it's right, asks you to answer the question: okay, so who are you now?

I know who I am now. I am the founder of HushAway. I am the creator of The PeacePath. That is what I am building and it is the most important work I have ever done.

But I think it's worth saying that the steps forward aren't always clean. Sometimes they're a bit bittersweet. And that's allowed.

If you're sitting on a decision you know is right but you're not quite ready to make — I see you. It'll still be right when you're ready."`}
            cta="No ask here. Just: if this landed for you, follow along. I'm going to keep being honest about what this journey actually looks like."
            repurpose="LinkedIn text post using Hook B as the opener. High save potential. The corporate-to-founder audience will forward this to each other."
          />
        </div>
      </div>

      {/* Month 3 */}
      <div style={{marginBottom: 36}}>
        <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 6}}>
          <span style={{fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", padding: "4px 12px", borderRadius: 20, background: "#fdf3ea", color: "#c4793a", border: "1px solid #f0d4b8", whiteSpace: "nowrap"}}>Month 3</span>
          <p style={{fontSize: "0.84rem", fontWeight: 600, color: "#6b6860", borderLeft: "2px solid #e4e2dc", paddingLeft: 12, lineHeight: 1.5, flex: 1, margin: 0}}>Convert trust into action. Draw the right people toward HushAway — warm, direct, without apology. You've earned the ask by now.</p>
        </div>
        <div style={{height: 1, background: "#e4e2dc", marginBottom: 18}} />
        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <VideoCard id="v9" title={`Video 9 — "I want to tell you about the children who tested HushAway."`} format="Social proof / Story"
            benNote="By month 3 you should have parent testimonials building. This video is the bridge — it uses the SoundSonic Ambassadors (55+ children, global) as the social proof vehicle, but it also invites your growing audience to share their own experiences."
            hookA={"Before HushAway launched publicly, 55 children from around the world spent months testing it. I want to tell you what they said."}
            hookB={"A seven-year-old in New Zealand listened to one of our soundscapes for the first time and said: 'It sounds like the inside of safe.' I don't think I'll ever forget that."}
            script={`"Before HushAway went public, I wanted to know if it actually worked. Not in theory — actually worked, with real children, in real homes, with real families who weren't going to be polite about it if it didn't.

So we ran an ambassador programme. Fifty-five children from across the world — different ages, different needs, different countries. Some neurodiverse, some neurotypical. Some with diagnosed ADHD, some just children who found it hard to switch off.

And they listened. And their parents watched. And they told us what worked and what didn't.

[Share one or two specific, concrete responses here — a favourite soundscape, something a child said, a parent's message]

What came back wasn't what I expected. Children were choosing what they listened to. They were developing preferences. They were going to the app independently before bed.

One parent wrote to me and said: 'For the first time in six months, he's asked to go to his room.'

That's the thing HushAway does that I can't fully quantify. It gives a child somewhere that's theirs. Somewhere safe and still and their own.

If your child has tried HushAway — I'd genuinely love to hear what they said. The children always have the best words for it."`}
            cta="If your child has used HushAway, drop a comment — even just one word they used to describe it. And if you haven't tried it yet, the Open Sanctuary is still free. Link in the comments."
            repurpose="Hook B ('the inside of safe') is a standalone LinkedIn post waiting to happen. Comments from parents on this video are testimonial gold. Screenshot them and save them."
          />
          <VideoCard id="v10" title={`Video 10 — "Here's what I want for these children in ten years' time."`} format="Vision / Legacy"
            benNote="You said in one of our sessions: 'I want to look back in ten years and call them the HushAway children.' That's your legacy frame and it's extraordinary — I've never heard another founder say anything quite like it. This is the kind of video that gets mentioned when journalists and researchers write about you."
            hookA={"In ten years, I want to look back at a generation of children and say: those are the HushAway children. Children who learned to regulate. Who knew what to do when the world got too loud. Who grew up believing they deserved peace without having to earn it."}
            hookB={"Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness. That's not a tagline. That's the whole point."}
            script={`"I want to tell you what I'm actually building here — not the product, the bigger thing.

There's a phrase I keep coming back to. 'Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness.' That's not a tagline. It's the entire point.

What I mean by worthiness is this: right now, the support available to children who struggle emotionally tends to be conditional. You get help if you have a diagnosis. You get resources if you're at a certain school. You get taken seriously if you present in the right way, at the right time, to the right professional.

Children shouldn't have to audition for peace. And parents shouldn't have to fight for the right to be helped.

HushAway is one answer to that. The PeacePath Project — our CIC arm — is about widening access to schools and communities that can't afford a subscription. And eventually, Cosmic Calm for teenagers, and something for the 16–19 age group who are falling through the current gaps entirely.

In ten years, I want to look back at a generation of children who grew up knowing what to do when their nervous system got overloaded. Who had something that worked before they had a label. Who were taught that stillness is a skill, not a luxury.

I want to call them the HushAway children.

That is what I'm building. And I'm only getting started."`}
            cta="If you believe in this — share this video. The more people who know HushAway exists, the more families we can reach. That's the only ask."
            repurpose="Hook A as a LinkedIn post. Hook B as a standalone quote graphic for Instagram. PR-ready: this is the kind of quote a journalist uses in a feature."
          />
          <VideoCard id="v11" title={`Video 11 — "What HushAway actually is — and what it isn't."`} format="Direct / Product"
            benNote="By month 3, your audience trusts you. Now you can talk about the product directly without it feeling like a sales pitch — because the trust is already there. This video is clear, confident, and unapologetic. It's the video you send to a parent who's curious but unconvinced."
            hookA={"I want to be very clear about what HushAway is — and what it isn't. Because I think clarity is more useful than a sales pitch."}
            hookB={"HushAway is not a cure. It's not a diagnosis tool. It doesn't replace therapy or medication. Here's what it actually is."}
            script={`"I want to tell you exactly what HushAway is — clearly, without overselling it, because I think honesty is more important here than sounding impressive.

HushAway is a subscription-based audio platform for children aged four to ten. It contains ASMR-inspired stories, soundscapes, guided affirmations, and sensory rituals. Everything on it is designed to help a child's nervous system find its way back to calm. Better focus. Better sleep. A quieter inner world.

Here's what it isn't.

It is not a medical intervention. It makes no medical claims and never will.
It is not a diagnosis tool — it won't tell you what's going on with your child's neurology.
It is not a replacement for therapy, medication, or any clinical support your family needs.
And it is not one-size-fits-all — because one of the first things I learned in my advisory work is that what regulates one ADHD child will do nothing for another. So we built choice in from day one. Your child picks what they listen to.

It's been reviewed by an advisory circle of eleven experts — doctors, ASMR researchers, sleep practitioners, neuro-psychologists. It's been tested by 55 children from around the world.

It's £14.50 a month. The Open Sanctuary tier is free — no card required.

I built it because I saw families who needed something they could use tonight, before the waiting list came through, before the appointment happened, before they had all the answers. HushAway is that thing.

If you've been curious about it — go and try the free tier. See what your child thinks. They're usually the best judge."`}
            cta="Try the free tier tonight — no card needed, no commitment. Let your child pick what they want to listen to and see what happens. Link in the comments."
            repurpose="LinkedIn post using Hook B. Strong email sequence video — this is the 'what it is' email that follows a free trial sign-up. Pin to your Instagram profile as an evergreen explainer."
          />
          <VideoCard id="v12" title={`Video 12 — "The parents who got in touch after I launched. What they said."`} format="Community / Validation"
            benNote="This is the testimonial video — and it works best when it's told through your eyes, not just quoted. You reading out messages, reacting to them in real time, showing what it means to you. This is trust made visible. Record this after you've had time to gather genuine responses — don't rush it."
            hookA={"Three months ago I launched something I'd been building for eighteen months. I didn't know if anyone would care. Here's what happened."}
            hookB={"A parent sent me a message last week that I haven't been able to stop thinking about. I want to read it to you."}
            script={`"I want to share something with you — and I want to do it carefully, because these are real people and real families.

Since we launched in March, I've had messages from parents. Some I was expecting — people saying thank you, letting me know their child had used something from the app. Others I wasn't.

[Read 2–3 specific messages here. Include at least one unexpected or surprising one. React genuinely — this doesn't need to be polished.]

The reason I'm sharing these isn't to sell you something. It's because I built HushAway in the belief that these families existed — that there were parents out there who needed something I couldn't yet see in the market. And these messages are confirmation that I was right.

The thing that strikes me, reading them back, is how isolated many of these families have felt. Not just in managing their child's needs — but in being seen as someone who's doing their best in a difficult situation.

If you're one of those families — and you're watching this wondering whether HushAway is for you — I want to say clearly: yes. It's for you. That's exactly who it's for.

Come and try it. The first tier is free. And if you have a message you want to send me — I read every one."`}
            cta="If you've been trying HushAway and it's helped — send me a message. I want to hear about it. And if you haven't tried it yet, the link is in the comments. No commitment."
            repurpose="LinkedIn post using Hook A or B depending on which message had the most impact. This video generates significant warm traffic — it's the one that moves fence-sitters into free trial."
          />
        </div>
      </div>

      <CommentBox clientName="Nikki McReynolds" tabName="Content — Video Strategy" slug={slug} />
    </div>
  );
}

export default function ClientDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const client = clientData[slug];
  const [activeTab, setActiveTab] = useState("todos");

  if (slug === "andy-felton") {
    return <AndyFeltonDashboard slug={slug} />;
  }

  if (slug === "nikki-mcreynolds") {
    return <NikkiMcReynoldsDashboard slug={slug} />;
  }

  if (!client) {
    return <PendingDashboard slug={slug} />;
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
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={client.color} />
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Your Actions
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              To-Do List
            </h2>
            <ClientTodoList items={client.todos} clientName={client.name} slug={slug} accentColor={client.color} />
            <CommentBox clientName={client.name} tabName="To-Do" slug={slug} />
            <BenUpdateBox slug={slug} />
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
            <CommentBox clientName={client.name} tabName="Goals" slug={slug} />
          </div>
        )}

        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={client.color} />
        )}

        {activeTab === "brand" && (
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Your Brand Foundation
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
            <div style={{height: 1, background: "#E0DBD3", margin: "28px 0"}} />
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 20}}>Messaging Angles</p>
            <div style={{display: "flex", flexDirection: "column", gap: 2, marginBottom: 40}}>
              {client.messaging.map((m, i) => (
                <div key={i} style={{background: "#fff", border: "1px solid #E0DBD3", borderRadius: 3, padding: "24px 28px"}}>
                  <p style={{fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: client.color, margin: "0 0 8px"}}>{m.frame}</p>
                  <p style={{fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7, margin: 0}}>{m.notes}</p>
                </div>
              ))}
            </div>
            <CommentBox clientName={client.name} tabName="Brand Assets" slug={slug} />
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
            <CommentBox clientName={client.name} tabName="Content Ideas" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}
