"use client";

import { api } from "../../../lib/api";
import { useEffect, useState } from "react";

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api(`posts/${params.id}`).then(setPost);
  }, [params.id]);

  async function addComment(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      await api("comments", {
        method: "POST",
        body: JSON.stringify({
          content: f.get("content"),
          postId: params.id,
          authorId: user.id,
        }),
      });

      setMsg("Comment added!");
      e.target.reset();

      // refresh post comments
      const updated = await api(`posts/${params.id}`);
      setPost(updated);
    } catch (err) {
      setMsg(err.message);
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-gray-500 mb-6">By {post.author?.name}</p>

      <p className="text-lg">{post.content}</p>

      <h3 className="text-xl mt-10 mb-3 font-semibold">Comments</h3>

      {post.comments?.map((c) => (
        <div key={c.id} className="p-3 border rounded mb-3 bg-gray-100">
          <p>
            <strong>{c.author?.name}:</strong> {c.content}
          </p>
        </div>
      ))}

      {/* Add comment */}
      <form onSubmit={addComment} className="space-y-3 mt-4">
        <input
          name="content"
          placeholder="Add a comment..."
          className="w-full p-3 border rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Comment</button>
      </form>

      {msg && <p className="mt-2 text-gray-700">{msg}</p>}
    </div>
  );
}
