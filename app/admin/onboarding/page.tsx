"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

interface Submission {
  id: string;
  client_name: string;
  answers: Record<string, string>;
  submitted_at: string;
}

const questionLabels: Record<string, string> = {
  name: "What's your name?",
  workEmail: "Work email address",
  mobile: "Mobile number",
  business: "Name of business and industry",
  beliefs: "What do you stand for and stand against in your industry or space?",
  talkAllDay: "What's something you could talk about all day, that also makes other people lean in and take notes?",
  keyMoment: "What's a key moment in your life or work that's shaped how you think today?",
  quirks: "What are three personal quirks, habits or routines that make you... YOU?",
  disagree: "Is there a popular opinion or industry trend you completely disagree with? And why?",
  proudAchievement: "What's something you've helped a client, customer or team achieve that you're particularly proud of?",
  framework: "What's a method, framework or bit of knowledge you often find yourself explaining to others?",
  keynote: "If I gave you £20k to deliver a keynote next week — what topic are you secretly hoping I pick?",
  why: "Why do you do what you do? What gets you out of bed in the morning?",
  recognition: "Who in your opinion deserves more recognition, and why?",
  neverShared: "What's something you've never shared publicly, but feel might actually help someone else?",
  legacy: "If someone followed your content for 6 months, what would you want them to say about you?",
};

export default function OnboardingSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("onboarding_submissions")
        .select("*")
        .order("submitted_at", { ascending: false });
      setSubmissions(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>
      <nav style={{
        background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3", padding: "14px 0",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: 0, fontFamily: "var(--font-dm-serif), serif" }}>
              BeMore<span style={{ color: "#4ec9d0" }}>You</span>
            </p>
            <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: 0 }}>Onboarding Submissions</p>
          </div>
          <a href="/admin/dashboard" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none", padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3 }}>
            ← Dashboard
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "56px 36px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
            New Client Questionnaires
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, color: "#1C1C1C", margin: 0, lineHeight: 1.1 }}>
            Onboarding Submissions
          </h1>
        </div>

        {loading && (
          <p style={{ fontSize: "0.9rem", color: "#7A746E" }}>Loading...</p>
        )}

        {!loading && submissions.length === 0 && (
          <div style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, padding: "40px 32px", textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "#7A746E", margin: 0 }}>No submissions yet. Share <strong>bemoreyoulive.com/onboarding</strong> with new clients.</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {submissions.map((s) => {
            const isOpen = open === s.id;
            const date = new Date(s.submitted_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
            return (
              <div key={s.id} style={{ background: "#fff", border: "1px solid #E0DBD3", borderRadius: 4, overflow: "hidden" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "24px 32px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px" }}>{s.client_name}</p>
                    <p style={{ fontSize: "0.78rem", color: "#7A746E", margin: 0 }}>Submitted {date}</p>
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8521C" }}>
                    {isOpen ? "Close ↑" : "View ↓"}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: "1px solid #E0DBD3", padding: "32px", display: "flex", flexDirection: "column", gap: 28 }}>
                    {Object.entries(questionLabels).map(([key, label]) => {
                      const answer = s.answers?.[key];
                      if (!answer) return null;
                      return (
                        <div key={key}>
                          <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8521C", margin: "0 0 8px" }}>
                            {label}
                          </p>
                          <p style={{ fontSize: "0.9rem", color: "#3D3935", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>
                            {answer}
                          </p>
                        </div>
                      );
                    })}
                    <div style={{ paddingTop: 24, borderTop: "1px solid #E0DBD3" }}>
                      <a
                        href="/admin/clients/invite"
                        style={{
                          display: "inline-block", padding: "12px 28px",
                          background: "#E8521C", color: "#fff", borderRadius: 3,
                          fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em",
                          textTransform: "uppercase", textDecoration: "none",
                        }}
                      >
                        Invite this client →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
