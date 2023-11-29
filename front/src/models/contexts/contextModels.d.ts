import { MovieModel } from "models/entities/movie";
import React from "react";


export interface ChildrenPropsModel {
    children: React.ReactNode
}


export interface SideBarContextModel {
    isToggled: boolean;
    setIsToggled: (val: boolean) => void;
    handleToggle: () => void
}


interface FavoritesMoviesContextModel {
    movies: MovieModel[];
    addMovie: (val: MovieModel) => void
    removeMovie: (val: number) => void
    movieExists: boolean
}