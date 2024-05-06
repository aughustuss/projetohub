import React from "react";
import Title from "components/Title";
import { MovieModel } from "models/entities/Movie";
import Text from "components/Text";
import Row from "components/Row";
import Button from "components/Button";
import { BiSolidChat } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import { findTheMostRepeatedCategory } from "utils/CategoryFrequency";
import { AllCategories } from "data/Categories";
import InfoText from "components/InfoText";
import OrderBy from "components/OrderBy";
import Link from "components/Link";
import MoviesList from "components/MoviesList";
import { UserProfileModel } from "models/entities/User";
import { getUserInfoByIdService } from "services/Services";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import LoginContext from "contexts/LoginContext";

const Profile = () => {
	const { userId } = useParams();

	const {token} = React.useContext(LoginContext);

	const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<
		MovieModel[]
	>([]);
	const [user, setUser] = React.useState<UserProfileModel>();

	const [userMostRepeatedCategory, setUserMostRepeatedCategory] =
		React.useState<number>();
	const [userMostRepeatedCategoryName, setUserMostRepeatedCategoryName] =
		React.useState<string>("");

	const [userMoviesCount, setUserMoviesCount] = React.useState<number>();

	const [userFavoriteList, setUserFavoriteList] = React.useState<
		MovieModel[]
	>([]);

	React.useEffect(() => {
		getUserInfo();
	}, [userId]);

	console.log(user);

	const getUserInfo = async () => {
		if (userId) {
			getUserInfoByIdService(token, Number(userId))
				.then((res: AxiosResponse<UserProfileModel>) => {
					const userData = res.data;
					setUser(userData);
					if (userData) {
						setUserFavoriteMovies(userData.favoriteMovies);
						const mostRepeatedCategory =
							findTheMostRepeatedCategory(
								userData.favoriteMovies
							);
						setUserMostRepeatedCategory(mostRepeatedCategory);

						setUserMoviesCount(
							userData.favoriteMovies.filter((movie) =>
								movie.genres.some(
									(genre) =>
										genre === userMostRepeatedCategoryName
								)
							).length
						);

						setUserFavoriteList(userData.favoriteMovies);

						const userFavoriteCategory = AllCategories.find(
							(category) => category.id === mostRepeatedCategory
						);
						if (userFavoriteCategory)
							setUserMostRepeatedCategoryName(
								userFavoriteCategory.name
							);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	// React.useEffect(() => {
	// 	if (favoriteMovies) {
	// 		const parsedFavoriteMovies = JSON.parse(favoriteMovies);
	// 		setUserFavoriteMovies(parsedFavoriteMovies);
	// 		setUserMostRepeatedCategory(
	// 			findTheMostRepeatedCategory(
	// 				parsedFavoriteMovies,
	// 				"userMostFrequentCategory"
	// 			)
	// 		);
	// 		setUserMoviesCount(
	// 			parsedFavoriteMovies.filter((movie: MovieModel) =>
	// 				movie.genre_ids.some(
	// 					(genre) => Number(genre) === userMostRepeatedCategory
	// 				)
	// 			).length
	// 		);

	// 		const userFavoriteCategoryName = AllCategories.find(
	// 			(cat) => cat.id === userMostRepeatedCategory
	// 		);

	// 		if (userFavoriteCategoryName) {
	// 			setUserMostRepeatedCategoryName(userFavoriteCategoryName.name);
	// 		}
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [userMostRepeatedCategory]);

	return (
		<>
			<main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto text-newWhite">
				<div className="flex flex-wrap flex-row items-start gap-4 min-h-[300px] h-auto bg-primaryBg p-4  rounded-xl shadow-md shadow-black/30 sm:justify-start">
					<div className="h-full w-full md:w-1/4 flex flex-row items-center md:justify-center gap-4">
						<img
							src={user?.profileImage}
							className="h-4/6 w-[80px] md:w-full object-cover rounded-xl"
						/>
					</div>
					<div className="flex flex-col gap-8 md:w-fit h-full w-full justify-between">
						<Title
							bold
							center={false}
							black={false}
							message={
								<Row capitalize baseline>
									{user?.firstName} {user?.surName}{" "}
									<p>
										{" "}
										<span className="italic text-sm">
											AKA
										</span>{" "}
										<span className="text-lg capitalize">
											{" "}
											( {user?.nickName} ) -
										</span>{" "}
										<span className="text-base">
											{" "}
											{user?.profileTitle}{" "}
										</span>{" "}
									</p>
								</Row>
							}
							responsive
							fullWidth
						/>
						<Row space>
							<Row baseline responsive>
								{" "}
								<InfoText bold>
									{user?.watchedMoviesCount}
								</InfoText>{" "}
								<Text text="Filmes assistidos" bold />
							</Row>
							<Row baseline responsive>
								{" "}
								<InfoText bold>
									{" "}
									{user?.favoriteMovies.length}{" "}
								</InfoText>{" "}
								<Text text="Filmes favoritados" bold />
							</Row>
							<Row baseline responsive>
								{" "}
								<InfoText bold> {user?.friends} </InfoText>{" "}
								<Text text="Amigos cinéfilos" bold />
							</Row>
						</Row>
						<Row space responsive>
							<div className="border border-primaryBg p-4 rounded-lg w-fit text-sm gap-y-2 flex flex-col">
								{userMostRepeatedCategoryName &&
								userMostRepeatedCategoryName !== "" &&
								userFavoriteMovies.length > 0 ? (
									<>
										<p>
											O gênero preferido de{" "}
											{user?.nickName} é:{" "}
											<InfoText bold>
												{userMostRepeatedCategoryName}
											</InfoText>
										</p>
										<p>
											Este usuário assistiu{" "}
											<InfoText bold>
												{" "}
												{userMoviesCount}
											</InfoText>{" "}
											filmes deste gênero{" "}
										</p>
									</>
								) : (
									<p>
										{user?.nickName} ainda não assistiu
										filme.
									</p>
								)}
							</div>
							<div className="gap-2 flex flex-col w-full sm:w-fit">
								<Button fullWidth onlyBorder={false} small>
									<BiSolidChat className="text-2xl" />
									Enviar mensagem{" "}
								</Button>
								<Link
									small
									col={false}
									to="/chat"
									onlyBorder={false}
									fullWidth
									bgPrimary
								>
									<IoPersonAdd className="text-lg" />
									Seguir{" "}
								</Link>
							</div>
						</Row>
					</div>
				</div>
				<div className="flex flex-col gap-y-[10px]">
					{/* <div className="flex flex-col gap-y-4">
						<Title
							bold
							center={false}
							black
							message="Filmes adicionados recentemente à lista de favoritos"
						/>
						{recentlyAdded.length > 0 ? (
							<MoviesList
								hasMovies
								extraItems
								grid={false}
								movies={recentlyAdded}
							/>
						) : (
							<div className="flex flex-col items-center justify-center text-center h-[400px] text-xs text-bodyColor gap-y-4">
								Você não adicionou nenhum filme à sua lista
								recentemente... Que pena. Vamos mudar isso!
								<Link
									bgNotPrimary
									onlyBorder
									to={`/genre/${userMostRepeatedCategory}`}
								>
									Navegar por Filmes
								</Link>
							</div>
						)}
					</div> */}
					<div className="flex flex-col gap-y-4">
						<Title
							bold
							center={false}
							black
							message="Todos os filmes da sua lista você encontra aqui"
						/>
						<OrderBy
							movies={userFavoriteList}
							setMovies={setUserFavoriteList}
							absolute
						/>
						{userFavoriteList.length > 0 ? (
							<MoviesList
								hasMovies
								extraItems
								grid
								movies={userFavoriteList}
							/>
						) : (
							<div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
								Você ainda não assistiu nenhuma filme... Que
								pena. Vamos mudar isso!
								<Link
									bgNotPrimary
									onlyBorder
									to={`/genre/${userMostRepeatedCategory}`}
								>
									Navegar por Filmes
								</Link>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Profile;
