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
const ASB_NEXT_MOVE = "Post the discounting post this week — 'Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even.' It's on the dashboard, it's ready. Set the 30-minute timer and go. Then: implement time blocking this week — client calls Tue/Wed/Thu only, content and admin Mon/Fri. One structural change that makes everything else easier.";

const asbTodos = [
  { id: "s4-1", text: "Post the discounting post this week — 'Finance Simplified: Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even.' It's in Content Ideas, ready to go. 30-minute timer.", owner: "Andy", tabLink: { label: "See Content Ideas", tab: "content" } },
  { id: "s4-2", text: "Implement diary blocking: client calls Tuesday, Wednesday, Thursday only. Block Monday and Friday for admin, BD, content, follow-ups.", owner: "Andy" },
  { id: "s4-3", text: "Tighten your Outlook calendar — block out client call slots on Tue/Wed/Thu only. When sending meeting invites, offer one or two fixed time windows rather than open availability.", owner: "Andy" },
  { id: "s4-4", text: "Use the hard stop technique on all calls from now — announce at the start: 'I've got a hard stop at X.' Not rude. Makes both parties conscious of time.", owner: "Andy" },
  { id: "s4-5", text: "After every prospect call, networking session or client meeting: write down 3–4 challenges, pain points, or misconceptions that came up. WhatsApp them to Ben to turn into content ideas.", owner: "Andy", tabLink: { label: "See Ben's Recommendations", tab: "recs" } },
  { id: "s4-6", text: "Follow up with the strategy woman from networking — she mentioned doing webinars together. Neither of you followed up. Get back in touch.", owner: "Andy" },
  { id: "s4-7", text: "Read Jo's 'Making the Sale' document before your next prospect call.", owner: "Andy" },
  { id: "s4-8", text: "Use Ben's prospect call question framework for your next sales conversation — it's in Ben's Recommendations.", owner: "Andy", tabLink: { label: "See Prospect Call Framework", tab: "recs" } },
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
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Ascott Financial Direction · Session 4 of 6</p>
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
            <NextMoveBox move={ASB_NEXT_MOVE} accentColor={ASB_COLOR} clientName="Andy Scott Barrett" sessionLabel="Session 4 · 30 April 2026" animateIn />

            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: ASB_COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>4</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 4px" }}>Session 4 — 30 April 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#3a6048", margin: 0, lineHeight: 1.6 }}>Content cadence settled at 2 posts/week (one expertise, one personal). Transition to dashboard ideas for Friday Finance posts — discounting post lined up next. Bank balance post went out — bookkeeper/accountant/FD explanation landing well at networking, generating a warm referral. Pipeline: aerospace lead dead, startup re-activating, main client ongoing. Time management framework agreed — diary blocking, Outlook constraints, hard stops on calls. Prospect call question framework added to dashboard. Content-from-conversations workflow introduced — Andy to send Ben notes after calls. Next session: week of 14 May 2026.</p>
              </div>
            </div>
            <div style={{ background: "#f5f3f0", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
              <div style={{ width: 36, height: 36, background: "#9CA3AF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>3</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3D3935", margin: "0 0 4px" }}>Session 3 — 15 April 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#6b6860", margin: 0, lineHeight: 1.6 }}>Profile finalised. New headline confirmed ("I turn financial data into decisions — the bit your accountant isn't there to do"). Banner decided: decision-focused option, flipped order. About section structure agreed and compacted. Networking talk debriefed — used as content angle source. Pipeline updates: aerospace East Midlands prospect in play, Manchester client returning, email-only prospect correctly left, startup re-activating. Content workflow discussion — Claude + dashboard cards + 30-minute posting timer.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "4 of 6", sub: "Next: w/c 14 May 2026" },
                { label: "Headline", value: "✓ Live", sub: "On LinkedIn" },
                { label: "About section", value: "✓ Live", sub: "On LinkedIn" },
                { label: "Posts out", value: "2 posted", sub: "Martin Lewis + bank balance" },
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
                  label: "Understand their offer and how they work",
                  desc: "Only once context is clear — understand their commercial model before surfacing problems.",
                  questions: [
                    "How do you typically work with a client, and what does that look like in practice?",
                    "Do you feel like you have a clear picture of which parts of the business are most profitable?",
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
  questions: string;
  cta: string;
  drafted?: boolean;
};

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
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 12, borderTop: "1px solid #E0DBD3" }}>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 4px" }}>🪝 The Hook</p>
            <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{idea.hook}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7A746E", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 4px" }}>🧭 Direction</p>
            <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{idea.direction}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 4px" }}>❓ Questions first</p>
            <p style={{ fontSize: "0.85rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>{idea.questions}</p>
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
  { id: "may-1", week: "Week 1 · Mid-week", type: "Personal", bold: "2/5", title: "There Were References to Martin Lewis in My Wedding Speech", hook: "Apparently I've always been this way. I didn't choose finance because of a career plan. It was just always the thing I was interested in — probably to the mild irritation of people around me.", direction: "A warm, light, self-deprecating post. The Martin Lewis wedding speech reference is the hook — use it. Keep it human and slightly funny. This is an introduction post for people who don't know you yet. End on why that lifelong interest in money and numbers translates into something genuinely useful for business owners — not just knowing the theory, but caring about it.", questions: "What's the earliest memory you have of being interested in money? What did the best man's speech actually say? How has that trait shown up in ways that weren't always useful?", cta: '"Are you someone who naturally gets into the numbers — or do you do everything you can to avoid them?"', drafted: true },
  { id: "may-2", week: "Week 1 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: The Money's There. But Is It Actually Yours?", hook: "The bank balance looks healthy. You feel okay. But there's a VAT bill coming, corporation tax due in a few months, and a supplier invoice you'd half-forgotten about. That money in your account isn't all yours.", direction: "The hidden claims on your bank balance — HMRC, committed supplier costs, pre-sold revenue not yet delivered. A simple worked example. No jargon. End on what to do about it.", questions: "What are the most common hidden claims on cash that catch owners out? What's the simplest way to work out what you can actually spend? Have you seen someone spend tax money?", cta: '"Before you make your next big spend — do you know what\'s already committed from that balance?"' },
  { id: "may-3", week: "Week 2 · Mid-week", type: "Personal", bold: "3/5", title: "My Boss Told Me My Job Was Safe. I Remember Thinking: That's Not Good News.", hook: "For years I'd told myself 40 was the number. Not as a wish. As a plan. When my boss called me in and told me my job was safe, I sat there thinking: that's not the news I wanted.", direction: "The deliberate exit at 40 — not a redundancy, not a crisis, a decision that had been forming for years. The detail that makes this post: last day was exactly 20 years to the day from day one. Don't make it inspirational. Make it honest.", questions: "When did you first know 40 was the number? What had been stopping you before? What did the last morning feel like? What do you know now that you wish you'd known?", cta: '"Is there something you already know the answer to — but haven\'t done anything about yet?"' },
  { id: "may-4", week: "Week 2 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even", hook: "Offering a 10% discount feels like a small thing. On a low-margin product or service, recovering that in extra volume can require selling 200% more than you were before. All you've done is made yourself busier for less money.", direction: "From your networking talk — one of the sharpest, most counterintuitive insights in your toolkit. Walk through a simple worked example: a business with 20% gross margin discounts 10% — show what happens to the volume required. Acknowledge discounting is sometimes right — but it should be a considered decision, not a default.", questions: "What gross margin % to use for the example? What do owners say when you show them this maths? When is discounting actually the right call?", cta: '"Next time a customer asks for a discount — do you know what you\'d need to sell more of to make up for it?"' },
  { id: "may-5", week: "Week 3 · Mid-week", type: "Personal", bold: "2/5", title: "They Sent Me to Beijing at 25", hook: "I was 25. My employer sent me to Beijing for a year. I knew maybe 20 words of Mandarin. The finance operation I'd been sent to sort out was, to put it politely, held together with goodwill and optimism.", direction: "Landing somewhere unfamiliar, finding a mess, building structure from scratch in a place where you didn't speak the language. The connection to now: most SME finance operations look a bit like that Beijing office. The thing you came away with: confidence that you can turn your hand to things.", questions: "What did it look like when you arrived — the actual state of the operation? What was the first thing you changed? How did you earn the local team's trust? What did you come back with that you didn't go with?", cta: '"Most of the businesses I work with have never had anyone look properly at their finances. When did you last take a proper look at yours?"' },
  { id: "may-6", week: "Week 3 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: One of Your Products Is Carrying the Rest. Do You Know Which One?", hook: "Overall, the business looks profitable. But break it down by product or service and a different picture appears. One is doing the heavy lifting. A couple are barely covering their costs. And one might actually be losing money.", direction: "Separate from the break-even concept — this is about diagnosis and what you do with the information. Use the current client example (anonymised) who thought they knew their gross margin but didn't. You can use the Lego parallel here.", questions: "What's the most common reaction when you show an owner the product-level breakdown for the first time? What do businesses typically do with this? Are there legitimate reasons to keep a loss-making product?", cta: '"Do you know which of your products or services is your most profitable — not the one that sells the most, but the one that actually makes you the most money?"' },
  { id: "may-7", week: "Week 4 · Mid-week", type: "Personal", bold: "2/5", title: "She Could Finally Sleep", hook: "She ran a good business. Investors kept asking questions about cash flow. She knew the answers — she just couldn't get to them fast enough, and it was grinding her down.", direction: "A client story post — told as a moment, not a case study. Once cash planning was sorted and she had clear answers ready, she said she wasn't on her own anymore — and could sleep better. Keep her anonymous. The transformation isn't the spreadsheet — it's the weight that lifted.", questions: "What was the early atmosphere like — stressed, resigned, exhausted? What was the first thing that changed once planning was in place? What did 'sleeping better' actually look like in her day-to-day?", cta: '"Financial pressure is a weight most business owners carry alone. You don\'t have to."' },
  { id: "may-8", week: "Week 4 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: What Break-Even Actually Means — and Why Most People Get It Wrong", hook: "Break-even sounds simple. In practice, most business owners either don't know theirs, or know a number that doesn't account for everything it should.", direction: "The break-even concept from your networking talk — walked through clearly with an example. Not just the formula, but what the number tells you about pricing decisions, fixed cost choices, and growth plans. The punchline: most business owners making growth decisions don't have this number, and they should.", questions: "What's the most common misunderstanding about break-even you see? What's the simplest way to show it? What decisions change once someone knows their real break-even point?", cta: '"Do you know your break-even point — and does it account for your own time?"' },
];

const asbJuneIdeas: AsbIdea[] = [
  { id: "jun-1", week: "Week 5 · Mid-week", type: "Personal", bold: "4/5", title: "Someone Slammed the Door. I Was Just the Messenger.", hook: "I once presented numbers that a room full of senior people really didn't want to hear. One of them slammed his fist on the desk and walked out. The numbers were still right.", direction: "Set the scene — a high-stakes presentation, a product the room was heavily invested in, numbers that said it wasn't viable. Keep all identifying details out. The point: the most useful thing an adviser can do is give you the honest picture, even when it's not what you want to hear. Especially then. That experience shaped how you work with clients today — you're not there to validate decisions people have already made. Tie it to the SME context: how often do business owners avoid looking at numbers because they're worried about what they might find?", questions: "What was the atmosphere in the room before it went wrong? How did you hold your ground — what was going through your head? Has there been a moment like this with a client, where you had to say something uncomfortable? What happened as a result?", cta: '"Has anyone ever told you something about your business you didn\'t want to hear — but that turned out to be exactly what you needed?"' },
  { id: "jun-2", week: "Week 5 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Three Questions Every Business Owner Should Be Able to Answer", hook: "Three questions. You don't need to answer them out loud. Just sit with them honestly for a moment.", direction: "These three came directly from the close of your networking talk and they're strong enough to anchor a post on their own. No preamble needed — just the three questions, then your honest framing of what they reveal. 1) When you're making a big decision, do you go with gut feel or look at what the numbers are telling you? 2) Do you know which of your products or services is most profitable? 3) Do you know what your cash position will be in three months — and how much of that will be yours? End with: most business owners who can't answer these aren't failing. They just haven't had anyone help them look.", questions: "What proportion of owners you meet can genuinely answer all three? What's usually the one that stumps people most? What changes once someone can answer all three?", cta: '"Which of the three is your honest answer: \'yes\', \'not sure\', or \'I\'d rather not think about it\'?"' },
  { id: "jun-3", week: "Week 6 · Mid-week", type: "Personal", bold: "2/5", title: "I'm Running My First Half Marathon. I'm Not Fast. That's Not the Point.", hook: "I'm training for my first half marathon. My pace is best described as determined. The goal isn't to impress anyone — it's to finish, and to be faster than I was when I started.", direction: "A light, warm, relatable post about training for something you're not naturally built for. Last year you ran your first 10k in 17 years — faster than you managed at 23. This year it's a half marathon. The connection to your work is subtle but real: you measure progress, adjust the plan, and keep going even when the pace is slow. Don't labour the analogy — let it land on its own.", questions: "What made you decide on the half marathon this year? What does training currently look like — what are you running, how often, what's hard about it? What do you listen to when you run? What does finishing feel like as a goal compared to racing to win?", cta: '"Are you working towards something right now that has nothing to do with business? What is it?"' },
  { id: "jun-4", week: "Week 6 · Friday", type: "Expertise", bold: "1/5", title: "Finance Simplified: How to Price Something You Actually Make Money From", hook: "A lot of businesses set prices based on what feels right, what competitors charge, or what they think the market will bear. Without knowing what it actually costs to deliver the product or service, all of those approaches involve some guesswork.", direction: "This came directly from your networking talk and your own client experience with pricing too low because costs weren't properly understood. The concept of 'defendable pricing' is central here — if you don't know your costs, you can't hold your price in a negotiation with any confidence. Walk through what it takes to properly cost a product or service, including the things people routinely miss: their own time, indirect costs, delivery and fulfilment.", questions: "What are the most commonly missed costs when businesses price their services? What's the most striking example you've seen of a business pricing far below what they could charge once they understood their costs? What does 'defendable pricing' actually feel like in a client conversation?", cta: '"Do you know the full cost of delivering your most popular product or service — or is there guesswork in there?"' },
  { id: "jun-5", week: "Week 7 · Mid-week", type: "Personal", bold: "3/5", title: "Leaving the Corporate World Was Harder Than I Expected. And Easier.", hook: "Everyone told me leaving a stable, well-paid corporate career to start something from scratch was a big risk. They weren't wrong. They also weren't fully right.", direction: "The honest version of the transition post — not a 'best decision I ever made' highlight reel. What was genuinely hard about the first few months (the quiet, the uncertainty, the lack of structure you didn't know you relied on)? What surprised you — both in the difficult direction and the unexpected freedom? Use your own words: 'It was either go back into all of that and I don't want to do that to myself, or coast. I didn't feel passionate about that either. Or come and do what I'm doing now. So I took the leap.'", questions: "What was the hardest moment in the first few months? What did you miss about corporate that you didn't expect to? What's better now in a way you couldn't have predicted? What would you tell yourself if you could go back to the day you handed in your notice?", cta: '"If you\'ve made a big leap — professionally or personally — what\'s the one thing nobody warned you about?"' },
  { id: "jun-6", week: "Week 7 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Your Accountant Is Doing Their Job. That's the Problem.", hook: "The accounts arrived. You glanced at them. You carried on. That's not a problem with you — or your accountant. It's a gap nobody told you existed.", direction: "Your core positioning post. Write it without any shade on accountants — they're doing exactly what they're supposed to. The gap isn't their fault. Compliance and forward-looking strategy are two genuinely different roles. Most SMEs only have one covered. Use the bookkeeper → accountant → FD ladder you explained in your networking talk — it's the clearest version of this you've articulated publicly. A specific detail worth including, from a real prospect conversation: some owners have an accountant who sends the annual accounts and then goes completely quiet until next year. No proactive contact. No 'have you thought about X?' Nothing. That's not a criticism — it's just not what a fractional FD does. End on what the FD role actually looks like day-to-day in an SME context, so the reader can picture it.", questions: "What's the most common thing business owners say about their accountant early in a conversation with you? What does a management accounts pack actually look like to someone without a finance background? What's the first question you ask that their accountant has never asked? Have you had an owner whose accountant had basically gone quiet — and what had that cost them?", cta: '"When did you last look at your numbers and actually know what to do next?"' },
  { id: "jun-7", week: "Week 8 · Mid-week", type: "Personal", bold: "1/5", title: "We've Been Fostering Labradors. This Is What I've Learned.", hook: "My wife and I have been fostering Labradors — looking after dogs waiting for their forever home. Every single one has been different. All of them have taught us something.", direction: "A warm, human post that shows a side of Andy most LinkedIn connections won't have seen. Don't try too hard to make a business point — let the story do the work. What has the fostering experience actually been like? The brief introductions, the different personalities, the moment when a dog goes to its permanent home. The connection to Andy's character (patience, staying calm under pressure, building trust through consistency) can be implicit rather than stated.", questions: "What made you start fostering? What does the handover moment feel like when a dog goes to its permanent home? Has fostering changed how you think about anything — relationships, patience, trust? Is there a particular dog that stands out?", cta: '"Does anyone else foster — or have you thought about it? Would love to hear other people\'s experiences."' },
  { id: "jun-8", week: "Week 8 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Growth Should Feel Exciting. If It Feels Risky, Here's Why.", hook: "A good opportunity comes along. Instead of feeling excited, it feels like a risk you're not sure you can take. That's not caution. That's what happens when you don't have the numbers to back up what your gut is telling you.", direction: "Clarity doesn't just improve financial decisions — it changes how growth feels. Without it, every opportunity is a gamble. With it, you can take a calculated risk — which is a different thing entirely. The post should help business owners recognise themselves in that feeling: not that they're risk-averse, but that they lack the information that makes risk feel manageable. There's a specific version of this worth including: growth that just happens without a plan behind it. Revenue goes up, headcount grows, commitments pile up — and at some point the owner looks around and realises they're not steering. That's not a success story, it's a warning sign with good numbers on top. End with what changes when you have it — decisions feel lighter, growth feels intentional rather than accidental.", questions: "Have you had a client who turned down a good opportunity because the numbers felt unclear — and what happened? Have you worked with someone whose growth was entirely accidental — what did that look like from the inside? What does 'a calculated risk' actually look like in practice when you're working with someone? What's the difference between cautious and uninformed?", cta: '"Think of the last opportunity you hesitated on. Was it genuine caution — or did you not have the numbers to back yourself?"' },
];

const asbJulyIdeas: AsbIdea[] = [
  { id: "jul-1", week: "Week 9 · Mid-week", type: "Personal", bold: "4/5", title: "I Woke Up One Morning and Everything Was Spinning", hook: "I woke up one morning and the room was spinning — like I'd had ten pints, except I hadn't. That was how my body told me something needed to change.", direction: "The vestibular migraine story — the stress-related health crisis during your Rolls-Royce years. This is 4/5 bold, but one of the most powerful posts available. The lesson isn't 'corporate life is toxic' — it's that pressure compounds silently, small habits make a significant difference, and paying attention to how you feel is as important as paying attention to your numbers. The parallel to what you see in business owners — carrying financial stress alone without realising the toll it takes — is implicit and real. Only write this when it feels right, not because the schedule says so.", questions: "What were the warning signs you missed before that morning? What was the recovery like — what actually changed? What habits made the biggest difference, and which surprised you? What do you notice now in other people that you didn't notice before?", cta: '"Has your body ever told you something your brain was refusing to hear?"' },
  { id: "jul-2", week: "Week 9 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: The Business Was Profitable. They Were Three Months From Running Out of Cash.", hook: "The business had profitable contracts. Revenue was growing. They'd never needed a cash flow forecast and had always been fine. Then they took on some bigger deals — with costs up front and payment at the end. Once we put a forecast in place, the picture changed.", direction: "The cash flow crisis story from your client work — a profitable business nearly ran out of cash within three months because of payment timing on larger contracts. Tell the story, keep the client fully anonymous, and land on the pay-off: they said it was worse than they'd thought — but they could sleep at night because they knew, and knew there was still time to act. A detail worth weaving in from a real prospect conversation: the owner hadn't even noticed a supplier hadn't invoiced them for several months. It felt like a good run of luck. It wasn't — it was a deferred liability. That's a vivid, relatable detail that reinforces the core point: what you can see in your bank account is not the whole picture.", questions: "What did the business look like from the outside when you first got involved? When did the forecast show what was coming? What exactly did they do to fix it — walk through the discount-for-early-payment solution simply. What did the owner actually say when they saw the numbers? Have you had an owner who mistook a quiet spell on invoices for good news?", cta: '"Do you have a forward-looking cash flow forecast — or just last month\'s accounts?"' },
  { id: "jul-3", week: "Week 10 · Mid-week", type: "Personal", bold: "2/5", title: '"I Wish I\'d Done This Sooner" — What Clients Actually Say', hook: "The thing clients say most often, once things are working: 'I wish I'd done this sooner.' Not 'that was useful' or 'glad we did that.' Specifically: sooner.", direction: "A reflection post on what 'sooner' actually means — the decisions that would have been better, the stress that could have been avoided, the time spent operating without visibility. Draw on the startup founder story: he could explain the business but couldn't articulate the financial story. Once he could, the decision was clear and game-changing. The emotional core of this post is constructive regret — the kind that makes people act now rather than wait.", questions: "What do clients typically mean when they say 'sooner'? How far back are they imagining? What's a concrete example of a decision that would have gone differently? What's the most common thing that stops people acting earlier?", cta: '"What\'s one thing in your business you\'ve been putting off — and what\'s actually stopping you?"' },
  { id: "jul-4", week: "Week 10 · Friday", type: "Expertise", bold: "1/5", title: "Finance Simplified: If You're Looking for Investment, Your Financial Story Needs to Match Your Business Story", hook: "Most founders can explain their business with real passion and conviction. The numbers are another matter. In an investor conversation, both need to be in lock step — and the financial story needs to hold up under questioning.", direction: "Draw on your power sentence about the founder preparing to raise investment — he could explain the business but couldn't articulate the financial story. After working together, he could hold his own in those conversations. This isn't about the mechanics of raising investment — it's about credibility. What does 'the financial story' actually mean in practice?", questions: "What are the most common financial questions investors ask that founders aren't prepared for? What did it look like before and after for the founder in your power sentence? What's the simplest version of 'financial story' that a pre-investment founder could build in a short time?", cta: '"If an investor asked you to walk them through the financial story of your business right now — how confident would you feel?"' },
  { id: "jul-5", week: "Week 11 · Mid-week", type: "Personal", bold: "2/5", title: "I've Been Learning Japanese for 400 Days in a Row. Here's What That's Taught Me.", hook: "I've been learning Japanese on Duolingo every day for over 400 days. I'm not fluent. I'm not even close. But I'm significantly better than I was 400 days ago.", direction: "A post about consistency, small daily habits, and what compounds over time — told through language learning. French A* at GCSE, Mandarin across two spells in Beijing, now Japanese. The connection to Andy's broader point about small habits (which he's deeply passionate about, and connects to his vestibular migraine recovery) can be made without it becoming a lecture. Keep it warm and slightly self-deprecating about the Japanese.", questions: "Why Japanese specifically? What has 400 days of daily practice actually taught you beyond the language itself? What's the moment where you noticed real progress? What habit in your life or business has compounded in a way you didn't expect?", cta: '"What\'s a habit you\'ve kept going that\'s quietly made a difference — in life or in business?"' },
  { id: "jul-6", week: "Week 11 · Friday", type: "Expertise", bold: "3/5", title: "Finance Simplified: \"I Can Just Use AI for My Financial Strategy.\" Can You, Though?", hook: "I've started to hear this one: 'Why would I need help with my financial strategy — I can just use AI?' It's a reasonable question. Here's my honest answer.", direction: "This is Andy's hot-take from his onboarding form, written almost verbatim. The argument: AI isn't the problem. The problem is using any tool without the ability to evaluate what it's producing. If you don't understand finance well enough to know when the AI output is wrong or incomplete, you won't know to question it. Write this in Andy's voice: not preachy, not dismissive of AI, just honest about where the real value sits.", questions: "Have you seen AI-generated financial output that looked plausible but was wrong in an important way? What's the role AI could genuinely play for SME owners — and where does it fall short? What would you say to someone who genuinely believes this objection?", cta: '"Have you tried using AI for financial decisions? What was useful and what didn\'t quite work?"' },
  { id: "jul-7", week: "Week 12 · Mid-week", type: "Personal", bold: "3/5", title: "The Question I Ask Every New Client (That Nobody's Ever Asked Them Before)", hook: "Early on with every new client, I ask one question. The reaction tells me almost everything I need to know — not just about their business, but about whether we'll work well together.", direction: "A post that's both personal (it reveals how Andy approaches client relationships) and expertise-adjacent (it shows the diagnostic instinct of someone who knows what to look for). The question itself — something like 'what are you getting from your accountant, and is it helping you run the business?' — is less important than the reaction. What does it look like when someone can't answer? This post closes the 3-month arc — by now the audience knows Andy, trusts his expertise, and this post invites them to imagine what that first conversation with him would actually be like.", questions: "What's the question — be specific? What are the different reactions you get and what do they tell you? What's the most surprising or memorable response you've ever received? What does it mean for the relationship when someone answers confidently vs. hesitates?", cta: '"How would you answer it?"' },
  { id: "jul-8", week: "Week 12 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Costly Mistakes Don't Announce Themselves. They Show Up Afterwards.", hook: "Work that looked profitable turns out to destroy margin. Costs are committed to that the business can't sustain. A hire is made too early. Usually you don't find out until it's too late to do much about it.", direction: "From your power sentences: 'When a business owner makes decisions on guesswork alone, costly mistakes often follow — and it's usually not known until it's too late.' This is a post about the cost of operating without visibility — told through real examples (anonymous). The tone isn't scary; it's matter-of-fact. These things happen. They happen less when someone is looking at the numbers. Use 2–3 concrete scenarios from your client experience. Finish on the positive: this isn't about being perfect, it's about having enough information to course-correct before things become serious.", questions: "What are the most common guesswork-driven mistakes you see? What's a real example where better information would have changed the decision? What's the earliest warning sign that a business is operating without sufficient financial visibility?", cta: '"What\'s the most expensive decision you\'ve made based on gut feel — and how did it turn out?"' },
];

const asbAugustIdeas: AsbIdea[] = [
  { id: "aug-1", week: "Week 13 · Mid-week", type: "Personal", bold: "3/5", title: "\"I'm Just Bad With Money.\" No. You're Not.", hook: "I hear this a lot. Usually within the first ten minutes of meeting someone. 'I'm just not a numbers person.' 'Finance has never been my thing.' 'I'm bad with money.' It's almost never true.", direction: "Address the self-limiting belief that stops right-fit clients from even considering getting help. The real issue isn't that they're bad with money — it's that nobody has ever helped them understand what their numbers mean and what to do next. There's a specific version of this worth naming: knowing the 'what' (the figures) but not the 'so what' (what they mean for the business). That gap isn't a character flaw. It's just a missing layer. Keep this warm and non-patronising — you're not telling people they're wrong, you're releasing them from a story they've been telling themselves. End on: the owners who say this are often the most coachable, because they're honest about what they don't know.", questions: "What do people usually mean when they say they're bad with money — is it numeracy, interpretation, or just anxiety? What's the most common thing that changes once someone understands their own numbers? Have you worked with someone who genuinely believed this about themselves — what shifted for them?", cta: '"Do you consider yourself a numbers person — or have you always left that to someone else?"' },
  { id: "aug-2", week: "Week 13 · Friday", type: "Expertise", bold: "3/5", title: "Finance Simplified: You Want to Sell the Business for £3 Million. What Does It Need to Look Like to Get There?", hook: "Most business owners I meet have a number in mind. A figure they'd take. An exit they're quietly working towards. Very few of them have mapped out what the business actually needs to look like financially to make that number realistic.", direction: "A post about the gap between ambition and financial planning — specifically the exit goal without a roadmap. This is commercially powerful because it speaks to aspirational owners, not just those in pain. The hook is a concrete version of the scenario from a real prospect conversation: the owner wants to sell for £x in a few years but has no plan for how today's numbers connect to that outcome. Walk through what it actually takes to build a business that's saleable at a target value: margin, revenue trajectory, clean financials, no owner-dependency. End on: the business you want to exit isn't built at the end — it's built now.", questions: "What's the most common gap between what owners think the business is worth and what it would actually sell for? What are the two or three financial levers that most affect exit value for an SME? What would you look at first if an owner said 'I want to sell in five years for £3 million'?", cta: '"Do you have a number in mind — and do you know what the business needs to look like to get there?"' },
  { id: "aug-3", week: "Week 14 · Mid-week", type: "Expertise", bold: "3/5", title: "Finance Simplified: \"I'm Not Ready Yet.\" What That's Usually Costing You.", hook: "The most common thing I hear at the end of a conversation that's gone well: 'I think this is exactly what I need — just not quite yet.'", direction: "Address the 'not ready yet' objection as a post — not as a sales tactic, but as a genuine observation about what waiting costs. The prospect is waiting for some internal uncertainty to resolve (a new hire to bed in, a contract to confirm, a decision to land) before taking action on the finances. But the uncertainty is usually a reason to get clarity sooner, not later. The framing: readiness is a feeling, not a fact. And the things people are waiting to resolve are often exactly the decisions that would benefit from financial input. Keep this non-pushy — you're not trying to rush anyone. You're reflecting back something real.", questions: "What's the most common 'not yet' reason you hear — and what's usually underneath it? What has waiting actually cost people you've worked with? Is there a version of 'not yet' that's actually legitimate — and how do you tell the difference?", cta: '"What are you waiting for — and is the waiting actually helping?"' },
  { id: "aug-4", week: "Week 14 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: \"I Need to Speak to My Business Partner.\" Great. Here's What to Tell Them.", hook: "A business owner finishes a conversation with me, says it all sounds good, and then: 'I just need to run it past my business partner.' Completely reasonable. I've been there. Here's the thing — if your business partner also doesn't know the numbers, the conversation you're about to have is the one you've both been avoiding.", direction: "The 'business partner' objection reframed as a positive. Two owners, neither of whom has proper financial visibility, now have to make a shared decision about getting it. That conversation is actually a version of the problem you'd be solving. Don't make this adversarial or clever — make it honest and slightly warm. The subtext: having a business partner doesn't make financial decisions easier. In some ways it makes them harder, because you need two people to see the same picture. That's exactly when an FD view becomes more valuable, not less.", questions: "Have you worked with businesses that have co-founders or business partners — what does financial decision-making look like in those relationships? What's usually the real concern behind 'I need to speak to my partner'? What would you say if someone asked you to explain the value proposition to their business partner in one sentence?", cta: '"If you have a business partner — do you both have a clear picture of the numbers? Or does one of you carry that more than the other?"' },
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
      <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 8px" }}>2 posts a week — one mid-week personal post, one Friday expertise post. Each card has the hook, direction, questions to answer before you write, and a CTA. Set the 30-minute timer and go.</p>
      <div style={{ background: "#fdf4e8", border: "1px solid #f5d89e", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
        <p style={{ fontSize: "0.83rem", color: "#92400E", margin: 0 }}><strong>The rule:</strong> If you're still editing after 30 minutes, it's probably good enough. Give it one last read and hit post.</p>
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
