// Server-accessible todo definitions for all clients.
// Keep in sync with the todo arrays in app/client/[slug]/page.tsx.

export interface TodoDef {
  id: string;
  text: string;
}

const clientTodos: Record<string, TodoDef[]> = {
  "andy-felton": [
    { id: "c1", text: "Post the holiday story — with 2 or 3 photos (Cruise, Norway, husky ride, the storm, the norovirus)" },
    { id: "c2", text: "Post one SACK SALLY — owner absence angle. Hook: \"You started a business because of freedom. But right now, you ain't living that dream.\"" },
    { id: "c3", text: "Post the bold contrarian differentiator post: \"Most people in this space took a course. I've been building systems for 10 to 15 years. They're not the same thing.\"" },
    { id: "p1", text: "See David Maguire at AI networking event (~week of 14th April) — ask how progress is going; ask if he'd comment on SACK SALLY post" },
    { id: "p2", text: "Draft commercial approach for Chris Dillon media-monitoring POC" },
    { id: "p3", text: "Send Ben voice note on PAPA AI search work (detail: what was the problem, what you proposed, what outcome will be)" },
    { id: "o1", text: "Success manager call this week — send Ben recording or detailed notes" },
    { id: "o2", text: "Main AI/automation coach session next week — send same to Ben" },
    { id: "b1", text: "Maintain 2 posts per week on LinkedIn" },
    { id: "b2", text: "Networking: 2 events per week (East Midlands Chamber and AI networking)" },
    { id: "b3", text: "Land the first aligned implementation client" },
    { id: "b4", text: "Continue N8N community contributions" },
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
    { id: "jh1", text: "Write your power statements — use real client feedback, not your own assumptions about yourself" },
    { id: "jh2", text: "Ring-fence one BD morning per week and protect it — structure beats willpower" },
    { id: "jh3", text: "Follow up on open LinkedIn conversations within 48 hours — message anyone who engaged with a recent post" },
    { id: "jh4", text: "Post at least once this week — one insight from a recent conversation is enough" },
    { id: "jh5", text: "Revisit the About section once power statements are written — Ben will draft three options" },
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
