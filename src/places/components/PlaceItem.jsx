import Card from "../../shared/components/ui/Card";
import Button from "../../shared/components/formElements/Button";
import Modal from "../../shared/components/ui/Modal";
import ReactDOM from "react-dom";
import { useState } from "react";

const PlaceItem = ({
  id,
  title,
  image,
  address,
  description,
  creatorId,
  coordinates,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleShowModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePlace = () => {
    console.log("Deleting place...");
    handleCloseModal();
  };

  const { lat, lng } = coordinates;
  const googleMapsHref = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;

  const content =
    modalType === "map" ? (
      <div className="fixed top-1/2 left-1/2 z-50 flex h-[70%] w-[95%] max-w-screen-lg -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white py-4">
        <div className="mb-4 w-full text-center text-2xl font-semibold">
          {title}
        </div>

        <div className="mb-4 h-full w-full">
          <iframe
            src={googleMapsHref}
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <Button buttonStyle="danger" action={handleCloseModal}>
          Close Map
        </Button>
      </div>
    ) : (
      <div className="fixed top-1/2 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
        <div className="mb-4 w-full text-2xl font-semibold">
          Delete {title}?
        </div>

        <p>
          Are you sure you want to delete this place? This action cannot be
          undone.
        </p>

        <div className="mt-5 grid w-full grid-cols-2 gap-4">
          <Button buttonStyle="danger" action={handleDeletePlace}>
            Delete
          </Button>

          <Button action={handleCloseModal}>Cancel</Button>
        </div>
      </div>
    );

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          content={content}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />,
        document.getElementById("modal-hook"),
      )}
      <li>
        <Card>
          <div className="w-full">
            <div className="w-full">
              <img
                src={image}
                alt={title}
                className="h-[300px] w-full object-cover"
              />
            </div>
            <div className="mt-4 p-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <h3 className="mt-1 text-sm text-neutral-500">{address}</h3>
              <p className="mt-4">{description}</p>
            </div>
            <div className="flex items-center gap-2 p-4">
              <Button action={() => handleShowModal("map")}>View on map</Button>
              {creatorId === "u1" && (
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
