import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ErrorModal from "../../shared/components/ui/ErrorModal";

const NewPlace = () => {
  const [title, setTitle] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [address, setAddress] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [latitude, setLatitude] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [longitude, setLongitude] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [description, setDescription] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });

  const [showCoordinates, setShowCoordinates] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleToggleCoordinates = () => {
    setShowCoordinates(!showCoordinates);
    setAddress({ value: "", isValid: false, isTouched: false });
    setLatitude({ value: "", isValid: false, isTouched: false });
    setLongitude({ value: "", isValid: false, isTouched: false });
  };

  const handleCloseModal = () => {
    clearError();
  };

  const handleAddPlace = (e) => {
    e.preventDefault();

    if (showCoordinates && (!latitude.isValid || !longitude.isValid)) {
      return;
    }

    if (
      !showCoordinates &&
      (!title.isValid || !address.isValid || !description.isValid)
    ) {
      return;
    }

    const addPlace = async () => {
      const data = showCoordinates
        ? {
            title: title.value,
            address: "",
            coordinates: {
              lat: latitude.value,
              lng: longitude.value,
            },
            description: description.value,
            creator: auth.userId,
          }
        : {
            title: title.value,
            address: address.value,
            coordinates: {
              lat: 0,
              lng: 0,
            },
            description: description.value,
            creator: auth.userId,
          };

      try {
        const res = await sendRequest(
          "http://localhost:5000/api/places",
          "POST",
          JSON.stringify(data),
          {
            "Content-Type": "application/json",
          },
        );

        if (!res) {
          throw new Error();
        }

        navigate(`/${auth.userId}/places`);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    addPlace();
  };

  return (
    <>
      {error && (
        <ErrorModal error={error} handleCloseModal={handleCloseModal} />
      )}
      <div className="flex min-h-screen justify-center bg-gray-100 pt-[75px]">
        {isLoading ? (
          <div className="mt-4 flex w-full justify-center gap-4">
            <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
          </div>
        ) : (
          <div className="m-4 h-full w-full max-w-[800px] rounded-lg bg-white p-8 shadow-sm">
            <form
              onSubmit={handleAddPlace}
              action=""
              className="flex flex-col gap-4"
            >
              <h1 className="mb-4 text-center text-2xl font-semibold">
                Add New Place
              </h1>

              <Input
                isLoading={isLoading}
                type="text"
                id="title"
                label="Title"
                state={title}
                setState={setTitle}
                placeholder="Enter Title"
              />

              {!showCoordinates ? (
                <>
                  <Input
                    isLoading={isLoading}
                    type="text"
                    id="address"
                    label="Address"
                    state={address}
                    setState={setAddress}
                    placeholder="Enter Address"
                  />
                  <p
                    onClick={handleToggleCoordinates}
                    className={`cursor-pointer text-blue-500 hover:underline ${isLoading && "pointer-events-none"}`}
                  >
                    Add with Coordinates?
                  </p>
                </>
              ) : (
                <>
                  <div className="flex gap-4 max-[500px]:flex-col">
                    <Input
                      isOptional
                      isLoading={isLoading}
                      type="number"
                      id="latitude"
                      label="Latitude"
                      state={latitude}
                      setState={setLatitude}
                      placeholder="40.7128"
                    />

                    <Input
                      isOptional
                      isLoading={isLoading}
                      type="number"
                      id="longitude"
                      label="Longitude"
                      state={longitude}
                      setState={setLongitude}
                      placeholder="-74.0060"
                    />
                  </div>
                  <p
                    onClick={handleToggleCoordinates}
                    className={`cursor-pointer text-blue-500 hover:underline ${isLoading && "pointer-events-none"}`}
                  >
                    Add with Address?
                  </p>
                </>
              )}

              <Input
                isLoading={isLoading}
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
        )}
      </div>
    </>
  );
};

export default NewPlace;
