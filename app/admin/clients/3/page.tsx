"use client";

import ClientLayout from "@/components/ClientLayout";
import TodoList from "@/components/TodoList";

const tabs = [
  { id: "home", label: "Home" },
  { id: "todos", label: "To-Do" },
  { id: "positioning", label: "Positioning" },
  { id: "messaging", label: "Messaging" },
  { id: "content", label: "Content Ideas" },
  { id: "recommendations", label: "Ben's Take" },
  { id: "goals", label: "Goals" },
];

const todos = [
  { id: "t1", text: "HushAway Pod — travel to Huddersfield Friday, meet the head teacher, get it set up. Build a simple case study framework for the 2-month placement.", owner: "Nikki" },
  { id: "t2", text: "Post LinkedIn job ad Friday — marketing assistant, ~15 hrs/week, email campaigns + content scheduling. Keep it open: \"email me if interested, we'll build the spec together\"", owner: "Nikki" },
  { id: "t3", text: "Switch outgoing emails to send from Nikki (not HushAway) — open rates will improve immediately. Lead the next email with your personal story, not expert content.", owner: "Nikki" },
  { id: "t4", text: "Expect an introduction from Colby — Ben has already made contact. Take the call, it's worth your time.", owner: "Nikki" },
  { id: "t5", text: "Explore UGC agency and paid ads agencies — meetings already booked. The goal: identify the fastest route to paid conversions.", owner: "Nikki" },
  { id: "t6", text: "Hire a social media VA (not a full agency) — ~£20/hr, 15 hrs/week. They create content, schedule, engage with comments, and follow up with interested parents. You are the library. They are the librarian.", owner: "Nikki" },
  { id: "t7", text: "Check SEO weekly — now you're managing the website yourself. If rankings drop, it's expensive to rebuild.", owner: "Nikki" },
  { id: "t8", text: "Use the May LinkedIn plan in the Content Ideas tab — copy the prompt for each week straight into your Claude and generate the post. Done in minutes.", owner: "Nikki" },
  { id: "t9", text: "Drop to 3 posts/week on Instagram, Facebook, TikTok from 1 May — quality over volume. Windsor.ai proved founder content outperforms everything else.", owner: "Nikki" },
  { id: "t10", text: "Start collecting parent testimonials and case studies — the school Pod placement is the beginning of this. PR agencies need a parent saying \"here's what changed.\" Get it on record.", owner: "Nikki" },
  { id: "t11", text: "Protect your mornings — you came back from Portugal recalibrated. Don't let the pace creep back. The business needs your best thinking, not your most hours.", owner: "Nikki" },
];

const mayPlan = [
  {
    week: "Week 1",
    hook: "My mum's last words to me were: 'You go out that door and you keep on walking.'",
    format: "Text + photo",
    why: "Your mum is the emotional engine underneath everything you've built. She died in 2020. Her final words are one of the most powerful things you've ever shared. This post will stop people mid-scroll — not because it's dramatic, but because it's true.",
    prompt: `Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway — a sound-based emotional regulation platform for children aged 4–10.

My mum died in 2020. Her last words to me were: "You go out that door and you keep on walking." She was my biggest supporter and my compass. Losing her, combined with selling my nursery and everything else that happened that year, was the hardest period of my life. I didn't feel ready to build something new until 2024.

I want to write a short, honest LinkedIn post that starts with her words — or something close to them. The post should feel warm and direct, not heavy or grief-led. It should connect her to why I built HushAway and what keeps me going. End with something real, not a sales pitch.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases like "delve into" or "in today's world." Keep it under 200 words. Sound like a real human being who has lived something.`,
    photo: "Use a photo of you and your mum together if you have one. If not, a photo of you — warm, not corporate.",
  },
  {
    week: "Week 2",
    hook: "I ran a nursery with 130 children and 30 staff. I still didn't know how to help the parents who were really struggling.",
    format: "Text post",
    why: "This is the origin story of HushAway and it's one you haven't told properly yet. You watched parents struggle, felt like you were failing them, and couldn't yet give them anything useful. That gap became HushAway.",
    prompt: `Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

I ran a nursery for around five years — 130 children, 30 staff. It was the most formative professional experience of my life. But one of the things that stayed with me was watching parents come in exhausted, overwhelmed, and not knowing what to do for their children who were dysregulated, distressed, or undiagnosed. And I didn't have the tools to give them anything useful. I felt like I was failing them.

That gap — between what those families needed and what existed — is why I eventually built HushAway.

Write a post that starts with the nursery setting and leads into why that experience is the foundation of what I'm doing now. It should feel honest and a little bit humble — this isn't a post about how impressive the nursery was. It's about what I noticed I couldn't do, and why that matters.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. No sales pitch at the end.`,
    photo: "A photo of you — ideally something that feels warm and human rather than professional headshot territory.",
  },
  {
    week: "Week 3",
    hook: "I arrived in Portugal in high beta. The sound therapist knew before I said a word.",
    format: "Text + photo",
    why: "You experienced exactly what HushAway does for children. You were a dysregulated adult, and sound brought you back. That's not a marketing message, it's your lived proof.",
    prompt: `Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

In February 2026, I attended a two-weekend immersive sound therapy course in Portugal. I went in at full pace — high cortisol, running at full capacity, the way I'd been running for months. The first session was intense: I was shaking, felt completely overwhelmed, and came out the other side feeling like something had genuinely shifted. I came back at a different speed.

The reason this matters is that I'm building a product that uses sound to help children regulate themselves. I experienced what that actually does — not as a researcher, but as a person who needed it. There's something worth saying about that.

Write a post that starts with landing in Portugal and builds to what I experienced and what it proved to me. The contrast angle — corporate trainer to sound therapy retreat — should be in there, but not played for laughs. Keep it honest and grounded.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. End with something real, not a product pitch.`,
    photo: "A photo from Portugal if you have one. Even a landscape or setting shot works.",
  },
  {
    week: "Week 4",
    hook: "I've got a chopper bike in the shed. Here's what growing up on a farm actually taught me about emotional regulation.",
    format: "Text + photo",
    why: "This is the lightest post in the month — a bit of warmth and personality. You start playful, then pivot to something real: children used to regulate instinctively through nature and outdoor sounds, without anyone calling it regulation. The contrast is HushAway's whole reason for existing.",
    prompt: `Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

I grew up on a farm. I had a chopper bike. If you had a chopper in the 70s, you were cool — and I was absolutely that child. Unstructured time, outdoor sounds, boredom, mud, animals. Nobody called it emotional regulation, but that's exactly what it was.

I want to write a warm, slightly nostalgic LinkedIn post that opens with the bike and the farm, and then connects it to what I've learned about why children today struggle to regulate. Not in a "kids these days" way — I'm not interested in that argument. More in a "something was happening in those unstructured hours that we didn't have a word for, and now we do" way.

End with why that realisation feeds into what HushAway tries to give children now.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Keep it under 220 words. Make it feel warm and a bit personal, not preachy.`,
    photo: "A childhood photo if you have one. People love a throwback. It'll double the engagement.",
  },
  {
    week: "Bonus",
    hook: "Someone tried to take my business from me. Here's what I did the morning after the hardest night of my career.",
    format: "Text post",
    why: "This is the nursery sabotage story — a manager who spread rumours and reported you to Ofsted with 25 fabricated allegations. Ofsted dismissed everything. Resilience stories land as proof of who someone is. Use it when you need a post with some real weight.",
    prompt: `Write a personal LinkedIn post for me. I'm Nikki McReynolds, founder of HushAway.

When I ran my nursery, a manager I'd hired turned out to be someone who worked against me — spreading false rumours, interfering with records, and eventually reporting me to Ofsted with 25 fabricated allegations. Ofsted investigated all day. They dismissed every single one. But I didn't know they would. The night before their decision, I was in the worst place I've ever been.

What I want to write is a post about what happened the next morning — the decision I made, and what it changed in how I ran the business from that day on. This isn't a victim story. I don't want it to feel like one. It's a story about what you do when someone tries to take something you've built.

Write the post starting in that moment — don't explain the whole backstory. Just enough context so the reader understands the weight of it. Then lead into the decision and what followed.

Rules: no bullet points, no hyphens, no short one-line staccato sentences. Write in flowing, conversational paragraphs. No AI-sounding phrases. Under 250 words. No corporate language. Start in the scene, not the setup.`,
    photo: "Text only — no photo needed. The words carry this one.",
  },
];

export default function NikkiDashboard() {
  return (
    <ClientLayout clientName="Nikki McReynolds" clientRole="Founder, HushAway & The PeacePath" clientColor="#7c3aed" clientInitials="NM" tabs={tabs}>
      {(activeTab) => (
        <>
          {activeTab === "home" && (
            <div className="space-y-8">
              <div className="rounded-xl p-5" style={{background: "#f3f0ff", borderLeft: "4px solid #7c3aed"}}>
                <p className="text-sm font-semibold text-purple-800 mb-1">Updated after Session 11</p>
                <p className="text-sm text-purple-700 leading-6">Phase 2 starts now. Foundation is built. The priority is conversion and sales. The Content Ideas tab has your May LinkedIn plan — copy, paste, generate. You know what to do.</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Last session — 8 April 2026</p>
                <p className="text-sm text-gray-600 leading-7">Phase 2 begins. Agency contract ended — you're now running everything yourself. Phase 1 foundation is solid: website, SEO, 400 audio files in Kajabi, Vista Social scheduled to end of April. 50 people on email list. HushAway Pod goes into a school in Huddersfield on Friday — a real milestone. Sales and conversion are now the #1 priority. You said no to Cordelia (not right now). You're hiring a marketing assistant (~15 hrs/week, posting Friday). Windsor.ai confirmed founder reels get the most views.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Sessions", value: "11", sub: "Since Nov 2025" },
                  { label: "Email list (warm)", value: "65", sub: "Priority audience" },
                  { label: "LinkedIn following", value: "~5,000", sub: "Growing" },
                  { label: "HushAway Pod", value: "Live", sub: "First school — Huddersfield" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-xl font-bold" style={{color: "#7c3aed"}}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Who You Are</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "What you actually do", body: "You're the founder of HushAway® — a subscription-based digital platform (£14.50/month) that uses ASMR-inspired audio stories, soundscapes, and sensory rituals to help children aged 4–10 regulate their emotions. You sit underneath a master brand called The PeacePath®." },
                    { title: "What makes it different", body: "It's customisable (every child is different), it's backed by a circle of 11+ experts including doctors and researchers, and it makes no medical claims. It's holistic — a bridge for families who are waiting for a diagnosis, sceptical of medication, or just exhausted." },
                    { title: "Who you've been before this", body: "Nursery owner (130 children, 30 staff). Corporate trainer at board level. Dale Carnegie-certified trainer (600+ Saudi delegates). Coach. Voiceover artist. Education, business leadership, coaching, nursery operations, sound therapy — most competitors come from one. You've come from all of them." },
                    { title: "Why we're working together", body: "You've built something credible and real. The job now is making sure the right people can find you, trust you, and feel like they already know you — before they ever sign up. That's what this work is: your visibility, your voice, and your positioning, done properly." },
                  ].map((b, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{b.title}</p>
                      <p className="text-sm text-gray-700 leading-6">{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "todos" && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">To-Do List</h2>
                <p className="text-sm text-gray-400">Actions from Session 11 · 8 April 2026 · Phase 2 — priority is conversion</p>
              </div>
              <TodoList items={todos} accentColor="#7c3aed" />
            </div>
          )}

          {activeTab === "positioning" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Positioning</h2>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Core Belief</p>
                <p className="text-base text-gray-800 italic leading-7">"Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness."</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Audience</h3>
                <div className="space-y-3">
                  {[
                    { label: "Primary", audience: "Parents of children aged 4–10 with emotional regulation challenges — particularly neurodiverse children (ADHD, autism, sensory processing disorders). Sceptical of medication, waiting for a diagnosis, feel unseen and unsupported." },
                    { label: "Secondary", audience: "Schools — SENCOs, classroom teachers, SEN leads. Demand growing as the SEN review forces ND children into underprepared mainstream schools." },
                    { label: "Tertiary", audience: "Therapists and clinicians. Researchers. University partners. These build credibility more than revenue." },
                    { label: "Emerging", audience: "One-to-one home tutors working with children approved to leave mainstream school. A segment Calm and Headspace won't specifically target." },
                    { label: "Avoid", audience: "Parents expecting a medical cure or quick fix. People who want a one-size solution. They'll drain your energy and argue with your product." },
                  ].map((a, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 w-20" style={{color: "#7c3aed"}}>{a.label}</span>
                      <p className="text-sm text-gray-600 leading-6">{a.audience}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Six Differentiators</h3>
                <div className="space-y-3">
                  {[
                    { d: "Customisable by design", note: "What works for one ADHD child won't work for another. You've built that in from day one — children choose how they listen." },
                    { d: "An expert circle, not just a founder's opinion", note: "11+ doctors, ASMR researchers, sleep practitioners, and neuro-psychologists on your advisory board. Plus The Sleep Charity as a partner." },
                    { d: "55+ children across the world have tested it", note: "Your SoundSonic Ambassadors are real families who've been using HushAway for months. That's evidence — not a beta list." },
                    { d: "Holistic and honest about what it is", note: "No medical claims. \"Functional, not scientific.\" This is a strength — it separates you from anything that overpromises and lets families down." },
                    { d: "You treat children like they can handle more than cartoons", note: "No fluffy dogs, no pastel teddies, no avatar world. Enchanted but real. You're making something that respects children's intelligence." },
                    { d: "An unusually broad background", note: "Education, business leadership, corporate training, coaching, nursery operations, sound therapy, sensory modulation — most competitors come from one of those." },
                  ].map((d, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{d.d}</p>
                      <p className="text-sm text-gray-500 leading-6">{d.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Strategic Tensions to Watch</h3>
                <div className="space-y-3">
                  {[
                    { t: "Pushing HushAway vs. leading with Nikki", note: "You're 20 times more memorable than a business brand. People need to find you first, then discover HushAway through you." },
                    { t: "Metrics anxiety vs. what actually matters", note: "820+ newsletter subscribers is genuinely impressive. The likes dropped when you pivoted — they'll come back. Focus on the email list." },
                    { t: "Deep value content vs. top-of-funnel content", note: "Expert videos and long-form posts belong in your newsletter and Kajabi. On LinkedIn, people discovering you are strangers — they need your opinions, your stories, your face." },
                    { t: "The credibility gap", note: "You're not a parent. You're not neurodiverse. You know this. The right things are in place — but this isn't a one-time disclosure. It needs weaving in regularly." },
                  ].map((t, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{t.t}</p>
                      <p className="text-sm text-gray-500 leading-6">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "messaging" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Messaging</h2>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Seven Core Messages</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Push the pause button",
                      body: "Parents are exhausted. They're not failing their children; they're running on empty with nowhere to put the child safely while they breathe. HushAway isn't just for the child. It's for the parent who needs ten minutes of quiet.",
                      quote: "\"I just want to push the pause button.\" — a parent. That's it. That's the whole brief.",
                    },
                    {
                      title: "The bridge before diagnosis",
                      body: "Families wait years for a formal assessment. Children are struggling now. HushAway is something they can start today — before the diagnosis, before the waiting list, before anyone's decided what label fits.",
                      quote: null,
                    },
                    {
                      title: "Holistic, not clinical — and honest about it",
                      body: "You make no medical claims and you're proud of that. HushAway isn't a cure. It isn't a fix. It's functional, not scientific — something that sits alongside whatever else the family is doing.",
                      quote: "\"It's holistic. And it is functional, not scientific.\"",
                    },
                    {
                      title: "Every child is different — and HushAway is built that way",
                      body: "One child loves Blueberry Moon. Another finds it overstimulating. You've built in customisation because the alternative — one size for all — is exactly what you've been fighting against.",
                      quote: "\"Belonging over fixing. Every little brain deserves safety, dignity, and a place to regulate — without auditions for worthiness.\"",
                    },
                    {
                      title: "From corporate to this — and why",
                      body: "You spent years at board level in corporate. You were a Dale Carnegie trainer to 600+ people. You ran a nursery with 30 staff. And yet none of that compares to what you're building now.",
                      quote: null,
                    },
                    {
                      title: "The legacy",
                      body: "In ten years, you want to look back and call them 'the HushAway children.' Children who grew up with better emotional tools, more self-awareness, and a stronger foundation for navigating the world.",
                      quote: "\"HushAway is bigger than stories, meditations, and sounds. That's just the conduit.\"",
                    },
                    {
                      title: "The unfixed child",
                      body: "The 'superpower' narrative puts pressure on neurodiverse children to be exceptional to earn their place. You reject that. Not every day is a superpower day. Children deserve safety as they are.",
                      quote: "\"Not every day is a superpower day — some days are really messy.\"",
                    },
                  ].map((m, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <p className="text-sm font-bold text-gray-900 mb-2">{m.title}</p>
                      <p className="text-sm text-gray-600 leading-6">{m.body}</p>
                      {m.quote && <p className="text-sm text-gray-400 italic mt-3 border-l-2 pl-3" style={{borderColor: "#7c3aed"}}>{m.quote}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">May LinkedIn Plan</h2>
                <p className="text-sm text-gray-500 leading-6">Each week has one personal LinkedIn post. Copy the Claude prompt exactly, paste it into Claude, and generate the post. Tweak the output until it sounds like you — remove any hyphens, short staccato lines, or anything that feels robotic. You don't need to post these in order. Pick the week that feels most timely.</p>
              </div>

              <div className="space-y-6">
                {mayPlan.map((week, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 flex items-center gap-3" style={{background: "#7c3aed"}}>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{week.week}</span>
                      <span className="text-white text-xs opacity-75">·</span>
                      <span className="text-white text-xs opacity-75">{week.format}</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <p className="text-base font-bold text-gray-900">"{week.hook}"</p>
                      <div className="rounded-lg p-4" style={{background: "#f3f0ff"}}>
                        <p className="text-xs font-semibold text-purple-700 uppercase tracking-widest mb-1">Why this post</p>
                        <p className="text-sm text-purple-800 leading-6">{week.why}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Claude Prompt — copy and paste this</p>
                        <div className="rounded-lg p-4 border border-gray-200" style={{background: "#f9fafb", fontFamily: "monospace"}}>
                          <p className="text-xs text-gray-700 leading-6 whitespace-pre-wrap">{week.prompt}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest shrink-0 mt-0.5">Photo</span>
                        <p className="text-sm text-gray-500">{week.photo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Other Content Angles</h3>
                <div className="space-y-3">
                  {[
                    { angle: "Stop calling ADHD a superpower. Not every day is a superpower day.", type: "Bold & Contrarian", notes: "Your strongest contrarian position. Polarising but fair — you're not attacking the idea of ND children having strengths, you're calling out the pressure the narrative creates." },
                    { angle: "I'm not a parent. I'm not neurodiverse. Here's why I'm building this anyway.", type: "Belief & Opinion", notes: "Pre-empts the doubt and replaces it with your actual answer: the nursery, the coaching, the training, years spent walking alongside parents who were struggling." },
                    { angle: "We say we want children to be seen. But do we actually let them feel what they feel?", type: "Belief & Opinion", notes: "Children aren't given permission to sit with their emotions. We distract rather than acknowledge. That distinction is worth making explicitly." },
                    { angle: "The school system doesn't have a behaviour problem. It has a support problem.", type: "Bold & Contrarian", notes: "The SEN review closing specialist schools and pushing ND children into mainstream is happening right now. You have direct insight — use it." },
                    { angle: "Sunday to Monday is the hardest transition of the week for ND children.", type: "Practical", notes: "Make this practical and specific — not 'sound can help' but 'this is what you do Sunday night at 7pm.'" },
                    { angle: "55 children across the world. Here's what they told us that no researcher could have.", type: "Authority", notes: "SoundSonic Ambassadors with real quotes from children: \"I felt sad before, and now I don't.\" \"I feel brave.\" More powerful than any credential." },
                  ].map((c, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: "#f3f0ff", color: "#7c3aed"}}>{c.type}</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mb-1">"{c.angle}"</p>
                      <p className="text-sm text-gray-500 leading-6">{c.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Ben's Take</h2>
                <p className="text-sm text-gray-400">Strategic recommendations — plain and direct.</p>
              </div>

              {[
                {
                  title: "Lead with Nikki, not HushAway",
                  flag: "Ongoing",
                  flagColor: "#7c3aed",
                  body: "You are 20 times more memorable than a business brand. That's not an opinion — it's a practical fact about how people decide whether to trust something. Right now you're still defaulting to HushAway-forward content, which means strangers scroll past and think \"interesting product.\" You want them to think \"I like this person.\" They'll find HushAway once they've found you. Every piece of LinkedIn content should pass the test: does this tell people something real about Nikki? If not, it belongs in the newsletter, not the feed.",
                },
                {
                  title: "Hire a social media VA — not another agency",
                  flag: "April — Urgent",
                  flagColor: "#dc2626",
                  body: "You don't need an agency. You need a person. Someone who's dedicated, accountable, and who you can brief directly. Around £20/hour, 15 hours a week. Their job: take the content ideas (this dashboard, your Claude output), create the designs, schedule via Vista Social, engage with comments, and follow up with interested parents. You are the library. They are the librarian. Look at VA companies specialising in social media for education or health brands. Or a parent on maternity leave with a digital marketing background — someone who already speaks the language of the people you're trying to reach.",
                },
                {
                  title: "Get your newsletter subscribers off LinkedIn",
                  flag: "This Week — Urgent",
                  flagColor: "#dc2626",
                  body: "LinkedIn can change its algorithm, restrict your reach, or disappear tomorrow. Those subscribers are currently renting space on LinkedIn's platform. You need their email addresses — in your own list, on your own platform, where you have direct access with no middleman. Send a launch newsletter now inviting them across. Make it simple: \"We've launched. Here's where to follow us directly.\" You'll get maybe 30% of them. That's still 250+ genuinely interested people who've actively opted in.",
                },
                {
                  title: "Don't treat LinkedIn likes as a measure of whether it's working",
                  flag: "Watch Point",
                  flagColor: "#d97706",
                  body: "You know this. And yet. The likes dropped when you pivoted in August and changed your name — you severed your existing audience. They're coming back now that you've reverted to Nikki. But even if they don't: 820 newsletter subscribers is a better signal than any number of likes. Impressions and dwell time are what LinkedIn actually measures now. The people who'll eventually sign up to HushAway are lurking, not liking. Every time you feel despondent about likes, go and look at your newsletter subscriber count instead.",
                },
                {
                  title: "Start collecting parent testimonials and case studies — now",
                  flag: "April — Urgent",
                  flagColor: "#dc2626",
                  body: "This is the one gap that's blocking PR traction. Smoking Gun asked for parent case studies. Other agencies will too. You've got expert voices, children's voices, and your own story. But you don't yet have a parent saying \"my child went from 90 minutes to settle to 4 minutes. Here's what changed.\" Identify the three or four families from your SoundSonic ambassador group who've had the clearest results and ask them properly. A case study doesn't need to be long. It needs to be real.",
                },
                {
                  title: "Protect your energy — it's a business asset",
                  flag: "Ongoing",
                  flagColor: "#7c3aed",
                  body: "You're doing the work of an entire team. The Portugal retreat recalibrated something for you and you came back at a different speed. Don't let it drift back to full-intensity within a month. You're better in a conversation, in a post, and in a meeting when you've had a morning to yourself. Keep the gym in the diary. Keep the weekends protected where you can. The business will still be there after Sunday lunch.",
                },
                {
                  title: "Cordelia — the door is still open",
                  flag: "Next Phase",
                  flagColor: "#6b7280",
                  body: "You said no for now, and that was the right call given where you are financially. You're pre-revenue, the savings pot is thin, and £5k setup plus £500/month would be another outgoing before you've started converting. But you love the concept. You love Cordelia. And \"The Hush Revolution\" is a strong name. When you're generating revenue and have a VA running the day-to-day, revisit this. The foundation this dashboard gives you — positioning, stories, content angles — will make everything she builds for you stronger.",
                },
                {
                  title: "Video content — use what you've already got",
                  flag: "When Ready",
                  flagColor: "#6b7280",
                  body: "You hate recording video. That's noted and valid. But Windsor.ai confirmed founder reels get your highest views. You don't need to commit to a weekly live show. Batch-record one hour when you're ready. Feed the footage into Riverside — it'll spit out clips, reels, and trailers automatically. You've already used it for the Dr. Pereira interview. Do the same for yourself. The scripts and video strategy are in the longer-form content notes.",
                },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-sm font-bold text-gray-900">{r.title}</p>
                    <span className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{background: r.flagColor}}>{r.flag}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-6">{r.body}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900">Goals</h2>

              <div className="rounded-xl p-5 border-2" style={{borderColor: "#7c3aed", background: "#f3f0ff"}}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color: "#7c3aed"}}>Phase 2 Priority</p>
                <p className="text-sm font-bold text-gray-900">Conversion. No paid members yet. Foundation is built. Everything now points to getting paid memberships.</p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Short Term (Next 4–12 Weeks)</h3>
                <div className="space-y-3">
                  {[
                    { goal: "Build early HushAway membership momentum", detail: "Target: between 10 and 40 sign-ups by end of March was the early marker. Real goal: 1,000 members by December 2026 — that's £14,500/month and proof of concept." },
                    { goal: "Establish a consistent personal content rhythm on LinkedIn", detail: "At least one genuinely personal post per week — opinion, story, or lived experience. This isn't about volume, it's about pattern." },
                    { goal: "Own your audience — get them off LinkedIn", detail: "Migrate LinkedIn newsletter subscribers to your own email list. Grow through the launch email, the Kajabi free tier, and ManyChat DM flows." },
                    { goal: "Land the right PR relationship", detail: "You're between PR consultants. Trust your gut. The right agency will get what HushAway is about and come back with results, not excuses." },
                    { goal: "Agency review and rebalance", detail: "The April review needs to result in a clear picture of what they're responsible for. Right now you're doing 90% of the management work on top of paying for theirs." },
                  ].map((g, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{g.goal}</p>
                      <p className="text-sm text-gray-500 leading-6">{g.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Long Term (6–18 Months)</h3>
                <div className="space-y-3">
                  {[
                    { goal: "1,000 HushAway members by December 2026", detail: "£14,500/month recurring. That's the financial turning point — the moment HushAway stops being funded by your training income and starts standing on its own." },
                    { goal: "HushAway in schools", detail: "Licensing to schools, toolkits for SENCOs, the HushAway POD. The SEN review makes this more urgent, not less." },
                    { goal: "Established thought leader in children's emotional regulation", detail: "Known by name in the neurodiversity and SEN space. Invited to speak. Referenced in the press. You were on this trajectory before — the pivot disrupted it. You're building it back." },
                    { goal: "The HushAway children", detail: "\"I want to look back in ten years and call them the HushAway children.\" Children who grew up with better emotional tools. Better self-awareness. A stronger foundation for navigating the world. That's the legacy." },
                  ].map((g, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">{g.goal}</p>
                      <p className="text-sm text-gray-500 leading-6">{g.detail}</p>
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
