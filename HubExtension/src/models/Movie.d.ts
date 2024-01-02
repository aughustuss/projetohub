export interface Movie {
  id: number;
  title: string;
  genres: Array<{ id: number; name: string }>;
  budget: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;
}
