import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const login = (userId) => {
    setIsLoggedIn(true)
    setUserId(userId)
  };
  const logout = () => {
    setUserId("")
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
