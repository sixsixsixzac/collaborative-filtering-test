import { NextResponse } from 'next/server';
import moviesData from '@/lib/data/movies.json';
import ratingsData from '@/lib/data/ratings.json';
import { calcAvgRating } from '@/lib/utils';
import { predictedRate } from '@/lib/utils/prediction';
import type { Rating } from '@/lib/interfaces';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    const { movieId: movieIdParam } = await params;
    const movieId = parseInt(movieIdParam);
    const body = await request.json();
    const userId = body.userId;

    if (isNaN(movieId)) return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });


    let foundMovie = null;
    for (const category of moviesData) {
      const movie = category.movies.find(m => m.id === movieId);
      if (movie) {
        foundMovie = {
          id: movie.id,
          title: movie.title,
          image: movie.image,
          rating: calcAvgRating(movie.id),
          releaseDate: movie.releaseDate,
          category: category.name
        };
        break;
      }
    }

    if (!foundMovie) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    let userRating = null;
    let displayRating = foundMovie.rating;

    if (userId) {
      const ratings = ratingsData as Rating[];
      const existingRating = ratings.find(
        rating => rating.movieId === movieId && rating.userId === userId
      );
      if (existingRating) {
        userRating = existingRating.rating;
      } else {
        const predicted = predictedRate(userId, movieId);
        if (predicted !== null) displayRating = predicted;
      }
    }

    return NextResponse.json({
      ...foundMovie,
      rating: displayRating,
      userRating
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}