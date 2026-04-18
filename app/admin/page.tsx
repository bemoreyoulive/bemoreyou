"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "bemoreyou2024") {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background: "linear-gradient(135deg, #1a1a18 0%, #2d3748 100%)"}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-1" style={{color: "#4ec9d0"}}>Don't be beige.</p>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase mb-1">
            BeMore<span style={{color: "#4ec9d0"}}>You</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase">Admin Access</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white text-sm font-semibold tracking-wide transition-all duration-200"
              style={{background: "#2d5a8e"}}
              onMouseOver={e => (e.currentTarget.style.background = "#1e4080")}
              onMouseOut={e => (e.currentTarget.style.background = "#2d5a8e")}
            >
              Enter
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-gray-500 text-xs tracking-widest uppercase hover:text-gray-300 transition-colors">
            ← Back
          </a>
        </p>
      </div>
    </div>
  );
}
