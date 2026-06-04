"use client";

import { useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const ADMIN_EMAIL = "ben@thepersonalbrandingguy.com";

function Logo() {
  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <p style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: "0 0 4px", fontFamily: "var(--font-dm-serif), serif" }}>
        BeMore<span style={{ color: "#4ec9d0" }}>You</span>
      </p>
      <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", margin: 0 }}>
        Client Portal
      </p>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""]);
  const [status, setStatus] = useState<"idle" | "sending" | "verifying" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";

  // Step 1 — send the code
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    // shouldCreateUser: false prevents random signups
    await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: false },
    });

    // Always advance — never reveal whether the email exists
    setStatus("idle");
    setStep("code");
    setTimeout(() => codeRefs.current[0]?.focus(), 100);
  }

  // Step 2 — verify the code
  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = code.join("");
    if (token.length !== 8) return;
    setStatus("verifying");
    setErrorMsg("");

    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token,
      type: "email",
    });

    if (error || !data.user) {
      setStatus("error");
      setErrorMsg("That code isn't right — check your email and try again.");
      setCode(["", "", "", "", "", "", "", ""]);
      setTimeout(() => codeRefs.current[0]?.focus(), 50);
      return;
    }

    // Redirect to the right place
    const user = data.user;
    if (user.email === ADMIN_EMAIL) {
      window.location.href = "/admin/dashboard";
      return;
    }

    const metaSlug = user.user_metadata?.slug as string | undefined;
    if (metaSlug) {
      window.location.href = next ? next : `/client/${metaSlug}`;
      return;
    }

    // Fallback: look up from client_profiles
    const { data: profile } = await supabase
      .from("client_profiles")
      .select("slug")
      .eq("id", user.id)
      .single();

    window.location.href = profile?.slug ? `/client/${profile.slug}` : "/";
  }

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) codeRefs.current[index + 1]?.focus();
  }

  function handleDigitKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8);
    if (digits.length === 8) {
      setCode(digits.split(""));
      e.preventDefault();
      codeRefs.current[7]?.focus();
    }
  }

  if (step === "code") {
    const codeComplete = code.every(d => d !== "");
    return (
      <div style={{ minHeight: "100vh", background: "#F5F1EC", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <Logo />

          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
              Enter your code
            </p>
            <h1 style={{ fontSize: "1.6rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.2 }}>
              Check your email.
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#7A746E", margin: 0 }}>
              We sent an 8-digit code to <strong style={{ color: "#1C1C1C" }}>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleCodeSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 6-digit boxes */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }} onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { codeRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleDigitChange(i, e.target.value)}
                  onKeyDown={e => handleDigitKeyDown(i, e)}
                  style={{
                    width: 40, height: 50,
                    textAlign: "center",
                    fontSize: "1.4rem", fontWeight: 700, color: "#1C1C1C",
                    background: "#fff",
                    border: digit ? "2px solid #E8521C" : "1px solid #E0DBD3",
                    borderRadius: 6,
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s",
                    caretColor: "transparent",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#E8521C"; e.target.style.borderWidth = "2px"; }}
                  onBlur={e => { if (!digit) { e.target.style.borderColor = "#E0DBD3"; e.target.style.borderWidth = "1px"; }}}
                />
              ))}
            </div>

            {status === "error" && (
              <p style={{ fontSize: "0.8rem", color: "#E8521C", margin: 0, textAlign: "center" }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={!codeComplete || status === "verifying"}
              style={{
                padding: "14px", border: "none", borderRadius: 3,
                background: codeComplete ? "#E8521C" : "#E0DBD3",
                color: codeComplete ? "#fff" : "#7A746E",
                fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: codeComplete ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
              }}
            >
              {status === "verifying" ? "Checking…" : "Sign in"}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>
              Can&apos;t find it? Check your junk folder.
            </p>
            <button
              onClick={() => { setStep("email"); setCode(["","","","","",""]); setStatus("idle"); setErrorMsg(""); }}
              style={{ fontSize: "0.75rem", color: "#7A746E", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Use a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <Logo />

        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
            Sign in
          </p>
          <h1 style={{ fontSize: "1.6rem", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, lineHeight: 1.2 }}>
            Welcome back.
          </h1>
        </div>

        <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
            {status === "sending" ? "Sending…" : "Send me a code"}
          </button>
        </form>

        <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: 16, lineHeight: 1.5, textAlign: "center" }}>
          We&apos;ll email you an 8-digit code — no password needed.
        </p>
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
