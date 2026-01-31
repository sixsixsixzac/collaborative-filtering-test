type UserId = string;
type MovieId = number;
type Ratings = Record<UserId, Record<MovieId, number>>;

import ratingsData from '@/lib/data/ratings.json';
import type { Rating } from '@/lib/interfaces';


const ratings: Ratings = {};
for (const rating of ratingsData as Rating[]) {
  if (!ratings[rating.userId]) {
    ratings[rating.userId] = {};
  }
  ratings[rating.userId][rating.movieId] = rating.rating;
}

const users = () => Object.keys(ratings);

function similarity(a: UserId, b: UserId): number {
  if (a === b) return 1;

  const userA = ratings[a];
  const userB = ratings[b];
  if (!userA || !userB) return 0;

  const commonMovies = Object.keys(userA).filter(movie => userB[parseInt(movie)] !== undefined);
  if (commonMovies.length === 0) return 0;

  let sumDiff = 0;
  for (const movie of commonMovies) {
    const movieId = parseInt(movie);
    sumDiff += Math.abs(userA[movieId] - userB[movieId]);
  }
  const mad = sumDiff / commonMovies.length;

  return 1 / (1 + mad);
}

export function predictedRate(user: UserId, movie: number): number | null {
  const userRatings = ratings[user];
  if (userRatings && userRatings[movie] !== undefined) return userRatings[movie];

  let weightedSum = 0;
  let totalWeight = 0;

  for (const otherUser of users()) {
      if (otherUser === user) continue;

      const otherUserRatings = ratings[otherUser];
      if (!otherUserRatings) continue;

      const rating = otherUserRatings[movie];
      if (rating === undefined) continue;

      const sim = similarity(user, otherUser);
      if (sim <= 0) continue;

      weightedSum += sim * rating;
      totalWeight += sim;
  }

  if (totalWeight > 0) {
      return Number((weightedSum / totalWeight).toFixed(1));
  }

  let movieSum = 0;
  let movieCount = 0;

  for (const u of users()) {
      const userRatings = ratings[u];
      if (userRatings) {
          const rating = userRatings[movie];
          if (rating !== undefined) {
              movieSum += rating;
              movieCount++;
          }
      }
  }
  return movieCount > 0 ? Number((movieSum / movieCount).toFixed(1)) : null;
}