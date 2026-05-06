import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const tabName = req.nextUrl.searchParams.get("tab");

  if (!slug || !tabName) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, text, created_at")
    .eq("slug", slug)
    .eq("tab_name", tabName)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("comments load error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function POST(req: NextRequest) {
  const { slug, tabName, clientName, text } = await req.json();

  if (!slug || !tabName || !clientName || !text?.trim()) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({ slug, tab_name: tabName, client_name: clientName, text: text.trim() })
    .select("id, text, created_at")
    .single();

  if (error) {
    console.error("comments save error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
