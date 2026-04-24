"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background: "#1C1C1C"}}>
      <div style={{textAlign: "center", maxWidth: 480}}>
        <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8521C", marginBottom: 16}}>
          Don't be beige.
        </p>
        <h1 style={{fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "var(--font-dm-serif), serif", fontWeight: 400, letterSpacing: "-0.035em", color: "#fff", lineHeight: 1.05, margin: "0 0 8px"}}>
          BeMore<span style={{color: "#4ec9d0"}}>You</span>
        </h1>
        <p style={{fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A746E", marginBottom: 56}}>
          Coaching Portal
        </p>

        <div style={{display: "flex", flexDirection: "column", gap: 12}}>
          <a
            href="/login"
            style={{
              display: "block", padding: "17px 38px",
              background: "#E8521C", color: "#fff",
              borderRadius: 3, fontSize: "0.84rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
            }}
            onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#BF4016"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 36px rgba(232,82,28,0.28)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#E8521C"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Client Login
          </a>
          <a
            href="/onboarding"
            style={{
              display: "block", padding: "17px 38px",
              background: "transparent", color: "#fff",
              borderRadius: 3, fontSize: "0.84rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            Onboard as New Client
          </a>
          <a
            href="/admin"
            style={{
              display: "block", padding: "17px 38px",
              background: "transparent", color: "#7A746E",
              borderRadius: 3, fontSize: "0.84rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.08)",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "#7A746E"; }}
          >
            Admin Login
          </a>
        </div>
      </div>

      <p style={{marginTop: 40, fontSize: "0.72rem", color: "#5A534E", lineHeight: 1.6, textAlign: "center"}}>
        For the best experience, access your portal<br />on a computer or laptop — not your phone.
      </p>

      <p style={{position: "absolute", bottom: 32, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3D3935"}}>
        bemoreyoulive.com
      </p>
    </div>
  );
}
