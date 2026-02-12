import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;

export const getPosts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.posts;
};

export const getPost = async (slug) => {
  const res = await axios.get(`${BASE_URL}/${slug}`);
  return res.data;
};

export const createPost = async (data, token) => {
  const res = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updatePost = async (slug, data, token) => {
  const res = await axios.put(`${BASE_URL}/${slug}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deletePost = async (slug, token) => {
  const res = await axios.delete(`${BASE_URL}/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyPosts = async (token) => {
  const res = await axios.get(`${BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.posts;
};

/* ✅ Category APIs */

// Get posts by category
export const getPostsByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/category/${category}`);
  return res.data.posts;
};

// (Optional) Get all categories if you expose an endpoint like /posts/categories
export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories`);
  return res.data.categories;
};
