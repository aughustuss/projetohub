export interface MovieModel {
    age: number;
    backdropPath: string;
    backdropSource: string;
    posterSource: string;
    genres: Array<string>;
    languages: Array<string>;
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