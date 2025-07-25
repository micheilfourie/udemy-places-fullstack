import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./authContext";

let logoutTimer;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tokenExpiryDate, setTokenExpiryDate] = useState(null);

  const [userState, setUserState] = useState({
    userId: "",
    userName: "",
    userImage: "",
    userPlacesLength: 0,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiryDate) > new Date()
    ) {
      login(
        storedData.id,
        storedData.name,
        storedData.image,
        storedData.places,
        storedData.token,
        storedData.expiryDate,
      );
    }
  }, []);

  const login = (id, name, image, places, token, expiryDate) => {
    const tokenExpiryDate =
      expiryDate ||
      new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();

    localStorage.setItem(
      "userData",
      JSON.stringify({
        id,
        name,
        image,
        places,
        token,
        expiryDate: tokenExpiryDate,
      }),
    );

    setUserState({
      userId: id,
      userName: name,
      userImage: image,
      userPlacesLength: places,
    });

    setIsLoggedIn(true);
    setToken(token);
    setTokenExpiryDate(tokenExpiryDate);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("userData");

    setUserState({
      userId: "",
      userName: "",
      userImage: "",
      userPlacesLength: 0,
    });

    setIsLoggedIn(false);
    setToken("");
    setTokenExpiryDate(null);
  }, []);

  useEffect(() => {
    if (token && tokenExpiryDate) {
      const expiryDate = new Date(tokenExpiryDate);
      const remainingTime = expiryDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiryDate, logout]);

  const handleImageChange = (image) => {
    setUserState({
      ...userState,
      userImage: image,
    });

    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userData")),
        image: image,
      }),
    );
  };

  const handlePlaceIncrement = () => {
    const userPlacesLength = JSON.parse(
      localStorage.getItem("userData"),
    ).places;

    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userData")),
        places: userPlacesLength + 1,
      }),
    );

    setUserState({
      ...userState,
      userPlacesLength: userPlacesLength + 1,
    });
  };

  const handlePlaceDecrement = () => {
    const userPlacesLength = JSON.parse(
      localStorage.getItem("userData"),
    ).places;

    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("userData")),
        places: userPlacesLength - 1,
      }),
    );

    setUserState({
      ...userState,
      userPlacesLength: userPlacesLength - 1,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userState,
        login,
        logout,
        handleImageChange,
        handlePlaceIncrement,
        handlePlaceDecrement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
