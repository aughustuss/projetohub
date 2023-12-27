// FavoritesSlider.tsx
import React, { useContext } from "react";
import Slider from "react-slick";
import Card from "../components/Card";
import ContextoDosFavoritos from "../contexts/Favoritos";

const FavoritesSlider: React.FC = () => {
  const { favoritos } = useContext(ContextoDosFavoritos);
  console.log(favoritos);
  // const [favorites, setFavorites] = useState<Movie[]>([]);
  // const addFavorite = (movie: Movie) => {
  //   console.log(movie)
  //   setFavorites((prevFavorites) => [...prevFavorites, movie]);
  // };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
    arrows: false,
  };

  return (
    <div className="container w-[1024px] mx-auto relative">
      <h1 className="text-3xl font-bold mt-[30px] mb-[40px]">
        Filmes Favoritos
      </h1>
      <Slider {...sliderSettings}>
        {favoritos.map((favorite) => (
          <Card key={favorite.id} movie={favorite} />
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesSlider;
