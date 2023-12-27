// Card.tsx
import React, { useState } from 'react';
import { FaPlus, FaInfo } from 'react-icons/fa';
import { Movie } from '../models/Movie';
import ContextoDosFavoritos from '../contexts/Favoritos';

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie}) => {
  const { title, poster_path, id } = movie;
  const {addFavorito} = React.useContext(ContextoDosFavoritos);
  const [isInfoExpanded, setInfoExpanded] = useState(false);
  return (
    <div key={id} className="card-container mr-[30px] relative">
      <div className="image-container relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="w-[200px] h-[300px] object-cover mb-4"
          loading="lazy"
        />
        <div className="icon-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={() => addFavorito(movie)} >
          <FaPlus
            className="cursor-pointer icon add-icon bg-green-400 text-green-900 border-2 border-green-800 rounded-full w-8 h-8 p-2"
          />
        </div>
      </div>
      <div className="absolute top-2 right-10 z-10">
        <FaInfo onClick={() => setInfoExpanded(!isInfoExpanded)} className="cursor-pointer icon info-icon bg-green-400 text-green-900 border-2 border-green-800 rounded-full w-8 h-8 p-2" />
      </div>
    </div>
  );
};

export default Card;
