import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useParams } from "react-router-dom";
import {
	getMoviesBasedOnItsGenreService,
	getMoviesBasedOnItsTitleService,
} from "services/Services";
import ReactPaginate from "react-paginate";
import Movie from "shared/Movie";
import Loading from "./Loading";
import Input from "components/Input";
import OrderBy from "components/OrderBy";
import { AllCategories } from "data/Categories";
import { IoMdClose } from "react-icons/io";
import ErrorMessage from "components/ErrorMessage";

const GenreMovies = () => {
	const { movieGenre } = useParams();
	const [movies, setMovies] = React.useState<MovieModel[]>([]);
	const [page, setPage] = React.useState<number>(1);
	const [pageCount, setPageCount] = React.useState<number>(0);

	React.useState<boolean>(false);
	const [searchParam, setSearchParam] = React.useState<string>("");
	const [searchedMovies, setSearchedMovies] = React.useState<MovieModel[]>(
		[]
	);
	const [isLoadingGenreMovies, setLoadingGenreMovies] =
		React.useState<boolean>(false);
	const [isLoadingSearchedMovies, setLoadingSearchedMovies] =
		React.useState<boolean>(false);

	const movieGenreName = AllCategories.find(
		(genre) => genre.id.toString() === movieGenre
	);

	React.useEffect(() => {
		if (movieGenre) {
			setLoadingGenreMovies(true);
			Promise.resolve(
				getMoviesBasedOnItsGenreService(movieGenre, page).then(
					(response) => {
						setMovies(response.data);
						setPageCount(response.data.length / 20);
						setLoadingGenreMovies(false);
					}
				)
			).catch(() => setLoadingGenreMovies(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, searchParam]);

	React.useEffect(() => {
		if (searchParam.length > 0) {
			setLoadingSearchedMovies(false);
			Promise.resolve(
				getMoviesBasedOnItsTitleService(searchParam).then(
					(response) => {
						const responseData: MovieModel[] = response.data;
						setSearchedMovies(
							responseData.filter((genre) => {
								return genre.genres.some(
									(genre) => genre == movieGenreName?.name
								);
							})
						);
						setPageCount(searchedMovies.length / 20);
						setLoadingSearchedMovies(false);
					}
				).catch(() => {
          setLoadingGenreMovies(false);
        })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, searchParam]);

	return (
		<>
			<main className="min-h-screen font-body text-body pt-[120px] pb-[100px] flex flex-col justify-between gap-y-10 w-full">
					{movies.length > 0 ? (
            
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
                onClick={() => setSearchParam("")}
                type="text"
                placeholder="Pesquise por um filme..."
                value={searchParam}
                withIcon
                icon={<IoMdClose />}
                
                />
						</div>
					</div>
					<OrderBy
						absolute
						movies={movies}
						setMovies={setMovies}
						searchParam={searchParam}
						searchedMovies={searchedMovies}
						setSearchedMovies={setSearchedMovies}
            />

					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 w-full">
						{!isLoadingGenreMovies && !isLoadingSearchedMovies ? (
              searchParam.length == 0 ? (
                movies.map((movie: MovieModel) => (
									<Movie
										key={movie.id}
										movie={movie}
										onGrid
                    />
                  ))
                ) : (
                  searchedMovies.map((sMovie: MovieModel) => (
                    <Movie
										movie={sMovie}
										key={sMovie.id}
										onGrid
                    />
                  ))
                )
						) : (
              <Loading big />
						)}
					</div>
					<ReactPaginate
						className="flex text-secondary flex-row gap-2 items-center justify-center w-fit md:max-w-full flex-wrap max-w-[300px]"
						pageClassName="border-2 border-border text-newWhite rounded-lg px-3 py-1"
						activeClassName="bg-secondary"
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
        ) : (
          <ErrorMessage message="Não há filmes nesta categoria..." />
        )}
			</main>
		</>
	);
};

export default GenreMovies;
