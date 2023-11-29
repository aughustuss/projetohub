import { AxiosResponse } from "axios";
import { MovieGenreModel } from "models/entities/movieGenre";
import React from "react";
import { getMoviesCategoriesService } from "services/getMoviesService";
import Slide from "shared/slide";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

const Categories = () => {
  const [movieGenres, setMovieGenres] = React.useState<MovieGenreModel[]>([]);

  React.useEffect(() => {
    Promise.resolve(getMoviesCategoriesService())
      .then((res: AxiosResponse<MovieGenreModel[], undefined>) =>
        setMovieGenres(res.data.genres)
      )
      .catch((err: unknown) => console.log(err));
  }, []);
  return (
    <>
      <main className="flex flex-col gap-y-4 text-body">
        <h1 className="text-title font-title font-black">
          Explore novas categorias
        </h1>
        <Slide modules={[Navigation]}>
          {movieGenres && movieGenres.map((genre: MovieGenreModel) => (
            <SwiperSlide key={genre.id}>
              <a
                href={`/genreMovies/${genre.id}`}
                className="border border-primaryBgBorder cursor-pointer h-[100px] w-full rounded-lg flex flex-col justify-center items-center hover:bg-primaryBgBorder transition duration-300 font-title text-smallDevicesTitle font-black"
              >
                {genre.name}
              </a>
            </SwiperSlide>
          ))}
        </Slide>
      </main>
    </>
  );
};

export default Categories;
