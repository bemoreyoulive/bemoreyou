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
    if (status === "Active") return { background: "#e8f5ee", color: "#2e7d4f" };
    if (status === "Pending") return { background: "#fff3ec", color: "#E8521C" };
    return { background: "#f3f2f0", color: "#7A746E" };
  }

  return (
    <div className="min-h-screen" style={{background: "#F5F1EC"}}>
      <nav style={{background: "rgba(245,241,236,0.95)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E0DBD3", padding: "14px 0"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <p style={{fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: 0, fontFamily: "var(--font-dm-serif), serif"}}>
              BeMore<span style={{color: "#4ec9d0"}}>You</span>
            </p>
            <p style={{fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: 0}}>Admin Dashboard</p>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <a href="/admin/onboarding" style={{fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8521C", textDecoration: "none", padding: "9px 20px", border: "1px solid #E8521C", borderRadius: 3}}>
              Onboarding
            </a>
            <a href="https://bemoreyoulive.com/onboarding" target="_blank" rel="noopener noreferrer" style={{fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none", padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3}}>
              Onboard New Client
            </a>
            <a href="/admin/clients/invite" style={{fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none", padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3}}>
              + Invite Client
            </a>
            <form action="/api/signout" method="POST" style={{margin: 0}}>
              <button type="submit" style={{fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3, background: "transparent", cursor: "pointer"}}>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>
        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40}}>
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: "#E8521C", verticalAlign: "middle"}} />
              Your Clients
            </p>
            <h2 style={{fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, letterSpacing: "-0.03em", color: "#1C1C1C", margin: 0, lineHeight: 1.1}}>
              {activeCount} active · {clients.length} total
            </h2>
          </div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20}}>
          {clients.map((client) => (
            <a
              key={client.slug}
              href={client.status === "Pending" ? `/admin/onboarding` : (client.adminPath ?? "#")}
              style={{display: "block", background: "#fff", borderRadius: 4, border: "1px solid #E0DBD3", padding: "28px 32px", textDecoration: "none", transition: "box-shadow 0.2s ease, transform 0.2s ease"}}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(28,28,28,0.10)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >
              <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20}}>
                <div style={{width: 44, height: 44, borderRadius: 3, background: client.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em"}}>
                  {client.initials}
                </div>
                <span style={{fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 2, ...statusStyle(client.status)}}>
                  {client.status}
                </span>
              </div>
              <h3 style={{fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px", letterSpacing: "-0.01em"}}>{client.name}</h3>
              <p style={{fontSize: "0.85rem", color: "#7A746E", margin: "0 0 20px"}}>{client.role || "Questionnaire submitted"}</p>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #E0DBD3", fontSize: "0.78rem", color: "#7A746E"}}>
                <div style={{display: "flex", alignItems: "center", gap: 12}}>
                  <span>Since {client.started}</span>
                  <span style={{color: "#E0DBD3"}}>·</span>
                  <span style={{fontWeight: 600, color: client.color}}>{client.sessions} sessions</span>
                </div>
                {client.status !== "Pending" && (
                  <a
                    href={`/client/${client.slug}`}
                    onClick={e => e.stopPropagation()}
                    style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none", padding: "5px 12px", border: "1px solid #E0DBD3", borderRadius: 2}}
                  >
                    Preview →
                  </a>
                )}
                {client.status === "Pending" && (
                  <span style={{fontWeight: 600, color: "#E8521C", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase"}}>View answers →</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
