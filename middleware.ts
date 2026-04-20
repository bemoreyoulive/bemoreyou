import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Public routes — always accessible
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/onboarding" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return supabaseResponse;
  }

  // Not logged in — redirect to login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Admin routes — only Ben can access
  if (pathname.startsWith("/admin")) {
    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return supabaseResponse;
  }

  // Client routes — check they own this slug
  if (pathname.startsWith("/client/")) {
    const slug = pathname.split("/")[2];

    // Ben can view any client dashboard
    if (user.email === ADMIN_EMAIL) return supabaseResponse;

    // Client must own this slug
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("slug")
      .eq("id", user.id)
      .single();

    if (!profile || profile.slug !== slug) {
      // Redirect them to their own dashboard
      if (profile?.slug) {
        return NextResponse.redirect(new URL(`/client/${profile.slug}`, request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
