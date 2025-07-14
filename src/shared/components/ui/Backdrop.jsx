

const Backdrop = ({handleCloseDrawer}) => {
  return (
    <div onClick={handleCloseDrawer} className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10 min-md:hidden"/>
  )
}

export default Backdrop
