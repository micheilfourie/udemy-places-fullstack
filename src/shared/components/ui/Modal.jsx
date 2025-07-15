import Button from "../formElements/Button";
import Backdrop from "./Backdrop";

const Modal = ({ content, isModalOpen, handleCloseModal }) => {
  if (!isModalOpen) {
    return;
  }

  return (
    <>
      {content}
      <Backdrop action={handleCloseModal} zIndex={40} />
    </>
  );
};

export default Modal;
