import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

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

// ===== FORGOT PASSWORD =====
export const forgotPassword = async (email) => {
  const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
  return res.data;
};

// ===== RESET PASSWORD =====
export const resetPassword = async (token, password) => {
  const res = await axios.post(`${BASE_URL}/reset-password/${token}`, { password });
  return res.data;
};