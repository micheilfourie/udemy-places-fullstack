import UsersList from "../components/UsersList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/authContext";
import { useContext } from "react";

const Users = () => {
  const [userList, setUserList] = useState([]);

  const { isLoading, sendRequest } = useHttpClient();

  const { userState } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await sendRequest("http://localhost:5000/api/users");
        setUserList(userData.users);

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchUsers();
  }, [sendRequest, userState]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-[75px]">
      {isLoading ? (
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
        </div>
      ) : (
        <UsersList users={userList} />
      )}
    </div>
  );
};

export default Users;
