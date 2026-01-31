import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ratingsDataRaw from '@/lib/data/ratings.json'
import type { Rating } from '@/lib/interfaces'

const ratingsData = ratingsDataRaw as Rating[]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcAvgRating(movieId: number): number {
  const movieRatings = ratingsData.filter(rating => rating.movieId === movieId);
  if (movieRatings.length === 0) return 5;

  const ratingSum = movieRatings.reduce((sum, rating) => sum + rating.rating, 0);
  const avgRating = ratingSum / movieRatings.length;

  return Number(avgRating.toFixed(1));
}
