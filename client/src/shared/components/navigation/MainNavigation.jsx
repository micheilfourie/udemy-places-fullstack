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
      <h1 className="text-2xl font-bold uppercase">
        <Link to={"/"}>Places</Link>
      </h1>

      <nav className="flex items-center gap-8 max-md:hidden">
        <NavLinks handleCloseDrawer={handleCloseDrawer} />

        {isLoggedIn && (
          <button onClick={handleDrawerToggle} className="cursor-pointer">
            <Avatar image={userState.userImage} name={userState.userName} />
          </button>
        )}
      </nav>

      <button
        onClick={handleDrawerToggle}
        className="hidden cursor-pointer flex-col items-center gap-1.5 max-md:flex"
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
