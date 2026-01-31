import moviesData from '@/lib/data/movies.json';
import ratingsDataRaw from '@/lib/data/ratings.json';
import { calcAvgRating } from '@/lib/utils';
import type { Movie, MovieCategory, Rating } from '@/lib/interfaces';

const ratingsData = ratingsDataRaw as Rating[];

export class MovieController {
  static getUnseenMovies(userId: string): Movie[] {
    const allUnseenMovies: Movie[] = [];

    moviesData.forEach(category => {
      const unseenMovies = category.movies.filter(movie => {
        const userRating = ratingsData.find(rating => rating.movieId === movie.id && rating.userId === userId);
        return !userRating;
      });

      const moviesWithAvgRatings = unseenMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        image: movie.image,
        rating: calcAvgRating(movie.id),
        releaseDate: movie.releaseDate
      }));

      allUnseenMovies.push(...moviesWithAvgRatings);
    });

    return allUnseenMovies.sort((a, b) => b.rating - a.rating);
  }
}