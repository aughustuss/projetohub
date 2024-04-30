import axios from "axios"
import { CommentCreateModel } from "models/entities/Comment";
import { LoginData } from "models/requests/LoginRequest";

const token = localStorage.getItem("userToken");
let bearerToken = "";
if(token){
    bearerToken = `Bearer ${JSON.parse(token)}`;
}
const youtubeApiKey = `${import.meta.env.VITE_API_YOUTUBE}`; 
const apiEndpoint = "http://localhost:5024/api";

// export const getMovieByIdService = async (id: string) => {
//     return await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
//         headers: {
//             Authorization: bearerToken,
//             Accept: "application/json"
//         }
//     })
// }

// export const getPopularMoviesService = async () => {
//     return await axios.get("https://api.themoviedb.org/3/movie/popular?language=pt-US&page=1", {
//         headers: {
//             Authorization: bearerToken,
//             Accept: "application/json"
//         }
//     })
// }

// export const getUpcomingMoviesService = async () => {
//     return await axios.get("https://api.themoviedb.org/3/movie/upcoming?language=pt-US&page=1", {
//         headers: {
//             Authorization: bearerToken,
//             Accept: "application/json"
//         }
//     })
// }

export const getMoviesCategoriesService = async () => {
    return await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=pt", {
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

export const loginService = async (data: LoginData) => {
    return await axios.post(`${apiEndpoint}/User/authenticate`, data);
}

export const getUserInfoByIdService = async (id: string) => {
    return await axios.get(`${apiEndpoint}/User/userById/${id}`)
}

export const addToFavoriteListService = async (id: number) => {
    return await axios.post(`${apiEndpoint}/User/favoriteMovies`, JSON.stringify(id), {
        headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
        }
    })
};

export const addToWatchedListService = async (id: string) => {
    return await axios.post(`${apiEndpoint}/User/watchedMovies`, id);
};

export const removeFromFavoriteListService = async (id: string) => {
    return await axios.delete(`${apiEndpoint}/User/favoriteMovie/${id}`, {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json"
        }
    });
};

export const getMoviesBasedOnItsGenreService = async (genre: string, page: number) => {
    return await axios.get(`${apiEndpoint}/Movie/movieByGenre/${genre}/${page}`);
}

export const getMoviesBasedOnItsTitleService = async (search: string) => {
    return await axios.get(`${apiEndpoint}/Movie/movieByName/${search}`);
}

export const getPopularMoviesService = async () => {
    return await axios.get(`${apiEndpoint}/Movie/popularMovies`);
}

export const getUpcomingMoviesService = async () => {
    return await axios.get(`${apiEndpoint}/Movie/upcomingMovies`);
}

export const getMovieByIdService = async (id: string) => {
    return await axios.get(`${apiEndpoint}/Movie/movieById/${id}`);
}

export const getUserInfoService = async () => {
    return await axios.get(`${apiEndpoint}/User/user`, {
        headers: {
            Authorization: bearerToken,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    });
}

export const addCommentToMovie = async (data: CommentCreateModel) => {
    return await axios.post(`${apiEndpoint}/Comment/comment`, data, {
        headers:{
            Authorization: bearerToken,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}