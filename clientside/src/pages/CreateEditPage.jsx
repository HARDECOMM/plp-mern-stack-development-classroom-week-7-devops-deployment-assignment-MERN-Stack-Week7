import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Code, BookOpen, Layers, Layout, ChevronLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateEditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState("standard"); // "standard" or "project"

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    problemStatement: "",
    architecture: "",
    codeSnippet: "",
    codeLanguage: "javascript",
    githubUrl: "",
    liveDemoUrl: "",
    finalOutput: "",
    featuredImage: "",
  });

  const categories = [
    "Software Development",
    "UI/UX Design",
    "Data Science & AI",
    "Product Management",
    "Cybersecurity",
    "Technology",
    "Lifestyle",
    "Science",
    "Other",
  ];

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "bash", label: "Bash / Shell" },
    { value: "sql", label: "SQL" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "rust", label: "Rust" },
    { value: "json", label: "JSON" },
  ];

  useEffect(() => {
    if (slug) {
      axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
        .then(res => {
          const p = res.data.post;
          setPostType(p.postType || "standard");
          setForm({
            title: p.title || "",
            content: p.content || "",
            category: p.category || "",
            problemStatement: p.problemStatement || "",
            architecture: p.architecture || "",
            codeSnippet: p.codeSnippet || "",
            codeLanguage: p.codeLanguage || "javascript",
            githubUrl: p.githubUrl || "",
            liveDemoUrl: p.liveDemoUrl || "",
            finalOutput: p.finalOutput || "",
            featuredImage: p.featuredImage || "",
          });
        })
        .catch(console.error);
    }
  }, [slug]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const submitData = {
        ...form,
        postType,
      };

      if (slug) {
        await axios.put(`${import.meta.env.VITE_API_URL}/posts/${slug}`, submitData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/posts`, submitData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/posts");
    } catch (err) {
      console.error("Error saving post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/20 py-10">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Link */}
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Cancel & Back
        </Link>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          {slug ? "Edit Showcase Post" : "Share Your Work"}
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Write articles or document your technical project architectures for the 3MTT Nigeria community.
        </p>

        {/* Dynamic Post Type Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100/80 p-1 rounded-xl mb-8 border border-slate-200/50">
          <button
            type="button"
            onClick={() => setPostType("standard")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              postType === "standard"
                ? "bg-white text-slate-800 shadow-sm border border-slate-200/30"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Standard Article
          </button>
          <button
            type="button"
            onClick={() => setPostType("project")}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              postType === "project"
                ? "bg-primary text-white shadow-sm border border-primary/20"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Code className="w-4 h-4" />
            Project Showcase
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
          
          {/* Title input */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-bold text-slate-700">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Building an AI crop-yield predictor using python"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              required
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-bold text-slate-700">3MTT Track / Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Cover image input */}
          <div className="space-y-1.5">
            <label htmlFor="featuredImage" className="text-sm font-bold text-slate-700">Featured Image URL (Optional)</label>
            <input
              type="url"
              id="featuredImage"
              name="featuredImage"
              value={form.featuredImage}
              onChange={handleChange}
              placeholder="Paste a link to your cover image e.g. https://images.unsplash.com/..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          {/* Dynamic Inputs based on type */}
          {postType === "project" ? (
            // ================== PROJECT SHOWCASE STRUCTURED INPUTS ==================
            <div className="space-y-6 pt-4 border-t border-slate-50">
              
              {/* Project Overview */}
              <div className="space-y-1.5">
                <label htmlFor="content" className="text-sm font-bold text-slate-700">Project Overview / Description *</label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Give a summary of the project scope, technologies used, and overall context..."
                  rows="4"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Problem Statement */}
              <div className="space-y-1.5">
                <label htmlFor="problemStatement" className="text-sm font-bold text-slate-700">Problem Statement</label>
                <textarea
                  id="problemStatement"
                  name="problemStatement"
                  value={form.problemStatement}
                  onChange={handleChange}
                  placeholder="What specific problem does this project solve? What were the pain points?"
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                />
              </div>

              {/* Architecture & Flow */}
              <div className="space-y-1.5">
                <label htmlFor="architecture" className="text-sm font-bold text-slate-700">System Architecture & Design</label>
                <textarea
                  id="architecture"
                  name="architecture"
                  value={form.architecture}
                  onChange={handleChange}
                  placeholder="Describe your solution architecture. How do different components communicate?"
                  rows="4"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                />
              </div>

              {/* Code Snippet */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="codeLanguage" className="text-sm font-bold text-slate-700">Snippet Language</label>
                    <select
                      id="codeLanguage"
                      name="codeLanguage"
                      value={form.codeLanguage}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                    >
                      {languages.map(lang => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="codeSnippet" className="text-sm font-bold text-slate-700">Key Implementation Code</label>
                  <textarea
                    id="codeSnippet"
                    name="codeSnippet"
                    value={form.codeSnippet}
                    onChange={handleChange}
                    placeholder="Paste the core function, schema definition, or script logic that powers your app..."
                    rows="6"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Final Output */}
              <div className="space-y-1.5">
                <label htmlFor="finalOutput" className="text-sm font-bold text-slate-700">Final Output & Results</label>
                <textarea
                  id="finalOutput"
                  name="finalOutput"
                  value={form.finalOutput}
                  onChange={handleChange}
                  placeholder="What is the result of the project? Give metrics, user feedback, or achievements..."
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                />
              </div>

              {/* Repos and Demo URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="githubUrl" className="text-sm font-bold text-slate-700">GitHub Repository Link</label>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    placeholder="e.g. https://github.com/username/project"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="liveDemoUrl" className="text-sm font-bold text-slate-700">Live Demo Link</label>
                  <input
                    type="url"
                    id="liveDemoUrl"
                    name="liveDemoUrl"
                    value={form.liveDemoUrl}
                    onChange={handleChange}
                    placeholder="e.g. https://project.vercel.app"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
              </div>

            </div>
          ) : (
            // ================== STANDARD POST INPUTS ==================
            <div className="space-y-1.5 pt-4 border-t border-slate-50">
              <label htmlFor="content" className="text-sm font-bold text-slate-700">Article Content *</label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your article thoughts, technical posts, or tips here..."
                rows="10"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-hover text-white font-semibold h-11 px-6 rounded-xl flex items-center gap-2 shadow-md shadow-primary/10 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving showcase..." : slug ? "Update Showcase" : "Publish Showcase"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
