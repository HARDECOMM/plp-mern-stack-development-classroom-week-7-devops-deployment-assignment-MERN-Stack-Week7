import { Link } from "react-router-dom";

export function Categories() {
  const categories = ["Technology", "Lifestyle", "Poetry", "Personal", "Science"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <Link
            key={cat}
            to={`/posts/category/${cat}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
