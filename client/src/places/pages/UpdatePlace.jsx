import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext.js";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import { useForm } from "../../shared/hooks/form-hook.js";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const navigate = useNavigate();

  const { userState, token } = useContext(AuthContext);

  const updatePlaceForm = useForm(["title", "description"]);
  const { updateValue, setFieldValidity } = updatePlaceForm;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await sendRequest(
          `${import.meta.env.VITE_API_URL}/api/places/${placeId}`,
        );

        if (!res) {
          throw new Error();
        }

        updateValue("title", res.place.title);
        updateValue("description", res.place.description);
        setFieldValidity("title", true);
        setFieldValidity("description", true);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchPlace();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, placeId]);

  const handleEditPlace = (e) => {
    e.preventDefault();

    const editPlace = async () => {
      const formState = updatePlaceForm.formState;

      if (!formState.title.isValid || !formState.description.isValid) {
        return;
      }

      try {
        const res = await sendRequest(
          `${import.meta.env.VITE_API_URL}/api/places/${placeId}`,
          "PATCH",
          JSON.stringify({
            title: formState.title.value,
            description: formState.description.value,
          }),
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        );

        if (!res) {
          throw new Error();
        }

        navigate(`/${userState.userId}/places`);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    editPlace();
  };

  const handleCloseModal = () => {
    clearError();
  };

  return (
    <>
      <ErrorModal error={error} handleCloseModal={handleCloseModal} />

      <div className="flex min-h-screen items-center justify-center bg-gray-200 pt-[75px]">
        {isLoading ? (
          <div>
            <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
          </div>
        ) : (
          <div className="m-4 h-full w-full max-w-[800px] rounded-lg bg-white p-8 shadow-sm">
            <form
              onSubmit={handleEditPlace}
              action=""
              className="flex flex-col gap-6"
            >
              <h1 className="mb-4 text-center text-2xl font-semibold">
                Edit Place
              </h1>

              <Input
                type="text"
                id="title"
                label="Title"
                form={updatePlaceForm}
                placeholder="Enter Title"
              />

              <Input
                type="textarea"
                id="description"
                label="Description"
                placeholder="Write a description..."
                form={updatePlaceForm}
              />

              <Button type="submit" className={"mt-4"}>Submit</Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePlace;
