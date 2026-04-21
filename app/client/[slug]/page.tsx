"use client";

import { use, useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";

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
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "messaging", label: "Messaging" },
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
          </div>
        )}

        {/* ── POSITIONING ── */}
        {activeTab === "positioning" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>Who You're For & How You're Different</p>
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

            <CommentBox clientName="Andy Felton" tabName="Positioning" slug={slug} />
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

        {/* ── MESSAGING ── */}
        {activeTab === "messaging" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AF_COLOR, marginBottom: 8 }}>How to Talk About What You Do</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Messaging</h2>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", margin: "0 0 28px" }}>The angles, language patterns, and distinctions that define how you communicate. Note: you've been advised not to lead with "AI" or "automation" — people glaze over. Process and systems language lands better.</p>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>Key Messaging Angles</h3>
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

            <CommentBox clientName="Andy Felton" tabName="Messaging" slug={slug} />
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
  { id: "goals", label: "Goals" },
  { id: "positioning", label: "Positioning" },
  { id: "messaging", label: "Messaging" },
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

export default function ClientDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const client = clientData[slug];
  const [activeTab, setActiveTab] = useState("todos");

  if (slug === "andy-felton") {
    return <AndyFeltonDashboard slug={slug} />;
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
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: client.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: client.color}} />
              Your Actions
            </p>
            <h2 style={{fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 40px", letterSpacing: "-0.02em"}}>
              To-Do List
            </h2>
            <ClientTodoList items={client.todos} clientName={client.name} slug={slug} accentColor={client.color} />
            <CommentBox clientName={client.name} tabName="To-Do" slug={slug} />
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
            <CommentBox clientName={client.name} tabName="Positioning" slug={slug} />
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
            <CommentBox clientName={client.name} tabName="Messaging" slug={slug} />
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
