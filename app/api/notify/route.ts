import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, clientName, detail } = body;

  let subject = "";
  let html = "";

  if (type === "todo") {
    subject = `✅ ${clientName} ticked off a to-do`;
    html = `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 32px; background: #F5F1EC; border-radius: 4px;">
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #E8521C; margin: 0 0 16px;">BeMOREyou — Client Update</p>
        <h1 style="font-size: 24px; font-weight: 400; color: #1C1C1C; margin: 0 0 24px; font-family: Georgia, serif;">Task completed</h1>
        <p style="font-size: 15px; color: #3D3935; line-height: 1.7; margin: 0 0 16px;"><strong>${clientName}</strong> just ticked off a to-do item:</p>
        <div style="background: #fff; border: 1px solid #E0DBD3; border-left: 3px solid #E8521C; border-radius: 3px; padding: 16px 20px; margin: 0 0 24px;">
          <p style="font-size: 14px; color: #1C1C1C; margin: 0; line-height: 1.6;">${detail}</p>
        </div>
        <p style="font-size: 13px; color: #7A746E; margin: 0;">Log in to <a href="https://bemoreyoulive.com/admin" style="color: #E8521C;">bemoreyoulive.com</a> to view their dashboard.</p>
      </div>
    `;
  } else if (type === "comment") {
    subject = `💬 ${clientName} left a comment`;
    html = `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 32px; background: #F5F1EC; border-radius: 4px;">
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #E8521C; margin: 0 0 16px;">BeMOREyou — Client Update</p>
        <h1 style="font-size: 24px; font-weight: 400; color: #1C1C1C; margin: 0 0 24px; font-family: Georgia, serif;">New comment</h1>
        <p style="font-size: 15px; color: #3D3935; line-height: 1.7; margin: 0 0 16px;"><strong>${clientName}</strong> left a comment:</p>
        <div style="background: #fff; border: 1px solid #E0DBD3; border-left: 3px solid #E8521C; border-radius: 3px; padding: 16px 20px; margin: 0 0 24px;">
          <p style="font-size: 14px; color: #1C1C1C; margin: 0; line-height: 1.6;">${detail}</p>
        </div>
        <p style="font-size: 13px; color: #7A746E; margin: 0;">Log in to <a href="https://bemoreyoulive.com/admin" style="color: #E8521C;">bemoreyoulive.com</a> to view their dashboard.</p>
      </div>
    `;
  } else if (type === "onboarding") {
    subject = `🆕 New onboarding submission — ${clientName}`;
    html = `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 32px; background: #F5F1EC; border-radius: 4px;">
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #E8521C; margin: 0 0 16px;">BeMOREyou — New Client</p>
        <h1 style="font-size: 24px; font-weight: 400; color: #1C1C1C; margin: 0 0 24px; font-family: Georgia, serif;">Onboarding questionnaire submitted</h1>
        <p style="font-size: 15px; color: #3D3935; line-height: 1.7; margin: 0 0 20px;"><strong>${clientName}</strong> has completed their onboarding questionnaire.</p>
        <div style="background: #fff; border: 1px solid #E0DBD3; border-radius: 3px; padding: 20px 24px; margin: 0 0 24px;">
          <p style="font-size: 14px; color: #1C1C1C; margin: 0; line-height: 1.9; white-space: pre-wrap;">${detail}</p>
        </div>
        <p style="font-size: 13px; color: #7A746E; margin: 0;">Log in to <a href="https://bemoreyoulive.com/admin" style="color: #E8521C;">bemoreyoulive.com</a> to view their dashboard.</p>
      </div>
    `;

    // Save to Supabase
    try {
      const supabase = createServiceClient();
      await supabase.from("onboarding_submissions").insert({
        client_name: clientName,
        answers: body.answers ?? {},
        submitted_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Supabase save error:", err);
    }
  }

  try {
    await resend.emails.send({
      from: "BeMOREyou <onboarding@resend.dev>",
      to: "ben@thepersonalbrandingguy.com",
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
