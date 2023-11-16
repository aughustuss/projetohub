import React from 'react'
import { MovieGenresContextModel, ChildrenPropsModel } from "models/contexts/contextModels";
import {MovieGenreModel} from 'models/entities/movieGenre'
import { getMoviesCategoriesService } from 'services/getMoviesService';
export const MovieGenreContext = React.createContext<MovieGenresContextModel>({
    genres: []
})

const MovieGenreContextProvider: React.FC<ChildrenPropsModel> = ({children}) => {

    const [genres, setGenres] = React.useState<MovieGenreModel[]>([]);

    const getMovieGenres = async () => {
        try {
            const genresData = await getMoviesCategoriesService();
            if(genresData){
                setGenres(genresData.data.genres);
            }
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getMovieGenres();
    }, [])
    console.log(genres)

    return (
        <MovieGenreContext.Provider value={{genres}}>
            {children}
        </MovieGenreContext.Provider>
    )
}

export default MovieGenreContext
export {MovieGenreContextProvider}