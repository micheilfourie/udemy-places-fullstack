import NavLinks from "./NavLinks"
import Backdrop from "../ui/Backdrop"

const SideDrawer = ({isDrawerOpen, handleCloseDrawer}) => {
  return (
    <>
    <aside onClick={handleCloseDrawer} className={`fixed top-[75px] z-20 p-4 right-0 h-screen w-[300px] min-md:hidden bg-white shadow-sm ${isDrawerOpen ? "translate-x-0" : "translate-x-full pointer-events-none"} transition-transform duration-300 ease-in-out`}>
      <NavLinks direction="column" />
    </aside>
    {isDrawerOpen && <Backdrop action={handleCloseDrawer} mobileOnly/>}
    </>
    
  )
}

export default SideDrawer
