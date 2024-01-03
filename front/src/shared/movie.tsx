import { MovieModel } from "models/entities/Movie";
import { FaInfo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import React from 'react'
import Link from "components/Link";
import Button from "components/Button";
interface MovieProps {
  movie: MovieModel;
  onGrid?: boolean
}

const Movie = ({movie,onGrid}: MovieProps) => {
  const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;
  const {addMovie, checkIfMovieExistsInFavorites} = React.useContext(FavoritesMoviesContext)
  const [movieExists, setMovieExists] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const handleModalOpen = () => {
    const mExists = checkIfMovieExistsInFavorites(movie.id);
    setMovieExists(mExists);
    setIsModalOpen(!isModalOpen);
  }
  return (
       <div className={`${onGrid ? "w-full" : "w-[230px]"} flex flex-col gap-y-2 h-auto cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-300 relative`}>
        <div className="h-[350px] w-full relative">
          <img
            src={`${tmdbImagePath}/${movie.poster_path}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="bg-black absolute inset-0 h-full w-full z-10 opacity-25 rounded-lg" />
        </div>
        <button
          onClick={
            handleModalOpen
          }
          className="absolute right-2 top-2 z-10 rounded-full p-1 border-2 border-primaryNeon hover:bg-primaryNeon transition duration-300"
        >
          <FaInfo />
        </button>
        {isModalOpen && (
           <div id="modalinfo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-primaryBg shadow-xl shadow-black/40 overflow-auto rounded-lg flex flex-col justify-between pb-2 sm:pb-4 w-full md:px-0 h-auto border border-primaryBgBorder">
            <div className="h-full w-full">
              <button
                className="absolute top-2 right-2 p-1 border-2 border-primaryNeon rounded-full text-body hover:bg-primaryNeon transition duration-300"
                onClick={handleModalOpen}
              >
                <IoClose />
              </button>
              <img
                src={`${tmdbImagePath}/${movie.backdrop_path}`}
                className="w-full h-[220px] object-cover"
              />
              <div className="flex flex-col gap-y-1 p-2 font-body text-xs">
                <h1 className="font-title font-black text-extraSmallTitle flex flex-wrap items-center gap-1">
                  <span className="line-clamp-1">{movie?.original_title}</span>
                  <span className="text-subBody">
                    {" "}
                    ( {new Date(movie?.release_date).toLocaleDateString()} )
                  </span>
                </h1>
                <p className="flex flex-row items-center gap-x-2 text-[10px] text-bodyColor">
                  <AiFillStar className="text-yellow-600" />
                  <span>
                    {movie?.vote_average.toFixed(1)} / 10 - {movie?.vote_count} Avaliações
                  </span>
                </p>
                <p className="line-clamp-1">{movie?.overview}</p>
                <p className="text-bodyColor italic text-xs">Idioma original: {movie?.original_language.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 w-full px-2 text-xs">
                <Link bgNotPrimary fullWidth to={`/movie/${movie.id}`} onlyBorder={false}>Ver mais</Link>
                {!movieExists ? (
                  <Button fullWidth small={false} green={false} onlyBorder onClick={() => addMovie(movie)} type="button">Favoritar</Button>
                ) : (
                  <Button fullWidth small={false} green={false} onlyBorder disabled type="button">Favoritado</Button>
                )}
            </div>
          </div>
        )}
      </div>
  );
};
export default Movie;
