// Card.tsx
import React, { useState } from 'react';
import { FaPlus, FaInfo, FaMinus } from 'react-icons/fa';
import { Movie } from '../models/Movie';
import ContextoDosFavoritos from '../contexts/Favoritos';

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const { title, poster_path, id } = movie;
  const { favoritos, addFavorito, removeFavorito } = React.useContext(
    ContextoDosFavoritos
  );
  const [isInfoExpanded, setInfoExpanded] = useState(false);

  const isFavorito = favoritos.some((favorito) => favorito.id === id);

  const handleToggleFavorito = () => {
    if (isFavorito) {
      removeFavorito(id);
    } else {
      addFavorito(movie);
    }
  };

  return (
    <div key={id} className="card-container mr-[30px] relative">
      <div className="image-container relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="w-[200px] h-[300px] object-cover mb-4"
          loading="lazy"
        />
        {!isFavorito && (
          <div
            className="icon-container absolute top-1/2 left-[100px] transform -translate-x-1/2 -translate-y-1/2"
            onClick={handleToggleFavorito}
          >
            <FaPlus
              className="cursor-pointer icon add-icon bg-green-400 text-green-900 border-2 border-green-800 rounded-full w-8 h-8 p-2"
            />
          </div>
        )}
        {isFavorito && (
          <div
            className="icon-container absolute top-1/2 left-[100px] transform -translate-x-1/2 -translate-y-1/2"
            onClick={handleToggleFavorito}
          >
            <FaMinus
              className="cursor-pointer icon remove-icon bg-red-400 text-red-900 border-2 border-red-800 rounded-full w-8 h-8 p-2"
            />
          </div>
        )}
      </div>
      <div className="absolute top-2 right-10 ">
        <FaInfo
          onClick={() => setInfoExpanded(!isInfoExpanded)}
          className="cursor-pointer icon info-icon bg-green-400 text-green-900 border-2 border-green-800 rounded-full w-8 h-8 p-2"
        />
      </div>
    </div>
  );
};

export default Card;