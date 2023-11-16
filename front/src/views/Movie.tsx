import MovieInfo from "components/movieInfo";
import { useParams } from "react-router-dom";

const Movie = () => {
  const { movieId } = useParams();
  console.log(movieId)
  return (
    <>
      <MovieInfo movieId={movieId} />
    </>
  )
    
};

export default Movie;
