import { useParams } from "react-router-dom";
import { useState } from "react";
import places from '../../tempData.js';
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const place = places.find((place) => place.id === placeId);

  const [title, setTitle] = useState({
    value: place.title,
    isValid: true,
    isTouched: false,
  });
  const [description, setDescription] = useState({
    value: place.description,
    isValid: true,
    isTouched: false,
  });

  const navigate = useNavigate();

  const handleEditPlace = (e) => {
    e.preventDefault();
    title.isValid && description.isValid
      ? (console.log(title.value, description.value), navigate("/u1/places"))
      : alert("Please fill in all the fields before submitting.");
  };

  if (!place) {
    return (
      <div className="bg-bg-gray-100 pt-[75px] text-center">
        <h1>Could not find place</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-[75px]">
      <div className="m-4 h-full w-full max-w-[800px] rounded-lg bg-white p-8 shadow-sm">
        <form
          onSubmit={handleEditPlace}
          action=""
          className="flex flex-col gap-4"
        >
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Edit Place
          </h1>

          <Input
            type="text"
            id="title"
            label="Title"
            state={title}
            setState={setTitle}
            placeholder="Enter Title"
          />

          <Input
            type="textarea"
            id="description"
            label="Description"
            placeholder="Write a description..."
            state={description}
            setState={setDescription}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlace;
