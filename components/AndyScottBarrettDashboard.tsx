"use client";

import { useState } from "react";
import ClientTodoList from "@/components/ClientTodoList";
import EmailOptIn from "@/components/EmailOptIn";
import NextMoveBox from "@/components/NextMoveBox";
import SessionPrepPrompt from "@/components/SessionPrepPrompt";
import MilestoneTracker from "@/components/MilestoneTracker";
import DashboardFooter from "@/components/DashboardFooter";
import CommentBox from "@/components/CommentBox";

const ASB_COLOR = "#2e7d4f";
const ASB_NEXT_MOVE = "Post the Martin Lewis wedding speech draft this week. You've written it, you've had the feedback — now post it and move on. Set the 30-minute timer. That's the rule.";

const asbTodos = [
  { id: "t1", text: "Post the Martin Lewis post — apply Ben's feedback on the ending, then post. 30-minute timer, no more.", owner: "Andy" },
  { id: "t2", text: "Update LinkedIn headline to: \"I turn financial data into decisions — the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce\"", owner: "Andy" },
  { id: "t3", text: "Update LinkedIn banner — three lines Ben sent: 'Turning your numbers into decisions, not just reports' / 'I give you the financial direction you don't get from your accountant' / 'For UK SME owners who want to run their business properly'", owner: "Andy" },
  { id: "t4", text: "Upload finalised About section to LinkedIn", owner: "Andy" },
  { id: "t5", text: "Book working photo session with father-in-law — natural, outside, not a corporate headshot", owner: "Andy" },
  { id: "t6", text: "Pursue aerospace East Midlands prospect — follow up when owner returns", owner: "Andy" },
  { id: "t7", text: "Follow up with Manchester client on visit date", owner: "Andy" },
  { id: "w1", text: "Website: Change 'top-performing FTSE 100 company' to 'Rolls-Royce'", owner: "Andy" },
  { id: "w2", text: "Website: Move Richard Waine testimonial to homepage", owner: "Andy" },
  { id: "w3", text: "Website: Replace contact page copy with the version Ben sent", owner: "Andy" },
  { id: "w4", text: "Website: Fix name hyphenation — 'Andy Scott Barrett' consistently, no hyphen", owner: "Andy" },
  { id: "w5", text: "Website: Update copyright year to 2026", owner: "Andy" },
];


const asbTabs = [
  { id: "home", label: "Home" },
  { id: "milestones", label: "Milestones" },
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
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
              <p style={{ fontSize: "0.68rem", color: "#7A746E", margin: 0 }}>Founder, Ascott Financial Direction · Session 3 of 6</p>
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
        {activeTab === "home" && (
          <div>
            <SessionPrepPrompt />
            <EmailOptIn slug={slug} accentColor={ASB_COLOR} />
            <NextMoveBox move={ASB_NEXT_MOVE} accentColor={ASB_COLOR} clientName="Andy Scott Barrett" sessionLabel="Session 4 · 30 April 2026" animateIn />

            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 28 }}>
              <div style={{ width: 36, height: 36, background: ASB_COLOR, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>3</div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 4px" }}>Session 3 — 15 April 2026</p>
                <p style={{ fontSize: "0.84rem", color: "#3a6048", margin: 0, lineHeight: 1.6 }}>Profile finalised. New headline confirmed ("I turn financial data into decisions — the bit your accountant isn't there to do"). Banner decided: decision-focused option, flipped order. About section structure agreed and compacted. Networking talk debriefed — used as content angle source. Pipeline updates: aerospace East Midlands prospect in play, Manchester client returning, email-only prospect correctly left, startup re-activating. Content workflow discussion — Claude + dashboard cards + 30-minute posting timer. Next session: 30 April 2026.</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Sessions done", value: "3 of 6", sub: "Next: 30 April 2026" },
                { label: "Headline", value: "✓ Finalised", sub: "Ready to go live" },
                { label: "About section", value: "✓ Finalised", sub: "Ready to go live" },
                { label: "Posts in bank", value: "1 drafted", sub: "Martin Lewis — ready to post" },
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
              <ClientTodoList items={asbTodos} clientName="Andy Scott Barrett" slug={slug} accentColor={ASB_COLOR} />
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
        )}

        {/* ── MILESTONES ── */}
        {activeTab === "milestones" && (
          <MilestoneTracker slug={slug} color={ASB_COLOR} />
        )}

        {/* ── POSITIONING ── */}
        {activeTab === "positioning" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>Who You're For & How You're Different</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Positioning</h2>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "24px 28px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 10px" }}>Core positioning</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.6, margin: 0 }}>I turn financial data into decisions — the bit your accountant isn't there to do.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 14px" }}>Who you're for</p>
                {[
                  { label: "Primary ICP", detail: "UK SME owners with £500k–£10m turnover (sweet spot £500k–£5m). Have bookkeeping and accounting covered. Lacking someone who turns data into forward-looking decisions. Driven by growth, a specific inflection point, or pain." },
                  { label: "Secondary ICP", detail: "Start-ups preparing to raise investment — need their numbers straight and their financial story coherent before investor conversations. A valid fit, not a 'not for'." },
                ].map((a, i) => (
                  <div key={i} style={{ marginBottom: i < 1 ? 14 : 0 }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: ASB_COLOR, margin: "0 0 4px" }}>{a.label}</p>
                    <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#DC2626", margin: "0 0 14px" }}>Who you're not for</p>
                {[
                  "Doesn't respect your time or the relationship",
                  "Needs convincing rather than ready to act",
                  "Wants validation, not genuine insight",
                  "Treats it transactionally — squeezes every invoice, goes quiet between calls",
                  "Too early-stage or too small to justify the engagement",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#DC2626", fontWeight: 700, flexShrink: 0 }}>✕</span>
                    <p style={{ fontSize: "0.84rem", color: "#3D3935", lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", margin: "0 0 16px" }}>What makes you different</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "🏭", title: "20 years at Rolls-Royce — stress-testing business cases on jet engines", body: "Not in the boardroom. In the weeds — working directly with engineers, sales directors and management teams on live business decisions. That's a very different thing from a career consultant who's never been inside something that demanding." },
                  { icon: "🇨🇳", title: "Beijing at 25 — you've always been able to turn your hand to things", body: "Sent to China at 25. Found a messy, ad-hoc operation and systematised it from scratch. Mentored the local team. Evidence that you can land somewhere unfamiliar, figure it out, and leave it better than you found it." },
                  { icon: "🚪", title: "You chose this deliberately, at 40, on your own terms", body: "Most people who leave big corporate jobs do it under pressure. You'd had 40 in your mind for years. Your boss told you your job was safe. Your internal response: 'oh no.' Last day was exactly 20 years to the day from day one." },
                  { icon: "🧠", title: "You understand the emotional weight of running a business", body: "You had a stress-related health crisis at Rolls-Royce. You've watched pressure compound on former colleagues. When a client says they can't sleep over a cash flow decision, you understand that in a way that most finance professionals simply don't." },
                  { icon: "💬", title: "People confide in you", body: "Colleagues at Rolls-Royce would confide in you. Not because you asked, but because you listen and you're not there to judge or get ahead of anyone. That's rare in finance." },
                  { icon: "📉", title: "You tell clients what they don't want to hear", body: "You once presented numbers a room full of senior people desperately didn't want to hear. One slammed the desk and walked out. The numbers were still right. That integrity — giving an honest picture even when it's uncomfortable — is what clients actually need." },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, background: "#F9F8F6", border: "1px solid #E0DBD3", borderRadius: 6, padding: "14px 16px" }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{d.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px" }}>{d.title}</p>
                      <p style={{ fontSize: "0.83rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "18px 22px" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 6px" }}>Ben's take</p>
              <p style={{ fontSize: "0.85rem", color: "#3a6048", lineHeight: 1.7, margin: 0 }}>Your positioning is actually very clear once you say it out loud. The challenge isn't a lack of differentiation — it's that you've been underselling it across every touchpoint. The work we're doing now is closing that gap: making sure what people find online matches the version of you they'd actually meet.</p>
            </div>
            <CommentBox clientName="Andy Scott Barrett" tabName="Positioning" slug={slug} />
          </div>
        )}

        {/* ── HEADLINES ── */}
        {activeTab === "headlines" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>LinkedIn Headline</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Headlines</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.6, margin: "0 0 28px" }}>We went through two sessions on headlines. The chosen version is highlighted in green. Others are kept for reference.</p>

            <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase", letterSpacing: "0.08em" }}>Revised A</span>
                <span style={{ background: "#edf4ef", color: ASB_COLOR, border: `1px solid #c2dbc9`, borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", letterSpacing: "0.05em" }}>✓ Chosen — Session 3</span>
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#9CA3AF" }}>179 chars</span>
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", lineHeight: 1.5, margin: "0 0 12px" }}>"I turn financial data into decisions — the bit your accountant isn't there to do | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce"</p>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>Andy's reaction: "I really like that. Hard hitting, right?" — Keeps the accountant distinction but frames it as a gap, not a criticism. Opens with the outcome (decisions), not the job title.</p>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 8, padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7A746E", textTransform: "uppercase", letterSpacing: "0.08em" }}>Option 3</span>
                <span style={{ background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A", borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", letterSpacing: "0.05em" }}>Chosen — Session 2 (superseded)</span>
                <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#9CA3AF" }}>183 chars</span>
              </div>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "#7A746E", lineHeight: 1.5, margin: "0 0 12px" }}>"Your accountant keeps you compliant. I help you grow | Fractional Finance Director for UK SMEs | Ex-Rolls-Royce | Turning financial clarity into better decisions"</p>
              <p style={{ fontSize: "0.82rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>Set aside in Session 3 — Andy's concern that the first line could be read as implying the accountant doesn't help you grow. The Revised A version addresses this more cleanly.</p>
            </div>

            <div style={{ borderTop: "1px solid #E0DBD3", margin: "28px 0 20px", paddingTop: 20 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>Other options considered</p>
              {[
                { label: "Option 1", chars: "178", text: '"I help SME owners turn their numbers into decisions, not just reports | Ex-Rolls-Royce Finance | The financial direction your accountant was never meant to give you"' },
                { label: "Option 2", chars: "196", text: '"Fractional Finance Director for SMEs | 20 years at Rolls-Royce | I turn your financial data into decisions that grow your business, without the cost of a full-time FD"' },
                { label: "Option 4", chars: "196", text: '"Left Rolls-Royce after 20 years to give SME owners what big corporates take for granted: a Finance Director who actually helps them run the business | Fractional FD"' },
                { label: "Revised B", chars: "191", text: '"Helping UK SME owners make better decisions with their numbers | Fractional Finance Director | 20 years at Rolls-Royce | The financial strategy your business hasn\'t had yet"' },
              ].map((h, i) => (
                <div key={i} style={{ background: "#F9F8F6", border: "1px solid #E0DBD3", borderRadius: 6, padding: "14px 18px", marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h.label}</span>
                    <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{h.chars} chars</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.5, margin: 0 }}>{h.text}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #E0DBD3", margin: "28px 0 20px", paddingTop: 20 }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px" }}>LinkedIn Banner — Chosen</p>
              <div style={{ background: "#1a3a6b", borderRadius: 8, padding: "28px 32px", marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Turning your numbers into decisions, not just reports</p>
                <p style={{ color: "#cbd5e1", fontSize: "0.92rem", margin: 0 }}>I give you the financial direction you don't get from your accountant</p>
                <p style={{ color: "#cbd5e1", fontSize: "0.92rem", margin: 0 }}>For UK SME owners who want to run their business properly</p>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>Session 3 decision — Banner Option 1, flipped so "Turning your numbers into decisions, not just reports" leads as the strongest hook. Copy ready to paste into LinkedIn.</p>
            </div>
            <CommentBox clientName="Andy Scott Barrett" tabName="Headlines" slug={slug} />
          </div>
        )}

        {/* ── ABOUT SECTION ── */}
        {activeTab === "about" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>LinkedIn About Section</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>About Section</h2>
            <div style={{ background: "#edf4ef", border: `1px solid #c2dbc9`, borderRadius: 8, padding: "14px 18px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: ASB_COLOR, margin: "0 0 4px" }}>✓ Finalised — Session 3 · 15 April 2026</p>
              <p style={{ fontSize: "0.83rem", color: "#3a6048", margin: 0 }}>Final version compacted to ~1,550 characters. Ready to copy and paste into LinkedIn. Navigate to your profile → Edit intro → About → paste below.</p>
            </div>

            <div style={{ background: "#fff", border: `2px solid ${ASB_COLOR}`, borderRadius: 8, padding: "36px 40px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 20px" }}>Final Version — Copy this into LinkedIn</p>
              <div style={{ fontSize: "0.97rem", lineHeight: 2, color: "#3D3935", display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ margin: 0 }}>Does this sound familiar?</p>
                <p style={{ margin: 0 }}>Your accountant sends the accounts… you glance at the numbers.</p>
                <p style={{ margin: 0 }}>You're not really sure what to do with them. So you carry on, making the big calls on gut feel and hoping for the best.</p>
                <p style={{ margin: 0 }}>You're not doing anything wrong. Your accountant is doing exactly what they're supposed to do.</p>
                <p style={{ margin: 0 }}>The problem is, reporting what happened isn't the same as helping you run the business.</p>
                <p style={{ margin: 0, marginTop: 8 }}>That's the gap I fill.</p>
                <p style={{ margin: 0 }}>👋 I'm Andy — a Fractional Finance Director and CFO for UK SMEs, which in plain English means I'm the person who takes your financial data and turns it into actual decisions around pricing, growth plans, cash flow, capital purchases, whether that new product is worth pursuing, or whether you're ready for investment or funding.</p>
                <p style={{ margin: 0, marginTop: 8 }}>I spent 20 years at Rolls-Royce stress-testing business cases on jet engines — working directly with engineers, sales directors and management teams, not in the boardroom. I made the decision to leave at 40 to do work where you can actually feel the difference it makes.</p>
                <p style={{ margin: 0, marginTop: 8 }}>I work with a small number of retained clients at a time, typically UK SME owners turning over between £500k and £10m, who have their accounting covered but want someone to help them actually use the numbers to run the business effectively.</p>
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

            <div style={{ background: "#F9F8F6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 22px" }}>
              <p style={{ fontSize: "0.82rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#1C1C1C" }}>To upload:</strong> Copy the text above. On LinkedIn, go to your profile → click the pencil icon on your intro → scroll to About → paste. Remove the 👉 emoji if it doesn't render cleanly on mobile. Check character count in LinkedIn's editor — should sit comfortably within the 2,600 limit.
              </p>
            </div>
            <CommentBox clientName="Andy Scott Barrett" tabName="About Section" slug={slug} />
          </div>
        )}

        {/* ── CONTENT IDEAS ── */}
        {activeTab === "content" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>3-Month Content Strategy</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Content Ideas</h2>
            <p style={{ fontSize: "0.88rem", color: "#7A746E", lineHeight: 1.7, margin: "0 0 8px" }}>2 posts a week — one mid-week personal post, one Friday expertise post. Each card below has the hook, the direction, questions to answer before you write, and a CTA. Set the 30-minute timer and go.</p>
            <div style={{ background: "#fdf4e8", border: "1px solid #f5d89e", borderRadius: 8, padding: "12px 16px", marginBottom: 24 }}>
              <p style={{ fontSize: "0.83rem", color: "#92400E", margin: 0 }}><strong>The rule:</strong> Past 30 minutes you're making silly tweaks. You said it yourself. Post and move on.</p>
            </div>

            {[
              {
                week: "Week 1 · Mid-week", type: "Personal", bold: "2/5", title: "There Were References to Martin Lewis in My Wedding Speech",
                hook: "Apparently I've always been this way. I didn't choose finance because of a career plan. It was just always the thing I was interested in — probably to the mild irritation of people around me.",
                direction: "A warm, light, self-deprecating post. The Martin Lewis wedding speech reference is the hook — use it. Keep it human and slightly funny. This is an introduction post for people who don't know you yet. End on why that lifelong interest in money and numbers translates into something genuinely useful for business owners — not just knowing the theory, but caring about it.",
                questions: "What's the earliest memory you have of being interested in money? What did the best man's speech actually say? How has that trait shown up in ways that weren't always useful?",
                cta: '"Are you someone who naturally gets into the numbers — or do you do everything you can to avoid them?"',
                drafted: true,
              },
              {
                week: "Week 1 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: The Money's There. But Is It Actually Yours?",
                hook: "The bank balance looks healthy. You feel okay. But there's a VAT bill coming, corporation tax due in a few months, and a supplier invoice you'd half-forgotten about. That money in your account isn't all yours.",
                direction: "The hidden claims on your bank balance — HMRC, committed supplier costs, pre-sold revenue not yet delivered. A simple worked example. No jargon. End on what to do about it.",
                questions: "What are the most common hidden claims on cash that catch owners out? What's the simplest way to work out what you can actually spend? Have you seen someone spend tax money?",
                cta: '"Before you make your next big spend — do you know what\'s already committed from that balance?"',
                drafted: false,
              },
              {
                week: "Week 2 · Mid-week", type: "Personal", bold: "3/5", title: "My Boss Told Me My Job Was Safe. I Remember Thinking: That's Not Good News.",
                hook: "For years I'd told myself 40 was the number. Not as a wish. As a plan. When my boss called me in and told me my job was safe, I sat there thinking: that's not the news I wanted.",
                direction: "The deliberate exit at 40 — not a redundancy, not a crisis, a decision that had been forming for years. The detail that makes this post: last day was exactly 20 years to the day from day one. Don't make it inspirational. Make it honest.",
                questions: "When did you first know 40 was the number? What had been stopping you before? What did the last morning feel like? What do you know now that you wish you'd known?",
                cta: '"Is there something you already know the answer to — but haven\'t done anything about yet?"',
                drafted: false,
              },
              {
                week: "Week 2 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: Discounting by 10% Might Mean You Need to Sell 200% More Just to Break Even",
                hook: "Offering a 10% discount feels like a small thing. On a low-margin product or service, recovering that in extra volume can require selling 200% more than you were before. All you've done is made yourself busier for less money.",
                direction: "From your networking talk — one of the sharpest, most counterintuitive insights in your toolkit. Walk through a simple worked example: a business with 20% gross margin discounts 10% — show what happens to the volume required. Acknowledge discounting is sometimes right — but it should be a considered decision, not a default.",
                questions: "What gross margin % to use for the example? What do owners say when you show them this maths? When is discounting actually the right call?",
                cta: '"Next time a customer asks for a discount — do you know what you\'d need to sell more of to make up for it?"',
                drafted: false,
              },
              {
                week: "Week 3 · Mid-week", type: "Personal", bold: "2/5", title: "They Sent Me to Beijing at 25",
                hook: "I was 25. My employer sent me to Beijing for a year. I knew maybe 20 words of Mandarin. The finance operation I'd been sent to sort out was, to put it politely, held together with goodwill and optimism.",
                direction: "Landing somewhere unfamiliar, finding a mess, building structure from scratch in a place where you didn't speak the language. The connection to now: most SME finance operations look a bit like that Beijing office. The thing you came away with: confidence that you can turn your hand to things.",
                questions: "What did it look like when you arrived — the actual state of the operation? What was the first thing you changed? How did you earn the local team's trust? What did you come back with that you didn't go with?",
                cta: '"Most of the businesses I work with have never had anyone look properly at their finances. When did you last take a proper look at yours?"',
                drafted: false,
              },
              {
                week: "Week 3 · Friday", type: "Expertise", bold: "2/5", title: "Finance Simplified: One of Your Products Is Carrying the Rest. Do You Know Which One?",
                hook: "Overall, the business looks profitable. But break it down by product or service and a different picture appears. One is doing the heavy lifting. A couple are barely covering their costs. And one might actually be losing money.",
                direction: "Separate from the break-even concept — this is about diagnosis and what you do with the information. Use the current client example (anonymised) who thought they knew their gross margin but didn't. You can use the Lego parallel here.",
                questions: "What's the most common reaction when you show an owner the product-level breakdown for the first time? What do businesses typically do with this? Are there legitimate reasons to keep a loss-making product?",
                cta: '"Do you know which of your products or services is your most profitable — not the one that sells the most, but the one that actually makes you the most money?"',
                drafted: false,
              },
              {
                week: "Week 4 · Mid-week", type: "Personal", bold: "2/5", title: "She Could Finally Sleep",
                hook: "She ran a good business. Investors kept asking questions about cash flow. She knew the answers — she just couldn't get to them fast enough, and it was grinding her down.",
                direction: "A client story post — told as a moment, not a case study. Once cash planning was sorted and she had clear answers ready, she said she wasn't on her own anymore — and could sleep better. Keep her anonymous. The transformation isn't the spreadsheet — it's the weight that lifted.",
                questions: "What was the early atmosphere like — stressed, resigned, exhausted? What was the first thing that changed once planning was in place? What did 'sleeping better' actually look like in her day-to-day?",
                cta: '"Financial pressure is a weight most business owners carry alone. You don\'t have to."',
                drafted: false,
              },
            ].map((idea, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: idea.drafted ? `3px solid ${ASB_COLOR}` : "1px solid #E0DBD3", borderRadius: 8, padding: "20px 24px", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ background: idea.type === "Personal" ? "#EEF2FF" : "#F0FDF4", color: idea.type === "Personal" ? "#4338CA" : ASB_COLOR, border: `1px solid ${idea.type === "Personal" ? "#C7D2FE" : "#c2dbc9"}`, borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{idea.week}</span>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1C1C1C", margin: 0 }}>{idea.title}</p>
                  <span style={{ fontSize: "0.72rem", color: "#9CA3AF", marginLeft: "auto" }}>{idea.type} · Bold: {idea.bold}</span>
                  {idea.drafted && <span style={{ background: "#edf4ef", color: ASB_COLOR, border: `1px solid #c2dbc9`, borderRadius: 9999, fontSize: "0.65rem", fontWeight: 700, padding: "2px 10px" }}>Draft written</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, color: ASB_COLOR, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>🪝 The Hook</p>
                    <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{idea.hook}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#7A746E", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>🧭 Direction</p>
                    <p style={{ fontSize: "0.85rem", color: "#3D3935", lineHeight: 1.6, margin: 0 }}>{idea.direction}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>❓ Questions first</p>
                    <p style={{ fontSize: "0.85rem", color: "#7A746E", lineHeight: 1.6, margin: 0 }}>{idea.questions}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>📣 CTA</p>
                    <p style={{ fontSize: "0.85rem", color: "#7A746E", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{idea.cta}</p>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: "#F9F8F6", border: "1px solid #E0DBD3", borderRadius: 8, padding: "18px 22px", marginTop: 8 }}>
              <p style={{ fontSize: "0.83rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>Weeks 5–12 content ideas are in development and will be added after Session 4. The first four weeks are enough to establish the rhythm and prove the model.</p>
            </div>
            <CommentBox clientName="Andy Scott Barrett" tabName="Content Ideas" slug={slug} />
          </div>
        )}

        {/* ── BEN'S RECOMMENDATIONS ── */}
        {activeTab === "recs" && (
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: ASB_COLOR, margin: "0 0 6px" }}>From Ben</p>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1C1C1C", margin: "0 0 28px", letterSpacing: "-0.02em" }}>Ben's Recommendations</h2>

            {[
              {
                num: "01",
                title: "The 30-minute rule is non-negotiable",
                body: "You know you overthink. You've acknowledged it, you've even added a reminder to your Claude project about it. Past 30 minutes you're making silly tweaks that don't improve the post — they just delay it. Set the timer. When it goes off, read it once more, post it, and move on. The audience doesn't see your doubt. They just see whether you showed up.",
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
                title: "The personal posts are not optional",
                body: "The Friday finance expertise posts build credibility. The mid-week personal posts build trust. You need both. An SME owner hiring a retained FD is hiring a relationship as much as a service — and they'll check your LinkedIn before they reach out. The personal posts are what make you a person rather than a finance professional. The Martin Lewis one is the right way in.",
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
