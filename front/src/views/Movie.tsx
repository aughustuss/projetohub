import MovieInfo from "components/MovieInfo";
import CommentSection from "components/ComentSection";
import { useParams } from "react-router-dom";
import authorImage from '../assets/sobre.jpeg';


const Movie = () => {
  const { movieId } = useParams();
  const comments = [
    { id: 1, author: 'Augusto Pereira', date: '2023-01-01', text: 'Muitoooo bommm!', likes: 10, profileImage: authorImage },
    { id: 2, author: 'Micael Oliveira', date: '2023-01-02', text: 'Filme muito bom mesmo', likes: 5, profileImage: authorImage },
    { id: 3, author: 'Carlos', date: '2023-01-03', text: 'esse filme é muito ruimm', likes: 2, profileImage: authorImage },
  ];
  return (
    <>
      <main className="flex flex-col gap-y-6">
      <MovieInfo movieId={movieId} />
      <CommentSection comments={comments}/>
      </main>
    </>
  )
    
};

export default Movie;
