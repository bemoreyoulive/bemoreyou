export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-light tracking-widest text-gray-900 uppercase mb-3">
          BeMORE<span className="font-semibold">YOU</span>
        </h1>
        <p className="text-gray-400 text-sm tracking-wide uppercase mb-16">
          Coaching Portal
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="/admin"
            className="block w-full py-3 px-8 border border-gray-900 text-gray-900 text-sm tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            Admin Login
          </a>
          <a
            href="/login"
            className="block w-full py-3 px-8 border border-gray-300 text-gray-500 text-sm tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors duration-200"
          >
            Client Login
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 text-gray-300 text-xs tracking-widest uppercase">
        bemoreyoulive.com
      </p>
    </div>
  );
}
