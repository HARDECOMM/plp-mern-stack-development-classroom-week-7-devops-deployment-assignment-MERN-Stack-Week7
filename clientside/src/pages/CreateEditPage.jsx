import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function CreateEditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [loading, setLoading] = useState(false);

  const categories = ["Technology", "Lifestyle", "Poetry", "Personal", "Science"];

  useEffect(() => {
    if (slug) {
      axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
        .then(res => setForm({
          title: res.data.post.title,
          content: res.data.post.content,
          category: res.data.post.category || "",
        }))
        .catch(console.error);
    }
  }, [slug]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (slug) {
        await axios.put(`${import.meta.env.VITE_API_URL}/posts/${slug}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/posts`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/posts");
    } catch (err) {
      console.error("Error saving post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{slug ? "Edit Post" : "Create Post"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Post title"
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your post..."
          className="w-full border rounded px-3 py-2 h-40"
          required
        />

        {/* ✅ Category dropdown */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : slug ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}
