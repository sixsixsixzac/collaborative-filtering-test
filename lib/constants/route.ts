export const ROUTES = {
  HOME: "/",
  MOVIE_DETAIL: "/movie",
} as const;

export const createMovieRoute = (movieId: string | number) => `${ROUTES.MOVIE_DETAIL}/${movieId}`;