import axios from "axios"

export const getMovieByIdService = async (id: string) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}`,
            Accept: "application/json"
        }
    })
}