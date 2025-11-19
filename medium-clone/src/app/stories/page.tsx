"use client";

import { api } from "../../lib/api";
import { useEffect, useState } from "react";

export default function OurStoriesPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("posts")
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">

      {/* PAGE HEADER */}
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold mb-3 text-gray-100">
          Our Stories
        </h1>
        <p className="text-lg text-gray-400">
          Discover what our writers are sharing with the world.
        </p>
      </section>

      {/* POSTS LIST */}
      {loading && <p>Loading stories...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500 text-center">
          No stories yet. Be the first to write!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.id}`}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              {post.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {post.content?.slice(0, 150)}...
            </p>

            <p className="text-sm text-gray-500">
              By <span className="font-medium text-gray-700">{post.author?.name}</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
