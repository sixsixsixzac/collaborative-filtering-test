import { NextResponse } from 'next/server';
import moviesData from '@/lib/data/movies.json';
import { calcAvgRating } from '@/lib/utils';
import { predictedRate } from '@/lib/utils/prediction';
import ratingsDataRaw from '@/lib/data/ratings.json';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const unseenMovies = moviesData.flatMap(category =>
      category.movies.filter(movie => {
        const userRating = ratingsDataRaw.find(rating => rating.movieId === movie.id && rating.userId === userId);
        return !userRating;
      })
    );

    const recommendMovies = unseenMovies.map(movie => {
      const predictedRating = predictedRate(userId, movie.id);
      return {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        releaseDate: movie.releaseDate,
        rating: predictedRating ?? 5.0,
      };
    }).sort((a, b) => b.rating - a.rating).slice(0, 6);

    const recommendCategory = {
      name: 'Recommended',
      movies: recommendMovies
    };  

    const movieCategories = moviesData.map(category => {
      const moviesWithRatings = category.movies.map( movie => {
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

    const allCategories = [recommendCategory, ...movieCategories];

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Fail' }, { status: 500 });
  }
}