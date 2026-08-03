import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("polling_token");
    if (token) {
      api
        .get("/auth/me")
        .then(({ data }) => {
          setUser(data.user);
        })
        .catch(() => {
          localStorage.removeItem("polling_token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.token) {
      localStorage.setItem("polling_token", data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, username, email, password) => {
    const { data } = await api.post("/auth/register", { name, username, email, password });
    return data;
  };

  const verifyRegister = async (email, otp) => {
    const { data } = await api.post("/auth/verify-register", { email, otp });
    if (data.token) {
      localStorage.setItem("polling_token", data.token);
      setUser(data.user);
    }
    return data;
  };

  const resendRegisterOtp = async (email) => {
    const { data } = await api.post("/auth/resend-register-otp", { email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("polling_token");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        verifyRegister,
        resendRegisterOtp,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
