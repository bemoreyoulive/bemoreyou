import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase-server";
import { getTodosForSlug, getAllClientSlugs } from "@/lib/todos";

const resend = new Resend(process.env.RESEND_API_KEY);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bemoreyoulive.com";

// Per-client coaching context — positioning, ICP, current commercial focus
const CLIENT_CONTEXT: Record<string, string> = {
  "andy-felton": `
Name: Andy Felton
Positioning: Replaces fragile manual processes with robust AI and automation systems for founder-led businesses.
ICP: Founders and ops leaders in growing businesses (5–50 people) being held together by people doing things manually. Often in professional services, agencies, or tech-adjacent sectors.
Current focus: Building personal brand on LinkedIn (2 posts/week), landing first aligned implementation client, attending AI networking events, building credibility in the N8N community.
Commercial offer: Custom automation/AI builds — not courses, not consulting, actual implementation.
Differentiator: 20 years building systems for national sports bodies. Real delivery track record, not just theory.
Current momentum: Early stage LinkedIn growth. Chris Dillon POC in progress. Meetings happening at AI events.
  `.trim(),

  "andy-scott-barrett": `
Name: Andy Scott Barrett
Positioning: Fractional Finance Director for UK SMEs — turns numbers into decisions. The bit your accountant isn't there to do.
ICP: UK SME owners (typically £1m–£10m revenue) who have an accountant but no financial direction. Often frustrated that their numbers tell them nothing useful.
Current focus: Getting LinkedIn profile fully updated (headline, banner, About done), booking professional photo session, pursuing two warm prospects (Manchester client, aerospace East Midlands).
Commercial offer: Fractional FD engagement — ongoing strategic finance support without the full-time cost.
Differentiator: 20 years at Rolls-Royce. Ex-corporate credibility meeting the reality of running an SME.
Current momentum: Profile refresh nearly complete. Two live prospects in pipeline. Website updates in progress.
  `.trim(),

  "nikki-mcreynolds": `
Name: Nikki McReynolds
Business: HushAway — sensory-friendly wellness pods for schools and workplaces.
Positioning: Providing calm, safe, accessible quiet spaces for neurodivergent children and adults in high-stimulation environments.
ICP: Primary schools (SENCOs, headteachers), workplace wellbeing leads, councils. Decision-makers who understand SEND provision.
Current focus: Pod placement at a school in Huddersfield (case study opportunity), hiring a marketing assistant and social media VA, improving LinkedIn presence, switching outgoing emails to send personally from Nikki.
Commercial offer: Pod leasing/purchase + placement support.
Differentiator: Nikki has lived experience — this isn't a product built by someone outside the problem.
Current momentum: School placement happening now. Meetings with UGC and paid ads agencies. LinkedIn content plan in place for May.
  `.trim(),

  "solve-people": `
Name: Solve People (Lue and Brett)
Positioning: Payroll, compliance, and HR support for CIS subcontractors in the UK construction industry.
ICP: Self-employed construction workers and small CIS subcontractors who are getting underpaid, overtaxed, or confused by compliance requirements.
Current focus: Growing LinkedIn to 250 connections, Instagram to 250 followers, turning a troll comment into content, deciding on email platform (Brett's call), posting twice a week.
Commercial offer: Done-for-you payroll and CIS compliance management.
Differentiator: They speak the language of the site — not corporate HR. Straight-talking, practical, no fluff.
Current momentum: Social media growth in early stages. First post generating engagement (troll comment = proof of concept). Email platform still undecided.
  `.trim(),
};

function isFortnightlyWeek(): boolean {
  // Week number since Unix epoch, mod 2 — only runs on even weeks
  const weeksSinceEpoch = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return weeksSinceEpoch % 2 === 0;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFortnightlyWeek()) {
    return NextResponse.json({ ok: true, skipped: "off-week" });
  }

  const supabase = createServiceClient();
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
  const results: { slug: string; status: string }[] = [];

  for (const slug of getAllClientSlugs()) {
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("name, email, monday_reminders")
      .eq("slug", slug)
      .single();

    if (!profile?.email || !profile.monday_reminders) {
      results.push({ slug, status: "skipped — not opted in" });
      continue;
    }

    const clientContext = CLIENT_CONTEXT[slug];
    if (!clientContext) {
      results.push({ slug, status: "skipped — no context defined" });
      continue;
    }

    // Fetch todo states
    const todos = getTodosForSlug(slug);
    const { data: todoStates } = await supabase
      .from("todo_states")
      .select("todo_id, completed, updated_at")
      .eq("slug", slug);

    const todoStateMap = new Map((todoStates ?? []).map(s => [s.todo_id, s]));
    const pendingTodos = todos.filter(t => !todoStateMap.get(t.id)?.completed);
    const completedTodos = todos.filter(t => todoStateMap.get(t.id)?.completed);

    // Fetch milestone & signal states
    const { data: milestoneStates } = await supabase
      .from("milestone_states")
      .select("milestone_id, completed")
      .eq("slug", slug)
      .eq("completed", true);

    const completedMilestoneIds = new Set((milestoneStates ?? []).map(m => m.milestone_id));

    // Fetch recent comments from dashboard (last 2 weeks)
    const { data: recentComments } = await supabase
      .from("comments")
      .select("tab_name, content, created_at")
      .eq("slug", slug)
      .gte("created_at", twoWeeksAgo)
      .order("created_at", { ascending: false })
      .limit(10);

    // Build AI prompt
    const prompt = buildAIPrompt(
      clientContext,
      pendingTodos.map(t => t.text),
      completedTodos.map(t => t.text),
      Array.from(completedMilestoneIds),
      (recentComments ?? []).map(c => `[${c.tab_name}] ${c.content}`)
    );

    let aiOutput: { note: string; opportunities: string[] };
    try {
      aiOutput = await generateOpportunities(prompt);
    } catch (err) {
      console.error(`AI generation failed for ${slug}:`, err);
      results.push({ slug, status: "error — AI failed" });
      continue;
    }

    const firstName = profile.name.split(" ")[0];
    const html = buildEmail(firstName, slug, aiOutput.note, aiOutput.opportunities);

    try {
      await resend.emails.send({
        from: "Ben at BeMOREyou <ben@bemoreyoulive.com>",
        to: profile.email,
        subject: subjectLine(firstName),
        html,
      });
      results.push({ slug, status: "sent" });
    } catch (err) {
      console.error(`Email failed for ${slug}:`, err);
      results.push({ slug, status: "error — email failed" });
    }
  }

  return NextResponse.json({ ok: true, results });
}

function buildAIPrompt(
  clientContext: string,
  pendingTodos: string[],
  completedTodos: string[],
  completedMilestoneIds: string[],
  recentComments: string[]
): string {
  return `
You are Ben Stickland, a personal brand coach. You are writing a short, warm, coaching-style email to one of your clients.

CLIENT CONTEXT:
${clientContext}

PENDING ACTIONS (not yet done):
${pendingTodos.length ? pendingTodos.map(t => `- ${t}`).join("\n") : "None outstanding"}

COMPLETED ACTIONS:
${completedTodos.length ? completedTodos.map(t => `- ${t}`).join("\n") : "None yet"}

COMPLETED MILESTONES/SIGNALS (IDs): ${completedMilestoneIds.length ? completedMilestoneIds.join(", ") : "None yet"}

RECENT CLIENT DASHBOARD COMMENTS (last 2 weeks):
${recentComments.length ? recentComments.join("\n") : "No recent comments"}

YOUR TASK:
Write a fortnightly opportunity email with two parts:

1. A short personalised note (3–5 sentences max). It should:
   - Reference where they genuinely are right now based on their context above
   - Feel like it came from someone who has been paying attention
   - Be direct, warm, and coaching in tone — not admin, not generic
   - NOT start with "Hi" or "Hey" — open mid-thought or with a direct observation

2. Three specific, actionable opportunity prompts tailored to this client right now. Each should be one sentence. Choose from or riff on these angles (pick the most relevant, not all three):
   - Anyone you should follow up with this week?
   - Any conversation worth turning into content?
   - Any podcast, speaking, or collaboration opportunity worth chasing right now?
   - Any warm lead going cold that needs a nudge?
   - Any relationship you've been meaning to invest in?
   - Any platform or community you should be more visible in?

Tone: Ben's voice. Direct, no fluff, no corporate language, no motivational poster energy. Sounds like a smart coach who knows their work and their client.

Return your response as JSON in this exact format:
{
  "note": "The personalised note paragraph here",
  "opportunities": [
    "First opportunity prompt",
    "Second opportunity prompt",
    "Third opportunity prompt"
  ]
}
`.trim();
}

async function generateOpportunities(prompt: string): Promise<{ note: string; opportunities: string[] }> {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 600,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in AI response");
  return JSON.parse(jsonMatch[0]);
}

function subjectLine(firstName: string): string {
  const subjects = [
    `${firstName} — fortnightly check-in from Ben`,
    `Two weeks in. Where are you at, ${firstName}?`,
    `${firstName}, a few things worth your attention`,
    `Fortnightly nudge — what are you chasing this week, ${firstName}?`,
    `${firstName} — opportunities worth thinking about right now`,
  ];
  const index = Math.floor(Date.now() / (14 * 24 * 60 * 60 * 1000)) % subjects.length;
  return subjects[index];
}

function buildEmail(
  firstName: string,
  slug: string,
  note: string,
  opportunities: string[]
): string {
  const dashboardUrl = `${SITE_URL}/client/${slug}`;

  const opportunityItems = opportunities
    .map(o => `
      <tr>
        <td style="padding: 14px 20px; border-bottom: 1px solid #E0DBD3; font-size: 14px; color: #1C1C1C; line-height: 1.6;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #E8521C; margin-right: 10px; vertical-align: middle;"></span>${o}
        </td>
      </tr>`)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin: 0; padding: 0; background: #F5F1EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: #F5F1EC; padding: 0 20px 40px;">

    <!-- Header -->
    <div style="padding: 28px 0 24px;">
      <p style="font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #1C1C1C; margin: 0; font-family: Georgia, serif;">
        BeMore<span style="color: #4ec9d0;">You</span>
      </p>
      <p style="font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7A746E; margin: 2px 0 0;">Fortnightly opportunity check-in</p>
    </div>

    <!-- Personalised note -->
    <div style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; padding: 28px 32px; margin-bottom: 24px;">
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #E8521C; margin: 0 0 16px;">From Ben</p>
      <p style="font-size: 16px; font-family: Georgia, serif; font-weight: 400; color: #1C1C1C; margin: 0 0 0; line-height: 1.75;">
        ${note}
      </p>
    </div>

    <!-- Opportunities -->
    <div style="margin-bottom: 28px;">
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1C1C1C; margin: 0 0 12px;">Three things worth your attention this fortnight</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; border-collapse: collapse;">
        ${opportunityItems}
      </table>
    </div>

    <!-- Reflective prompts -->
    <div style="background: #1a1916; border-radius: 6px; padding: 24px 28px; margin-bottom: 28px;">
      <p style="font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 8px;">Worth sitting with</p>
      <p style="font-size: 15px; color: rgba(255,255,255,0.9); line-height: 1.75; margin: 0 0 8px;">
        Anyone you've been meaning to follow up with but haven't?<br>
        Any conversation from the last two weeks that's worth turning into a post?<br>
        Any opportunity that's been sitting on your radar — podcast, event, collaboration?
      </p>
      <p style="font-size: 13px; color: rgba(255,255,255,0.45); margin: 12px 0 0; line-height: 1.6;">
        These are the things that move the needle. They rarely feel urgent. That's why most people don't do them.
      </p>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 36px; background: #E8521C; color: #fff; text-decoration: none; border-radius: 3px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
        Open your dashboard →
      </a>
    </div>

    <!-- Footer -->
    <p style="font-size: 12px; color: #7A746E; text-align: center; line-height: 1.6; margin: 0;">
      Sent fortnightly by Ben · <a href="${dashboardUrl}" style="color: #7A746E;">bemoreyoulive.com</a>
    </p>

  </div>
</body>
</html>`;
}
