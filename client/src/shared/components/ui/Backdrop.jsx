

const Backdrop = ({action, zIndex = 10, mobileOnly = false}) => {

  return (
    <div onClick={action} style={{zIndex: zIndex}} className={`fixed top-0 left-0 w-screen h-screen bg-black opacity-50 ${mobileOnly && 'min-md:hidden'} `}/>
  )
}

export default Backdrop
