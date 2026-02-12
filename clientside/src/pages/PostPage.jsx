import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/postApi";
import { getComments, addComment } from "@/api/commentApi";
import { Card, CardContent } from "@/components/ui/card";

export function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [showComments, setShowComments] = useState(false); // ✅ toggle state
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    getPost(slug)
      .then(setPost)
      .catch(() => setError("Failed to load post."));
  }, [slug]);

  // ✅ Fetch comments only when user clicks "Show Comments"
  const handleToggleComments = async () => {
    if (!showComments) {
      setLoadingComments(true);
      try {
        const data = await getComments(post._id);
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments(prev => !prev);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }
    try {
      const comment = await addComment(post._id, newComment, token);
      setComments(prev => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card className="p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p>{post.content}</p>
        </CardContent>
      </Card>

      {/* ✅ Toggle button */}
      <div className="mt-6">
        <button
          onClick={handleToggleComments}
          className="text-blue-600 hover:underline"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>

        {/* ✅ Conditionally render comments */}
        {showComments && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>

            {loadingComments ? (
              <p>Loading comments...</p>
            ) : comments.length === 0 ? (
              <p>No comments yet. Be the first!</p>
            ) : (
              comments.map((c) => (
                <div key={c._id} className="border-b py-2">
                  <p className="text-sm text-gray-600">
                    {c.author?.username} — {new Date(c.createdAt).toLocaleString()}
                  </p>
                  <p>{c.text}</p>
                </div>
              ))
            )}

            <form onSubmit={handleAddComment} className="mt-4 space-y-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border rounded p-2"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
