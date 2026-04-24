"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

const hardcodedClients = [
  { slug: "andy-felton", adminPath: "/client/andy-felton", name: "Andy Felton", role: "Founder, Equate Digital", started: "Dec 2025", sessions: 8, status: "Active", color: "#2d5a8e", initials: "AF" },
  { slug: "andy-scott-barrett", adminPath: "/client/andy-scott-barrett", name: "Andy Scott Barrett", role: "Founder, Ascott Financial Direction", started: "Mar 2026", sessions: 3, status: "Active", color: "#2e7d4f", initials: "ASB" },
  { slug: "nikki-mcreynolds", adminPath: "/client/nikki-mcreynolds", name: "Nikki McReynolds", role: "Founder, HushAway", started: "Nov 2025", sessions: 11, status: "Active", color: "#7c3aed", initials: "NM" },
  { slug: "james-hartley", adminPath: null, name: "James Hartley", role: "Founder, IgnitionCraft", started: "2026", sessions: 0, status: "Setting Up", color: "#7A746E", initials: "JH" },
  { slug: "solve-people", adminPath: "/client/solve-people", name: "Solve People", role: "Luenna Knight & Brett Edyvane", started: "Feb 2026", sessions: 6, status: "Active", color: "#c95e00", initials: "SP" },
];

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
}

interface Client {
  slug: string;
  adminPath?: string | null;
  name: string;
  role: string;
  started: string;
  sessions: number;
  status: string;
  color: string;
  initials: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>(hardcodedClients);

  useEffect(() => {
    async function loadPending() {
      const supabase = createClient();
      const { data } = await supabase
        .from("client_profiles")
        .select("slug, name, role, status, started, sessions")
        .eq("status", "Pending");

      if (!data?.length) return;

      const hardcodedSlugs = new Set(hardcodedClients.map(c => c.slug));
      const newClients: Client[] = data
        .filter(p => !hardcodedSlugs.has(p.slug))
        .map(p => ({
          slug: p.slug,
          name: p.name,
          role: p.role ?? "",
          started: p.started ?? new Date().getFullYear().toString(),
          sessions: p.sessions ?? 0,
          status: "Pending",
          color: "#7A746E",
          initials: initials(p.name),
        }));

      if (newClients.length) {
        setClients([...hardcodedClients, ...newClients]);
      }
    }
    loadPending();
  }, []);

  const activeCount = clients.filter(c => c.status === "Active").length;

  function statusStyle(status: string) {
    if (status === "Active") return { background: "rgba(46,125,79,0.18)", color: "#4caf7d", border: "1px solid rgba(46,125,79,0.3)" };
    if (status === "Pending") return { background: "rgba(232,82,28,0.15)", color: "#E8521C", border: "1px solid rgba(232,82,28,0.3)" };
    return { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)" };
  }

  return (
    <div className="min-h-screen" style={{background: "#13120f"}}>
      <nav style={{background: "rgba(19,18,15,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 0"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <p style={{fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", margin: 0, fontFamily: "var(--font-dm-serif), serif"}}>
              BeMore<span style={{color: "#4ec9d0"}}>You</span>
            </p>
            <p style={{fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: 0}}>Admin Dashboard</p>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 10}}>
            <a href="/admin/onboarding" style={{fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8521C", textDecoration: "none", padding: "8px 18px", border: "1px solid rgba(232,82,28,0.4)", borderRadius: 3, background: "rgba(232,82,28,0.08)"}}>
              Onboarding
            </a>
            <a href="https://bemoreyoulive.com/onboarding" target="_blank" rel="noopener noreferrer" style={{fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "8px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3}}>
              Onboard New Client
            </a>
            <a href="/admin/clients/invite" style={{fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "8px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3}}>
              + Invite Client
            </a>
            <form action="/api/signout" method="POST" style={{margin: 0}}>
              <button type="submit" style={{fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: "8px 18px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 3, background: "transparent", cursor: "pointer"}}>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>
        <div style={{marginBottom: 44}}>
          <p style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8521C", marginBottom: 10, display: "flex", alignItems: "center", gap: 8}}>
            <span style={{display: "inline-block", width: 20, height: 2, background: "#E8521C"}} />
            Your Clients
          </p>
          <h2 style={{fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, letterSpacing: "-0.03em", color: "#fff", margin: 0, lineHeight: 1.1}}>
            {activeCount} active · {clients.length} total
          </h2>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16}}>
          {clients.map((client) => (
            <a
              key={client.slug}
              href={client.status === "Pending" ? `/admin/onboarding` : (client.adminPath ?? "#")}
              style={{display: "block", background: "#1c1b17", borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", overflow: "hidden", transition: "transform 0.2s ease, box-shadow 0.2s ease"}}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.4)`; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >
              {/* Colour bar */}
              <div style={{height: 3, background: client.color, width: "100%"}} />

              <div style={{padding: "24px 26px 22px"}}>
                <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18}}>
                  <div style={{width: 42, height: 42, borderRadius: 6, background: `${client.color}22`, border: `1px solid ${client.color}44`, display: "flex", alignItems: "center", justifyContent: "center", color: client.color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em"}}>
                    {client.initials}
                  </div>
                  <span style={{fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 20, ...statusStyle(client.status)}}>
                    {client.status}
                  </span>
                </div>

                <h3 style={{fontSize: "1rem", fontWeight: 600, color: "#fff", margin: "0 0 3px", letterSpacing: "-0.01em"}}>{client.name}</h3>
                <p style={{fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: "0 0 22px", lineHeight: 1.4}}>{client.role || "Questionnaire submitted"}</p>

                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "0.75rem"}}>
                  <div style={{display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.3)"}}>
                    <span>Since {client.started}</span>
                    <span style={{opacity: 0.4}}>·</span>
                    <span style={{fontWeight: 600, color: client.color}}>{client.sessions} sessions</span>
                  </div>
                  {client.status === "Pending" && (
                    <span style={{fontWeight: 600, color: "#E8521C", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>View →</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
