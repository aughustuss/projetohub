import React from "react";
import {
  ChildrenPropsModel,
} from "models/contexts/ContextModels";
import { MovieModelWithTime } from "models/entities/Movie";

interface FavoritesMoviesContextModel {
  movies: MovieModelWithTime[];
  recentlyAdded: MovieModelWithTime[];
  userFavoriteList: MovieModelWithTime[];
  setUserFavoriteList: React.Dispatch<React.SetStateAction<MovieModelWithTime[]>>
  addMovie: (val: MovieModelWithTime) => void
  removeMovie: (val: number) => void
}

export const FavoritesMoviesContext =
  React.createContext<FavoritesMoviesContextModel>({
    movies: [],
    recentlyAdded: [],
    userFavoriteList: [],
    setUserFavoriteList: () => {},
    removeMovie: () => {},
    addMovie: () => {},
  });

const FavoritesMoviesContextProvider: React.FC<ChildrenPropsModel> = ({
  children,
}) => {
  const [movies, setMovies] = React.useState<MovieModelWithTime[]>([]);
  const [recentlyAdded, setRecentlyAdded] = React.useState<MovieModelWithTime[]>([]);
  const [userFavoriteList, setUserFavoriteList] = React.useState<MovieModelWithTime[]>([]);
  console.log(userFavoriteList);
  React.useEffect(() => {
    if (movies.length > 0) {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const recentlyAddedMovies = movies.filter(
        (movie: MovieModelWithTime) => new Date(movie.addedDate) >= twoDaysAgo
      );
      setRecentlyAdded(recentlyAddedMovies);
      setUserFavoriteList(movies);
    }
  }, [movies]);

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    const moviesInStorage = localStorage.getItem("userFavoriteMovies");
    if (moviesInStorage) {
      setMovies(JSON.parse(moviesInStorage));
    }
  };

  const addMovie = (movie: MovieModelWithTime) => {
    setMovies((prevMovies) => {
      const movieExists = prevMovies.some(
        (newMovie) => newMovie.id === movie.id
      );

      if (!movieExists) {
        const newMovie = { ...movie, addedDate: new Date() };
        const newMovies = [...prevMovies, newMovie];
        localStorage.setItem("userFavoriteMovies", JSON.stringify(newMovies));
        return newMovies;
      }
      return prevMovies;
    });
  };

  const removeMovie = (movieId: number) => {
    const movieInFavorites = movies.some((id) => id.id == movieId);
    if (movieInFavorites) {
      const newMoviesList: MovieModelWithTime[] = movies.filter((movie) => {
        return movie.id !== movieId;
      });
      setMovies(newMoviesList);
      localStorage.setItem("userFavoriteMovies", JSON.stringify(newMoviesList));
    }
  };

  return (
    <FavoritesMoviesContext.Provider
      value={{ movies, addMovie, removeMovie, recentlyAdded, userFavoriteList, setUserFavoriteList }}
    >
      {children}
    </FavoritesMoviesContext.Provider>
  );
};

export default FavoritesMoviesContext;
export { FavoritesMoviesContextProvider };
