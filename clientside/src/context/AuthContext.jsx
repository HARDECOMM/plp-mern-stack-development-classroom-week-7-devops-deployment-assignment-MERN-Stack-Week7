import { createContext, useState, useContext } from "react";
import { loginUser, registerUser, forgotPassword, resetPassword as resetPasswordApi } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(""); // for success/error messages

  // ===== LOGIN =====
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);
      if (res.token && res.user) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        return true;
      }
      return false;
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ===== REGISTER =====
  const register = async (formData) => {
    try {
      const res = await registerUser(formData);
      if (res.token && res.user) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        return true;
      }
      return false;
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // ===== FORGOT PASSWORD =====
  const requestPasswordReset = async (email) => {
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      return true;
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset link");
      return false;
    }
  };

  // ===== RESET PASSWORD =====
  const resetPassword = async (token, newPassword) => {
    try {
      const data = await resetPasswordApi(token, newPassword);
      setMessage(data.message);
      return true;
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        message,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);