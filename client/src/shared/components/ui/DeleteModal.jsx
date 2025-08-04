import Modal from "./Modal";
import Button from "../formElements/Button";

const DeleteModal = ({title, handleDeletePlace, handleCloseModal, isModalOpen}) => {
  return (
    <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <div className="fixed top-1/2 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-4">
        <div className="mb-4 w-full text-2xl font-semibold">
          Delete {title} ?
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
    </Modal>
  )
}

export default DeleteModal
