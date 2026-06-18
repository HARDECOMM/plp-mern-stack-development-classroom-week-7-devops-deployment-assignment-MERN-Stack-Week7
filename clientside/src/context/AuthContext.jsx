import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, forgotPassword, resetPassword as resetPasswordApi, getMe } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // for success/error messages

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await getMe(token);
          if (res) {
            setUser(res);
          }
        } catch (err) {
          console.error("Auth verification failed:", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // ===== LOGIN =====
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);
      if (res.token && res.user) {
        localStorage.setItem("token", res.token);
        // User login returns user summary, but we can fetch full user details if needed,
        // or just set what we received. Let's get the full user profile details.
        try {
          const fullUser = await getMe(res.token);
          setUser(fullUser);
        } catch {
          setUser(res.user);
        }
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
        loading,
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