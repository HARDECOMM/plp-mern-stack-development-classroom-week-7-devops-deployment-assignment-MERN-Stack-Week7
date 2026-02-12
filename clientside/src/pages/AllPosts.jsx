import { useEffect, useState } from "react";
import { getPosts, getPostsByCategory } from "@/api/postApi";
import { PostCard } from "@/components/PostCard";

export function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Technology", "Lifestyle", "Poetry", "Personal", "Science"];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (category && category !== "All") {
          const filtered = await getPostsByCategory(category);
          setPosts(filtered);
        } else {
          const all = await getPosts();
          setPosts(all);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [category]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-medium">Filter by Category:</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
