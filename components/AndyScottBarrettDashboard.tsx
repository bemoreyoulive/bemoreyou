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
const ASB_NEXT_MOVE = "Write this week's post from whatever client work is in front of you right now, not the back catalogue. Voice note ideas the moment you come off a call. Then chase the community investment company decision, you've earned a clear yes or no.";

const asbTodos = [
  { id: "s8-1", text: "Write this week's post from the client work in front of you right now rather than the older cards. Anonymise it and get it out. The stuff at the top of your mind is always the fastest to write.", owner: "Andy", tabLink: { label: "See Content Ideas", tab: "content" } },
  { id: "s8-2", text: "Come off every sales call and voice note the content ideas straight away, before you move on to the next thing. A rough one-minute ramble into Claude or your phone is enough to capture it.", owner: "Andy" },
  { id: "s8-3", text: "Have a go at the objection-based posts. Start with 'we'll just see how that goes', it's the one you hear most, and the cards are ready in the new Objection-based section of Content Ideas.", owner: "Andy", tabLink: { label: "See Content Ideas", tab: "content" } },
  { id: "s8-4", text: "Buy an A3 or A2 whiteboard and use it for post visuals instead of AI graphics. Your own handwriting beats a generated image every time, and you can bring it onto client calls to explain things too.", owner: "Andy" },
  { id: "s8-5", text: "Get some photos of you actually working: laptop out, on a call, in a cafe. You work from wherever you like now and people should see that. Fold it into the photo session with George's dad.", owner: "Andy" },
  { id: "s8-6", text: "Follow up the community investment company prospect once she's spoken to her fellow directors, and keep the other warm leads moving to a clear yes or no.", owner: "Andy" },
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
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>

      {/* Nav */}
      <nav className="dash-nav" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(245,241,236,0.97)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "0 16px", display: "flex", alignItems: "stretch", gap: 0 }}>
        <div className="dash-nav-client" style={{ alignItems: "center", paddingRight: 32, borderRight: "1px solid #E0DBD3", marginRight: 8, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 3, background: ASB_COLOR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>ASB</div>
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>Andy Scott Barrett</p>
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Ascott Financial Direction · Monthly sessions</p>
            </div>
          </div>
        </div>
        <div className="dash-tabs-scroll" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
          {asbTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", padding: "0 14px", fontSize: "0.75rem", fontWeight: 500, color: activeTab === tab.id ? ASB_COLOR : "#9CA3AF", cursor: "pointer", border: "none", background: "none", borderBottom: activeTab === tab.id ? `2px solid ${ASB_COLOR}` : "2px solid transparent", whiteSpace: "nowrap", height: 44, transition: "color 0.15s" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="dash-page" style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ── HOME ── */}
        <div style={{ display: activeTab === "home" ? "block" : "none" }}>
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={ASB_COLOR} />
            <NextMoveBox move={ASB_NEXT_MOVE} accentColor={ASB_COLOR} clientName="Andy Scott Barrett" sessionLabel="Session 8 · 16 July 2026" cadence="month" animateIn />

            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: ASB_COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>8</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 4px" }}>Session 8 — 16 July 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#3a6048", margin: 0, lineHeight: 1.6 }}>A busy few weeks of heavy client delivery, and the structure held: client work through the middle of the week, business development on Mondays and Fridays. The bigger shift is on sales calls. A prospect said she didn't think she needed you, and instead of taking that at face value you dug deeper, found the real problem and reshaped the offer live on the call. That is a different Andy to three months ago, and the confidence walking into rooms is showing. New direction on content: write from the client work in front of you this week, and turn your three recurring objections into posts. The whiteboard replaces AI graphics for visuals. Next session lands mid-August, date to follow.</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Coaching", value: "Monthly", sub: "Rolling · next session mid-August, date to follow" },
                { label: "Headline", value: "✓ Live", sub: "On LinkedIn" },
                { label: "About section", value: "✓ Live", sub: "On LinkedIn" },
                { label: "Posts out", value: "Weekly", sub: "One a week since January with just one missed. The working on the business post landed well, this week's is in progress" },
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

            {/* Closing lines to try — funny & memorable */}
            <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 6, padding: "24px 28px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Closing Lines To Try — Funny & Memorable</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 16px" }}>A line to land at the end of a talk, intro or post — the bit people remember and repeat. Mine was "I put you in hospital faster than a heavyweight boxer." Pick a favourite, try it out loud, see which one gets the smile.</p>
              {[
                "I spent 20 years stress-testing jet engines at Rolls-Royce, so your cash flow forecast doesn't keep me up at night. It might be keeping you up though, which is roughly where I come in.",
                "If your financial plan is a gut feeling and a quick look at the bank balance on a Monday morning, we should probably have a chat.",
                "I've supported Wolves for 30 years, so I've had plenty of practice staying calm while the numbers fall apart. Turns out it's a transferable skill.",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < 2 ? "1px solid #E0DBD3" : "none" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: ASB_COLOR, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                  <p style={{ fontSize: "0.92rem", color: "#1C1C1C", lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>"{line}"</p>
                </div>
              ))}
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
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 20px" }}>✓ Updated — Session 7 · 19 June 2026</p>
              <div style={{ fontSize: "0.97rem", lineHeight: 2, color: "#3D3935", display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ margin: 0 }}>Does this sound familiar?</p>
                <p style={{ margin: 0 }}>Your accountant sends the accounts… you glance at the numbers.</p>
                <p style={{ margin: 0 }}>You're not really sure what to do with them. So you carry on, making the big calls on gut feel and hoping for the best.</p>
                <p style={{ margin: 0 }}>You're not doing anything wrong. Your accountant is doing exactly what they're supposed to do.</p>
                <p style={{ margin: 0 }}>The problem is, reporting what happened and keeping you compliant isn't the same as helping you run the business.</p>
                <p style={{ margin: 0, marginTop: 8 }}>I work with a small number of clients at a time that fall into two groups:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 4 }}>
                  <p style={{ margin: 0 }}>👉 Small business owners who need a financial partner but don't need an in-house finance director that costs a fortune.</p>
                  <p style={{ margin: 0 }}>👉 More established start-ups preparing for funding, or UK SME owners turning over between £500k and £10m, who have their accounting covered but want someone to help them actually use the numbers to grow the business.</p>
                </div>
                <p style={{ margin: 0, marginTop: 8 }}>👋 I'm Andy, a Fractional Finance Director for growing UK SMEs, which in plain English means I'm the person who takes your financial data and turns it into actual decisions around:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 4 }}>
                  {["Growth plans", "Pricing", "Cash flow", "Where to invest and when to hire", "Launching new products", "Funding readiness"].map((item, i) => (
                    <p key={i} style={{ margin: 0 }}>👉 {item}</p>
                  ))}
                </div>
                <p style={{ margin: 0, marginTop: 8 }}>I spent 20 years at Rolls-Royce stress-testing business cases on jet engines and working directly with engineers, sales directors and management teams, not in the boardroom. I made the decision to leave at 40 to do work where you can really feel the difference it makes.</p>
                <p style={{ margin: 0, marginTop: 8 }}>Some are at a specific moment: a growth decision, an investor conversation, a cash flow worry that won't go away. Others have just outgrown what feels like winging it. Either way, the gap is the same.</p>
                <p style={{ margin: 0, marginTop: 8 }}>Once we're working together, my clients tell me they:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingLeft: 4 }}>
                  <p style={{ margin: 0 }}>👉 Make the big calls with confidence, knowing the financial impact before they commit, so gut feel and 2am doubt turn into a decision they can actually sleep on.</p>
                  <p style={{ margin: 0 }}>👉 Get their time back, because once it's clear where the money is really made, they stop pouring hours into the work that was losing it.</p>
                  <p style={{ margin: 0 }}>👉 Can finally pay themselves properly, instead of propping up a business that takes more than it gives back.</p>
                  <p style={{ margin: 0 }}>👉 Stop feeling alone with it, with someone in their corner to think the big decisions through with, rather than winging it on their own.</p>
                </div>
                <p style={{ margin: 0, marginTop: 8 }}>I'm based in Derby in the East Midlands. Away from the numbers, I love travel and languages. Having learned Mandarin Chinese to conversational level whilst living in China, I'm now giving French and Japanese a good go on Duolingo. I'm a runner and a dog lover too.</p>
                <p style={{ margin: 0, marginTop: 8 }}>If any of this sounds like someone you'd want in your corner, without the cost or commitment of an in-house FD or CFO, I'm always up for a straightforward conversation to see if we're a good fit.</p>
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
                  <p style={{ fontSize: "0.82rem", color: "#6b6860", lineHeight: 1.45, margin: 0 }}>{msg.body}</p>
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
              <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 14px" }}>Every prospect call, networking session, and client conversation is a content tap. You're already hearing the objections, misconceptions, and questions that your audience has — you just haven't been converting them into posts yet.</p>
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
                    <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{r.body}</p>
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
  objection?: boolean;
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
          {idea.objection && <span style={{ background: "#fdf4e8", color: "#92400E", border: "1px solid #f5d89e", borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", letterSpacing: "0.05em", textTransform: "uppercase" as const, flexShrink: 0 }}>Objection-based</span>}
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

const asbJuneIdeas: AsbIdea[] = [
  { id: "jun-1", week: "Week 5 · Mid-week", type: "Personal", bold: "4/5", title: "Someone Slammed the Door. I Was Just the Messenger.", hook: "Option 1: Years ago I presented some numbers to a room of very senior people, and they were not the numbers anyone wanted to hear. One of them slammed his fist on the desk and walked out. Option 2: I once had to tell a room full of senior people something they really didn't want to hear. Looking back, it's probably the most useful thing I've ever done in a meeting.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jun-2", week: "Week 5 · Friday", type: "Expertise", bold: "2/5", title: "Three Questions Every Business Owner Should Be Able to Answer", hook: "Option 1: There are three questions I think every business owner should be able to answer. You don't have to say them out loud, just be honest with yourself. Option 2: I close most of my networking talks with the same three questions, and the room usually goes quiet.", direction: `Your second line (if you opened with Option 1):
"Just answer them honestly in your head, that's all it takes."

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
  { id: "jun-3", week: "Week 6 · Mid-week", type: "Personal", bold: "2/5", title: "I'm Running My First Half Marathon. I'm Not Fast. That's Not the Point.", hook: "Option 1: I'm training for my first half marathon, and my pace is best described as determined rather than fast. Option 2: Last year I ran a 10k quicker than I did at 23, which I genuinely didn't see coming. This year I've signed up for a half marathon.", direction: `Your second line (if you opened with Option 1):
"I'm not built for distance running. That's been very clear for a while."

Your second line (if you opened with Option 2):
"I never thought I'd say that. The plan was always to be more sensible as I got older. Apparently the plan changed."

(Then add 2 or 3 sentences here on what made you sign up for the half marathon this year, and what training currently looks like. How often you run, what's hard about it, what you listen to. Specific details land better than general ones.)

Your next line:
"The goal is just to finish, not to race anyone."

(Then add 2 or 3 sentences here on what that feels like. The kind of progress you don't really notice from one week to the next, but you do from one year to the next. Don't labour the parallel to business, let it land on its own.)

Your closing line before the CTA:
"Slow progress is still progress."

(Then add 1 sentence here, if you want one. Otherwise leave it there and let it breathe.)`, cta: '"Are you working towards something right now that has nothing to do with business? What is it?"' },
  { id: "jun-4", week: "Week 6 · Friday", type: "Expertise", bold: "1/5", title: "How to Price Something You Actually Make Money From", hook: "Option 1: Most businesses set their prices on some mix of gut feel, what their competitors charge, and what they reckon the market will stand. The trouble is, none of that works if you don't actually know your costs. Option 2: If you can't tell me what your most popular product or service costs you to deliver, then neither of us really knows whether you're making money on it.", direction: `Your second line (if you opened with Option 1):
"All three of those are legitimate inputs. None of them work without the cost foundation underneath."

Your second line (if you opened with Option 2):
"If you don't know your costs, you can't hold your price in a negotiation. You're winging it and hoping the other person doesn't push back."

(Then add 2 or 3 sentences here on the costs that owners routinely miss. Their own time. Indirect costs. Fulfilment. In your experience, which one is the most common culprit.)

Your next line, only if you've got a real example:

(If you've got a real example, put it here, kept anonymous, and just one is plenty. Maybe someone whose headline product turned out to be making them next to nothing once you looked properly: what they thought the margin was, what it really was, and what changed once they could see it. If you haven't got a real one, don't invent it, just explain how this tends to go.)

Your closing line before the CTA:
"Defendable pricing means you can say no without flinching."

(Then add 1 or 2 sentences here on what that actually looks like in a real conversation with a customer. The owner who can hold their price because they know exactly what they're being asked to give up.)`, cta: '"If pricing feels more like guesswork than a decision, that\'s worth a conversation. Drop me a message."' },
  { id: "jun-5", week: "Week 7 · Mid-week", type: "Personal", bold: "3/5", title: "Leaving the Corporate World Was Harder Than I Expected. And Easier.", hook: "Option 1: When I left a stable corporate career, plenty of people told me what a big risk I was taking. They had a point, but it wasn't the whole story. Option 2: I didn't leave Rolls-Royce because I was brave. I left because staying had started to feel worse than going.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jun-6", week: "Week 7 · Friday", type: "Expertise", bold: "2/5", title: "Your Accountant Is Doing Their Job. That's the Problem.", hook: "Option 1: Your accountant is doing exactly what they're meant to do. Oddly enough, that's the problem. Option 2: The accounts come in, you have a quick glance, and you carry on as you were. That's not a failing on your part, it's a gap nobody ever told you existed.", direction: `Your second line (if you opened with Option 1):
"They're keeping you compliant. They're reporting what's already happened. That's their job and they do it well."

Your second line (if you opened with Option 2):
"It's not that you don't care. It's that nobody handed you the bit that would have told you what to actually do with them."

(Then add 2 or 3 sentences here on what owners typically say about their accountant early in a conversation with you. No shade on accountants, the gap isn't their fault. Compliance and forward-looking strategy are genuinely different roles.)

Your next line:
"There's a ladder most businesses climb, from bookkeeper to accountant to finance director."

(Then add 3 or 4 sentences here walking through the ladder. What each role does and where the gap shows up. The accountant who goes quiet for 11 months between filings is worth including, not a criticism, just not the same job as sitting alongside you while you make decisions.)

Your closing line before the CTA:
"The FD role isn't tax returns or audit. It's the person looking forward with you, not just reporting on what's already happened."

(Then add 1 or 2 sentences here on what that actually looks like in practice. Sitting alongside an owner. Asking the questions their accountant has never asked them.)`, cta: '"If that gap sounds familiar, drop me a message. I\'ll buy you a coffee."' },
  { id: "jun-7", week: "Week 8 · Mid-week", type: "Personal", bold: "1/5", title: "We've Been Fostering Labradors. This Is What I've Learned.", hook: "Option 1: My wife and I have been fostering Labradors for a while now, and every single one has turned up completely different from the last. Option 2: We've been looking after dogs while they wait for their forever home. I didn't expect it to teach me much, but it has.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jun-8", week: "Week 8 · Friday", type: "Expertise", bold: "2/5", title: "Growth Should Feel Exciting. If It Feels Risky, Here's Why.", hook: "Option 1: Growth should feel exciting. When it feels frightening instead, that's usually because the numbers aren't clear, not because you've lost your nerve. Option 2: Some businesses grow quickly without really noticing. The revenue climbs, the team climbs, the stress climbs, and there's no real plan underneath any of it.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jul-1", week: "Week 9 · Mid-week", type: "Personal", bold: "4/5", title: "I Woke Up One Morning and Everything Was Spinning", hook: "Option 1: I woke up one morning and the whole room was spinning, and I hadn't touched a drop the night before. That was my body telling me something had to change. Option 2: Pressure has a way of building up slowly without you noticing, until one morning it finally makes itself known.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jul-2", week: "Week 9 · Friday", type: "Expertise", bold: "2/5", title: "The Business Was Profitable. They Were Three Months From Running Out of Cash.", hook: "Option 1: The business was profitable and still only three months away from running out of cash. Those two things sit together more often than you'd think. Option 2: A supplier hadn't invoiced them in four months, and the owner had put it down to a good run of luck. It turned out to be anything but.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jul-3", week: "Week 10 · Mid-week", type: "Personal", bold: "2/5", title: '"I Wish I\'d Done This Sooner", What Clients Actually Say', hook: "Option 1: There's one thing clients say to me more than anything else, usually a few months in. I wish I'd done this sooner. Option 2: It's never just 'that was useful'. It's almost always that one word, sooner, and they really mean it.", direction: `Your second line (if you opened with Option 1):
"It's not just useful feedback. It's the same sentence almost word for word."

Your second line (if you opened with Option 2):
"There's something about that one word that says everything. They mean before the stress, before the surprise, before the big decision they had to make blind."

(Then add 2 or 3 sentences here on what clients typically mean when they say it. How far back are they imagining. What's the thing they wish they'd had earlier, visibility, a forecast, a second pair of eyes.)

Your next line:
"I worked with a founder preparing to raise investment. He could explain the business model clearly but couldn't articulate the financial story."

(Then add 2 or 3 sentences here on what changed once he could. The decision in front of him became clearer. The conversations with investors went differently. Keep him anonymous.)

Your closing line before the CTA:
"The most common thing that stops people acting earlier isn't money. It's the belief that they should be able to figure it out on their own."

(Then add 1 sentence here on the cost of waiting. Honest, not preachy.)`, cta: '"What\'s one thing in your business you\'ve been putting off, and what\'s actually stopping you?"' },
  { id: "jul-4", week: "Week 10 · Friday", type: "Expertise", bold: "1/5", title: "If You're Looking for Investment, Your Financial Story Needs to Match Your Business Story", hook: "Option 1: He could explain his business brilliantly. The financial side of the story was another matter entirely. Option 2: In front of an investor, it isn't only your pitch that has to stand up. Your numbers have to hold up under questioning too.", direction: `Your second line (if you opened with Option 1):
"That's more common than founders realise. The pitch itself goes down well, and then the financial questions afterwards are where it comes unstuck."

Your second line (if you opened with Option 2):
"A polished pitch is the easy part. The financial story is what the investor goes back to once the meeting's over."

(Then add 2 or 3 sentences here on the most common financial questions investors ask that founders aren't prepared for. The bit that tends to derail an otherwise strong pitch.)

Your next line:
"I worked with a founder preparing to raise. He could explain the business model brilliantly. The financial story was another matter."

(Then add 3 or 4 sentences here walking through the before and after. What he was struggling to articulate, what changed once we'd worked on it together, what those follow-up conversations looked like after.)

Your closing line before the CTA:
"The financial story isn't a separate document. It's the same story your business tells, told in numbers."

(Then add 1 sentence here on what the simplest version of that looks like for a pre-investment founder building it in a short window.)`, cta: '"If you\'re preparing to raise and the financial story isn\'t as solid as the pitch, I\'m happy to take a look. Drop me a message."' },
  { id: "jul-5", week: "Week 11 · Mid-week", type: "Personal", bold: "2/5", title: "I've Been Learning Japanese for 400 Days in a Row. Here's What That's Taught Me.", hook: "Option 1: I've been learning Japanese every single day for over 400 days now. I'm nowhere near fluent, but I'm a good deal better than when I started. Option 2: Practising something every day for 400 days teaches you something that has very little to do with the thing itself.", direction: `Your second line (if you opened with Option 1):
"Some days it's 15 minutes, some days it's 5, and some days it's 5 minutes I really didn't want to do."

Your second line (if you opened with Option 2):
"French A* at GCSE, Mandarin across two spells in Beijing, and now Japanese on Duolingo every morning. The pattern says more about me than the languages do."

(Then add 2 or 3 sentences here on why Japanese specifically. What drew you to it. Self-deprecating about your progress is fine, you're not pretending to be fluent.)

Your next line:
"The moment I noticed real progress wasn't a moment. It was a slow realisation."

(Then add 2 or 3 sentences here on what that looked like. A conversation you held longer than you expected. A sentence that came out without thinking. The kind of progress you don't really notice from one week to the next.)

Your closing line before the CTA:
"Small habits compound. The trick is being patient enough to let them."

(Then add 1 or 2 sentences here on what habit in your life or business has compounded in a way you didn't expect. Don't labour the parallel, let it land naturally.)`, cta: '"What\'s a habit you\'ve kept going that\'s quietly made a difference, in life or in business?"' },
  { id: "jul-6", week: "Week 11 · Friday", type: "Expertise", bold: "3/5", title: "\"I Can Just Use AI for My Financial Strategy.\" Can You, Though?", hook: "Option 1: I keep getting asked a version of the same question. Why would I need help with my finances when I can just use AI for it? It's a fair thing to ask. Option 2: AI will happily build you a financial model. What it can't do is tell you whether the assumptions underneath it are right.", direction: `Your second line (if you opened with Option 1):
"It's a completely fair question. I'd be asking it too."

Your second line (if you opened with Option 2):
"That's the bit that catches people out. The model looks right, but it's the assumptions underneath it that actually matter."

(Then add 2 or 3 sentences here on what AI can genuinely do well for SME owners. Drafting, summarising, working through scenarios. Acknowledge it properly, you're not being dismissive.)

Your next line:
"The problem isn't AI. It's using any tool without the ability to evaluate what it's producing."

(Then add 3 or 4 sentences here on where it falls short. If you don't understand finance well enough to know when the output is wrong or incomplete, you won't know to question it. Have you seen an example of plausible-looking AI output that was wrong in an important way? Drop it in here, anonymised.)

Your closing line before the CTA:
"The value isn't in the model. It's in knowing whether to trust it."

(Then add 1 sentence here on what you'd say to someone who genuinely believes the objection. Honest, not preachy.)`, cta: '"If you\'re relying on AI for financial decisions and not quite sure what to trust, worth a conversation. Drop me a message."' },
  { id: "jul-7", week: "Week 12 · Mid-week", type: "Personal", bold: "3/5", title: "The Question I Ask Every New Client (That Nobody's Ever Asked Them Before)", hook: "Option 1: I ask every new client the same question fairly early on, and the way they react usually tells me everything I need to know. Option 2: Most of them have never been asked it before, and you can tell from how long the pause goes on.", direction: `Your second line (if you opened with Option 1):
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
  { id: "jul-8", week: "Week 12 · Friday", type: "Expertise", bold: "2/5", title: "Costly Mistakes Don't Announce Themselves. They Show Up Afterwards.", hook: "Option 1: Costly mistakes rarely announce themselves at the time. They tend to turn up in the numbers a few months later. Option 2: A decision that made perfect sense at the time can eat away at your margin for months before anyone notices, because nobody is actually looking.", direction: `Your second line (if you opened with Option 1):
"By the time the numbers say something's wrong, the decision that caused it was made a quarter ago."

Your second line (if you opened with Option 2):
"Nobody made a bad call and nobody was reckless. There just wasn't anyone looking at the right thing at the right time."

(Then add 2 or 3 sentences here on the most common guesswork-driven mistakes you see. Pricing without proper cost analysis. Hiring without modelling it out. Outsourcing decisions made on a hunch.)

Your next line, only if you've got a real example:

(If you've got one real example of this, put it here, kept anonymous. One is plenty, you don't need several. Maybe a contract that lost money for months, or a product that was eating margin without anyone noticing. If you haven't got a real one, don't make one up. Just describe how it typically plays out instead, which lands just as well.)

Your closing line before the CTA:
"This isn't about being perfect. It's about having enough information to course-correct before things become serious."

(Then add 1 or 2 sentences here on the difference between a mistake and a crisis. Usually how quickly you found out. Calm and factual, no scare tactics.)`, cta: '"If there are decisions in your business the numbers haven\'t backed up, drop me a message. I\'ll buy you a coffee."' },
];

const asbAugustIdeas: AsbIdea[] = [
  { id: "aug-1", week: "Week 13 · Mid-week", type: "Personal", bold: "3/5", title: "\"I'm Just Bad With Money.\" No. You're Not.", hook: "Option 1: 'I'm just bad with money.' I hear that within the first ten minutes of most first conversations, and it's almost never actually true. Option 2: For most people it isn't that they can't understand numbers. It's that nobody has ever sat down and helped them understand what their own numbers mean.", direction: `Your second line (if you opened with Option 1):
"It's a story people have been telling themselves for years, and it's usually not true."

Your second line (if you opened with Option 2):
"There's a difference between knowing the 'what', the figures, and knowing the 'so what', and that gap isn't a character flaw, just a missing layer."

(Then add 2 or 3 sentences here on what people usually mean when they say it. Is it numeracy, interpretation, anxiety, or something else? Be honest, you've heard it enough times to know the pattern.)

Your next line, only if you've got a real example:

(If you've got a real example of someone who was convinced they were bad with money and turned out not to be, share the moment it shifted, kept anonymous, and what changed once they could see what their numbers meant. Only if it really happened. If not, keep it general and don't make anyone up.)

Your closing line before the CTA:
"The owners who say they're bad with money are often the most coachable. They're honest about what they don't know."

(Then add 1 or 2 sentences here on the link between this belief and managing finances alone. Most don't think there's another way. Warm, not patronising, you're releasing people from a story, not telling them they're wrong.)`, cta: '"Do you consider yourself a numbers person, or have you always left that to someone else?"' },
  { id: "aug-2", week: "Week 13 · Friday", type: "Expertise", bold: "3/5", title: "You Want to Sell the Business for £3 Million. What Does It Need to Look Like to Get There?", hook: "Option 1: Most business owners have a number in mind for when they sell. Very few have actually worked out what the business needs to look like to get there. Option 2: Ask an owner what they want to sell for and they'll give you the figure straight away. Ask what the business needs to look like financially to reach it, and that's where it goes quiet.", direction: `Your second line (if you opened with Option 1):
"The number isn't the problem. The path to it is the bit that's usually missing."

Your second line (if you opened with Option 2):
"That long pause is the gap between ambition and roadmap. It's a very common gap."

(Then add 2 or 3 sentences here on the most common difference between what owners think their business is worth and what it would actually sell for. Valuation multiples. Owner-dependency. Messy financials. Pick whichever one comes up most often in your conversations.)

Your next line:
"There are usually two or three financial levers that most affect exit value for an SME."

(Then add 3 or 4 sentences here walking through what they are. Margin trajectory. Revenue quality, recurring versus one-off. Clean financials. Reduced owner-dependency. Be specific without going into a textbook list.)

Your closing line before the CTA:
"The business you eventually sell is built now, not in the final stretch before you exit."

(Then add 1 or 2 sentences here on what that actually means in practice. Every month without a plan is a month of compounding the gap. Real, not motivational.)`, cta: '"If you have an exit number but nothing mapped out behind it, drop me a message. I\'ll buy you a coffee."' },
  { id: "aug-3", week: "Week 14 · Mid-week", type: "Expertise", bold: "3/5", objection: true, title: "\"I'm Not Ready Yet.\" What That's Usually Costing You.", hook: "Option 1: The most common thing I hear at the end of a good conversation is some version of this. I think this is exactly what I need, just not quite yet. Option 2: Being ready tends to be a feeling rather than a fact. And the thing people want to sort out first is usually the very thing that needs the financial help.", direction: `Your second line (if you opened with Option 1):
"It's almost always genuine. And it's almost always more expensive than people realise."

Your second line (if you opened with Option 2):
"Once X is sorted I'll deal with Y, and round it goes. The trouble is that X is usually the very thing that needs financial input to sort in the first place."

(Then add 2 or 3 sentences here on the most common "not yet" reason you hear, and what's usually underneath it. Often it's owners who are working in the business rather than on it.)

Your next line, only if you've got a real example:

(If you've got a real example of someone who kept putting it off until things calmed down, say what the waiting actually cost them, kept anonymous: missed decisions, slower growth, the stress of not knowing. Only if it's real. If not, keep it general rather than inventing one.)

Your closing line before the CTA:
"There is a version of 'not yet' that's legitimate. I'm not saying there isn't."

(Then add 1 or 2 sentences here on how you tell the difference. When it's a real call versus when it's a story someone's telling themselves. Honest, not pushy.)`, cta: '"If you\'ve been putting it off and you know it, drop me a message. I\'ll buy you a coffee."' },
  { id: "aug-4", week: "Week 14 · Friday", type: "Expertise", bold: "2/5", objection: true, title: "\"I Need to Speak to My Business Partner.\" Great. Here's What to Tell Them.", hook: "Option 1: 'I just need to run it past my business partner.' That's fair enough, but if they don't know the numbers either, you're about to have the conversation you've both been putting off. Option 2: When two owners are making a shared decision and neither has a clear view of the finances, that's not really a partnership problem. It's a numbers one.", direction: `Your second line (if you opened with Option 1):
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
  { id: "aug-5", week: "Week 15 · Mid-week", type: "Personal", bold: "2/5", title: "Even an FD Gets Behind on the Bookkeeping. I Told a Client I Do Too.", hook: "Option 1: A client admitted, a bit embarrassed, that they'd fallen behind on their Xero. So I told them the truth, which is that I do too sometimes. Option 2: I sort out other people's finances for a living, and even I let my own bookkeeping pile up more than I'd care to admit.", direction: `Your second line (if you opened with Option 1):
"The relief on their face was worth the small dent to my professional pride."

Your second line (if you opened with Option 2):
"If anyone should have it all up to date, it's me. Mostly I do, but not every week."

(Add 2 or 3 sentences in your own words on why even people who are good with numbers fall behind on the admin. Time, headspace, it never feels like the urgent thing. Keep it honest, that's what makes this one work.)

Your next line:
"Staying on top of it does matter, though, and not for the reason people assume."

(Add a line or two on why it matters, with a light touch. You can't make a good decision on numbers that are three months out of date, and catching up is always harder than keeping up.)

Your closing line before the CTA:
"So if you've let yours slip, I'm not going to judge you. I've been there myself this month."

(Add one sentence on the one small thing that helps you keep on top of it, if you want to. Otherwise leave it and let the honesty land.)`, cta: '"What\'s the job in your business you know you should keep on top of, but somehow never quite get to?"' },
  { id: "aug-6", week: "Week 15 · Friday", type: "Expertise", bold: "2/5", objection: true, title: "Too Busy Working In the Business to Work On It", hook: "Option 1: \"I'm too busy working in the business to find time to work on it. I know I need to, but I can't break the cycle.\" That's how a business owner described it to me, and I hear a version of it constantly. Option 2: The work that actually moves your business forward is rarely the work shouting loudest at you today.", direction: `Your second line (if you opened with Option 1):
"It's one of the most common things I hear, and one of the most expensive."

Your second line (if you opened with Option 2):
"So the planning, the numbers and the direction keep getting pushed to a week with more room in it, and that week doesn't come."

(Add 2 or 3 sentences in your own words on the difference between working in the business and working on it. The day-to-day firefighting versus stepping back to look at where it's all heading.)

Your next line:
"What surprises people is that working on the business doesn't take as long as they fear."

(Add a couple of lines on what a small amount of time on the right things actually buys an owner. A clear view of the numbers, a plan to measure against, a decision made properly rather than on the hoof.)

Your closing line before the CTA:
"Breaking the cycle usually starts with one decision that someone helps you make properly."

(Add a line on how a second pair of eyes breaks the loop. Not more work for them, just fewer of the wrong calls.)`, cta: '"If you can\'t remember the last time you worked on the business rather than in it, drop me a message. I\'ll buy you a coffee."' },
  { id: "aug-7", week: "Week 16 · Mid-week", type: "Personal", bold: "3/5", title: "The Decisions That Feel Heaviest Are the Ones You Make on Your Own", hook: "Option 1: When I left Rolls-Royce, every decision was suddenly mine alone. There was no committee to share it with and no boss to sign it off. Option 2: For me, the hardest part of working for yourself was never the work itself. It was making the big calls with nobody there to check them against.", direction: `Your second line (if you opened with Option 1):
"I'd spent 20 years somewhere the big decisions had ten people round the table, and now they all came down to me."

Your second line (if you opened with Option 2):
"You'd think that freedom would feel light. Some days it does, some days it's the opposite."

(Add 2 or 3 sentences on what that shift actually felt like in the early days of the business. The freedom and the weight, both at the same time. This is a more personal one, so go as far as you're comfortable.)

Your next line:
"It gave me a lot of sympathy for the business owners I work with now."

(Add a couple of lines on how that changed how you see clients. They're often making decisions worth real money on their own, with nobody to talk it through with, and you know exactly how that feels.)

Your closing line before the CTA:
"Half of what I do isn't the numbers. It's being the person they can think out loud with."

(Add one line on why that matters as much as the technical side, or leave it there.)`, cta: '"When you\'re facing a big decision in your business, who do you actually talk it through with?"' },
  { id: "aug-8", week: "Week 16 · Friday", type: "Expertise", bold: "2/5", title: "Are You Actually in Control of Your Costs?", hook: "Option 1: \"Are you in control of your costs? Do you have a good handle on what's actually going out every month?\" It's a question most owners answer with a confident yes, right up until we look. Option 2: Most owners watch what's coming in far more closely than what's going out.", direction: `Your second line (if you opened with Option 1):
"Revenue gets all the attention. Costs are where the damage tends to build up without anyone clocking it."

Your second line (if you opened with Option 2):
"It's rarely one big cost. It's a dozen small ones that crept up while nobody was checking."

(Add 2 or 3 sentences on the costs that drift without anyone deciding they should. Subscriptions, suppliers whose prices crept up, the thing signed up for two years ago and never reviewed.)

Your next line:
"There's a related one I see a lot. Personal and business money living in the same account."

(Add a couple of lines on why mixing the two means you never really know how either is doing. The business can look healthier or worse than it is, and decisions get made on a number that isn't real. Keep it practical, this is fixable.)

Your closing line before the CTA:
"You can't control what you've never properly looked at."

(Add a line on what changes once an owner can see their costs clearly. Usually a few quick wins, and a lot less guessing.)`, cta: '"If you\'re not sure where the money actually goes each month, that\'s the conversation to have. Drop me a message."' },
];

const asbSeptemberIdeas: AsbIdea[] = [
  { id: "sep-1", week: "Week 17 · Mid-week", type: "Personal", bold: "3/5", title: "My Wife Has Held Everything Together While I Built This", hook: "Option 1: While I've been trying to grow this business, my wife has taken on almost everything at home, without ever making a thing of it. Option 2: I don't say this enough, so I'm going to say it here.", direction: `Your second line (if you opened with Option 1):
"You don't get to take a leap like leaving a 20-year career unless someone's holding the rest of it steady."

Your second line (if you opened with Option 2):
"Not much of what I've built this past year would exist without her."

(Add 2 or 3 sentences on what she's actually carried while you've been building the business. The everyday stuff that goes unnoticed. She's also a teacher who pours real care into her own students, which is worth saying.)

Your next line:
"When you're the one starting a business, it's easy to think it's all down to you."

(Add a couple of lines on why that's not really true. The support behind the scenes that makes the visible stuff possible. Honest, in your own voice, not soppy.)

Your closing line before the CTA:
"Behind most people taking a big risk is someone making it safe enough to take."

(Add one line only if it feels right. Sometimes the line above is enough on its own.)`, cta: '"Who\'s the person behind the scenes that makes what you do possible? Worth telling them directly, not just in a comment."' },
  { id: "sep-2", week: "Week 17 · Friday", type: "Expertise", bold: "1/5", title: "Two Simple Cash Flow Fixes Almost Everyone Ignores", hook: "Option 1: Two of the simplest things you can do for your cash flow cost you nothing, and most business owners do neither. Option 2: You don't always need more sales to ease your cash flow. Sometimes you just need to collect what you're already owed.", direction: `Your second line (if you opened with Option 1):
"They're not clever and they're not complicated. They just don't get done."

Your second line (if you opened with Option 2):
"The money's there. It's sitting in someone else's account because nobody's asked for it."

Your next part, the two fixes, one on each line:
"1. Ask for shorter payment terms, or a deposit up front. Plenty of customers will pay within 7 days, or pay something on day one, if that's what you ask for."
"2. Chase your overdue invoices. It's the simplest thing on this list and the most commonly neglected."

(Add 2 or 3 sentences on why owners avoid both. It feels awkward, it feels pushy, you don't want to upset a good customer. Then reframe it: you're not asking for a favour, you're asking to be paid for work you've done.)

Your closing line before the CTA:
"Better terms and a polite chase won't transform your business. They'll stop it being harder than it needs to be."

(Add a line on what steady cash flow frees an owner up to do. Calm and practical.)`, cta: '"If your cash flow feels tighter than your sales say it should be, drop me a message. I\'ll buy you a coffee."' },
  { id: "sep-3", week: "Week 18 · Mid-week", type: "Personal", bold: "1/5", title: "Supporting Wolves Has Been Surprisingly Good Training for Running a Business", hook: "Option 1: I support Wolverhampton Wanderers. I've got my dad to blame for that, and it ruins the occasional Saturday. Option 2: Supporting a team that breaks your heart most weeks turns out to be decent preparation for running your own business.", direction: `Your second line (if you opened with Option 1):
"You don't choose your team. You inherit them, and then you're in it for the long haul."

Your second line (if you opened with Option 2):
"You learn to take the rough weeks without giving up on the whole thing."

(Add 2 or 3 sentences on what being a long-suffering fan actually teaches you. Showing up when it's not going well, keeping perspective, not reacting to every result. Keep it light, this one's meant to be a bit of fun.)

Your next line:
"Running a business has plenty of those weeks too."

(Add a couple of lines drawing the parallel without overdoing it. The bad month that isn't the whole story, the urge to panic over one result, what keeps you steady.)

Your closing line before the CTA:
"You don't write off a season over one bad Saturday. Same goes for a business."

(Add one line if you fancy it, or let the football do the talking.)`, cta: '"Who do you support, and how much of your weekend does it cost you?"' },
  { id: "sep-4", week: "Week 18 · Friday", type: "Expertise", bold: "2/5", title: "\"Am I Ready to Grow?\" And Can You Afford It?", hook: "Option 1: Taking on a new hire, bigger premises or a new product all feel exciting, right up until you stop and ask whether you can actually afford it. Option 2: Wanting to grow your business and being ready to grow it are two very different things.", direction: `Your second line (if you opened with Option 1):
"Growth costs money before it makes money. The gap in between is where businesses get caught out."

Your second line (if you opened with Option 2):
"Ready isn't a feeling. It's something you can actually check before you commit."

(Add 2 or 3 sentences on what owners tend to underestimate when they're thinking about growing. The upfront cost, how long until it pays back, the strain on cash while it does.)

Your next line:
"This is exactly the kind of decision worth modelling out before you make it."

(If you've helped an owner work out whether they could afford a growth move, add a couple of lines on it here, kept anonymous. If you haven't got a specific case to hand, describe how you'd approach it instead. Don't invent a client.)

Your closing line before the CTA:
"You can know, before you commit, whether the numbers stack up. Most owners just never get shown how."

(Add a line on what changes when growth feels like a calculated move rather than a leap of faith.)`, cta: '"If you\'re weighing up a growth decision and want to know whether the numbers stack up, drop me a message."' },
  { id: "sep-5", week: "Week 19 · Mid-week", type: "Personal", bold: "3/5", title: "People Have Always Confided in Me. I've Never Fully Worked Out Why.", hook: "Option 1: At Rolls-Royce, people used to tell me things they hadn't told anyone else at work. I never quite worked out why. Option 2: I'm a finance person. We're meant to be the dry ones. So I've never fully understood why colleagues always ended up confiding in me.", direction: `Your second line (if you opened with Option 1):
"Colleagues, people far more senior than me, people I barely knew. Something made them feel safe enough to be straight with me."

Your second line (if you opened with Option 2):
"Maybe it's that I listen more than I talk, or that I don't judge. I honestly don't know."

(Add 2 or 3 sentences on what you've noticed about the people behind the job titles. You don't need to name anyone or share a specific story if it's sensitive, the observation is enough.)

Your next line:
"I've come to think it matters more in my work than the numbers do."

(Add a couple of lines on how trust shows up with clients now. The financial side only works if someone's honest with you about where they really are, and that starts with trust.)

Your closing line before the CTA:
"You can't help someone with their numbers if they won't tell you the truth about them."

(Add a line on why honesty, both ways, is the foundation of the work, or leave it.)`, cta: '"Who\'s the person in your working life you actually trust to be straight with you?"' },
  { id: "sep-6", week: "Week 19 · Friday", type: "Expertise", bold: "2/5", title: "What's the Right Way to Grow? Hire, Partner, or Something Else", hook: "Option 1: There's more than one way to grow a business, and most owners go for the route that feels obvious rather than the one that actually fits. Option 2: You can grow by hiring, by partnering with another business, by changing the model, or by raising investment. They're very different roads, and picking the wrong one gets expensive.", direction: `Your second line (if you opened with Option 1):
"Hiring, partnering, changing how the business works, raising money. Each comes with a different cost and a different risk."

Your second line (if you opened with Option 2):
"And there's a question underneath all of them that rarely gets asked. Which one do you actually want?"

(Add 2 or 3 sentences on how owners usually choose, and why the obvious route often isn't the right one. Hiring because that's what everyone does, raising money because it sounds like progress.)

Your next line:
"Take investment as an example. Everyone talks about raising it like it's the goal."

(Add a couple of lines on the other side of it. Investment isn't free money, it's selling a slice of your business and some of your control. For some it's the right move, for others it solves a problem they don't really have.)

Your closing line before the CTA:
"The right route is the one the numbers point to and you actually want, not the one that sounds best at networking."

(Add a line on the value of choosing this deliberately rather than drifting into it.)`, cta: '"If you\'re weighing up how to grow and which route is right for you, I\'ll help you think it through. Drop me a message."' },
  { id: "sep-7", week: "Week 20 · Mid-week", type: "Personal", bold: "3/5", title: "The Most Impressive Job I Ever Had Was Also One of the Emptiest", hook: "Option 1: On paper, the senior roles were the high point of my career. They were also when I felt least like myself. Option 2: I spent years working towards the next role up. When I got there, it didn't feel anything like I'd expected.", direction: `Your second line (if you opened with Option 1):
"More money, more status, more people who knew my name, and less of the thing that made me enjoy the work in the first place."

Your second line (if you opened with Option 2):
"The title looked great. The day-to-day had stopped being satisfying somewhere along the way."

(Add 2 or 3 sentences on what had made earlier work feel good. The hands-on stuff, being in the thick of it, seeing the difference you made. You can contrast it with the senior roles that looked better on paper.)

Your next line:
"It took me a while to see that impressive and fulfilling aren't the same thing."

(Add a couple of lines on how that fed into leaving. You didn't want a more impressive job, you wanted work that felt like it mattered. Honest, not preachy.)

Your closing line before the CTA:
"I'd rather do work I can feel the point of than work that just looks good on a profile."

(Add a line tying it to what you do now if it fits, or let it sit.)`, cta: '"Have you ever got the thing you were chasing, then realised it wasn\'t what you actually wanted?"' },
  { id: "sep-8", week: "Week 20 · Friday", type: "Expertise", bold: "2/5", title: "That Investment You Keep Thinking About. Is There Actually a Return?", hook: "Option 1: You've been going back and forth on it for months, whether it's a piece of kit, a new hire or a new system. The real question was never whether you want it, but whether it actually pays you back. Option 2: 'Will it be worth it?' is one of the most important questions in business, and most owners end up answering it on a gut feeling.", direction: `Your second line (if you opened with Option 1):
"Wanting something and it being a good investment aren't the same thing. Sometimes they line up, often they don't."

Your second line (if you opened with Option 2):
"A gut feeling isn't useless, but it's a poor stand-in for actually working out the return."

(Add 2 or 3 sentences on why owners struggle with this. They look at the cost but not at what it brings in or frees up, or they can't separate the want from the maths.)

Your next line:
"Working it out doesn't have to be complicated. It starts with two honest questions."

(Add a couple of lines walking through a simple way to think about it. What will this cost me, all in, and what will it actually bring back, in money, time or capacity, and by when. Use a real example of your own if you have one, otherwise keep it general.)

Your closing line before the CTA:
"The point isn't to kill the idea. It's to know whether you're making a decision or a wish."

(Add a line on how it feels to commit once you know the numbers behind it. Confident rather than hopeful.)`, cta: '"If there\'s an investment you keep circling, I\'ll help you work out whether it stacks up. Drop me a message."' },
];

const asbOctoberIdeas: AsbIdea[] = [
  { id: "oct-1", week: "Week 21 · Mid-week", type: "Personal", bold: "4/5", title: "20 Years In, and Part of Me Still Worries They'll Find Me Out", hook: "Option 1: Twenty years of experience and a professional qualification behind me, and part of me still wonders whether someone will realise I only really know the big-company world. Option 2: That voice telling you you're not really qualified for this has never once cared how qualified you actually are.", direction: `Your second line (if you opened with Option 1):
"It isn't rational. I know what I can do. The feeling doesn't always check with the facts first."

Your second line (if you opened with Option 2):
"Mine shows up as a worry that my Rolls-Royce background won't translate to smaller businesses, even though it does."

(Add 2 or 3 sentences on when the feeling tends to show up for you. Before a talk, writing a post, walking into a room of people you don't know. This is a bold one, so be as honest as you're comfortable being.)

Your next line:
"I've stopped trying to get rid of it. I've started just carrying on anyway."

(Add a couple of lines on how you handle it now. Doing the thing while the doubt is still there, and what you've learned about it over time.)

Your closing line before the CTA:
"If you feel like a fraud now and then, it might just mean you care about doing it well."

(Add one honest line rather than a motivational one, or leave it.)`, cta: '"Does imposter syndrome ever catch you out, even when you know you\'re good at what you do?"' },
  { id: "oct-2", week: "Week 21 · Friday", type: "Expertise", bold: "3/5", objection: true, title: "\"I'm Too Small to Need a Finance Person.\" Here's the Maths.", hook: "Option 1: \"I'm too small a business to pay for any extra support on the finance side.\" I hear it a lot, and it's often the businesses who say it that need it most. Option 2: A good finance director should pay for themselves many times over. If they don't, you've got the wrong one.", direction: `Your second line (if you opened with Option 1):
"Too small usually means there's no spare money for mistakes, which is exactly when getting the numbers right matters most."

Your second line (if you opened with Option 2):
"This isn't a cost like rent or software. It's the one that's meant to make you money, or save it."

(Add 2 or 3 sentences on where the return actually comes from. A pricing decision put right, a loss-making product spotted, a cash flow problem caught early. Real things, not vague value.)

Your next line:
"The honest test is simple. Is the return bigger than the cost?"

(If you've worked with a business that was sure they couldn't justify it, and it paid for itself, add a couple of lines on what changed, kept anonymous. If you'd rather not, walk through how an owner can judge it for themselves.)

Your closing line before the CTA:
"The question was never whether you're big enough. It's whether the return beats the cost."

(Add a line, honest rather than salesy, on how to work that out.)`, cta: '"If you\'ve ever decided you\'re too small to justify this, let\'s test that properly. Drop me a message. I\'ll buy you a coffee."' },
  { id: "oct-3", week: "Week 22 · Mid-week", type: "Personal", bold: "3/5", title: "A Senior Leader Opened Up to Me, and It Stopped Me in My Tracks", hook: "Option 1: A very senior leader once opened up to me about what he was going through, and my honest, unguarded first thought was that I'd forgotten he had feelings at all. Option 2: We have a habit of treating senior people like they're machines, until one of them reminds you they're not.", direction: `Your second line (if you opened with Option 1):
"I didn't say it out loud, thankfully. But it stopped me dead."

Your second line (if you opened with Option 2):
"The higher up someone is, the easier it is to forget there's a person under the title."

(Add 2 or 3 sentences on the moment, kept anonymous. You don't need the details, the point is that he opened up and it changed how you saw him.)

Your next line:
"It's stayed with me because it's so easy to do the same thing to anyone."

(Add a couple of lines on how this applies to business owners. The confident ones, the ones who look like they've got it all handled, are often carrying the most on their own.)

Your closing line before the CTA:
"Everyone you deal with is carrying something you can't see."

(Add one line if you want it. The line above lands fine on its own.)`, cta: '"Have you ever completely misjudged someone because of the role they were in?"' },
  { id: "oct-4", week: "Week 22 · Friday", type: "Expertise", bold: "2/5", title: "The Work You're Giving Away for Free", hook: "Option 1: It started out as one job. A few months on, you're doing nearly twice the work for the same money, and nobody ever actually decided that should happen. Option 2: Scope creep doesn't feel like a problem until you sit down and work out what it's costing you.", direction: `Your second line (if you opened with Option 1):
"A small favour here, an extra bit there, all reasonable on their own. Added up, it's a chunk of your margin gone."

Your second line (if you opened with Option 2):
"Every extra you absorb without charging is profit you've handed over without meaning to."

(Add 2 or 3 sentences on why owners let it happen. Not wanting to seem difficult, valuing the relationship, finding it awkward to raise. All understandable, none of it changes the maths.)

Your next line:
"The fix isn't being harder with clients. It's having the conversation earlier."

(Add a couple of lines on what that sounds like. When a project grows beyond what was agreed, you flag it and you charge for it. Most good clients expect that.)

Your closing line before the CTA:
"Charging for the work you actually do isn't cheeky, it's just being accurate."

(Add a line on what gets better when an owner gets this right. Healthier margins, and often better client relationships too.)`, cta: '"If your projects keep growing and the invoice never does, drop me a message. I\'ll buy you a coffee."' },
  { id: "oct-5", week: "Week 23 · Mid-week", type: "Personal", bold: "2/5", title: "I Once Took a Year Out, With No Job, to Go and Learn Mandarin", hook: "Option 1: Years ago I stepped away from my career for a year, with no job lined up, to go and learn Mandarin. It's one of the best decisions I've made. Option 2: Taking a year out with no plan beyond learning something sounds reckless. It turned out to be one of the most useful things I've done.", direction: `Your second line (if you opened with Option 1):
"Plenty of people thought I was mad. On paper, they had a point."

Your second line (if you opened with Option 2):
"I didn't come back with a qualification anyone cared about. I came back as a slightly different person."

(Add 2 or 3 sentences on why you did it and what it was actually like. The decision to step away, the uncertainty, what you were after. Honest, in your own voice.)

Your next line:
"What I really learned wasn't the language. It was that I could step into the unknown and be fine."

(Add a couple of lines on what that taught you that's stuck with you. The confidence to land somewhere unfamiliar and work it out. You can draw a line to leaving the corporate world years later.)

Your closing line before the CTA:
"Stepping off the obvious path is sometimes the most sensible thing you can do."

(Add one line if it fits, or leave it.)`, cta: '"Have you ever made a choice that looked reckless from the outside but turned out to be exactly right?"' },
  { id: "oct-6", week: "Week 23 · Friday", type: "Expertise", bold: "1/5", title: "Good Bookkeeping Isn't Admin. It's the Foundation Everything Sits On.", hook: "Option 1: Bad bookkeeping doesn't just make your tax return harder. It means every decision you make sits on numbers you can't fully trust. Option 2: You can't run a business properly on financial information you don't believe.", direction: `Your second line (if you opened with Option 1):
"Everything I do for a client sits on top of their bookkeeping. If that's shaky, so is everything above it."

Your second line (if you opened with Option 2):
"And most owners, deep down, know whether they trust their own numbers or not."

(Add 2 or 3 sentences on what good bookkeeping gives you beyond keeping the taxman happy. Numbers that are up to date and accurate, that you can actually make decisions from.)

Your next line:
"The problem usually isn't that owners don't care. It slips, and then catching up feels like a mountain."

(Add a couple of lines on what it costs when it slips. Decisions made on old numbers, surprises at year end, the stress of not really knowing where you stand. You can admit you let it slip sometimes too, it makes the point human.)

Your closing line before the CTA:
"Get the foundation right and everything you build on top of it gets easier."

(Add a line on what becomes possible once the numbers are reliable. Forecasting, proper decisions, actual confidence.)`, cta: '"If you don\'t fully trust your own numbers, that\'s the place to start. Drop me a message."' },
  { id: "oct-7", week: "Week 24 · Mid-week", type: "Personal", bold: "3/5", title: "The Thing That Turned My Health Around Wasn't One Big Decision", hook: "Option 1: If you put me on a stage and told me to talk about one thing, it wouldn't be finance. It would be small habits. Option 2: The thing that turned my health around wasn't dramatic. It was small, boring changes repeated for a long time.", direction: `Your second line (if you opened with Option 1):
"I've seen up close what they do. They're a big part of why I'm well, and a big part of why this business exists at all."

Your second line (if you opened with Option 2):
"No single change fixed it. A bit more exercise, better sleep, eating differently, week after week."

(Add 2 or 3 sentences on where this came from. You can reference coming through a stressful period and rebuilding through lifestyle changes, only as much as you're comfortable sharing. The honesty is the point, but you set the line.)

Your next line:
"What surprised me was how slow it felt while it was working."

(Add a couple of lines on the nature of small habits. You don't notice them week to week, you notice them when you look back a year. Don't force the business parallel, let the reader make it.)

Your closing line before the CTA:
"It's almost always the boring, repeated things that change the most."

(Add one line on a habit, in life or work, that's paid off in a way you didn't expect, or leave it.)`, cta: '"What\'s one small habit that\'s made a bigger difference to you than it had any right to?"' },
  { id: "oct-8", week: "Week 24 · Friday", type: "Expertise", bold: "3/5", title: "Not Paying Yourself a Proper Salary Hides the Truth About Your Business", hook: "Option 1: If you're not paying yourself properly, your business looks healthier than it actually is. Option 2: \"I'll pay myself properly once the business can afford it.\" The trouble is, you'll never really know whether it can.", direction: `Your second line (if you opened with Option 1):
"The profit you're looking at is being propped up by the wage you're not taking."

Your second line (if you opened with Option 2):
"The wage you should be taking isn't in the numbers at all, so the profit you're looking at is telling you a story that isn't true."

(Add 2 or 3 sentences on what skipping your own salary hides. It can mask that the business isn't really profitable yet, and it can make you underprice because your costs look lower than they are. Keep it non-judgemental, most owners do this out of necessity.)

Your next line:
"It also causes problems later, at exactly the wrong moment."

(Add a couple of lines on the future cost. If you ever want investment or to sell, a buyer adds a proper salary back in and the profit can drop sharply. Better to know the real picture now.)

Your closing line before the CTA:
"Paying yourself properly isn't a reward for later. It's how you see your business clearly now."

(Add a line on what owners gain from putting a real wage in, even a modest one. An honest view of whether the business actually works.)`, cta: '"If you\'re not taking a proper wage and you\'re not sure what that\'s hiding, drop me a message."' },
];

// New objection-based cards from Session 8 (16 July 2026). These only appear in the Objection-based sub-tab.
const asbObjectionNewIdeas: AsbIdea[] = [
  { id: "obj-1", week: "Session 8 · New", type: "Expertise", bold: "3/5", objection: true, title: "\"We'll Just See How That Goes First.\" Then What?", hook: "Option 1: 'We'll just see how that goes for a bit.' The new hire, the dashboard you built yourselves, the accounting thing you're sorting out first. I hear a version of this all the time. Option 2: Most owners saying 'I'll do it when' aren't really putting off that decision. They're putting off getting a clear view of the business while they make it.", direction: `Your second line (if you opened with Option 1):
"And the moment when you've properly 'seen how it goes' somehow never arrives."

(Add 2 or 3 sentences on the pattern, in your own words. Deciding to do it later feels good because it feels like a plan, but later relies on perfect conditions turning up, and you've never once seen the perfect conditions actually arrive. Let this one be a bit ranty, it comes from real frustration, just keep the warmth in it.)

Your next line:
"Whatever you're waiting on, the benefit starts when you start."

(Add a sentence or two on why earlier beats later. The decisions you're waiting to make, the hire, the expansion, the new product, are exactly the ones that go better with someone across the numbers. And if you're honest with yourself, waiting can just be the polite version of no.)

Your closing line before the CTA:
"If you're reading this thinking, that's me, you don't have to like this post or comment on it."

(This line matters. Plenty of people will recognise themselves and won't want to admit it publicly, so give them a private way in.)`, cta: '"Message me instead and we can have a conversation in confidence. Nobody else needs to know."' },
  { id: "obj-2", week: "Session 8 · New", type: "Expertise", bold: "2/5", objection: true, title: "\"It's a Cost We Can't Justify Right Now.\" Fair. Let's Talk About It.", hook: "Option 1: 'It's a cost we can't really justify right now.' That's a fair challenge, so here's how I think about whether I'm worth it. Option 2: The whole intention of working with someone like me is that it pays for itself. Not in a vague, trust-me way, in a specific one.", direction: `Your second line (if you opened with Option 1):
"The whole intention is for it to pay for itself in some way."

(Add 2 or 3 sentences on where the payback actually comes from, in your own words. Sometimes it's a pricing decision put right or a loss-making product spotted. Sometimes it's a mistake avoided before it was made. And sometimes it's the same money coming in but a much easier life running the business. You said all of this on a recent call, use that language.)

Your next line:
"And there's an honest caveat, because I won't promise it blind."

(Add a sentence on the only-if. The fee pays for itself only if we find something worth fixing and fix it. That honesty is the point. You're not selling magic, you're selling a clear look at the numbers and what to do about them.)`, cta: '"If the cost is the thing holding you back, that\'s exactly the conversation worth having. Drop me a message."' },
];

// The Objection-based sub-tab: the flagged cards from the monthly plan (same cards, same used-state) plus the new Session 8 ones.
const asbObjectionIdeas: AsbIdea[] = [
  ...[...asbAugustIdeas, ...asbOctoberIdeas].filter(i => i.objection),
  ...asbObjectionNewIdeas,
];

function AsbContentTab({ slug }: { slug: string }) {
  const [activeMonth, setActiveMonth] = useState("june");
  const months = [
    { id: "june", label: "June — Weeks 5–8" },
    { id: "july", label: "July — Weeks 9–12" },
    { id: "august", label: "August — Weeks 13–16" },
    { id: "september", label: "September — Weeks 17–20" },
    { id: "october", label: "October — Weeks 21–24" },
    { id: "objection", label: "Objection-based" },
  ];
  const ideas = activeMonth === "june" ? asbJuneIdeas : activeMonth === "july" ? asbJulyIdeas : activeMonth === "august" ? asbAugustIdeas : activeMonth === "september" ? asbSeptemberIdeas : activeMonth === "october" ? asbOctoberIdeas : asbObjectionIdeas;
  const descriptions: Record<string, string> = {
    june: "The audience is warming up. The personal posts get a little more revealing, the expertise posts get sharper. The door-slammer post in Week 5 is a bold one, so save it for when the habit is solid.",
    july: "By now the rhythm is established. Go deeper and bolder. The personal posts tackle the stories you haven't shared publicly yet, and the expertise posts push into sharper, more opinionated territory.",
    august: "Weeks 13 and 14 came from your first batch of conversation notes, a prospect call on 30 April. Weeks 15 onwards come from the ideas you captured yourself in June, in client and networking conversations. The workflow is working, conversations becoming content.",
    september: "All from the ideas you captured in June, in your own conversations with clients, prospects and at networking. Expertise posts on what getting the finances wrong actually costs, paired with personal posts that show the human behind the numbers.",
    october: "The back half of your June ideas, mapped out so you've got a runway well past our last session. Keep the rhythm going: two posts a week, one personal and one expertise.",
    objection: "From Session 8. The three objections you actually hear on sales calls, in order: they need to speak to someone else, they'll do it when, and the cost. These posts answer the objection before the call ever happens, so prospects arrive with their concerns already quashed. The amber-badged cards also sit in their original months, and marking one used marks it everywhere.",
  };

  return (
    <div>
      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>3-Month Content Strategy</p>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
      <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.5, margin: "0 0 20px" }}>2 posts a week: one mid-week personal post and one Friday expertise post. Each card has the hook, the structure for the post (with prompts woven in), and a CTA.</p>

      {/* Content workflow strategy */}
      <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "24px 28px", marginBottom: 24 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Updated Session 6 · 19 May 2026</p>
        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 16px" }}>How to Write a Post</p>
        <p style={{ fontSize: "0.87rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 20px" }}>Pick a card, do a brain dump into Claude, and let it turn your words into a post. We did this together on the call and had a full draft in 14 minutes. That's the whole process.</p>
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
          <p style={{ fontSize: "0.86rem", color: "#5C3A0E", margin: 0, lineHeight: 1.5 }}>Writing these posts isn't wasted time. It's clarity and reps for client conversations. Every post you write is you getting better at explaining what you do, why it matters, and who it's for. You're ingraining what you know.</p>
        </div>
      </div>

      {/* Content strategy evolution note */}
      <div style={{ background: "#f9f8f6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#7A746E", margin: "0 0 6px" }}>Session 6 · Why Your Content Is Changing</p>
        <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>Finance Simplified isn't the frame anymore</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 10px" }}>The posts you were writing were useful — but they were explaining finance. The shift now is to stop telling people how finance works and start showing them what's at stake when they don't have it sorted.</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: "0 0 10px" }}>The old frame said: here's the thing, here's how it works, here's what to do. The new frame says: here's the problem, here's what it's costing you, here's the door.</p>
        <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>Don't give the solution in the post. Show the cost of the problem, then invite them in. That's where the CTAs come from — "if this sounds familiar, drop me a message."</p>
      </div>

      {/* Examples reassurance note */}
      <div style={{ background: "#edf4ef", border: "1px solid #c2dbc9", borderRadius: 8, padding: "20px 24px", marginBottom: 24 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: ASB_COLOR, margin: "0 0 6px" }}>From Ben · On Examples</p>
        <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 10px" }}>You never need to make an example up</p>
        <p style={{ fontSize: "0.85rem", color: "#3a6048", lineHeight: 1.5, margin: "0 0 10px" }}>Saw your message about getting stuck on the Week 12 post. Quick one to take the pressure off.</p>
        <p style={{ fontSize: "0.85rem", color: "#3a6048", lineHeight: 1.5, margin: "0 0 10px" }}>You don't need a real example in every post. One genuine example, used once across the whole plan, is plenty. Where a card suggests one and you've actually got it, use it and keep it anonymous. Where you haven't, just delete that line and say how it usually plays out instead. The post still works fine without a specific story.</p>
        <p style={{ fontSize: "0.85rem", color: "#3a6048", lineHeight: 1.5, margin: 0 }}>Don't ever invent a client. The honest, general version always beats a made-up one.</p>
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
