"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { createMovieRoute } from "@/lib/constants/route";
import { Star } from "lucide-react";
import type { Movie } from "@/lib/interfaces";

export function MovieCard({ movie }: { movie: Movie }) {
    const router = useRouter();

    return (
        <Card
            className="overflow-hidden border-0 shadow-none p-0 cursor-pointer"
            onClick={() => router.push(createMovieRoute(movie.id))}>
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
                        <Star className="text-yellow-400 w-4 h-4 fill-current" />
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
    );
}