"use client";

import { api } from "../../lib/api";
import { useState } from "react";

export default function SignupPage() {
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    try {
      await api(
        "auth/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: f.get("name"),
            email: f.get("email"),
            password: f.get("password"),
          }),
        },
        { requireAuth: false }
      );

      setMsg("Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" className="w-full p-3 border rounded" />
        <input name="email" placeholder="Email" className="w-full p-3 border rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Sign Up</button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-green-700 underline">Sign in here</a>
      </p>

      {msg && <p className="mt-4 text-gray-700">{msg}</p>}
    </div>
  );
}
