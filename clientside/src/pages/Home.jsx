import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { PostList } from "../components/PostList";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Cpu, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(all => {
        // Sort posts by createdAt descending
        const sorted = [...all].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Take the latest 6 (to showcase more)
        setPosts(sorted.slice(0, 6));
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-white to-transparent py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100/60 rounded-full px-3 py-1 mb-6 text-emerald-800 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            3MTT Nigeria Alumni Showcase
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight md:leading-tighter mb-6">
            Where Nigeria's Top Tech <br />
            <span className="text-primary bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Talent Shares Their Work
            </span>
          </h1>
          
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Explore complete project architectures, codebases, and problem-to-solution case studies developed by the 3 Million Technical Talent (3MTT) alumni.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/create">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-6 text-base rounded-xl transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Showcase Your Project
              </Button>
            </Link>
            <Link to="/posts">
              <Button variant="outline" className="w-full sm:w-auto bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-6 text-base rounded-xl transition-all">
                Explore Case Studies
              </Button>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-12 border-t border-slate-100">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-800">12+</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Tech Tracks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-800">3MTT</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Alumni Network</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-slate-800">100%</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Open Source Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body - Recent Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <Cpu className="text-primary w-6 h-6" />
              Featured Alumni Showcases
            </h2>
            <p className="text-slate-500 text-sm mt-1">Discover what 3MTT graduates are building across Nigeria.</p>
          </div>
          <Link to="/posts">
            <Button variant="ghost" className="text-primary hover:text-primary-hover font-semibold flex items-center gap-1.5 hover:bg-emerald-50/30">
              View All Showcase Works
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-6 h-60 animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">No projects shared yet.</p>
            <p className="text-slate-400 text-sm mt-1 mb-6">Be the first to publish your project and inspire others!</p>
            <Link to="/create">
              <Button className="bg-primary hover:bg-primary-hover text-white">Create First Case Study</Button>
            </Link>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </section>
    </div>
  );
}
