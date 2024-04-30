import { MovieModel } from "models/entities/Movie";
import Title from "./Title";
import React, { useEffect } from "react";
import { getPopularMoviesService } from "services/Services";
import Loading from "views/Loading";
import MoviesList from "./MoviesList";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = React.useState<MovieModel[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    Promise.resolve(
      getPopularMoviesService()
        .then((res) => {
          setTrendingMovies(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
    );
  }, []);
  return (
    <>
      <main>
        <Title
          bold
          center={false}
          black
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
