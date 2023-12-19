import React from "react";
import Perfil from "assets/sobre.jpeg";
import Title from "components/Title";
import { MovieModel } from "models/entities/Movie";
import Text from "components/Text";
import Row from "components/Row";
const Profile = () => {
  const [userFavoriteMovies, setUserFavoriteMovies] = React.useState<
    MovieModel[]
  >([]);
  const [userWatchedList, setUserWatchedList] = React.useState<number>();
  React.useEffect(() => {
    const watchedMovies = localStorage.getItem("watchedList");
    const favoriteMovies = localStorage.getItem("userFavoriteMovies");
    if (watchedMovies) {
      setUserWatchedList(JSON.parse(watchedMovies).length);
    }
    if (favoriteMovies) {
      setUserFavoriteMovies(JSON.parse(favoriteMovies));
    }
  }, []);
  console.log(userWatchedList, userFavoriteMovies);
  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <div className="flex flex-row items-start gap-x-4 h-[400px] bg-primaryBgBorder p-4 rounded-lg shadow-lg shadow-black/30">
          <div className="h-full w-1/4">
            <img
              src={Perfil}
              className="h-4/6 w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Title
              bold
              center={false}
              green={false}
              message="Micael AKA Michas - Um grande Cinéfilo"
            />
            <Row space>
                <Row baseline> <span className="text-primaryNeon underline font-bold" > {userWatchedList} </span> <Text text="Filmes assistidos" bold /></Row>
                <Row baseline> <span className="text-primaryNeon underline font-bold" > {userFavoriteMovies.length} </span> <Text text="Filmes favoritados" bold /></Row>
                <Row baseline> <span className="text-primaryNeon underline font-bold" > {userWatchedList} </span> <Text text="Filmes assistidos" bold /></Row>
            </Row>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
            <div>
                
            </div>
            <Title bold center={false} green={false} message="Filmes adicionados recentemente à lista de favoritos" />
        </div>
      </main>
    </>
  );
};

export default Profile;
