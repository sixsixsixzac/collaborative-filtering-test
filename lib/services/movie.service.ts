import type { Movie } from "@/lib/interfaces";

export class MovieService {
  static async getMovieDetails(movieId: string, userId?: string): Promise<Movie> {
    const response = await fetch(`/api/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId || null,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to load movie');
    }

    return response.json();
  }

  static async rateMovie(movieId: string, rating: number, userId: string): Promise<void> {
    const response = await fetch(`/api/movies/${movieId}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        rating,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to rate movie');
    }
  }
}