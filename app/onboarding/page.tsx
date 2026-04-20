"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  label: string;
  sublabel?: string;
  type: "text" | "textarea";
  placeholder: string;
}

const questions: Question[] = [
  {
    id: "name",
    label: "What's your name?",
    type: "text",
    placeholder: "Your full name",
  },
  {
    id: "workEmail",
    label: "What's your work email address?",
    sublabel: "This is how we'll stay in touch. Check your junk folder if you don't hear from us.",
    type: "text",
    placeholder: "e.g. hello@yourbusiness.co.uk",
  },
  {
    id: "mobile",
    label: "What's your mobile number?",
    sublabel: "We'll only use this if something urgent comes up.",
    type: "text",
    placeholder: "e.g. 07700 000000",
  },
  {
    id: "business",
    label: "Name of business and industry",
    type: "text",
    placeholder: "e.g. Acme Ltd — Financial Services",
  },
  {
    id: "beliefs",
    label: "What do you stand for and stand against in your industry or space?",
    sublabel: "This speaks to the beliefs and principles that guide how you will show up.",
    type: "textarea",
    placeholder: "I stand for... I stand against...",
  },
  {
    id: "talkAllDay",
    label: "What's something you could talk about all day, that also makes other people lean in and take notes?",
    type: "textarea",
    placeholder: "The topic that lights you up and pulls others in...",
  },
  {
    id: "keyMoment",
    label: "What's a key moment in your life or work that's shaped how you think today?",
    sublabel: "Something lived, not just learned — it could be deeply personal.",
    type: "textarea",
    placeholder: "Take your time with this one...",
  },
  {
    id: "quirks",
    label: "What are three personal quirks, habits or routines that make you... YOU?",
    sublabel: "Anything! Could be your love of clay shooting or collecting stamps!",
    type: "textarea",
    placeholder: "1.\n2.\n3.",
  },
  {
    id: "disagree",
    label: "Is there a popular opinion or industry trend you completely disagree with? And why?",
    sublabel: "What gets you revved up?",
    type: "textarea",
    placeholder: "The thing that makes you want to say 'actually, that's wrong...'",
  },
  {
    id: "proudAchievement",
    label: "What's something you've helped a client, customer or team achieve that you're particularly proud of?",
    type: "textarea",
    placeholder: "What happened, what was the outcome, why did it matter?",
  },
  {
    id: "framework",
    label: "What's a method, framework or bit of knowledge you often find yourself explaining to others?",
    sublabel: "What are you known for?",
    type: "textarea",
    placeholder: "The thing people keep asking you to explain...",
  },
  {
    id: "keynote",
    label: "If I gave you £20k to deliver a keynote next week — no slides, just you and a mic — what topic are you secretly hoping I pick?",
    type: "textarea",
    placeholder: "Your dream topic...",
  },
  {
    id: "why",
    label: "Why do you do what you do? What gets you out of bed in the morning on the good days?",
    sublabel: "This can be selfish — like to create financial freedom for myself or my family.",
    type: "textarea",
    placeholder: "Your real why...",
  },
  {
    id: "recognition",
    label: "Who in your opinion deserves more recognition, and why?",
    sublabel: "Could be a colleague, friend, mentor, philanthropist...",
    type: "textarea",
    placeholder: "Someone who's had an impact on you or the world around you...",
  },
  {
    id: "neverShared",
    label: "What's something you've never shared publicly, but feel might actually help someone else?",
    sublabel: "For example: I struggled with imposter syndrome starting my first business.",
    type: "textarea",
    placeholder: "The thing you've kept to yourself but know someone needs to hear...",
  },
  {
    id: "legacy",
    label: "If someone followed your content for 6 months, what would you want them to say about you?",
    sublabel: "e.g. Bloody insightful, super switched on, expert in their industry, entertaining, memorable?",
    type: "textarea",
    placeholder: "The reputation you want to build...",
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const router = useRouter();

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const progressPct = ((current + 1) / questions.length) * 100;
  const canProceed = (values[q.id] || "").trim().length > 0;

  function handleChange(val: string) {
    setValues(prev => ({ ...prev, [q.id]: val }));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && q.type === "text" && canProceed && !isLast) {
      e.preventDefault();
      setCurrent(c => c + 1);
    }
  }

  async function handleSubmit() {
    setStatus("sending");
    const detail = questions
      .map(question => `${question.label}\n${values[question.id] || "(not answered)"}`)
      .join("\n\n---\n\n");

    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "onboarding",
          clientName: values.name || "New Client",
          detail,
          answers: values,
        }),
      });
      const slug = (values.name || "new-client")
        .toLowerCase().trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      router.replace(`/client/${slug}`);
    } catch {
      setStatus("error");
    }
  }


  return (
    <div style={{ minHeight: "100vh", background: "#F5F1EC" }}>
      {/* Nav */}
      <nav style={{
        background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3", padding: "14px 0",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: 0, fontFamily: "var(--font-dm-serif), serif" }}>
              BeMore<span style={{ color: "#4ec9d0" }}>You</span>
            </p>
            <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: 0 }}>
              New Client Onboarding
            </p>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#7A746E", margin: 0 }}>
            {current + 1} <span style={{ color: "#E0DBD3" }}>of</span> {questions.length}
          </p>
        </div>
      </nav>

      {/* Progress bar */}
      <div style={{ height: 2, background: "#E0DBD3" }}>
        <div style={{
          height: "100%", width: `${progressPct}%`,
          background: "#E8521C", transition: "width 0.4s ease",
        }} />
      </div>

      {/* Question */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 36px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#E8521C", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ display: "inline-block", width: 24, height: 2, background: "#E8521C" }} />
            Question {current + 1}
          </p>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontFamily: "var(--font-dm-serif), serif",
            fontWeight: 400, color: "#1C1C1C", margin: "0 0 12px", lineHeight: 1.25,
          }}>
            {q.label}
          </h2>
          {q.sublabel && (
            <p style={{ fontSize: "0.88rem", color: "#7A746E", margin: 0, lineHeight: 1.6 }}>
              {q.sublabel}
            </p>
          )}
        </div>

        {q.type === "textarea" ? (
          <textarea
            key={q.id}
            value={values[q.id] || ""}
            onChange={e => handleChange(e.target.value)}
            placeholder={q.placeholder}
            rows={6}
            autoFocus
            style={{
              width: "100%", padding: "18px 20px",
              border: "1px solid #E0DBD3", borderRadius: 3,
              fontSize: "0.95rem", color: "#1C1C1C",
              background: "#fff", resize: "vertical",
              fontFamily: "inherit", lineHeight: 1.7,
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.15s ease",
            }}
            onFocus={e => e.target.style.borderColor = "#E8521C"}
            onBlur={e => e.target.style.borderColor = "#E0DBD3"}
          />
        ) : (
          <input
            key={q.id}
            type="text"
            value={values[q.id] || ""}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={q.placeholder}
            autoFocus
            style={{
              width: "100%", padding: "18px 20px",
              border: "1px solid #E0DBD3", borderRadius: 3,
              fontSize: "0.95rem", color: "#1C1C1C",
              background: "#fff", fontFamily: "inherit",
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.15s ease",
            }}
            onFocus={e => e.target.style.borderColor = "#E8521C"}
            onBlur={e => e.target.style.borderColor = "#E0DBD3"}
          />
        )}

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40 }}>
          {current > 0 ? (
            <button
              onClick={() => setCurrent(c => c - 1)}
              style={{
                fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "12px 28px", border: "1px solid #E0DBD3", borderRadius: 3,
                background: "transparent", color: "#7A746E", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              ← Back
            </button>
          ) : <div />}

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || status === "sending"}
              style={{
                fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                padding: "14px 44px", border: "none", borderRadius: 3,
                background: canProceed ? "#E8521C" : "#E0DBD3",
                color: canProceed ? "#fff" : "#7A746E",
                cursor: canProceed ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
              }}
            >
              {status === "sending" ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={() => setCurrent(c => c + 1)}
              disabled={!canProceed}
              style={{
                fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                padding: "14px 44px", border: "none", borderRadius: 3,
                background: canProceed ? "#E8521C" : "#E0DBD3",
                color: canProceed ? "#fff" : "#7A746E",
                cursor: canProceed ? "pointer" : "not-allowed",
                transition: "background 0.15s ease",
              }}
            >
              Next →
            </button>
          )}
        </div>

        {status === "error" && (
          <p style={{ fontSize: "0.8rem", color: "#E8521C", marginTop: 16, textAlign: "right" }}>
            Something went wrong — try again.
          </p>
        )}

        {/* Dot progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 56 }}>
          {questions.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 99,
                background: i === current ? "#E8521C" : i < current ? "#3D3935" : "#E0DBD3",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
