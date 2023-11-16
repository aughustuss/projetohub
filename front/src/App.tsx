import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/fixeds/header";
import Footer from "components/fixeds/footer";
import Sidebar from "components/fixeds/sidebar";

import React from "react";
import GenreMovies from "views/genreMovies";
const HomePage = React.lazy(() => import("views/home"));
const MoviePage = React.lazy(() => import("views/movie"));
const LoadingPage = React.lazy(() => import("views/loading"));

function App() {
  const [isOnTop, setIsOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsOnTop(true);
      } else if (window.scrollY > 50) {
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
