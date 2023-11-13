import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { PopularMoviesContextProvider } from "contexts/PopularMoviesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopularMoviesContextProvider>
      <SideBarContextProvider>
        <App />
      </SideBarContextProvider>
    </PopularMoviesContextProvider>
  </React.StrictMode>
);
