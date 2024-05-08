import Trending from '../components/Trending';
import CampoPesquisa from '../components/CampoPesquisa';
import FavoritesSlider from '../components/Favoritos';

const Home: React.FC = () => {
  return (
    <>
      <CampoPesquisa/>
      <Trending/>
      <FavoritesSlider/>
    </>
  );
}

export default Home;