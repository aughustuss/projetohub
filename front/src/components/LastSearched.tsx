import React from "react";
import Title from "./Title";
import LastTitleContext from "contexts/LastSearchedTitle";
import Slide from "shared/Slide";
import { Navigation, Pagination } from "swiper/modules";
import { MovieModel } from "models/entities/Movie";
import { getMoviesBasedOnItsTitleService } from "services/GetMoviesService";
import Movie from "shared/Movie";
import { SwiperSlide } from "swiper/react";
import Loading from "views/Loading";

const LastSearched = () => {
  const { lastSearchedTitle } = React.useContext(LastTitleContext);
  const [similarMovies, setSimiliarMovies] = React.useState<MovieModel[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
      setIsLoading(true);
      const searchSimilarMovies = async () => {
      Promise.resolve(
        getMoviesBasedOnItsTitleService(lastSearchedTitle)
          .then((response) => {
            setSimiliarMovies(response.data.results);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
      );
    };
    const typingTimeout = setTimeout(() => {
      searchSimilarMovies();
    }, 5000);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [lastSearchedTitle]);

  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieinfo = () => {
    setSelectedMovie(null);
  };
  console.log(similarMovies);
  return (
    <>
      <section className="flex flex-col gap-y-4 h-[500px]">
        <Title
          center={false}
          green={false}
          message="Filmes que são relevantes à sua ultima busca"
        />
        <div className="px-[100px] rounded-lg bg-primaryBgBorder">
          {!isLoading ? (
            <Slide modules={[Navigation, Pagination]}>
              {similarMovies &&
                similarMovies.slice(0, 6).map((movie: MovieModel) => (
                  <SwiperSlide className="py-10" key={movie.id}>
                    <Movie
                      onGrid={false}
                      movie={movie}
                      openMovieInfo={openMovieInfo}
                      closeMovieInfo={closeMovieinfo}
                      selectedMovieId={selectedMovie}
                    />
                  </SwiperSlide>
                ))}
            </Slide>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </>
  );
};

export default LastSearched;
