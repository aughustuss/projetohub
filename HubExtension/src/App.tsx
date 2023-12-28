
import { Routes, Route, HashRouter  as Router } from 'react-router-dom';
import LoginPage from './view/Login';
import Home from './view/Home';
import Filmes from './view/Filmes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/filmes" element={<Filmes/>} />
      </Routes>
    </Router>
  );
}

export default App;
