"use client";

import { useState } from "react";

export default function InviteClient() {
  const [form, setForm] = useState({ name: "", email: "", slug: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function autoSlug(name: string) {
    return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  function handleNameChange(name: string) {
    setForm(f => ({ ...f, name, slug: autoSlug(name) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/invite-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const json = await res.json();
    if (json.ok) {
      setStatus("done");
    } else {
      setErrorMsg(json.error ?? "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>
      <nav style={{
        background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3", padding: "14px 0",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: 0, fontFamily: "var(--font-dm-serif), serif" }}>
              BeMore<span style={{ color: "#4ec9d0" }}>You</span>
            </p>
            <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: 0 }}>Invite a Client</p>
          </div>
          <a href="/admin/dashboard" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none", padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3 }}>
            ← Dashboard
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 36px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
            New Client Access
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, lineHeight: 1.15 }}>
            Invite a client
          </h1>
        </div>

        {status === "done" ? (
          <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderLeft: "3px solid #E8521C", borderRadius: 3, padding: "28px 32px" }}>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 8px" }}>Invitation sent</p>
            <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.7, margin: "0 0 20px" }}>
              <strong>{form.name}</strong> will receive a magic link at <strong>{form.email}</strong>.<br />
              Their dashboard is at <strong>/client/{form.slug}</strong>.<br /><br />
              <span style={{ fontSize: "0.85rem", color: "#E8521C" }}>Heads up: ask them to check their junk or spam folder if they don't see it.</span>
            </p>
            <button
              onClick={() => { setForm({ name: "", email: "", slug: "" }); setStatus("idle"); }}
              style={{ padding: "11px 28px", background: "#E8521C", color: "#fff", border: "none", borderRadius: 3, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Invite another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
            {[
              { id: "name", label: "Client's full name", placeholder: "e.g. Andy Felton", value: form.name, onChange: (v: string) => handleNameChange(v) },
              { id: "email", label: "Client's email address", placeholder: "e.g. andy@equatedigital.co.uk", value: form.email, onChange: (v: string) => setForm(f => ({ ...f, email: v })) },
              { id: "slug", label: "Dashboard URL slug", placeholder: "e.g. andy-felton", value: form.slug, onChange: (v: string) => setForm(f => ({ ...f, slug: v })) },
            ].map(field => (
              <div key={field.id}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#3D3935", marginBottom: 8 }}>
                  {field.label}
                </label>
                <input
                  type={field.id === "email" ? "email" : "text"}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  required
                  style={{
                    width: "100%", padding: "14px 16px", border: "1px solid #E0DBD3", borderRadius: 3,
                    fontSize: "0.9rem", color: "#1C1C1C", background: "#fff", fontFamily: "inherit",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.15s ease",
                  }}
                  onFocus={e => e.target.style.borderColor = "#E8521C"}
                  onBlur={e => e.target.style.borderColor = "#E0DBD3"}
                />
                {field.id === "slug" && form.slug && (
                  <p style={{ fontSize: "0.75rem", color: "#7A746E", marginTop: 6 }}>
                    Dashboard: bemoreyoulive.com/client/<strong>{form.slug}</strong>
                  </p>
                )}
              </div>
            ))}

            {status === "error" && (
              <p style={{ fontSize: "0.85rem", color: "#E8521C", margin: 0 }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                alignSelf: "flex-start", padding: "13px 36px", background: "#E8521C", color: "#fff",
                border: "none", borderRadius: 3, fontSize: "0.84rem", fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            >
              {status === "sending" ? "Sending..." : "Send Invite →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
