

const Backdrop = ({action, zIndex = 10, mobileOnly = false}) => {

  const zIndexStyle = `z-${zIndex}`

  return (
    <div onClick={action} className={`fixed top-0 left-0 w-screen h-screen bg-black opacity-50 ${zIndexStyle} ${mobileOnly && 'min-md:hidden'} `}/>
  )
}

export default Backdrop
