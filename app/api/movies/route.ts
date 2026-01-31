import { NextResponse } from 'next/server';
import moviesData from '@/lib/data/movies.json';
import { calcAvgRating } from '@/lib/utils';
import { MovieController } from '@/lib/controllers/movie.controller';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

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


    const unseenMovies = MovieController.getUnseenMovies(userId);
    const unseenCategory = {
      name: 'Unseen',
      movies: unseenMovies
    };

    const allCategories = [unseenCategory, ...movieCategories];

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}