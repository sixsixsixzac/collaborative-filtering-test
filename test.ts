type UserId = string;
type MovieId = string;
type Ratings = Record<UserId, Record<MovieId, number>>;

enum Genre {
    ACTION = "action",
    COMEDY = "comedy",
    DRAMA = "drama"
}

interface MovieCategory { genre: Genre }
interface Categories { [movieId: string]: MovieCategory }
interface RecommendMovie { movieId: MovieId, rate: number }
const ratings: Ratings = {
    "user1": { "movieA": 5, "movieB": 3, "movieC": 4 },
    "user2": { "movieA": 4, "movieB": 2, "movieC": 5 },
    "user3": { "movieA": 3, "movieB": 5, "movieC": 1, "movieD": 4 },
    "user4": { "movieE": 5 }
}

const categories: Record<MovieId, MovieCategory> = {
    movieA: { genre: Genre.ACTION },
    movieB: { genre: Genre.COMEDY },
    movieC: { genre: Genre.DRAMA },
    movieD: { genre: Genre.ACTION },
    movieE: { genre: Genre.DRAMA },
};

const users = () => Object.keys(ratings);
const movies = () => Object.keys(categories);

function similarity(a: UserId, b: UserId): number {
    if (a === b) return 1;

    const userA = ratings[a];
    const userB = ratings[b];
    const commonMovies = Object.keys(userA).filter(movie => userB[movie] !== undefined);
    if (commonMovies.length === 0) return 0;

    let sumDiff = 0;
    for (const movie of commonMovies) { sumDiff += Math.abs(userA[movie] - userB[movie]); }
    const mad = sumDiff / commonMovies.length;

    return 1 / (1 + mad);
}
function predictedRate(user: UserId, movie: MovieId): number | null {
    if (ratings[user]?.[movie] !== undefined) return ratings[user][movie];

    let weightedSum = 0;
    let totalWeight = 0;

    for (const otherUser of users()) {
        if (otherUser === user) continue;

        const rating = ratings[otherUser]?.[movie];
        if (rating === undefined) continue;

        const sim = similarity(user, otherUser);
        if (sim <= 0) continue;

        weightedSum += sim * rating;
        totalWeight += sim;
    }

    if (totalWeight > 0) {
        return weightedSum / totalWeight;
    }

    let movieSum = 0;
    let movieCount = 0;
    
    for (const u of users()) {
        const rating = ratings[u]?.[movie];
        if (rating !== undefined) {
            movieSum += rating;
            movieCount++;
        }
    }
    const formattedMovieSum = (movieSum / movieCount).toFixed(1);
    return movieCount > 0 ? parseFloat(formattedMovieSum) : null;
}

function getRecommendMovies(userId: UserId, limit: number): RecommendMovie[] {
    const ratedMovies = Object.keys(ratings[userId]);
    const unseenMovies = movies().filter(movieId => !ratedMovies.includes(movieId));

    let predictedMovies: RecommendMovie[] = [];
    for (const movieId of unseenMovies) {
        const rate = predictedRate(userId, movieId);
        if (rate !== null) predictedMovies.push({ movieId, rate: rate ?? 0 });
    }

    predictedMovies.sort((a, b) => b.rate - a.rate);
    return predictedMovies.slice(0, limit);
}
console.log("===================Recommend Movies===================")
for (const user of users()) {
    console.log(`${user}:`, ratings[user]);
    const ratedMovies = Object.keys(ratings[user]);
    const unseenMovies = movies().filter(movieId => !ratedMovies.includes(movieId));
    const unseenWithRates = unseenMovies.map(movieId => ({ movieId, rate: predictedRate(user, movieId) }));
    console.log(unseenWithRates);
}