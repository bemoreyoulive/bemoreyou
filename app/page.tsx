"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background: "linear-gradient(135deg, #1a1a18 0%, #2d3748 100%)"}}>
      <div className="text-center max-w-lg">
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{color: "#4ec9d0"}}>Don't be beige.</span>
        </div>
        <h1 className="text-6xl font-black tracking-tight text-white mb-3 uppercase">
          BeMore<span style={{color: "#4ec9d0"}}>You</span>
        </h1>
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-12">
          Coaching Portal
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="/admin"
            className="block w-full py-4 px-8 text-sm font-semibold tracking-widest uppercase transition-all duration-200 rounded-lg"
            style={{background: "#2d5a8e", color: "white"}}
            onMouseOver={e => (e.currentTarget.style.background = "#1e4080")}
            onMouseOut={e => (e.currentTarget.style.background = "#2d5a8e")}
          >
            Admin Login
          </a>
          <a
            href="/login"
            className="block w-full py-4 px-8 text-sm font-semibold tracking-widest uppercase transition-all duration-200 rounded-lg border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
          >
            Client Login
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 text-gray-600 text-xs tracking-widest uppercase">
        bemoreyoulive.com
      </p>
    </div>
  );
}
