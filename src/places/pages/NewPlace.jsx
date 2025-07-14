import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useState } from "react";

const NewPlace = () => {
  const [title, setTitle] = useState({ value: "", isValid: false, isTouched: false });
  const [address, setAddress] = useState({ value: "", isValid: false, isTouched: false });
  const [latitude, setLatitude] = useState({ value: "", isValid: false, isTouched: false });
  const [longitude, setLongitude] = useState({ value: "", isValid: false, isTouched: false });
  const [description, setDescription] = useState({ value: "", isValid: false, isTouched: false });

  // const coordinates = `${latitude.value},${longitude.value}`;

  const handleAddPlace = (e) => {
    e.preventDefault();

    title.isValid &&
    address.isValid &&
    description.isValid &&
    latitude.isValid &&
    longitude.isValid &&
    description.isValid
      ? (console.log(title.value, address.value, `${latitude.value},${longitude.value}`, description.value), clearInputs())
      : alert(
          "Please fill in all the fields and enter valid coordinates (latitude and longitude).",
        );
  };

  const clearInputs = () => {
    setTitle({ value: "", isValid: false, isTouched: false });
    setAddress({ value: "", isValid: false, isTouched: false });
    setLatitude({ value: "", isValid: false, isTouched: false });
    setLongitude({ value: "", isValid: false, isTouched: false });
    setDescription({ value: "", isValid: false, isTouched: false });
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 pt-[75px]">
      <div className="m-4 h-full w-full max-w-[800px] rounded-lg bg-white p-8 shadow-sm">
        <form
          onSubmit={handleAddPlace}
          action=""
          className="flex flex-col gap-4"
        >
          <h1 className="text-center text-2xl font-semibold mb-4">Add New Place</h1>

          <Input
            type="text"
            id="title"
            label="Title"
            state={title}
            setState={setTitle}
            placeholder="Enter Title"
          />

          <Input
            type="text"
            id="address"
            label="Address"
            state={address}
            setState={setAddress}
            placeholder="Enter Address"
          />

          <div className="flex gap-4 max-[500px]:flex-col">
            <Input
              type="number"
              id="latitude"
              label="Latitude"
              state={latitude}
              setState={setLatitude}
              placeholder="Latitude"
            />

            <Input
              type="number"
              id="longitude"
              label="Longitude"
              state={longitude}
              setState={setLongitude}
              placeholder="Longitude"
            />
          </div>

          <Input
            type="textarea"
            id="description"
            label="Description"
            placeholder="Write a description..."
            state={description}
            setState={setDescription}
          />

          <Button type="submit">Add Place</Button>
        </form>
      </div>
    </div>
  );
};

export default NewPlace;
