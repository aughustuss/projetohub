import { ChildrenPropsModel } from "models/contexts/ChildrenProps";
import { UpcomingMoviesModel } from "models/contexts/UpcomingMoviesContext";
import { MovieModel } from "models/entities/Movie";
import React from "react";
import { getUpcomingMoviesService } from "services/GetUpcomingMovies";

export const UpcomingMoviesContext = React.createContext<UpcomingMoviesModel>({
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
