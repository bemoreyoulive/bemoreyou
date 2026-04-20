"use client";

import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  owner?: string;
}

interface ClientTodoListProps {
  items: TodoItem[];
  clientName: string;
  accentColor?: string;
}

export default function ClientTodoList({ items, clientName, accentColor = "#E8521C" }: ClientTodoListProps) {
  const [statuses, setStatuses] = useState<Record<string, "pending" | "completed">>(
    Object.fromEntries(items.map((item) => [item.id, "pending"]))
  );

  async function toggle(id: string, text: string) {
    const newStatus = statuses[id] === "completed" ? "pending" : "completed";
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));

    if (newStatus === "completed") {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "todo",
          clientName,
          detail: text,
        }),
      });
    }
  }

  const completedCount = Object.values(statuses).filter((s) => s === "completed").length;
  const pct = items.length ? (completedCount / items.length) * 100 : 0;

  return (
    <div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24}}>
        <p style={{fontSize: "0.85rem", fontWeight: 600, color: "#3D3935", margin: 0}}>
          {completedCount} of {items.length} completed
        </p>
        <div style={{width: 160, height: 3, background: "#E0DBD3", borderRadius: 99, overflow: "hidden"}}>
          <div style={{height: "100%", width: `${pct}%`, background: accentColor, borderRadius: 99, transition: "width 0.3s ease"}} />
        </div>
      </div>

      <div style={{display: "flex", flexDirection: "column", gap: 2}}>
        {items.map((item) => {
          const done = statuses[item.id] === "completed";
          return (
            <div
              key={item.id}
              style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                gap: 16, padding: "18px 24px",
                background: done ? "transparent" : "#fff",
                border: "1px solid #E0DBD3",
                borderRadius: 3,
                transition: "background 0.2s ease",
              }}
            >
              <div style={{flex: 1}}>
                <p style={{
                  fontSize: "0.9rem", lineHeight: 1.65, margin: 0,
                  color: done ? "#7A746E" : "#1C1C1C",
                  textDecoration: done ? "line-through" : "none",
                }}>
                  {item.text}
                </p>
                {item.owner && (
                  <p style={{fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A746E", marginTop: 4, marginBottom: 0}}>
                    {item.owner}
                  </p>
                )}
              </div>
              <button
                onClick={() => toggle(item.id, item.text)}
                style={{
                  flexShrink: 0,
                  fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "8px 16px", borderRadius: 3,
                  border: done ? "1px solid #E0DBD3" : "none",
                  background: done ? "transparent" : accentColor,
                  color: done ? "#7A746E" : "#fff",
                  cursor: "pointer", transition: "all 0.15s ease",
                }}
              >
                {done ? "Undo" : "Done"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
