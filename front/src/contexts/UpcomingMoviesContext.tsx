import { ChildrenPropsModel } from "models/contexts/contextModels";
import { UpcomingMoviesContextModel } from "models/contexts/contextModels";
import { MovieModel } from "models/entities/movie";
import React from "react";
import { getUpcomingMoviesService } from "services/getMoviesService";

export const UpcomingMoviesContext = React.createContext<UpcomingMoviesContextModel>({
  upMovies: [],
  loading: true,
});

const UpcomingMoviesContextProvider: React.FC<ChildrenPropsModel> = ({
  children,
}) => {
  const [upMovies, setUpMovies] = React.useState<MovieModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getUpcomingMovies = async () => {
    try {
      const movieData = await getUpcomingMoviesService();
      if (movieData) {
        setUpMovies(movieData.data.results);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <UpcomingMoviesContext.Provider value={{ upMovies, loading }}>
      {children}
    </UpcomingMoviesContext.Provider>
  );
};

export default UpcomingMoviesContext;
export { UpcomingMoviesContextProvider };
