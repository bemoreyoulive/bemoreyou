"use client";

import ClientLayout from "@/components/ClientLayout";
import TodoList from "@/components/TodoList";

const tabs = [
  { id: "home", label: "Home" },
  { id: "todos", label: "To-Do" },
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "website", label: "Website" },
  { id: "content", label: "Content Ideas" },
];

const todos = [
  { id: "t1", text: "Update LinkedIn headline to Revised A: \"I turn financial data into decisions — the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce\" (179 chars)", owner: "Andy" },
  { id: "t2", text: "Update LinkedIn banner: Line 1: 'Turning your numbers into decisions, not just reports' / Line 2: 'I give you the financial direction you don't get from your accountant' / Line 3: 'For UK SME owners who want to run their business properly'", owner: "Andy" },
  { id: "t3", text: "Upload finalised About section — Ben to send clean one-version email (copy-paste ready)", owner: "Andy" },
  { id: "t4", text: "Book working photo session with father-in-law (photographer) — natural shots, not corporate headshot", owner: "Andy" },
  { id: "t5", text: "Pursue aerospace East Midlands prospect — follow up when owner returns from trip (came via a recruiter, one day/week scope, Rolls-Royce background described as 'perfect')", owner: "Andy" },
  { id: "t6", text: "Follow up with Manchester client on visit date (client from last year, has agreed to meet)", owner: "Andy" },
  { id: "t7", text: "Set 30-minute content timer per post — past that point you're making silly tweaks. Post and move on.", owner: "Andy" },
  { id: "t8", text: "Keep ear to ground for in-person talks and podcasts — including mate's podcast (recorded conversation, practice the spiel)", owner: "Andy" },
  { id: "t9", text: "Send headline, banner, and About section copy in email (one clean version, copy-paste ready)", owner: "Ben" },
  { id: "t10", text: "Update client dashboard with Content section (hooks, prompts, angles from Session 3)", owner: "Ben" },
  // Website quick wins
  { id: "w1", text: "Website: Change 'top-performing FTSE 100 company' to 'Rolls-Royce' throughout", owner: "Andy" },
  { id: "w2", text: "Website: Move Richard Waine quote (\"Andy made an immediate difference to how we think about our numbers...\") to homepage", owner: "Andy" },
  { id: "w3", text: "Website: Replace contact page copy with the new version (see Website tab)", owner: "Andy" },
  { id: "w4", text: "Website: Fix name hyphenation — pick one: 'Andy Scott-Barrett' or 'Andy Scott Barrett'", owner: "Andy" },
  { id: "w5", text: "Website: Update copyright year from 2025 to 2026", owner: "Andy" },
];

export default function AndyScottBarrettDashboard() {
  return (
    <ClientLayout clientName="Andy Scott Barrett" clientRole="Founder, Ascott Financial Direction" tabs={tabs}>
      {(activeTab) => (
        <>
          {activeTab === "home" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Andy Scott Barrett</h2>
                <p className="text-gray-400 text-sm">Founder, Ascott Financial Direction · Session 3 of 6 completed · Derby / Portugal</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Sessions", value: "3 of 6" },
                  { label: "Next Session", value: "30 Apr, 9am" },
                  { label: "Status", value: "Active", green: true },
                ].map((s, i) => (
                  <div key={i} className="border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className={`text-sm font-medium mt-1 ${s.green ? "text-green-500" : "text-gray-900"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-100 p-5 space-y-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Session 3 Summary</p>
                <p className="text-sm text-gray-600 leading-7">Messaging session. Headline finalised (Revised A), banner finalised (Option 1 flipped), About section structure agreed and live version to follow from Ben. Andy confirmed he loves the headline: "Hard hitting, right?" Pipeline update: manufacturing client ongoing (~3 more weeks), aerospace East Midlands prospect via recruiter (promising), Manchester client returning, startup client re-activating. Content strategy discussion: use client stories anonymously, 30-minute post timer, no overthinking.</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">What He Does</p>
                <div className="border-l-2 border-gray-900 pl-5">
                  <p className="text-sm text-gray-700 leading-7 italic">"It's not the accounting that I do — it's supplementing it. Your accountant's role is to report what has happened and keep you compliant, but not the financial strategy that moves the business forward. That's where I come in."</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Pipeline</p>
                <div className="space-y-3">
                  {[
                    { name: "Manufacturing client", status: "Active", note: "~3 more weeks. Client said: 'I know you're not going to screw me over for the time.' Good quote — reflects relationship-first approach." },
                    { name: "Aerospace, East Midlands", status: "Promising", note: "Via recruiter. One day/week scope. Andy described as 'perfect' by recruiter. Owner away — follow up this week." },
                    { name: "Manchester client", status: "Returning", note: "Client from last year. Agreed to meet — awaiting confirmation of date." },
                    { name: "Startup client", status: "Re-activating", note: "Co-founder departure caused pause. Now moving again. Equity/funding structure still to figure out." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4 flex items-start justify-between gap-4">
                      <div><p className="text-sm font-medium text-gray-900 mb-1">{p.name}</p><p className="text-sm text-gray-500 leading-6">{p.note}</p></div>
                      <span className="shrink-0 text-xs uppercase tracking-widest text-green-600">{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "todos" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-light text-gray-900 mb-1">To-Do List</h2>
                <p className="text-sm text-gray-400">Actions from Session 3 (15 April 2026) + website quick wins.</p>
              </div>
              <TodoList items={todos} />
            </div>
          )}

          {activeTab === "positioning" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Positioning</h2>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Who He's For</p>
                <div className="border border-gray-100 p-5 space-y-3">
                  <p className="text-sm text-gray-600 leading-7">UK SME owners with £500k–£10m turnover (sweet spot £500k–£5m; potential up to £15m). They have accounting covered but nobody turning the numbers into decisions. Driven by aspiration or pain — usually both. CEO/MD is key contact, often "not great with numbers." <span className="font-medium">They've got to be ready.</span> Not just interested.</p>
                  <p className="text-sm text-gray-600 leading-7">Secondary: startups preparing to raise investment — getting their financial story coherent before approaching investors.</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Who He's Not For</p>
                <ul className="space-y-2">
                  {["Doesn't respect his time or the relationship", "Needs convincing rather than ready to act", "Not genuinely open to suggestions or willing to change", "Treats the relationship transactionally rather than as a partnership", "Not at right size/stage"].map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500"><span className="text-red-300 shrink-0">✕</span>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">What Makes Him Different</p>
                <div className="space-y-3">
                  {[
                    { d: "20 years at Rolls-Royce — as a standard, not a badge", note: "He wasn't in the boardroom. He was in the weeds, working with engineers, sales directors, management teams on live business decisions. 'Stress-testing business cases on jet engines.' That's the framing." },
                    { d: "Beijing at 25 — systematised a messy operation from scratch", note: "Sent to Beijing, found an ad-hoc siloed accounting operation, rebuilt it, mentored the local team. Pattern: turns his hand to things, makes them work." },
                    { d: "He chose to leave at 40 — deliberately, on his terms", note: "Had 40 in mind for years. Shares vested on his 40th birthday. Walked out exactly 20 years after he started as an intern. People see bravery in that." },
                    { d: "Understands the emotional side of running a business", note: "Had a stress-related vestibular migraine at Rolls-Royce. Recovered through lifestyle change. Gets the weight of running a business in a way career finance professionals often don't." },
                    { d: "People confide in him", note: "'Colleagues at Rolls-Royce would often confide in me.' Trusted advisor energy — not just a numbers person." },
                  ].map((d, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{d.d}</p>
                      <p className="text-sm text-gray-500 leading-6">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Key Opportunities</p>
                <ul className="space-y-2">
                  {[
                    "The accountant gap is the sharpest edge — most SMEs don't know it exists",
                    "Rolls-Royce is genuinely rare — name it directly, don't say 'FTSE 100 company'",
                    "The emotional side of the work is the real differentiator, not the technical side",
                    "Personal story is positioning asset, not indulgence — China, deliberate exit at 40, health crisis, language learning",
                    "Power sentences already written with Jo are nearly ready to use (clients sleeping better, spotting problems in time)",
                  ].map((o, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-gray-300 mt-1">→</span>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "headlines" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">LinkedIn Headlines</h2>

              <div className="border border-green-100 bg-green-50 p-4">
                <p className="text-xs font-medium text-green-700 uppercase tracking-widest mb-2">Live — Revised A (confirmed Session 3)</p>
                <p className="text-sm font-medium text-gray-900">"I turn financial data into decisions — the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce"</p>
                <p className="text-xs text-gray-400 mt-2">179 chars · Andy's reaction: "I really like that. Hard hitting, right?" / "I love that, yeah. Perfect."</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">All Options (for reference)</p>
                <div className="space-y-3">
                  {[
                    { text: "I help SME owners turn their numbers into decisions, not just reports | Ex-Rolls-Royce Finance | The financial direction your accountant was never meant to give you", chars: "178", note: "Opens with outcome. Draws accountant distinction. Natural Rolls-Royce placement." },
                    { text: "Fractional Finance Director for SMEs | 20 years at Rolls-Royce | I turn your financial data into decisions that grow your business, without the cost of a full-time FD", chars: "196", note: "Job title first — searchable. '20 years at Rolls-Royce' tells a deeper story. Addresses the cost objection." },
                    { text: "Your accountant keeps you compliant. I help you grow | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce | Turning financial clarity into better decisions", chars: "183", note: "Session 2 original choice — replaced in Session 3 by Revised A." },
                    { text: "Left Rolls-Royce after 20 years to give SME owners what big corporates take for granted: a Finance Director who actually helps them run the business | Fractional FD", chars: "196", note: "Story-led. Unusual for finance. 'What big corporates take for granted' is quietly compelling." },
                    { text: "Your accountant reports. I decide. | Ex-Rolls-Royce Finance Director | Now working with the SME owners big companies don't care about | UK-based", chars: "163", note: "Wild option. 'Your accountant reports. I decide.' is the sharpest line in the document." },
                  ].map((h, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm text-gray-800 italic mb-2">"{h.text}"</p>
                      <p className="text-xs text-gray-400 mb-1">{h.chars} chars · {h.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">LinkedIn Banner (confirmed Session 3)</p>
                <div className="border border-green-100 bg-green-50 p-4">
                  <p className="text-sm text-gray-700">Line 1: <span className="font-medium">"Turning your numbers into decisions, not just reports"</span></p>
                  <p className="text-sm text-gray-700">Line 2: "I give you the financial direction you don't get from your accountant"</p>
                  <p className="text-sm text-gray-700">Line 3: "For UK SME owners who want to run their business properly"</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">About Section</h2>

              <div className="border border-green-100 bg-green-50 p-5">
                <p className="text-xs font-medium text-green-700 uppercase tracking-widest mb-3">Live Version — send via email, copy-paste ready</p>
                <div className="text-sm text-gray-700 leading-7 space-y-4 bg-white p-4 border border-green-100">
                  <p>Does this sound familiar? Your accountant sends the accounts… you glance at the numbers. You're not really sure what to do with them. So you carry on, making the big calls on gut feel and hoping for the best.</p>
                  <p>That's the gap I fill.</p>
                  <p>I'm Andy, a Fractional Finance Director and CFO for UK SMEs — which in plain English means I'm the person who takes your financial data and turns it into actual decisions around: growth plans, pricing, cash flow, capital equipment purchases, whether that new product is worth pursuing, or whether you're ready for investment/funding.</p>
                  <p>I spent 20 years at Rolls-Royce stress-testing business cases on jet engines, working directly with engineers, sales directors and management teams — not in the boardroom. I made the decision to leave at 40 to do work where you can actually feel the difference it makes.</p>
                  <p>I typically also work with start-ups looking to get their numbers straight and working towards investment in the business.</p>
                  <p>I work with a small number of retained clients at a time, typically UK SME owners turning over between £500k and £10m, who have their accounting covered but want someone to help them actually use the numbers to run the business effectively.</p>
                  <p>What clients tell me: they make major decisions with confidence — because they know the financial impact before they commit, not after. They sleep better — because they're no longer carrying the numbers on their own, and they can see problems coming while there's still time to act. They feel in control.</p>
                  <p>Based in Derby (and occasionally Portugal). Mandarin: decent conversation level, probably. Currently learning Japanese on Duolingo.</p>
                  <p>I'm not for everyone, but if any of this sounds like someone you'd want in your corner, I'm always up for a straightforward conversation to see if we're a good fit.</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Alternative Opening Lines (if rewriting)</p>
                <div className="space-y-2">
                  {[
                    { label: "Option B — The Question", text: "\"When did you last look at your accounts and actually know what to do next?\"" },
                    { label: "Option C — The Straight Line", text: "\"Most SME owners have an accountant. They don't have someone to tell them what to do with what the accountant sends.\"" },
                  ].map((o, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{o.label}</p>
                      <p className="text-sm text-gray-600 italic">{o.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "website" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Website Recommendations</h2>
                <p className="text-sm text-gray-400">ascottfd.com — built on Wix. Full critique from Session 2–3.</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Quick Wins — Do This Week</p>
                <div className="space-y-2">
                  {[
                    "Change 'top-performing FTSE 100 company' to 'Rolls-Royce' throughout",
                    "Move Richard Waine quote to homepage: \"Andy made an immediate difference to how we think about our numbers. He cuts through financial complexity and delivers actionable insights that make sense and guide our decisions.\"",
                    "Replace contact page copy (see below)",
                    "Fix name — pick one: 'Andy Scott-Barrett' or 'Andy Scott Barrett', use consistently",
                    "Update copyright year from 2025 to 2026",
                  ].map((w, i) => (
                    <div key={i} className="flex items-start gap-3 border border-gray-100 p-3">
                      <span className="text-amber-400 shrink-0 mt-0.5">!</span>
                      <p className="text-sm text-gray-600">{w}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Full Issues</p>
                <div className="space-y-4">
                  {[
                    {
                      issue: "Name Rolls-Royce — don't hide it",
                      severity: "High",
                      current: "\"one of the UK's top-performing FTSE 100 companies\"",
                      fix: "\"I spent 20 years at Rolls-Royce, building financial cases behind some of the biggest business decisions in British engineering. Now I bring that same rigour to businesses where the decisions are just as real, even if the numbers are smaller.\"",
                    },
                    {
                      issue: "Service names need real problems, not abstract concepts",
                      severity: "High",
                      current: "\"Focus, Insight, Clarity\" — too abstract",
                      fix: "Replace with: 'Making sense of your numbers' / 'Deciding what to do next' / 'Building a plan that works'",
                    },
                    {
                      issue: "Homepage hero needs a headline",
                      severity: "High",
                      current: "Logo + 'Learn More' — says nothing",
                      fix: "\"Your accountant tells you what happened. I help you decide what to do next.\" + photo of Andy + one CTA: \"Let's have a conversation.\"",
                    },
                    {
                      issue: "Remove corporate boilerplate",
                      severity: "Medium",
                      current: "\"Ascott Financial Direction delivers high-quality, flexible solutions tailored to your needs, covering financial strategy, planning and analysis...\"",
                      fix: "\"I work with SME owners who have their accounts covered but nobody turning the numbers into decisions. That's the gap I fill, on a retained basis, for a handful of clients at a time.\"",
                    },
                    {
                      issue: "Contact page copy needs replacing",
                      severity: "Medium",
                      current: "\"If you'd like to explore how Ascott Financial Direction could support your business...\"",
                      fix: "\"Let's have a conversation. Not a pitch. Not a sales call. Just 20 minutes to see whether what I do is actually useful for where you are right now. If it's not the right fit, I'll say so. If it is, we'll figure out what that looks like. Drop me a message below or email me directly at andy@ascottfd.com.\"",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-100 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-sm font-medium text-gray-900">{item.issue}</p>
                        <span className={`text-xs uppercase tracking-widest px-2 py-1 ${item.severity === "High" ? "text-red-500 bg-red-50" : "text-amber-600 bg-amber-50"}`}>{item.severity}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-red-50 border border-red-100 p-3">
                          <p className="text-xs text-red-400 uppercase tracking-widest mb-1">Current</p>
                          <p className="text-sm text-gray-600 italic">{item.current}</p>
                        </div>
                        <div className="bg-green-50 border border-green-100 p-3">
                          <p className="text-xs text-green-600 uppercase tracking-widest mb-1">Replace with</p>
                          <p className="text-sm text-gray-700">{item.fix}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Longer Term</p>
                <ul className="space-y-2">
                  {["Replace service section copy completely", "Update homepage hero with headline + Andy's photo", "Build photo set — professional but natural, outside, good light, clothes for client meeting", "Deepen blog content — more point of view, less generic", "Consider moving toward andyscottbarrett.com as primary domain"].map((l, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-gray-300 mt-1">→</span>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Content Ideas</h2>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Content Pillars</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Financial clarity for real decisions", desc: "Not 'here's how finance works' — 'here's the decision you're about to make, and here's what the numbers are actually telling you.'" },
                    { title: "The corporate-to-SME translation", desc: "What Andy learned building billion-pound business cases — translated for a business owner with 20 employees. His background as a gift, not baggage." },
                    { title: "The cost of not knowing", desc: "Stories about what happens when businesses run on gut feel. The financial surprises. The decisions that looked good but didn't stack up." },
                    { title: "The human side of running a business", desc: "The pressure, the health crisis, the choice to leave, the lifestyle he's building. Where Beijing, fostering Labradors, the half marathon, and Portugal all live." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{p.title}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Specific Post Ideas</p>
                <div className="space-y-3">
                  {[
                    { angle: "The Uncomfortable Truth (Fiery Frenchman)", note: "Business case didn't stack up; senior exec slammed fist on desk, walked out, slammed the door. Andy was just the messenger: 'Part of my job is to tell you what you don't want to hear.' Do not include nationality or identifying details." },
                    { angle: "Lego and product profitability", note: "Lego's financial difficulties came from not knowing which product was making money. Direct parallel to his SME work. Real Lego bricks as a visual/video version." },
                    { angle: "Gross margin misconception", note: "A current client believes they know their gross margin but is calculating it incorrectly. 'How many business owners think they know their margin when they actually don't?' Worked example included." },
                    { angle: "The discounting trap", note: "Discounting by 10% on a low-margin product could require a 200% volume increase to make the same money. 'All you've done is made yourself busier with less income.'" },
                    { angle: "Your bank balance isn't all yours", note: "VAT owed, corporation tax, supplier commitments — the actual available cash is a different number. Very short punchy post. From the Know Your Number talk Q&A." },
                    { angle: "AI and financial strategy (hot take)", note: "'Why would I need help with my financial strategy — I can just do it with AI?' Not anti-AI — pro knowing what you're doing. Strong, confident, will spark engagement." },
                    { angle: "Small habits compounding", note: "The lifestyle changes that brought his vestibular migraine under control. Genuinely passionate about this. Would stand out against every other finance person on LinkedIn." },
                    { angle: "The Martin Lewis reference", note: "He's been financially savvy since his best man's speech. Warm, human, self-deprecating, immediately credible." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{p.angle}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Power Sentences — Use Verbatim or Very Close</p>
                <div className="space-y-3">
                  {[
                    { label: "Cash flow warning — spotted in time", quote: "\"I worked with a business with profitable contracts but they weren't planning ahead on cash flow. Once we put a forecast in place, it became clear they would run out of cash in three months — fortunately we spotted it while there was still time to act.\"" },
                    { label: "Sleep at night", quote: "\"I worked with an MD dealing with a high volume of investor questions about cash flow. Once we got the cash planning sorted, she wasn't on her own anymore. She could sleep better and focus her time on running the business.\"" },
                    { label: "Confidence in decisions", quote: "\"I worked with a founder weighing up different business models with no clear view of what each would deliver. Once we modelled the options, they had the clarity and the confidence to commit. They said that decision alone could be game changing for them.\"" },
                    { label: "Reports but no answers", quote: "\"I find that business owners often get reports from their accountant but no real answers — they're kept compliant, but still left not knowing what action to take next.\"" },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">{p.label}</p>
                      <p className="text-sm text-gray-600 leading-7 italic">{p.quote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </ClientLayout>
  );
}
