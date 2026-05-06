import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("milestone_states")
    .select("milestone_id, completed")
    .eq("slug", slug);

  if (error) {
    console.error("milestone-state load error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function POST(req: NextRequest) {
  const { slug, milestoneId, completed } = await req.json();

  if (!slug || !milestoneId || typeof completed !== "boolean") {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("milestone_states")
    .upsert(
      {
        slug,
        milestone_id: milestoneId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      },
      { onConflict: "slug,milestone_id" }
    );

  if (error) {
    console.error("milestone-state save error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
