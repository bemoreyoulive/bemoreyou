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
  tabs: Tab[];
  children: (activeTab: string) => React.ReactNode;
}

export default function ClientLayout({ clientName, clientRole, tabs, children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="text-gray-300 text-xs tracking-widest uppercase hover:text-gray-500 transition-colors">
            ← All Clients
          </Link>
          <div className="w-px h-4 bg-gray-200" />
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{clientName}</h1>
            <p className="text-xs text-gray-400">{clientRole}</p>
          </div>
        </div>
        <div className="text-xs font-light tracking-widest text-gray-300 uppercase">
          BeMORE<span className="font-semibold">YOU</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100 px-10">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-4 text-xs tracking-widest uppercase whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
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
