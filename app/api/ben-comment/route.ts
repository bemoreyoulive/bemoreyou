import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bemoreyoulive.com";

export async function POST(req: NextRequest) {
  const { slug, message, clientName, tabName } = await req.json();

  if (!slug || !message?.trim()) {
    return NextResponse.json({ error: "Missing slug or message" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data: profile } = await supabase
    .from("client_profiles")
    .select("name, email")
    .eq("slug", slug)
    .single();

  if (!profile?.email) {
    return NextResponse.json({ error: "No email on file for this client" }, { status: 404 });
  }

  const firstName = profile.name.split(" ")[0];
  const dashboardUrl = `${SITE_URL}/client/${slug}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin: 0; padding: 0; background: #F5F1EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: #F5F1EC; padding: 0 20px 40px;">

    <div style="padding: 28px 0 24px;">
      <p style="font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #1C1C1C; margin: 0; font-family: Georgia, serif;">
        BeMore<span style="color: #4ec9d0;">You</span>
      </p>
      <p style="font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7A746E; margin: 2px 0 0;">Note from Ben${tabName ? ` — ${tabName}` : ""}</p>
    </div>

    <div style="background: #fff; border: 1px solid #E0DBD3; border-radius: 4px; padding: 28px 32px; margin-bottom: 24px;">
      <p style="font-size: 22px; font-family: Georgia, serif; font-weight: 400; color: #1C1C1C; margin: 0 0 16px; line-height: 1.3;">
        Hey ${firstName},
      </p>
      <p style="font-size: 15px; color: #3D3935; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
    </div>

    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${dashboardUrl}" style="display: inline-block; padding: 14px 36px; background: #E8521C; color: #fff; text-decoration: none; border-radius: 3px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
        Open your dashboard →
      </a>
    </div>

    <p style="font-size: 12px; color: #7A746E; text-align: center; line-height: 1.6; margin: 0;">
      Ben Stickland · <a href="https://bemoreyoulive.com" style="color: #7A746E;">bemoreyoulive.com</a>
    </p>

  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "Ben at BeMOREyou <ben@bemoreyoulive.com>",
      to: profile.email,
      subject: `Note from Ben — ${clientName ?? profile.name}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
