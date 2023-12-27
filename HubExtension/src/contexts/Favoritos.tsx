import React from "react";
import { Movie } from "../models/Movie";

interface PropsDoContextoDosFavoritos {
  addFavorito: (movie: Movie) => void;
  favoritos: Movie[];
}

interface PropsDoProvider {
  children: React.ReactNode;
}
const ContextoDosFavoritos = React.createContext<PropsDoContextoDosFavoritos>({
  addFavorito: () => {},
  favoritos: [],
});

const ProviderDoContextoDosFavoritos: React.FC<PropsDoProvider> = ({
  children,
}) => {
  const [favoritos, setFavoritos] = React.useState<Movie[]>([]);

  const addFavorito = (movie: Movie) => {
    if (!favoritos.find((fav: Movie) => fav.id === movie.id)) {
      setFavoritos((prevFavoritos: Movie[]) => [...prevFavoritos, movie]);
    }
  };

  return (
    <ContextoDosFavoritos.Provider value={{ addFavorito, favoritos }}>
      {children}
    </ContextoDosFavoritos.Provider>
  );
};

export default ContextoDosFavoritos;
export {ProviderDoContextoDosFavoritos}