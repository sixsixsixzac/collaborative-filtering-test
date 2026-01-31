export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  releaseDate: string;
}

export interface MovieCategory {
  name: string;
  movies: Movie[];
}

export interface Rating {
  id: number;
  movieId: number;
  userId: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
}