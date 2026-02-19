# 🚀 Week 7: Deployment and DevOps Essentials – MERN Stack Application

## 🎯 Objective
Deploy a full MERN stack application to production, implement CI/CD pipelines, configure environment variables, and set up monitoring.

---

## 📂 Tasks Overview

### Task 1: Preparing the Application
- Optimize React frontend for production using `npm run build`.
- Implement code splitting for better performance.
- Configure environment variables for development, staging, and production.
- Prepare Express.js backend for production:
  - Implement proper error handling.
  - Set up secure HTTP headers with `helmet`.
  - Configure logging for production.
  - Set up MongoDB Atlas with proper user permissions and connection pooling.

### Task 2: Deploying the Backend
- Host Express.js backend on Render (or Railway/Heroku).
- Configure environment variables (`MONGO_URI`, `FRONTEND_URL`, etc.).
- Set up continuous deployment from GitHub.
- Enable HTTPS with SSL/TLS.
- Implement server monitoring and logging.

### Task 3: Deploying the Frontend
- Host React frontend on Vercel (or Netlify/GitHub Pages).
- Configure build settings and environment variables.
- Set up continuous deployment from GitHub.
- Enable HTTPS.
- Implement caching strategies for static assets.

### Task 4: CI/CD Pipeline Setup
- Configure GitHub Actions for:
  - Running tests
  - Linting and code quality checks
  - Building the application automatically
  - Deploying on successful builds
- Set up staging and production environments.
- Implement rollback strategies for failed deployments.

### Task 5: Monitoring and Maintenance
- Add health check endpoints for backend.
- Configure uptime monitoring and error tracking (e.g., Sentry).
- Monitor server resources and API performance.
- Implement frontend performance monitoring.
- Create a maintenance plan:
  - Regular updates and patches
  - Database backups
  - Deployment and rollback documentation

---

## 🧪 Expected Outcome
- Fully deployed MERN stack application accessible online.
- CI/CD pipeline integrated with GitHub Actions.
- Proper environment configuration for multiple environments.
- Monitoring and logging setup for frontend and backend.
- Documented deployment process and maintenance procedures.

---

## 🛠️ Setup Requirements
- Completed MERN stack application from previous weeks.
- Accounts on:
  - GitHub (source code and CI/CD)
  - MongoDB Atlas (database hosting)
  - Render/Heroku/Railway (backend hosting)
  - Vercel/Netlify/GitHub Pages (frontend hosting)
- Required CLI tools for chosen platforms installed.

---

## ✅ Submission Instructions
1. Accept GitHub Classroom assignment.
2. Clone your repository.
3. Complete all tasks and commit/push changes regularly.
4. Include in repository:
   - Full MERN stack code
   - CI/CD configuration files
   - `.env.example` for environment variables
   - Deployment scripts/configuration
   - Comprehensive README.md with:
     - Deployed frontend URL
     - Deployed backend API URL
     - Screenshots of CI/CD pipeline
     - Monitoring setup documentation

---

## 🔗 Deployment URLs
- **Frontend:** [https://week-7blogapp.vercel.app](https://week-7blogapp.vercel.app)  
- **Backend API:** [https://plp-mern-stack-development-classroom-ftu7.onrender.com](https://plp-mern-stack-development-classroom-ftu7.onrender.com)  

---

## 📸 Screenshots
*(Add screenshots of deployed app, CI/CD workflow, and monitoring here)*

---

## ⚡ Notes
- Backend CORS configured for production frontend.
- MongoDB Atlas used with proper user permissions and connection pooling.
- Health check endpoint: `/health` verifies server uptime and response.
