import Modal from "./Modal";
import Button from "../formElements/Button";

const ErrorModal = ({ error, handleCloseModal }) => {
  return (
    <Modal isModalOpen={!!error} handleCloseModal={handleCloseModal}>
      <div className="fixed top-1/2 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
        <div className="mb-4 w-full text-2xl font-semibold">Error</div>
        <p className="mb-5">{error}</p>
        <Button action={handleCloseModal} buttonStyle="danger">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
