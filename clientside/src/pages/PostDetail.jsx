import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getComments, addComment } from "@/api/commentApi";
import { Calendar, User, Clock, Github, ExternalLink, MessageSquare, Send, Copy, Check, ChevronLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom code block renderer with copy button
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 my-6 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800/80 text-slate-400 text-xs font-semibold select-none border-b border-slate-800">
        <span className="uppercase tracking-wider font-mono">{language || "code"}</span>
        <button 
          onClick={handleCopy} 
          className="hover:text-slate-100 transition-colors flex items-center gap-1 cursor-pointer font-sans"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-slate-100 text-sm font-mono leading-relaxed scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export function PostDetail() {
  const { slug } = useParams();
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
    if (!commentText.trim()) return;
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

  if (loading) return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/6 mb-4"></div>
      <div className="h-10 bg-slate-200 rounded w-3/4 mb-6"></div>
      <div className="flex gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/6"></div>
        </div>
      </div>
      <div className="h-64 bg-slate-200 rounded-xl mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-red-600 font-semibold mb-4">{error}</p>
      <Link to="/posts">
        <Button className="bg-primary text-white hover:bg-primary-hover">Go Back to Projects</Button>
      </Link>
    </div>
  );

  if (!post) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-slate-600 font-medium mb-4">Post not found</p>
      <Link to="/posts">
        <Button className="bg-primary text-white hover:bg-primary-hover">Back to Explorer</Button>
      </Link>
    </div>
  );

  const token = localStorage.getItem("token");
  const readTime = Math.max(1, Math.ceil((post.content || "").length / 1000));

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Top Banner Cover Image */}
      {post.featuredImage && (
        <div className="w-full h-64 md:h-96 overflow-hidden bg-slate-100 relative mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-12 text-white">
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Link */}
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-6 mt-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Explorer
        </Link>

        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Author / Metadata Header */}
        <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-primary font-bold text-base">
              {post.author?.username ? post.author.username.charAt(0).toUpperCase() : "A"}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">
                {post.author?.username || "3MTT Alumnus"}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>

          {!post.featuredImage && post.category && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          )}
        </div>

        {/* Article content */}
        <article className="prose max-w-none mb-12">
          {post.postType === "project" ? (
            <div className="space-y-10">
              
              {/* Overview / Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b pb-2 border-slate-100">
                  <Award className="text-primary w-5.5 h-5.5" />
                  Project Overview
                </h2>
                <div className="mt-4 text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>

              {/* Problem Statement */}
              {post.problemStatement && (
                <div className="bg-red-50/40 border-l-4 border-red-500 rounded-r-xl p-5 my-6">
                  <h3 className="text-red-950 font-bold text-lg mb-2 mt-0">The Problem</h3>
                  <div className="text-red-900 text-base leading-relaxed font-serif whitespace-pre-wrap">
                    {post.problemStatement}
                  </div>
                </div>
              )}

              {/* Architecture */}
              {post.architecture && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b pb-2 border-slate-100">
                    System Architecture & Design
                  </h2>
                  <div className="mt-4 text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
                    {post.architecture}
                  </div>
                </div>
              )}

              {/* Code Snippet */}
              {post.codeSnippet && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b pb-2 border-slate-100">
                    Implementation Code
                  </h2>
                  <CodeBlock code={post.codeSnippet} language={post.codeLanguage} />
                </div>
              )}

              {/* Final Output */}
              {post.finalOutput && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b pb-2 border-slate-100">
                    Final Output & Results
                  </h2>
                  <div className="mt-4 text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
                    {post.finalOutput}
                  </div>
                </div>
              )}

              {/* Project Action Links */}
              {(post.githubUrl || post.liveDemoUrl) && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                  {post.githubUrl && (
                    <a
                      href={post.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-2 h-12 rounded-xl font-semibold shadow-md">
                        <Github className="w-5 h-5" />
                        Explore Repository
                      </Button>
                    </a>
                  )}
                  {post.liveDemoUrl && (
                    <a
                      href={post.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-primary text-white hover:bg-primary-hover flex items-center justify-center gap-2 h-12 rounded-xl font-semibold shadow-md">
                        <ExternalLink className="w-5 h-5" />
                        View Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              )}

            </div>
          ) : (
            // Standard Article Body
            <div className="text-slate-700 leading-relaxed font-serif whitespace-pre-wrap">
              {post.content}
            </div>
          )}
        </article>

        {/* Comment Section Redesign */}
        <section className="border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-primary w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-800">
              Comments ({comments.length})
            </h2>
          </div>

          {token ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex gap-3 items-start">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Share your feedback or questions on this project..."
                  rows="3"
                  className="flex-1 border border-slate-200 rounded-xl p-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-sm transition-all resize-none"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary-hover p-3 h-11 w-11 flex items-center justify-center rounded-xl shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8 text-center">
              <p className="text-slate-600 text-sm">
                Want to join the conversation?{" "}
                <Link to="/register" className="text-primary hover:underline font-bold">Register</Link>
                {" "}or{" "}
                <Link to="/login" className="text-primary hover:underline font-bold">Login</Link>
                {" "}to add comments.
              </p>
            </div>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">No feedback comments yet. Be the first to share your thoughts!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map(c => (
                <li key={c._id} className="bg-slate-50/30 border border-slate-50 rounded-xl p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {c.author?.username ? c.author.username.charAt(0).toUpperCase() : "A"}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-700">
                        {c.author?.username || "Alumnus"}
                      </span>
                      <span className="text-xxs text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm font-sans whitespace-pre-wrap">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
}
