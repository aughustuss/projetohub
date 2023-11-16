import { MovieModel } from "models/entities/movie";
import { MovieByIdGenresModel } from "models/entities/movieById";
import React from "react";


export interface ChildrenPropsModel {
    children: React.ReactNode
}

export interface PopularMoviesContextModel {
    movies: MovieModel[];
    setMovies: (val: MovieModel[]) => void;
    loading: boolean;
}

export interface SideBarContextModel {
    isToggled: boolean;
    setIsToggled: (val: boolean) => void;
    handleToggle: () => void
}

interface UpcomingMoviesContextModel {
    upMovies: MovieModel[];
    loading: boolean;
}

interface MovieGenresContextModel {
    genres: MovieByIdGenresModel[];
}