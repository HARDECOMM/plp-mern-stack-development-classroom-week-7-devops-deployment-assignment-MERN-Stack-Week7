import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;

// Fetch recent posts (limit by count)
export const getRecentPosts = async (limit = 5) => {
  try {
    const res = await axios.get(`${BASE_URL}?limit=${limit}`);
    return res.data; // expected { posts: [...] }
  } catch (err) {
    console.error("Error fetching recent posts:", err.response?.data || err.message);
    throw err;
  }
};
