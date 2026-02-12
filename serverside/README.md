 MERN Blog — Server

## Setup
1. Copy `.env.example` to `.env` and update values.
2. Install deps:
npm install

markdown
Copy code
3. Run:
npm run dev

markdown
Copy code

## API
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/auth/me` — current user (requires Authorization: Bearer <token>)
- `GET /api/posts` — list posts (pagination, q, category)
- `GET /api/posts/:id` — single post
- `POST /api/posts` — create post (auth)
- `PUT /api/posts/:id` — update (auth)
- `DELETE /api/posts/:id` — delete (auth)
- `GET /api/categories` — list categories
- `POST /api/categories` — create category (auth)
- `POST /api/comments` — add comment (auth)
- `GET /api/comments/post/:postId` — comments for a post.