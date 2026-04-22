import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-server";
import { getTodosForSlug, getAllClientSlugs } from "@/lib/todos";

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bemoreyoulive.com";

export async function GET(req: NextRequest) {
  // Verify this is called by Vercel Cron (or manually by Ben with the secret)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const results: { slug: string; status: string }[] = [];

  for (const slug of getAllClientSlugs()) {
    // Look up client profile — must have email and opted in
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("name, email, monday_reminders")
      .eq("slug", slug)
      .single();

    if (!profile?.email) {
      results.push({ slug, status: "skipped — no email" });
      continue;
    }

    if (!profile.monday_reminders) {
      results.push({ slug, status: "skipped — not opted in" });
      continue;
    }

    const todos = getTodosForSlug(slug);
    if (!todos.length) {
      results.push({ slug, status: "skipped — no todos" });
      continue;
    }

    // Fetch all todo states for this client
    const { data: states } = await supabase
      .from("todo_states")
      .select("todo_id, completed, updated_at")
      .eq("slug", slug);

    const stateMap = new Map<string, { completed: boolean; updated_at: string }>(
      (states ?? []).map(s => [s.todo_id, { completed: s.completed, updated_at: s.updated_at }])
    );

    const pending = todos.filter(t => !stateMap.get(t.id)?.completed);
    const completedThisWeek = todos.filter(t => {
      const state = stateMap.get(t.id);
      return state?.completed && state.updated_at >= oneWeekAgo;
    });

    // Nothing to say — all done and nothing completed this week
    if (!pending.length && !completedThisWeek.length) {
      results.push({ slug, status: "skipped — nothing to report" });
      continue;
    }

    const firstName = profile.name.split(" ")[0];
    const html = buildEmail(profile.name, slug, pending, completedThisWeek);

    try {
      await resend.emails.send({
        from: "Ben at BeMOREyou <ben@bemoreyoulive.com>",
        to: profile.email,
        subject: subjectLine(firstName),
        html,
      });
      results.push({ slug, status: "sent" });
    } catch (err) {
      console.error(`Failed to send to ${slug}:`, err);
      results.push({ slug, status: "error" });
    }
  }

  return NextResponse.json({ ok: true, results });
}

function getWeekNumber() {
  const d = new Date();
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
}

const SUBJECTS = [
  (name: string) => `Right then, ${name} — what are we doing this week?`,
  (name: string) => `${name}, your Monday nudge has arrived 👀`,
  (name: string) => `New week. Fresh start. No excuses, ${name}.`,
  (name: string) => `${name} — Ben here. Open this.`,
  (name: string) => `Your to-do list isn't going to tick itself, ${name}`,
  (name: string) => `Monday check-in — how's it looking, ${name}?`,
  (name: string) => `This is your sign, ${name}. Open the dashboard.`,
];

function subjectLine(firstName: string) {
  const week = getWeekNumber();
  return SUBJECTS[week % SUBJECTS.length](firstName);
}

function buildEmail(
  name: string,
  slug: string,
  pending: { id: string; text: string }[],
  completedThisWeek: { id: string; text: string }[]
) {
  const firstName = name.split(" ")[0];
  const dashboardUrl = `${SITE_URL}/client/${slug}`;

  const pendingRows = pending.map(t => `
    <tr>
      <td style="padding: 14px 20px; border-bottom: 1px solid #E0DBD3; font-size: 14px; color: #1C1C1C; line-height: 1.6;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #E8521C; margin-right: 10px; vertical-align: middle;"></span>${t.text}
      </td>
    </tr>`).join("");

  const completedRows = completedThisWeek.map(t => `
    <tr>
      <td style="padding: 14px 20px; border-bottom: 1px solid #E0DBD3; font-size: 14px; color: #3D3935; line-height: 1.6;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #2e7d4f; margin-right: 10px; vertical-align: middle;"></span><span style="text-decoration: line-through; color: #7A746E;">${t.text}</span> ✓
      </td>
    </tr>`).join("");

  const completedSection = completedThisWeek.length ? `
    <div style="margin-bottom: 32px;">
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #2e7d4f; margin: 0 0 12px;">Completed this week 🎉</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; border-collapse: collapse;">
        ${completedRows}
      </table>
    </div>` : "";

  const pendingSection = pending.length ? `
    <div style="margin-bottom: 32px;">
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #E8521C; margin: 0 0 12px;">Still to do</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; border-collapse: collapse;">
        ${pendingRows}
      </table>
    </div>` : `
    <div style="background: #e8f5ee; border: 1px solid #b8ddc8; border-radius: 4px; padding: 20px 24px; margin-bottom: 32px;">
      <p style="font-size: 15px; color: #1a5c35; margin: 0; font-weight: 600;">You've cleared everything on your list. 🎉</p>
    </div>`;

  const greetings = [
    `Right, let's go.`,
    `New week. Clean slate.`,
    `Monday again. Already.`,
    `Here we go again.`,
    `The week isn't going to build itself.`,
  ];
  const greeting = greetings[getWeekNumber() % greetings.length];

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
      <p style="font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7A746E; margin: 2px 0 0;">Monday morning</p>
    </div>

    <!-- Greeting -->
    <div style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; padding: 28px 32px; margin-bottom: 24px;">
      <p style="font-size: 22px; font-family: Georgia, serif; font-weight: 400; color: #1C1C1C; margin: 0 0 14px; line-height: 1.3;">
        Morning, ${firstName}. ${greeting}
      </p>
      <p style="font-size: 15px; color: #3D3935; line-height: 1.7; margin: 0;">
        Your to-do list is below. Tick off what's done, look at what's still sitting there, and be honest with yourself about why. That's genuinely half the work.
      </p>
    </div>

    ${completedSection}
    ${pendingSection}

    <!-- Milestones & Signals nudge -->
    <div style="background: #1a1916; border-radius: 6px; padding: 24px 28px; margin-bottom: 28px;">
      <p style="font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin: 0 0 8px;">Two minutes. That's all this takes.</p>
      <p style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 10px; line-height: 1.4;">
        Have a look at your Milestones &amp; Signals tab.
      </p>
      <p style="font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.7; margin: 0 0 16px;">
        Anything happened this week that deserves a tick? A DM that came in because of something you posted? Someone who used your exact words back at you? A better enquiry than last month? These things happen and we forget them by Friday — don't let that happen. Log it while it's fresh.
      </p>
      <a href="${dashboardUrl}" style="display: inline-block; padding: 11px 22px; background: #E8521C; color: #fff; text-decoration: none; border-radius: 3px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
        Check Milestones &amp; Signals →
      </a>
    </div>

    <!-- Main CTA -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 36px; background: #E8521C; color: #fff; text-decoration: none; border-radius: 3px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
        Open your dashboard →
      </a>
    </div>

    <!-- Login note -->
    <div style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; padding: 20px 24px; margin-bottom: 32px;">
      <p style="font-size: 13px; color: #3D3935; line-height: 1.7; margin: 0 0 10px;">
        If the to-do list looks wrong, <a href="${dashboardUrl}" style="color: #E8521C; text-decoration: none; font-weight: 600;">log in here</a> and tick off what's actually done — Ben can see your progress from his end.
      </p>
      <p style="font-size: 13px; color: #3D3935; line-height: 1.7; margin: 0;">
        Any login trouble, drop Ben a message on <strong>WhatsApp</strong> or <strong>email</strong> and he'll sort it.
      </p>
    </div>

    <!-- Footer -->
    <p style="font-size: 12px; color: #7A746E; text-align: center; line-height: 1.6; margin: 0;">
      Sent every Monday at 9am by Ben · <a href="${dashboardUrl}" style="color: #7A746E;">bemoreyoulive.com</a>
    </p>

  </div>
</body>
</html>`;
}
