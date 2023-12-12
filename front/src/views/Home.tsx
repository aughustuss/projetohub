import Banner from "components/Banner";
import Categories from "components/Categories";
import Similar from "components/LastSearched";
import Trending from "components/Trending";
import LastTitleContext from "contexts/LastSearchedTitle";
import { MovieModel } from "models/entities/Movie";
import React from "react";
import { getMoviesBasedOnItsGenreService, getMoviesBasedOnItsTitleService } from "services/GetMoviesService";
const Home = () => {
  const { lastSearchedTitle } = React.useContext(LastTitleContext);
  const [similarMovies, setSimiliarMovies] = React.useState<MovieModel[]>([]);
  const [categorySimilarMovies, setCategorySimilarMovies] = React.useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    const searchSimilarMovies = async () => {
      Promise.resolve(
        getMoviesBasedOnItsTitleService(lastSearchedTitle)
          .then((response) => {
            setSimiliarMovies(response.data.results);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
      );
    };
    const typingTimeout = setTimeout(() => {
      searchSimilarMovies();
    }, 3000);

    return () => {
      clearTimeout(typingTimeout);
    };
  }, [lastSearchedTitle]);

  React.useEffect(() => {
    const mostRepeatedCategory = localStorage.getItem("mostFrequentCategory");
    if(mostRepeatedCategory){
      Promise.resolve(
        getMoviesBasedOnItsGenreService(1, mostRepeatedCategory).then((res) => setCategorySimilarMovies(res.data.results)).catch((err) => console.log(err))
      )
    }
  }, [])

  return (
    <>
      <main className="flex flex-col gap-y-[80px] pt-[120px] pb-[100px] w-full px-6 md:w-[85%] md:px-0 mx-auto">
        <Banner />

        <Categories />

        {/* <Network/> */}

        <Trending/>        

        <Similar isLoading={isLoading} lastSearchedTitle={lastSearchedTitle} similarMovies={similarMovies} categorySimilar={false} />

        <Similar isLoading={isLoading} similarMovies={categorySimilarMovies} categorySimilar />
      </main>
    </>
  );
};

export default Home;
