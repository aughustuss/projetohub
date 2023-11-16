import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/sidebarContext.tsx";
import { PopularMoviesContextProvider } from "contexts/popularMoviesContext.tsx";
import { UpcomingMoviesContextProvider } from "contexts/upcomingMoviesContext.tsx";
import { MovieGenreContextProvider } from "contexts/moviesGenresContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopularMoviesContextProvider>
      <UpcomingMoviesContextProvider>
        <MovieGenreContextProvider>
          <SideBarContextProvider>
            <App />
          </SideBarContextProvider>
        </MovieGenreContextProvider>
      </UpcomingMoviesContextProvider>
    </PopularMoviesContextProvider>
  </React.StrictMode>
);
