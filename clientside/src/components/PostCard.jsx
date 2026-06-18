import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PostCard({ post, showActions = false, onDelete }) {
  // Estimate read time (approx 1000 chars per min)
  const readTime = Math.max(1, Math.ceil((post.content || "").length / 1000));

  // Style badge depending on category
  const getCategoryStyles = (cat) => {
    const defaultStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
    if (!cat) return defaultStyle;

    const lower = cat.toLowerCase();
    if (lower.includes("software") || lower.includes("web") || lower.includes("tech")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) {
      return "bg-teal-100 text-teal-800 border-teal-200";
    }
    if (lower.includes("data") || lower.includes("ai") || lower.includes("science")) {
      return "bg-green-100 text-green-900 border-green-200";
    }
    if (lower.includes("cyber") || lower.includes("security")) {
      return "bg-emerald-50 text-emerald-900 border-emerald-100";
    }
    if (lower.includes("product") || lower.includes("management")) {
      return "bg-emerald-500/10 text-emerald-950 border-emerald-500/20";
    }
    return defaultStyle;
  };

  return (
    <article className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Optional Featured Image */}
      {post.featuredImage ? (
        <div className="w-full h-48 overflow-hidden bg-slate-100 relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            onError={(e) => {
              // Fallback if image link fails
              e.target.style.display = "none";
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${getCategoryStyles(post.category)}`}>
              {post.category}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-4 bg-gradient-to-r from-emerald-500 to-teal-500" />
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Category badge (only if no cover image is shown) */}
        {!post.featuredImage && post.category && (
          <div className="mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryStyles(post.category)}`}>
              {post.category}
            </span>
          </div>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium mb-3">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-primary/60" />
            {post.author?.username || "Alumnus"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
          <Link to={`/posts/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Snippet */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.content ? post.content.replace(/[#*`]/g, "") : ""}
        </p>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <Link
            to={`/posts/${post.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-1.5 transition-all"
          >
            Read Project Case Study
            <ArrowRight className="w-4 h-4" />
          </Link>

          {showActions && (
            <div className="flex items-center gap-2">
              <Link to={`/edit/${post.slug}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-slate-600 border-slate-200 hover:text-primary hover:border-primary/40 flex items-center gap-1 rounded-md"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(post.slug)}
                className="h-8 px-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1 rounded-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
