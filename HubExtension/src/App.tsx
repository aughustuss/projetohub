import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import LoginPage from './view/Login';
import Home from './view/Home';
import Filmes from './view/Filmes';
import DetalhesDoFilme from './components/DetalhesFilmes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/movie/:id" element={<DetalhesDoFilme/>}/>
      </Routes>
    </Router>
  );
}

export default App;
