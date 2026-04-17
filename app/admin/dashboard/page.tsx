const clients = [
  {
    id: 1,
    name: "Andy Felton",
    role: "Founder, Equate Digital",
    started: "Dec 2025",
    sessions: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Andy Scott Barrett",
    role: "Founder, Ascott Financial Direction",
    started: "Mar 2026",
    sessions: 3,
    status: "Active",
  },
  {
    id: 3,
    name: "Nikki McReynolds",
    role: "Founder, HushAway",
    started: "Nov 2025",
    sessions: 11,
    status: "Active",
  },
  {
    id: 4,
    name: "James Hartley",
    role: "Founder, IgnitionCraft",
    started: "2026",
    sessions: 0,
    status: "Active",
  },
  {
    id: 5,
    name: "Solve People",
    role: "Luenna Knight & Brett Edyvane",
    started: "Feb 2026",
    sessions: 6,
    status: "Active",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-light tracking-widest text-gray-900 uppercase">
            BeMORE<span className="font-semibold">YOU</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-wide uppercase mt-0.5">Admin Dashboard</p>
        </div>
        <a
          href="/"
          className="text-gray-300 text-xs tracking-widest uppercase hover:text-gray-500 transition-colors"
        >
          Sign Out
        </a>
      </div>

      {/* Main */}
      <div className="px-10 py-12 max-w-5xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-light text-gray-900">Your Clients</h2>
            <p className="text-gray-400 text-sm mt-1">{clients.length} active clients</p>
          </div>
          <button className="py-2 px-6 border border-gray-900 text-gray-900 text-xs tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-colors duration-200">
            Add Client
          </button>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <a
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className="block border border-gray-100 p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                  {client.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="text-xs text-green-500 tracking-wide uppercase">{client.status}</span>
              </div>
              <h3 className="text-gray-900 font-medium text-sm mb-1">{client.name}</h3>
              <p className="text-gray-400 text-xs mb-4">{client.role}</p>
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span>Since {client.started}</span>
                <span>•</span>
                <span>{client.sessions} sessions</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
