const Button = ({ children, buttonStyle = "default", action = () => {} }) => {
  const dangerStyle =
    "border border-rose-600 hover:text-white text-rose-600 hover:bg-rose-600";
  const cautionStyle =
    "border border-amber-500 hover:bg-amber-500 hover:text-white text-amber-500";
  const defaultStyle =
    "border-neutral-800 border hover:bg-neutral-800 hover:text-white text-neutral-800";

  return (
    <button
      onClick={action}
      className={`${buttonStyle === "danger" ? dangerStyle : buttonStyle === "caution" ? cautionStyle : defaultStyle} cursor-pointer rounded-lg px-4 py-2 uppercase transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
