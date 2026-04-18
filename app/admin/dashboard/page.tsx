const clients = [
  {
    id: 1,
    name: "Andy Felton",
    role: "Founder, Equate Digital",
    started: "Dec 2025",
    sessions: 8,
    status: "Active",
    color: "#2d5a8e",
    initials: "AF",
  },
  {
    id: 2,
    name: "Andy Scott Barrett",
    role: "Founder, Ascott Financial Direction",
    started: "Mar 2026",
    sessions: 3,
    status: "Active",
    color: "#2e7d4f",
    initials: "ASB",
  },
  {
    id: 3,
    name: "Nikki McReynolds",
    role: "Founder, HushAway",
    started: "Nov 2025",
    sessions: 11,
    status: "Active",
    color: "#7c3aed",
    initials: "NM",
  },
  {
    id: 4,
    name: "James Hartley",
    role: "Founder, IgnitionCraft",
    started: "2026",
    sessions: 0,
    status: "Setting Up",
    color: "#6b7280",
    initials: "JH",
  },
  {
    id: 5,
    name: "Solve People",
    role: "Luenna Knight & Brett Edyvane",
    started: "Feb 2026",
    sessions: 6,
    status: "Active",
    color: "#c95e00",
    initials: "SP",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen" style={{background: "#f7f6f3"}}>
      {/* Header */}
      <div className="border-b border-gray-200 px-10 py-5 flex items-center justify-between" style={{background: "#1a1a18"}}>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            BeMore<span style={{color: "#4ec9d0"}}>You</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-0.5">Admin Dashboard</p>
        </div>
        <a
          href="/"
          className="text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
        >
          Sign Out
        </a>
      </div>

      {/* Main */}
      <div className="px-10 py-10 max-w-6xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Clients</h2>
            <p className="text-gray-500 text-sm mt-1">{clients.filter(c => c.status === "Active").length} active · {clients.length} total</p>
          </div>
          <button
            className="py-2.5 px-6 rounded-lg text-white text-xs font-semibold tracking-widest uppercase transition-colors"
            style={{background: "#2d5a8e"}}
          >
            + Add Client
          </button>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <a
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{background: client.color}}
                >
                  {client.initials}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  client.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {client.status}
                </span>
              </div>
              <h3 className="text-gray-900 font-bold text-base mb-1">{client.name}</h3>
              <p className="text-gray-500 text-sm mb-5">{client.role}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
                <span>Since {client.started}</span>
                <span>·</span>
                <span className="font-semibold" style={{color: client.color}}>{client.sessions} sessions</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
