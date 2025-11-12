import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  useEffect(() => {
    const onUser = () => {
      try { setUser(JSON.parse(localStorage.getItem("user"))); } catch { setUser(null); }
    };
    window.addEventListener("userUpdated", onUser);
    return () => window.removeEventListener("userUpdated", onUser);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const signup = async (payload) => {
    return API.post("/auth/register", payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
