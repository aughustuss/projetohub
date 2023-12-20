import { Routes, Route, useLocation } from "react-router-dom";

import Header from "components/fixeds/Header";
import Footer from "components/fixeds/Footer";
import Sidebar from "components/fixeds/Sidebar";

import React from "react";
import GenreMovies from "views/GenreMovies";
import PrivateRoute from "components/PrivateRoute";
const LoginPage = React.lazy(() => import("views/Login"));
const HomePage = React.lazy(() => import("views/Home"));
const MoviePage = React.lazy(() => import("views/Movie"));
const ChatPage = React.lazy(() => import("views/Chat"));
const SearchedMoviePage = React.lazy(() => import("views/SearchedMovies"));
const ProfilePage = React.lazy(() => import("views/Profile"));

function App() {
  const [isOnTop, setIsOnTop] = React.useState<boolean>(true);
  const [showNavAndFooter, setShowNavAndFooter] =
    React.useState<boolean>(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/login") setShowNavAndFooter(false);
    else setShowNavAndFooter(true);
  }, [location.pathname])

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
  return (
    <>
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
                    <PrivateRoute redirect="/login">
                      <ChatPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/searchedMovies" Component={SearchedMoviePage} />
                <Route path="/login" Component={LoginPage} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute redirect="/login">
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
            <Footer showFooter={showNavAndFooter} />
          </div>
    </>
  );
}

export default App;
