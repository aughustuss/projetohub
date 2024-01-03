import axios from "axios"

const bearerToken = `Bearer ${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}`;
const youtubeApiKey = `${import.meta.env.VITE_API_YOUTUBE}`; 


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

export const getMoviesBasedOnItsTitleService = async (search: string) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}

export const getTrendingMovies = async () => {
    return axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    })
}


  export const getVideoIdFromTitle = async (movieTitle: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${movieTitle}&key=${youtubeApiKey}&part=snippet&type=video`
      );
  
      if (response.status === 200) {
        const videos = response.data.items;
  
        if (videos.length > 0) {
          return videos[0].id.videoId;
        } else {
          console.error('Nenhum vídeo encontrado para o título fornecido.');
          return null;
        }
      } else {
        console.error(`Erro na solicitação ao YouTube: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Erro na solicitação ao YouTube:', (error as Error).message);
      return null;
    }
  };