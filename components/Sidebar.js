"use client";

import React, { useState } from "react";

export default function Sidebar() {
  const [user, setUser] = useState({ name: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);

  const menu = [
    { key: "new", label: "New chat" },
    { key: "home", label: "Home" },
    { key: "saved", label: "Saved" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-slate-900 text-slate-100 shadow-xl">
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600" />
            <div>
              <h1 className="text-md font-semibold">ChatAI</h1>
              <p className="text-xs text-slate-300">Your assistant</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menu.map((item) => (
              <a
                key={item.key}
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
              >
                <span className="h-4 w-4 rounded-sm bg-slate-700" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t border-slate-700 pt-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-700" />
            <div className="flex-1">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-slate-400">{loggedIn ? 'Online' : 'Not signed in'}</div>
            </div>
          </div>

          <div className="mt-3">
            <button
              onClick={() => {
                if (loggedIn) {
                  setLoggedIn(false);
                  setUser({ name: 'Guest' });
                } else {
                  setLoggedIn(true);
                  setUser({ name: 'Rishi' });
                }
              }}
              className="mt-2 w-full rounded-md border border-slate-700 bg-transparent px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {loggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
