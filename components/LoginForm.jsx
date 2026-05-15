"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = savedUsers.find((user) => user.email === formData.email);

    if (!existingUser) {
      savedUsers.push(formData);
      localStorage.setItem("users", JSON.stringify(savedUsers));
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ email: formData.email })
    );

    router.push("/chatbot");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md rounded-[32px] bg-white px-10 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-xl font-semibold text-white shadow-lg">
          S
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Storybook AI</h1>
        <p className="mt-2 text-sm text-slate-500">Generate components with AI</p>
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            placeholder="demo@stories.dev"
            value={formData.email}
            onChange={handleChange}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Sign In
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Use any email/password — this is a demo.
      </p>
    </form>
  );
}
