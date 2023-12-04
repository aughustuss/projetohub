import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/fixeds/Header";
import Footer from "components/fixeds/Footer";
import Sidebar from "components/fixeds/Sidebar";

import React from "react";
import GenreMovies from "views/GenreMovies";
const HomePage = React.lazy(() => import("views/Home"));
const MoviePage = React.lazy(() => import("views/Movie"));
const LoadingPage = React.lazy(() => import("views/Loading"));
const ChatPage = React.lazy(() => import("views/Chat"));

function App() {
  const [isOnTop, setIsOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOnTop(true);
      } else if (window.scrollY > 25) {
        setIsOnTop(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  return (
    <>
      <React.Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <div className="font-body">
            <Header isOnTop={isOnTop} />
            <Sidebar/>
            <div className="text-newWhite">
              <Routes>
                <Route index path="/" Component={HomePage} />
                <Route path="/movie/:movieId" Component={MoviePage} />
                <Route path="/genreMovies/:movieGenre" Component={GenreMovies} />
                <Route path="/chat" Component={ChatPage}/>
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
}

export default App;
