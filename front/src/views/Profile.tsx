import React from "react";
import Perfil from "assets/sobre.jpeg";
import Title from "components/Title";
import { MovieModel } from "models/entities/Movie";
import Text from "components/Text";
import Row from "components/Row";
import Button from "components/Button";
import { BiSolidChat } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import Movie from "shared/Movie";
import { findTheMostRepeatedCategory } from "utils/CategoryFrequency";
import { AllCategories } from "data/Categories";
import GreenText from "components/GreenText";
import { IoMdClose } from "react-icons/io";
import FavoritesMoviesContext from "contexts/FavoritesMoviesContext";
import OrderBy from "components/OrderBy";

interface MovieModelWithTime extends MovieModel {
  readonly addedDate: Date;
}

const Profile = () => {
  const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<
    MovieModelWithTime[]
  >([]);
  const { removeMovie, movies, recentlyAdded } = React.useContext(FavoritesMoviesContext);
  const [userFavoriteList, setUserFavoriteList] = React.useState<MovieModelWithTime[]>([]);
  const [userWatchedList, setUserWatchedList] = React.useState<number>();
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  const [userMostRepeatedCategory, setUserMostRepeatedCategory] =
    React.useState<number>();
  const [userMostRepeatedCategoryName, setUserMostRepeatedCategoryName] =
    React.useState<string>("");
  const [userMoviesCount, setUserMoviesCount] = React.useState<number>();

  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };
  const closeMovieInfo = () => {
    setSelectedMovie(null);
  };

  React.useEffect(() => {
    const watchedMovies = localStorage.getItem("watchedList");
    const favoriteMovies = localStorage.getItem("userFavoriteMovies");
    if(movies){
      setUserFavoriteList(movies);
    }
    if (watchedMovies) {
      setUserWatchedList(JSON.parse(watchedMovies).length);
    }

    if (favoriteMovies) {
      const parsedFavoriteMovies = JSON.parse(favoriteMovies);
      setUserFavoriteMovies(parsedFavoriteMovies);
      setUserMostRepeatedCategory(
        findTheMostRepeatedCategory(
          parsedFavoriteMovies,
          "userMostFrequentCategory"
        )
      );
      setUserMoviesCount(
        parsedFavoriteMovies.filter((movie: MovieModel) =>
          movie.genre_ids.some(
            (genre) => Number(genre) === userMostRepeatedCategory
          )
        ).length
      );

      const userFavoriteCategoryName = AllCategories.find(
        (cat) => cat.id === userMostRepeatedCategory
      );

      if (userFavoriteCategoryName) {
        setUserMostRepeatedCategoryName(userFavoriteCategoryName.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMostRepeatedCategory]);

  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <div className="flex flex-row items-start gap-x-4 h-auto bg-primaryBgBorder p-4 rounded-lg shadow-lg shadow-black/30 w-full">
          <div className="h-full w-1/4">
            <img
              src={Perfil}
              className="h-4/6 w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-8">
            <Title
              bold
              center={false}
              green={false}
              message="Micael AKA Michas - Um grande Cinéfilo"
            />
            <Row space>
              <Row baseline>
                {" "}
                <GreenText bold>{userWatchedList}</GreenText>{" "}
                <Text text="Filmes assistidos" bold />
              </Row>
              <Row baseline>
                {" "}
                <GreenText bold> {userFavoriteMovies.length} </GreenText>{" "}
                <Text text="Filmes favoritados" bold />
              </Row>
              <Row baseline>
                {" "}
                <GreenText bold> 100 </GreenText>{" "}
                <Text text="Amigos cinéfilos" bold />
              </Row>
            </Row>
            <Row space>
              <div className="border border-primaryBg p-4 rounded-lg w-fit text-sm gap-y-2 flex flex-col">
                <p>
                  O gênero preferido do Michas é:{" "}
                  <GreenText bold>{userMostRepeatedCategoryName}</GreenText>{" "}
                </p>
                <p>
                  Este usuário assistiu{" "}
                  <GreenText bold> {userMoviesCount}</GreenText> filmes deste
                  gênero{" "}
                </p>
              </div>
              <div className="gap-2 flex flex-col">
                <Button fullWidth green={false} onlyBorder={false} small>
                  <BiSolidChat className="text-2xl" />
                  Enviar mensagem{" "}
                </Button>
                <Button fullWidth green={false} onlyBorder={false} small>
                  <IoPersonAdd className="text-lg" />
                  Seguir{" "}
                </Button>
              </div>
            </Row>
          </div>
        </div>
        <div className="flex flex-col gap-y-[80px]">
          <div className="flex flex-col gap-y-4">
            <Title
              bold
              center={false}
              green={false}
              message="Filmes adicionados recentemente à lista de favoritos"
            />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
              {recentlyAdded.map((movie) => (
                <div key={movie.id} className="flex flex-col gap-y-2">
                  <Movie
                    movie={movie}
                    selectedMovieId={selectedMovie}
                    onGrid
                    closeMovieInfo={closeMovieInfo}
                    openMovieInfo={() => openMovieInfo(movie.id)}
                  />
                  <p className="text-xs italic text-bodyColor">
                    Adicionado em{" "}
                    {new Date(movie.addedDate).toLocaleDateString("pt-BR")}
                  </p>
                  <Button
                    onClick={() => removeMovie(movie.id)}
                    green={false}
                    onlyBorder
                    small
                    fullWidth
                  >
                    Remover da lista <IoMdClose className="font-black" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Title
              bold
              center={false}
              green={false}
              message="Todos os filmes da sua lista você encontra aqui"
            />
            <OrderBy movies={movies} setMovies={setUserFavoriteList} absolute />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
              {userFavoriteList.map((movie) => (
                <div key={movie.id} className="flex flex-col gap-y-2">
                  <Movie
                    movie={movie}
                    selectedMovieId={selectedMovie}
                    onGrid
                    closeMovieInfo={closeMovieInfo}
                    openMovieInfo={() => openMovieInfo(movie.id)}
                  />
                  <p className="text-xs italic text-bodyColor">
                    Adicionado em{" "}
                    {new Date(movie.addedDate).toLocaleDateString("pt-BR")}
                  </p>
                  <Button
                    onClick={() => removeMovie(movie.id)}
                    green={false}
                    onlyBorder
                    small
                    fullWidth
                  >
                    Remover da lista <IoMdClose className="font-black" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
