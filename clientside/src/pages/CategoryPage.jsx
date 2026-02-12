import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts/category/${category}`)
      .then(res => setPosts(res.data.posts))
      .catch(console.error);
  }, [category]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{category} Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found in this category.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="border-b pb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
              <Link to={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                Read More →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
