"use client";
import { useState, useEffect } from "react";

interface TodoItem {
  id: string;
  text: string;
  owner?: string;
  subtext?: string;
  section?: string;
  tabLink?: { label: string; tab: string };
}

interface ClientTodoListProps {
  items: TodoItem[];
  clientName: string;
  slug: string;
  accentColor?: string;
  onTabLink?: (tab: string) => void;
}

function TodoRow({ item, done, accentColor, onToggle, onTabLink }: {
  item: TodoItem;
  done: boolean;
  accentColor: string;
  onToggle: () => void;
  onTabLink?: (tab: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = item.subtext || item.tabLink;

  return (
    <div
      style={{
        background: done ? "transparent" : "#fff",
        border: "1px solid #E0DBD3", borderRadius: 3,
        transition: "background 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          {hasDetail && (
            <button
              onClick={() => setExpanded(o => !o)}
              style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.6rem", color: "#7A746E", lineHeight: 1 }}
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? "▼" : "▶"}
            </button>
          )}
          {!hasDetail && <span style={{ width: 14, flexShrink: 0 }} />}
          <p style={{ fontSize: "0.85rem", lineHeight: 1.5, margin: 0, color: done ? "#7A746E" : "#1C1C1C", textDecoration: done ? "line-through" : "none" }}>
            {item.text}
          </p>
        </div>
        <button
          onClick={onToggle}
          style={{
            flexShrink: 0, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "5px 12px", borderRadius: 3,
            border: done ? "1px solid #E0DBD3" : "none",
            background: done ? "transparent" : accentColor,
            color: done ? "#7A746E" : "#fff",
            cursor: "pointer", transition: "all 0.15s ease",
          }}
        >
          {done ? "Undo" : "Done"}
        </button>
      </div>
      {expanded && hasDetail && (
        <div style={{ padding: "0 16px 12px 38px", borderTop: "1px solid #F0EBE5" }}>
          {item.subtext && (
            <p style={{ fontSize: "0.78rem", color: "#7A746E", lineHeight: 1.6, margin: "8px 0 0" }}>
              {item.subtext}
            </p>
          )}
          {item.tabLink && onTabLink && (
            <button
              onClick={() => onTabLink(item.tabLink!.tab)}
              style={{ marginTop: 6, fontSize: "0.68rem", fontWeight: 600, color: accentColor, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.05em", textDecoration: "underline" }}
            >
              → {item.tabLink.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ClientTodoList({ items, clientName, slug, accentColor = "#E8521C", onTabLink }: ClientTodoListProps) {
  const [statuses, setStatuses] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, false]))
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadStates() {
      const res = await fetch(`/api/todo-state?slug=${encodeURIComponent(slug)}`);
      const json = await res.json();
      if (json.ok && json.data?.length) {
        const saved: Record<string, boolean> = {};
        json.data.forEach((row: { todo_id: string; completed: boolean }) => {
          saved[row.todo_id] = row.completed;
        });
        setStatuses(prev => ({ ...prev, ...saved }));
      }
      setLoaded(true);
    }
    loadStates();
  }, [slug]);

  async function toggle(id: string, text: string) {
    const newCompleted = !statuses[id];
    setStatuses(prev => ({ ...prev, [id]: newCompleted }));

    await fetch("/api/todo-state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, todoId: id, completed: newCompleted }),
    });

    if (newCompleted) {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "todo", clientName, detail: text }),
      });
    }
  }

  const itemIds = new Set(items.map(i => i.id));
  const completedCount = Object.entries(statuses).filter(([id, done]) => done && itemIds.has(id)).length;
  const pct = items.length ? (completedCount / items.length) * 100 : 0;

  return (
    <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.2s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#3D3935", margin: 0 }}>
          {completedCount} of {items.length} completed
        </p>
        <div style={{ width: 140, height: 3, background: "#E0DBD3", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: accentColor, borderRadius: 99, transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item, idx) => {
          const done = statuses[item.id];
          const prevSection = idx > 0 ? items[idx - 1].section : null;
          const showSectionHeader = item.section && item.section !== prevSection;
          return (
            <div key={item.id}>
              {showSectionHeader && (
                <p style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A746E", margin: idx === 0 ? "0 0 6px" : "16px 0 6px" }}>
                  {item.section}
                </p>
              )}
              <TodoRow
                item={item}
                done={done}
                accentColor={accentColor}
                onToggle={() => toggle(item.id, item.text)}
                onTabLink={onTabLink}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
