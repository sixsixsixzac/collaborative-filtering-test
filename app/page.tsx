"use client";

import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { MovieList } from "@/components/movieList";
import { useUserStore } from "@/lib/stores/user-store";
import type { Movie, MovieCategory, User } from "@/lib/interfaces";

export default function Home() {
  const currentUser = useUserStore((state) => state.currentUser);

  const { data: movieCategories = [], isLoading } = useQuery<MovieCategory[]>({
    queryKey: ['movies', currentUser?.id],
    queryFn: async (): Promise<MovieCategory[]> => {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ userId: currentUser?.id || null }),
      });

      if (!response.ok) throw new Error('Fail');
      return response.json();
    },

    enabled: !!currentUser,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <MovieList movieCategories={movieCategories} isLoading={isLoading} />
    </div>
  );
}
