import Avatar from "../../shared/components/ui/Avatar";
import { Link } from "react-router-dom";
import Card from "../../shared/components/ui/Card";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/authContext";

const UserItem = ({ id, name, image, places }) => {

  const placesLength = places.length

  const auth = useContext(AuthContext)

  return (
    <li className="my-4">
      <Link to={`/${id}/places`}>
        <Card>
          <div className="p-4 flex gap-4 items-center">
            <Avatar image={image} name={name} width={100} />
            <div>
              <h2 className="text-xl">{name}<span className="text-blue-500">{auth.userId === id && " (You)"}</span></h2>
              <p>
                {placesLength} {placesLength === 1 ? "Place" : "Places"}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};

export default UserItem;
