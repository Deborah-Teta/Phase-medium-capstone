"use client";

import { api } from "../lib/api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    }

    // Load posts
    api("posts")
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("API returned non-array posts:", data);
          setPosts([]);
        }
      })
      .catch((err) => console.error("Failed to load posts:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-4">Welcome to Medium Clone</h1>
        <p className="text-xl text-gray-600">Start writing and reading stories.</p>

        {user ? (
          <a
            href={`/profile/${user.id}`}
            className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-full"
          >
            Go to Profile
          </a>
        ) : (
          <a
            href="/login"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-full"
          >
            Sign in / Sign up
          </a>
        )}
      </section>

      {loading && <p>Loading posts...</p>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-900">
          {posts.length === 0 && <p>No posts yet. Be the first to write!</p>}

          {posts.map((post) => (
            <a
              key={post.id}
              href={`/posts/${post.id}`}
              className="bg-amber-100 p-6 rounded-lg shadow hover:bg-amber-200"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.content?.slice(0, 80)}...</p>
              <p className="text-xs text-gray-500 mt-2">by {post.author?.name}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
