import { Link } from "react-router-dom";

export function PostCard({ post, showActions = false, onDelete }) {
  // Simple color mapping for categories
  const categoryColors = {
    Technology: "bg-blue-100 text-blue-800",
    Lifestyle: "bg-pink-100 text-pink-800",
    Poetry: "bg-purple-100 text-purple-800",
    Personal: "bg-green-100 text-green-800",
    Science: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
  };

  const badgeClass = categoryColors[post.category] || categoryColors.default;

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        {post.category && (
          <span className={`text-xs font-medium px-2 py-1 rounded ${badgeClass}`}>
            {post.category}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-2">
        By {post.author?.username || "You"} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-3">
        {post.content.slice(0, 120)}...
      </p>

      <div className="flex justify-between items-center">
        <Link
          to={`/posts/${post.slug}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Read More →
        </Link>

        {showActions && (
          <div className="flex gap-2">
            <Link
              to={`/edit/${post.slug}`}
              className="bg-yellow-400 text-blue-900 px-3 py-1 rounded hover:bg-yellow-500 font-medium"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(post.slug)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
