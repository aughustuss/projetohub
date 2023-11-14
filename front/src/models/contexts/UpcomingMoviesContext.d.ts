import { MovieModel } from "models/entities/Movie";

interface UpcomingMoviesModel {
    upMovies: MovieModel[];
    loading: boolean;
}