import axios from "axios"

const bearerToken = `Bearer ${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}`;

export const getMovieByIdService = async (id: string) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}

export const getPopularMoviesService = async () => {
    return await axios.get("https://api.themoviedb.org/3/movie/popular?language=pt-US&page=1", {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}

export const getUpcomingMoviesService = async () => {
    return await axios.get("https://api.themoviedb.org/3/movie/upcoming?language=pt-US&page=1", {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}

export const getMoviesCategoriesService = async () => {
    return await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=pt", {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}

export const getMoviesBasedOnItsGenreService = async (page: number, genre: string) => {
    return await
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}`, {
            headers: {
                Authorization: bearerToken,
                Accept: "application/json"
            }
        })
}