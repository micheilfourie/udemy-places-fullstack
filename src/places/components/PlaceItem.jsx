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

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
    {ReactDOM.createPortal(<Modal coordinates={coordinates} title={title} isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}/>, document.getElementById('modal-hook'))}
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
            <h3 className="text-sm text-neutral-500 mt-1">{address}</h3>
            <p className="mt-4">{description}</p>
          </div>
          <div className="flex items-center gap-2 p-4">
            <Button action={handleModalToggle}>View on map</Button>
            <Button buttonStyle="caution">Edit</Button>
            <Button buttonStyle="danger">Delete</Button>
          </div>
        </div>
      </Card>
    </li>
    </>
    
  );
};

export default PlaceItem;
