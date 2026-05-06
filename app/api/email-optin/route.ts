import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("email_optins")
    .select("opted_in")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("email-optin load error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, opted_in: data?.opted_in ?? false });
}

export async function POST(req: NextRequest) {
  const { slug, opted_in } = await req.json();
  if (!slug || typeof opted_in !== "boolean") {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: existing } = await supabase
    .from("email_optins")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  const { error } = existing
    ? await supabase
        .from("email_optins")
        .update({ opted_in, updated_at: new Date().toISOString() })
        .eq("slug", slug)
    : await supabase
        .from("email_optins")
        .insert({ slug, opted_in, updated_at: new Date().toISOString() });

  if (error) {
    console.error("email-optin save error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
