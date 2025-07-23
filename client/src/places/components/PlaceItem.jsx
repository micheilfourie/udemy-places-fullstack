import Card from "../../shared/components/ui/Card";
import Button from "../../shared/components/formElements/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import MapModal from "../../shared/components/ui/MapModal";
import DeleteModal from "../../shared/components/ui/DeleteModal";

const PlaceItem = ({
  id,
  title,
  image,
  address,
  description,
  creatorId,
  coordinates,
  setLoadedPlaces,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const { userId } = useContext(AuthContext);

  const { error, sendRequest, clearError } = useHttpClient();

  const handleShowModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    clearError();
  };

  const handleDeletePlace = () => {
    const deletePlace = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/places/${id}`,
          "DELETE",
        );

        if (!res) {
          throw new Error();
        }

        handleCloseModal();
        setLoadedPlaces((prevPlaces) =>
          prevPlaces.filter((place) => place.id !== id),
        );

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    deletePlace();
  };

  return (
    <>
      {error && (
        <ErrorModal error={error} handleCloseModal={handleCloseErrorModal} />
      )}

      {modalType === "map" ? (
        <MapModal
          title={title}
          coordinates={coordinates}
          address={address}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      ) : (
        <DeleteModal
          title={title}
          handleDeletePlace={handleDeletePlace}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
        ></DeleteModal>
      )}

      <li>
        <Card>
          <div className="w-full">
            <div className="w-full">
              <img
                src={`http://localhost:5000/${image}`}
                alt={title}
                className=" aspect-square w-full object-cover"
              />
            </div>

            <div className="mt-4 p-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <h3 className="mt-1 text-sm text-neutral-500">{address === "" ? `${coordinates.lat}, ${coordinates.lng}` : address}</h3>
              <p className="mt-4">{description}</p>
            </div>

            <div className="flex items-center gap-2 p-4">
              <Button action={() => handleShowModal("map")}>View on map</Button>
              {creatorId === userId && (
                <>
                  <Button link={`/places/${id}`} buttonStyle="caution">
                    Edit
                  </Button>
                  <Button
                    action={() => handleShowModal("delete")}
                    buttonStyle="danger"
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
