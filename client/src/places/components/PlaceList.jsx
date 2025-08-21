import PlaceItem from "./PlaceItem";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/authContext";
import AddPlaceSkeleton from "../../shared/components/ui/AddPlaceSkeleton";
import { useNavigate } from "react-router-dom";

const PlaceList = ({ items, setLoadedPlaces, userId }) => {
  const { isLoggedIn, userState } = useContext(AuthContext);

  const navigate = useNavigate();

  if ((items.length === 0 && !isLoggedIn) || (userState.userId !== userId && isLoggedIn)) {
    return (
      <h1 className="pt-4 text-center text-xl font-semibold">
        No places found
      </h1>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl p-4 xl:px-0">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            title={place.title}
            image={place.image}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            coordinates={place.location}
            setLoadedPlaces={setLoadedPlaces}
          />
        ))}

        {isLoggedIn && userState.userId === userId && (
          <li>
            <AddPlaceSkeleton action={() => navigate("/places/new")} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default PlaceList;
