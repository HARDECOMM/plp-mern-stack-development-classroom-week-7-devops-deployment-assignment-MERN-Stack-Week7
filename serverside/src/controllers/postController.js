const Post = require("../models/Posts");
const slugify = require("slugify");

// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username email");
  res.json({ posts });
};

// Get post by slug
exports.getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate("author", "username email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ post });
};

// Create post (slug auto-generated in model)
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      postType,
      problemStatement,
      architecture,
      codeSnippet,
      codeLanguage,
      githubUrl,
      liveDemoUrl,
      finalOutput,
      featuredImage
    } = req.body;

    const post = new Post({
      title,
      content,
      category,
      author: req.user._id,
      postType: postType || "standard",
      problemStatement: problemStatement || "",
      architecture: architecture || "",
      codeSnippet: codeSnippet || "",
      codeLanguage: codeLanguage || "javascript",
      githubUrl: githubUrl || "",
      liveDemoUrl: liveDemoUrl || "",
      finalOutput: finalOutput || "",
      featuredImage: featuredImage || ""
    });

    await post.save();
    res.status(201).json({ post });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      postType,
      problemStatement,
      architecture,
      codeSnippet,
      codeLanguage,
      githubUrl,
      liveDemoUrl,
      finalOutput,
      featuredImage
    } = req.body;

    const post = await Post.findOne({ slug: req.params.slug, author: req.user._id });
    if (!post) return res.status(404).json({ message: "Post not found or not yours" });

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (postType) post.postType = postType;

    if (problemStatement !== undefined) post.problemStatement = problemStatement;
    if (architecture !== undefined) post.architecture = architecture;
    if (codeSnippet !== undefined) post.codeSnippet = codeSnippet;
    if (codeLanguage !== undefined) post.codeLanguage = codeLanguage;
    if (githubUrl !== undefined) post.githubUrl = githubUrl;
    if (liveDemoUrl !== undefined) post.liveDemoUrl = liveDemoUrl;
    if (finalOutput !== undefined) post.finalOutput = finalOutput;
    if (featuredImage !== undefined) post.featuredImage = featuredImage;

    await post.save();
    res.json({ post });
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete post by slug
exports.deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ slug: req.params.slug, author: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found or not yours" });
  res.json({ message: "Post deleted" });
};

// Get posts by logged-in user
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).populate("author", "username email");
    res.json({ posts });
  } catch (err) {
    console.error("Get my posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await Post.find({ category }).populate("author", "username email");
    res.json({ posts });
  } catch (err) {
    console.error("Get posts by category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

