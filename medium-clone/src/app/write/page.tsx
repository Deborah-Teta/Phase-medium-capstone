"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

// Rich text helpers
function formatText(text: string, type: "bold" | "italic" | "heading") {
  switch (type) {
    case "bold":
      return `**${text}**`;
    case "italic":
      return `*${text}*`;
    case "heading":
      return `# ${text}`;
  }
}

export default function WritePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  // Load user and token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");

    if (!token || !stored || stored === "undefined") {
      window.location.href = "/login?page=/write"; // redirect
      return;
    }

    try {
      setUser(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to parse user", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login?page=/write";
    }
  }, []);

  // Add formatting to content
  function applyFormat(type: "bold" | "italic" | "heading") {
    const selection = window.getSelection()?.toString() || "";
    if (!selection) return;
    const formatted = formatText(selection, type);
    setContent(content.replace(selection, formatted));
  }

  async function savePost(status: "draft" | "published") {
    if (!user) return;
    try {
      const token = localStorage.getItem("token");

      const data = await api("posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          authorId: user.id,
          status, // "draft" or "published"
        }),
      });

      if (status === "draft") setMsg("Draft saved!");
      else setMsg("Post published!");
      
      if (status === "published") router.push("/our-stories"); // redirect to stories
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  if (!user) return <p>Redirecting...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">Write a Post</h2>

      {/* Formatting Buttons */}
      <div className="flex space-x-2 mb-3">
        <button
          type="button"
          className="px-2 py-1 border rounded font-bold"
          onClick={() => applyFormat("bold")}
        >
          B
        </button>
        <button
          type="button"
          className="px-2 py-1 border rounded italic"
          onClick={() => applyFormat("italic")}
        >
          I
        </button>
        <button
          type="button"
          className="px-2 py-1 border rounded"
          onClick={() => applyFormat("heading")}
        >
          H
        </button>
      </div>

      {/* Post Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savePost("published");
        }}
        className="space-y-3"
      >
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story..."
          rows={10}
          className="w-full p-3 border rounded"
          required
        />

        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => savePost("draft")}
          >
            Save as Draft
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </form>

      {msg && <p className="mt-4 text-gray-700">{msg}</p>}
    </div>
  );
}
