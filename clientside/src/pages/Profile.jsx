import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyPosts, deletePost } from "../api/postApi";
import { PostCard } from "@/components/PostCard";

export function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getMyPosts(token).then(setPosts).catch(console.error);
  }, []);

  const handleDelete = async (slug) => {
    const token = localStorage.getItem("token");
    try {
      await deletePost(slug, token);
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{user?.username}'s Profile</h1>
      <h2 className="text-xl mb-6">My Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">You haven’t created any posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              showActions={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
