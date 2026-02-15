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

// ================= STEP 1: TRUST PROXY (for Render / Railway / Heroku)
app.set('trust proxy', 1);

// ================= STEP 2: MIDDLEWARE =================

// Logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Security headers
app.use(helmet());

// Body parser
app.use(express.json());

// ================= STEP 3: CORS =================
// Only allow your deployed frontend (add more if needed)
const allowedOrigins = [
  "https://blogappclient-seven.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }

    // ✅ Allow the request
    return callback(null, origin);
  },
  credentials: true
}));

// ================= STEP 4: HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// ================= STEP 5: DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.send("Welcome to the Blog Post API");
});

// ================= STEP 6: API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// ================= STEP 7: 404 HANDLER =================
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found"
  });
});

// ================= STEP 8: ERROR HANDLER =================
app.use(errorHandler);

// ================= STEP 9: DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );

  // ================= STEP 10: GRACEFUL SHUTDOWN =================
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
    server.close(() => process.exit(1));
  });

})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
  process.exit(1);
});