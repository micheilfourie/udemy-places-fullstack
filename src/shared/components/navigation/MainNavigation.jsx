import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MainNavigation = ({ handleDrawerToggle, isDrawerOpen }) => {
  return (
    <div className="mx-auto flex h-[75px] max-w-screen-xl items-center justify-between px-4">
      <h1 className="text-2xl font-bold uppercase">
        <Link to={"/"}>Places</Link>
      </h1>

      <nav className="gap-4 max-md:hidden">
        <NavLinks />
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
