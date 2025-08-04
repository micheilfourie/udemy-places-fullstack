import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Avatar from "../ui/Avatar";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const MainNavigation = ({
  handleDrawerToggle,
  isDrawerOpen,
  handleCloseDrawer,
}) => {
  const { userState, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="mx-auto flex h-[75px] max-w-screen-xl items-center justify-between max-xl:px-4">
      <Link to={"/"}>
        <h1
          onClick={handleCloseDrawer}
          className="font-raleway pl-1 text-3xl font-bold"
        >
          Places
        </h1>
      </Link>

      <nav className="flex items-center gap-8 max-md:hidden">
        <NavLinks handleCloseDrawer={handleCloseDrawer} />

        {isLoggedIn && (
          <button
            onClick={handleDrawerToggle}
            className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 outline-none"
          >
            <span
              className={`absolute h-1 w-8 rounded-full bg-neutral-800 transition-all duration-300 ${
                isDrawerOpen
                  ? "translate-y-0 -rotate-45 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            />

            <span
              className={`absolute h-1 w-8 rounded-full bg-neutral-800 transition-all duration-300 ${
                isDrawerOpen
                  ? "translate-y-0 rotate-45 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            />

            <div
              className={`transition-all duration-300 ease-in-out ${
                isDrawerOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <Avatar image={userState.userImage} name={userState.userName} />
            </div>
          </button>
        )}
      </nav>

      <button
        onClick={handleDrawerToggle}
        className="hidden cursor-pointer flex-col items-center gap-1.5 px-2 py-4 max-md:flex"
      >
        <span
          className={`h-1 w-8 rounded-full bg-neutral-800 ${isDrawerOpen && "translate-y-2.5 -rotate-45"} transition-all duration-300 ease-in-out`}
        />
        <span
          className={`h-1 w-8 rounded-full bg-neutral-800 ${isDrawerOpen ? "opacity-0" : "opacity-100"} transition-all duration-300 ease-in-out`}
        />
        <span
          className={`h-1 w-8 rounded-full bg-neutral-800 ${isDrawerOpen && "-translate-y-2.5 rotate-45"} transition-all duration-300 ease-in-out`}
        />
      </button>
    </div>
  );
};

export default MainNavigation;
