import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";
import React from "react";
import { useLocation } from "react-router-dom";
import { getMoviesBasedOnItsTitleService } from "services/GetMoviesService";
import Movie from "shared/Movie";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "components/Button";
import OrderBy from "components/OrderBy";
import { findTheMostRepeatedCategory } from "utils/CategoryFrequency";
const SearchedMovies = () => {
  const location = useLocation();
  const movieName = new URLSearchParams(location.search).get("movieName");
  const [isFilterOpen, setFilterOpen] = React.useState<boolean>(false);
  const selectedCategories: number[] = [];

  const [categorizedMovies, setCategorizedMovies] = React.useState<
    MovieModel[]
  >([]);
  const [filteredMovies, setFilteredMovies] = React.useState<MovieModel[]>([]);


  const handleFilterOpen = (
    setArray: React.Dispatch<React.SetStateAction<boolean>>,
    val: boolean
  ) => {
    setArray(!val);
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

  const findTheMostRepeatedCategoryService = (movies: MovieModel[]) => {
    return findTheMostRepeatedCategory(movies, "mostFrequentCategory");
  };

  const filterMovies = (
    movies: MovieModel[],
    selectedCategories: number[]
  ): MovieModel[] => {
    if (selectedCategories.length > 0) {
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
            findTheMostRepeatedCategoryService(movies);
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
        <div className="w-full md:w-[20%] flex flex-col justify-start gap-y-2  text-bodyColor text-sm h-fit  shadow-lg border border-primaryBgBorder p-4 rounded-lg">
          <div className=" w-full flex flex-col gap-4 border border-primaryBgBorder bg-primaryBg rounded-md h-fit p-4 shadow-lg shadow-black/40">
            <div className="flex flex-row items-center w-full justify-between ">
              Filtrar apenas por{" "}
              <MdKeyboardArrowDown
                onClick={() => handleFilterOpen(setFilterOpen, isFilterOpen)}
                className={` ${
                  isFilterOpen ? "rotate-0" : "rotate-180"
                } text-lg transition-all duration-300 cursor-pointer`}
              />
            </div>

            {isFilterOpen && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3 w-full">
                {AllCategories.map((cat) => (
                  <label
                    className="flex flex-row gap-1 items-center text-xs gap-y-2 overflow-hidden "
                    htmlFor={cat.name}
                    key={cat.id}
                  >
                    <input
                      onChange={(e) => handleCategoryChange(e)}
                      className="accent-primary w-5 h-5 md:w-4 md:h-4"
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
                  fullWidth
                >
                  Filtrar
                </Button>
              </div>
            )}
          </div>
          <OrderBy absolute={false} fullWidth movies={filteredMovies} setMovies={setFilteredMovies} />
        </div>
        <div className="w-full md:w-[80%] relative">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Movie
                  movie={movie}
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
