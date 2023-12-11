import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useLocation } from "react-router-dom";
import { getMoviesBasedOnItsTitleService } from "services/GetMoviesService";
import Movie from "shared/Movie";
import { IoMdArrowDropup } from "react-icons/io";
import Button from "components/Button";
import useMediaQuery from "hooks/MediaScreen";
const SearchedMovies = () => {
  const isAboveMD = useMediaQuery("(min-width: 768px)");
  const location = useLocation();
  const movieName = new URLSearchParams(location.search).get("movieName");
  const [isFilterOpen, setFilterOpen] = React.useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = React.useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    []
  );

  const [categorizedMovies, setCategorizedMovies] = React.useState<
    MovieModel[]
  >([]);
  const [filteredMovies, setFilteredMovies] = React.useState<MovieModel[]>([]);

  const openMovieInfo = (movieId: number) => {
    setSelectedMovie(movieId);
  };

  const closeMovieInfo = () => {
    setSelectedMovie(null);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = Number(e.target.value);
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
      selectedCategories.push(category);
    } else {
      selectedCategories.splice(index, 1);
    }
  };

  const handleFilterClick = () => {
    setFilteredMovies(filterMovies(categorizedMovies, selectedCategories));
  };

  const findTheMostRepeatedCategory = (movies: MovieModel[]) => {
    const categoryCount = new Map<number, number>();
    for (const movie of movies){
      for (const genre of movie.genre_ids){
        const categoryId = AllCategories.find((cat) => cat.id === Number(genre));
        if(categoryId){
          categoryCount.set(categoryId.id, (categoryCount.get(categoryId.id) || 0) + 1);
        }
      }
    }

    let mostFrequentCategoryCount = 0;
    let maxCount = 0;
    for(const [categoryId, count] of categoryCount.entries()){
      if(count > maxCount){
        mostFrequentCategoryCount = categoryId;
        maxCount = count;
      }
    }
    localStorage.setItem("mostFrequentCategory", JSON.stringify(mostFrequentCategoryCount));
    return mostFrequentCategoryCount;
  }

  const filterMovies = (movies: MovieModel[],selectedCategories: number[]): MovieModel[] => {
    if(selectedCategories.length > 0){

      return movies.filter((movie) => {
        for (const genre of movie.genre_ids) {
          const categoryId = AllCategories.find(
            (cat) => cat.id === Number(genre)
            );
            if (categoryId && selectedCategories.includes(categoryId.id)) {
              return true;
            }
          }
          return false;
        });
      } else {
        return categorizedMovies;
      }
  };

  React.useEffect(() => {
    if (movieName) {
      Promise.resolve(
        getMoviesBasedOnItsTitleService(movieName)
          .then((res) => {
            const movies = res.data.results;
            setCategorizedMovies(movies);
            setFilteredMovies(movies);
            findTheMostRepeatedCategory(movies);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    }
  }, [movieName]);
  return (
    <>
      <main className="pb-[100px] pt-[120px] min-h-screen w-[85%] flex flex-col gap-4 md:flex-row mx-auto">
        <div className="w-full md:w-[20%] flex flex-col justify-start gap-y-4 sticky border border-primaryBgBorder rounded-lg shadow-md h-fit p-6 text-bodyColor">
          {isAboveMD ? (
            <>
              <p className="text-sm self-start">Filtrar apenas por</p>
              <div className="flex flex-col gap-3">
                {AllCategories.map((cat) => (
                  <label
                    className="flex flex-row gap-1 items-center text-xs gap-y-2 overflow-hidden"
                    htmlFor={cat.name}
                    key={cat.id}
                  >
                    <input
                      onChange={(e) => handleCategoryChange(e)}
                      className="accent-primary"
                      type="checkbox"
                      name=""
                      id={cat.name}
                      value={cat.id}
                    />
                    {cat.name}
                  </label>
                ))}
                <Button
                  onClick={() => handleFilterClick()}
                  small
                  type="button"
                  onlyBorder={false}
                  green
                >
                  Filtrar
                </Button>
              </div>
            </>
          ) : (
            <div
              
              className="text-sm w-full flex flex-col gap-4"
            >
              <div className="flex flex-row items-center w-full justify-between">
                Filtrar apenas por{" "}
                <IoMdArrowDropup
                  onClick={() => handleFilterOpen()}
                  className={` ${
                    isFilterOpen ? "rotate-0" : "rotate-180"
                  } text-lg transition-all duration-300`}
                />
              </div>

              {isFilterOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                  {AllCategories.map((cat) => (
                    <label
                      className="flex flex-row gap-1 items-center text-xs gap-y-2 overflow-hidden"
                      htmlFor={cat.name}
                      key={cat.id}
                    >
                      <input
                        onChange={(e) => handleCategoryChange(e)}
                        className="accent-primary w-5 h-5"
                        type="checkbox"
                        name=""
                        id={cat.name}
                        value={cat.id}
                      />
                      {cat.name}
                    </label>
                  ))}
                  <Button
                    onClick={() => handleFilterClick()}
                    small
                    type="button"
                    onlyBorder={false}
                    green
                  >
                    Filtrar
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-full md:w-[80%] relative">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Movie
                  movie={movie}
                  closeMovieInfo={closeMovieInfo}
                  selectedMovieId={selectedMovie}
                  openMovieInfo={() => openMovieInfo(movie.id)}
                  key={movie.id}
                  onGrid
                />
              ))
            ) : (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm italic text-bodyColor pt-20">
                Não há nenhum filme para a categoria selecionada.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchedMovies;
