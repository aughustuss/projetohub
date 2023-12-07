import { MovieModel } from "models/entities/Movie";
import Title from "./Title";
import React, { useEffect } from "react";
import { getTrendingMovies } from "services/GetMoviesService";
import Loading from "views/Loading";
import Slide from "shared/Slide";
import { SwiperSlide } from "swiper/react";
import Movie from "shared/Movie";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = React.useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  useEffect(() => {
    Promise.resolve(
      getTrendingMovies()
        .then((res) => {
          setTrendingMovies(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    );
  }, []);
  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  }

  const closeMovieInfo = () => {
    setSelectedMovie(null);
  }
  return (
    <>
      <main>
        <Title
          bold
          center={false}
          green={false}
          message="Filmes que estão populares no momento"
        />
        {!isLoading && trendingMovies ? (
        <>
        <Slide scrollBar movies modules={[Pagination, Navigation, Scrollbar]}>
          {trendingMovies.map((movie: MovieModel) => (
            <SwiperSlide className="py-10" key={movie.id} >
              <Movie selectedMovieId={selectedMovie} openMovieInfo={() => openMovieInfo(movie.id)} closeMovieInfo={closeMovieInfo} movie={movie} />
            </SwiperSlide>
            ))}
            </Slide>
        </>
        ) : <Loading big={false} />}
      </main>
    </>
  );
};

export default Trending;
