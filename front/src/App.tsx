import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/fixeds/Header";
import Footer from "components/fixeds/Footer";

import React from "react";
import Sidebar from "components/fixeds/Sidebar";
const HomePage = React.lazy(() => import("views/Home"));
const LoadingPage = React.lazy(() => import("views/Loading"));
function App() {
  const [isOnTop, setIsOnTop] = React.useState<boolean>(false);
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
            <div className="pt-[70px] text-newWhite w-full px-10 md:w-[90%] px-0 mx-auto">
              <Routes>
                <Route path="/home" Component={HomePage} />
                {/* <Route path="/about" component={About} /> */}
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
