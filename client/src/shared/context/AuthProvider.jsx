import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const login = (id, name, image) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUserName(name);
    setUserImage(image);
  };
  const logout = () => {
    setUserId("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userId, userName, userImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
