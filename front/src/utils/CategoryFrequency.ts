import { AllCategories } from "data/Categories";
import { MovieModel } from "models/entities/Movie";

export const findTheMostRepeatedCategory = (movies: MovieModel[], localStorageName?: string) => {
    const categoryCount = new Map<number, number>();
    for (const movie of movies) {
      for (const genre of movie.genres) {
        const category = AllCategories.find(
          (cat) => cat.name === genre
        );
        if (category) {
          categoryCount.set(
            category.id,
            (categoryCount.get(category.id) || 0) + 1
          );
        }
      }
    }

    let mostFrequentCategory = 0;
    let maxCount = 0;
    for (const [categoryId, count] of categoryCount.entries()) {
      if (count > maxCount) {
        mostFrequentCategory = categoryId;
        maxCount = count;
      }
    }
    if(localStorageName)
      localStorage.setItem(localStorageName, JSON.stringify(mostFrequentCategory));
    return mostFrequentCategory;
  };