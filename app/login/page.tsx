"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const hasError = searchParams.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback${next ? `?next=${next}` : ""}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: "0 0 4px", fontFamily: "var(--font-dm-serif), serif" }}>
            BeMore<span style={{ color: "#4ec9d0" }}>You</span>
          </p>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", margin: 0 }}>
            Client Portal
          </p>
        </div>

        {hasError && (
          <div style={{ padding: "12px 16px", background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3, marginBottom: 24 }}>
            <p style={{ fontSize: "0.85rem", color: "#E8521C", margin: 0 }}>That login link has expired. Request a new one below.</p>
          </div>
        )}

        {status === "sent" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%", background: "#E8521C",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: "1.4rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px" }}>
              Check your inbox
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#7A746E", lineHeight: 1.7, margin: 0 }}>
              We've sent a login link to<br />
              <strong style={{ color: "#1C1C1C" }}>{email}</strong>
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{ marginTop: 24, fontSize: "0.75rem", color: "#7A746E", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
                Sign in
              </p>
              <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, lineHeight: 1.2 }}>
                Welcome back.
              </h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                style={{
                  width: "100%", padding: "14px 16px",
                  border: "1px solid #E0DBD3", borderRadius: 3,
                  fontSize: "0.9rem", color: "#1C1C1C",
                  background: "#fff", fontFamily: "inherit",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.15s ease",
                }}
                onFocus={e => e.target.style.borderColor = "#E8521C"}
                onBlur={e => e.target.style.borderColor = "#E0DBD3"}
              />
              {status === "error" && (
                <p style={{ fontSize: "0.8rem", color: "#E8521C", margin: 0 }}>Something went wrong — try again.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending" || !email.trim()}
                style={{
                  padding: "14px", border: "none", borderRadius: 3,
                  background: email.trim() ? "#E8521C" : "#E0DBD3",
                  color: email.trim() ? "#fff" : "#7A746E",
                  fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em",
                  textTransform: "uppercase", cursor: email.trim() ? "pointer" : "not-allowed",
                  transition: "background 0.15s ease",
                }}
              >
                {status === "sending" ? "Sending..." : "Send Login Link"}
              </button>
            </form>

            <p style={{ fontSize: "0.78rem", color: "#7A746E", marginTop: 20, lineHeight: 1.6, textAlign: "center" }}>
              We'll email you a magic link — no password needed.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
