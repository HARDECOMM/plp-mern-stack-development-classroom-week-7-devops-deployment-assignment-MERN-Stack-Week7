import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/comments`;

/**
 * Add a new comment to a post
 * @param {string} postId - The ID of the post
 * @param {string} text - The comment text
 * @param {string} token - JWT token for authentication
 * @returns {Object} The created comment
 */
export const addComment = async (postId, text, token) => {
  try {
    const res = await axios.post(
      BASE_URL,
      { postId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error adding comment:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Get all comments for a specific post
 * @param {string} postId - The ID of the post
 * @returns {Array} List of comments
 */
export const getComments = async (postId) => {
  try {
    const res = await axios.get(`${BASE_URL}/post/${postId}`);
    // Your controller returns `res.json(comments)`, so res.data is already an array
    return res.data;
  } catch (err) {
    console.error("Error fetching comments:", err.response?.data || err.message);
    throw err;
  }
};
