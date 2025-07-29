import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import MainHeader from "./shared/components/navigation/MainHeader";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./shared/context/authContext";

import LoadingSpinner from "./shared/components/ui/LoadingSpinner";

const Users = lazy(() => import("./user/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Auth = lazy(() => import("./user/pages/Auth"));

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  const loadingSpinnerWrapper = (
    <div className="z-50 flex min-h-screen items-center justify-center bg-gray-100">
      <LoadingSpinner color="oklch(26.9% 0 0)" size={40} />
    </div>
  );

  return (
    <>
      <MainHeader />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={loadingSpinnerWrapper} key={location.key}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="/:userId/places"
          element={
            <Suspense fallback={loadingSpinnerWrapper} key={location.key}>
              <UserPlaces />
            </Suspense>
          }
        />

        {isLoggedIn ? (
          <>
            <Route
              path="/places/new"
              element={
                <Suspense fallback={loadingSpinnerWrapper} key={location.key}>
                  <NewPlace />
                </Suspense>
              }
            />
            <Route
              path="/places/:placeId"
              element={
                <Suspense fallback={loadingSpinnerWrapper} key={location.key}>
                  <UpdatePlace />
                </Suspense>
              }
            />
          </>
        ) : (
          <Route
            path="/auth"
            element={
              <Suspense fallback={loadingSpinnerWrapper} key={location.key}>
                <Auth />
              </Suspense>
            }
          />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
