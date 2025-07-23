import SideDrawer from "./SideDrawer";
import MainNavigation from "./MainNavigation";
import { useState } from "react";

const MainHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 z-30 w-full bg-white shadow-sm">
        <MainNavigation
          handleDrawerToggle={handleDrawerToggle}
          handleCloseDrawer={handleCloseDrawer}
          isDrawerOpen={isDrawerOpen}
        />
      </header>
      <SideDrawer isDrawerOpen={isDrawerOpen} handleCloseDrawer={handleCloseDrawer} />
    </>
  );
};

export default MainHeader;
