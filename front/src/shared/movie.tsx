import { MovieModel } from "models/entities/movie";
import { FaInfo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
interface MovieProps {
  movie: MovieModel;
  openMovieInfo: (movieId: number) => void;
  selectedMovieId: number | null;
  closeMovieInfo: () => void;
}

const Movie = ({
  movie,
  openMovieInfo,
  selectedMovieId,
  closeMovieInfo,
}: MovieProps) => {
  const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;

  const openModalWithInfo = () => {
    openMovieInfo(movie.id);
  };

  const closeModalWithInfo = () => {
    closeMovieInfo();
  };
  return (
    <>
       <div className="w-full flex flex-col gap-y-2 h-auto cursor-pointer hover:shadow-lg hover:shadow-black/40 transition duration-300 relative">
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
           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-primaryBg  overflow-auto rounded-lg flex flex-col justify-between pb-2 w-5/6  md:w-[400px]">
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
                <h1 className="font-title font-black text-extraSmallTitle flex flex-wrap">
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
                <a href={`/movie/${movie.id}`} className="w-full bg-primaryBgBorder px-4 py-2 rounded-lg font-black text-center hover:bg-primaryBgBorder/70 transition duration-300 flex flex-col items-center justify-center">Ver mais</a>
                <button className="w-full border-primaryBgBorder border px-4 py-2 rounded-lg font-black hover:bg-primaryBgBorder transition duration-300">Adicionar à favoritos</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Movie;
