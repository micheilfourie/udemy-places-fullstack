import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Input from "../../shared/components/formElements/Input";
import Button from "../../shared/components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import { AuthContext } from "../../shared/context/authContext.js";
import ErrorModal from "../../shared/components/ui/ErrorModal";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [title, setTitle] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [description, setDescription] = useState({
    value: "",
    isValid: false,
    isTouched: false,
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
        );

        if (!res) {
          throw new Error();
        }

        setTitle({
          value: res.place.title,
          isValid: true,
          isTouched: false,
        });
        setDescription({
          value: res.place.description,
          isValid: true,
          isTouched: false,
        });

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchPlace();
  }, [sendRequest, placeId]);

  const handleEditPlace = (e) => {
    e.preventDefault();

    const editPlace = async () => {

      if (!title.isValid || !description.isValid) {
        return;
      }

      try {
        const res = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`,
          "PATCH",
          JSON.stringify({
            title: title.value,
            description: description.value,
          }),
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

    editPlace();
  };

  const handleCloseModal = () => {
    clearError();
  };

  return (
    <>
    <ErrorModal error={error} handleCloseModal={handleCloseModal} />

    <div className="flex min-h-screen justify-center bg-gray-100 pt-[75px]">
      {isLoading ? (
        <div className="mt-4">
          <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
        </div>
      ) : (
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
      )}
    </div>
    </>
    
  );
};

export default UpdatePlace;
