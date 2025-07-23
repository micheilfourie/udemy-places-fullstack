import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useState, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook";
import ImageUpload from "../../shared/components/formElements/ImageUpload";

const NewPlace = () => {
  const [showCoordinates, setShowCoordinates] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const placeForm = useForm([
    "title",
    "address",
    "latitude",
    "longitude",
    "description",
    "image",
  ]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleToggleCoordinates = () => {
    setShowCoordinates(!showCoordinates);
    placeForm.resetFields(["latitude", "longitude", "address"]);
  };

  const handleCloseModal = () => {
    clearError();
  };

  const handleAddPlace = (e) => {
    e.preventDefault();

    const formState = placeForm.formState;

    if (
      showCoordinates &&
      (!formState.latitude.isValid || !formState.longitude.isValid)
    ) {
      return;
    }

    if (
      !showCoordinates &&
      (!formState.title.isValid ||
        !formState.address.isValid ||
        !formState.description.isValid)
    ) {
      return;
    }

    const addPlace = async () => {
      const formData = new FormData();
      formData.append("title", formState.title.value);
      formData.append(
        "address",
        showCoordinates ? "" : formState.address.value,
      );
      formData.append(
        "coordinates",
        JSON.stringify(
          showCoordinates
            ? {
                lat: formState.latitude.value,
                lng: formState.longitude.value,
              }
            : {
                lat: 0,
                lng: 0,
              },
        ),
      );
      formData.append("description", formState.description.value);
      formData.append("image", formState.image.value);
      formData.append("creator", auth.userId);

      try {
        const res = await sendRequest(
          "http://localhost:5000/api/places",
          "POST",
          formData,
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
      <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-[75px]">
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

              <ImageUpload id={"image"} form={placeForm} />

              <Input
                isLoading={isLoading}
                type="text"
                id="title"
                label="Title"
                form={placeForm}
                placeholder="Enter Title"
              />

              {!showCoordinates ? (
                <>
                  <Input
                    isLoading={isLoading}
                    type="text"
                    id="address"
                    label="Address"
                    form={placeForm}
                    placeholder="Enter Address"
                  />
                  <div>
                    <span
                      onClick={handleToggleCoordinates}
                      className={`cursor-pointer text-blue-500 hover:underline ${isLoading && "pointer-events-none"}`}
                    >
                      Add with Coordinates?
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4 max-[500px]:flex-col">
                    <Input
                      isLoading={isLoading}
                      type="number"
                      id="latitude"
                      label="Latitude"
                      form={placeForm}
                      placeholder="40.7128"
                    />

                    <Input
                      isLoading={isLoading}
                      type="number"
                      id="longitude"
                      label="Longitude"
                      form={placeForm}
                      placeholder="-74.0060"
                    />
                  </div>
                  <div>
                    <span
                      onClick={handleToggleCoordinates}
                      className={`cursor-pointer text-blue-500 hover:underline ${isLoading && "pointer-events-none"}`}
                    >
                      Add with Address?
                    </span>
                  </div>
                </>
              )}

              <Input
                isLoading={isLoading}
                type="textarea"
                id="description"
                label="Description"
                placeholder="Write a description..."
                form={placeForm}
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
