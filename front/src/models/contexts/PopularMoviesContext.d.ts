import { MovieModel } from "models/entities/Movie";

export interface PopularMoviesContextModel {
    movies: MovieModel[];
    setMovies: (val: MovieModel[]) => void;
    loading: boolean;
}