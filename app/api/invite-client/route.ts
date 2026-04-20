import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  const { name, email, slug } = await req.json();

  if (!name || !email || !slug) {
    return NextResponse.json({ ok: false, error: "Name, email and slug are required." }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Create (or look up) the user in Supabase Auth and send them a magic link
  const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  });

  if (inviteError) {
    return NextResponse.json({ ok: false, error: inviteError.message }, { status: 500 });
  }

  // Save their profile (slug mapping)
  const { error: profileError } = await supabase.from("client_profiles").upsert({
    id: inviteData.user.id,
    slug,
    name,
  });

  if (profileError) {
    return NextResponse.json({ ok: false, error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
