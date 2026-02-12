import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}/authRoutes`;

export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/register`, data, { withCredentials: true });
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data, { withCredentials: true });
  return res.data;
};

export const getMe = async (token) => {
  const res = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
