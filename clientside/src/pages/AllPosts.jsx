import { useEffect, useState } from "react";
import { getPosts, getPostsByCategory } from "@/api/postApi";
import { PostCard } from "@/components/PostCard";
import { Filter, Grid, BookOpen } from "lucide-react";

export function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const categories = [
    "All", 
    "Software Development", 
    "UI/UX Design", 
    "Data Science & AI", 
    "Product Management", 
    "Cybersecurity", 
    "Technology", 
    "Lifestyle", 
    "Science",
    "Other"
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (category && category !== "All") {
          const filtered = await getPostsByCategory(category);
          setPosts(filtered);
        } else {
          const all = await getPosts();
          // Sort by creation date
          const sorted = [...all].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sorted);
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
    <div className="min-h-screen bg-slate-50/20 py-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <BookOpen className="text-primary w-7 h-7" />
            Alumni Project Showcases
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Browse through development solutions, design flows, and architectures built by 3MTT members.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm mb-4">
            <Filter className="w-4 h-4 text-primary" />
            Filter by 3MTT Track / Category
          </div>
          
          {/* Tag selector - Horizontally scrollable on mobile, wraps on desktop */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap scrollbar-thin scrollbar-thumb-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                  category === cat
                    ? "bg-primary text-white border-primary shadow-sm shadow-primary/10"
                    : "bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-6 h-64 animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
            <Grid className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-lg">No project showcases found</p>
            <p className="text-slate-400 text-sm mt-1">Try selecting a different track or category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
