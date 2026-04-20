import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";

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
        const url = new URL("/admin/dashboard", request.url);
        const redirect = NextResponse.redirect(url);
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
        ? `/client/${profile.slug}`
        : next !== "/" ? next : "/login";

      const url = new URL(destination, request.url);
      const redirect = NextResponse.redirect(url);
      supabaseResponse.cookies.getAll().forEach(cookie => {
        redirect.cookies.set(cookie.name, cookie.value, { path: "/" });
      });
      return redirect;
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth", request.url));
}
