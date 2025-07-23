import NavLinks from "./NavLinks";
import Backdrop from "../ui/Backdrop";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import ProfileSegment from "./ProfileSegment";

const SideDrawer = ({ isDrawerOpen, handleCloseDrawer }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {/* Desktop */}
      {isLoggedIn && (
        <div className="relative mx-auto max-w-screen-xl">
          <aside
            className={`absolute top-[75px] right-0 z-20 flex w-[300px] flex-col gap-4 bg-white p-4 shadow-sm ${isDrawerOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} transition-all duration-300 ease-in-out max-md:hidden`}
          >
            <ProfileSegment handleCloseDrawer={handleCloseDrawer} />
          </aside>
        </div>
      )}

      {/* Mobile */}
      <aside
        className={`fixed top-[75px] right-0 z-20 flex h-screen w-[300px] flex-col gap-4 bg-white p-4 shadow-sm min-md:hidden ${isDrawerOpen ? "translate-x-0" : "pointer-events-none translate-x-full"} transition-transform duration-300 ease-in-out`}
      >
        {isLoggedIn && (
          <ProfileSegment handleCloseDrawer={handleCloseDrawer} />
        )}

        <div className="mt-4 min-md:hidden">
          <NavLinks direction="column" handleCloseDrawer={handleCloseDrawer} />
        </div>
      </aside>
      {isDrawerOpen && <Backdrop action={handleCloseDrawer} />}
    </>
  );
};

export default SideDrawer;
