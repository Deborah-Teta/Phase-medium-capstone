"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    api(`users/${id}`, { method: "GET" }, { requireAuth: true })
      .then((data) => setUser(data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) return <p>User ID is missing</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* AVATAR + NAME */}
      <div className="flex items-center space-x-4">
        {user.avatar ? (
          <img src={user.avatar} className="w-20 h-20 rounded-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* BIO */}
      <p className="text-gray-700 whitespace-pre-line">
        {user.bio || "This user has no bio yet."}
      </p>

      {/* EDIT BUTTON */}
      <a href={`/profile/${id}/edit`} className="text-green-600 underline">
        Edit Profile
      </a>

      {/* POSTS */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Posts by {user.name}</h2>

        {user.posts?.length === 0 && <p className="text-gray-500">No posts yet.</p>}

        {user.posts?.map((p: any) => (
          <a key={p.id} href={`/posts/${p.id}`}>
            <div className="p-4 bg-amber-100 rounded my-2 hover:bg-amber-200 transition">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-700">{p.content?.slice(0, 100)}...</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
