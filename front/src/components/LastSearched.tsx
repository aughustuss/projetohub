import React from "react";
import Title from "./Title";
import Slide from "shared/Slide";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { MovieModel } from "models/entities/Movie";
import Movie from "shared/Movie";
import { SwiperSlide } from "swiper/react";
import Loading from "views/Loading";
interface LastSearchedProps {
  similarMovies: MovieModel[];
  isLoading: boolean;
  lastSearchedTitle?: string;
  categorySimilar: boolean;
}
const Similar = ({similarMovies, isLoading, lastSearchedTitle, categorySimilar}:LastSearchedProps) => {
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  
  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieinfo = () => {
    setSelectedMovie(null);
  };
  return (
    <>
      <section className="flex flex-col gap-y-4 h-[600px] md:h-[500px]">
        <Title
          bold
          center={false}
          green={false}
          message={!categorySimilar ? `Filmes que são relavantes à sua ultima busca sobre ${
            lastSearchedTitle && lastSearchedTitle.charAt(0).toUpperCase() +
            lastSearchedTitle.slice(1)
          } ` : 'Você também pode querer assistir'}
        />
        <div className={`${!categorySimilar && 'px-4 md:px-[30px] rounded-lg bg-primaryBgBorder h-full w-full'}`}>
          {!isLoading ? (
            <>
              {similarMovies.length > 0 ? (
                <Slide
                  scrollBar
                  movies
                  modules={[Navigation, Pagination, Scrollbar]}
                  hasDarkBg={!categorySimilar}
                >
                  {similarMovies &&
                    similarMovies.slice(0, 10).map((movie: MovieModel) => (
                      <SwiperSlide className="py-10" key={movie.id}>
                        <Movie
                          onGrid
                          movie={movie}
                          openMovieInfo={() => openMovieInfo(movie.id)}
                          closeMovieInfo={closeMovieinfo}
                          selectedMovieId={selectedMovie}
                        />
                      </SwiperSlide>
                    ))}
                </Slide>
              ) : (
                <div className="flex flex-col justify-center items-center w-full h-full text-xs italic text-bodyColor">
                  Você ainda não pesquisou por nenhum filme...
                </div>
              )}
            </>
          ) : (
            <Loading big={false} />
          )}
        </div>
      </section>
    </>
  );
};

export default Similar;
