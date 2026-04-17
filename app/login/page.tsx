"use client";

import { useState } from "react";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light tracking-widest text-gray-900 uppercase text-center mb-2">
          BeMORE<span className="font-semibold">YOU</span>
        </h1>
        <p className="text-gray-400 text-xs tracking-wide uppercase text-center mb-12">
          Client Portal
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-gray-500 text-sm leading-7">
              Check your email.<br />
              We've sent a login link to<br />
              <span className="text-gray-900 font-medium">{email}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 border border-gray-900 text-gray-900 text-sm tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Send Login Link
            </button>
          </form>
        )}

        <p className="text-center mt-8">
          <a href="/" className="text-gray-300 text-xs tracking-widest uppercase hover:text-gray-500 transition-colors">
            Back
          </a>
        </p>
      </div>
    </div>
  );
}
