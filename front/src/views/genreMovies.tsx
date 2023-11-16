import { AxiosResponse } from "axios";
import { MovieModel } from "models/entities/movie";
import React from "react";
import { useParams } from "react-router-dom";
import { getMoviesBasedOnItsGenreService } from "services/getMoviesService";
import ReactPaginate from "react-paginate";
import Movie from "shared/movie";
import { IoMdArrowDropup } from "react-icons/io";

type SelectOptions = {
  value: string;
  label: string;
};

const GenreMovies = () => {
  const { movieGenre } = useParams();
  const [movies, setMovies] = React.useState<MovieModel[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);

  const options: SelectOptions[] = [
    { value: "none", label: "Ordenar por" },
    { value: "relevants", label: "Mais relevantes" },
    { value: "news", label: "Mais recentes" },
    { value: "titleCresc", label: "Título A-Z" },
    { value: "titleDecresc", label: "Título Z-A" },
  ];
  const [selectedOption, setSelectedOption] = React.useState<SelectOptions>(
    options[0]
  );
  const [selectOptionsMenu, setSelectOptionsMenu] =
    React.useState<boolean>(false);

  const getMovieBasedOnItsGenre = async () => {
    try {
      if (movieGenre) {
        await getMoviesBasedOnItsGenreService(page, movieGenre)
          .then((movies: AxiosResponse) => {
            setMovies(movies.data.results);
            setPageCount(movies.data.total_pages);
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getMovieBasedOnItsGenre();
  }, [page]);

  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieinfo = () => {
    setSelectedMovie(null);
  };

  const openSelectOptions = () => {
    setSelectOptionsMenu(!selectOptionsMenu);
  };

  const handleOptionChange = (option: SelectOptions) => {
    setSelectedOption(option);
    console.log(option);
  };

  if (selectedOption.value == "titleCresc") {
    movies.sort();
  }

  return (
    <>
      <main className="min-h-screen font-body text-body py-[100px] flex flex-col justify-between gap-y-10 relative">
        {selectedMovie !== null && (
          <div className="absolute inset-0 h-auto w-full bg-black z-40 opacity-70"></div>
        )}
        <div className="w-full px-4 md:w-[90%] md:px-0 mx-auto flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4 w-full">
            <label htmlFor="">Buscar por um filme </label>
            <input type="text" className="w-full md:w-2/3 py-2 px-2 rounded-lg" placeholder="Digite o nome do filme que está buscando..." />
          </div>
          <div className="self-end z-30">
            <div
              onClick={openSelectOptions}
              className="border border-primaryBgBorder rounded-md px-6 py-2 text-body relative w-[200px]"
            >
              <p className="flex flex-row items-center justify-between w-full gap-x-4">
                {" "}
                {selectedOption.label}{" "}
                <IoMdArrowDropup
                  className={`${
                    selectOptionsMenu ? "rotate-0" : "rotate-180"
                  } transition duration-300`}
                />
              </p>
              <div>
                {selectOptionsMenu && (
                  <div className="absolute w-full top-full left-0 text-start mt-2 bg-primaryBgBorder rounded-md py-2">
                    {options
                      .slice(1, options.length)
                      .map((option: SelectOptions) => (
                        <button
                          onClick={() => handleOptionChange(option)}
                          className="hover:bg-black py-2 px-4 w-full text-start"
                        >
                          {option.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
            {movies.map((movie: MovieModel) => (
              <Movie
                key={movie.id}
                selectedMovieId={selectedMovie}
                closeMovieInfo={closeMovieinfo}
                openMovieInfo={openMovieInfo}
                movie={movie}
              />
            ))}
          </div>
          <ReactPaginate
            className="flex flex-row gap-2 items-center justify-center w-fit flex-wrap max-w-[300px]"
            pageClassName="border-2 border-primaryBgBorder rounded-lg px-3 py-1"
            activeClassName="bg-primaryBgBorder"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            nextLabel="Próximo"
            previousLabel="Anterior"
          />
        </div>
      </main>
    </>
  );
};

export default GenreMovies;
