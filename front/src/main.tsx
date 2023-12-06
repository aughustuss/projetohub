import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { FavoritesMoviesContextProvider } from "contexts/FavoritesMoviesContext.tsx";
import { LastTitleContextProvider } from "contexts/LastSearchedTitle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LastTitleContextProvider>
      <FavoritesMoviesContextProvider>
        <SideBarContextProvider>
          <App />
        </SideBarContextProvider>
      </FavoritesMoviesContextProvider>
    </LastTitleContextProvider>
  </React.StrictMode>
);
