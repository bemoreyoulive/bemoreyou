"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import ClientTodoList from "@/components/ClientTodoList";
import EmailOptIn from "@/components/EmailOptIn";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";
import MilestoneTracker from "@/components/MilestoneTracker";
import DashboardFooter from "@/components/DashboardFooter";
import CommentBox from "@/components/CommentBox";

const ASB_COLOR = "#2e7d4f";
const ASB_NEXT_MOVE = "Before Canada (this week): write and schedule 3 posts. 1 — the investor/financial story post (drafted in the session, just format it in LinkedIn). 2 — Edinburgh half marathon (include a photo, talk about the heat and the city). 3 — reflection on starting the business (dictate it on a walk, paste into Claude, format). Use the dictation workflow for all of them. Drop the 'Finance Simplified' intro — just write the post.";

const asbTodos = [
  { id: "s6-1", text: "PRIORITY — before Canada: format and post the investor/financial story post we drafted together on the call. New line for every full stop. Ellipses for continuation. Capitalise NUMBERS. End with: 'If you're reading this thinking I need to sort this out — drop me a message. I'll buy you a coffee.'", owner: "Andy", tabLink: { label: "See Content Ideas", tab: "content" } },
  { id: "s6-2", text: "PRIORITY — before Canada: write and schedule the Edinburgh half marathon post. Include a photo. Talk about the heat, the city, doing it despite the injury. Personal and relatable. Use the dictation workflow.", owner: "Andy" },
  { id: "s6-3", text: "PRIORITY — before Canada: dictate the 'reflection on starting the business' post on a walk. Open your notes app, hit dictate, and just talk — when you started, what's been hard, what's surprised you, the emotional rollercoaster. Paste it into Claude, ask it to format only (new lines, no em-dashes, no fragments). Don't ask it to rewrite.", owner: "Andy" },
  { id: "s6-4", text: "When you come back from Canada: follow up with the Paralympian contact — she's been engaging well on LinkedIn but may need a nudge. She's a possible client.", owner: "Andy" },
  { id: "s6-5", text: "When you come back from Canada: follow up with the new paid networking group prospect.", owner: "Andy" },
  { id: "s5-4", text: "Follow up with the contact from Founders Network when back from Canada — possible coaching/mentoring need.", owner: "Andy" },
  { id: "s5-5", text: "Arrange the photo session with George's dad — meet outside the house (café, walk, co-working space). Natural environment only.", owner: "Andy" },
  { id: "s4-2", text: "Diary blocking: client calls Tuesday, Wednesday, Thursday only. Block Monday and Friday for admin, content, follow-ups.", owner: "Andy" },
  { id: "w1", text: "Website quick wins (5 changes, ~1 hour): name Rolls-Royce explicitly; move Richard Waine testimonial to homepage; replace contact page copy with Ben's version; fix name hyphenation to 'Andy Scott Barrett' throughout; update copyright year to 2026.", owner: "Andy" },
];


const asbTabs = [
  { id: "home", label: "Home" },
  { id: "milestones", label: "Milestones" },
  { id: "brand", label: "Brand Assets" },
  { id: "content", label: "Content Ideas" },
  { id: "recs", label: "Ben's Recommendations" },
  { id: "goals", label: "Goals" },
];

export default function AndyScottBarrettDashboard({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "0 32px", display: "flex", alignItems: "stretch", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 32, borderRight: "1px solid #E0DBD3", marginRight: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: ASB_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>ASB</div>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>Andy Scott Barrett</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Ascott Financial Direction · Session 6 of 7</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, overflowX: "auto" }}>
          {asbTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", padding: "0 18px", fontSize: "0.8rem", fontWeight: 500, color: activeTab === tab.id ? ASB_COLOR : "#7A746E", cursor: "pointer", border: "none", background: "none", borderBottom: activeTab === tab.id ? `2px solid ${ASB_COLOR}` : "2px solid transparent", whiteSpace: "nowrap", height: 52, transition: "color 0.15s" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 32px" }}>

        {/* ── HOME ── */}
        <div style={{ display: activeTab === "home" ? "block" : "none" }}>
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={ASB_COLOR} />
            <NextMoveBox move={ASB_NEXT_MOVE} accentColor={ASB_COLOR} clientName="Andy Scott Barrett" sessionLabel="Session 6 · 26 May 2026" animateIn />

            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: ASB_COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>6</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 4px" }}>Session 6 — 26 May 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#3a6048", margin: 0, lineHeight: 1.6 }}>Dictation workflow — write posts by talking through the prompts, not typing answers. Produced a full draft in 14 minutes on the call. Finance Simplified series dropped — expertise posts are now standalone wake-up calls, not explanations. Repetition in content explicitly endorsed. 3 posts to schedule before Canada. Product profitability / Lego post published. Final session: Wednesday 18 June.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "6 of 7", sub: "Final: Wed 18 June 2026" },
                { label: "Headline", value: "✓ Live", sub: "On LinkedIn" },
                { label: "About section", value: "✓ Live", sub: "On LinkedIn" },
                { label: "Posts out", value: "5 posted", sub: "Martin Lewis · VAT · discounting · bank balance · product profitability" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 20px" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.02em", margin: "0 0 4px" }}>{s.value}</p>
                  <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0 }}>{s.sub}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 16px" }}>Your To-Do List</p>
              <ClientTodoList items={asbTodos} clientName="Andy Scott Barrett" slug={slug} accentColor={ASB_COLOR} onTabLink={setActiveTab} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What's in this dashboard</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["Your positioning — who you're for and what makes you different", "LinkedIn headline options — the ones considered and the one chosen", "About section — the finalised version, ready to paste", "Content ideas across 3 months — hooks, direction, and CTAs", "Ben's recommendations from each session", "Your short and long-term goals"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 22px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 10px" }}>What this is (and isn't)</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, margin: 0, padding: 0 }}>
                  {["A working document — not a polished presentation", "Everything grounded in your own words and stories", "Something to review together, not handed over and filed", "Not a script — it's scaffolding. You write in your own voice.", "Living — it gets updated after every session"].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.84rem", color: "#7A746E", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9CA3AF" }}>–</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DashboardFooter clientName="Andy Scott Barrett" tabName="Home" slug={slug} />
          </div>
        </div>

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={ASB_COLOR} />
        )}

        {/* ── BRAND ASSETS ── */}
        {activeTab === "brand" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 4px" }}>Your Brand Foundation</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Brand Assets</h2>

            {/* Positioning statement */}
            <div style={{ background: ASB_COLOR, borderRadius: 6, padding: "28px 32px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 10px" }}>Positioning Statement</p>
              <p style={{ fontSize: "1.15rem", fontFamily: "var(--font-dm-serif), serif", color: "#fff", lineHeight: 1.6, margin: 0 }}>
                "I turn financial data into decisions — the bit your accountant isn't there to do."
              </p>
            </div>

            {/* Live LinkedIn profile */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 6, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>✓ LinkedIn Headline — Live</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.5, margin: "0 0 12px" }}>
                  "I turn your numbers into decisions - the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce"
                </p>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>Opens with the outcome, not the job title. Frames the accountant gap without criticism.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Networking One-Liner</p>
                <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.5, margin: "0 0 10px" }}>
                  "Most SME owners I meet have their accountant sorted — they just have no idea what to do with the numbers once they arrive. That's literally what I fix. I spent 20 years doing it at Rolls-Royce; now I do it for businesses that actually need it."
                </p>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>Lead with the gap they recognise, land the credibility. Let them ask the follow-up.</p>
              </div>
            </div>

            {/* LinkedIn Banner */}
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>LinkedIn Banner — Live</p>
            <div style={{ background: "#1a3a6b", borderRadius: 8, padding: "28px 32px", marginBottom: 6, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Turning your data into decisions and actions, not just reports</p>
              <p style={{ color: "#c8a84b", fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>I give you the financial direction you don't get from your accountant</p>
              <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: 0 }}>For SME owners who want to run their business properly</p>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#9CA3AF", margin: "0 0 24px", lineHeight: 1.5 }}>Session 3 decision. Live and correct as of April 2026.</p>

            {/* About section */}
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>About Section — Live on LinkedIn</p>
            <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "36px 40px", marginBottom: 8 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 20px" }}>✓ Finalised — Session 3 · 15 April 2026</p>
              <div style={{ fontSize: "0.97rem", lineHeight: 2, color: "#3D3935", display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ margin: 0 }}>Does this sound familiar?</p>
                <p style={{ margin: 0 }}>Your accountant sends the accounts… you glance at the numbers.</p>
                <p style={{ margin: 0 }}>You're not really sure what to do with them. So you carry on, making the big calls on gut feel and hoping for the best.</p>
                <p style={{ margin: 0 }}>You're not doing anything wrong. Your accountant is doing exactly what they're supposed to do.</p>
                <p style={{ margin: 0 }}>The problem is, reporting what happened and keeping you compliant isn't the same as helping you run the business.</p>
                <p style={{ margin: 0, marginTop: 8 }}>That's the gap I fill.</p>
                <p style={{ margin: 0 }}>👋 I'm Andy, a Fractional Finance Director for growing UK SMEs, which in plain English means I'm the person who takes your financial data and turns it into actual decisions around:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 4 }}>
                  {["Growth plans", "Pricing", "Cash flow", "Where to invest and when to hire", "Launching new products", "Funding readiness"].map((item, i) => (
                    <p key={i} style={{ margin: 0 }}>👉 {item}</p>
                  ))}
                </div>
                <p style={{ margin: 0, marginTop: 8 }}>I spent 20 years at Rolls-Royce stress-testing business cases on jet engines and working directly with engineers, sales directors and management teams, not in the boardroom. I made the decision to leave at 40 to do work where you can really feel the difference it makes.</p>
                <p style={{ margin: 0, marginTop: 8 }}>I work with a small number of retained clients at a time, typically either start-ups preparing for funding or UK SME owners turning over between £500k and £10m. They have their accounting covered but want someone to help them actually use the numbers to run the business effectively.</p>
                <p style={{ margin: 0 }}>Some are at a specific moment: a growth decision, an investor conversation, a cash flow worry that won't go away. Others have just outgrown the informal approach. Either way, the gap is the same.</p>
                <p style={{ margin: 0, marginTop: 8 }}>What my clients tell me, once we're working together:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 4 }}>
                  <p style={{ margin: 0 }}>👉 They make major decisions with confidence — because they know the financial impact before they commit, not after</p>
                  <p style={{ margin: 0 }}>👉 They sleep better — because they're no longer carrying the numbers on their own, and they can see problems coming while there's still time to act</p>
                  <p style={{ margin: 0 }}>👉 They feel in control — there's a clear plan, they know whether they're on track, and they're not waiting to be blindsided</p>
                </div>
                <p style={{ margin: 0, marginTop: 8 }}>Based in Derby (and occasionally Portugal). Mandarin: decent conversation level, probably. Currently learning Japanese on Duolingo.</p>
                <p style={{ margin: 0, marginTop: 8 }}>I'm not for everyone, but if any of this sounds like someone you'd want in your corner, I'm always up for a straightforward conversation to see if we're a good fit.</p>
              </div>
            </div>
            <div style={{ background: "#F9F8F6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "14px 18px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "#1C1C1C" }}>To update:</strong> LinkedIn → profile → pencil icon on intro → About → paste. Check character count stays within the 2,600 limit.
              </p>
            </div>

            {/* ICP */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "24px 28px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 18px" }}>Your Ideal Client (ICP)</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ASB_COLOR, margin: "0 0 6px" }}>Who they are</p>
                  <p style={{ fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.6, margin: 0 }}>UK SME owner turning over £500k–£10m (sweet spot £500k–£5m). Has their bookkeeping and accounting covered. Doesn't know what to do with the numbers once they arrive. Driven by a growth decision, a cash flow worry, or a moment where they realise gut feel isn't cutting it anymore.</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ASB_COLOR, margin: "0 0 6px" }}>What they say</p>
                  {[
                    '"My accountant sends the numbers and I just… stare at them."',
                    '"I know something needs to change, I just don\'t know what."',
                    '"I can\'t sleep — the cash flow is worrying me and I don\'t know why."',
                    '"I\'m making big decisions on gut feel and hoping for the best."',
                    '"I need someone who actually helps me run the business."',
                  ].map((q, i) => (
                    <p key={i} style={{ fontSize: "0.82rem", color: "#6b6860", margin: "0 0 6px", fontStyle: "italic" }}>{q}</p>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ASB_COLOR, margin: "0 0 8px" }}>Good fit</p>
                  {["Has the accounting covered — needs the next layer", "Driven by a real business decision, not just curiosity", "Values honesty over a polished answer", "Respects the relationship, not just the invoice", "Ready to act, not endlessly deliberating"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: ASB_COLOR, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: "0.82rem", color: "#6b6860", margin: 0 }}>{f}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#c0392b", margin: "0 0 8px" }}>Poor fit</p>
                  {["Wants validation, not genuine insight", "Treats it transactionally — squeezes every invoice", "Needs convincing rather than is ready to act", "Too early-stage or too small to justify retained FD", "Doesn't respect your time or the relationship"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: "#c0392b", fontWeight: 700, flexShrink: 0 }}>✗</span>
                      <p style={{ fontSize: "0.82rem", color: "#6b6860", margin: 0 }}>{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience tiers */}
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>Audience Tiers</p>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "0 22px", marginBottom: 20 }}>
              {[
                { badge: "Primary", badgeBg: "#edf4ef", badgeColor: "#2e7d4f", text: "UK SME owners £500k–£10m turnover who have bookkeeping and accounting covered but no one helping them turn the data into forward-looking decisions. The gap is specific, common, and painful." },
                { badge: "Secondary", badgeBg: "#eef2f7", badgeColor: "#2d5a8e", text: "Start-ups preparing to raise investment — need their numbers in order and their financial story coherent before investor conversations. A valid fit, not a primary audience." },
                { badge: "Referral", badgeBg: "#fdf8ec", badgeColor: "#8a6e2a", text: "Accountants and bookkeepers who can refer clients who've outgrown their current support. Not competitors — complementary. Worth building these relationships deliberately." },
                { badge: "Avoid", badgeBg: "#fdf0f0", badgeColor: "#8a3a3a", text: "Clients who want to be convinced, who don't respect your time, or who are too small to justify a retained FD engagement. Wrong-fit clients cost more than no clients." },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "11px 0", borderBottom: i < 3 ? "1px solid #E0DBD3" : "none" }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0, marginTop: 1, background: row.badgeBg, color: row.badgeColor }}>{row.badge}</span>
                  <p style={{ fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.5, margin: 0 }}>{row.text}</p>
                </div>
              ))}
            </div>

            {/* What makes you different */}
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 12px" }}>What Makes You Different</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                { title: "20 years at Rolls-Royce — stress-testing business cases on jet engines", body: "Not in the boardroom. Working directly with engineers, sales directors, and management teams on live decisions. That's a very different thing from a career consultant who's never been inside something that demanding." },
                { title: "You went to Beijing at 25", body: "Found a messy, ad-hoc finance operation and systematised it from scratch. Mentored the local team. Evidence that you can land somewhere unfamiliar, figure it out, and leave it better than you found it. Most finance people have never had to do that." },
                { title: "You chose to leave at 40 — on your own terms", body: "Most people leave big corporate jobs under pressure. You'd had 40 in your mind for years. When your boss told you your job was safe, your internal response was 'oh no.' The last day was exactly 20 years to the day from day one. That's not a redundancy story. It's a conviction story." },
                { title: "You understand the emotional weight of running a business", body: "You had a stress-related health crisis at Rolls-Royce. When a client says they can't sleep over a cash flow decision, you understand that in a way most finance professionals simply don't — and you say so." },
                { title: "People confide in you", body: "Colleagues at Rolls-Royce confided in you without being asked. You listen, you don't judge, and you're not there to get ahead of anyone. That's unusually rare in a finance professional." },
                { title: "You tell clients what they don't want to hear", body: "You once presented numbers a room full of senior people desperately didn't want to hear. One slammed the desk and walked out. The numbers were still right. Integrity over comfort — that's what clients actually need." },
              ].map((diff, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "#F9F8F6", borderRadius: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "#edf4ef", color: ASB_COLOR, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>✦</div>
                  <div>
                    <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px" }}>{diff.title}</p>
                    <p style={{ fontSize: "0.8rem", color: "#6b6860", margin: 0, lineHeight: 1.5 }}>{diff.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Messaging angles */}
            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9CA3AF", margin: "0 0 8px" }}>Key Messaging Angles</p>
            <p style={{ fontSize: "0.84rem", color: "#6b6860", margin: "0 0 20px", lineHeight: 1.6 }}>The angles with the most potential, grounded in your own words and experiences.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                { num: 1, title: "The gap your accountant was never meant to fill", body: "Your accountant reports what happened. You help owners decide what to do next. This isn't a criticism of accountants — it's a clear, useful distinction that most SME owners have never heard articulated. Say it in every intro, every post, every conversation.", quote: '"Reporting what happened isn\'t the same as helping you run the business."' },
                { num: 2, title: "The numbers are only useful if you know what to do with them", body: "Most SME owners receive their accounts and stare at them. They're not failing their business — they're just missing the layer that turns data into decisions. That's the job. Frame it as the missing layer, not a failing.", quote: null },
                { num: 3, title: "You can sleep better when someone's carrying the numbers with you", body: "Financial pressure is one of the most isolating things about running a business. When a client says they sleep better once you're working together, that's not about spreadsheets — it's about not carrying the weight alone. That's a human story worth telling.", quote: '"They can see problems coming while there\'s still time to act."' },
                { num: 4, title: "Decisions before commitment", body: "The value of a fractional FD isn't the reports — it's knowing the financial impact of a decision before you make it, not after. Pricing, growth, capital purchases, whether the new product is worth pursuing. This is the specific thing you do that most SME owners have never had access to.", quote: null },
                { num: 5, title: "Corporate-grade rigour, without the corporate cost", body: "You spent 20 years stress-testing business cases at one of the world's most demanding engineering companies. SME owners can now access that kind of thinking for a fraction of the cost of a full-time FD. That framing — big company rigour, small company context — is a powerful door-opener.", quote: null },
                { num: 6, title: "You know when to say no", body: "You once presented numbers a room of senior people desperately didn't want to hear. One slammed the desk and walked out. The numbers were still right. Telling the truth when it's uncomfortable — not telling clients what they want to hear — is the thing that makes you genuinely useful.", quote: '"The honest picture, even when it\'s uncomfortable."' },
              ].map((msg, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 6, padding: "18px 20px" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: ASB_COLOR, color: "#fff", fontSize: "0.68rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>{msg.num}</div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 6px" }}>{msg.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "#6b6860", lineHeight: 1.65, margin: 0 }}>{msg.body}</p>
                  {msg.quote && (
                    <div style={{ background: "#edf4ef", borderLeft: `3px solid ${ASB_COLOR}`, borderRadius: "0 6px 6px 0", padding: "10px 14px", marginTop: 10 }}>
                      <p style={{ fontSize: "0.78rem", fontStyle: "italic", color: "#3a6048", margin: 0 }}>{msg.quote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Language that works */}
            <div style={{ height: 1, background: "#E0DBD3", margin: "24px 0" }} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>Language That Works</h3>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 28px", marginBottom: 28 }}>
              <p style={{ fontSize: "0.8rem", color: "#7A746E", marginBottom: 14 }}>From your own words. This is the language that sounds like you and resonates with the right audience.</p>
              {[
                '"Reporting what happened isn\'t the same as helping you run the business."',
                '"I turn your financial data into decisions — not just reports."',
                '"Your accountant is doing exactly what they\'re supposed to do. The problem is, that\'s not the same as helping you run the business."',
                '"I made the decision to leave at 40 to do work where you can actually feel the difference it makes."',
                '"The honest picture — even when it\'s uncomfortable."',
                '"I\'m not for everyone, but if this sounds like someone you\'d want in your corner…"',
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "0.9rem", color: "#1C1C1C", padding: "8px 0", borderBottom: i < 5 ? "1px solid #E0DBD3" : "none", margin: 0 }}>{line}</p>
              ))}
            </div>

            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 16px" }}>What Your Ideal Client Is Thinking</h3>
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "20px 28px", marginBottom: 28 }}>
              {[
                '"I glance at the accounts, don\'t really understand them, and carry on hoping."',
                '"I need someone who actually helps me make decisions — not just sends me numbers."',
                '"I can\'t sleep. Something\'s wrong with the cash flow and I don\'t know what."',
                '"Is my business actually profitable? I genuinely don\'t know."',
              ].map((line, i) => (
                <p key={i} style={{ fontSize: "0.9rem", color: "#1C1C1C", padding: "8px 0", borderBottom: i < 3 ? "1px solid #E0DBD3" : "none", margin: 0 }}>{line}</p>
              ))}
            </div>

            <CommentBox clientName="Andy Scott Barrett" tabName="Brand Assets" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <AsbContentTab slug={slug} />
        )}

        {/* ── BEN'S RECOMMENDATIONS ── */}
        {activeTab === "recs" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>From Ben</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>

            {/* Prospect Call Framework */}
            <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "24px 28px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Added Session 4 · 30 April 2026</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 18px" }}>Prospect Call Question Framework</p>
              <p style={{ fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.6, margin: "0 0 20px" }}>Use this as a mental map, not a script. The goal is to uncover real problems, confirm they want to solve them, then position your solution. The close is gentle and natural if the conversation has gone well. Don't follow these verbatim — adapt to how the call is flowing.</p>

              {[
                {
                  step: "1",
                  label: "Start with neutral context — warm them up",
                  desc: "Easy, non-threatening questions to get them talking about the business without feeling examined.",
                  questions: [
                    "What's keeping the business going at the moment?",
                    "Where are your clients coming from?",
                    "What's working best right now?",
                    "What's not working that used to work?",
                    "Are you actively trying to grow, or just stabilise things at the moment?",
                  ],
                },
                {
                  step: "2",
                  label: "Understand their financial reality",
                  desc: "Gently explore sustainability without sounding intrusive. Only go here once you have enough context.",
                  questions: [
                    "Do you have visibility on your cash position over the next few months?",
                    "Are you broadly happy with how the business is performing financially, or are there things you'd want to change?",
                  ],
                },
                {
                  step: "3",
                  label: "Understand the financial shape of the business",
                  desc: "Only once context is clear. Get a picture of revenue, costs, margins, and how they're currently managing the numbers — before surfacing problems.",
                  questions: [
                    "Do you have a sense of what your margins look like across different parts of the business?",
                    "How are you currently keeping on top of the numbers — is it you, your accountant, someone in-house?",
                    "Do you have visibility on your cash position a few months out, or is it more month to month?",
                    "Are there parts of the business that are more profitable than others — do you know which?",
                  ],
                },
                {
                  step: "4",
                  label: "Surface pressure, pain, and friction",
                  desc: "Move from facts to feelings. This is where the real problems tend to surface.",
                  questions: [
                    "Is there anything that feels like it needs fixing sooner rather than later?",
                    "What feels most frustrating about the business at the moment?",
                    "Do you feel like you've got a financial plan, or are you figuring it out as you go?",
                    "When your accountant sends the numbers — do you know what to do with them?",
                  ],
                },
                {
                  step: "5",
                  label: "Introduce future consequences",
                  desc: "Increases urgency without pressure. Use only once you've surfaced a real problem.",
                  questions: [
                    "If nothing changed in how you're managing the financial side, would the business still be in a good place in 6–12 months?",
                  ],
                },
                {
                  step: "6",
                  label: "Catch-all if they're vague or guarded",
                  desc: "Use only if needed — when you can't find the problem.",
                  questions: [
                    "If you could change anything about how the business is running right now, is there anything that comes to mind?",
                  ],
                },
                {
                  step: "7",
                  label: "Assess motivation and previous attempts",
                  desc: "Test seriousness before moving toward a proposal.",
                  questions: [
                    "How motivated are you to change this?",
                    "Have you already looked at ways to fix it, or is this something you haven't had time for yet?",
                  ],
                },
                {
                  step: "8",
                  label: "Reflect back and confirm the problem",
                  desc: "Summarise what you've heard. This shows you've listened and lets them confirm you've understood correctly.",
                  questions: [
                    "So from what you're telling me — you've got [problem A], [problem B], [problem C]. Is that something you'd want to change?",
                  ],
                },
                {
                  step: "9",
                  label: "Validate before pivoting to your solution",
                  desc: "Lower their defences and build trust before you talk about what you do.",
                  questions: [
                    "I've got no doubt you understand your business — what I'm hearing is that the financial side hasn't had someone dedicated to turning the numbers into forward decisions. That's the gap I work in.",
                  ],
                },
                {
                  step: "10",
                  label: "Permission-based transition to your offer",
                  desc: "Clean, respectful, and high-status. Ask permission before explaining how you work.",
                  questions: [
                    "Would you like me to explain how I work with clients?",
                  ],
                },
                {
                  step: "11",
                  label: "State the price — then sit in silence",
                  desc: "Explain how you work, what it costs, then stop talking. Let them process. Don't fill the gap.",
                  questions: [],
                  note: "After you've explained your approach and fees — pause. The silence is intentional. Whoever speaks first loses the negotiation. Hold it.",
                },
                {
                  step: "12",
                  label: "Handling money resistance (only if raised)",
                  desc: "Leave this to the end. Only use if they raise cost as an objection.",
                  questions: [
                    "You said earlier that getting clarity on the numbers was something you wanted — what's changed?",
                    "That's usually the biggest sticking point, and I understand it's a leap of faith.",
                    "I had a client in a similar position — the difference once they had the financial picture clear was [outcome]. Would it help to talk through what that looked like?",
                    "If you're willing to commit to this, I'm confident you'll see the results.",
                  ],
                },
              ].map((section, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: ASB_COLOR, color: "#fff", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{section.step}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 2px" }}>{section.label}</p>
                      <p style={{ fontSize: "0.8rem", color: "#9CA3AF", margin: "0 0 8px", lineHeight: 1.5 }}>{section.desc}</p>
                      {section.questions.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {section.questions.map((q, qi) => (
                            <div key={qi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                              <span style={{ color: ASB_COLOR, fontWeight: 700, flexShrink: 0, fontSize: "0.8rem" }}>→</span>
                              <p style={{ fontSize: "0.84rem", color: "#3D3935", margin: 0, lineHeight: 1.55, fontStyle: "italic" }}>&ldquo;{q}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.note && (
                        <div style={{ background: "#fdf4e8", border: "1px solid #f5d89e", borderRadius: 6, padding: "10px 14px", marginTop: 8 }}>
                          <p style={{ fontSize: "0.82rem", color: "#92400E", margin: 0, lineHeight: 1.5 }}>{section.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {i < 11 && <div style={{ height: 1, background: "#E0DBD3", marginLeft: 38 }} />}
                </div>
              ))}
            </div>

            {/* Content From Conversations */}
            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "24px 28px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Added Session 4 · 30 April 2026</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>Content From Conversations — Your New Workflow</p>
              <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 14px" }}>Every prospect call, networking session, and client conversation is a content tap. You're already hearing the objections, misconceptions, and questions that your audience has — you just haven't been converting them into posts yet.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                {[
                  { step: "1", text: "After every call or meeting — write down 3–4 challenges, pain points, misconceptions, or questions that came up." },
                  { step: "2", text: "WhatsApp them to Ben. Even rough notes. 'Someone today asked why they'd need me if they already have an accountant' is enough." },
                  { step: "3", text: "Ben turns them into content ideas and adds them to this dashboard." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#edf4ef", color: ASB_COLOR, fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.step}</div>
                    <p style={{ fontSize: "0.87rem", color: "#3D3935", margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#edf4ef", borderLeft: `3px solid ${ASB_COLOR}`, borderRadius: "0 6px 6px 0", padding: "12px 16px" }}>
                <p style={{ fontSize: "0.84rem", color: "#3a6048", margin: 0, lineHeight: 1.6 }}><strong>Why it matters:</strong> The bookkeeper/accountant/FD explanation post — the one landing best — came directly from someone at networking not understanding what you did. Objection-based content repels wrong-fit clients while attracting right-fit ones. Conversations equal clients, clarity, and content.</p>
              </div>
            </div>

            {[
              {
                num: "01",
                title: "The 30-minute rule is non-negotiable",
                body: "Set a 30-minute timer when you sit down to write. If it's still going when the timer ends, give it one last read, trust your instincts, and post it. The audience never sees the draft — they only see whether you showed up or didn't.",
              },
              {
                num: "02",
                title: "Your Rolls-Royce credential is your biggest asset — use it specifically",
                body: "\"Twenty years at Rolls-Royce\" is good. \"Stress-testing business cases on jet engines\" is better. The second version is specific, visual, and memorable. It doesn't sound like showing off — it sounds like someone who's actually done something. One prospect has already reached out specifically because of the Rolls-Royce reference. It's working. Don't dilute it.",
              },
              {
                num: "03",
                title: "The accountant distinction is your positioning — don't soften it",
                body: "\"Your accountant keeps you compliant. I help you run the business.\" That's the line. Not a criticism of accountants — Andy always contextualises it correctly — but a clear explanation of the gap. Every SME owner who's stared at their accounts and not known what to do with them will feel it. Use this framing in posts, networking introductions, and proposals.",
              },
              {
                num: "04",
                title: "Two posts a week — one expertise, one personal. That's the rhythm.",
                body: "The Friday finance expertise posts build credibility. The mid-week personal posts build trust. You need both. Two posts a week is the right number for now — it's sustainable, and sustainable beats ambitious. An SME owner hiring a retained FD is hiring a relationship as much as a service — they'll check your LinkedIn before they reach out. Don't use AI-generated or stock images. Use real photos of yourself. People disengage immediately with anything that looks templated. Humans engage with humans.",
              },
              {
                num: "04b",
                title: "Diary blocking is the structural change that makes everything else easier",
                body: "Client calls on Tuesday, Wednesday, and Thursday only. Monday and Friday are for admin, BD, content, and follow-ups. When sending meeting invites via Outlook, offer one or two fixed time windows only — not open availability. Use hard stops on all calls: announce it at the start ('I've got a hard stop at X'). This isn't rude — it makes both parties conscious of time. Five to ten minutes maximum prep for networking and prospect calls: focus on the human (shared interests, shared city, something to connect on immediately), not the business details. They'll tell you the details.",
              },
              {
                num: "05",
                title: "In-person talks and podcasts — prioritise them",
                body: "The Kofi Network talk was a good start. But online talks with cameras off are practice, not performance. The in-person talks and live podcasts are where the positioning really lands — you can't read notes, which forces genuine delivery, and the audience can't multitask. Your best mate has a podcast. Do it. Even if it's just practice, you're sharpening the spiel.",
              },
              {
                num: "06",
                title: "Wrong-fit clients cost you more than no clients",
                body: "You know this intellectually. Jo is working on the emotional side. The prospect who stood you up twice — the one who wanted non-cash payment — these are not edge cases, they're patterns. The time you spend managing a wrong-fit client is time you're not spending on content, networking, or the right clients. Walk away earlier than feels comfortable.",
              },
              {
                num: "07",
                title: "Website quick wins first, rebuild later",
                body: "The website isn't broken — it's just not doing justice to who you are. The quick wins (name Rolls-Royce, move the testimonial, fix the contact page copy) take an hour and meaningfully improve the first impression. The bigger rebuild — your name as the brand, a proper photo, rewritten copy in your voice — is a 3-month project. Do the quick wins now. Schedule the rebuild for when LinkedIn is working.",
              },
            ].map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "24px 28px", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, color: ASB_COLOR, flexShrink: 0, lineHeight: 1.2 }}>{r.num}</span>
                  <div>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>{r.title}</p>
                    <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
            <CommentBox clientName="Andy Scott Barrett" tabName="Ben's Recommendations" slug={slug} />
          </div>
        )}

        {/* ── GOALS ── */}
        {activeTab === "goals" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Where We're Headed</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Goals</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 16px" }}>Short-term (next 3 months)</p>
                {[
                  "LinkedIn headline and About section live and optimised",
                  "Working photo session completed — natural, not corporate",
                  "Website quick wins done (Rolls-Royce named, testimonial moved, contact page updated)",
                  "Posting rhythm established — 2 posts per week minimum",
                  "Aerospace East Midlands and Manchester pipeline progressed",
                ].map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: ASB_COLOR, fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "24px 28px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A746E", margin: "0 0 16px" }}>Long-term (6–12 months)</p>
                {[
                  "3–5 long-term retained clients generating 3 days/week of billable work",
                  "LinkedIn content generating inbound enquiries — not just referrals",
                  "Known name in UK SME fractional FD space — people mention you in conversations",
                  "Content rhythm that doesn't take a day a week",
                  "andyscottbarrett.com as the primary domain and brand",
                ].map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: "#9CA3AF", fontWeight: 700, flexShrink: 0 }}>→</span>
                    <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{g}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px" }}>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 10px" }}>What Andy's measuring by (in his own words)</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Direct enquiries from right-fit prospects via LinkedIn",
                  "Business owners referencing his content in conversations — \"I saw your post about...\"",
                  "Time spent per post coming down significantly from 2–4 hours",
                  "Feeling less anxious and more confident about what he's putting out there",
                ].map((g, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: ASB_COLOR, flexShrink: 0, fontWeight: 700 }}>→</span>
                    <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{g}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 6, padding: "12px 16px", marginTop: 16 }}>
                <p style={{ fontSize: "0.83rem", color: "#3a6048", lineHeight: 1.6, margin: 0 }}><strong>What he's NOT expecting:</strong> a quick fix. He understands it's a slow build. He just wants to know it's moving in the right direction. That's a realistic, achievable benchmark — and it's the right one to hold.</p>
              </div>
            </div>
            <CommentBox clientName="Andy Scott Barrett" tabName="Goals" slug={slug} />
          </div>
        )}

      </div>
    </div>
  );
}

// ─── ASB IDEA CARD ────────────────────────────────────────────────────────────

type AsbIdea = {
  id: string;
  week: string;
  type: "Personal" | "Expertise";
  bold: string;
  title: string;
  hook: string;
  direction: string;
  questions?: string;
  cta: string;
  drafted?: boolean;
};

function AsbHookOptions({ hook }: { hook: string }) {
  const parts = hook
    .split(/(?=Option\s*\d+:)/i)
    .map(s => s.trim())
    .filter(Boolean);
  if (parts.length < 2) {
    return (
      <div style={{ background: "#f7faf8", borderLeft: `3px solid ${ASB_COLOR}`, padding: "10px 14px", borderRadius: "0 6px 6px 0" }}>
        <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.55, fontWeight: 500 }}>{hook}</p>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {parts.map((p, i) => {
        const match = p.match(/^Option\s*(\d+):\s*([\s\S]*)$/i);
        const label = match ? `Option ${match[1]}` : `Option ${i + 1}`;
        const text = match ? match[2].trim() : p;
        return (
          <div key={i} style={{ background: "#f7faf8", borderLeft: `3px solid ${ASB_COLOR}`, padding: "10px 14px", borderRadius: "0 6px 6px 0" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: ASB_COLOR, margin: "0 0 4px" }}>{label}</p>
            <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.55, fontWeight: 500 }}>{text}</p>
          </div>
        );
      })}
    </div>
  );
}

function AsbDirectionBlocks({ direction }: { direction: string }) {
  const lines = direction.split("\n");
  const blocks: React.ReactElement[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) { i++; continue; }
    if (line.startsWith('"') && line.endsWith('"') && line.length > 2) {
      blocks.push(
        <div key={key++} style={{ background: "#f7faf8", borderLeft: `3px solid ${ASB_COLOR}`, padding: "10px 14px", borderRadius: "0 6px 6px 0", margin: "2px 0" }}>
          <p style={{ fontSize: "0.88rem", color: "#1C1C1C", margin: 0, lineHeight: 1.55, fontStyle: "italic", fontWeight: 500 }}>{line}</p>
        </div>
      );
      i++;
      continue;
    }
    if (line.startsWith("(") && line.endsWith(")")) {
      blocks.push(
        <p key={key++} style={{ fontSize: "0.82rem", color: "#7A746E", margin: "2px 0", lineHeight: 1.6, fontStyle: "italic" }}>{line.slice(1, -1)}</p>
      );
      i++;
      continue;
    }
    if (line.startsWith("(")) {
      let buf = line;
      let j = i + 1;
      while (j < lines.length && !buf.trimEnd().endsWith(")")) {
        buf += " " + lines[j].trim();
        j++;
      }
      const inner = buf.replace(/^\(/, "").replace(/\)$/, "").trim();
      blocks.push(
        <p key={key++} style={{ fontSize: "0.82rem", color: "#7A746E", margin: "2px 0", lineHeight: 1.6, fontStyle: "italic" }}>{inner}</p>
      );
      i = j;
      continue;
    }
    blocks.push(
      <p key={key++} style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1C1C1C", margin: "8px 0 2px", lineHeight: 1.5 }}>{line}</p>
    );
    i++;
  }
  return <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{blocks}</div>;
}

function AsbIdeaCard({ idea, slug }: { idea: AsbIdea; slug: string }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);
  const [rowExists, setRowExists] = useState(false);
  const [saving, setSaving] = useState(false);
  const ideaId = `asb-${idea.id}`;

  useEffect(() => {
    const supabase = createClient();
    supabase.from("idea_states").select("used").eq("slug", slug).eq("idea_id", ideaId).single()
      .then(({ data }) => {
        if (data) { setUsed(data.used); setRowExists(true); }
      });
  }, [slug, ideaId]);

  async function toggleUsed(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !used;
    setSaving(true);
    setUsed(next);
    const supabase = createClient();
    if (rowExists) {
      await supabase.from("idea_states").update({ used: next }).eq("slug", slug).eq("idea_id", ideaId);
    } else {
      await supabase.from("idea_states").insert({ slug, idea_id: ideaId, used: next });
      setRowExists(true);
    }
    setSaving(false);
  }

  const isPersonal = idea.type === "Personal";

  return (
    <div style={{ background: used ? "#f7f6f3" : "#fff", border: "1px solid #E0DBD3", borderLeft: idea.drafted ? `3px solid ${ASB_COLOR}` : used ? "1px solid #E0DBD3" : "1px solid #E0DBD3", borderRadius: 8, padding: "20px 24px", marginBottom: 14, opacity: used ? 0.65 : 1, transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", flex: 1 }}>
          <span style={{ background: isPersonal ? "#EEF2FF" : "#F0FDF4", color: isPersonal ? "#4338CA" : ASB_COLOR, border: `1px solid ${isPersonal ? "#C7D2FE" : "#c2dbc9"}`, borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", letterSpacing: "0.05em", textTransform: "uppercase" as const, flexShrink: 0 }}>{idea.week}</span>
          <p style={{ fontSize: "0.9rem", fontWeight: 600, color: used ? "#9CA3AF" : "#1C1C1C", margin: 0, textDecoration: used ? "line-through" : "none", lineHeight: 1.4 }}>{idea.title}</p>
          <span style={{ fontSize: "0.72rem", color: "#9CA3AF", marginLeft: "auto", flexShrink: 0 }}>{idea.type} · Bold: {idea.bold}</span>
          {idea.drafted && <span style={{ background: "#edf4ef", color: ASB_COLOR, border: `1px solid #c2dbc9`, borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", flexShrink: 0 }}>Draft written</span>}
        </div>
        <button
          onClick={toggleUsed}
          disabled={saving}
          style={{
            flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: 2,
            border: `1px solid ${used ? "#B0A89E" : ASB_COLOR}`,
            background: used ? "#f3f2f0" : "#edf4ef",
            color: used ? "#7A746E" : ASB_COLOR,
            cursor: saving ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {used ? "Used ✓" : "Mark used"}
        </button>
      </div>
      <button onClick={() => setOpen(o => !o)} style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: ASB_COLOR, background: "transparent", border: "none", cursor: "pointer", padding: 0, marginBottom: open ? 12 : 0 }}>
        {open ? "Hide detail ▲" : "Show detail ▼"}
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 12, borderTop: "1px solid #E0DBD3" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 6px" }}>🪝 The Hook (your first line)</p>
            <AsbHookOptions hook={idea.hook} />
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7A746E", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 4px" }}>🧭 Structure for the post</p>
            <p style={{ fontSize: "0.78rem", color: "#9CA3AF", lineHeight: 1.5, margin: "0 0 12px", fontStyle: "italic" }}>Suggestions to make it easier, not prescriptive. If a prompt doesn't apply or you can't answer it, skip it and move on.</p>
            <AsbDirectionBlocks direction={idea.direction} />
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 4px" }}>📣 CTA</p>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{idea.cta}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ASB CONTENT TAB ──────────────────────────────────────────────────────────

const asbMayIdeas: AsbIdea[] = [
  { id: "may-1", week: "Week 1 · Mid-week", type: "Personal", bold: "2/5", title: "There Were References to Martin Lewis in My Wedding Speech", hook: "Option 1: There were references to Martin Lewis in my wedding speech. Option 2: I didn't choose finance. It chose me, probably to the mild irritation of everyone around me.", direction: `Your second line (if you opened with Option 1):
"I didn't choose finance because of a career plan."

Your second line (if you opened with Option 2):
"I was the kid saving pocket money to buy one big thing while everyone else spent theirs the moment they got it."

(Then add 2 or 3 sentences here about an early memory of being interested in money. The earliest one that comes to mind. Could be the pocket money habit, the budget you kept at 18, or something else. Specific is better than general.)

Your next line:
"My friends and family have always come to me for money advice. So have a number of small business owners I know."

(Then add 1 or 2 sentences here about how that trait has shown up in ways that weren't always useful. The Martin Lewis wedding speech reference goes here. Drop in what the best man actually said if you can remember the line.)

Your closing line before the CTA:
"There's a difference between someone who understands finance and someone who actually cares what the numbers mean for your business."

(Then add 1 sentence here on what that means for the people you work with now. Something like: caring about this stuff for 30-odd years is probably why your clients get someone as invested in the numbers as they are.)`, cta: '"Are you someone who naturally gets into the numbers, or do you do everything you can to avoid them?"', drafted: true },
  { id: "may-2", week: "Week 1 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: The Money's There. But Is It Actually Yours?", hook: "Option 1: That money in your account isn't all yours. Option 2: A lot of owners manage cash flow by just... not looking at it. Hoping it works itself out. Sometimes it does. Sometimes it really doesn't.", direction: `Your second line (if you opened with Option 1):
"The bank balance tells you what's there. It doesn't tell you what's already spoken for."

Your second line (if you opened with Option 2):
"Treating the bank balance as the measure of how you're doing financially is one of the most common mistakes I see. And an easy one to make."

(Then add 2 or 3 sentences here listing the hidden claims that sit between the balance and what's actually spendable. VAT, corporation tax, committed supplier costs, pre-sold revenue not yet earned. Just name them plainly.)

Your next line:
"I knew a business owner who'd had a strong few months. Cash was sitting in the account."

(Then add 3 or 4 sentences here walking through a worked example. Could be the one from your own experience where someone went and bought the new piece of kit and then the tax bill arrived. Or invent simple numbers, e.g. £80k in the account, here's what's already committed. Real numbers make this real.)

Your closing line before the CTA:
"A useful starting point is looking at what's due over the next three months. It's a simple question. Many business owners I speak to don't have the answer."

(Then add 1 sentence here on what owners who manage cash by gut feel usually end up dealing with. Calm and factual, with a slight edge of "I've seen how this ends.")`, cta: '"If you\'re reading this thinking you need to sort this out, drop me a message. I\'ll buy you a coffee."' },
  { id: "may-3", week: "Week 2 · Mid-week", type: "Personal", bold: "3/5", title: "My Boss Told Me My Job Was Safe. I Remember Thinking: That's Not Good News.", hook: "Option 1: My boss called me in to tell me my job was safe. That wasn't the news I was hoping for. Option 2: I'd decided on 40 years old years before I actually got there. Not as a wish, as a plan.", direction: `Your second line (if you opened with Option 1):
"I'd decided on 40 years old years before I actually got there. Not as a wish. As a plan."

Your second line (if you opened with Option 2):
"My share vesting aligned with my 40th birthday. The maths had been done a long time ago."

(Then add 2 or 3 sentences here on when you first knew 40 was the number, and what had been stopping you before. Keep it honest, not inspirational.)

Your next line:
"My last day was exactly 20 years to the day after walking in as an intern."

(Then add 2 or 3 sentences here on what the last morning actually felt like. The detail makes this post. Don't generalise, just describe it.)

Your closing line before the CTA:
"There's a difference between knowing something and acting on it."

(Then add 1 sentence here on what you know now that you wish you'd known earlier about making that kind of call.)`, cta: '"Is there something you already know the answer to, but haven\'t done anything about yet?"' },
  { id: "may-4", week: "Week 2 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even", hook: "Option 1: A 10% discount on a low-margin product can mean selling 200% more just to break even. Option 2: Most business owners who discount regularly have never done this maths. Here it is.", direction: `Your second line (if you opened with Option 1):
"Most people don't believe it when I first show them the maths."

Your second line (if you opened with Option 2):
"Offering a 10% discount feels like a small thing. If you had to make treble the sales just to make the same money though, would you do it?"

(Then add 2 or 3 sentences here on why owners offer discounts in the first place. Someone said they were too expensive. Sales are slow. Confidence is low. Acknowledge that it's logical, even if the maths says otherwise.)

Your next line:
"Take a business selling something for £100 that costs £85 to produce. They make a £15 gross profit on every sale."

(Then add 3 or 4 sentences here walking through the worked example. Discount by 10%, gross profit drops to £5, they now have to sell three of those products to get their £15 back. Pick whatever gross margin % feels right, keep the numbers simple.)

Your closing line before the CTA:
"I'm not saying discounting is never right."

(Then add 2 or 3 sentences here on when it IS the right call. Shifting stock, early payment for cash flow, a deliberate commercial decision where you've understood the full consequences. Those are considered calls. Often it isn't that considered.)`, cta: '"If the discounting maths surprised you, worth a chat. Drop me a message."' },
  { id: "may-5", week: "Week 3 · Mid-week", type: "Personal", bold: "2/5", title: "They Sent Me to Beijing at 25", hook: "Option 1: At 25, I was sent to Beijing to sort out a finance operation held together with goodwill and optimism. Option 2: Most SME finance operations look a lot like that Beijing office did when I arrived.", direction: `Your second line (if you opened with Option 1):
"I didn't speak the language. The team had been working in silos for years. The numbers were everywhere and nowhere."

Your second line (if you opened with Option 2):
"Messy, ad-hoc, held together by goodwill and the people who'd been there longest."

(Then add 2 or 3 sentences here describing what it actually looked like when you arrived. The state of the operation. Be specific, what was missing, what was duplicated, what nobody had ever sat down and structured.)

Your next line:
"The first thing I did was sit with the local team and listen."

(Then add 2 or 3 sentences here on how you earned their trust and what the first thing you changed was. Plain English. No corporate language.)

Your closing line before the CTA:
"I came back with something I didn't go out there with, the confidence that I can just turn my hand to stuff."

(Then add 1 or 2 sentences here drawing the parallel to now. Most SME finance operations look a bit like that Beijing office did. Nobody's ever sat down and looked at them properly.)`, cta: '"Most of the businesses I work with have never had anyone look properly at their finances. When did you last take a proper look at yours?"' },
  { id: "may-6", week: "Week 3 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: One of Your Products Is Carrying the Rest. Do You Know Which One?", hook: "Option 1: I asked an owner which of their products made the most money. They said the one that sold the most. Those are two very different things. Option 2: One of your products is carrying the rest. Do you know which one?", direction: `Your second line (if you opened with Option 1):
"Volume is not the same as profit. The one that sells the most might be the one that's quietly costing you money."

Your second line (if you opened with Option 2):
"Most owners can tell you which product sells the most. Far fewer can tell you which one actually makes the most money."

(Then add 2 or 3 sentences here on what product-level margin analysis actually shows when you do it for the first time. The typical reaction. The bit that surprises people.)

Your next line:
"I worked with an owner who was convinced their best-seller was the engine of the business."

(Then add 3 or 4 sentences here walking through an anonymised example. What they thought versus what the numbers showed. If you've got the Lego comparison handy, that fits well here, Lego had financial difficulties because they'd complicated their range and didn't know which pieces were carrying the rest.)

Your closing line before the CTA:
"Finding the loser doesn't mean killing it. Sometimes there's a reason to keep it."

(Then add 1 or 2 sentences here on the legitimate reasons to keep a loss-making product in the range. A loss-leader that brings other business in, a customer relationship, a strategic call. The point isn't to cut it. The point is to know.)`, cta: '"If you\'ve never looked properly at which part of your business is carrying the rest, that\'s the conversation to have first. Drop me a message."' },
  { id: "may-7", week: "Week 4 · Mid-week", type: "Personal", bold: "2/5", title: "She Could Finally Sleep", hook: "Option 1: She told me she could finally sleep. That was the metric that mattered. Option 2: She knew her business was doing well. She just couldn't prove it fast enough, and it was grinding her down.", direction: `Your second line (if you opened with Option 1):
"The spreadsheet wasn't the win. The weight lifting off her shoulders was."

Your second line (if you opened with Option 2):
"Investors were asking questions about cash flow she couldn't answer fast enough. The business was fine. She wasn't."

(Then add 2 or 3 sentences here on what the atmosphere was like early on. Was she stressed, resigned, resigned to being stressed. Specific is better than general. Keep her anonymous throughout.)

Your next line:
"Once we got the cash planning sorted, she wasn't on her own anymore."

(Then add 2 or 3 sentences here on what actually changed. Was it a forecast, a call she could now answer, a question she could now hold her own on. Don't get into the technical detail of what you did. Stay with the shift.)

Your closing line before the CTA:
"A surprising number of business owners manage all of this completely on their own. Not because they're confident. Because they've never thought there was another option."

(Then add 1 sentence here on what shifted in how she saw that. Or just leave it, sometimes the silence after that line is the point.)`, cta: '"Financial pressure is a weight most business owners carry alone. You don\'t have to."' },
  { id: "may-8", week: "Week 4 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: What Break-Even Actually Means, and Why Most People Get It Wrong", hook: "Option 1: Most business owners have a rough break-even number. Most rough numbers are wrong. Option 2: If you don't know your break-even point, every pricing decision involves some guesswork.", direction: `Your second line (if you opened with Option 1):
"Break-even isn't just a number. It's the foundation for every pricing decision, every growth plan, and every decision about whether you can afford to hire."

Your second line (if you opened with Option 2):
"Most owners have heard of it. Far fewer have actually worked theirs out properly."

(Then add 2 or 3 sentences here on the most common mistake people make when they calculate their own break-even. Usually it's missing their own time, or indirect costs, or fulfilment costs.)

Your next line:
"Let me walk through a simple example."

(Then add 4 or 5 sentences here walking through a worked example. Simple enough that someone with no finance background can follow, sharp enough that someone who thinks they already know it feels something click. Pick numbers that produce a slightly surprising result.)

Your closing line before the CTA:
"Once someone actually has this number, the decisions start to feel different."

(Then add 1 or 2 sentences here on what changes. Pricing conversations, hiring calls, when to take on a new contract. Plain English.)`, cta: '"If your break-even number is a rough guess, happy to look at it with you. Drop me a message."' },
];

const asbJuneIdeas: AsbIdea[] = [
  { id: "jun-1", week: "Week 5 · Mid-week", type: "Personal", bold: "4/5", title: "Someone Slammed the Door. I Was Just the Messenger.", hook: "Option 1: One of them slammed his fist on the desk and walked out. The numbers were still right. Option 2: I once told a room full of senior people something they really didn't want to hear. That's still the most useful thing I've ever done in a meeting.", direction: `Your second line (if you opened with Option 1):
"It was a high-stakes meeting. A product the room had invested years in. And the numbers said it wasn't going to work."

Your second line (if you opened with Option 2):
"The room had been built around the idea that this would work. The numbers were saying something different."

(Then add 2 or 3 sentences here setting the scene. Keep all identifying details out, no nationality, no product, no company. What was the atmosphere in the room before it went wrong.)

Your next line:
"I was really just the messenger at that point."

(Then add 2 or 3 sentences here on how you held your ground and what was going through your head. The honest version. You weren't there to win an argument, you were there because the numbers were what they were.)

Your closing line before the CTA:
"That moment shaped how I work with clients now. I'm not there to validate decisions people have already made."

(Then add 1 or 2 sentences here tying it to SME owners. How often does someone avoid looking at the numbers because they're worried about what they might find? The most useful thing an adviser can do is tell you the truth.)`, cta: '"Has anyone ever told you something about your business you didn\'t want to hear, but that turned out to be exactly what you needed?"' },
  { id: "jun-2", week: "Week 5 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: Three Questions Every Business Owner Should Be Able to Answer", hook: "Option 1: Three questions. You don't have to answer out loud. Option 2: I close every networking talk with these three questions. Most people in the room go quiet.", direction: `Your second line (if you opened with Option 1):
"Just answer them honestly in your head. That's enough."

Your second line (if you opened with Option 2):
"They're not difficult questions. That's part of why the silence is so telling."

Your next part, the three questions, one per line:
"1. When you're making a big decision, do you go with gut feel or look at what the numbers are telling you?"
"2. Do you know which of your products or services is the most profitable?"
"3. Do you know what your cash position will be in three months, and how much of that will actually be yours?"

(Then add 2 or 3 sentences here on what proportion of owners can genuinely answer all three, and which one usually stumps people most. From your real experience at the talks.)

Your closing line before the CTA:
"Most business owners who can't answer these aren't failing. They just haven't had anyone help them look."

(Then add 1 sentence here on what changes once someone can answer all three. Less stress, fewer surprises, more confident decisions.)`, cta: '"If one of those three stopped you, drop me a message. I\'ll buy you a coffee."' },
  { id: "jun-3", week: "Week 6 · Mid-week", type: "Personal", bold: "2/5", title: "I'm Running My First Half Marathon. I'm Not Fast. That's Not the Point.", hook: "Option 1: I'm training for my first half marathon. My pace is best described as determined. Option 2: Last year I ran a 10k faster than I did at 23. This year I'm doing a half marathon. Slow progress is still progress.", direction: `Your second line (if you opened with Option 1):
"I'm not built for distance running. That's been very clear for a while."

Your second line (if you opened with Option 2):
"I never thought I'd say that. The plan was always to be more sensible as I got older. Apparently the plan changed."

(Then add 2 or 3 sentences here on what made you sign up for the half marathon this year, and what training currently looks like. How often you run, what's hard about it, what you listen to. Specific details land better than general ones.)

Your next line:
"Finishing is the goal. Not racing to win."

(Then add 2 or 3 sentences here on what that feels like. The kind of progress you don't really notice from one week to the next, but you do from one year to the next. Don't labour the parallel to business, let it land on its own.)

Your closing line before the CTA:
"Slow progress is still progress."

(Then add 1 sentence here, if you want one. Otherwise leave it there and let it breathe.)`, cta: '"Are you working towards something right now that has nothing to do with business? What is it?"' },
  { id: "jun-4", week: "Week 6 · Friday", type: "Expertise", bold: "1/5", title: "The Real Cost: How to Price Something You Actually Make Money From", hook: "Option 1: Most businesses price based on gut feel, competitors, or what the market will bear. None of those work without knowing your costs first. Option 2: If you can't tell me what your most popular product costs to deliver, you can't tell me if you're making money on it.", direction: `Your second line (if you opened with Option 1):
"All three of those are legitimate inputs. None of them work without the cost foundation underneath."

Your second line (if you opened with Option 2):
"If you don't know your costs, you can't hold your price in a negotiation. You're winging it and hoping the other person doesn't push back."

(Then add 2 or 3 sentences here on the costs that owners routinely miss. Their own time. Indirect costs. Fulfilment. In your experience, which one is the most common culprit.)

Your next line:
"I worked with a business owner who realised, after we sat down with the actual numbers, that their headline product had been making them nothing."

(Then add 3 or 4 sentences here walking through that anonymised example. What they thought the margin was versus what it actually was. What changed in the conversation once they could see it.)

Your closing line before the CTA:
"Defendable pricing means you can say no without flinching."

(Then add 1 or 2 sentences here on what that actually looks like in a real conversation with a customer. The owner who can hold their price because they know exactly what they're being asked to give up.)`, cta: '"If pricing feels more like guesswork than a decision, that\'s worth a conversation. Drop me a message."' },
  { id: "jun-5", week: "Week 7 · Mid-week", type: "Personal", bold: "3/5", title: "Leaving the Corporate World Was Harder Than I Expected. And Easier.", hook: "Option 1: Everyone said leaving a stable corporate career was a big risk. They weren't wrong. They also weren't fully right. Option 2: I didn't leave because I was brave. I left because the alternative felt worse.", direction: `Your second line (if you opened with Option 1):
"The honest version isn't the highlight reel. It's more interesting than that."

Your second line (if you opened with Option 2):
"It was either go back into all of that and I didn't want to do that to myself, or coast. I didn't feel passionate about that either. Or come and do what I'm doing now. So I took the leap."

(Then add 2 or 3 sentences here on what was actually hard about the first few months. The quiet, the uncertainty, the structure you didn't know you'd been relying on. Be specific. The hardest moment if you've got one.)

Your next line:
"There were also things I didn't expect."

(Then add 2 or 3 sentences here on what surprised you in both directions. What you missed about corporate that you didn't think you would. What's better now in a way you couldn't have predicted.)

Your closing line before the CTA:
"If I could go back to the morning I handed in my notice, I'd tell myself one thing."

(Then add 1 or 2 sentences here on what that one thing would be. Honest, not motivational. Whatever actually comes to mind.)`, cta: '"If you\'ve made a big leap, professionally or personally, what\'s the one thing nobody warned you about?"' },
  { id: "jun-6", week: "Week 7 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: Your Accountant Is Doing Their Job. That's the Problem.", hook: "Option 1: Your accountant is doing exactly what they're supposed to. That's the problem. Option 2: The accounts arrived. You glanced at them. You carried on. That's not on you, it's a gap nobody told you existed.", direction: `Your second line (if you opened with Option 1):
"They're keeping you compliant. They're reporting what's already happened. That's their job and they do it well."

Your second line (if you opened with Option 2):
"It's not that you don't care. It's that nobody handed you the bit that would have told you what to actually do with them."

(Then add 2 or 3 sentences here on what owners typically say about their accountant early in a conversation with you. No shade on accountants, the gap isn't their fault. Compliance and forward-looking strategy are genuinely different roles.)

Your next line:
"There's a ladder most businesses work their way up. Bookkeeper, accountant, finance director."

(Then add 3 or 4 sentences here walking through the ladder. What each role does and where the gap shows up. The accountant who goes quiet for 11 months between filings is worth including, not a criticism, just not the same job as sitting alongside you while you make decisions.)

Your closing line before the CTA:
"The FD role isn't tax returns or audit. It's the person looking forward with you, not just reporting on what's already happened."

(Then add 1 or 2 sentences here on what that actually looks like in practice. Sitting alongside an owner. Asking the questions their accountant has never asked them.)`, cta: '"If that gap sounds familiar, drop me a message. I\'ll buy you a coffee."' },
  { id: "jun-7", week: "Week 8 · Mid-week", type: "Personal", bold: "1/5", title: "We've Been Fostering Labradors. This Is What I've Learned.", hook: "Option 1: My wife and I have been fostering Labradors. Every single one has been different. All of them have taught us something. Option 2: We've been looking after dogs waiting for their forever home. I didn't expect it to teach me much. It has.", direction: `Your second line (if you opened with Option 1):
"They each arrive with their own personality, their own habits, their own way of working out whether they trust you."

Your second line (if you opened with Option 2):
"We started doing it for the dogs. It's ended up doing something for us too."

(Then add 2 or 3 sentences here on what made you start fostering. Our own Lab Milly passing away is part of this if you want to include it. The fostering isn't incidental.)

Your next line:
"There's a moment when they leave for their permanent home."

(Then add 2 or 3 sentences here on what that handover actually feels like. Is there a particular dog that stands out, you can drop that in here too.)

Your closing line before the CTA:
"Fostering has changed how I think about patience and trust in a way I didn't expect."

(Then add 1 sentence here, if anything comes to mind. Don't force the business parallel, let the story do the work.)`, cta: '"Does anyone else foster, or have you thought about it? Would love to hear other people\'s experiences."' },
  { id: "jun-8", week: "Week 8 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: Growth Should Feel Exciting. If It Feels Risky, Here's Why.", hook: "Option 1: Growth should feel exciting. If it feels risky, that's usually a numbers problem, not a courage problem. Option 2: Some businesses grow fast without realising it. Revenue up, headcount up, stress up. No plan underneath any of it.", direction: `Your second line (if you opened with Option 1):
"Without clarity, every opportunity is a gamble. With it, you can take a calculated risk."

Your second line (if you opened with Option 2):
"That's not a success story. It's a warning sign with good numbers on the surface."

(Then add 2 or 3 sentences here on a client whose growth was entirely accidental. What it looked like from the inside, when the problem surfaced. Keep them anonymous.)

Your next line:
"There's also the flip side."

(Then add 2 or 3 sentences here on the owner who turned down a good opportunity because the numbers felt unclear. Both situations come from the same root problem, operating without the information that makes growth feel intentional rather than scary.)

Your closing line before the CTA:
"A calculated risk isn't a brave one. It's just one you've actually looked at properly."

(Then add 1 or 2 sentences here on what changes when clarity is there. Not just better decisions, a fundamentally different relationship with risk. Plain language.)`, cta: '"If growth is feeling more stressful than exciting right now, I\'d genuinely like to know what\'s underneath it. Drop me a message."' },
];

const asbJulyIdeas: AsbIdea[] = [
  { id: "jul-1", week: "Week 9 · Mid-week", type: "Personal", bold: "4/5", title: "I Woke Up One Morning and Everything Was Spinning", hook: "Option 1: I woke up one morning and the room was spinning. I hadn't been drinking. That was my body telling me something needed to change. Option 2: Pressure doesn't announce itself. It compounds. Then one day it does.", direction: `Your second line (if you opened with Option 1):
"Everything's spinning like you've had 10 pints. That's what a vestibular migraine feels like."

Your second line (if you opened with Option 2):
"Mine had been building for a while. I just hadn't been paying attention."

(Then add 2 or 3 sentences here on the warning signs you missed before that morning. The pressure that had been building. Be specific without getting into anything you'd rather keep private, this is 4/5 bold for a reason.)

Your next line:
"Recovery wasn't dramatic. It was a lot of small things, one after the other."

(Then add 2 or 3 sentences here on what actually changed. What habits made the biggest difference. Which ones surprised you. Plain detail beats sweeping statements.)

Your closing line before the CTA:
"I notice things in other people now that I didn't notice before."

(Then add 1 or 2 sentences here drawing the quiet parallel to business owners, carrying financial stress alone without realising the toll it takes. Don't labour it. Let it land.)

(A note from Ben: only write this when it feels right, not because the schedule says so.)`, cta: '"Has your body ever told you something your brain was refusing to hear?"' },
  { id: "jul-2", week: "Week 9 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: The Business Was Profitable. They Were Three Months From Running Out of Cash.", hook: "Option 1: The business was profitable. They were three months from running out of cash. Option 2: A supplier hadn't invoiced them in four months. The owner thought it was a good run of luck. It wasn't.", direction: `Your second line (if you opened with Option 1):
"From the outside it looked like a healthy, growing business. From the inside it was about to hit a wall."

Your second line (if you opened with Option 2):
"What felt like a lucky spell was actually a deferred liability sitting quietly on the side. At some point the invoices were going to land."

(Then add 2 or 3 sentences here on what the business looked like from the outside when you first got involved. Growing, healthy on the surface. Keep them anonymous throughout.)

Your next line:
"Once we put a forecast in place, it became clear they would run out of cash in three months."

(Then add 3 or 4 sentences here on what exactly they did to fix it. The contracts, the payment timing, the conversation with the supplier if relevant. The owner said it was worse than they'd thought, but they could sleep at night because they knew, and there was still time to act.)

Your closing line before the CTA:
"A forecast doesn't prevent problems. It gives you time to act on them."

(Then add 1 or 2 sentences here on owners who manage cash flow by gut feel, or just hoping it works itself out. How that usually plays out. Knowing is better than not knowing, even when what you find out is uncomfortable.)`, cta: '"If you\'re running without a cash flow forecast, drop me a message. I\'ll buy you a coffee."' },
  { id: "jul-3", week: "Week 10 · Mid-week", type: "Personal", bold: "2/5", title: '"I Wish I\'d Done This Sooner", What Clients Actually Say', hook: "Option 1: The thing clients say most, once things are working: I wish I'd done this sooner. Option 2: Not 'that was useful' or 'glad we did that.' Specifically: sooner. Every time.", direction: `Your second line (if you opened with Option 1):
"It's not just useful feedback. It's the same sentence almost word for word."

Your second line (if you opened with Option 2):
"There's something about that word that says everything. Sooner. Before the stress, before the surprise, before the decision they had to make blind."

(Then add 2 or 3 sentences here on what clients typically mean when they say it. How far back are they imagining. What's the thing they wish they'd had earlier, visibility, a forecast, a second pair of eyes.)

Your next line:
"I worked with a founder preparing to raise investment. He could explain the business model clearly but couldn't articulate the financial story."

(Then add 2 or 3 sentences here on what changed once he could. The decision in front of him became clearer. The conversations with investors went differently. Keep him anonymous.)

Your closing line before the CTA:
"The most common thing that stops people acting earlier isn't money. It's the belief that they should be able to figure it out on their own."

(Then add 1 sentence here on the cost of waiting. Honest, not preachy.)`, cta: '"What\'s one thing in your business you\'ve been putting off, and what\'s actually stopping you?"' },
  { id: "jul-4", week: "Week 10 · Friday", type: "Expertise", bold: "1/5", title: "The Real Cost: If You're Looking for Investment, Your Financial Story Needs to Match Your Business Story", hook: "Option 1: He could explain the business brilliantly. The financial story was another matter. Option 2: In an investor conversation, your numbers need to hold up under questioning, not just your pitch.", direction: `Your second line (if you opened with Option 1):
"That's a more common situation than founders realise. The pitch lands. The follow-up questions don't."

Your second line (if you opened with Option 2):
"A polished pitch is the easy part. The financial story is what the investor goes back to once the meeting's over."

(Then add 2 or 3 sentences here on the most common financial questions investors ask that founders aren't prepared for. The bit that tends to derail an otherwise strong pitch.)

Your next line:
"I worked with a founder preparing to raise. He could explain the business model brilliantly. The financial story was another matter."

(Then add 3 or 4 sentences here walking through the before and after. What he was struggling to articulate, what changed once we'd worked on it together, what those follow-up conversations looked like after.)

Your closing line before the CTA:
"The financial story isn't a separate document. It's the same story your business tells, told in numbers."

(Then add 1 sentence here on what the simplest version of that looks like for a pre-investment founder building it in a short window.)`, cta: '"If you\'re preparing to raise and the financial story isn\'t as solid as the pitch, I\'m happy to take a look. Drop me a message."' },
  { id: "jul-5", week: "Week 11 · Mid-week", type: "Personal", bold: "2/5", title: "I've Been Learning Japanese for 400 Days in a Row. Here's What That's Taught Me.", hook: "Option 1: I've been learning Japanese every day for over 400 days. I'm not fluent. Not even close. But I'm significantly better than I was. Option 2: 400 days of daily practice teaches you something that has nothing to do with Japanese.", direction: `Your second line (if you opened with Option 1):
"Some days it's 15 minutes. Some days it's 5. Some days it's 5 minutes I really didn't want to do."

Your second line (if you opened with Option 2):
"French A* at GCSE, Mandarin across two spells in Beijing, and now Japanese on Duolingo every morning. The pattern says more about me than the languages do."

(Then add 2 or 3 sentences here on why Japanese specifically. What drew you to it. Self-deprecating about your progress is fine, you're not pretending to be fluent.)

Your next line:
"The moment I noticed real progress wasn't a moment. It was a slow realisation."

(Then add 2 or 3 sentences here on what that looked like. A conversation you held longer than you expected. A sentence that came out without thinking. The kind of progress you don't really notice from one week to the next.)

Your closing line before the CTA:
"Small habits compound. The trick is being patient enough to let them."

(Then add 1 or 2 sentences here on what habit in your life or business has compounded in a way you didn't expect. Don't labour the parallel, let it land naturally.)`, cta: '"What\'s a habit you\'ve kept going that\'s quietly made a difference, in life or in business?"' },
  { id: "jul-6", week: "Week 11 · Friday", type: "Expertise", bold: "3/5", title: "The Real Cost: \"I Can Just Use AI for My Financial Strategy.\" Can You, Though?", hook: "Option 1: I keep hearing this: why would I need financial help when I can just use AI? It's a fair question. Here's my honest answer. Option 2: AI can produce a financial model. It can't tell you if the assumptions are right.", direction: `Your second line (if you opened with Option 1):
"It's a completely fair question. I'd be asking it too."

Your second line (if you opened with Option 2):
"That's the bit that catches people. The model looks right. The assumptions underneath it are the part that matters."

(Then add 2 or 3 sentences here on what AI can genuinely do well for SME owners. Drafting, summarising, working through scenarios. Acknowledge it properly, you're not being dismissive.)

Your next line:
"The problem isn't AI. It's using any tool without the ability to evaluate what it's producing."

(Then add 3 or 4 sentences here on where it falls short. If you don't understand finance well enough to know when the output is wrong or incomplete, you won't know to question it. Have you seen an example of plausible-looking AI output that was wrong in an important way? Drop it in here, anonymised.)

Your closing line before the CTA:
"The value isn't in the model. It's in knowing whether to trust it."

(Then add 1 sentence here on what you'd say to someone who genuinely believes the objection. Honest, not preachy.)`, cta: '"If you\'re relying on AI for financial decisions and not quite sure what to trust, worth a conversation. Drop me a message."' },
  { id: "jul-7", week: "Week 12 · Mid-week", type: "Personal", bold: "3/5", title: "The Question I Ask Every New Client (That Nobody's Ever Asked Them Before)", hook: "Option 1: I ask every new client the same question. The reaction tells me everything I need to know. Option 2: Nobody's ever asked them this before. That's usually obvious from how long the pause is.", direction: `Your second line (if you opened with Option 1):
"It's not a clever question. It's just one nobody else has thought to ask them."

Your second line (if you opened with Option 2):
"The pause is usually the most useful part of the conversation."

Your next line, the question itself:
(Drop in your real question here. Something like "what are you getting from your accountant, and is it helping you run the business?", but use the actual one you ask. Word for word.)

(Then add 2 or 3 sentences here on the different reactions you get. Confidence, hesitation, the long pause where someone realises they don't have an answer. What each one tells you.)

Your next line:
"The most memorable answer I've ever had came from a business owner who paused for what felt like a full minute."

(Then add 2 or 3 sentences here on a surprising or memorable response. Could be the one above, or another one. Keep them anonymous. The detail makes the story.)

Your closing line before the CTA:
"The answer matters less than what happens in the room while someone's trying to find it."

(Then add 1 sentence here, if anything else comes to mind. Otherwise leave it.)`, cta: '"How would you answer it?"' },
  { id: "jul-8", week: "Week 12 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: Costly Mistakes Don't Announce Themselves. They Show Up Afterwards.", hook: "Option 1: Costly mistakes don't announce themselves. They show up in the numbers three months later. Option 2: A decision that made sense at the time. A margin that disappeared. Nobody saw it coming because nobody was looking.", direction: `Your second line (if you opened with Option 1):
"By the time the numbers say something's wrong, the decision that caused it was made a quarter ago."

Your second line (if you opened with Option 2):
"Nobody made a bad call. Nobody was reckless. There just wasn't anyone looking at the right thing at the right time."

(Then add 2 or 3 sentences here on the most common guesswork-driven mistakes you see. Pricing without proper cost analysis. Hiring without modelling it out. Outsourcing decisions made on a hunch.)

Your next line:
"I've seen this play out in a few different ways."

(Then add 3 or 4 sentences here walking through 2 or 3 anonymised examples. Could be a contract that quietly lost money for months. A complex product range that was eating margin without anyone noticing. Pick the ones that feel most relatable to your readers.)

Your closing line before the CTA:
"This isn't about being perfect. It's about having enough information to course-correct before things become serious."

(Then add 1 or 2 sentences here on the difference between a mistake and a crisis. Usually how quickly you found out. Calm and factual, no scare tactics.)`, cta: '"If there are decisions in your business the numbers haven\'t backed up, drop me a message. I\'ll buy you a coffee."' },
];

const asbAugustIdeas: AsbIdea[] = [
  { id: "aug-1", week: "Week 13 · Mid-week", type: "Personal", bold: "3/5", title: "\"I'm Just Bad With Money.\" No. You're Not.", hook: "Option 1: I'm just bad with money. I hear this within the first ten minutes of most first conversations. It's almost never true. Option 2: The problem isn't that you don't understand numbers. It's that nobody's ever helped you understand what yours mean.", direction: `Your second line (if you opened with Option 1):
"It's a story people have been telling themselves for years. And it's usually wrong."

Your second line (if you opened with Option 2):
"There's a difference between knowing the 'what', the figures, and knowing the 'so what.' That gap isn't a character flaw. It's a missing layer."

(Then add 2 or 3 sentences here on what people usually mean when they say it. Is it numeracy, interpretation, anxiety, or something else? Be honest, you've heard it enough times to know the pattern.)

Your next line:
"I worked with an owner who genuinely believed it about themselves."

(Then add 2 or 3 sentences here on the moment something shifted. What changed once they could actually see what their numbers meant. Keep them anonymous.)

Your closing line before the CTA:
"The owners who say they're bad with money are often the most coachable. They're honest about what they don't know."

(Then add 1 or 2 sentences here on the link between this belief and managing finances alone. Most don't think there's another way. Warm, not patronising, you're releasing people from a story, not telling them they're wrong.)`, cta: '"Do you consider yourself a numbers person, or have you always left that to someone else?"' },
  { id: "aug-2", week: "Week 13 · Friday", type: "Expertise", bold: "3/5", title: "The Real Cost: You Want to Sell the Business for £3 Million. What Does It Need to Look Like to Get There?", hook: "Option 1: Most business owners have an exit number in mind. Very few have mapped out what the business needs to look like to get there. Option 2: Ask an owner what their exit goal is and they'll tell you the number straight away. Ask what the business needs to look like financially to get there. Long pause.", direction: `Your second line (if you opened with Option 1):
"The number isn't the problem. The path to it is the bit that's usually missing."

Your second line (if you opened with Option 2):
"That long pause is the gap between ambition and roadmap. It's a very common gap."

(Then add 2 or 3 sentences here on the most common difference between what owners think their business is worth and what it would actually sell for. Valuation multiples. Owner-dependency. Messy financials. Pick whichever one comes up most often in your conversations.)

Your next line:
"There are usually two or three financial levers that most affect exit value for an SME."

(Then add 3 or 4 sentences here walking through what they are. Margin trajectory. Revenue quality, recurring versus one-off. Clean financials. Reduced owner-dependency. Be specific without going into a textbook list.)

Your closing line before the CTA:
"The business you want to exit isn't built at the end. It's built now."

(Then add 1 or 2 sentences here on what that actually means in practice. Every month without a plan is a month of compounding the gap. Real, not motivational.)`, cta: '"If you have an exit number but nothing mapped out behind it, drop me a message. I\'ll buy you a coffee."' },
  { id: "aug-3", week: "Week 14 · Mid-week", type: "Expertise", bold: "3/5", title: "The Real Cost: \"I'm Not Ready Yet.\" What That's Usually Costing You.", hook: "Option 1: The most common thing I hear at the end of a good conversation: I think this is exactly what I need, just not quite yet. Option 2: Readiness is a feeling, not a fact. And the thing you're waiting to sort out is usually exactly the thing that needs financial input.", direction: `Your second line (if you opened with Option 1):
"It's almost always genuine. And it's almost always more expensive than people realise."

Your second line (if you opened with Option 2):
"Once X is sorted, I'll deal with Y. That's the loop. The trouble is that X is usually the thing that needs financial input to sort."

(Then add 2 or 3 sentences here on the most common "not yet" reason you hear, and what's usually underneath it. Often it's owners who are working in the business rather than on it.)

Your next line:
"I worked with an owner who had been telling themselves they'd sort the finances 'once things calmed down'."

(Then add 2 or 3 sentences here on what the waiting actually cost them. Concrete, anonymised. Whatever the practical price was, missed decisions, slower growth, the stress of not knowing.)

Your closing line before the CTA:
"There is a version of 'not yet' that's legitimate. I'm not saying there isn't."

(Then add 1 or 2 sentences here on how you tell the difference. When it's a real call versus when it's a story someone's telling themselves. Honest, not pushy.)`, cta: '"If you\'ve been putting it off and you know it, drop me a message. I\'ll buy you a coffee."' },
  { id: "aug-4", week: "Week 14 · Friday", type: "Expertise", bold: "2/5", title: "The Real Cost: \"I Need to Speak to My Business Partner.\" Great. Here's What to Tell Them.", hook: "Option 1: I just need to run it past my business partner. Fine. But if they also don't know the numbers, you're about to have the conversation you've both been avoiding. Option 2: Two owners, neither with clear financial visibility, making a shared decision. That's a numbers problem, not a partnership problem.", direction: `Your second line (if you opened with Option 1):
"That's not a bad thing. It just means the conversation you're about to have is actually a version of the problem you'd be solving."

Your second line (if you opened with Option 2):
"Two heads aren't better than one if they're both working from the same blind spots."

(Then add 2 or 3 sentences here on what financial decision-making looks like in businesses with co-founders or business partners. What's usually the real concern behind "I need to speak to my partner."  Don't be adversarial about it, most of the time it's a fair instinct.)

Your next line:
"Having a business partner doesn't make financial decisions easier."

(Then add 2 or 3 sentences here on why. You need two people seeing the same picture. That's exactly when a finance director view becomes more valuable, not less. Plain English.)

Your closing line before the CTA:
"If someone asked me to explain the value of this to their business partner in one sentence, I'd say this."

(Then add 1 sentence here, your actual one-line version of the value proposition for a co-founder conversation. Word for word.)`, cta: '"If the financial picture isn\'t equally clear on both sides of the partnership, drop me a message. I\'ll buy you a coffee."' },
];

function AsbContentTab({ slug }: { slug: string }) {
  const [activeMonth, setActiveMonth] = useState("may");
  const months = [
    { id: "may", label: "May — Weeks 1–4" },
    { id: "june", label: "June — Weeks 5–8" },
    { id: "july", label: "July — Weeks 9–12" },
    { id: "august", label: "August — Weeks 13–14" },
  ];
  const ideas = activeMonth === "may" ? asbMayIdeas : activeMonth === "june" ? asbJuneIdeas : activeMonth === "july" ? asbJulyIdeas : asbAugustIdeas;
  const descriptions: Record<string, string> = {
    may: "The first month. Build the habit, establish the rhythm. Personal posts introduce you as a human; expertise posts introduce you as someone worth listening to on finance. The Martin Lewis post is your way in — it's ready to go.",
    june: "Month 2. The audience is warming up. The personal posts get a little more revealing, the expertise posts get sharper. The door-slammer post (Week 5) is a bold one — save it for when the habit is solid.",
    july: "Month 3. By now the rhythm is established. Go deeper and bolder — the personal posts tackle the stories you haven't shared publicly yet. The expertise posts push into sharper, more opinionated territory.",
    august: "Ideas from your first batch of conversation notes — fed back after a prospect sales call on 30 April 2026. These came directly from what the prospect said, thought, and objected to. That's why they'll resonate.",
  };

  return (
    <div>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>3-Month Content Strategy</p>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
      <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 20px" }}>2 posts a week — one mid-week personal post, one Friday expertise post. Each card has the hook, the structure for the post (with prompts woven in), and a CTA.</p>

      {/* Content workflow strategy */}
      <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "24px 28px", marginBottom: 24 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Updated Session 6 · 19 May 2026</p>
        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 16px" }}>How to Write a Post</p>
        <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 20px" }}>Pick a card, do a brain dump into Claude, and let it turn your words into a post. We did this together on the call and had a full draft in 14 minutes. That's the whole process.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          {[
            { step: "1", label: "Pick a card from this dashboard", desc: "Open it, read the hook and the prompts so you know roughly what you're covering." },
            { step: "2", label: "Copy the card into Claude and do a brain dump", desc: "Paste the card into a new Claude chat. Then either hit the microphone icon and talk through the prompts out loud, or just type your answers underneath each one. Don't write a post. Just answer the questions in your own words, as you'd say them out loud. Delete the prompts as you go. Rough is fine. This is the brain dump." },
            { step: "3", label: "Ask Claude to turn it into a LinkedIn post", desc: "Once you've answered the prompts, tell Claude: 'Turn this into a LinkedIn post in my voice. Each sentence on its own line. No em-dashes. Try to keep my words as much as possible.' Claude can shape and tighten it, but your words stay your words. One pass only. Don't ask it to revise." },
            { step: "4", label: "Paste into LinkedIn and post it", desc: "Read it once. If something sounds wrong, change it yourself. Add a dot-dot-dot here and there if you want. If you've been in LinkedIn more than 10 minutes, you're done. Post it." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: ASB_COLOR, color: "#fff", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{item.step}</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 3px" }}>{item.label}</p>
                <p style={{ fontSize: "0.84rem", color: "#6b6860", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fdf4e8", border: "1.5px solid #f5d89e", borderRadius: 6, padding: "14px 18px" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#92400E", margin: "0 0 8px" }}>Worth saying clearly</p>
          <p style={{ fontSize: "0.86rem", color: "#5C3A0E", margin: 0, lineHeight: 1.7 }}>Writing these posts isn't wasted time. It's clarity and reps for client conversations. Every post you write is you getting better at explaining what you do, why it matters, and who it's for. You're ingraining what you know.</p>
        </div>
      </div>

      {/* Content strategy evolution note */}
      <div style={{ background: "#f9f8f6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Session 6 · Why Your Content Is Changing</p>
        <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>Finance Simplified isn't the frame anymore</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>The posts you were writing were useful — but they were explaining finance. The shift now is to stop telling people how finance works and start showing them what's at stake when they don't have it sorted.</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>The old frame said: here's the thing, here's how it works, here's what to do. The new frame says: here's the problem, here's what it's costing you, here's the door.</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>Don't give the solution in the post. Show the cost of the problem, then invite them in. That's where the CTAs come from — "if this sounds familiar, drop me a message."</p>
      </div>

      {/* Hooks AI concern note */}
      <div style={{ background: "#f9f8f6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 24px", marginBottom: 24 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Session 6 · On Hooks Sounding AI-Written</p>
        <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>Some of the "it's not X, it's Y" hooks can feel a bit generated</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: "0 0 10px" }}>You raised this in our last session. You're right that the contrarian structure — "it's not about X, it's about Y" — is a pattern that AI overuses. If a hook feels like that when you read it, there's a simple fix.</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.75, margin: 0 }}>Add "But" and put it on its own line. So instead of <em>"It's not about the numbers. It's about what they mean."</em> — write it as <em>"It's not about the numbers.</em><br /><em>But what they mean? That's the part most owners have never had explained to them."</em> One word and a line break. That's usually enough to make it sound like a person.</p>
      </div>

      {/* Month sub-tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {months.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveMonth(m.id)}
            style={{
              padding: "8px 18px", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
              border: `1px solid ${activeMonth === m.id ? ASB_COLOR : "#E0DBD3"}`,
              background: activeMonth === m.id ? ASB_COLOR : "#fff",
              color: activeMonth === m.id ? "#fff" : "#7A746E",
              transition: "all 0.15s ease",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "0.84rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 20px" }}>{descriptions[activeMonth]}</p>

      {ideas.map(idea => (
        <AsbIdeaCard key={idea.id} idea={idea} slug={slug} />
      ))}

      <CommentBox clientName="Andy Scott Barrett" tabName="Content Ideas" slug={slug} />
    </div>
  );
}
