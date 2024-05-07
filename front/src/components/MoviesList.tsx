import { MovieModel } from "models/entities/Movie";
import Movie from "shared/Movie";
import Slide from "shared/Slide";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import { removeFromFavoriteListService } from "services/Services";
import LoginContext from "contexts/LoginContext";
import React from "react";
interface MovieListProps {
  movies: MovieModel[];
  grid: boolean;
  extraItems: boolean;
  hasMovies: boolean;
  hasDarkBg?: boolean;
  stretch?: boolean;
}
const MoviesList = ({ movies, grid, extraItems, hasDarkBg, hasMovies, stretch }: MovieListProps) => {
  const { token } = React.useContext(LoginContext);
  const removeMovieFromFavoriteList = async (id : string) => {
    await removeFromFavoriteListService(id, token)
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      {!grid ? (
        <Slide stretch={stretch} movies={hasMovies} hasDarkBg={hasDarkBg} scrollBar modules={[Pagination, Scrollbar, Navigation]}>
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
                      onClick={() => removeMovieFromFavoriteList(movie.id.toString())}
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
                    onClick={() => removeMovieFromFavoriteList(movie.id.toString())}
                    onlyBorder={false}
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
