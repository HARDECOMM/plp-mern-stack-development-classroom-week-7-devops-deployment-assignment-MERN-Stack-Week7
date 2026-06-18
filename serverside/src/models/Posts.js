const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  postType: { type: String, enum: ["standard", "project"], default: "standard" },
  problemStatement: { type: String, default: "" },
  architecture: { type: String, default: "" },
  codeSnippet: { type: String, default: "" },
  codeLanguage: { type: String, default: "javascript" },
  githubUrl: { type: String, default: "" },
  liveDemoUrl: { type: String, default: "" },
  finalOutput: { type: String, default: "" },
  featuredImage: { type: String, default: "" },
}, { timestamps: true });

// Middleware to auto-generate slug from title
postSchema.pre("validate", function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
