import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const { slug, todoId, completed } = await req.json();

  if (!slug || !todoId || typeof completed !== "boolean") {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: existing } = await supabase
    .from("todo_states")
    .select("todo_id")
    .eq("slug", slug)
    .eq("todo_id", todoId)
    .maybeSingle();

  const { error } = existing
    ? await supabase
        .from("todo_states")
        .update({ completed, updated_at: new Date().toISOString() })
        .eq("slug", slug)
        .eq("todo_id", todoId)
    : await supabase
        .from("todo_states")
        .insert({ slug, todo_id: todoId, completed, updated_at: new Date().toISOString() });

  if (error) {
    console.error("todo-state save error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("todo_states")
    .select("todo_id, completed")
    .eq("slug", slug);

  if (error) {
    console.error("todo-state load error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
