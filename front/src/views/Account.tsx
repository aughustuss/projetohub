import { AxiosResponse } from "axios";
import ProfileInfo from "components/ProfileInfo";
import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";
import { UserProfileModel } from "models/entities/User";
import React from "react";
import { getUserInfoService } from "services/Services";
import { findTheMostRepeatedCategory } from "utils/CategoryFrequency";
import Loading from "./Loading";

const Account = () => {
    const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<
		MovieModel[]
	>([]);
	const [user, setUser] = React.useState<UserProfileModel>();

    const [isLoading, setLoading] = React.useState<boolean>(false);
	const [userMostRepeatedCategory, setUserMostRepeatedCategory] =
		React.useState<number>();
	const [userMostRepeatedCategoryName, setUserMostRepeatedCategoryName] =
		React.useState<string>("");

	const [userMoviesCount, setUserMoviesCount] = React.useState<number>();

	const [userFavoriteList, setUserFavoriteList] = React.useState<
		MovieModel[]
	>([]);

    // React.useEffect(() => {
    //     if (movies.length > 0) {
    //       const twoDaysAgo = new Date();
    //       twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    //       const recentlyAddedMovies = movies.filter(
    //         (movie: MovieModel) =>
    //           movie.addedDate && new Date(movie.addedDate) >= twoDaysAgo
    //       );
    //       setRecentlyAdded(recentlyAddedMovies);
    //       setUserFavoriteList(movies);
    //     }
    //   }, [movies]);

    React.useEffect(() => {
        const getUserProfileInfo = async () => {
            Promise.resolve(
                await getUserInfoService()
                 .then((res: AxiosResponse<UserProfileModel>) => {
                    const userData = res.data;
                    setUser(userData);
                    if (userData) {
                      setUserFavoriteMovies(userData.favoriteMovies);
                      const mostRepeatedCategory = findTheMostRepeatedCategory(
                        userData.favoriteMovies,
                        "userFavoriteCategory"
                      );
                      setUserMostRepeatedCategory(mostRepeatedCategory);
          
                      setUserMoviesCount(
                          userData.favoriteMovies.filter((movie) =>
                            movie.genres.some((genre) => genre === userMostRepeatedCategoryName)
                          ).length
                        );
                      setUserFavoriteList(userData.favoriteMovies);
          
                      const userFavoriteCategory = AllCategories.find((category) =>
                        category.id === mostRepeatedCategory
                      );
                      if (userFavoriteCategory)
                        setUserMostRepeatedCategoryName(userFavoriteCategory.name);
      
                      setLoading(false);
                    }
                  })
                 .catch((err) => {
                    console.log(err);
                  })
              );
        }
        getUserProfileInfo();
    }, [userMostRepeatedCategoryName])


    if(isLoading)
        return <Loading big/>

	return (
		<>
			<ProfileInfo
                user={user}
                setUserFavoriteList={setUserFavoriteList}
                userFavoriteList={userFavoriteList}
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
