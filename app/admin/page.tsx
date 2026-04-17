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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light tracking-widest text-gray-900 uppercase text-center mb-2">
          BeMORE<span className="font-semibold">YOU</span>
        </h1>
        <p className="text-gray-400 text-xs tracking-wide uppercase text-center mb-12">
          Admin Access
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
          />
          {error && (
            <p className="text-red-400 text-xs tracking-wide">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors duration-200"
          >
            Enter
          </button>
        </form>

        <p className="text-center mt-8">
          <a href="/" className="text-gray-300 text-xs tracking-widest uppercase hover:text-gray-500 transition-colors">
            Back
          </a>
        </p>
      </div>
    </div>
  );
}
