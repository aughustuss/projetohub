import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { FavoritesMoviesContextProvider } from "contexts/FavoritesMoviesContext.tsx";
import { LastTitleContextProvider } from "contexts/LastSearchedTitle.tsx";
import { WatchedListContextProvider } from "contexts/WatchedListContext.tsx";
import { LoginContextProvider } from "contexts/LoginContext.tsx";
import { BrowserRouter } from "react-router-dom";
const LoadingPage = React.lazy(() => import("views/Loading.tsx"))

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingPage big />}>
      <BrowserRouter>
        <LoginContextProvider>
          <LastTitleContextProvider>
            <WatchedListContextProvider>
              <FavoritesMoviesContextProvider>
                <SideBarContextProvider>
                  <App />
                </SideBarContextProvider>
              </FavoritesMoviesContextProvider>
            </WatchedListContextProvider>
          </LastTitleContextProvider>
        </LoginContextProvider>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>
);
