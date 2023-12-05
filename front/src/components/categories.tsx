import { MovieGenreModel } from "models/entities/MovieGenre";
import React from "react";
import { getMoviesCategoriesService } from "services/GetMoviesService";
import Slide from "shared/Slide";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Title from "./Title";
import { AllCategories } from "data/Categories";
import { IconType } from "react-icons";

const Categories = () => {
  const [movieGenres, setMovieGenres] = React.useState<MovieGenreModel[]>([]);

  React.useEffect(() => {
    Promise.resolve(getMoviesCategoriesService())
      .then((res) => setMovieGenres(res.data.genres))
      .catch((err: unknown) => console.log(err));
  }, []);
  console.log(movieGenres);
  return (
    <>
      <main className="flex flex-col gap-y-4 text-body">
        <Title
          center={false}
          green={false}
          message="Explore novas categorias"
        />
        <Slide movies={false} modules={[Navigation]}>
          {AllCategories &&
            AllCategories.map(({ id, name, icon }: MovieGenreModel) => (
              <SwiperSlide key={id}>
                <div className="h-[100px] rounded-lg bg-primaryBgBorder p-4 flex flex-row gap-4 w-full justify-between items-center hover:shadow-md transition duration-300">
                  <div className="w-full self-center">
                    <p className="p-4 justify-center items-center flex bg-primaryBg rounded-2xl text-primary text-3xl">
                      {icon && React.createElement(icon as IconType)}
                    </p>
                  </div>
                  <div className="flex flex-col h-full w-full justify-between">
                    <p className="text-sm font-semibold">{name}</p>
                    <a
                      className="text-xs italic underline text-primary"
                      href={`/genreMovies/${id}`}
                    >
                      Ver mais
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Slide>
      </main>
    </>
  );
};

export default Categories;
