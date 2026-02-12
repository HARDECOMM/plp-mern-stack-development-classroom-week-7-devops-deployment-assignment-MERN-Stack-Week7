import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Post Blog 🎉</h1>
      <p className="text-gray-700 mb-6">
        You’re logged in! Start exploring posts or create your own.
      </p>

      <div className="flex gap-4">
        <Link
          to="/posts"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Posts
        </Link>
        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Post
        </Link>
      </div>
    </div>
  );
}
