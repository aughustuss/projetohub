import { MovieModel } from "models/entities/Movie";
import Title from "./Title";
import React, { useEffect } from "react";
import { getTrendingMovies } from "services/GetMoviesService";
import Loading from "views/Loading";
import MoviesList from "./MoviesList";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = React.useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    Promise.resolve(
      getTrendingMovies()
        .then((res) => {
          setTrendingMovies(res.data.results);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    );
  }, []);
  return (
    <>
      <main>
        <Title
          bold
          center={false}
          green={false}
          message="Os mais populares no momento"
        />
        {!isLoading && trendingMovies ? (
          <>
            <MoviesList
              hasMovies
              grid={false}
              extraItems={false}
              movies={trendingMovies}
            />
          </>
        ) : (
          <Loading big={false} />
        )}
      </main>
    </>
  );
};

export default Trending;
