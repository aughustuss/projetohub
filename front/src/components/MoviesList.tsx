import { MovieModel } from "models/entities/Movie";
import Movie from "shared/Movie";
import Slide from "shared/Slide";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import React from "react";
interface MovieListProps {
  movies: MovieModel[];
  grid: boolean;
  extraItems: boolean;
  hasMovies: boolean;
  hasDarkBg?: boolean;
}
const MoviesList = ({ movies, grid, extraItems, hasDarkBg, hasMovies }: MovieListProps) => {
  const { removeMovie, clearMovies } = React.useContext(FavoritesMoviesContext);
  return (
    <>
      {!grid ? (
        <Slide movies={hasMovies} hasDarkBg={hasDarkBg} scrollBar modules={[Pagination, Scrollbar, Navigation]}>
          {movies.map((movie) => (
            <SwiperSlide className="py-10" key={movie.id}>
              <div className="flex flex-col gap-y-2">
                <Movie movie={movie} onGrid={grid} />
                {extraItems && (
                  <>
                    <p className="text-xs italic text-bodyColor">
                      Adicionado em{" "}
                      {movie.addedDate &&
                        new Date(movie.addedDate).toLocaleDateString("pt-BR")}
                    </p>
                    <Button
                      onClick={() => {
                        if (movies.length < 2) {
                          clearMovies();
                        } else {
                          removeMovie(movie.id);
                        }
                      }}
                      green={false}
                      onlyBorder
                      small
                      fullWidth
                    >
                      Remover da lista <IoMdClose className="font-black" />
                    </Button>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Slide>
      ) : (
        <div 
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        gap-1 md:gap-3 w-full">
          {movies.map((movie) => (
            <div key={movie.id} className="flex flex-col gap-y-2">
              <Movie movie={movie} onGrid={grid} />
              {extraItems && (
                <>
                  <p className="text-xs italic text-bodyColor">
                    Adicionado em{" "}
                    {movie.addedDate &&
                      new Date(movie.addedDate).toLocaleDateString("pt-BR")}
                  </p>
                  <Button
                    onClick={() => {
                      if (movies.length < 2) {
                        clearMovies();
                      } else {
                        removeMovie(movie.id);
                      }
                    }}
                    green={false}
                    onlyBorder
                    small
                    fullWidth
                  >
                    Remover da lista <IoMdClose className="font-black" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MoviesList;
