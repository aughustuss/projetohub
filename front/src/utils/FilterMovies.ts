import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";

export const filterMovies = (
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