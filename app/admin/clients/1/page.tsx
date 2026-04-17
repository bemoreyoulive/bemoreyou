"use client";

import ClientLayout from "@/components/ClientLayout";
import TodoList from "@/components/TodoList";

const tabs = [
  { id: "home", label: "Home" },
  { id: "todos", label: "To-Do" },
  { id: "positioning", label: "Positioning" },
  { id: "headlines", label: "Headlines" },
  { id: "about", label: "About Section" },
  { id: "content", label: "Content Ideas" },
  { id: "messaging", label: "Messaging" },
  { id: "goals", label: "Goals" },
];

const todos = [
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
];

const sackSally = [
  { headline: "You Started A Business For Freedom. So Why Can't You Leave?", copy: "Most people start a business because of freedom... But I keep speaking to founders who can't take a week off without the business quietly wobbling... That's not a people problem. That's a systems problem. And it's exactly the kind of thing I fix.", cta: "If you couldn't step away from your business for two weeks without it feeling risky — let's talk about what that's actually costing you." },
  { headline: "Stop Paying Humans To Copy & Paste", copy: "If someone in your business is exporting CSVs, updating spreadsheets, and re-entering data into another system — that's exactly the kind of process I automate. Humans shouldn't be acting as API connectors.", cta: "" },
  { headline: "Your Finance Department Shouldn't Be Awkward Emails", copy: "If someone is manually checking overdue invoices and sending reminder emails — that's exactly the sort of workflow I automate. Software can chase politely. Consistently. Without emotion.", cta: "" },
  { headline: "Onboarding Shouldn't Feel Like Panic", copy: "New client signs, and someone has to create folders, send welcome emails, set up Slack, update the CRM, build tasks — every single time. If onboarding relies on memory, it's fragile. Repeatable beats heroic burnout.", cta: "" },
  { headline: "Stop Building Monday Morning PowerPoints", copy: "If someone spends Monday morning pulling metrics into slides and taking screenshots — that's exactly the sort of reporting workflow I automate. Dashboards don't get tired. Screenshots are not infrastructure.", cta: "" },
  { headline: "Your Business Is Not A Google Sheet", copy: "If your entire operation lives inside one giant spreadsheet — that's exactly the kind of fragility I fix. One accidental delete shouldn't break your business. Infrastructure beats improvisation.", cta: "" },
  { headline: "Your Business Shouldn't Break When Someone Goes On Holiday", copy: "If the whole operation quietly wobbles every time someone takes leave, that's a systems problem — not a people problem.", cta: "" },
  { headline: "Your Founder Shouldn't Be Your IT Department", copy: "If you're the one who knows how everything connects, what gets done and in what order — you haven't built a business yet. You've built a job that depends entirely on you.", cta: "" },
  { headline: "Your Onboarding Manual Shouldn't Be A Person", copy: "If the only way a new starter learns how things work is by sitting with Sally for three days — that knowledge is a liability, not an asset.", cta: "" },
  { headline: "Your Sales Process Shouldn't Start From Scratch Every Time", copy: "If every proposal, every quote, every client pack is built manually from scratch — that's not bespoke. That's slow. And it's exactly the kind of process I automate.", cta: "" },
  { headline: "Your Comms Tools Aren't Your Workflow", copy: "If the answer to 'where does that live?' is always 'in Slack' or 'I'll send you a message' — your workflow isn't a workflow. It's a memory game.", cta: "" },
];

export default function AndyFeltonDashboard() {
  return (
    <ClientLayout clientName="Andy Felton" clientRole="Founder, Equate Digital" tabs={tabs}>
      {(activeTab) => (
        <>
          {activeTab === "home" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Andy Felton</h2>
                <p className="text-gray-400 text-sm">Founder, Equate Digital · Session 8 of 8 completed · East Midlands</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Sessions", value: "8" },
                  { label: "Started", value: "Dec 2025" },
                  { label: "Status", value: "Active", green: true },
                ].map((s, i) => (
                  <div key={i} className="border border-gray-100 p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className={`text-sm font-medium mt-1 ${s.green ? "text-green-500" : "text-gray-900"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-gray-100 p-5 space-y-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Session 8 Summary</p>
                <p className="text-sm text-gray-600 leading-7">Andy builds automations and AI-powered systems for growing businesses. He pivoted from bespoke software development (RunBritain, SwimEngland, England Golf) into AI/automation in early 2025. Three months in: positioning is largely resolved, content is resonating, conversations are happening. The sticking point is converting the first properly-aligned client — a commercial and psychological milestone.</p>
                <p className="text-sm text-gray-600 leading-7">Key focus: offer clarity first via AI/automation coach (Guy Last), niche research quality improvement, email domain warm-up. Content direction: SACK SALLY shifted to owner-absence angle, bold contrarian differentiator post next in queue.</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Core Positioning Insight</p>
                <div className="border-l-2 border-gray-900 pl-5">
                  <p className="text-sm text-gray-700 leading-7 italic">"Implementation matters more than the idea. Most selling in this space happens at the idea level. Andy works at the delivery level — where things actually fail. That's where he's different."</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Gap to Close</p>
                <div className="border border-amber-100 bg-amber-50 p-4">
                  <p className="text-sm text-amber-800 leading-6">No social proof in the new niche yet. Credibility from RunBritain, SwimEngland, and England Golf is real but needs translation to current context. The first aligned client is the unlock — everything else follows from there.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "todos" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-light text-gray-900 mb-1">To-Do List</h2>
                <p className="text-sm text-gray-400">Actions from Session 8 (April 2026).</p>
              </div>
              <TodoList items={todos} />
            </div>
          )}

          {activeTab === "positioning" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Positioning</h2>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Audiences</p>
                <div className="space-y-3">
                  <div className="border border-gray-100 p-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Primary — Growing businesses 1–10 employees</p>
                    <p className="text-sm text-gray-500 leading-6">Founder-led, at the point of scaling from first hire to building a proper team. Processes are breaking under growth pressure. Spreadsheets have become a liability. The founder knows it's unsustainable but doesn't know what to replace it with.</p>
                  </div>
                  <div className="border border-gray-100 p-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Secondary — Consultants/agencies needing a trusted implementor</p>
                    <p className="text-sm text-gray-500 leading-6">As a delivery partner. They sell the strategy; Andy builds the actual thing.</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Good Fit</p>
                <ul className="space-y-2">
                  {["Recognises they have process problems (not defensive about it)", "Has budget and is ready to invest in a fix", "Respects expertise and doesn't want cheap", "Values honesty over a polished pitch", "Open to being educated, not just sold to"].map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-green-400 shrink-0">✓</span>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Poor Fit</p>
                <ul className="space-y-2">
                  {["Charities (no budget)", "Solopreneurs (no budget, often not ready)", "Clients who want 'clever' without caring if it works long-term", "People who don't respect expertise", "Anyone who drains him socially"].map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500"><span className="text-red-300 shrink-0">✕</span>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Differentiators</p>
                <div className="space-y-3">
                  {[
                    { d: "You implement. You don't just advise.", note: "\"I'm an implementor. I go in and do it.\" Most AI/automation consultants are advisors. Andy builds the actual thing." },
                    { d: "You won't over-promise", note: "He'd rather be honest and lose the client. Walked away from clients who expected unrealistic timelines. In a space full of magic-sellers, this is genuinely distinctive." },
                    { d: "You think before you build", note: "\"Whilst anyone can create automations and apps, the question is whether they should.\" He questions whether it should be built at all — rare in this space." },
                    { d: "Deeply technical, not just technically literate", note: "20 years complex delivery. N8N contributor. Not using Zapier templates — building proper systems that hold up under real-world use." },
                    { d: "Your systems have been running 10–15 years — theirs haven't", note: "RunBritain, SwimEngland, England Golf. He understands what it takes to build something that doesn't break. An earned differentiator, not a claim." },
                  ].map((d, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{d.d}</p>
                      <p className="text-sm text-gray-500 leading-6">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "headlines" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">LinkedIn Headlines</h2>
              <p className="text-sm text-gray-400">Working versions — problem-first, Sheldon persona emerging. Not finalised.</p>
              <div className="space-y-3">
                {[
                  { text: "I automate the fragile manual processes holding your business together — before they break you | AI & Automation | East Midlands", note: "Problem-first. Clear outcome. Geographic anchor." },
                  { text: "Whilst anyone can build automations, the question is whether they should | AI & Automation for growing businesses | Equate Digital", note: "Leads with the philosophy — the contrarian differentiator. Memorable." },
                  { text: "The 'Sheldon' of AI & Automation | I build systems that actually hold up | Growing businesses, East Midlands", note: "Persona-first. Bold. Will polarise — right people will click." },
                  { text: "I'm an implementor, not a consultant | AI & Automation that works in the real world | Equate Digital", note: "\"Implementor, not consultant\" is the single sharpest thing Andy says about himself." },
                ].map((h, i) => (
                  <div key={i} className="border border-gray-100 p-4">
                    <p className="text-sm font-medium text-gray-800 italic mb-2">"{h.text}"</p>
                    <p className="text-xs text-gray-400">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">About Section</h2>
              <div className="border border-gray-100 p-5">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Current working version</p>
                <div className="text-sm text-gray-700 leading-7 space-y-3">
                  <p>Typically businesses come to me when they're being held together by manual processes, workarounds, and people quietly filling in the gaps.</p>
                  <p>It works — until it doesn't. And when it stops working, it usually stops all at once.</p>
                  <p>I'm Andy. I build automations and AI-powered systems for growing businesses — the kind that actually hold up under real-world pressure, not just in a demo.</p>
                  <p>I've been building complex systems for over 20 years. Platforms for RunBritain (UK Athletics), BUCScore (BUCS), OMS (SwimEngland), and the Golf Handicapping system for England Golf. These ran reliably for 10–15 years. Not because they were clever. Because they were built properly.</p>
                  <p>I pivoted into AI and automation in early 2025. The tools are new. The thinking isn't.</p>
                  <p>If your business is scaling faster than your processes can handle — and you need someone who'll tell you what will actually work, not just what sounds good — let's talk.</p>
                </div>
              </div>
              <div className="border border-gray-100 p-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Key line — use this everywhere</p>
                <p className="text-sm text-gray-700 italic">"Typically businesses come to me when they're being held together by manual processes, workarounds, and people quietly filling in the gaps."</p>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Content Ideas — SACK SALLY Series</h2>
              <div className="border border-amber-50 bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-700 uppercase tracking-widest mb-1">Session 8 direction</p>
                <p className="text-sm text-amber-800 leading-6">Shift SACK SALLY to focus on the owner's absence — the biggest point of failure in the business isn't Sally, it's when the <em>owner</em> can't step away. Hook: "You started a business because of freedom. But right now, you ain't living that dream." More emotional, less accusatory, still positions Andy's work as the fix. Interspace with personal/story posts.</p>
              </div>
              <div className="space-y-4">
                {sackSally.map((s, i) => (
                  <div key={i} className={`border-l-2 border-orange-300 bg-orange-50 border border-orange-100 p-4`}>
                    <p className="text-sm font-medium text-gray-900 mb-2">"{s.headline}"</p>
                    <p className="text-sm text-gray-600 leading-6">{s.copy}</p>
                    {s.cta && <p className="text-xs text-gray-400 mt-3 italic">CTA: {s.cta}</p>}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Other Messaging Angles</p>
                <div className="space-y-3">
                  {[
                    { angle: "Implementor, not consultant", note: "\"I'm an implementor. I go in and do it.\" Sharp differentiator. Use in intro posts and in networking." },
                    { angle: "The Sheldon persona", note: "Unsolicited label from Keith Walker — earned, not manufactured. 'Sheldon says' as a recurring device. Lean into it deliberately." },
                    { angle: "Major project credibility", note: "RunBritain, SwimEngland, England Golf. Translate to current context: complexity, reliability, long-term thinking." },
                    { angle: "Autism as positioning asset", note: "Not trauma narrative — explanation of why he works the way he does. Thinks in systems. Doesn't skip edge cases. Prefers thorough over fast. These are features." },
                    { angle: "The bold contrarian differentiator", note: "\"Most people in this space took a course. I've been building systems for 10–15 years. They're not the same thing.\" Session 8: confirmed strong, specific, ownable. Andy should write this post." },
                    { angle: "The vibe-coding risk angle", note: "Non-technical people building systems they can't audit — security issues, accessibility failures, code that changes things it shouldn't. Andy is the person who can see what they can't. Ruth Wiseman story." },
                  ].map((m, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{m.angle}</p>
                      <p className="text-sm text-gray-500 leading-6">{m.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "messaging" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Messaging</h2>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Discovery Call Framework</p>
                <div className="space-y-3">
                  {[
                    { label: "Opening questions", items: ["What processes in your business currently take up the most time?", "Where does work tend to get stuck or slow down?", "Are there any manual tasks your team constantly complains about?", "If you could automate one thing tomorrow, what would it be?"] },
                    { label: "If they reached out to Andy", items: ["Why now? What made you reach out to me?", "What's going on in your business right now that prompted you to message me?", "What makes you think I'm the person to help you? (confident version — Andy has permission to use this)"] },
                  ].map((f, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{f.label}</p>
                      <ul className="space-y-2">
                        {f.items.map((q, j) => (
                          <li key={j} className="text-sm text-gray-500 italic border-l-2 border-gray-100 pl-3">"{q}"</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="border border-gray-100 p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">The close</p>
                    <p className="text-sm text-gray-600 italic">"So what I'm hearing is you're struggling with X, Y, and Z challenge right now in your business. Is that something you need help with?"</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-500">→ Shut up. Don't fill the silence.</p>
                      <p className="text-sm text-gray-500">→ If yes: "Would you like to know how I typically work with my clients?" (NOT "Would you like to know how I can help you")</p>
                      <p className="text-sm text-gray-500">→ Finish with full package price. Do not fill the silence.</p>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Objection handling</p>
                    <p className="text-sm text-gray-600 leading-6"><span className="font-medium">"I'm sorting it myself."</span> → "OK, how much time is that taking you away from your business? What could you be doing instead?"</p>
                    <p className="text-sm text-gray-600 leading-6 mt-2"><span className="font-medium">"Cost is too much right now."</span> → "I totally understand — but what's the cost of not taking action? Because what I'm hearing is you're drained/tired/overwhelmed…"</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Key Quotes to Use</p>
                <div className="space-y-2">
                  {[
                    '"Whilst anyone can create automations and apps, the question is whether they should."',
                    '"I\'d rather be honest and lose the client than knowingly over-promise."',
                    '"It feels like the LinkedIn is actually speaking to somebody rather than just throwing against the wall."',
                    '"If your agency runs on spreadsheets, workarounds, and outdated systems, we should probably talk."',
                    '"This is plumbing. Not magic."',
                  ].map((q, i) => (
                    <p key={i} className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-4 py-1">{q}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-8">
              <h2 className="text-xl font-light text-gray-900">Goals</h2>

              <div className="border border-gray-900 p-5">
                <p className="text-xs font-medium text-gray-900 uppercase tracking-widest mb-2">Priority #1</p>
                <p className="text-sm text-gray-600 leading-7">Land the first aligned implementation client in AI/automation. This is both a commercial milestone and a psychological one — it unlocks proof, confidence, and momentum. Do not push outreach until offer clarity and niche research are complete.</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">LinkedIn Goals</p>
                <ul className="space-y-2">
                  {["2 posts per week — non-negotiable baseline", "Content that speaks to somebody rather than throws against the wall", "Build authentic photo library — holiday photos first", "Continue narrowing the gap between Andy's drafts and final copy", "Start using 'Sheldon says' as a recurring content device"].map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-gray-300 mt-1">→</span>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Networking Goals</p>
                <ul className="space-y-2">
                  {["2 networking events per week — non-negotiable baseline", "Rework networking intro to lead with problem/outcome, not AI/automation", "Develop David Maguire partnership — likely converting May", "East Midlands Chamber + AI networking as priority events"].map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600"><span className="text-gray-300 mt-1">→</span>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">What Good Looks Like in 6 Months</p>
                <div className="border border-gray-100 p-5 space-y-2 text-sm text-gray-600 leading-7">
                  <p>2–3 aligned AI/automation clients in professional services (recruitment, finance, accounting).</p>
                  <p>A LinkedIn presence that is genuinely speaking to someone — not throwing against the wall.</p>
                  <p>Offer clarity: a defined niche, a defined outcome, a defined price. Outreach that is targeted, not scattered.</p>
                  <p>Email outreach domain warmed up and active sequence running.</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </ClientLayout>
  );
}
