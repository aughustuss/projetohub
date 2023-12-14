import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useParams } from "react-router-dom";
import {
  getMoviesBasedOnItsGenreService,
  getMoviesBasedOnItsTitleService,
} from "services/GetMoviesService";
import ReactPaginate from "react-paginate";
import Movie from "shared/Movie";
import Loading from "./Loading";
import Input from "components/Input";
import OrderBy from "components/OrderBy";


const GenreMovies = () => {
  const { movieGenre } = useParams();
  const [movies, setMovies] = React.useState<MovieModel[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);

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
          (response) => {
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
          (response) => {
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
  }, [page, searchParam]);


  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieinfo = () => {
    setSelectedMovie(null);
  };


  return (
    <>
      <main className="min-h-screen font-body text-body pt-[120px] pb-[100px] flex flex-col justify-between gap-y-10 w-full">
        <div className="w-full px-4 md:w-[85%] md:px-0 mx-auto flex flex-col items-center gap-y-5">
          <div className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="searchFilter"
              className="font-body text-sm font-bold text-bodyColor"
            >
              Use o campo abaixo para filtrar os filmes{" "}
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
          <OrderBy absolute movies={movies} setMovies={setMovies} searchParam={searchParam} searchedMovies={searchedMovies} setSearchedMovies={setSearchedMovies} />
          
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
                    onGrid
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
                    onGrid
                  />
                ))
              )
            ) : (
              <Loading big />
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
