import { PostCard } from "./PostCard";

export function PostList({ posts, showActions = false, onDelete }) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-600">No posts found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          showActions={showActions}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
