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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { CustomFile } from "views/MovieRegister";
import Error from "./Error";
import { addChatRoomService, addProfileImageService, getUserFollowersService } from "services/Services";
import LoginContext from "contexts/LoginContext";

interface ProfileImage{
	profileImage: Blob | string;
}
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

	const [userProfilePath, setUserProfilePath] = React.useState<string>("");
	const [profileImage, setProfileImage] = React.useState<CustomFile[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const {token} = React.useContext(LoginContext);
	const [followers, setFollowers] = React.useState<number[]>([]);

	const getUserFollowers = async () => {
		if(user != null){
			try{
				const response = await getUserFollowersService(token);
				if(response.status === 200){
					setFollowers(response.data);
				}
			} catch (error){
				console.log(error)
			}
		}
	}

	React.useEffect(() => {
        if (user?.profileImageSource) {
            setUserProfilePath(user.profileImageSource);
        }
		getUserFollowers();
    }, [user]);

	const {control, formState:{errors}, handleSubmit, setValue} = useForm<ProfileImage>({
		defaultValues: {
            profileImage: "",
        },
	});

	const onSubmit: SubmitHandler<ProfileImage> = async (data) => {
		setLoading(true);
		const formData = new FormData();
        formData.append("profileImage", data.profileImage);
        try{
			const response = await addProfileImageService(formData, token);
			if(response.status === 200){
				setLoading(false);
			}
		} catch (error){
			console.log(error);
			setLoading(false);
		}
	}

	const addChatRoom = async () => {
		console.log("clicado");
		if(user != null){
			try{
				const response = await addChatRoomService(token, user?.firstName);
				console.log(response);
			} catch (error){
				console.log(error);
			}
		}
	}

	return (
		<>
			<main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto text-newWhite">
				<div className="flex flex-wrap flex-row items-start gap-4 min-h-[300px] h-auto bg-primaryBg p-4  rounded-xl shadow-md shadow-black/30 sm:justify-start">
					<div className="h-full w-full md:w-1/4 flex flex-row items-center md:justify-center gap-4 relative">
						<img
							onLoad={() =>
								URL.revokeObjectURL(
									profileImage[0]
										.preview
								)
							}
							src={profileImage.length > 0 ?
								profileImage[0]
									.preview : userProfilePath
							}
							className="min-h-[300px] md:h-full w-full object-cover rounded-xl"
						/>
								<form onSubmit={handleSubmit(onSubmit)} className="absolute italic text-primaryBlack w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
							{!anotherUserProfile && user?.profileImageSource?.includes("defaultuserprofile.png") && profileImage.length == 0 && (
									<Controller
										control={control}
										name="profileImage"
										rules={{
											required: {
                                                value: true,
                                                message: "Campo obrigatório",
                                            },
										}}
										render={({field:{name}}) => (
											<div className=" flex flex-col gap-y-1">
												<Dropzone 
													maxFiles={1}
													multiple={false}
													onDrop={(files) => {
														setProfileImage(files.map((file) => Object.assign(file, {
															preview: URL.createObjectURL(file),
														}), setValue("profileImage", files[0]) ))
													}}
													>
														{({getInputProps, getRootProps, isFocused, isDragActive}) => (
															<div className="flex flex-col gap-y-1 relative">
																<div
																	className={`${
																		isFocused &&
																		"border-tertiary"
																	} hover:border-tertiary cursor-pointer rounded-xl p-4 border-2 border-dashed text-sm text-bodyColor w-1/2 mx-auto`}
																	{...getRootProps()}
																>
																	<input
																		id={name}
																		{...getInputProps()}
																	/>
																	{isDragActive ? (
																		<p>
																			Solte a imagem
																			aqui...
																		</p>
																	) : (
																		<p>
																			Arraste e solte
																			uma imagem aqui
																			ou clique para
																			buscar...
																		</p>
																	)}
																</div>
															</div>	
														)}
												</Dropzone>
												<Error>
												{errors.profileImage &&
													errors.profileImage.type ===
														"required" &&
													errors.profileImage.message}
												</Error>
											</div>
										)}
									/>
										)}
										{profileImage.length > 0 && (
											<div className="z-50">
												<Button 
													onlyBorder={false}
													small
													loading={isLoading}
													type="submit"
												>
													Salvar
												</Button>
											</div>
										)}
								</form>
							{profileImage.length > 0 && (
								<button
									onClick={() => {
										setProfileImage([]);
										setValue(
											"profileImage",
											""
										);
									}}
									className="absolute top-1 right-2 font-bold bg-white rounded-full py-1 px-3 text-primaryBlack">
										x
								</button>								
							)} 
							
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
								userFavoriteMovies.length > 0 && (
									<>
										<p>
											O gênero preferido de{" "}
											{user?.nickName} é:{" "}
											<InfoText bold>
												{userMostRepeatedCategoryName}
											</InfoText>
										</p>
										<p>
											Este usuário favoritou{" "}
											<InfoText bold>
												{" "}
												{userMoviesCount}
											</InfoText>{" "}
											filmes deste gênero{" "}
										</p>
									</>
								)} 
								<div className="pt-2">
									{user?.watchedMoviesCount && user.watchedMoviesCount > 0 ? (
										<p > <span className="capitalize"> {user.nickName}</span> assistiu <InfoText bold>{user.watchedMoviesCount} </InfoText> filmes</p>
									) : (
										<p> <span className="capitalize">{user?.nickName}</span> ainda não assistiu nenhum filme.</p>
									)}
								</div>
							</div>
							{anotherUserProfile && (
								<div className="gap-2 flex flex-col w-full sm:w-fit items-center">
									<Button onClick={() => addChatRoom()} type="button" fullWidth onlyBorder={false} small>
										<BiSolidChat className="text-2xl" />
										Enviar mensagem{" "}
									</Button>
									{user != null && !followers.includes(user.id) ? (
										<Button
											small
											onlyBorder={false}
											fullWidth
											type="button"
										>
											<IoPersonAdd className="text-lg" />
											Seguir{" "}
										</Button>
									) : (
										<p className="text-bodyColor text-xs italic">Seguindo</p>
									)}
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
								extraItems={!anotherUserProfile}
								grid
								movies={userFavoriteList}

							/>
						) : (
							<div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
								{!anotherUserProfile ? (
									<div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
										Você ainda não favoritou nenhum filme... Que
										pena. Vamos mudar isso!
										<Link
											bgNotPrimary
											onlyBorder
											to={`/genre/${userMostRepeatedCategory}`}
											>
											Navegar por Filmes
										</Link>
									</div>
								) : (
									<p>{user?.nickName} ainda não favoritou nenhum filme...</p>
								)}
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default ProfileInfo;
