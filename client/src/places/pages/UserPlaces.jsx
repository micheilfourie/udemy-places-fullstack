import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [places, setLoadedPlaces] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await sendRequest(
          `${import.meta.env.VITE_API_URL}/api/places/user/${userId}`,
        );

        setLoadedPlaces(res.places);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchPlaces();
  }, [sendRequest, userId, setLoadedPlaces]);

  return (
    <div className="min-h-screen bg-gray-100 pt-[75px]">
      {isLoading ? (
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
        </div>
      ) : (
        <PlaceList items={places} setLoadedPlaces={setLoadedPlaces} />
      )}
    </div>
  );
};

export default UserPlaces;
