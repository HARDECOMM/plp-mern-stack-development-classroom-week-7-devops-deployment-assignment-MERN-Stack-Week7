import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { PostList } from "../components/PostList";
import { Link } from "react-router-dom";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then(all => {
        // Sort posts by createdAt descending
        const sorted = [...all].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Take the latest 3
        setPosts(sorted.slice(0, 3));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-700">
          Welcome to MyBlog
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Share your thoughts, explore ideas, and connect with others through writing.
        </p>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Create a Post
        </Link>
      </section>

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet. Be the first to share!</p>
        ) : (
          <PostList posts={posts} />
        )}
        <div className="mt-6 text-center">
          <Link
            to="/posts"
            className="text-blue-600 hover:underline font-medium"
          >
            View All Posts →
          </Link>
        </div>
      </section>
    </div>
  );
}
