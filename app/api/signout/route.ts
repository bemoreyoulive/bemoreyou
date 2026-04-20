import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase-middleware";

export async function POST(req: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(req);
  await supabase.auth.signOut();
  const redirect = NextResponse.redirect(new URL("/login", req.url));
  supabaseResponse.cookies.getAll().forEach(cookie => {
    redirect.cookies.set(cookie.name, "", { maxAge: 0, path: "/" });
  });
  return redirect;
}
