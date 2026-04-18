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

export default function ClientLayout({ clientName, clientRole, clientColor = "#2d5a8e", clientInitials, tabs, children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const initials = clientInitials || clientName.split(" ").map(w => w[0]).join("").slice(0, 3);

  return (
    <div className="min-h-screen" style={{background: "#f7f6f3"}}>
      {/* Header */}
      <div className="border-b border-gray-200 px-10 py-5 flex items-center justify-between" style={{background: "#1a1a18"}}>
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-gray-500 text-xs tracking-widest uppercase hover:text-gray-300 transition-colors">
            ← All Clients
          </Link>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{background: clientColor}}
            >
              {initials}
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">{clientName}</h1>
              <p className="text-xs text-gray-400">{clientRole}</p>
            </div>
          </div>
        </div>
        <div className="text-sm font-bold tracking-tight text-white">
          BeMore<span style={{color: "#4ec9d0"}}>You</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-10 pt-6 pb-0 border-b border-gray-200" style={{background: "#ffffff"}}>
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2.5 text-xs font-semibold tracking-widest uppercase whitespace-nowrap rounded-t-lg transition-all duration-200"
              style={
                activeTab === tab.id
                  ? {background: clientColor, color: "#ffffff"}
                  : {background: "transparent", color: "#6b7280"}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-10 py-10 max-w-5xl">
        {children(activeTab)}
      </div>
    </div>
  );
}
