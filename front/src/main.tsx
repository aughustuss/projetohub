import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { PopularMoviesContextProvider } from "contexts/PopularMoviesContext.tsx";
import { UpcomingMoviesContextProvider } from "contexts/UpcomingMoviesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopularMoviesContextProvider>
      <UpcomingMoviesContextProvider>
        <SideBarContextProvider>
          <App />
        </SideBarContextProvider>
      </UpcomingMoviesContextProvider>
    </PopularMoviesContextProvider>
  </React.StrictMode>
);
