"use client";

import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  owner?: string;
}

interface TodoListProps {
  items: TodoItem[];
  accentColor?: string;
}

export default function TodoList({ items, accentColor = "#2d5a8e" }: TodoListProps) {
  const [statuses, setStatuses] = useState<Record<string, "pending" | "completed">>(
    Object.fromEntries(items.map((item) => [item.id, "pending"]))
  );

  function toggle(id: string) {
    setStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === "completed" ? "pending" : "completed",
    }));
  }

  const completedCount = Object.values(statuses).filter((s) => s === "completed").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-gray-700">
          {completedCount} of {items.length} completed
        </p>
        <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / items.length) * 100}%`, background: accentColor }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const done = statuses[item.id] === "completed";
          return (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200 ${
                done ? "border-gray-100 bg-gray-50" : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${done ? "line-through text-gray-300" : "text-gray-800"}`}>
                  {item.text}
                </p>
                {item.owner && (
                  <p className="text-xs text-gray-400 mt-1 tracking-wide uppercase font-medium">{item.owner}</p>
                )}
              </div>
              <button
                onClick={() => toggle(item.id)}
                className="shrink-0 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-lg transition-colors duration-200"
                style={
                  done
                    ? {background: "#f3f4f6", color: "#9ca3af"}
                    : {background: accentColor, color: "#ffffff"}
                }
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
