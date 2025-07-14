import Button from "../formElements/Button";

const Modal = ({ coordinates, isModalOpen, handleCloseModal, title }) => {
  if (!isModalOpen) {
    return;
  }

  const { lat, lng } = coordinates;
  const googleMapsHref = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;

  return (
    <>
      <div className="fixed top-1/2 left-1/2 z-50 flex h-[70%] w-[90%] max-w-screen-lg -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white p-8">
        <div className="mb-8 w-full text-center text-2xl font-semibold">
          {title}
        </div>
        <div className="mb-8 h-full w-full">
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

      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-50"
      ></div>
    </>
  );
};

export default Modal;
