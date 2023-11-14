import {
  MovieById,
  MovieByIdCompanies,
  MovieByIdGenres,
} from "models/entities/MovieById";
import React from "react";
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import { getMovieByIdService } from "services/GetMovieById";
import { AiFillStar } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";

const Movie = () => {
  const { movieId } = useParams();
  const [movieById, setMovieById] = React.useState<MovieById>();
  const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;

  const movieHours = movieById?.runtime && Math.floor(movieById?.runtime / 60);
  const movieMinutes = movieById?.runtime && movieById?.runtime % 60;
  const moviePercentageLiked =
    movieById?.vote_average && (movieById.vote_average / 10) * 100;
  const moviePercentageDisliked =
    moviePercentageLiked && 100 - moviePercentageLiked;
  const data = [
    ["Filme", "Porcentagem de votos"],
    ["Gostaram", moviePercentageLiked],
    ["Não gostaram", moviePercentageDisliked],
  ];

  console.log(moviePercentageLiked, moviePercentageDisliked);

  React.useEffect(() => {
    const fetchMovieById = async () => {
      try {
        if (movieId) {
          await getMovieByIdService(movieId)
            .then((movie) => {
              setMovieById(movie.data);
            })
            .catch((err) => {
              console.log(err);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieById();
  }, [movieId]);
  console.log(movieById);
  return (
    <main className="w-full h-auto">
      {/* Banner */}
      <div className="h-[650px] w-full">
        <div className="h-full w-full relative">
          <img
            src={`${tmdbImagePath}${movieById?.backdrop_path}`}
            className="h-full w-full object-cover"
          />
          <div className="bg-black absolute inset-0 h-full w-full z-10 opacity-30" />
        </div>
        {/*         
        <div className="w-full px-4 md:w-[90%] md:px-0 mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-row gap-x-4">
            <div className="h-full">
                <img className="h-full w-[300px] rounded-lg object-cover shadow-md" src={`${tmdbImagePath}/${movieById?.poster_path}`} />
            </div>
        </div> */}
      </div>

      {/* Sinopse do banner */}
      <div className="h-[600px] text-body">
        <div className="h-auto min-h-[700px] bg-primaryBgBorder w-full px-4 md:w-[90%] md:px-0 mx-auto -mt-[30%] md:-mt-[10%] shadow-md rounded-lg absolute z-20 left-1/2 -translate-x-1/2">
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
                        <p className="py-1 px-2 bg-primary rounded-lg text-body w-fit">
                          {movieById?.status == "Released"
                            ? "Lançado"
                            : "Está para lançar"}
                        </p>
                      </p>
                    </div>
                    {/* Marcar como assistido */}
                    <button className="bg-primary hover:bg-primaryOnHover transition duration-300 py-3 px-8 rounded-lg relative flex flex-row items-center font-black">
                      Marcar como assistido{" "}
                      <FaCheck className="absolute right-2" />
                    </button>
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
                      (genre: MovieByIdGenres, index: number) => (
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
                  <div className="flex flex-row-reverse items-center">
                    <p className="text-smallDevicesTitle font-title font-black max-w-[120px]">
                      Classificação geral do público
                    </p>
                    <Chart
                      chartType="PieChart"
                      width={"100px"}
                      height={"100px"}
                      data={data}
                      options={{
                        legend: "none",
                        backgroundColor: "transparent",
                        height: 0,
                        slices: {
                          0: { color: "#4fb547" },
                          1: { color: "#f6f6f6" },
                        },
                      }}
                    />
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
                  (company: MovieByIdCompanies) => (
                    <div className="flex flex-col items-center flex-wrap">
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
          <button className="absolute -right-0 -top-10 bg-black rounded-full p-6 font-black text-title text-primaryNeon hover:scale-105 transition duration-300">
            <BsPlus />
          </button>
        </div>
      </div>

      <p>Id: {movieId}</p>
      <p>{movieById?.original_title}</p>
      {/* Corpo */}
      <div className="w-full px-4 md:w-[90%] md:px-0 mx-auto"></div>
    </main>
  );
};

export default Movie;
