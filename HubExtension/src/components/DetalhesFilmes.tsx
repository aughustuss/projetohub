// DetalhesDoFilme.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieByIdService } from "../services/getMoviesService";
import { Movie } from '../models/Movie';
import ContextoDosFavoritos from '../contexts/Favoritos';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const DetalhesDoFilme: React.FC = () => {
  const { id = '' } = useParams();
  const [detalhes, setDetalhes] = useState<Movie | null>(null);
  
  const { favoritos, addFavorito, removeFavorito } = React.useContext(
    ContextoDosFavoritos
  );

  const isFavorito = favoritos.some((favorito) => favorito.id === parseInt(id, 10));

  const handleToggleFavorito = () => {
    if (detalhes) {
      if (isFavorito) {
        removeFavorito(detalhes.id);
      } else {
        addFavorito(detalhes);
      }
    }
  };

  useEffect(() => {
    const fetchDetalhes = async () => {
      try {
        const response = await getMovieByIdService(id);
        setDetalhes(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes do filme", error);
      }
    };

    fetchDetalhes();
  }, [id]);

  if (!detalhes) {
    return <div>Carregando...</div>;
  }

  const {
    title,
    genres,
    budget,
    release_date,
    overview,
    vote_average,
    backdrop_path,
  } = detalhes;

  return (
    <>  
        {backdrop_path && (
            <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
            style={{ maxWidth: "100%" }}
            className='h-[450px] w-full'
            />
        )}
        <div className='w-[80%] h-[390px] bg-gray-800 absolute top-1/2 left-[80px] rounded-2xl'>
            <div className='mt-[20px] ml-[30px] absolute'>
                <h2 className='font-bold mb-[30px] text-[30px]'>{title}</h2>
                <p className='mb-[20px] w-[550px] text-justify'>{overview}</p>
                <p>Gêneros: {genres.map((genre: any) => genre.name).join(", ")}</p>
                <p>Orçamento: ${budget}</p>
                <p>Lançamento: {release_date}</p>                
                <p className='mb-[40px]'>Nota: {vote_average}</p>
                <Link to='/home' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Voltar para Inicio
                </Link>
            </div>
        </div>          
        
        {!isFavorito && (
            <div
                className="icon-container absolute top-1/2 left-[600px] transform -translate-x-1/2 -translate-y-1/2"
                onClick={handleToggleFavorito}
            >
                <FaPlus
                className="cursor-pointer icon add-icon bg-green-400 text-green-900 border-2 border-green-800 rounded-full w-12 h-12 p-2"
                />
            </div>
            )}
            {isFavorito && (
            <div
                className="icon-container absolute top-1/2 left-[600px] transform -translate-x-1/2 -translate-y-1/2"
                onClick={handleToggleFavorito}
            >
                <FaMinus
                className="cursor-pointer icon remove-icon bg-red-400 text-red-900 border-2 border-red-800 rounded-full w-12 h-12 p-2"
                />
            </div>
        )}
    </>
  );
};

export default DetalhesDoFilme;
