// Favoritos.tsx
import React from "react";
import { Movie } from "../models/Movie";

interface PropsDoContextoDosFavoritos {
  addFavorito: (movie: Movie) => void;
  removeFavorito: (movieId: number) => void;
  favoritos: Movie[];
}

interface PropsDoProvider {
  children: React.ReactNode;
}

const ContextoDosFavoritos = React.createContext<PropsDoContextoDosFavoritos>({
  addFavorito: () => {},
  removeFavorito: () => {},
  favoritos: [],
});

const ProviderDoContextoDosFavoritos: React.FC<PropsDoProvider> = ({
  children,
}) => {
  const [favoritos, setFavoritos] = React.useState<Movie[]>(() => {
   const localStorageFavoritos = localStorage.getItem("favoritos");
    return localStorageFavoritos ? JSON.parse(localStorageFavoritos) : [];
  });

  const addFavorito = (movie: Movie) => {
    setFavoritos((prevFavoritos: Movie[]) => {
      if (!prevFavoritos.some((fav: Movie) => fav.id === movie.id)) {
        const newFavoritos = [...prevFavoritos, movie];
        localStorage.setItem("favoritos", JSON.stringify(newFavoritos));
        return newFavoritos;
      }
      return prevFavoritos;
    });
  };

  const removeFavorito = (movieId: number) => {
    setFavoritos((prevFavoritos: Movie[]) => {
      const updatedFavoritos = prevFavoritos.filter((fav: Movie) => fav.id !== movieId);
      localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));
      return updatedFavoritos;
    });
  };

  return (
    <ContextoDosFavoritos.Provider
      value={{ addFavorito, removeFavorito, favoritos }}
    >
      {children}
    </ContextoDosFavoritos.Provider>
  );
};

export default ContextoDosFavoritos;
export { ProviderDoContextoDosFavoritos };
