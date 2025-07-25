import { Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainHeader from "./shared/components/navigation/MainHeader";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { useContext } from "react";
import { AuthContext } from "./shared/context/authContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />

        {isLoggedIn ? (
          <>
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
          </>
        ) : (
          <Route path="/auth" element={<Auth />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
