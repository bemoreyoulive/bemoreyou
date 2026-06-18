"use client";

// Alex Shiell Dashboard
// 18yo founder, Shiell Joinery. 13 sessions over 6 months.
// Mission: start a mini revolution. Not commercial. No LinkedIn.
// No em-dashes anywhere in this file. Use commas or full stops instead.
// No sunglasses in profile photo (Ben's rule).
// NextMoveBox: 40-45 words MAX.

import { useState, useEffect } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import CommentBox from "@/components/CommentBox";
import DashboardFooter from "@/components/DashboardFooter";
import EmailOptIn from "@/components/EmailOptIn";
import MilestoneTracker from "@/components/MilestoneTracker";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";

const AS_COLOR = "#d97706"; // Amber, trades energy, young, bold

const AS_NEXT_MOVE = "Before Session 4 (Tuesday 30 June, 6pm). Last session before the holiday. Come with your raw content notes from your phone, an update on the calm video, and anything from the sites worth talking about. We'll use the time to set you up properly before you leave.";

// TODOS. Updated after each session. Keep in sync with lib/todos.ts.

const AS_TODOS: { id: string; text: string; subtext?: string; owner: string; tabLink?: { label: string; tab: string } }[] = [
  { id: "as3-0", text: "Go and read the new bit I've added under Ben's Recommendations about going viral, because I really want you to take this one in properly before we next speak.", owner: "Alex", tabLink: { label: "Open Ben's Recommendations", tab: "recommendations" } },
  { id: "as3-1", text: "Film one calm, candid video before Session 4. Not a rant. Storytelling mode, eyes to camera. The old school mates topic is the right one for it.", owner: "Alex" },
  { id: "as3-2", text: "Send Ben your raw content ideas from your phone notes. Unpolished is exactly what is needed. That is the whole point.", owner: "Alex" },
  { id: "as3-3", text: "Post to drafts first. Film it, sit on it, then post at a sensible time. Not 9 or 10pm when most people are already in bed.", owner: "Alex" },
  { id: "as3-4", text: "Film the going away piece before 1 July. Something like: I'm going away for four weeks at 18 and here is why I am not worried about the business. That is a strong piece of content before you leave.", owner: "Alex" },
  { id: "as3-5", text: "Van review exercise. Ben will send you a photo of a trades van. Record a voice note reaction and send it back. Ben will screen record it and send it to you to post on TikTok and Instagram Story.", owner: "Alex" },
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
    summary: "Blueprint call, 103 minutes. You came in pre-packaged: opinions, voice, on-camera confidence, content already at 100k+ views. We pulled out stories you'd never told and locked the mission: document the journey, start a mini revolution, TikTok first.",
    insights: [
      "You came in with the opinions, the voice and the on-camera confidence already there, which most people take months to build. The job is focus, not creation.",
      "You're chasing clout over money, and at 18 you already understand the long game, which is the thing most people don't get until much later.",
      "The £7.55 firing is the single biggest fuel source for everything you're building. Keep coming back to it.",
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
  {
    number: 2,
    date: "3 June 2026",
    title: "Dashboard walkthrough. Brand locked. The Wolf of Joinery.",
    summary: "Seventy minutes, straight off the tools. You'd sacked Tyler for going behind your back, and the trades college said yes to your free business class. We locked The Wolf of Joinery, the three emoji framework, and the bio direction.",
    insights: [
      "Instagram snapshot, 4 June 2026. @thewolfofjoinery, 48 followers, 0 posts, blue tick paid, bio: 18, Edinburgh, modernising the trades industry, ai, systems, growth. One line to sharpen before Session 3: the ai, systems, growth bit reads startup-generic and doesn't sound like you.",
      "You changed the username, updated the photo and sorted the blue tick before the next morning, off your own back.",
      "The trades college is worth taking seriously. It is a presenting school, a coaching proof of concept, and a monthly source of real tradespeople to talk to and make content about.",
      "The LARPING temptation is real. You floated a fake revenue stat for the bio and Ben pushed back. That kind of move makes you the person you're calling out.",
      "The three emoji system works because it gives you a daily filter. Any moment is either a beer, a van, or a phone. You don't need a content calendar, you need those three.",
    ],
    takeaways: [
      "Four new to-dos in place. First videos this week, a proper profile photo, clean the old IG, review Ahmet Karakaya.",
      "The brand is @thewolfofjoinery across TikTok and Instagram.",
      "Session 3 is fully reactive. Come with stories from the past two weeks and we work with whatever's there.",
    ],
    nextSession: "Session 3. Wednesday 17 June 2026 at 6pm. Fully reactive. No fixed agenda. You bring the stories, we work with what's there.",
  },
  {
    number: 3,
    date: "17 June 2026",
    title: "Content review. Variety, virality, and your real voice.",
    summary: "67 minutes after a long day on site. You'd posted 8 or 9 videos, all rants, with two clear standouts. The main work was variety and the truth about virality. Make more videos, send me your raw notes, and try one calm, candid piece next.",
    insights: [
      "Your two best-performing videos both spoke to a massive existing audience: people weighing up trades versus university, people who have considered short courses. Find more topics like those.",
      "All rants, no variety. Views come in, followers do not stick around at the same rate. The ratio changes when the content type changes.",
      "Virality is a by-product of volume and an authentic voice. It is not a goal you can aim at directly.",
      "Your early calm videos performed well. That mode is in you. It works. Use it.",
      "Your raw content ideas from your phone are better starting material than anything written from scratch. Stop filtering them before sending.",
    ],
    takeaways: [
      "One calm, candid video before Session 4. Old school mates piece. Storytelling mode, not rant mode.",
      "Send Ben the raw notes from your phone. Unpolished is fine.",
      "Post to drafts first. Do not film and upload at 9 or 10pm.",
      "Van review exercise confirmed. Ben sends photo, you send voice note, Ben screen records for TikTok and Instagram Story.",
      "Film the going away piece before 1 July.",
    ],
    nextSession: "Session 4. Tuesday 30 June 2026 at 6pm. Last session before the holiday. Setting you up properly before you leave.",
  },
];

// POSITIONING. Content pillars confirmed Session 2. Bio drafts kept for future reference.

const AS_POSITIONING = {
  headlineDrafts: [
    { risk: 1, text: "Not a guru, refused to go to uni. 18, founder of Shiell Joinery in Edinburgh, going to be bigger than the company that fired me." },
    { risk: 2, text: "Refused to go to uni, I've got no qualifications, and definitely not in Dubai. 18, building Shiell Joinery in Edinburgh on camera.", benTake: "This one's my favourite of the mid-risk lot. Strips out everything you're NOT and leaves the listener with the one thing you ARE, a kid actually building it, in public. My hunch, you'll love this." },
    { risk: 2, text: "THIS. And never going to Dubai. 18, building Shiell Joinery in Edinburgh, going to be bigger than the company that fired me.", benTake: "Playing on that THIS, not Dubai trend doing the rounds right now. The line is the whole joke, so don't explain it. Lands best with a video of you on a job or out living your life. A quirk only your generation fully gets." },
    { risk: 3, text: "Starting a mini revolution in the trades. 18, founder of Shiell Joinery, and apprentices are getting taken the piss out of, so someone needs to say it." },
    { risk: 3, text: "Not a guru, not in Dubai, not selling a course. 18, building Shiell Joinery in Edinburgh, going to be bigger than the company that fired me.", benTake: "Already the line you naturally fall into. Direct, anti-guru, plants the flag, sets up the comeback story. My hunch, you'll love this." },
  ],
  differentiators: [
    "18 years old, in the trades, with a business mindset and an anti-guru position. No one else is in this lane right now.",
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
  uniqueAngles: [
    "The company van series. Every time you spot a building company van, snap a photo. Film a short later: saw this van today, here's what I'd do differently. Recurring format, audience starts sending you vans, free content engine.",
    "The construction industry is living in 2005. You're here to drag it into now. Position every rant against that backdrop.",
    "Call out hustle culture in real time, every time you see it. Quote-stitch a Tate clip, screen-record a Dubai dropshipper post, film a reaction. The contrarian voice has to be in the conversation, not watching from the sidelines.",
    "The 'I'm not a qualified joiner' angle. Lean into it. The trades love telling young people they need 15 years on the tools. You're proof they don't.",
    "Documenting the path to becoming bigger than the company that fired you. A long-running thread. Every milestone, first employee, first 50k job, first press mention, laddered back to the £7.55.",
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
    { title: "Documenting the Journey", body: "This is the big one. The most important pillar. Real-time business reality, hiring your first employee, quoting jobs, winning jobs, losing jobs, the path to becoming bigger than the company that fired you. Behind the scenes of running Shiell Joinery at 18. Younger people build trust and familiarity by watching the journey unfold, not by being lectured at. This is how they end up rooting for you. People follow this because it's actually happening, not a course, not a guru, a real business in real time.", short: "The big one. Real-time business reality, hiring, quoting, winning, losing. Younger people build trust by watching the journey unfold. This is the pillar that compounds." },
    { title: "Contrarian Takes & Mini Revolution", body: "The big-picture contrarian opinions. Trades as the new untapped opportunity. SMMA, dropshipping, Dubai bros are the wrong path. Joinery is the new dropshipping, you're early. The £7.55 story, the school years, the 30 rejected quotes, all live here. Rant format you already know works. This is where the older tradesmen come and troll you in the comments, exactly what you want.", short: "The contrarian opinions and the rant format. Joinery is the new dropshipping. The £7.55 story. Where the older tradesmen come and troll you." },
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

type ContentIdea = {
  hook: string;
  pillar: 1 | 2 | 3 | 4;
  pillarLabel: string;
  effort: "Low effort, phone only" | "A bit of setup";
  format: string;
  guidance: string[];
  noEdit?: boolean;
  status?: "used" | "partial";
  filmsWithMate?: boolean;
};

const AS_CONTENT_WEEK_1: ContentIdea[] = [
  {
    hook: "Everyone my age is trying to make money from a laptop in Dubai, and I'm doing the opposite.",
    pillar: 2,
    pillarLabel: "Contrarian Takes & Mini Revolution",
    effort: "Low effort, phone only",
    format: "Rant in the car, your proven format that's already pulled 100k plus views before.",
    guidance: [
      "Open cold, no warmup: 'Everyone my age is trying to make money from a laptop in Dubai, and I'm doing the opposite.' Hit them with it the second the camera's on.",
      "Name the muppets directly. Dropshipping, SMMA, the Dubai crypto bros flogging a dream they've never actually lived. Don't say 'some people', name them, because every young lad being sold that laptop-millionaire nonsense will see himself in it, and that's a massive audience.",
      "Close on: 'And I'm still early.' Then end it there, no need to bang on.",
    ],
    noEdit: true,
    status: "used",
  },
  {
    hook: "Beach in the morning, quoting a job in the afternoon, so tell me again why I need to grind 16 hours a day.",
    pillar: 4,
    pillarLabel: "Have A Life AND A Business",
    effort: "Low effort, phone only",
    format: "Lifestyle B roll plus one line to camera, or just B roll with one line of text on screen.",
    guidance: [
      "Open with footage rather than words. Beach clip first, tools second, so the contrast makes the argument before you've said anything.",
      "The enemy here is the 16-hours-a-day merchant, but you don't need to name him because the footage already does that job. It resonates with anyone being told to grind every hour of the day, which is most of your generation right now.",
      "You already landed the close in one of your videos: 'There's no point having money if you've got nothing to show for it.' That line works well here.",
    ],
    noEdit: true,
    status: "partial",
  },
];

const AS_CONTENT_WEEK_2: ContentIdea[] = [
  {
    hook: "The shittest two months of my life were spent sweeping floors for £6.40 an hour, and this is what it taught me about the trades industry.",
    pillar: 3,
    pillarLabel: "Calling Out What's Broken",
    effort: "Low effort, phone only",
    format: "Talking head in the car or in the yard, straight to camera.",
    guidance: [
      "Open with the line and lean on the number: 'The two shittest months of my life, I spent sweeping floors for £6.40 an hour.' Say the exact figure, none of this 'low wages' fluff, because hearing it out loud makes people wince.",
      "The enemy is the old-school mentality, the pay your dues, sweep the floors, get taken the piss out of, that's just how it's always been done crowd. Tell them what it was actually like instead of lecturing. This lands with every apprentice getting shafted and every young lad weighing up the trades.",
      "Close on the reframe: 'The trades are still run like it's 2005. That's the problem, or the opportunity, depending what you're made of.'",
    ],
    noEdit: true,
    status: "partial",
    filmsWithMate: true,
  },
];

const AS_CONTENT_WEEK_3: ContentIdea[] = [
  {
    hook: "Quoting a job today, here's what actually goes through my head when I walk through the door.",
    pillar: 1,
    pillarLabel: "Documenting the Journey",
    effort: "Low effort, phone only",
    format: "BTS on your phone, could be selfie style outside the property or talking head in the van straight after.",
    guidance: [
      "Film it outside the property before you go in: 'About to walk into this one, here's what I'm actually thinking.' Filming it in the moment is what makes it work.",
      "Anchor it with something specific: the type of work, the rough price, something about the house or the client. Anything vague gets forgotten. The behind the scenes peek is what pulls in anyone curious whether they could do this themselves.",
      "Close in the van straight after, with one line on how it went, and leave it there.",
    ],
    noEdit: true,
    filmsWithMate: true,
  },
  {
    hook: "Last year I got fired for refusing a pay cut to £7.55 an hour, I took them to tribunal, won, and now I'm building a business to be bigger than them.",
    pillar: 2,
    pillarLabel: "Contrarian Takes & Mini Revolution",
    effort: "Low effort, phone only",
    format: "Talking head in the car, straight to camera, no setup needed.",
    guidance: [
      "Open cold: 'Last year I got binned for refusing to drop to £7.55 an hour.' Drop it with no setup and give it a beat before you carry on.",
      "Lean on the detail that you were on £8 and they tried to cut you to £7.55. The exact figures are what make people feel it, and it lands with anyone who's ever been underpaid and treated like a mug at work.",
      "Close on your own line: 'Become bigger than the company that fired you.' Then end it there.",
    ],
    noEdit: true,
  },
  {
    hook: "Day in the life of an 18 year old running a joinery business, and it's mostly graft no one sees.",
    pillar: 1,
    pillarLabel: "Documenting the Journey",
    effort: "A bit of setup",
    format: "Day in the life format, multiple short clips through the day stitched together, phone only, raw.",
    guidance: [
      "Film one clip every couple of hours throughout the day. Driving to site, picking up materials, eating in the van, chasing an invoice at 9pm. Don't plan it, just grab it.",
      "The anchor is whatever is genuinely unglamorous that day: a traffic jam, a client who moved the goalposts, a supplier who let you down. The more specific, the better, and the honesty is what pulls in everyone wondering if the trades are for them.",
      "Close on: 'That's the job, and I wouldn't swap it.' Leave it there without adding a lecture.",
    ],
    filmsWithMate: true,
  },
  {
    hook: "It's funny who suddenly takes an interest in you the moment you start doing well.",
    pillar: 1,
    pillarLabel: "Documenting the Journey",
    effort: "Low effort, phone only",
    format: "This is the one to try calm and reflective, not ranty. Talking head, eyes to camera, filmed somewhere still rather than mid-rant in the car. Use it to show the quieter side of you.",
    guidance: [
      "Open calm and straight to camera: 'It's funny how, the moment you start doing well for yourself, people who never gave you the time of day suddenly take an interest.' Keep that quieter tone the whole way through.",
      "Keep it general, never about specific people by name. The less you name names, the more people see themselves in it: someone who left school early, came out of a dead-end job, got written off. That is exactly why it resonates, everyone has a version of this.",
      "Use your own line from our call: 'I was irrelevant back then, so why am I suddenly relevant now?' Close on something calm and high ground, like the fact they are still thinking about you tells you you are doing something right. No bitterness, no name calling, that is what makes it land.",
    ],
    noEdit: true,
  },
  {
    hook: "Someone didn't turn up to my site today, and the maddest part is the whole industry just shrugs and accepts it.",
    pillar: 3,
    pillarLabel: "Calling Out What's Broken",
    effort: "Low effort, phone only",
    format: "Talking head, your proven ranty style, in the van or on site. This one suits the energy.",
    guidance: [
      "Open straight in, no warmup: 'A bloke didn't turn up to my site today. And the worst bit isn't that he didn't show. It's that the whole industry just shrugs and accepts it like it's normal.'",
      "Anchor it in what a no-show actually costs you: a day's work gone, a client you then have to apologise to, you ending up doing the job yourself. That's what makes it land, and it hits two crowds at once, every customer who's been let down by a tradesman and every grafter who's had to cover for someone.",
      "Keep the enemy the 'that's just how it is' attitude, not a type of person. Close on the reframe: I keep a list of who actually turns up, and the no-shows don't get a call again, and maybe if more of us did that these chancers would knock it off.",
    ],
    noEdit: true,
  },
];

const AS_CONTENT_WEEK_4: ContentIdea[] = [
  {
    hook: "People keep saying I don't make 30k a month and my business is imaginary, so let me explain why they've got it completely wrong.",
    pillar: 2,
    pillarLabel: "Contrarian Takes & Mini Revolution",
    effort: "Low effort, phone only",
    format: "Talking head, calm and confident, not riled up. Screenshot the comment and overlay it on the video so people can see it is real.",
    guidance: [
      "Open by reading the comment out: 'Another one today, you don't make 30k a month, what's your imaginary business called.' Overlay the screenshot so there's proof, then say: right, let me explain why you think that.",
      "Here's the link that ties it together. They call it imaginary for two reasons: you won't name the company, which you don't out of respect for your customers and subbies, and they hear 30k and assume you're claiming that as profit. So put them right. You turn over 30k, your actual profit is a fraction of that, and turnover and profit are two completely different things. That's the bit they don't understand.",
      "This resonates because half of them genuinely don't know turnover from profit, so you're teaching real business while you put them straight. Don't bite or get reactionary, that reads as insecurity. Stay dry, take the higher ground, and let them be the ones who look like they haven't got a clue.",
    ],
  },
  {
    hook: "A mate of mine was deep in hustle culture, staying in every night to make his YouTube videos, and I told him in 50 years he'll be happier he went to the beach instead.",
    pillar: 4,
    pillarLabel: "Have A Life AND A Business",
    effort: "Low effort, phone only",
    format: "Talking head in the car, story format, conversational.",
    guidance: [
      "Open on the mate, not the lesson: 'A mate of mine was deep in hustle culture, staying in every night to make his YouTube videos.' Set the scene before you make the point.",
      "Make the argument you actually made to him: chase money constantly and you'll never have enough, so chase experiences instead. It resonates with everyone grinding away chasing online riches and wondering if it's actually worth it.",
      "Close on your own line: 'I bet in 50 years you'll be happier you went to the beach instead.' You've also said in another video 'there's no point having money if you've got nothing to show for it', and that fits here too.",
    ],
    noEdit: true,
  },
  {
    hook: "30 quotes in a row, won zero of them, and here's what changed everything.",
    pillar: 1,
    pillarLabel: "Documenting the Journey",
    effort: "Low effort, phone only",
    format: "Talking head, short story arc, two minutes max.",
    guidance: [
      "Open cold: 'I did 30 quotes in a row and won zero of them. Most lads would've packed it in by then.' Say it plainly and move into the story without explaining it.",
      "The specific shift is the language: 'We can' became 'We will', 'When would you like us to start?' instead of waiting to be chosen. That's the concrete thing people take away, and it speaks to anyone getting knocked back when they are starting out.",
      "Close on the actual shift: 'I started talking to people like I'd already got the job.' That's the real change, so don't dress it up as one magic trick.",
    ],
    noEdit: true,
  },
  {
    hook: "Here's why I'm letting my business slow right down for a month at 18, and why I'm not worried about it.",
    pillar: 4,
    pillarLabel: "Have A Life AND A Business",
    effort: "Low effort, phone only",
    format: "Talking head, calmer reflective style. Film a quick version before you fly out, or even while you are away.",
    guidance: [
      "Open with the shock line you liked: 'I'm about to let my business slow right down for a month.' Then immediately give them the reason to keep watching: 'and here's why I'm not worried.'",
      "Anchor it in the truth: you have the systems and the right person set up to cover things, and the marketing you can switch back on when you are home. That is why you can step away without it falling apart.",
      "This resonates because losing momentum is the number one fear of nearly every business owner, so you are speaking straight to them. Close on your own line from our call: when else am I going to be 18? That is why I don't buy into hustle culture, everyone needs time off.",
    ],
    noEdit: true,
  },
  {
    hook: "I'm reviewing tradesmen's vans and socials so you can see exactly what's costing them work.",
    pillar: 3,
    pillarLabel: "Calling Out What's Broken",
    effort: "A bit of setup",
    format: "Floating head style: a photo of the van or a screen recording of their Instagram in the background, your face in the corner pointing at what is wrong. Film it in one take and react out loud. I will send you van photos to react to.",
    guidance: [
      "Open pointed at the van, not the camera: 'Right, let me show you everything wrong with this tradesman's van.' Then go straight in, no faffing about with an intro.",
      "Anchor it in specifics, not 'bad branding': no logo, the number scrawled on in marker, an Instagram with three posts from 2019 and a profile pic of a pint. This lands because every tradesman with a scruffy van feels it and watches to the end, and every customer knows exactly the kind of van you mean.",
      "Close on your own line: this is 2026, there's no excuse for this state. Keep it punchy and take the piss a bit, but go after the work, not the person.",
    ],
  },
];

// DAILY WATCH. Three things to keep an eye out for every day. Quick story content or a swap for the day's idea.

const AS_DAILY_WATCH: { emoji: string; title: string; body: string; pillar: string }[] = [
  {
    emoji: "🍻",
    title: "Out living your life",
    body: "Girlfriend, mates, the beach. Quick clip on your story with a sarcastic caption like \"still no 18 hours a day\".",
    pillar: "Pillar 4",
  },
  {
    emoji: "🚐",
    title: "A tradesman's van",
    body: "Done well or a total state. Quick reaction on what you'd do differently.",
    pillar: "Pillar 3",
  },
  {
    emoji: "📱",
    title: "A hustle bro's course",
    body: "Flogging the laptop millionaire dream? Screen record it and fire back.",
    pillar: "Pillar 2",
  },
];

// RECOMMENDATIONS

const AS_RECS: { title: string; body: string }[] = [
  {
    title: "On authenticity. This is the ongoing work.",
    body: "Right now you're watching other people, borrowing their energy, trying different versions of yourself on for size. That's normal at 18, and it's part of how you find your voice. Here's what I'm watching:\n\n•  You already know the gurus are fake and the LARPing is hollow. You told me as much yourself.\n•  You're still pulled that way, because you haven't yet found the crowd that validates the real you.\n•  So you borrow validation from people who already have a crowd.\n•  When the first genuine DM lands, that pull starts to loosen.\n\nUntil then, keep posting as you, not a polished version of someone else. The brand only works if it's actually you in it.",
  },
  {
    title: "On virality. The question you're asking isn't the right one yet.",
    body: "You asked several times how to get the video that goes viral. Here's the full answer, not just the version I gave on the call:\n\n•  Make more videos. Virality is a numbers game. Make 100 before you ask why nothing's gone viral. The algorithm rewards volume and consistency before it rewards any single video.\n•  You're already getting reach. Thousands of views, troll comments, people with an opinion. That's a good sign.\n•  Ask yourself: if you hit 50,000 views tomorrow, would it feel like enough? If the honest answer is no, you might be chasing something with no finish line.\n•  Virality for the wrong reasons, or on a voice that isn't really yours, is a trap. The wrong crowd floods in, you can't build anything with them, and you're exhausted maintaining a character. The account grows and feels hollow.\n•  What actually lasts comes from two things: consistency and an authentic voice. Not a stage persona. The actual person.\n•  Your early calm videos worked because they were unguarded. Keep the rant energy, I'm not asking you to drop it, but root it in something you actually feel.\n\nSo it's less about when your first viral video is coming, and more about whether the person on camera is actually you. The reason that matters more is simple: a viral video brings a wave of people who'll scroll straight past you the next day, whereas an authentic voice is the thing that makes them actually follow you, stick around and trust you, and that's the stuff that turns into something real down the line. So if you nail being yourself on camera, week in week out, the views start to look after themselves, and that's a far better spot to be in than landing one big hit and having no clue how to do it again.",
  },
];

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
    "You look back at the Day One snapshot on the Sessions tab and the May 2026 version of you feels noticeably far away.",
  ],
  business: [
    "6 employees on the Shiell Joinery payroll within 12 months.",
    "Biggest joinery company in Edinburgh.",
    "Bigger than the company that fired you.",
  ],
  notThisGame: [
    "We are not chasing follower counts for the sake of it.",
    "We are not optimising for views over authenticity.",
    "We are not building a funnel or a personal brand to generate more joinery enquiries.",
    "Vanity metrics are a side effect of doing it right. They are not the goal.",
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

function DailyWatchBox() {
  return (
    <div style={{ background: "linear-gradient(135deg, #1C1C1C 0%, #2b2118 100%)", border: "2px solid #f59e0b", borderRadius: 12, padding: "22px 26px", marginBottom: 28, boxShadow: "0 6px 22px rgba(217,119,6,0.22)" }}>
      <div className="daily-watch-emojis" style={{ letterSpacing: "8px", margin: "0 0 8px" }}>🍻 🚐 📱</div>
      <p style={{ fontSize: "0.9rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f59e0b", margin: "0 0 4px" }}>Remember these three emojis every day</p>
      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, margin: "0 0 16px" }}>Any one is a quick story, or it can be your post for the day.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {AS_DAILY_WATCH.map((w, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 8, padding: "16px 18px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{w.emoji}</div>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: "0 0 6px", lineHeight: 1.3 }}>{w.title}</p>
            <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.55, margin: "0 0 10px" }}>{w.body}</p>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#f59e0b", margin: 0 }}>{w.pillar}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AlexShiellDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");
  const [contentWeek, setContentWeek] = useState<"week1" | "week2" | "week3" | "week4">("week1");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 640); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [activeTab]);

  const todoItems = AS_TODOS.map(t => ({ id: t.id, text: t.text, owner: "Alex", subtext: t.subtext, tabLink: t.tabLink }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav className="dash-nav" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.97)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "0 16px", display: "flex", alignItems: "stretch", gap: 0 }}>
        <div className="dash-nav-client" style={{ alignItems: "center", paddingRight: 32, borderRight: "1px solid #E0DBD3", marginRight: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: AS_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" }}>AS</div>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>Alex Shiell</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Shiell Joinery · Session 4 of 13</p>
            </div>
          </div>
        </div>
        <div className="dash-tabs-scroll" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", padding: "0 14px",
                fontSize: "0.75rem", fontWeight: 500,
                color: activeTab === tab.id ? AS_COLOR : "#9CA3AF",
                cursor: "pointer", border: "none", background: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${AS_COLOR}` : "2px solid transparent",
                whiteSpace: "nowrap", height: 44, transition: "color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="dash-page" style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* HOME */}
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={AS_COLOR} />
            <NextMoveBox move={AS_NEXT_MOVE} accentColor={AS_COLOR} clientName="Alex Shiell" sessionLabel="Session 2 · 3 June 2026" animateIn />

            {/* Welcome card */}
            <div style={{ background: AS_COLOR, borderRadius: 8, marginBottom: 16, padding: isMobile ? "12px 14px" : "28px 32px", display: "flex", gap: isMobile ? 12 : 20, alignItems: "flex-start" }}>
              {!isMobile && (
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>👋</div>
                </div>
              )}
              <div>
                <p style={{ fontSize: isMobile ? "0.78rem" : "0.88rem", fontWeight: 700, color: "#fff", margin: isMobile ? "0 0 3px" : "0 0 6px" }}>Welcome mate.</p>
                <p style={{ fontSize: isMobile ? "0.75rem" : "0.84rem", color: "rgba(255,255,255,0.88)", lineHeight: isMobile ? 1.4 : 1.5, margin: 0 }}>
                  {isMobile
                    ? "Your personal brand dashboard. Updated after every session."
                    : "This is your personal brand dashboard. A working document that grows with you over 6 months and 13 sessions, not a polished deck. Everything in here is grounded in your own words, your own stories, your own vision, all pulled from the blueprint call. After every session I update it and the latest thinking lives here. Read it like I'm sat across from you, because that's how it's written."}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: isMobile ? 8 : 14, marginBottom: isMobile ? 16 : 28 }}>
              {[
                { label: "Sessions", value: "3 of 13", sub: "Next: Tue 30 June, 6pm" },
                { label: "Programme length", value: "6 months", sub: "May to November 2026" },
                { label: "Platform", value: "Instagram & TikTok", sub: "@thewolfofjoinery" },
                { label: "Content live", value: "Starting this week", sub: "First video incoming" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: isMobile ? "10px 12px" : "18px 20px" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 4px" }}>{s.label}</p>
                  <p style={{ fontSize: isMobile ? "0.88rem" : "1.05rem", fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.02em", margin: "0 0 2px" }}>{s.value}</p>
                  <p style={{ fontSize: "0.72rem", color: "#7A746E", margin: 0 }}>{s.sub}</p>
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

            {/* What's in this dashboard / what this is */}
            <div className="grid-2" style={{ marginBottom: 28 }}>
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
            <div className="dash-card-lg" style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 8, marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: AS_COLOR, margin: "0 0 10px" }}>Why you're here</p>
              <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>
                You're not building a personal brand to get more joinery enquiries mate. You're building it because you want to change the way a generation of young people think about the trades, about apprenticeships, about what's actually possible at 18. That's a bigger mission and it's exactly the right bloody reason to do this. The most credible personal brands come from people who genuinely mean it, and you mean it.
              </p>
            </div>

            <DashboardFooter clientName="Alex Shiell" tabName="Home" slug={slug} />
          </div>
        )}

        {/* SESSIONS */}
        {activeTab === "sessions" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Your Journey</p>
            <h2 className="dash-h2" style={{ color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Sessions</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.5, margin: "0 0 24px" }}>A running record of what we've covered, what shifted, and what was decided. Your whole journey, in one place.</p>

            {/* Starting Line Snapshot */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "24px 28px", marginBottom: 36 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 8px" }}>📸 Starting Line Snapshot. 26 May 2026.</p>
              <h3 style={{ fontSize: "0.95rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 10px", letterSpacing: "-0.01em" }}>Where you are on Day One</h3>
              <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 16px" }}>A frozen picture of where you are the day this programme begins. We don't update this. We come back to it at 3 months (late August) and 6 months (November) to compare. It's the only honest way to measure how far you've actually moved.</p>
              <div className="grid-2" style={{ gap: 14 }}>
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
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>High. Already comfortable filming solo phone videos in the car with no hesitation.</p>
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
                      <div className="dash-card-lg" style={{ flex: 1, background: "#fff", border: "1px solid #E0DBD3", borderLeft: i === 0 ? `3px solid ${AS_COLOR}` : "1px solid #E0DBD3", borderRadius: 6, marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
                          <div>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 4px" }}>Session {session.number} · {session.date}</p>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{session.title}</h3>
                          </div>
                          {i === 0 && (
                            <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, background: `${AS_COLOR}18`, color: AS_COLOR, border: `1px solid ${AS_COLOR}33` }}>Latest</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.55, margin: "0 0 20px" }}>{session.summary}</p>
                        <div className="grid-2" style={{ marginBottom: 16 }}>
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
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>Updated after Session 2</p>
                <h2 className="dash-h2" style={{ color: "#1C1C1C", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Brand Assets</h2>

                {/* Live bio — confirmed post-Session 2 */}
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderLeft: "4px solid #16a34a", borderRadius: 6, padding: "20px 24px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#16a34a", margin: "0 0 10px" }}>✓ Live bio · @thewolfofjoinery · 4 June 2026</p>
                  <p style={{ fontSize: "1rem", color: "#1C1C1C", lineHeight: 1.7, margin: "0 0 12px", fontFamily: "var(--font-dm-serif), serif", whiteSpace: "pre-line" }}>{"18 | 📍 Edinburgh\nmodernising the trades industry\nai • systems • growth"}</p>
                  <p style={{ fontSize: "0.78rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 6px" }}>Followers: 48 · Posts: 0 · Blue tick: paid</p>
                  <p style={{ fontSize: "0.78rem", color: "#7A746E", lineHeight: 1.5, margin: 0 }}>One thing to revisit in Session 3: "ai • systems • growth" reads a bit startup-generic and doesn't quite match your contrarian voice. Worth sharpening to something with more of the mission in it.</p>
                </div>

                <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}44`, borderLeft: `3px solid ${AS_COLOR}`, borderRadius: 6, padding: "14px 18px", marginBottom: 28 }}>
                  <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>Content pillars confirmed in Session 2. Bio draft options below are kept for future reference as the brand develops.</p>
                </div>

                {/* Content pillars — top of brand tab, colour-differentiated */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Content pillars. Your north star.</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 18px" }}>Four pillars, confirmed in Session 2. Each one is anchored to a story you already live, an enemy you already have, or a tension worth holding. Together they keep your voice coherent without restricting what you film. Documenting the Journey is the most important one for a guy your age, don't lose sight of that.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                    {AS_POSITIONING.contentPillars.map((p, i) => {
                      const pillarColors = ["#d97706", "#9333ea", "#0891b2", "#16a34a"];
                      const pc = pillarColors[i % pillarColors.length];
                      return (
                        <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${pc}`, borderRadius: 6, padding: "20px 20px 22px" }}>
                          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pc, margin: "0 0 8px" }}>Pillar {i + 1}{i === 0 ? " · The Big One" : ""}</p>
                          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</p>
                          <p style={{ fontSize: "0.83rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{p.body}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Daily watch — pillars turned into daily habits */}
                <DailyWatchBox />

                {/* Positioning & bio drafts — same thing, 5 options, risk-ranked */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Positioning & bio drafts. Same thing. Pick one. Or mix bits.</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 14px" }}>Ben's bio draft options, kept for future reference as your positioning develops. Each one is short enough to drop straight into your Instagram or TikTok bio. Ranked safe to ballsy on a scale of 1 to 3 dots.</p>
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
                      <span>Ballsy. Filter's off. Some people won't follow because of it. That's the point.</span>
                    </div>
                  </div>
                  {AS_POSITIONING.headlineDrafts.map((d, i) => {
                    const riskColor = d.risk === 1 ? "#16a34a" : d.risk === 2 ? "#d97706" : "#c0392b";
                    const riskLabel = d.risk === 1 ? "Safe" : d.risk === 2 ? "Edge" : "Ballsy";
                    const riskDots = "●".repeat(d.risk);
                    const hasBenTake = !!(d as { benTake?: string }).benTake;
                    return (
                      <div key={i} style={{
                        background: hasBenTake ? "#fef3e7" : "#F9F8F6",
                        border: hasBenTake ? `1px solid ${riskColor}66` : `1px solid #E0DBD3`,
                        borderLeft: `4px solid ${riskColor}`,
                        borderRadius: 4,
                        padding: "16px 20px",
                        marginBottom: 12,
                        boxShadow: hasBenTake ? "0 1px 3px rgba(192,57,43,0.1)" : "none",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7A746E", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Draft {i + 1}</p>
                          <span style={{ color: riskColor, fontSize: "0.85rem", letterSpacing: "2px" }}>{riskDots}</span>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: riskColor }}>{riskLabel}</span>
                          {hasBenTake && (
                            <span style={{ marginLeft: "auto", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20, background: riskColor, color: "#fff" }}>Ben's pick</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.92rem", color: "#1C1C1C", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-dm-serif), serif", whiteSpace: "pre-line" }}>{d.text}</p>
                        {(d as { benTake?: string }).benTake && (
                          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${riskColor}55` }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: riskColor, margin: "0 0 6px" }}>Ben's take</p>
                            <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.45, margin: 0, fontStyle: "italic" }}>{(d as { benTake?: string }).benTake}</p>
                          </div>
                        )}
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
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Your audience</p>
                    <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 14px" }}>Three groups. Each one matters for a different reason.</p>
                    <div className="grid-3">
                      {AS_POSITIONING.audiences.map((a, i) => {
                        const audienceColors = [
                          { bg: "#fef3e7", border: "#d97706", label: "#a85a05" },
                          { bg: "#fce7f3", border: "#c0392b", label: "#9a2a1f" },
                          { bg: "#e0f2f1", border: "#0891b2", label: "#0e7490" },
                        ];
                        const ac = audienceColors[i % audienceColors.length];
                        return (
                          <div key={i} style={{ background: ac.bg, border: `1px solid ${ac.border}55`, borderTop: `4px solid ${ac.border}`, borderRadius: 6, padding: "18px 18px 20px" }}>
                            <p style={{ fontSize: "0.7rem", fontWeight: 700, color: ac.label, margin: "0 0 8px", lineHeight: 1.3, letterSpacing: "0.02em" }}>{a.label}</p>
                            <p style={{ fontSize: "0.84rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Unique angles */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Unique angles and opinions</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 16px" }}>The signature moves nobody else is doing in this space.</p>
                  {AS_POSITIONING.uniqueAngles.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                      <span style={{ color: AS_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                      <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.45, margin: 0 }}>{a}</p>
                    </div>
                  ))}
                </div>

                {/* Stand For / Stand Against */}
                <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>What you stand for and against</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 16px" }}>The enemy list and the flag list. Most of your content will pull from one or the other. Not a rulebook, just a useful gut-check when something doesn't feel right.</p>
                  <div className="grid-2">
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
            <h2 className="dash-h2" style={{ color: "#1C1C1C", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.5, margin: "0 0 20px" }}>Specific video ideas and hooks land here after each session. The four pillars below are a general direction, nothing more.</p>

            {/* Before you post checklist */}
            <div style={{ background: "#1C1C1C", borderRadius: 8, padding: "22px 26px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 6px" }}>Before you post</p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: "0 0 20px" }}>Four questions. Answer them before you hit publish, every time.</p>
              {[
                {
                  num: "1",
                  label: "Identity stamp.",
                  body: "Did you open with who you are? Something like: \"I'm Alex, 18, running a joinery company in Edinburgh, and...\" Five seconds at the start, every video. Without it every video could be posted by anyone. You're not famous enough yet to skip this. That comes later.",
                },
                {
                  num: "2",
                  label: "Close with the CTA.",
                  body: "Did you end with the follow line? Pick one and commit to it: \"Follow me and I'll show you how this goes.\" Same line, every video. Not improvised, not optional.",
                },
                {
                  num: "3",
                  label: "Variety check.",
                  body: "Are your last two videos both rants? Then this one needs to be something different. A story, something from your actual week, something from the job. Rants get views. Variety gets followers.",
                },
                {
                  num: "4",
                  label: "Overlay text and captions.",
                  body: "Is there a written hook at the top? Someone watching on mute should know in three seconds what this video is about. Add captions too. Most people watch without sound, and TikTok's auto-captions are fine if you don't have anything better.",
                },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < arr.length - 1 ? 16 : 0, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: AS_COLOR, flexShrink: 0, width: 20, paddingTop: 1 }}>{item.num}</span>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, margin: 0 }}><strong style={{ color: "#fff" }}>{item.label}</strong> {item.body}</p>
                </div>
              ))}
            </div>

            {/* Pillars in content tab — short summaries only, full versions in Brand Assets */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>Your four content pillars. Your north star.</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 18px" }}>When you don't know what to film, come back here, pick a pillar, then just talk. Full breakdown of each lives in Brand Assets.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                {AS_POSITIONING.contentPillars.map((p, i) => {
                  const pillarColors = ["#d97706", "#9333ea", "#0891b2", "#16a34a"];
                  const pc = pillarColors[i % pillarColors.length];
                  return (
                    <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderTop: `4px solid ${pc}`, borderRadius: 6, padding: "20px 20px 22px" }}>
                      <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: pc, margin: "0 0 8px" }}>Pillar {i + 1}{i === 0 ? " · The Big One" : ""}</p>
                      <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</p>
                      <p style={{ fontSize: "0.82rem", color: "#3D3935", lineHeight: 1.45, margin: 0 }}>{p.short}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <DailyWatchBox />

            {/* What the content is building toward */}
            <div style={{ background: "#fffbf2", border: `1px solid ${AS_COLOR}66`, borderLeft: `4px solid ${AS_COLOR}`, borderRadius: 6, padding: "20px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 10px" }}>What the content is building toward</p>
              <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 12px" }}>Every idea in the tabs below serves at least one of these three jobs. Keep them in mind when you pick what to film.</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0 }}>
                {[
                  "Plant your flag. Anyone landing on your profile should know in five seconds that you're 18, in joinery in Edinburgh, and the contrarian voice in this space.",
                  "Document the journey. The footage you grab now is the most valuable you will ever shoot, because early days only happen once.",
                  "Balance the rants. The contrarian content is working. Now balance it with the personal story and the lifestyle proof. People need to know who you are, not just what you think.",
                ].map((point, i) => (
                  <li key={i} style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.6, paddingLeft: 18, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: AS_COLOR, fontWeight: 700 }}>→</span>{point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why your two best videos worked */}
            <div style={{ background: "#1C1C1C", borderRadius: 8, padding: "22px 26px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: AS_COLOR, margin: "0 0 10px" }}>Why your two best videos worked</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, margin: 0 }}>Your two strongest videos were the don't-go-to-uni one and the two-week joinery course one. They both did well for the same reason: they talk about something a huge number of people already care about and have a personal stake in. The second someone sees the word uni, anyone at uni or thinking about going stops and watches. Same with the course, thousands of people are weighing one up or have an opinion on them. So when you pick a topic, ask yourself who already cares about this and how big is that group. The bigger and more personal that audience, the harder the video works. Every idea below is built with that in mind.</p>
            </div>

            {/* Week sub-tabs */}
            <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E0DBD3", marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { id: "week1" as const, label: "Week One", count: AS_CONTENT_WEEK_1.length },
                { id: "week2" as const, label: "Week Two", count: AS_CONTENT_WEEK_2.length },
                { id: "week3" as const, label: "Week Three", count: AS_CONTENT_WEEK_3.length },
                { id: "week4" as const, label: "Week Four", count: AS_CONTENT_WEEK_4.length },
              ].map(w => (
                <button
                  key={w.id}
                  onClick={() => setContentWeek(w.id)}
                  style={{
                    padding: "12px 22px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: contentWeek === w.id ? AS_COLOR : "#7A746E",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: contentWeek === w.id ? `2px solid ${AS_COLOR}` : "2px solid transparent",
                    marginBottom: -1,
                    transition: "color 0.15s",
                  }}
                >
                  {w.label} <span style={{ color: "#B0A89E", fontWeight: 500, marginLeft: 4 }}>({w.count} ideas)</span>
                </button>
              ))}
            </div>

            {/* Active week ideas */}
            {(() => {
              const ideas = contentWeek === "week1" ? AS_CONTENT_WEEK_1 : contentWeek === "week2" ? AS_CONTENT_WEEK_2 : contentWeek === "week3" ? AS_CONTENT_WEEK_3 : AS_CONTENT_WEEK_4;
              const pillarColors = ["#d97706", "#9333ea", "#0891b2", "#16a34a"];
              return (
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 6px" }}>{ideas.length} ideas{contentWeek === "week3" || contentWeek === "week4" ? " · coming up" : ""}</p>
                  <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.45, margin: "0 0 20px" }}>{contentWeek === "week3" || contentWeek === "week4" ? "Ideas moved here as the queue fills up. More will land after each session." : "One idea per weekday, posted in any order. Most are quick phone jobs you can film between sites, so don't overthink the production, just hit record."}</p>
                  {ideas.map((idea, i) => {
                    const pc = pillarColors[idea.pillar - 1];
                    return (
                      <div key={i} className="dash-card-lg" style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: `4px solid ${pc}`, borderRadius: 6, marginBottom: 14 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                          <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: pc, background: `${pc}15`, padding: "4px 10px", borderRadius: 3 }}>Pillar {idea.pillar} · {idea.pillarLabel}</span>
                          <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A746E", background: "#F5F1EC", padding: "4px 10px", borderRadius: 3 }}>{idea.effort}</span>
                          {idea.noEdit && (
                            <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#16a34a", background: "#16a34a15", padding: "4px 10px", borderRadius: 3 }}>No editing needed</span>
                          )}
                          {idea.filmsWithMate && (
                            <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", background: "#2563eb", padding: "5px 12px", borderRadius: 4, boxShadow: "0 2px 6px rgba(37,99,235,0.35)" }}>🎥 Film with a mate</span>
                          )}
                          {idea.status === "used" && (
                            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#15803d", background: "#dcfce7", border: "1px solid #bbf7d0", padding: "4px 10px", borderRadius: 3 }}>Posted</span>
                          )}
                          {idea.status === "partial" && (
                            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#b45309", background: "#fef3c7", border: "1px solid #fde68a", padding: "4px 10px", borderRadius: 3 }}>Angle covered</span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E", margin: "0 0 6px" }}>Idea {i + 1} · Hook</p>
                        <p style={{ fontSize: "0.86rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 10px", lineHeight: 1.45 }}>{idea.hook}</p>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E", margin: "0 0 6px" }}>Format</p>
                        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.45, margin: "0 0 14px" }}>{idea.format}</p>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B0A89E", margin: "0 0 8px" }}>How to approach it</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0 }}>
                          {idea.guidance.map((point, j) => (
                            <li key={j} style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.55, paddingLeft: 18, position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: pc, fontWeight: 700 }}>→</span>{point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <CommentBox clientName="Alex Shiell" tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {activeTab === "recommendations" && (
          <div>
            {AS_RECS.length > 0 ? (
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: AS_COLOR, marginBottom: 8 }}>From Ben</p>
                <h2 className="dash-h2" style={{ color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>
                {AS_RECS.map((r, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 16 }}>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 12px" }}>{r.title}</p>
                    <p style={{ fontSize: "0.88rem", color: "#3D3935", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>{r.body}</p>
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
            <h2 className="dash-h2" style={{ color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Goals</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.5, margin: "0 0 28px" }}>These aren't vanity metrics mate. They're the things that actually tell us the work is landing. Numbers will follow as a byproduct, not as the target.</p>

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

            <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
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
