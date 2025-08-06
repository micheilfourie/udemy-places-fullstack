import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const NavLinks = ({ direction = "row", handleCloseDrawer }) => {
  const { isLoggedIn, userState } = useContext(AuthContext);

  return (
    <ul
      className={`flex ${direction === "row" ? "flex-row" : "flex-col justify-center items-center"} gap-4`}
    >
      <li>
        <NavLink
          to={"/"}
          onClick={handleCloseDrawer}
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          All Users
        </NavLink>
      </li>

      {isLoggedIn && (
        <>
          <li>
            <NavLink
              to={`/${userState.userId}/places`}
              onClick={handleCloseDrawer}
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              My Places
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/places/new"}
              onClick={handleCloseDrawer}
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Add Place
            </NavLink>
          </li>
        </>
      )}

      {!isLoggedIn && (
        <li>
          <NavLink
            to={"/auth"}
            onClick={handleCloseDrawer}
            className={({ isActive }) => (isActive ? "text-blue-500" : "")}
          >
            Sign Up
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
