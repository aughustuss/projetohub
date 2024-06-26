import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideBarContextProvider } from "contexts/SidebarContext.tsx";
import { LastTitleContextProvider } from "contexts/LastSearchedTitleContext.tsx";
import { WatchedListContextProvider } from "contexts/WatchedListContext.tsx";
import { LoginContextProvider } from "contexts/LoginContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<LoginContextProvider>
			<LastTitleContextProvider>
				<WatchedListContextProvider>
					<SideBarContextProvider>
						<App />
					</SideBarContextProvider>
				</WatchedListContextProvider>
			</LastTitleContextProvider>
		</LoginContextProvider>
	</React.StrictMode>
);
