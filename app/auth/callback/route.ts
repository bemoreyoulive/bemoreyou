import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";
const SITE_URL = "https://bemoreyoulive.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "magiclink" | "email" | null;

  const response = NextResponse.redirect(`${SITE_URL}/login?error=auth`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  let user = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) user = data.user;
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) user = data.user;
  }

  if (!user) {
    return response;
  }

  // Determine destination
  let destination = `${SITE_URL}/login`;

  if (user.email === ADMIN_EMAIL) {
    destination = `${SITE_URL}/admin/dashboard`;
  } else {
    const service = createServiceClient();
    const { data: profile } = await service
      .from("client_profiles")
      .select("slug")
      .eq("id", user.id)
      .single();
    if (profile?.slug) {
      destination = `${SITE_URL}/client/${profile.slug}`;
    }
  }

  const redirect = NextResponse.redirect(destination);
  // Copy all cookies (session) to the final redirect
  response.cookies.getAll().forEach(cookie => {
    redirect.cookies.set(cookie.name, cookie.value, { path: "/" });
  });
  return redirect;
}
