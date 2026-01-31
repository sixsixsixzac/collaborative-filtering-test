import { NextResponse } from 'next/server';
import ratingsData from '@/lib/data/ratings.json';
import fs from 'fs';
import path from 'path';
import type { Rating, Movie, MovieCategory } from '@/lib/interfaces';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    const { movieId: movieIdParam } = await params;
    const movieId = parseInt(movieIdParam);
    const body = await request.json();
    const { userId, rating } = body;

 
    if (isNaN(movieId)) return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
    if (!userId) return NextResponse.json({ error: 'Valid user ID' }, { status: 400 });
    

    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must between 1 and 5' }, { status: 400 });
    }


    const moviesData: MovieCategory[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'lib/data/movies.json'), 'utf8'));
    const movieExists = moviesData.some((c: MovieCategory) => c.movies.some((m: Movie) => m.id === movieId));

    if (!movieExists) return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    

    const ratings = ratingsData as Rating[];
    const existingRatingIndex = ratings.findIndex(r => r.movieId === movieId && r.userId === userId);

    if (existingRatingIndex !== -1) {
      ratings[existingRatingIndex].rating = rating;
    } else {
      const newRating: Rating = {
        id: Math.max(...ratings.map(r => r.id), 0) + 1,
        movieId,
        userId,
        rating
      };
      ratings.push(newRating);
    }

    fs.writeFileSync(
      path.join(process.cwd(), 'lib/data/ratings.json'),
      JSON.stringify(ratings, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: 'Rating submitted successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}