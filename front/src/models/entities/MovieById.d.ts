import { MovieModel } from "./Movie";
import { UserShortProfileModel } from "./User";

export interface MovieByIdModel extends MovieModel {
    companies: Array<MovieCompanyModel>;
    languages: Array<string>;
    comments: Array<MovieCommentsModel>;
    budget: number;
    homePage?: string;
    imdbIb?: string;
    revenue: number;
    runtime: number;
    status: MovieStatusModel
    tagline: string;
}

export enum MovieStatusModel {
    Released = "Lançado",
    NotReleased = "Não Lançado",
}
export interface MovieCompanyModel {
    id: number;
    logoPath: string;
    name: string;
    originalCountry: string;
}

export interface MovieCompanyRegisterModel {
    id: number;
}

export interface MovieByIdSpokenLanguagesModel {
    english_name: string;
    iso_639_1: string;
    name: string;
}
export interface MovieCommentsModel {
    text: string;
    creationDate: Date;
    author: UserShortProfileModel;
}