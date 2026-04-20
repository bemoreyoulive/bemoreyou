import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";
const SITE_URL = "https://bemoreyoulive.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const { supabase, supabaseResponse } = createMiddlewareClient(request);

  let user = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) user = data.user;
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type: type as "magiclink" | "email" });
    if (!error) user = data.user;
  }

  if (user) {
    const email = user.email;

    if (email === ADMIN_EMAIL) {
      const redirect = NextResponse.redirect(`${SITE_URL}/admin/dashboard`);
      supabaseResponse.cookies.getAll().forEach(cookie => {
        redirect.cookies.set(cookie.name, cookie.value, { path: "/" });
      });
      return redirect;
    }

    const service = createServiceClient();
    const { data: profile } = await service
      .from("client_profiles")
      .select("slug")
      .eq("id", user.id)
      .single();

    const destination = profile?.slug
      ? `${SITE_URL}/client/${profile.slug}`
      : `${SITE_URL}/login`;

    const redirect = NextResponse.redirect(destination);
    supabaseResponse.cookies.getAll().forEach(cookie => {
      redirect.cookies.set(cookie.name, cookie.value, { path: "/" });
    });
    return redirect;
  }

  return NextResponse.redirect(`${SITE_URL}/login?error=auth`);
}
