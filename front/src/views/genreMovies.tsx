import React from 'react'
import { useParams } from 'react-router-dom';

const GenreMovies = () => {
  const {movieGenre} = useParams();
  console.log(movieGenre)
  return (
    <>
      {movieGenre}
    </>
  )
}

export default GenreMovies;