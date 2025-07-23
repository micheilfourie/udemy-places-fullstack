import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Button from "../formElements/Button";
import Avatar from "../ui/Avatar";
import { useNavigate } from "react-router-dom";

const ProfileSegment = ({ handleCloseDrawer }) => {
  const { userName, userImage, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    handleCloseDrawer();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="my-4">
        <Avatar width={100} image={userImage} name={userName} />
        <h2 className="mt-4 text-center text-2xl">{userName}</h2>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button action={() => {}}>Edit Profile</Button>
        <Button action={handleLogout} buttonStyle="danger">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileSegment;
