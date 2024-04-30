import { MovieModel } from "./Movie";

export interface UserProfileModel {
    firstName: string;
    surName: string;
    nickName: string;
    profileTitle: string;
    profileImage?: string;
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
    profileImage: string;
    firstName: string;
    surName: string;
    nickName: string;
    profileTitle: string;
    watchedMoviesCount: number;
    friendsCount: number;
}