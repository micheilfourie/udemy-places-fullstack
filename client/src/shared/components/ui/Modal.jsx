import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";

const Modal = ({ children, isModalOpen, handleCloseModal }) => {
  if (!isModalOpen) {
    return;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <>
          {children}
          <Backdrop action={handleCloseModal} zIndex={40} />
        </>,
        document.getElementById("modal-hook"),
      )}
    </>
  );
};

export default Modal;
