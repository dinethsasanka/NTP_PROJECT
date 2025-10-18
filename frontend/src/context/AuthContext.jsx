import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);

  const login = (email, password) => {
    // mock auth
    if (email && password) {
      localStorage.setItem("user", email);
      setUser(email);
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    localStorage.setItem("user", email);
    setUser(email);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
