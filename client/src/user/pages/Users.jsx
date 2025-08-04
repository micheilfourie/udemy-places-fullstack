import UsersList from "../components/UsersList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/authContext";
import { useContext } from "react";
import Button from "../../shared/components/formElements/Button";
import FilterToggleButton from "../../shared/components/formElements/FilterToggleButton";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [placeFilterChecked, setPlaceFilterChecked] = useState(false);
  const [name, setName] = useState("");
  const [places, setPlaces] = useState(0);
  const [limit, setLimit] = useState(5);
  const [userResults, setUserResults] = useState(0);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const { isLoading, sendRequest } = useHttpClient();
  const { userState } = useContext(AuthContext);

  const filterMessage = `${userResults} ${userResults === 1 ? "user" : "users"} found`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const queryParams = new URLSearchParams();

        queryParams.append("name", filters.name);

        if (placeFilterChecked && filters.places !== undefined) {
          queryParams.append("places", filters.places);
        }

        queryParams.append("page", currentPage);
        queryParams.append("limit", limit);

        const url = `${import.meta.env.VITE_API_URL}/api/users?${queryParams.toString()}`;

        const userData = await sendRequest(url);

        setUserList(userData.users);

        if (userData.totalPages === 0) {
          setTotalPages(1);
          setUserResults(0);
        } else {
          setTotalPages(userData.totalPages);
          setUserResults(userData.results);
        }

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return;
      }
    };

    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, filters, currentPage, userState, limit]);

  const handleCheckToggle = () => {
    setPlaceFilterChecked(!placeFilterChecked);
    setPlaces(0);
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
          className={`w-12 cursor-pointer rounded-lg px-4 py-2 ${i === currentPage ? "bg-neutral-600 text-white" : "border border-neutral-200 bg-neutral-100"}`}
        >
          {i}
        </button>,
      );
    }

    return paginationArr;
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-[75px]">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-[350px_auto] gap-4 p-4 max-md:grid-cols-1 xl:px-0">
        <div>
          <div className="sticky top-[calc(75px+1rem)] flex flex-col gap-4 rounded-lg bg-white px-8 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="my-2 text-xl font-semibold">Filter Options</h1>
              <FilterToggleButton
                action={() => setFilterMenuOpen(!filterMenuOpen)}
                bool={filterMenuOpen}
              />
            </div>

            <form
              onSubmit={handleFilterSubmit}
              action=""
              className={`flex flex-col gap-8 ${!filterMenuOpen && "max-md:hidden"}`}
            >
              <input
                onChange={handleNameChange}
                type="text"
                placeholder="Search Name"
                value={name}
                className="`rounded-lg w-full rounded-lg border border-neutral-200 bg-gray-100 px-4 py-2 outline-0"
              />

              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  onChange={handleCheckToggle}
                  value={placeFilterChecked}
                  className="h-6 w-6 cursor-pointer outline-0"
                />

                <div className="flex w-full flex-col">
                  <span
                    className={`mb-2 ${!placeFilterChecked && "text-neutral-400"}`}
                  >
                    Places: {places}
                  </span>
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
                </div>
              </div>

              <Button type="submit">Filter</Button>

              <div className="pb-4">
                <label htmlFor="">Users per page: </label>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setLimit(5)}
                    className={`flex w-12 cursor-pointer items-center justify-center rounded-lg px-4 py-2 ${limit === 5 ? "bg-neutral-600 text-white" : "border border-neutral-200 bg-neutral-100"}`}
                  >
                    5
                  </button>
                  <button
                    onClick={() => setLimit(10)}
                    className={`flex w-12 cursor-pointer items-center justify-center rounded-lg px-4 py-2 ${limit === 10 ? "bg-neutral-600 text-white" : "border border-neutral-200 bg-neutral-100"}`}
                  >
                    10
                  </button>
                  <button
                    onClick={() => setLimit(15)}
                    className={`flex w-12 cursor-pointer items-center justify-center rounded-lg px-4 py-2 ${limit === 15 ? "bg-neutral-600 text-white" : "border border-neutral-200 bg-neutral-100"}`}
                  >
                    15
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`flex flex-col gap-2 rounded-lg bg-white py-4 shadow-sm`}
        >
          {isLoading ? (
            <>
              <div className="my-2 px-8">
                <h1 className="text-xl font-semibold">All Users</h1>
              </div>
              <div className="mt-4 flex w-full justify-center gap-4">
                <LoadingSpinner size={40} color={"oklch(26.9% 0 0)"} />
              </div>
            </>
          ) : (
            <>
              <div className="my-2 flex items-center justify-between px-8">
                <h1 className="text-xl font-semibold">All Users</h1>
                <p className="text-neutral-500">{filterMessage}</p>
              </div>
              <UsersList users={userList} />
              <div
                className={`mt-2 flex items-center justify-center gap-2 ${userList.length === 0 ? "hidden" : ""}`}
              >
                {generatePagination()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
