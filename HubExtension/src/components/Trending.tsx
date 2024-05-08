import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getTrendingMovies } from '../services/getMoviesService';
import Card from '../components/Card';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Movie } from '../models/Movie';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

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
          infinite: true
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        },
      },
    ],
    arrows: false,
  };

  if (movies === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-[1024px] mx-auto relative">
      <h1 className="text-3xl font-bold mt-[30px] mb-[40px]">Filmes Populares</h1>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie}  />
        ))}
      </Slider>
    </div>
  );
};

export default Home;
