// FavoritesSlider.tsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import Card from '../components/Card';
import { Movie } from '../view/Home';

const FavoritesSlider: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

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
      <h1 className="text-3xl font-bold mt-[30px] mb-[40px]">Filmes Favoritos</h1>
      <Slider {...sliderSettings}>
        {favorites.map((favorite) => (
          <div key={favorite.id}>
            <Card movie={favorite} onInfoClick={addFavorite}/>
            console.log(favorite)
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesSlider;
