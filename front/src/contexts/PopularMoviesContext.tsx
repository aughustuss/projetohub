import { ChildrenPropsModel } from "models/contexts/contextModels";
import { PopularMoviesContextModel } from "models/contexts/contextModels";
import { MovieModel } from "models/entities/movie";
import React from "react";
import { getPopularMoviesService } from "services/getMoviesService";

export const PopularMoviesContext =
  React.createContext<PopularMoviesContextModel>({
    movies: [],
    loading: true,
    setMovies: () => {},
  });

const PopularMoviesContextProvider: React.FC<ChildrenPropsModel> = ({
  children,
}) => {
  const [movies, setMovies] = React.useState<MovieModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const getPopularMovies = async () => {
    try {
      const movieData = await getPopularMoviesService();
      if (movieData) {
        setMovies(movieData.data.results);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <PopularMoviesContext.Provider value={{ movies, setMovies, loading }}>
      {children}
    </PopularMoviesContext.Provider>
  );
};

export default PopularMoviesContext;
export { PopularMoviesContextProvider };
