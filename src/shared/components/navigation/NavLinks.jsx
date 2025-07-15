import { NavLink } from "react-router-dom";

const NavLinks = ({direction = "row"}) => {
  return (
    <ul className={`flex ${direction === "row" ? "flex-row" : "flex-col"} gap-4`}>
        <li>
            <NavLink to={"/"} className={({isActive}) => isActive ? "text-blue-500" : ""}>All Users</NavLink>
        </li>
        <li>
            <NavLink to={"/u1/places"} className={({isActive}) => isActive ? "text-blue-500" : ""}>My Places</NavLink>
        </li>
        <li>
            <NavLink to={"/places/new"} className={({isActive}) => isActive ? "text-blue-500" : ""}>Add Place</NavLink>
        </li>
        <li>
            <NavLink to={"/auth"} className={({isActive}) => isActive ? "text-blue-500" : ""}>Sign Up</NavLink>
        </li>
    </ul>
  );
};

export default NavLinks;
