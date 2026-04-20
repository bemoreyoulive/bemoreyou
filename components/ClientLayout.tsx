"use client";

import { useState } from "react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
}

interface ClientLayoutProps {
  clientName: string;
  clientRole: string;
  clientColor?: string;
  clientInitials?: string;
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
}

export default function ClientLayout({ clientName, clientRole, clientColor = "#E8521C", clientInitials, tabs, children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const initials = clientInitials || clientName.split(" ").map(w => w[0]).join("").slice(0, 3);

  return (
    <div className="min-h-screen" style={{background: "#F5F1EC"}}>
      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(245,241,236,0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DBD3",
        padding: "14px 0",
      }}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex", alignItems: "center", gap: 20}}>
            <Link href="/admin/dashboard" style={{fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", textDecoration: "none"}}>
              ← All Clients
            </Link>
            <div style={{width: 1, height: 16, background: "#E0DBD3"}} />
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
              <div style={{
                width: 34, height: 34, borderRadius: 3,
                background: clientColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em",
                flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <p style={{fontSize: "0.95rem", fontWeight: 600, color: "#1C1C1C", margin: 0, letterSpacing: "-0.01em"}}>{clientName}</p>
                <p style={{fontSize: "0.68rem", color: "#7A746E", margin: 0, letterSpacing: "0.05em"}}>{clientRole}</p>
              </div>
            </div>
          </div>
          <div style={{fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1C1C", fontFamily: "var(--font-dm-serif), serif"}}>
            BeMore<span style={{color: "#4ec9d0"}}>You</span>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div style={{borderBottom: "1px solid #E0DBD3", background: "rgba(245,241,236,0.6)"}}>
        <div style={{maxWidth: 1160, margin: "0 auto", padding: "0 36px", display: "flex", gap: 0, overflowX: "auto"}}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 20px",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                transition: "color 0.15s ease",
                borderBottom: activeTab === tab.id ? `2px solid ${clientColor}` : "2px solid transparent",
                marginBottom: -1,
                color: activeTab === tab.id ? clientColor : "#7A746E",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth: 1160, margin: "0 auto", padding: "56px 36px"}}>
        {children(activeTab)}
      </div>
    </div>
  );
}
