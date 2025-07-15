import { useNavigate } from "react-router-dom";

const Button = ({ children, buttonStyle = "default", action = () => {}, link }) => {

  const navigate = useNavigate();

  const dangerStyle =
    "border border-red-400 bg-red-400 text-white hover:bg-red-500 hover:border-red-500";
  const cautionStyle =
    "border border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600";
  const defaultStyle =
    "border border-neutral-600 bg-neutral-600 text-white hover:bg-neutral-700 hover:border-neutral-700";

  return (
    <button
      onClick={link ? () => navigate(link) : action}
      className={`${buttonStyle === "danger" ? dangerStyle : buttonStyle === "caution" ? cautionStyle : defaultStyle} text-nowrap cursor-pointer rounded-lg px-4 py-2 uppercase transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
