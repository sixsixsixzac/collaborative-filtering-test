import { NextResponse } from 'next/server';
import moviesData from '@/lib/data/movies.json';
import ratingsDataRaw from '@/lib/data/ratings.json';

type Rating = {
  id: number;
  movieId: number;
  userId: string;
  rating: number;
};

const ratingsData = ratingsDataRaw as Rating[];

function calcAvgRating(movieId: number): number {
  const movieRatings = ratingsData.filter(rating => rating.movieId === movieId);
  if (movieRatings.length === 0) return 0;
  

  const ratingSum = movieRatings.reduce((sum, rating) => sum + rating.rating, 0);
  const avgRating = ratingSum / movieRatings.length;

  return Number(avgRating.toFixed(1));
}

export async function GET() {
  try {
    const movieCategories = moviesData.map(category => {
      const moviesWithRatings = category.movies.map(movie => {
        const movieWithRating = {
          id: movie.id,
          title: movie.title,
          image: movie.image,
          rating: calcAvgRating(movie.id),
          releaseDate: movie.releaseDate
        };

        return movieWithRating;
      });

      const categoryWithRatings = {
        name: category.name,
        movies: moviesWithRatings
      };

      return categoryWithRatings;
    });

    return NextResponse.json(movieCategories);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}