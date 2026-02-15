const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Import custom error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
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