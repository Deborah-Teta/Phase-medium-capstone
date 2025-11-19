"use client";

import { api } from "../../lib/api";
import { useState } from "react";

export default function LoginPage() {
  const [msg, setMsg] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    try {
      const data = await api(
        "auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: f.get("email"),
            password: f.get("password"),
          }),
        },
        { requireAuth: false }
      );

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/";
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <input name="email" placeholder="Email" className="w-full p-3 border rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Sign In</button>
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-green-700 underline">Sign up here</a>
      </p>

      {msg && <p className="mt-4 text-red-600">{msg}</p>}
    </div>
  );
}
