const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const errorHandler = require("./middleware/errorHandler"); // Import error handling middleware

require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware: Log requests
app.use(morgan("dev"));

// Middleware: Parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Default to localhost if .env is not set
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // Allow cookies to be sent
}));

// Security middleware: Set secure HTTP headers
app.use(helmet());

// MongoDB connection and server initialization
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");

  // Default route
  app.get("/", (req, res) => {
    res.send("Welcome to the Blog Post API");
  });

  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comments", commentRoutes);

  // Use the custom error handling middleware
  app.use(errorHandler); // This should come after your routes  
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});