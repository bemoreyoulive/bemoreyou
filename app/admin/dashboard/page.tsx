"use client";

const clients = [
  {
    slug: "andy-felton",
    name: "Andy Felton",
    role: "Founder, Equate Digital",
    started: "Dec 2025",
    sessions: 8,
    status: "Active",
    color: "#2d5a8e",
    initials: "AF",
  },
  {
    slug: "andy-scott-barrett",
    name: "Andy Scott Barrett",
    role: "Founder, Ascott Financial Direction",
    started: "Mar 2026",
    sessions: 3,
    status: "Active",
    color: "#2e7d4f",
    initials: "ASB",
  },
  {
    slug: "nikki-mcreynolds",
    name: "Nikki McReynolds",
    role: "Founder, HushAway",
    started: "Nov 2025",
    sessions: 11,
    status: "Active",
    color: "#7c3aed",
    initials: "NM",
  },
  {
    slug: "james-hartley",
    name: "James Hartley",
    role: "Founder, IgnitionCraft",
    started: "2026",
    sessions: 0,
    status: "Setting Up",
    color: "#7A746E",
    initials: "JH",
  },
  {
    slug: "solve-people",
    name: "Solve People",
    role: "Luenna Knight & Brett Edyvane",
    started: "Feb 2026",
    sessions: 6,
    status: "Active",
    color: "#c95e00",
    initials: "SP",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen" style={{background: "#F5F1EC"}}>
      {/* Nav */}
      <nav style={{
        background: "rgba(245,241,236,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3",
        padding: "14px 0",
      }}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <p style={{fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", margin: 0, fontFamily: "var(--font-dm-serif), serif"}}>
              BeMore<span style={{color: "#4ec9d0"}}>You</span>
            </p>
            <p style={{fontSize: "0.63rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: 0}}>Admin Dashboard</p>
          </div>
          <a
            href="/"
            style={{
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#7A746E", textDecoration: "none",
              padding: "9px 20px", border: "1px solid #E0DBD3", borderRadius: 3,
              transition: "all 0.15s ease",
            }}
          >
            Sign Out
          </a>
        </div>
      </nav>

      {/* Main */}
      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>
        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40}}>
          <div>
            <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 8, display: "flex", alignItems: "center", gap: 8}}>
              <span style={{display: "inline-block", width: 24, height: 2, background: "#E8521C", verticalAlign: "middle"}} />
              Your Clients
            </p>
            <h2 style={{fontSize: "clamp(2rem, 3vw, 2.8rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, letterSpacing: "-0.03em", color: "#1C1C1C", margin: 0, lineHeight: 1.1}}>
              {clients.filter(c => c.status === "Active").length} active · {clients.length} total
            </h2>
          </div>
          <button
            style={{
              padding: "13px 32px", background: "#E8521C", color: "#fff",
              border: "none", borderRadius: 3, fontSize: "0.84rem",
              fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#BF4016")}
            onMouseOut={e => (e.currentTarget.style.background = "#E8521C")}
          >
            + Add Client
          </button>
        </div>

        {/* Client Cards */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20}}>
          {clients.map((client) => (
            <a
              key={client.slug}
              href={`/admin/clients/${client.slug}`}
              style={{
                display: "block", background: "#fff", borderRadius: 4,
                border: "1px solid #E0DBD3", padding: "28px 32px",
                textDecoration: "none", transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(28,28,28,0.10)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >
              <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20}}>
                <div style={{
                  width: 44, height: 44, borderRadius: 3,
                  background: client.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em",
                }}>
                  {client.initials}
                </div>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", padding: "4px 10px", borderRadius: 2,
                  background: client.status === "Active" ? "#e8f5ee" : "#f3f2f0",
                  color: client.status === "Active" ? "#2e7d4f" : "#7A746E",
                }}>
                  {client.status}
                </span>
              </div>
              <h3 style={{fontSize: "1rem", fontWeight: 600, color: "#1C1C1C", margin: "0 0 4px", letterSpacing: "-0.01em"}}>{client.name}</h3>
              <p style={{fontSize: "0.85rem", color: "#7A746E", margin: "0 0 20px"}}>{client.role}</p>
              <div style={{display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #E0DBD3", fontSize: "0.78rem", color: "#7A746E"}}>
                <span>Since {client.started}</span>
                <span style={{color: "#E0DBD3"}}>·</span>
                <span style={{fontWeight: 600, color: client.color}}>{client.sessions} sessions</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
