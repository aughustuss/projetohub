import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/sidebarContext.tsx";
import { FavoritesMoviesContextProvider } from "contexts/favoritesMoviesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavoritesMoviesContextProvider>
      <SideBarContextProvider>
        <App />
      </SideBarContextProvider>
    </FavoritesMoviesContextProvider>
  </React.StrictMode>
);
