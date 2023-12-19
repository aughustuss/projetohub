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
import Slide from "shared/Slide";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import Link from "components/Link";

interface MovieModelWithTime extends MovieModel {
  readonly addedDate: Date;
}

const Profile = () => {
  const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<
    MovieModelWithTime[]
  >([]);
  const {
    removeMovie,
    movies,
    recentlyAdded,
    userFavoriteList,
    setUserFavoriteList,
    clearMovies,
  } = React.useContext(FavoritesMoviesContext);
  //const [userFavoriteList, setUserFavoriteList] = React.useState<MovieModelWithTime[]>([]);
  const [userWatchedList, setUserWatchedList] = React.useState<number>();
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  const [userMostRepeatedCategory, setUserMostRepeatedCategory] =
    React.useState<number>();
  const [userMostRepeatedCategoryName, setUserMostRepeatedCategoryName] =
    React.useState<string>("");
  const [userMoviesCount, setUserMoviesCount] = React.useState<number>();
  const [userTitle, setUserTitle] = React.useState<string>("");
  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };
  const closeMovieInfo = () => {
    setSelectedMovie(null);
  };

  React.useEffect(() => {
    const watchedMovies = localStorage.getItem("watchedList");
    const favoriteMovies = localStorage.getItem("userFavoriteMovies");
    if (watchedMovies) {
      setUserWatchedList(JSON.parse(watchedMovies).length);
    }
    if (movies) {
      setUserFavoriteList(movies);
      if (movies.length > 5 && movies.length <= 25) {
        setUserTitle("Assiste alguns filmes");
      } else if (movies.length > 25 && movies.length <= 50) {
        setUserTitle("Gosta de assistir filmes");
      } else if (movies.length > 50 && movies.length <= 100) {
        setUserTitle("Tem uma paixão por filmes");
      } else if (movies.length > 100 && movies.length <= 200) {
        setUserTitle("Ama muito filmes");
      } else if (movies.length > 200 && movies.length <= 300) {
        setUserTitle("É louco por filmes");
      } else if (movies.length > 200 && movies.length <= 400) {
        setUserTitle("Realmente gosta de filmes, não passa um dia sem ver!");
      } else if (movies.length > 400 && movies.length <= 800) {
        setUserTitle("É um grande cinéfilo");
      } else if (movies.length > 800 && movies.length <= 1000) {
        setUserTitle("Um dos maiores cinéfilos que já pisaram na terra");
      } else {
        setUserTitle(
          "Ninguém jamais assistiu tantos filmes assim. É mais que um cinéfilo!"
        );
      }
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
        <div className="flex flex-wrap flex-row items-start gap-4 h-auto bg-primaryBgBorder p-4 rounded-lg shadow-lg shadow-black/30 w-full justify-center sm:justify-start">
          <div className="h-full w-full md:w-1/4 flex flex-row items-center md:justify-center gap-4">
            <img
              src={Perfil}
              className="h-4/6 w-[80px] md:w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-8 md:w-fit w-full">
            <Title
              bold
              center={false}
              green={false}
              message={
                <Row baseline>
                  Micael{" "}
                  <p>
                    {" "}
                    <span className="italic text-sm">AKA</span>{" "}
                    <span className="text-lg"> ( Michas ) -</span>{" "}
                    <span className="text-base"> {userTitle} </span>{" "}
                  </p>
                </Row>
              }
              responsive
              fullWidth
            />
            <Row space>
              <Row baseline responsive>
                {" "}
                <GreenText bold>{userWatchedList}</GreenText>{" "}
                <Text text="Filmes assistidos" bold />
              </Row>
              <Row baseline responsive>
                {" "}
                <GreenText bold> {userFavoriteMovies.length} </GreenText>{" "}
                <Text text="Filmes favoritados" bold />
              </Row>
              <Row baseline responsive>
                {" "}
                <GreenText bold> 100 </GreenText>{" "}
                <Text text="Amigos cinéfilos" bold />
              </Row>
            </Row>
            <Row space responsive>
              <div className="border border-primaryBg p-4 rounded-lg w-fit text-sm gap-y-2 flex flex-col">
                {userMostRepeatedCategoryName &&
                userMostRepeatedCategoryName !== "" &&
                userFavoriteMovies.length > 0 ? (
                  <>
                    <p>
                      O gênero preferido do Michas é: {" "}
                      <GreenText bold>{userMostRepeatedCategoryName}</GreenText>
                    </p>
                    <p>
                      Este usuário assistiu{" "}
                      <GreenText bold> {userMoviesCount}</GreenText> filmes
                      deste gênero{" "}
                    </p>
                  </>
                ) : (
                  <p>Michas ainda não assistiu filme.</p>
                )}
              </div>
              <div className="gap-2 flex flex-col w-full sm:w-fit">
                <Button fullWidth green={false} onlyBorder={false} small>
                  <BiSolidChat className="text-2xl" />
                  Enviar mensagem{" "}
                </Button>
                <Link
                  small
                  col={false}
                  to="/chat"
                  onlyBorder={false}
                  fullWidth
                  bgPrimary
                >
                  <IoPersonAdd className="text-lg" />
                  Seguir{" "}
                </Link>
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
            {userFavoriteMovies.length > 0 ? (

              <Slide scrollBar modules={[Pagination, Scrollbar, Navigation]}>
              {recentlyAdded.map((movie) => (
                <SwiperSlide className="py-10" key={movie.id}>
                  <div className="flex flex-col gap-y-2">
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
                    onClick={() => {
                      if(movies.length < 2){
                        clearMovies();
                      } else {
                        removeMovie(movie.id)
                      }
                    }}
                    green={false}
                    onlyBorder
                    small
                    fullWidth
                  >
                    Remover da lista <IoMdClose className="font-black" />
                  </Button>
                  </div>
                </SwiperSlide>
              ))}
            </Slide>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
                  Você ainda não assistiu nenhuma filme... Que pena. Vamos mudar isso!
                  <Link bgNotPrimary onlyBorder to="/movies">Navegar por Filmes</Link>
                </div>
              )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Title
              bold
              center={false}
              green={false}
              message="Todos os filmes da sua lista você encontra aqui"
            />
            <OrderBy
              movies={userFavoriteList}
              setMovies={setUserFavoriteList}
              absolute
            />
            {userFavoriteList.length > 0 ?(

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-3 w-full">
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
                    onClick={() => {
                      if(movies.length < 2){
                        clearMovies();
                      } else {
                        removeMovie(movie.id)
                      }
                    }}
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
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-xs text-bodyColor gap-y-4">
                  Você ainda não assistiu nenhuma filme... Que pena. Vamos mudar isso!
                  <Link bgNotPrimary onlyBorder to="/movies">Navegar por Filmes</Link>
                </div>
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
