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
