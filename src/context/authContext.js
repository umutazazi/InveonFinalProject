import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", role);
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    setUser(false);
    navigate("/login");
    alertify.error("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
