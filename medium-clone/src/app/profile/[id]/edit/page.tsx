"use client";

import { api } from "../../../../lib/api";
import { useEffect, useState } from "react";

export default function EditProfilePage({ params }) {
  const id = params.id;
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api(`users/${id}`).then(setUser);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.target);

    try {
      await api("users/update-profile", {
        method: "PUT",
        body: JSON.stringify({
          id,
          name: f.get("name"),
          bio: f.get("bio"),
          avatar: f.get("avatar"),
        }),
      });

      setMsg("Profile updated!");
    } catch (err) {
      setMsg(err.message);
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          defaultValue={user.name}
          className="w-full p-3 border rounded"
          placeholder="Name"
        />

        <textarea
          name="bio"
          defaultValue={user.bio || ""}
          className="w-full p-3 border rounded"
          placeholder="Bio"
          rows={4}
        />

        <input
          name="avatar"
          defaultValue={user.avatar || ""}
          className="w-full p-3 border rounded"
          placeholder="Avatar URL"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
