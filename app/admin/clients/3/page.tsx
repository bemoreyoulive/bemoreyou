"use client";

import ClientLayout from "@/components/ClientLayout";
import TodoList from "@/components/TodoList";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "todos", label: "To-Do" },
  { id: "goals", label: "Goals" },
  { id: "positioning", label: "Positioning" },
  { id: "messaging", label: "Messaging" },
  { id: "content", label: "Content Ideas" },
  { id: "platform", label: "Platform & Products" },
];

const todos = [
  { id: "t1", text: "HushAway Pod — first school placement in Huddersfield, Friday 11 April. Set up case study framework for the 2-month placement.", owner: "Nikki" },
  { id: "t2", text: "Hire marketing assistant — post job on LinkedIn (Friday 10 April). ~15 hrs/week. Consider digital marketing student from Kingston University or parent on maternity leave.", owner: "Nikki" },
  { id: "t3", text: "Email strategy — send from Nikki personally, not HushAway brand. Lead with personal story, not expert content. Prioritise 65-person warm list over 25,000 cold addresses.", owner: "Nikki" },
  { id: "t4", text: "SEO maintenance — weekly check now agency has left.", owner: "Nikki" },
  { id: "t5", text: "May content shift — move from 70% expert / 30% personal toward 50/50 or 60/40 personal. Windsor.ai confirmed founder reels outperform everything.", owner: "Nikki" },
  { id: "t6", text: "Set up Aweber email automation — Lue and Jack confirmed paying themselves but this is Nikki's own version. Build email sequence from existing templates.", owner: "Nikki" },
  { id: "t7", text: "Troll comment follow-up post — screenshot 'Perhaps you need to continue getting your hair and nails done' and build a dedicated post from it.", owner: "Nikki" },
  { id: "t8", text: "Explore HeyGen AI avatar option — resolve tension with HushAway's real-content positioning before committing.", owner: "Nikki" },
  { id: "t9", text: "Research VA companies — needs someone who can do engagement (reply to comments, follow up with interested parents), not just scheduling.", owner: "Nikki" },
  { id: "t10", text: "Email Colby to intro Nikki for strategic conversation (not tactical).", owner: "Ben" },
  { id: "t11", text: "Restructure dashboard content ideas into May week-by-week plan.", owner: "Ben" },
  { id: "t12", text: "Drop to 3 posts/week from May (down from current higher volume).", owner: "Nikki" },
];

export default function NikkiDashboard() {
  return (
    <ClientLayout clientName="Nikki McReynolds" clientRole="Founder, HushAway & The PeacePath" tabs={tabs}>
      {(activeTab) => (
        <>
          {activeTab === "overview" && (
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Nikki McReynolds</h2>
                <p className="text-gray-400 text-sm">Founder, HushAway® & The PeacePath® · 11 sessions (Nov 2025 – Apr 2026)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-gray-100 p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Sessions</p>
                  <p className="text-2xl font-light text-gray-900">11</p>
                </div>
                <div className="border border-gray-100 p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Phase</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Phase 2 — Conversion</p>
                </div>
                <div className="border border-gray-100 p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-medium text-green-500 uppercase tracking-widest mt-1">Active</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Who She Is</h3>
                <p className="text-sm text-gray-600 leading-7">Nikki McReynolds (also known professionally as Nicola Maria Rose) is a 55-year-old founder based in East Molesey, Surrey. She has built an unusually broad career — nursery owner, corporate trainer, coach, voiceover artist — and is now channelling all of that into HushAway®, a sound-based emotional regulation platform for children aged 4–10 and their parents.</p>
                <p className="text-sm text-gray-600 leading-7 mt-3">HushAway launched on 17 March 2026. It sits under a master brand called The PeacePath®. Ben is working with Nikki on personal branding, LinkedIn positioning, content strategy, and the overall visibility layer of her business.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Current Online Presence</h3>
                <div className="space-y-3">
                  {[
                    { platform: "LinkedIn", detail: "~5,000 followers. Newsletter: 820+ subscribers. Posts scheduled to end of April via Vista Social. Dropping to 3 posts/week from May." },
                    { platform: "HushAway Platform (Kajabi)", detail: "Fully in Nikki's control. Open Sanctuary tier is free. Paid membership from £14.50/month. No paid members yet." },
                    { platform: "YouTube", detail: "Expert interviews hosted here. Dr. Julia Pereira two-hour interview recently completed; repurposed via Riverside." },
                    { platform: "Website", detail: "In Nikki's full control. SEO in good shape — needs weekly monitoring. 400 audio files loaded into Sound Sanctuary." },
                    { platform: "Email", detail: "65 people on direct warm list (priority). 25,000 purchased cold addresses (5 sign-ups from ~10,000 openers — poor). Currently sent from HushAway brand — Ben recommended sending from Nikki personally." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4 flex items-start gap-4">
                      <p className="text-xs font-medium text-gray-900 uppercase tracking-widest w-28 shrink-0 mt-0.5">{p.platform}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Personality & Quirks</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Warm, direct, driven, emotionally intelligent",
                    "Despondent about metrics but snaps back quickly — real resilience",
                    "Builds networks instinctively — expert circle, festival partnership, PR connections all from her own legwork",
                    "Watches LinkedIn likes as validation even when she knows impressions and newsletter growth are the right signals",
                    "Buys clothes she likes in three colours",
                    "Poached eggs only — hard, not touching the bread",
                    "Loves Maroon 5 / Famous Five fan / grew up on a farm",
                    "Believes in divine timing and spiritual guidance from her late mother",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="text-gray-300 shrink-0">·</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Key Story Moments</h3>
                <div className="space-y-3">
                  {[
                    { chapter: "The nursery (2014–2019)", story: "Ran a 130-child nursery with 30 staff near Hampton Court. A malicious manager spread rumours and reported her to Ofsted with 25 fabricated allegations. The night she laid out tablets and planned to end her life. Woke the next morning with a 'shift' and decided no one was taking her business from her." },
                    { chapter: "Mother's death (2020)", story: "Her mum was her compass and biggest unconditional supporter. Died in 2020. Combined with selling the nursery, selling her flat, a relationship ending, and COVID — Nikki describes 2020 as her most acute year of collapse. Her mum's final words: 'You go out that door and you keep on walking.'" },
                    { chapter: "Portugal sound therapy retreat (Feb 2026)", story: "Two-weekend immersive sound therapy course. First session physically intense — shaking, felt 'possessed,' was in high beta/high cortisol. Came back on a different wavelength. Has been trying to protect mornings and stop working weekends since." },
                    { chapter: "The name change mistake", story: "Changed LinkedIn name to Nicola Maria Rose in 2025 as part of a pivot. Disconnected her from 600+ Saudi followers and Dale Carnegie network who didn't recognise the name. Moving name back to Nikki immediately reactivated engagement from old connections." },
                  ].map((s, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">{s.chapter}</p>
                      <p className="text-sm text-gray-600 leading-6">{s.story}</p>
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
                <p className="text-sm text-gray-400">Actions from Session 11 (April 2026). Phase 2 — priority is now conversion.</p>
              </div>
              <TodoList items={todos} />
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-10">
              <h2 className="text-xl font-light text-gray-900 mb-6">Goals</h2>

              <div className="border border-gray-900 p-5">
                <p className="text-xs font-medium text-gray-900 uppercase tracking-widest mb-2">Priority #1 — Conversion</p>
                <p className="text-sm text-gray-600 leading-7">No paid members yet. Foundation is built. Session 11 direction: Phase 2 begins. Everything now points toward getting paid memberships. Exploring UGC content agency and paid ads.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Commercial Goals</h3>
                <ul className="space-y-2">
                  {[
                    "First paid HushAway members — from £14.50/month or £145/year",
                    "Email sequence converting warm 65-person list first, then cold outreach",
                    "HushAway Pod at school in Huddersfield — 2-month placement → case study → PR",
                    "Hire marketing assistant (~15hrs/week) to offload execution layer",
                    "VA for engagement — not just scheduling (Nikki is the library, the VA is the librarian)",
                  ].map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">→</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">LinkedIn Goals</h3>
                <ul className="space-y-2">
                  {[
                    "Maintain 820+ newsletter subscribers — grow toward 1,000",
                    "Shift content mix for May: 50/50 or 60/40 personal vs. expert",
                    "Drop to 3 posts/week (down from higher volume)",
                    "Windsor.ai confirmed: founder reels get the most views — use this",
                    "Lead with Nikki, not the HushAway brand",
                  ].map((g, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">→</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Long-Term Vision</h3>
                <div className="border-l-2 border-gray-900 pl-5">
                  <p className="text-sm text-gray-600 leading-7 italic">"I want to look back in 10 years and call them the HushAway children."</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "positioning" && (
            <div className="space-y-10">
              <h2 className="text-xl font-light text-gray-900 mb-6">Positioning</h2>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Core Belief</h3>
                <div className="border-l-2 border-gray-900 pl-5 space-y-3">
                  <p className="text-sm text-gray-700 leading-7 italic">"Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness."</p>
                  <p className="text-sm text-gray-700 leading-7 italic">"It's going to be okay."</p>
                  <p className="text-sm text-gray-700 leading-7 italic">"Belonging over fixing."</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Target Audiences</h3>
                <div className="space-y-3">
                  {[
                    { audience: "Primary — parents of 4–10 year olds", detail: "Particularly parents of neurodiverse children (ADHD, autism, sensory processing disorders). Sceptical of or waiting to avoid medication. Feel unseen and unsupported." },
                    { audience: "Secondary — schools", detail: "SENCOs, teachers, special educational needs leads. Underfunded and understaffed; mainstream schools being forced to absorb ND children without adequate support." },
                    { audience: "Tertiary — clinicians & researchers", detail: "Therapists working with children; university partners; advisory circle building." },
                    { audience: "Emerging — home tutors", detail: "One-to-one tutors working with children approved to leave mainstream school. Segment Calm/Headspace won't target specifically." },
                  ].map((a, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{a.audience}</p>
                      <p className="text-sm text-gray-500 leading-6">{a.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Differentiators</h3>
                <ul className="space-y-2">
                  {[
                    "Customisable sound content — because what works for one ADHD child won't work for another",
                    "Advisory Circle of 11+ experts: doctors, scientists, ASMR researchers, sleep practitioners, behavioural therapists, neuro-psychologists",
                    "55+ children across the world (SoundSonic Ambassadors) have tested the content",
                    "Partnership with The Sleep Charity",
                    "Not making medical claims — positioned as holistic, for use alongside or instead of medication",
                    "Addresses parents' needs too, not just the child's",
                    "Content is not cartoonish — treats children as capable of more than being 'kiddified'",
                  ].map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Unique Perspective (and the credibility gap)</h3>
                <div className="border border-amber-50 bg-amber-50 p-5">
                  <p className="text-sm text-amber-800 leading-7">Nikki is neither a parent nor neurodiverse herself. She knows this is a potential credibility gap and has worked to close it through expert partnerships, lived proximity (nursery, coaching, training of thousands of families), and product validation. This requires ongoing positioning work — not a one-off statement.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Strong Opinions to Lead With</h3>
                <ul className="space-y-2">
                  {[
                    "The 'superpower' narrative around ND children is harmful — it excludes neurotypical kids and doesn't acknowledge how hard daily life is for ND families",
                    "Medication is management, not solution — HushAway is the bridge between home and diagnosis",
                    "Every child is different — one-size-fits-all approaches are the real problem",
                    "'Not every day is a superpower day — some days are really messy'",
                  ].map((o, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 border-l-2 border-gray-200 pl-4 py-1">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "messaging" && (
            <div className="space-y-10">
              <h2 className="text-xl font-light text-gray-900 mb-6">Social Media Messaging</h2>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">LinkedIn Headline (current)</h3>
                <div className="border border-gray-100 p-4">
                  <p className="text-sm text-gray-700">"Championing children's emotional regulation & peace through sound & story... | Founder, The PeacePath® & HushAway® | Neurodiversity Coach | Sound Therapy Practitioner | Dale Carnegie Trainer"</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Key Messaging Frames</h3>
                <div className="space-y-3">
                  {[
                    { frame: "The 'push the pause button' frame", notes: "Parents need permission to pause. HushAway gives children somewhere safe so parents can breathe. This came from a parent Nikki overheard — use that exact language." },
                    { frame: "The bridge before diagnosis", notes: "Many families wait years for formal assessment. HushAway is something they can use now, at home, while they wait. Not replacing diagnosis — bridging the gap." },
                    { frame: "Holistic, not clinical", notes: "Parents exhausted by medication decisions need an alternative they can trust. Evidence-backed, expert-endorsed, but not making medical claims." },
                    { frame: "You can't make a one-size solution", notes: "Every child is different. Customisation is a product differentiator and a philosophical stance. Use this as both a positioning statement and a content angle." },
                    { frame: "The unfixed child", notes: "Challenging the 'fix' mentality and the superpower pressure — children deserve safety as they are, not conditional on being exceptional." },
                  ].map((m, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{m.frame}</p>
                      <p className="text-sm text-gray-500 leading-6">{m.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Notable Quotes</h3>
                <div className="space-y-2">
                  {[
                    '"I had an idea and it doesn\'t exist, so I am creating it."',
                    '"It\'s going to be okay." — Her core emotional offer to parents and children',
                    '"I want to push the pause button." — A parent she overheard; became a product-shaping insight',
                    '"HushAway is bigger than stories, meditations, and sounds. That\'s just the conduit."',
                    '"Ego won\'t let me fail."',
                    '"I\'m that friend." — How she describes her relationship with parents',
                  ].map((q, i) => (
                    <p key={i} className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-4 py-1">{q}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-10">
              <h2 className="text-xl font-light text-gray-900 mb-6">Content Ideas</h2>

              <div className="border border-amber-50 bg-amber-50 p-4 mb-6">
                <p className="text-xs font-medium text-amber-700 uppercase tracking-widest mb-1">May direction</p>
                <p className="text-sm text-amber-800 leading-6">Windsor.ai confirmed founder reels and personal posts outperform everything. Shift to 50/50 or 60/40 personal vs. expert for May. 3 posts/week. Ben to build week-by-week plan.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Personal & Story Content (priority for May)</h3>
                <div className="space-y-3">
                  {[
                    { angle: "Nikki's corporate-to-founder arc", notes: "Senior leadership → Dale Carnegie trainer → nursery owner → HushAway founder. The journey resonates with LinkedIn audience and positions her as aspirational to others still stuck." },
                    { angle: "The night she nearly quit", notes: "The nursery. The malicious manager. The Ofsted allegations. The night she laid out tablets. Then woke up and decided: no one is taking this from me. Deeply human. Handled carefully but powerfully." },
                    { angle: "Her mum's final words", notes: "'You go out that door and you keep on walking.' Use when right. Not as grief content — as permission content. For every founder who's been knocked down." },
                    { angle: "The name change lesson", notes: "She changed her LinkedIn name and lost her audience. Changed it back and reactivated them immediately. Honest, useful, relatable for anyone building a personal brand." },
                    { angle: "The Portugal sound retreat", notes: "She went, she shook, it recalibrated her. Why sound? Why this? The founder's personal experience of the thing she's selling." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{p.angle}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Expert & Opinion Content</h3>
                <div className="space-y-3">
                  {[
                    { angle: "The superpower myth", notes: "Not every day is a superpower day — some days are really messy. Challenging the dominant narrative about ND children. Polarising by design — will stop scrolling." },
                    { angle: "The SEN review and what it actually means for parents", notes: "Mainstream schools absorbing ND children without adequate support. What parents need to know right now." },
                    { angle: "Why waiting for a diagnosis doesn't mean waiting to get help", notes: "The bridge before diagnosis — HushAway for families on long NHS waiting lists. Directly relevant to the audience and directly tied to the product." },
                    { angle: "What a HushAway session actually looks like", notes: "Behind the scenes of the platform. Show what parents and children get. Demystify the product." },
                    { angle: "Expert clips from the Dr. Julia Pereira interview", notes: "Two hours of content — repurpose via Riverside into short opinion clips. Use hooks from the strongest moments." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{p.angle}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Messaging Opportunities (underused)</h3>
                <ul className="space-y-2">
                  {[
                    "Lue's personal story as the hook — South Africa, Dubai, Abu Dhabi wedding, now doing payroll in British construction. Nobody else has this story.",
                    "Nikki's journey from corporate to creator — use this as a running thread, not a one-off post",
                    "The legacy frame: 'I want to look back in 10 years and call them the HushAway children' — a powerful, memorable long-term anchor",
                    "The referral pipeline — workers who trust Nikki lead to directors/schools",
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">→</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "platform" && (
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Platform & Products</h2>
                <p className="text-sm text-gray-400">HushAway® under The PeacePath® master brand.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Current Products</h3>
                <div className="space-y-3">
                  {[
                    { name: "HushAway® (live — 17 March 2026)", detail: "Subscription platform. Ages 4–10. ASMR-inspired audio stories, soundscapes, guided affirmations and meditations. Open Sanctuary (free tier) + paid membership from £14.50/month or £145/year. Hosted on Kajabi." },
                    { name: "HushAway PODs", detail: "Physical pods going into schools. First placement: Huddersfield, Friday 11 April 2026. 2-month placement — case study framework needed urgently." },
                    { name: "PeacePacks", detail: "Toolkit for parents and educators. In development/planning." },
                    { name: "Parent-facing strand", detail: "Meditations and tools for parents who need to 'push the pause button'. A product idea shaped by a real parent quote." },
                  ].map((p, i) => (
                    <div key={i} className="border border-gray-100 p-5">
                      <p className="text-sm font-medium text-gray-900 mb-2">{p.name}</p>
                      <p className="text-sm text-gray-500 leading-6">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Future Products (planned)</h3>
                <ul className="space-y-2">
                  {[
                    "Cosmic Calm — ages 11–15 (next in pipeline after HushAway scales)",
                    "16–19 product — scoped but not yet developed",
                    "The PeacePath Project — CIC arm to widen access for under-served communities through grants and school placements",
                  ].map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Strategic Tensions to Watch</h3>
                <div className="space-y-3">
                  {[
                    { tension: "Pushing HushAway vs. leading with Nikki", note: "Ben has repeatedly told Nikki she is 20x more memorable than a business brand. She understands it intellectually but keeps defaulting to brand-forward content." },
                    { tension: "Metrics vs. meaning", note: "She knows LinkedIn likes are vanity metrics and 820+ newsletter subscribers is the real asset. But she still feels despondent when likes are low. This loop needs active management." },
                    { tension: "Volume vs. depth", note: "Currently posting too much heavy expert-led content. That belongs in the newsletter. LinkedIn should be lighter, more personal, more opinionated." },
                    { tension: "Doing it herself vs. outsourcing", note: "One-woman operation at very high intensity. Carrying everything the agency used to handle. She describes herself as 'broken' and 'snowed under' in Session 11. Hire is urgent." },
                  ].map((t, i) => (
                    <div key={i} className="border border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">{t.tension}</p>
                      <p className="text-sm text-gray-500 leading-6">{t.note}</p>
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
