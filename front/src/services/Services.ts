import axios from "axios"
import { RoomModel } from "components/ProfileInfo";
import { CommentCreateModel } from "models/entities/Comment";
import { RateCreationModel } from "models/entities/Rate";
import { LoginData } from "models/requests/LoginRequest";
import { JoinRoomModel, MessageCreateModel } from "views/Chat";
import { UserConfirmAccount } from "views/ConfirmAccount";
import { ForgotPasswordModel } from "views/ForgotPassword";
import { UserRegister } from "views/Register";
import { ResetPasswordModel } from "views/ResetPassword";

const youtubeApiKey = `${import.meta.env.VITE_API_YOUTUBE}`; 
const apiEndpoint = import.meta.env.VITE_HUB_MOBIES_API_ENDPOINT;
export const imagesPath = import.meta.env.VITE_HUB_MOBVIES_IMG_PATH;

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

export const getUserInfoByIdService = async (token:string, id: number) => {
    return await axios.get(`${apiEndpoint}/User/user/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}

export const addToFavoriteListService = async (id: number, token: string) => {
    return await axios.post(`${apiEndpoint}/User/favoriteMovies`, JSON.stringify(id), {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
};

export const addToWatchedListService = async (id: number, token:string) => {
    return await axios.post(`${apiEndpoint}/User/watchedMovies`, JSON.stringify(id), {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
};

export const removeFromFavoriteListService = async (id: string, token: string) => {
    return await axios.delete(`${apiEndpoint}/User/favoriteMovie/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    });
};

export const getMoviesBasedOnItsGenreService = async (genre: string, page: number) => {
    return await axios.get(`${apiEndpoint}/Movie/movieByGenre/${genre}/${page}`);
}

export const getMoviesBasedOnItsTitleService = async (search: string, token:string) => {
    return await axios.get(`${apiEndpoint}/Movie/movieByName/${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    });
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

export const getUserInfoService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    });
}

export const addCommentToMovieService = async (data: CommentCreateModel, token: string) => {
    return await axios.post(`${apiEndpoint}/Comment/comment`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const addRateToMovieService = async (data: RateCreationModel, token: string) => {
    return await axios.post(`${apiEndpoint}/Rate/rate`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const checkIfUserRatedMovieService = async (movieId: string, token: string) => {
    return await axios.get(`${apiEndpoint}/User/rate/${movieId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const checkUserRoleService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/role`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getUserFavoriteListCountService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/favoriteMovies`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getCompanieForMovieCreateService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/Company/companies`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const createMovieService = async (data: FormData, token:string) => {
    return await axios.post(`${apiEndpoint}/Movie/movie`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        }
    })
}

export const registerUserService = async (data: UserRegister) => {
    return await axios.post(`${apiEndpoint}/User/user`, data, {
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    });
}

export const confirmAccountService = async (data: UserConfirmAccount) => {
    return await axios.post(`${apiEndpoint}/User/confirmAccount`, data, {
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const createCompanyService = async (data: FormData, token: string) => {
    return await axios.post(`${apiEndpoint}/Company/company`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        }
    })
}

export const getAllUsersService = async (token: string) => {
    return await axios.get(`${apiEndpoint}/User/users`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getUsersByNameService = async (name:string, token:string) => {
    return await axios.get(`${apiEndpoint}/User/usersByName/${name}`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const checkIfUserWatchedMovieService = async (token:string, id:number) => {
    return await axios.get(`${apiEndpoint}/User/watchedMovies/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const checkIfUserFavoritedMovieService = async (token:string, id:number) => {
    return await axios.get(`${apiEndpoint}/User/favoriteMovies/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const addProfileImageService = async (data: FormData, token:string) => {
    return await axios.put(`${apiEndpoint}/User/profileImage`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        }
    })
}

export const followUserService = async (token:string, id:number) => {
    return await axios.post(`${apiEndpoint}/User/friend`, id, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getUserFollowersService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/friends`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getUserFavoritedListService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/favoritedMovies`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const addChatRoomService = async (token:string, data: RoomModel ) => {
    return await axios.post(`${apiEndpoint}/Chat/chat`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getChatRoomsService = async (token:string) => {
    return await axios.get(`${apiEndpoint}/User/chats`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const getChatMessagesService = async (token:string, chatId:number) => {
    return await axios.get(`${apiEndpoint}/Chat/${chatId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const addMessageToChatService = async (data: MessageCreateModel, token:string) => {
    return await axios.post(`${apiEndpoint}/Chat/message`, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    } )
}

export const joinRoomService = (data: JoinRoomModel) => {
    return axios.post(`${apiEndpoint}/Room/join`, data  ,{
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const forgotPasswordService = async (data: ForgotPasswordModel) => {
    return await axios.post(`${apiEndpoint}/User/forgotPassword`, data, {
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}

export const resetPasswordService = async (data: ResetPasswordModel) => {
    return await axios.post(`${apiEndpoint}/User/resetPassword`, data,{
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        }
    })
}