import PopularMoviesContext from "contexts/PopularMoviesContext";
import { MovieModel } from "models/entities/Movie";
import React from "react";

const Home = () => {
  const { movies } = React.useContext(PopularMoviesContext);
  console.log(movies);
  return (
    <>
      <main>
        {movies.map((movie: MovieModel) => (
          <img
            src={`${import.meta.env.VITE_THE_MOVIE_DB_IMG_PATH}${movie.poster_path}`}
            className="object-cover w-[350px] h-[350px] rounded-md shadow-md"
          />
        ))}
      </main>
    </>
  );
};

export default Home;
