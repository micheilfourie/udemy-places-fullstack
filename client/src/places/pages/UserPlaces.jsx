import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { places } from "../../tempData.js";

const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = places.filter((place) => place.creator === userId);

  return (
    <div className="min-h-screen bg-gray-100 pt-[75px]">
      <PlaceList items={filteredPlaces} />
    </div>
  );
};

export default UserPlaces;
