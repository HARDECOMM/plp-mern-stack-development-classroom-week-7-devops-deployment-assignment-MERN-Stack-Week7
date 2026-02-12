import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getComments, addComment } from "@/api/commentApi";

export function PostDetail() {
  const { slug } = useParams(); // ✅ slug from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
        setPost(res.data.post);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post?._id) {
      getComments(post._id).then(setComments).catch(console.error);
    }
  }, [post]);

  const handleCommentSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to comment.");
        return;
      }
      const newComment = await addComment(post._id, commentText, token);
      setComments(prev => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment.");
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Post not found</p>;

  const token = localStorage.getItem("token");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author?.username}</p>
      <div className="prose mb-6">{post.content}</div>

      {/* Comment section */}
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      {token ? (
        <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-2 py-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
            Send
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">
          Want to join the conversation?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>{" "}
          or{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>.
        </p>
      )}

      <ul className="space-y-2">
        {comments.map(c => (
          <li key={c._id} className="border-b pb-2">
            <p>{c.text}</p>
            <small className="text-gray-500">By {c.author?.username}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
