import { AxiosResponse } from "axios";
import { MovieModel } from "models/entities/movie";
import React from "react";
import { useParams } from "react-router-dom";
import {
  getMoviesBasedOnItsGenreService,
  getMoviesBasedOnItsTitleService,
} from "services/getMoviesService";
import ReactPaginate from "react-paginate";
import Movie from "shared/movie";
import { IoMdArrowDropup } from "react-icons/io";
import Loading from "./loading";
import Input from "components/input";

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
  const [searchParam, setSearchParam] = React.useState<string>("");
  const [searchedMovies, setSearchedMovies] = React.useState<MovieModel[]>([]);
  const [isLoadingGenreMovies, setIsLoadingGenreMovies] =
    React.useState<boolean>(false);
  const [isLoadingSearchedMovies, setIsLoadingSearchedMovies] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (movieGenre) {
      setIsLoadingGenreMovies(true);
      Promise.resolve(
        getMoviesBasedOnItsGenreService(page, movieGenre).then(
          (response: AxiosResponse<MovieModel[]>) => {
            setMovies(response.data.results);
            setPageCount(response.data.total_pages);
            setIsLoadingGenreMovies(false);
          }
        )
      ).catch((err: unknown) => console.log(err));
    }
  }, [page, searchParam]);
  React.useEffect(() => {
    if (searchParam.length > 0) {
      setIsLoadingSearchedMovies(false);
      Promise.resolve(
        getMoviesBasedOnItsTitleService(searchParam).then(
          (response: AxiosResponse<MovieModel[], unknown>) => {
            const responseData: MovieModel[] = response.data.results;
            setSearchedMovies(
              responseData.filter((genre) => {
                return genre.genre_ids.some(
                  (genreId) => Number(genreId) == Number(movieGenre)
                );
              })
            );
            setPageCount(searchedMovies.length / 20);
            setIsLoadingSearchedMovies(false);
          }
        )
      );
    }
  }, [searchParam]);

  const sortMoviesByTitle = (order: "asc" | "desc") => {
    let sortedMovies: MovieModel[] = [];
    if (searchParam.length == 0) {
      sortedMovies = [...movies];
    } else {
      sortedMovies = [...searchedMovies];
    }
    sortedMovies.sort((a, b) => {
      const titleA = a.original_title.toLowerCase();
      const titleB = b.original_title.toLowerCase();

      if (order == "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    if (searchParam.length == 0) {
      setMovies(sortedMovies);
    } else {
      setSearchedMovies(sortedMovies);
    }
  };

  const sortMoviesByReleaseDate = () => {
    let sortedMovies: MovieModel[] = [];
    if (searchParam.length == 0) {
      sortedMovies = [...movies];
    } else {
      sortedMovies = [...searchedMovies];
    }
    sortedMovies.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);

      return dateB.getTime() - dateA.getTime();
    });

    if (searchParam.length == 0) {
      setMovies(sortedMovies);
    } else {
      setSearchedMovies(sortedMovies);
    }
  };

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
    if (option.value == "titleCresc") {
      sortMoviesByTitle("asc");
    } else if (option.value == "titleDecresc") {
      sortMoviesByTitle("desc");
    } else if (option.value == "news") {
      sortMoviesByReleaseDate();
    }
  };

  return (
    <>
      <main className="min-h-screen font-body text-body py-[100px] flex flex-col justify-between gap-y-10 w-full">
        {selectedMovie !== null && (
          <div className="absolute inset-0 h-auto w-full bg-black z-40 opacity-70"></div>
        )}
        <div className="w-full px-4 md:w-[90%] md:px-0 mx-auto flex flex-col items-center gap-y-10">
          <div className="flex flex-col gap-y-4 w-full">
            <label
              htmlFor="searchFilter"
              className="font-title text-subTitle font-black"
            >
              Buscar por um filme{" "}
            </label>
            <div className="w-full md:w-[70%]">
              <Input
                hasText={searchParam.length > 0}
                onChange={(e) => setSearchParam(e.target.value)}
                type="text"
                placeholder="Digite o nome do filme que está buscando..."
                onClick={() => setSearchParam("")}
                value={searchParam}
              />
            </div>
          </div>
          <div className="self-end cursor-pointer hover:shadow-md transition duration-300">
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
                  <div className="absolute cursor-pointer z-20 w-full top-full left-0 text-start mt-2 bg-primaryBgBorder rounded-md py-2">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
            {!isLoadingGenreMovies && !isLoadingSearchedMovies ? (
              searchParam.length == 0 ? (
                movies.map((movie: MovieModel) => (
                  <Movie
                    key={movie.id}
                    selectedMovieId={selectedMovie}
                    closeMovieInfo={closeMovieinfo}
                    openMovieInfo={openMovieInfo}
                    movie={movie}
                  />
                ))
              ) : (
                searchedMovies.map((sMovie: MovieModel) => (
                  <Movie
                    movie={sMovie}
                    key={sMovie.id}
                    selectedMovieId={selectedMovie}
                    closeMovieInfo={closeMovieinfo}
                    openMovieInfo={openMovieInfo}
                  />
                ))
              )
            ) : (
              <Loading />
            )}
          </div>
          <ReactPaginate
            className="flex flex-row gap-2 items-center justify-center w-fit md:max-w-full flex-wrap max-w-[300px]"
            pageClassName="border-2 border-primaryBgBorder rounded-lg px-3 py-1"
            activeClassName="bg-primaryBgBorder"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            nextLabel="Próximo"
            previousLabel="Anterior"
            initialPage={0}
          />
        </div>
      </main>
    </>
  );
};

export default GenreMovies;
