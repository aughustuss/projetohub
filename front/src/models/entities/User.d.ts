import { MovieModel } from "./Movie";

export interface UserProfileModel {
    id:number;
    firstName: string;
    surName: string;
    nickName: string;
    profileTitle: string;
    profileImageSource: string;
    lastSearchedTitle?: string,
    favoriteGenre: string,
    email: string;
    role: Role;
    creationDate: Date,
    favoriteMovies: Array<MovieModel>;
    watchedMovies: Array<WatchedMovieListModel>;
    watchedMoviesCount: number;
    friends: number;
}

export enum Role {
    Admin,
    User
}

interface WatchedMovieListModel {
    id: number;
    genres: Array<string>[];
}

export interface UserShortProfileModel {
    id:number;
    profileImageSource: string;
    firstName: string;
    surName: string;
    nickName: string;
    profileTitle: string;
    watchedMoviesCount: number;
    friendsCount: number;
}