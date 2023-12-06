import Title from "components/Title";
import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useLocation } from "react-router-dom";
import { getMoviesBasedOnItsTitleService } from "services/GetMoviesService";
import Movie from "shared/Movie";
import Slide from "shared/Slide";
import { Pagination, Scrollbar, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Button from "components/Button";
const SearchedMovies = () => {
  const location = useLocation();
  const movieName = new URLSearchParams(location.search).get("movieName");
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);

  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieInfo = () => {
    setSelectedMovie(null);
  };

  const [categorizedMovies, setCategorizedMovies] = React.useState<{
    [key: string]: MovieModel[];
  }>({});
  React.useEffect(() => {
    if (movieName) {
      Promise.resolve(
        getMoviesBasedOnItsTitleService(movieName)
          .then((res) => {
            const catMovies: { [key: string]: MovieModel[] } =
              res.data.results.reduce(
                (cat: { [key: string]: MovieModel[] }, movie: MovieModel) => {
                  for (const genre of movie.genre_ids) {
                    const category = AllCategories.find(
                      (cat) => cat.id === Number(genre)
                    );
                    if (category) {
                      cat[category.name] ??= [];
                      cat[category.name].push(movie);
                    }
                  }
                  return cat;
                },
                {}
              );
            setCategorizedMovies(catMovies);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    }
  }, [movieName]);
  return (
    <>
      <main className="py-[100px] min-h-screen w-[85%] flex flex-col md:flex-row mx-auto">
        <div className="w-[20%] flex flex-col justify-start gap-y-4 sticky">
          <p className="text-sm self-start">Filtrar apenas por</p>
          <div className="flex flex-wrap flex-col gap-y-3 w-full ">
            {Object.entries(categorizedMovies).map(([cat]) => (
              <label
                className="flex flex-row gap-1 text-xs gap-y-2 overflow-hidden"
                htmlFor={cat}
              >
                <input className="accent-primary" type="checkbox" name="" id={cat} />
                {cat}
              </label>
            ))}
            <Button small type="button" onlyBorder={false} green>
              Filtrar
            </Button>
          </div>
        </div>
        <div className="w-[80%]">
          {Object.entries(categorizedMovies).map(([cat, movies]) => (
            <div key={cat} className="flex flex-col">
              <div className="flex flex-row flex-wrap items-baseline gap-x-4">
                <Title bold center={false} green={false} message={cat} /> -
                <p className="text-bodyColor text-sm">
                  Foram encontrados{" "}
                  <span className="underline"> {movies.length} filmes</span>{" "}
                  para esta categoria
                </p>
              </div>
              <Slide
                key={cat}
                scrollBar
                movies
                modules={[Scrollbar, Navigation, Pagination]}
                stretch
              >
                {movies.map((movie) => (
                  <SwiperSlide className="py-10" key={movie.id}>
                    <Movie
                      closeMovieInfo={closeMovieInfo}
                      movie={movie}
                      openMovieInfo={openMovieInfo}
                      selectedMovieId={selectedMovie}
                    />
                  </SwiperSlide>
                ))}
              </Slide>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SearchedMovies;
