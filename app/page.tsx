"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { createMovieRoute } from "@/lib/constants/route";
import { useQuery } from "@tanstack/react-query";

type Movie = {
  id: number;
  title: string;
  image: string;
  rating: number;
  releaseDate: string;
};

type MovieCategory = {
  name: string;
  movies: Movie[];
};

export default function Home() {
  const router = useRouter();

  const { data: movieCategories = [], isLoading: loading } = useQuery<MovieCategory[]>({
    queryKey: ['movies'],
    queryFn: async (): Promise<MovieCategory[]> => {
      const response = await fetch('/api/movies');
      
      if (!response.ok) throw new Error('Fail');
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        {movieCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {category.movies.map((movie) => (
                <Card
                  key={movie.id}
                  className="overflow-hidden border-0 shadow-none p-0 cursor-pointer"
                  onClick={() => router.push(createMovieRoute(movie.id))}
                >
                  <CardContent className="relative p-0">
                    <div className="aspect-[2/3] relative">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded-md shadow">
                      <div className="flex items-center gap-1 text-white text-sm font-semibold">
                        <span className="text-yellow-400 text-base">★</span>
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm truncate">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(movie.releaseDate).getFullYear()}-{String(new Date(movie.releaseDate).getMonth() + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
