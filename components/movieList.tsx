import { MovieCard } from "@/components/movieCard";
import type { MovieCategory } from "@/lib/interfaces";

interface MovieListProps {
  movieCategories: MovieCategory[];
  isLoading?: boolean;
}

export function MovieList({ movieCategories, isLoading = false }: MovieListProps) {
  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>
        {Array.from({ length: 6 }).map((_, categoryIndex) => (
          <section key={categoryIndex} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, movieIndex) => (
                <div key={movieIndex} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {movieCategories.map((category) => (
        <section key={category.name} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">{category.name}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {category.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}