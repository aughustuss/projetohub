import React from "react";
import { MovieModel } from "models/entities/Movie";
import { AllCategories } from "data/Categories";
import { UserProfileModel } from "models/entities/User";
import { getUserInfoByIdService } from "services/Services";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import LoginContext from "contexts/LoginContext";
import ProfileInfo from "components/ProfileInfo";

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
	}, [userId, userMoviesCount]);

	const getUserInfo = async () => {
		if (userId) {
			getUserInfoByIdService(token, Number(userId))
				.then((res: AxiosResponse<UserProfileModel>) => {
					const userData = res.data;
					setUser(userData);
					if (userData) {

						setUserFavoriteMovies(userData.favoriteMovies);
						setUserFavoriteList(userData.favoriteMovies);
						setUserMostRepeatedCategoryName(userData.favoriteGenre);

						const mostRepeatedCategory = AllCategories.find((category) => {
							return category.name === userData.favoriteGenre
						});

						setUserMostRepeatedCategory(mostRepeatedCategory?.id);
						
						setUserMoviesCount(
							userData.favoriteMovies.filter((movie) =>
								movie.genres.some(
									(genre) =>
										genre === user?.favoriteGenre
								)
							).length
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<ProfileInfo
				anotherUserProfile
				setUserFavoriteList={setUserFavoriteList}
				userFavoriteList={userFavoriteList}
				userFavoriteMovies={userFavoriteMovies}
				userMostRepeatedCategoryName={userMostRepeatedCategoryName}
				user={user}
				userMostRepeatedCategory={userMostRepeatedCategory}
				userMoviesCount={userMoviesCount}
			/>
		</>
	);
};

export default Profile;
