import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "components/fixeds/Header";
import Footer from "components/fixeds/Footer";
import Sidebar from "components/fixeds/Sidebar";

import React from "react";
import GenreMovies from "views/GenreMovies";
import ProtectedRoute from "components/ProtectedRoute";
import Loading from "views/Loading";
import LoginContext from "contexts/LoginContext";
const LoginPage = React.lazy(() => import("views/Login"));
const HomePage = React.lazy(() => import("views/Home"));
const MoviePage = React.lazy(() => import("views/Movie"));
const ChatPage = React.lazy(() => import("views/Chat"));
const SearchedMoviePage = React.lazy(() => import("views/SearchedMovies"));
const ProfilePage = React.lazy(() => import("views/Profile"));

function App() {
  const { isLoggedIn, loading } = React.useContext(LoginContext);
  const [isOnTop, setIsOnTop] = React.useState<boolean>(true);
  const [showNavAndFooter, setShowNavAndFooter] = React.useState<boolean>(false);
  const location = window.location;

  React.useEffect(() => {
    if (location.pathname === "/login") setShowNavAndFooter(false);
    else setShowNavAndFooter(true);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOnTop(true);
      } else if (window.scrollY > 25) {
        setIsOnTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <Loading big />;
  }
  return (
    <>
      <React.Suspense fallback={<Loading big />}>
        <BrowserRouter>
          <div className="font-body">
            <Header showNav={showNavAndFooter} isOnTop={isOnTop} />
            <Sidebar />
            <div className="text-newWhite">
              <Routes>
                <Route index path="/" Component={HomePage} />
                <Route path="/movie/:movieId" Component={MoviePage} />
                <Route path="/genre/:movieGenre" Component={GenreMovies} />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute isAccessible={isLoggedIn} redirectPath="/login">
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/searchedMovies" Component={SearchedMoviePage} />
                <Route path="/login" Component={LoginPage} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAccessible={isLoggedIn} redirectPath="/login">
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer showFooter={showNavAndFooter} />
          </div>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
}

export default App;
