import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userPlacesLength, setUserPlacesLength] = useState(0);

  const login = (id, name, image, places) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUserName(name);
    setUserImage(image);
    setUserPlacesLength(places);
  };

  const logout = () => {
    setUserId("");
    setIsLoggedIn(false);
  };

  const handlePlaceIncrement = () => {
    setUserPlacesLength((prev) => prev + 1);
  };

  const handlePlaceDecrement = () => {
    setUserPlacesLength((prev) => prev - 1);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userId, userName, userImage, setUserImage, userPlacesLength, handlePlaceIncrement, handlePlaceDecrement }}
    >
      {children}
    </AuthContext.Provider>
  );
};
