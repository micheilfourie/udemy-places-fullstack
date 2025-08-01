import UsersList from "../components/UsersList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/authContext";
import { useContext } from "react";
import Button from "../../shared/components/formElements/Button";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [placeFilterChecked, setPlaceFilterChecked] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const { userState } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [places, setPlaces] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const queryParams = new URLSearchParams();

        queryParams.append("name", filters.name);

        if (placeFilterChecked && filters.places !== undefined) {
          queryParams.append("places", filters.places);
        }

        queryParams.append("page", currentPage);
        queryParams.append("limit", 5);

        const url = `${import.meta.env.VITE_API_URL}/api/users?${queryParams.toString()}`;

        const userData = await sendRequest(url);

        setUserList(userData.users);

        if (userData.totalPages === 0) {
          setTotalPages(1);
        } else {
          setTotalPages(userData.totalPages);
        }

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchUsers();
  }, [sendRequest, filters, currentPage, userState]);

  const handleCheckToggle = () => {
    setPlaceFilterChecked(!placeFilterChecked);
    setPlaces(0);

    if (placeFilterChecked) {
      handlePlacesChange({ target: { value: 0 } });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePlacesChange = (e) => {
    setPlaces(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    if (placeFilterChecked) {
      setFilters({ name, places });
    } else {
      setFilters({ name });
    }

    setCurrentPage(1);
  };

  const generatePagination = () => {
    let paginationArr = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationArr.push(
        <button
          key={`page-${i}`}
          onClick={() => setCurrentPage(i)}
          className={`cursor-pointer rounded-lg px-4 py-2 ${i === currentPage ? "bg-neutral-600 text-white" : "bg-neutral-200"}`}
        >
          {i}
        </button>,
      );
    }

    return paginationArr;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[75px]">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-[350px_auto] gap-4 p-4 max-md:grid-cols-1 xl:px-0">
        <div>
          <div className="sticky top-[calc(75px+1rem)] flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
            <h1 className="mb-1 text-xl font-semibold">Filter Options</h1>
            <form
              onSubmit={handleFilterSubmit}
              action=""
              className="flex flex-col gap-8"
            >
              <input
                onChange={handleNameChange}
                type="text"
                placeholder="Search"
                value={name}
                className="`rounded-lg w-full rounded-lg border border-neutral-200 bg-gray-100 px-4 py-2 outline-0"
              />

              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  onChange={handleCheckToggle}
                  value={placeFilterChecked}
                  className="h-6 w-6"
                />
                <div className="mt-1 flex w-full flex-col">
                  <input
                    onChange={handlePlacesChange}
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    disabled={!placeFilterChecked}
                    value={places}
                    className="w-full"
                  />
                  <span className="mt-2">Places: {places}</span>
                </div>
              </div>

              <Button type="submit" action={() => {}}>
                Filter
              </Button>
            </form>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-4 flex w-full justify-center gap-4">
            <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
          </div>
        ) : (
          <div className="min-h-full">
            <UsersList users={userList} />
            <div
              className={`mt-4 flex justify-center gap-2 rounded-lg ${userList.length === 0 ? "hidden" : ""} bg-white p-4 shadow-sm`}
            >
              {generatePagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
