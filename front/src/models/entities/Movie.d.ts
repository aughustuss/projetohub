export interface MovieModel {
    isAdult: boolean;
    backdropPath: string;
    genres: Array<string>;
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    addedDate?: Date;
}