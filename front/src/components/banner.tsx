import React from "react";
import { MovieModel } from "models/entities/Movie";
import Slide from "shared/Slide";
import { SwiperSlide } from "swiper/react";
import { BsPlayFill, BsPlus } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import useMediaQuery from "hooks/MediaScreen";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import {
  addToFavoriteListService,
  getPopularMoviesService,
  getUpcomingMoviesService,
  getUserFavoritedListService,
} from "services/Services";
import Loading from "views/Loading";
import Title from "./Title";
import { Link } from 'react-router-dom';
import LoginContext from "contexts/LoginContext";
import { FaCheck } from "react-icons/fa6";

const Banner = () => {
  const [popularMovies, setPopularMovies] = React.useState<MovieModel[]>([]);
  const [upComingMovies, setUpComingMovies] = React.useState<MovieModel[] >([]);
  const {token} = React.useContext(LoginContext);
  const [movieAlreadyAdded, setMovieAlreadyAdded] = React.useState<boolean>(false);
  const [userFavoritedList, setUserFavoritedList] = React.useState<number[]>([]);
  
  const [loadingMovies, setLoadingMovies] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    Promise.resolve(
      getPopularMoviesService()
       .then((res) => {
          setPopularMovies(res.data);
          setLoadingMovies(false);
        })
       .catch((err: unknown) => {
          console.log(err);
        })
    )
    Promise.resolve(
      getUpcomingMoviesService()
       .then((res) => {
          setUpComingMovies(res.data);
          setLoadingMovies(false);
        })
       .catch((err: unknown) => {
          console.log(err);
        })
    )
    getUserFavoritedList();
  },[])

  const getUserFavoritedList = async () => {
    try{
      const response = await getUserFavoritedListService(token);
      if(response.status === 200){
        setUserFavoritedList(response.data);
      }
      console.log(response);
    } catch (error){
      console.log(error);
    }
  }

  const addMovieToFavoriteList = async (id:number) => {
    if(id){
      try{
        const response = await addToFavoriteListService(id, token);
        if(response.status === 200)
          setMovieAlreadyAdded(true);
      } catch(error){
        console.log(error);
      }
    }
  }

  const isAboveSM = useMediaQuery("(min-width: 400px)");
  if(loadingMovies){
    return <Loading big/>
  }
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-10 min-h-[550px] h-auto">
        <Slide scrollBar={false} modules={[Navigation, Pagination, EffectCoverflow]}>
          {popularMovies && popularMovies.map((movie: MovieModel) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-[550px] z-0 bg-none">
                <div className="relative h-[85%] w-full">
                  <img
                    src={movie.posterSource}
                    className="object-cover w-full h-full rounded-lg bg-none"
                  />
                  <div className="bg-black absolute inset-0 h-full w-full z-10 opacity-50 rounded-lg" />
                </div>
                {/* Segundo poster */}
                <div className="absolute h-2/3 w-2/3 lg:w-1/3 z-30 left-6 bottom-0 ">
                  <div className="relative h-full w-full">
                    <img
                      src={movie.backdropSource}
                      className="rounded-lg object-cover h-full w-full"
                    />
                    <div className="bg-black absolute inset-0 h-full z-10 w-full opacity-25 rounded-lg" />
                    <button onClick={() => {
                      if(!movieAlreadyAdded && !userFavoritedList.includes(movie.id)){
                        addMovieToFavoriteList(movie.id)}
                      }
                      } className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-primary text-iconSize font-black z-40 hover:bg-primary/90 transition duration-300 active:scale-95 ${userFavoritedList.includes(movie.id) && "cursor-not-allowed" } `}>
                      
                      {!movieAlreadyAdded && !userFavoritedList.includes(movie.id) ? <BsPlus /> : <FaCheck/> }
                    </button>
                  </div>
                </div>
                {/* Titulo e assista ao trailer */}
                <div className="absolute right-1/2 lg:right-1/4 top-16 lg:top-auto lg:bottom-1/3 translate-x-1/2 lg:translate-y-1/2 w-full max-w-[260px] lg:max-w-[200px] xl:max-w-[300px] text-center z-20 flex flex-row items-center h-[60px] gap-x-2">
                <Link to={`/trailer/${encodeURIComponent(movie.originalTitle)}`} className="border-2 border-primaryNeon p-3 rounded-full flex flex-col items-center justify-center text-iconSize hover:bg-primaryNeon cursor-pointer transition duration-300">
                    <BsPlayFill />
                </Link>
                  <div className="flex flex-col gap-y-0 justify-center h-full w-full text-start">
                    <a
                      href={`/movie/${movie.id}`}
                      className="text-primaryNeon font-black text-subTitle xl:text-navTitle font-title p-0 leading-8 "
                    >
                      {movie.originalTitle}
                    </a>
                    <span className="text-body">Assista o trailer</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Slide>
        <div className="w-full h-full flex flex-col justify-between gap-y-4">
          <Title bold center={false} black message="Novidades"/>
          {!isAboveSM ? (
            <Slide movies={false} scrollBar={false} modules={[Navigation, Pagination, EffectCoverflow]}>
              {upComingMovies && upComingMovies.slice(0, 4).map((movie: MovieModel) => (
                <SwiperSlide key={movie.id} className="flex flex-row gap-x-4 h-[110px] p-2 border border-border rounded-lg hover:bg-border transition duration-300 cursor-pointer">
                  <img
                    src={movie.backdropSource}
                    className="w-full h-[100px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-y-4 text-body text-bodyColor">
                    <a href={`/movie/${movie.id}`} className="font-title text-subTitle font-black">
                      {movie.originalTitle}
                    </a>
                    <p className="line-clamp-2 text-body">
                      {movie.overview}...
                    </p>
                    <div className="flex flex-row items-center text-xs gap-x-2">
                      <span className="text-yellow-600">
                        <AiFillStar />
                      </span>
                      <span>
                        {movie.voteAverage}/{movie.voteCount}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Slide>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:flex lg:flex-col w-full ">
              {upComingMovies && upComingMovies.slice(0, 4).map((movie: MovieModel) => (
                <a
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex flex-row gap-x-4 h-[110px] p-2 border border-border rounded-lg hover:bg-border transition duration-300 cursor-pointer"
                >
                  <img
                    src={movie.posterSource}
                    className="min-w-[100px] h-full object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-y-4 text-body text-bodyColor">
                    <p className="font-title text-smallDevicesTitle font-black line-clamp-1">
                      {movie.originalTitle}
                    </p>
                    <p className="line-clamp-1">{movie.overview}...</p>
                    <div className="flex flex-row items-center text-xs gap-x-2">
                      <span className="text-yellow-600">
                        <AiFillStar />
                      </span>
                      <span>
                        {movie.voteAverage}/{movie.voteCount}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Banner;
