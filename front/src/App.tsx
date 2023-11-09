import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Home from "pages/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="font-body">
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            {/* <Route path="/about" component={About} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
