import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";
const SITE_URL = "https://bemoreyoulive.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const { supabase, supabaseResponse } = createMiddlewareClient(request);
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const email = data.user.email;

      // Ben goes to admin dashboard
      if (email === ADMIN_EMAIL) {
        const redirect = NextResponse.redirect(`${SITE_URL}/admin/dashboard`);
        supabaseResponse.cookies.getAll().forEach(cookie => {
          redirect.cookies.set(cookie.name, cookie.value, { path: "/" });
        });
        return redirect;
      }

      // Client — look up their slug
      const service = createServiceClient();
      const { data: profile } = await service
        .from("client_profiles")
        .select("slug")
        .eq("id", data.user.id)
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
  }

  return NextResponse.redirect(`${SITE_URL}/login?error=auth`);
}
