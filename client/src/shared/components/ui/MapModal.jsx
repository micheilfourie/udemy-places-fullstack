import Modal from "./Modal";
import Button from "../formElements/Button";

const MapModal = ({
  title,
  coordinates,
  address,
  handleCloseModal,
  isModalOpen,
}) => {
  let googleQuery;

  if (address && address !== "") {
    googleQuery = `https://maps.google.com/maps?q=${address}&output=embed`;
  } else {
    const { lat, lng } = coordinates;
    googleQuery = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
  }

  return (
    <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
      <div className="fixed top-1/2 left-1/2 z-50 flex h-[70%] w-[95%] max-w-screen-lg -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white py-4">
        <div className="mb-4 w-full text-center text-2xl font-semibold">
          {title}
        </div>

        <div className="mb-4 h-full w-full">
          <iframe
            src={googleQuery}
            width="100%"
            height="100%"
            allowFullScreen=""
          ></iframe>
        </div>

        <Button buttonStyle="danger" action={handleCloseModal}>
          Close Map
        </Button>
      </div>
    </Modal>
  );
};

export default MapModal;
