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
app.use(process.env.NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));

// Security headers
app.use(helmet());

// Body parser
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // allow your frontend URL or all in dev
}));

// ================= STEP 3: HEALTH CHECK ENDPOINT =================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ================= STEP 4: DEFAULT ROUTE =================
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Blog Post API</h1>
    <p>Use <code>/api/auth</code>, <code>/api/posts</code>, <code>/api/comments</code> for API endpoints.</p>
    <p>Check <a href="/health">/health</a> for server status.</p>
  `);
});

// ================= STEP 5: API ROUTES =================
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// ================= STEP 6: 404 HANDLER =================
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// ================= STEP 7: ERROR HANDLER =================
app.use(errorHandler);

// ================= STEP 8: DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
  );

  // ================= STEP 9: GRACEFUL SHUTDOWN =================
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
  });

})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});