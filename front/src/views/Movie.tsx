import MovieInfo from "components/MovieInfo";
import { useParams } from "react-router-dom";


const Movie = () => {
  const { movieId } = useParams();
  return (
    <>
      <main className="flex flex-col gap-y-6 min-h-screen">
        <MovieInfo movieId={movieId} />
      </main>
    </>
  )
    
};

export default Movie;
