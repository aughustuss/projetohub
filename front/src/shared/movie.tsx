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
  openMovieInfo: (movieId: number) => void;
  selectedMovieId: number | null;
  closeMovieInfo: () => void;
  onGrid?: boolean
}

const Movie = ({
  movie,
  openMovieInfo,
  selectedMovieId,
  closeMovieInfo,
  onGrid
}: MovieProps) => {
  const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;
  const {addMovie} = React.useContext(FavoritesMoviesContext)
  const openModalWithInfo = () => {
    openMovieInfo(movie.id);
  };
  const closeModalWithInfo = () => {
    closeMovieInfo();
  };
  return (
    <>
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
            selectedMovieId === movie.id
              ? closeModalWithInfo
              : openModalWithInfo
          }
          className="absolute right-2 top-2 z-10 rounded-full p-1 border-2 border-primaryNeon hover:bg-primaryNeon transition duration-300"
        >
          <FaInfo />
        </button>
        {selectedMovieId === movie.id && (
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-primaryBg shadow-xl overflow-auto rounded-lg flex flex-col justify-between pb-2 w-full md:px-0   h-auto">
            <div className="h-full w-full">
              <button
                className="absolute top-2 right-2 p-1 border-2 border-primaryNeon rounded-full text-body hover:bg-primaryNeon transition duration-300"
                onClick={closeModalWithInfo}
              >
                <IoClose />
              </button>
              <img
                src={`${tmdbImagePath}/${movie.backdrop_path}`}
                className="w-full h-[220px] object-cover"
              />
              <div className="flex flex-col gap-y-2 p-2 font-body text-body">
                <h1 className="font-title font-black text-extraSmallTitle flex flex-wrap items-center gap-1">
                  {movie?.original_title}
                  <span className="text-subBody">
                    {" "}
                    ( {new Date(movie?.release_date).toLocaleDateString()} )
                  </span>
                </h1>
                <p className="flex flex-row items-center gap-x-2 text-subBody text-bodyColor">
                  <AiFillStar className="text-yellow-600" />
                  <span>
                    {movie?.vote_average} / 10 - {movie?.vote_count} Avaliações
                  </span>
                </p>
                <p className="line-clamp-1">{movie?.overview}</p>
                <p className="text-bodyColor italic">Idioma original: {movie?.original_language.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-2 w-full px-2 text-body">
                {/* <a href={`/movie/${movie.id}`} className="w-full bg-primaryBgBorder px-4 py-2 rounded-lg font-black text-center hover:bg-primaryBgBorder/70 transition duration-300 flex flex-col items-center justify-center">Ver mais</a> */}
                <Link to={`/movie/${movie.id}`} onlyBorder={false}>Ver mais</Link>
                {/* <button onClick={() => addMovie(movie)} className="w-full border-primaryBgBorder border 
                px-4 py-2 rounded-lg font-black hover:bg-primaryBgBorder transition duration-300">Adicionar à favoritos</button> */}
                <Button green={false} onlyBorder onClick={() => addMovie(movie)} type="button">Favoritar</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
