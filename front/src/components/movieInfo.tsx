import React from "react";
import {
  MovieByIdModel,
  MovieByIdCompaniesModel,
  MovieByIdGenresModel,
} from "models/entities/MovieById";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { getMovieByIdService } from "services/GetMoviesService";
import { AiFillStar } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { AxiosResponse } from "axios";
import Loading from "views/Loading";
import { MovieModel } from "models/entities/Movie";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import Button from "./Button";
interface MovieInfoProps {
  movieId?: string;
}
const MovieInfo = ({ movieId }: MovieInfoProps) => {
  const [movieById, setMovieById] = React.useState<MovieByIdModel>();
  const {addMovie} = React.useContext(FavoritesMoviesContext);
  const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;
  const [isLoading, setIsLoading] = React.useState(false);
  const movieHours = movieById?.runtime && Math.floor(movieById?.runtime / 60);
  const movieMinutes = movieById?.runtime && movieById?.runtime % 60;
  const moviePercentageLiked = movieById?.vote_average && (movieById.vote_average / 10) * 100;
  const moviePercentageDisliked = moviePercentageLiked && 100 - moviePercentageLiked;
  let movieInfosToAddInFavoriteList: MovieModel;
  if(movieById){
    movieInfosToAddInFavoriteList = {
      adult: movieById?.adult,
      backdrop_path: movieById?.backdrop_path,
      genre_ids: movieById?.genres,
      id: movieById?.id,
      original_language: movieById?.original_language,
      original_title: movieById?.original_title,
      overview: movieById?.overview,
      popularity: movieById?.popularity,
      poster_path: movieById?.poster_path,
      release_date: movieById?.release_date,
      title: movieById?.title,
      video: movieById?.video,
      vote_average: movieById?.vote_average,
      vote_count: movieById?.vote_count
    }
  }

  const data = {
    labels: ["Gostaram", "Não gostaram"],
    datasets: [
      {
        data: [moviePercentageLiked, moviePercentageDisliked],
        backgroundColor: ["#00fa43", "#b5b5b5"],
        borderColor: ["#00fa43", "#b5b5b5"],
        minHeight: 1,
        minWidth: 1,
        borderWidth: 2,
      },
    ],
  };

  React.useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setIsLoading(true);
        if (movieId) {
          await getMovieByIdService(movieId)
            .then((movie: AxiosResponse<MovieByIdModel>) => {
              setMovieById(movie.data);
              setIsLoading(false);
            })
            .catch((err: Error) => {
              console.log(err);
            })
            .catch((err: Error) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieById();
  }, [movieId]);
  if (isLoading) return <Loading big />;

  return (
    <main className="w-full h-auto">
      {/* Banner */}
      <div className="h-[650px] w-full">
        <div className="h-full w-full relative">
          <img
            src={`${tmdbImagePath}${movieById?.backdrop_path}`}
            className="h-full w-full object-cover"
          />
          <div className="bg-black absolute inset-0 h-full w-full opacity-30" />
        </div>
      </div>

      {/* Sinopse do banner */}
      <div className="h-[600px] text-body ">
        <div className="h-auto min-h-[700px] bg-primaryBgBorder w-full px-4 md:w-[85%] md:px-0 mx-auto -mt-[30%] md:-mt-[10%] shadow-md rounded-lg absolute left-1/2 -translate-x-1/2">
          {/* Início da sinopse  */}
          <div className="p-4 md:p-8 flex flex-col gap-y-4">
            {/* Imagem e informações adicionais*/}
            <div className="flex flex-col md:flex-row items-start gap-4">
              <img
                src={`${tmdbImagePath}/${movieById?.poster_path}`}
                className="w-full md:w-[250px] h-[300px] md:h-[20%] rounded-lg shadow-md object-cover"
              />
              <div className="flex flex-col gap-4">
                {/* Titulo */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row items-baseline justify-between gap-2">
                    <div className="flex flex-row items-baseline gap-2 flex-wrap">
                      <p className="font-title font-black text-movieSlideTitle">
                        {movieById?.original_title}{" "}
                        <span className="font-normal text-title">
                          {" "}
                          <p>( {movieById?.release_date.substring(0, 4)} ) </p>
                        </span>
                      
                          {movieById?.status == "Released"
                            ? <span className="py-1 px-2 bg-primary rounded-lg text-body w-fit text-sm">Lançado</span>
                            : <span className="py-1 px-2 bg-slate-200 rounded-lg text-body w-fit text-sm">Esta para lançar</span>
                            }
                      
                      </p>
                    </div>
                    {/* Marcar como assistido */}
                    {/* <button className="bg-primary hover:bg-primaryOnHover transition duration-300 py-3 px-8 rounded-lg relative flex flex-row items-center font-black shadow-md active:scale-95">
                      Marcar como assistido{" "}
                      <FaCheck className="absolute right-2" />
                    </button> */}
                    <Button small={false} green onlyBorder={false} type="button">Marcar como assistido<FaCheck/></Button>
                  </div>
                  <p className="text-body text-bodyColor italic">
                    {movieById?.tagline}
                  </p>
                </div>
                {/* Informacoes adicionais */}

                {/* Minutos e categorias */}
                <div className="flex flex-row flex-wrap gap-2 text-subBody items-center">
                  <p className="p-1 border border-primaryBg w-fit text-bodyColor rounded-lg">
                    {movieById?.adult ? "Filme aduto" : "Não adulto"}
                  </p>{" "}
                  -<p>{movieById?.release_date}</p> -
                  <div className="flex flex-row items-center gap-x-4">
                    <p className="text-body">Categorias: </p>
                    {movieById?.genres.map(
                      (genre: MovieByIdGenresModel, index: number) => (
                        <div
                          key={genre.id}
                          className="flex flex-row items-center"
                        >
                          <span>{genre.name}</span>
                          {index !== movieById.genres.length - 1 && "/"}
                        </div>
                      )
                    )}
                  </div>
                  -
                  <div className="text-body">
                    {movieHours && movieHours > 0 && `${movieHours}h`}{" "}
                    {movieMinutes && movieMinutes > 0 && `${movieMinutes}m`}
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-bodyColor">
                  <p className="flex flex-row items-center gap-x-2">
                    Orçamento:{" "}
                    <span className="text-primary font-black">
                      {movieById?.budget.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>{" "}
                  </p>
                  <p className="flex flex-row items-center gap-x-2">
                    Bilheteria:{" "}
                    <span className="text-primary font-black">
                      {movieById?.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </span>{" "}
                  </p>
                </div>

                {/* Grafico de amostragem e outras coisas */}

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Grafico e titulo */}
                  <div className="flex flex-row-reverse items-center gap-4">
                    <p className="text-smallDevicesTitle font-title font-black max-w-[120px]">
                      Classificação geral do público
                    </p>
                    <div className="max-h-[80px] max-w-[80px] ">
                      <Doughnut
                        data={data}
                        options={{ plugins: { legend: { display: false } } }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row text-body text-bodyColor gap-2">
                    <p className="flex flex-row items-center gap-x-2">
                      <AiFillStar className="text-yellow-600" />
                      <span>{movieById?.vote_average}</span>
                    </p>
                    /<p>{movieById?.vote_count} - Votantes</p>
                  </div>
                </div>
                {/* Sinopse */}
                <div className="flex flex-col gap-y-4">
                  <p className="text-smallDevicesTitle font-title font-black">
                    Sinopse
                  </p>
                  <p>{movieById?.overview}</p>
                </div>

                {/* Informacoes adicionais */}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-title font-black text-subTitle">
                Produzido por
              </p>
              <div className="flex flex-row items-center flex-wrap gap-4">
                {movieById?.production_companies.map(
                  (company: MovieByIdCompaniesModel) => (
                    <div
                      key={company.id}
                      className="flex flex-col items-center flex-wrap"
                    >
                      <img
                        className="w-[60px] h-[60px] object-contain bg-newWhite rounded-lg p-1"
                        src={`${company?.logo_path !== null && tmdbImagePath}/${
                          company.logo_path
                        }`}
                      />
                      <span className="text-subBody text-bodyColor">
                        {company.name}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <button onClick={() => addMovie(movieInfosToAddInFavoriteList)} className="absolute -right-0 -top-10 bg-newBlack rounded-full p-6 font-black text-title text-primaryNeon hover:scale-105 transition duration-300 mr-2 shadow-md">
            <BsPlus />
          </button>
        </div>
      </div>

      {/* Corpo */}
      <div className="w-full px-4 md:w-[90%] md:px-0 mx-auto"></div>
    </main>
  );
};

export default MovieInfo;
