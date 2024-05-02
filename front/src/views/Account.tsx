import { AxiosResponse } from "axios";
import ProfileInfo from "components/ProfileInfo";
import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";
import { UserProfileModel } from "models/entities/User";
import React from "react";
import { getUserInfoService } from "services/Services";
import { findTheMostRepeatedCategory } from "utils/CategoryFrequency";
import Loading from "./Loading";
import LoginContext from "contexts/LoginContext";

const Account = () => {

	const [user, setUser] = React.useState<UserProfileModel>();
	const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<MovieModel[]>([]);
	const [userMostRepeatedCategory, setUserMostRepeatedCategory] = React.useState<number>();
	const [userMostRepeatedCategoryName, setUserMostRepeatedCategoryName] = React.useState<string>("");
	const [userFavoriteList, setUserFavoriteList] = React.useState<MovieModel[]>([]);
	const [userMoviesCount, setUserMoviesCount] = React.useState<number>();

	const [isLoading, setLoading] = React.useState<boolean>(false);

	const { token } = React.useContext(LoginContext);

	React.useEffect(() => {
		setLoading(true);
		const getUserProfileInfo = async () => {
			try {
				const res: AxiosResponse<UserProfileModel> =
					await getUserInfoService(token);
				const userData = res.data;
				if (userData) {
					setUser(userData);
					setUserFavoriteMovies(userData.favoriteMovies);
					setUserFavoriteList(userData.favoriteMovies);

					const mostRepeatedCategory = findTheMostRepeatedCategory(
						userData.favoriteMovies,
						"personalFavoriteCategory"
					);

					setUserMostRepeatedCategory(mostRepeatedCategory);

					const userFavoriteCategory = AllCategories.find(
						(category) => category.id === mostRepeatedCategory
					);

					if (userFavoriteCategory)
						setUserMostRepeatedCategoryName(
							userFavoriteCategory.name
						);

					setUserMoviesCount(
						userData.favoriteMovies.filter((movie) =>
							movie.genres.some(
								(genre) =>
									genre === userMostRepeatedCategoryName
							)
						).length
					);
				}
			} catch (e) {
				console.log(e);
			} finally {
				setLoading(false);
			}
		};
		getUserProfileInfo();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userMostRepeatedCategoryName, token]);

	if (isLoading) return <Loading big />;

	return (
		<>
			<ProfileInfo
				user={user}
				userFavoriteList={userFavoriteList}
				setUserFavoriteList={setUserFavoriteList}
				userFavoriteMovies={userFavoriteMovies}
				userMostRepeatedCategory={userMostRepeatedCategory}
				userMostRepeatedCategoryName={userMostRepeatedCategoryName}
				userMoviesCount={userMoviesCount}
				anotherUserProfile={false}
			/>
		</>
	);
};

export default Account;
