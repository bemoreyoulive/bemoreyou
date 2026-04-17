"use client";

import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  owner?: string;
}

interface TodoListProps {
  items: TodoItem[];
}

export default function TodoList({ items }: TodoListProps) {
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
        <p className="text-xs text-gray-400 tracking-wide">
          {completedCount} of {items.length} completed
        </p>
        <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-300"
            style={{ width: `${(completedCount / items.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const done = statuses[item.id] === "completed";
          return (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 p-4 border transition-all duration-200 ${
                done ? "border-gray-100 bg-gray-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm leading-relaxed ${done ? "line-through text-gray-300" : "text-gray-700"}`}>
                  {item.text}
                </p>
                {item.owner && (
                  <p className="text-xs text-gray-300 mt-1 tracking-wide uppercase">{item.owner}</p>
                )}
              </div>
              <button
                onClick={() => toggle(item.id)}
                className={`shrink-0 text-xs tracking-widest uppercase px-4 py-2 border transition-colors duration-200 ${
                  done
                    ? "border-gray-200 text-gray-300 hover:border-gray-400 hover:text-gray-500"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
              >
                {done ? "Undo" : "Complete"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
