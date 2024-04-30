import React from "react";
import { MovieByIdModel, MovieCompanyModel } from "models/entities/MovieById";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import {
	addToFavoriteListService,
	getMovieByIdService,
} from "services/Services";
import { AiFillStar } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { AxiosResponse } from "axios";
import Loading from "views/Loading";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import Button from "./Button";
import WatchedListContext from "contexts/WatchedListContext";
import ErrorMessage from "./ErrorMessage";
import CommentSection from "./ComentSection";
interface MovieInfoProps {
	movieId?: string;
}
const MovieInfo = ({ movieId }: MovieInfoProps) => {
	const [movieById, setMovieById] = React.useState<MovieByIdModel>();
	const [movieExists, setMovieExists] = React.useState<boolean>(false);
	const [movieExistsInFavorites, setMovieExistsInFavorites] =
		React.useState<boolean>(false);
	const { movieAlreadyAdded, checkIfMovieExistsInFavorites } =
		React.useContext(FavoritesMoviesContext);
	const { addToWatchedList, checkIfMovieExists, alreadyAdded } =
		React.useContext(WatchedListContext);
	const tmdbImagePath = import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH;
	const [isLoading, setLoading] = React.useState(false);
	const movieHours =
		movieById?.runtime && Math.floor(movieById?.runtime / 60);
	const movieMinutes = movieById?.runtime && movieById?.runtime % 60;
	const moviePercentageLiked =
		movieById?.voteAverage && (movieById.voteAverage / 10) * 100;
	const moviePercentageDisliked =
		moviePercentageLiked && 100 - moviePercentageLiked;

	const data = {
		labels: ["Gostaram", "Não gostaram"],
		datasets: [
			{
				data: [moviePercentageLiked, moviePercentageDisliked],
				backgroundColor: ["#1b4569", "#b5b5b5"],
				borderColor: ["#1b4569", "#b5b5b5"],
				minHeight: 1,
				minWidth: 1,
				borderWidth: 2,
			},
		],
	};

	React.useEffect(() => {
		const mExists = checkIfMovieExists(Number(movieId));
		const mExistsInF = checkIfMovieExistsInFavorites(Number(movieId));
		setMovieExists(mExists);
		setMovieExistsInFavorites(mExistsInF);
		const fetchMovieById = async () => {
			setLoading(true);
			if (movieId) {
				await getMovieByIdService(movieId)
					.then((movie: AxiosResponse<MovieByIdModel>) => {
						setMovieById(movie.data);
						setLoading(false);
					})
					.catch((err: Error) => {
						console.log(err);
						setLoading(false);
					});
			}
		};
		fetchMovieById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movieId]);

	const addMovieToFavoriteList = (movieId: number) => {
		Promise.resolve(
			addToFavoriteListService(movieId)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				})
		);
	};

	if (isLoading) return <Loading big />;

	return (
		<>
			{movieId && movieById ? (
				<main className="w-full h-auto text-newWhite">
					{/* Banner */}
					<div className="h-[650px] w-full">
						<div className="h-full w-full relative">
							<img
								src={`${tmdbImagePath}${movieById?.backdropPath}`}
								className="h-full w-full object-cover"
							/>
							<div className="bg-black absolute inset-0 h-full w-full opacity-30" />
						</div>
					</div>

					{/* Sinopse do banner */}
					<section className="h-[1100px] sm:h-[1000px] md:h-[800px] lg:h-[600px] text-body ">
						<div className="h-auto min-h-[700px] bg-primaryBg w-full px-4 md:w-[85%] md:px-0 mx-auto -mt-[30%] md:-mt-[10%] shadow-md rounded-xl absolute left-1/2 -translate-x-1/2">
							{/* Início da sinopse  */}
							<div className="p-4 md:p-8 flex flex-col gap-y-4">
								{/* Imagem e informações adicionais*/}
								<div className="flex flex-col md:flex-row items-start gap-4">
									<img
										src={`${tmdbImagePath}/${movieById?.posterPath}`}
										className="w-full md:w-[250px] h-[300px] md:h-[20%] rounded-lg shadow-md object-cover"
									/>
									<div className="flex flex-col gap-4">
										{/* Titulo */}
										<div className="flex flex-col gap-2">
											<div className="flex flex-col md:flex-row items-baseline justify-between gap-2">
												<div className="flex flex-row items-baseline gap-2 flex-wrap">
													<div className="font-title font-black text-movieSlideTitle">
														{
															movieById?.originalTitle
														}{" "}
														<span className="font-normal text-title">
															{" "}
															<p>
																({" "}
																{movieById?.releaseDate.substring(
																	0,
																	4
																)}{" "}
																){" "}
															</p>
														</span>
														{movieById?.status.toString() ==
														"Lançado" ? (
															<span className="py-1 px-2 bg-newWhite rounded-xl text-primaryBlack text-body w-fit text-sm">
																Lançado
															</span>
														) : (
															<span className="py-1 px-2 bg-slate-200 rounded-xl text-primaryBlack text-body w-fit text-sm">
																Está para lançar
															</span>
														)}
													</div>
												</div>
												{/* Marcar como assistido */}
												{/* <button className="bg-primary hover:bg-primaryOnHover transition duration-300 py-3 px-8 rounded-lg relative flex flex-row items-center font-black shadow-md active:scale-95">
                      Marcar como assistido{" "}
                      <FaCheck className="absolute right-2" />
                    </button> */}
												{!movieExists &&
												!alreadyAdded ? (
													<Button
														onClick={() => {
															if (movieById?.id)
																addToWatchedList(
																	movieById?.id
																);
														}}
														small={false}
														onlyBorder={false}
														type="button"
													>
														<FaCheck />
														Marcar como assistido
													</Button>
												) : (
													<Button
														disabled
														small={false}
														onlyBorder={false}
														type="button"
													>
														Filme assistido
													</Button>
												)}
											</div>
											<p className="text-body italic">
												{movieById?.tagline}
											</p>
										</div>
										{/* Informacoes adicionais */}

										{/* Minutos e categorias */}
										<div className="flex flex-row flex-wrap gap-2 text-subBody items-center">
											<p className="p-1 border border-border  w-fit rounded-lg">
												{movieById?.isAdult
													? "Filme aduto"
													: "Não adulto"}
											</p>{" "}
											-
											<p>
												{movieById?.releaseDate &&
													new Date(
														movieById.releaseDate
													).toLocaleDateString()}
											</p>{" "}
											-
											<div className="flex flex-row items-center gap-x-4">
												<p className="text-body">
													Categorias:{" "}
												</p>
												{movieById?.genres.map(
													(genre, index: number) => (
														<div
															key={index}
															className="flex flex-row items-center"
														>
															<span>{genre}</span>
															{index !==
																movieById.genres
																	.length -
																	1 && "/"}
														</div>
													)
												)}
											</div>
											-
											<div className="text-body">
												{movieHours &&
													movieHours > 0 &&
													`${movieHours}h`}{" "}
												{movieMinutes &&
													movieMinutes > 0 &&
													`${movieMinutes}m`}
											</div>
										</div>

										<div className="flex flex-col gap-4 ">
											<p className="flex flex-row items-center gap-x-2">
												Orçamento:{" "}
												<span className="text-secondary font-black">
													{movieById?.budget.toLocaleString(
														"en-US",
														{
															style: "currency",
															currency: "USD",
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														}
													)}
												</span>{" "}
											</p>
											<p className="flex flex-row items-center gap-x-2">
												Bilheteria:{" "}
												<span className="text-secondary font-black">
													{movieById?.revenue.toLocaleString(
														"en-US",
														{
															style: "currency",
															currency: "USD",
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														}
													)}
												</span>{" "}
											</p>
										</div>

										{/* Grafico de amostragem e outras coisas */}

										<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
											{/* Grafico e titulo */}
											<div className="flex flex-row-reverse items-center gap-4">
												<p className="text-smallDevicesTitle font-title font-black max-w-[120px]">
													Classificação geral do
													público
												</p>
												<div className="max-h-[80px] max-w-[80px] ">
													<Doughnut
														data={data}
														options={{
															plugins: {
																legend: {
																	display:
																		false,
																},
															},
														}}
													/>
												</div>
											</div>
											<div className="flex flex-row text-body gap-2">
												<p className="flex flex-row items-center gap-x-2">
													<AiFillStar className="text-yellow-600" />
													<span>
														{movieById?.voteAverage}
													</span>
												</p>
												/
												<p>
													{movieById?.voteCount} -
													Votantes
												</p>
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
									<div className="flex flex-row items-center gap-4">
										{movieById?.companies.map(
											(
												company: MovieCompanyModel,
												index
											) => (
												<div
													key={index}
													className="flex flex-col items-center flex-wrap"
												>
													<img
														className="w-[60px] h-[60px] object-contain bg-newWhite rounded-lg p-1"
														src={`${
															company?.logoPath !==
																null &&
															tmdbImagePath
														}/${company.logoPath}`}
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
							{!movieAlreadyAdded && !movieExistsInFavorites ? (
								<button
									onClick={() => addMovieToFavoriteList(
										movieById?.id
									)
									}
									className="absolute -right-0 -top-10 bg-primary rounded-xl p-4 font-black text-title text-newWhite active:scale-95 transition duration-300 mr-2 shadow-md"
								>
									<BsPlus className="text-4xl" />
								</button>
							) : (
								<button
									// onClick={() =>
									// 	addMovieToFavoriteList(
									// 		movieById?.id?.)
									// 	)
									// }
									className="absolute -right-0 -top-10 bg-primary rounded-xl p-5 font-black text-title text-primaryNeon/90 transition duration-300 mr-2 shadow-md cursor-not-allowed"
								>
									<FaCheck className="text-2xl" />
								</button>
							)}
						</div>
					</section>

					{/* Comentários */}

					<section>
						<CommentSection movieId={movieById.id.toString()} comments={movieById.comments} />
					</section>
				</main>
			) : (
				<ErrorMessage message="Filme com o ID fornecido não foi encontrado..." />
			)}
		</>
	);
};

export default MovieInfo;
