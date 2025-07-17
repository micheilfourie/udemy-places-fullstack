

const Card = ({children}) => {
  return (
    <div className=" flex items-center rounded-lg bg-white shadow-sm overflow-hidden">
      {children}
    </div>
  )
}

export default Card
