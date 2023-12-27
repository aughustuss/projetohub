import React, { ChangeEvent, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getTrendingMovies, searchMovies } from '../services/getMoviesService';
import Card from '../components/Card';
import Input from '../components/input';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Movie } from '../models/Movie';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchMovies = async () => {
    try {
      const response = await (searchQuery ? searchMovies(searchQuery) : getTrendingMovies());
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchMovies();
    }, 100);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

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

  if (movies === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-[1024px] mx-auto relative">
      <h1 className="text-3xl font-bold mt-[30px] mb-[40px]">
        Resultados da pesquisa</h1>
        <div className='mb-[50px]'>
            <Input
            type="text"
            placeholder="Pesquisar filmes"
            value={searchQuery}
            onChange={handleInputChange}
          />      
        </div>      
      {searchQuery ? (
        <Slider {...sliderSettings}>
          {movies?.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

export default Home;
