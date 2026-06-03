"use client";

export default function Sidebar() {
  const navItems = [
    { label: "New chat", active: true },
    { label: "Saved", active: false },
    { label: "Settings", active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col border-r border-slate-800 bg-slate-950 px-4 py-5 text-slate-100 shadow-2xl shadow-slate-950/20 lg:flex">
      <div className="flex h-full flex-col justify-between gap-4 px-1">
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900 px-4 py-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-semibold text-white shadow-sm">
                C
              </div>
              <div>
                <p className="text-sm font-semibold text-white">ChatAI</p>
                <p className="text-xs text-slate-400">Your assistant</p>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              + New chat
            </button>
          </div>

          <nav className="space-y-2 px-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={
                  "flex w-full items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition " +
                  (item.active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white")
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="px-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-700" />
              <div>
                <p className="text-sm font-semibold text-white">Guest</p>
                <p className="text-xs text-slate-400">Not signed in</p>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}