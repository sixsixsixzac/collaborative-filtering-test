import { NextResponse } from 'next/server';
import moviesData from '@/lib/data/movies.json';
import ratingsData from '@/lib/data/ratings.json';
import { calcAvgRating } from '@/lib/utils';
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
        const avgRating = calcAvgRating(movie.id);
        foundMovie = {
          id: movie.id,
          title: movie.title,
          image: movie.image,
          rating: avgRating,
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
    if (userId) {
      const ratings = ratingsData as Rating[];
      const existingRating = ratings.find(
        rating => rating.movieId === movieId && rating.userId === userId
      );
      if (existingRating) {
        userRating = existingRating.rating;
      }
    }

    return NextResponse.json({
      ...foundMovie,
      userRating
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}