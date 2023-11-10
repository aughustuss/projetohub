import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";

import React from "react";
const HomePage = React.lazy(() => import("views/Home"));
const LoadingPage = React.lazy(() => import("views/Loading"));
function App() {
  return (
    <>
      <React.Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <div className="font-body">
            <Header />
            <Routes>
              <Route path="/" Component={HomePage} />
              {/* <Route path="/about" component={About} /> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </React.Suspense>
    </>
  );
}

export default App;
