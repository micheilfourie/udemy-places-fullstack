import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const NavLinks = ({ direction = "row" }) => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ul
      className={`flex ${direction === "row" ? "flex-row" : "flex-col"} gap-4`}
    >
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          All Users
        </NavLink>
      </li>

      {isLoggedIn && (
        <>
          <li>
            <NavLink
              to={`/${userId}/places`}
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              My Places
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/places/new"}
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Add Place
            </NavLink>
          </li>

          <li
            onClick={handleLogout}
            className="cursor-pointer hover:text-blue-500"
          >
            Log Out
          </li>
        </>
      )}

      {!isLoggedIn && (
        <li>
          <NavLink
            to={"/auth"}
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
