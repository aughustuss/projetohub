import React from "react";
import Title from "./Title";
import Row from "./Row";
import InfoText from "./InfoText";
import Button from "./Button";
import { BiSolidChat } from "react-icons/bi";
import Link from "./Link";
import { IoPersonAdd } from "react-icons/io5";
import MoviesList from "./MoviesList";
import OrderBy from "./OrderBy";
import { UserProfileModel } from "models/entities/User";
import Text from "./Text";
import { MovieModel } from "models/entities/Movie";
import FavoritesMoviesContext, {
	FavoriteListContext,
} from "contexts/FavoriteListContext";

interface ProfileInfoProps {
	user?: UserProfileModel;
	userFavoriteMovies: MovieModel[];
	userMostRepeatedCategoryName: string;
	userMoviesCount?: number;
	userFavoriteList: MovieModel[];
	setUserFavoriteList: React.Dispatch<React.SetStateAction<MovieModel[]>>;
	userMostRepeatedCategory?: number;
	recentlyAdded?: MovieModel[];
	anotherUserProfile: boolean;
}

const ProfileInfo = ({
	user,
	userFavoriteMovies,
	userMostRepeatedCategoryName,
	userMoviesCount,
	setUserFavoriteList,
	userFavoriteList,
	userMostRepeatedCategory,
	recentlyAdded,
	anotherUserProfile,
}: ProfileInfoProps) => {
	const { setUserFavoriteListCount } = React.useContext(FavoriteListContext);

	React.useEffect(() => {
		const updateFavoriteListCountAfterData = () => {
			setUserFavoriteListCount(userFavoriteMovies.length);
		};
		updateFavoriteListCountAfterData();
	}, [userFavoriteMovies]);
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
							{anotherUserProfile && (
								<div className="gap-2 flex flex-col w-full sm:w-fit">
									<Button fullWidth onlyBorder={false} small>
										<BiSolidChat className="text-2xl" />
										Enviar mensagem{" "}
									</Button>
									<Button
										small
										onlyBorder={false}
										fullWidth
										type="button"
									>
										<IoPersonAdd className="text-lg" />
										Seguir{" "}
									</Button>
								</div>
							)}
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
							message={`Todos os filmes da ${
								anotherUserProfile
									? `lista de ${user?.nickName}`
									: "sua lista"
							} você encontra aqui`}
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

export default ProfileInfo;
