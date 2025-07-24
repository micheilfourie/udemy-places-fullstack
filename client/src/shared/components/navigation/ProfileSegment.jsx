import { AuthContext } from "../../context/authContext";
import { useContext, useRef } from "react";
import Button from "../formElements/Button";
import Avatar from "../ui/Avatar";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";

const ProfileSegment = ({ handleCloseDrawer }) => {
  const {
    userName,
    userImage,
    logout,
    setUserImage,
    userId,
    userPlacesLength,
  } = useContext(AuthContext);

  const inputRef = useRef();
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    handleCloseDrawer();
    navigate("/");
  };

  const handlePickImage = () => {
    inputRef.current.click();
  };

  const pickedFileHandler = (event) => {
    if (!event.target.files || event.target.files.length !== 1) {
      return;
    }

    const patchImage = async () => {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);

      try {
        const res = await sendRequest(
          `http://localhost:5000/api/users/user/${userId}/image`,
          "PATCH",
          formData,
        );

        if (!res) {
          throw new Error();
        }

        setUserImage(res.image);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    patchImage();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="my-4">
        <input
          type="file"
          id={"image"}
          accept=".jpg, .jpeg, .png"
          className="hidden"
          ref={inputRef}
          onChange={pickedFileHandler}
        />

        <button onClick={handlePickImage} className="cursor-pointer">
          <Avatar width={100} image={userImage} name={userName} />
        </button>

        <h2 className="mt-4 text-center text-2xl">{userName}</h2>
        <p className="text-center">
          {userPlacesLength} {userPlacesLength === 1 ? "Place" : "Places"}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button action={handleLogout} buttonStyle="danger">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileSegment;
