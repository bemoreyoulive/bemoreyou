// Server-accessible todo definitions for all clients.
// Keep in sync with the todo arrays in app/client/[slug]/page.tsx.

export interface TodoDef {
  id: string;
  text: string;
}

const clientTodos: Record<string, TodoDef[]> = {
  "andy-felton": [
    { id: "w1", text: "Warm outreach — book 5 accountant conversations by end of June" },
    { id: "w2", text: "Book your June networking events" },
    { id: "w3", text: "Repost high-performing content from the last 5 months — and spread expertise posts to 1–2 per week, not 3–4" },
    { id: "w4", text: "Coffee Chat with Olivia — booked for next Wednesday" },
    { id: "a1", text: "Apply the two-step audit offer language to all future posts mentioning the audits" },
    { id: "a2", text: "Reconnect with Jaz Grewal (TaxAssist) — first week of June" },
    { id: "s12", text: "Next session: Session 12 — 9 June 2026 at 9am" },
  ],
  "andy-scott-barrett": [
    { id: "s4-1", text: "Post the discounting post — 'Finance Simplified: Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even.' 30-minute timer." },
    { id: "s4-2", text: "Implement diary blocking: client calls Tuesday, Wednesday, Thursday only. Block Monday and Friday for admin, BD, content, follow-ups." },
    { id: "s4-3", text: "Tighten your Outlook calendar — offer one or two fixed time windows rather than open availability." },
    { id: "s4-4", text: "Use the hard stop technique on all calls — announce at the start: 'I've got a hard stop at X.'" },
    { id: "s4-5", text: "After every prospect call, networking session or client meeting: write down 3–4 challenges, pain points, or misconceptions. WhatsApp them to Ben." },
    { id: "s4-6", text: "Follow up with the strategy woman from networking — she mentioned doing webinars together." },
    { id: "s4-7", text: "Read Jo's 'Making the Sale' document before your next prospect call." },
    { id: "s4-8", text: "Use Ben's prospect call question framework for your next sales conversation." },
    { id: "w1", text: "Website quick wins: name Rolls-Royce; move Richard Waine testimonial to homepage; replace contact page copy; fix name hyphenation; update copyright year to 2026." },
  ],
  "nikki-mcreynolds": [
    { id: "nm1", text: "HushAway Pod — travel to Huddersfield, meet the head teacher, get it set up. Build a simple case study framework for the 2-month placement" },
    { id: "nm2", text: "Post LinkedIn job ad — marketing assistant, ~15 hrs/week. Keep it open: \"email me if interested, we'll build the spec together\"" },
    { id: "nm3", text: "Switch outgoing emails to send from Nikki personally (not HushAway) — open rates will improve immediately" },
    { id: "nm4", text: "Expect an introduction from Colby — Ben has already made contact. Take the call, it's worth your time" },
    { id: "nm5", text: "Explore UGC agency and paid ads agencies — meetings already booked" },
    { id: "nm6", text: "Hire a social media VA — ~£20/hr, 15 hrs/week. You are the library. They are the librarian." },
    { id: "nm7", text: "Check SEO weekly — now you're managing the website yourself" },
    { id: "nm8", text: "Use the May LinkedIn plan — copy the Claude prompt for each week and generate the post. Done in minutes." },
    { id: "nm9", text: "Drop to 3 posts/week on Instagram, Facebook, TikTok from 1 May — quality over volume" },
    { id: "nm10", text: "Start collecting parent testimonials — the school Pod placement is the beginning" },
    { id: "nm11", text: "Protect your mornings — the business needs your best thinking, not your most hours" },
  ],
  "james-hartley": [
    { id: "jh1", text: "Write the Standard Chartered post — your 'lower value human capital' rant" },
    { id: "jh2", text: "Try the dictation trick — right after your next high-energy moment" },
    { id: "jh3", text: "Finish and post the Cat Clinic M&A piece" },
    { id: "jh4", text: "Ask the business magazine: what specifically stood out about my profile?" },
    { id: "jh5", text: "Explore the London networks Ben sent — commit to one" },
    { id: "jh6", text: "Keep a close eye on your signals — they're compounding" },
  ],
  "alex-shiell": [
    { id: "as1-1", text: "Get a profile photo sorted for Instagram and TikTok. Mysterious (your word, agreed). No sunglasses. Idea: hold a joinery tool as a bit of satire. Raises curiosity, plants the trades flag." },
    { id: "as1-2", text: "Reflect on the two questions on this page. What does happy actually look like right now, and what do you want viewers walking away thinking in 3 or 6 months. Dictate, don't write." },
    { id: "as1-3", text: "Send Ben a list of content creators you admire. Any platform, any niche." },
    { id: "as1-4", text: "Next session: Wednesday 3 June 2026 at 6pm. Locking messaging, finalising Instagram and TikTok, walking through this dashboard." },
  ],
  "solve-people": [
    { id: "t1", text: "Screenshot the troll comment and turn it into a follow-up post — this is content gold. Do this one first." },
    { id: "t2", text: "LinkedIn to 250 connections by Session 7 (May 5) — connect with directors, accountants, site managers, CIS subcontractors" },
    { id: "t3", text: "Instagram to 250 followers — follow construction workers and UK self-employment accounts daily" },
    { id: "t4", text: "Decide on email platform with Brett — most commercially important thing not yet done" },
    { id: "t5", text: "Keep posting 2 times per week — story post + value/expertise post each week" },
    { id: "t6", text: "Add the plug emoji 🔌 to LinkedIn headline after \"Payroll plug\"" },
  ],
};

export function getTodosForSlug(slug: string): TodoDef[] {
  return clientTodos[slug] ?? [];
}

export function getAllClientSlugs(): string[] {
  return Object.keys(clientTodos);
}
