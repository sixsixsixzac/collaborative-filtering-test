"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, Film, ArrowLeft, ArrowLeft as BackIcon } from "lucide-react";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/lib/stores/user-store";
import type { Movie } from "@/lib/interfaces";

export default function MoviePage() {
    const params = useParams();
    const router = useRouter();
    const movieId = params.movieId as string;

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [userHasRated, setUserHasRated] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentUser = useUserStore((state) => state.currentUser);

    useEffect(() => {
        const video = videoRef.current;
        if (video && movie) {
            const onEnd = () => {
                console.log('video ended');
                setVideoEnded(true);
            };

            const onMeta = () => {
                if (video.duration > 5) {
                    video.currentTime = video.duration - 5;
                }
            };

            video.addEventListener('ended', onEnd);
            video.addEventListener('loadedmetadata', onMeta);

            return () => {
                video.removeEventListener('ended', onEnd);
                video.removeEventListener('loadedmetadata', onMeta);
            };
        }
    }, [movie]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/movies/${movieId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: currentUser?.id || null,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to load movie');
                }
                const movieData = await response.json();
                setMovie(movieData);

                if (movieData.userRating) {
                    setRating(movieData.userRating);
                    setUserHasRated(true);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchMovie();
        }
    }, [movieId]);


    const onRate = (starValue: number) => {
        setRating(starValue);
        setHoverRating(0);
        setVideoEnded(false);
    };

    const Rating = () => {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-lg shadow-xl">
                <h2 className="text-white text-xl font-semibold">
                    {userHasRated ? 'You rated this movie:' : 'Rate this movie?'}
                </h2>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => !userHasRated && onRate(star)}
                            onMouseEnter={() => !userHasRated && setHoverRating(star)}
                            className={`transition-colors duration-150 focus:outline-none p-1 ${userHasRated ? 'cursor-default' : 'cursor-pointer'
                                }`}
                            disabled={userHasRated}
                        >
                            <Star
                                size={40}
                                className={`${star <= (hoverRating || rating)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-600'
                                    } ${!userHasRated ? 'hover:text-yellow-300 hover:fill-yellow-300' : ''}`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center relative">
                <div className="absolute top-0 left-4 z-10 bg-black bg-opacity-75 p-4 rounded-lg">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-12" />
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        </div>
                    </div>
                </div>

                <Skeleton className="w-full h-auto max-h-screen rounded-lg shadow-lg aspect-video" />
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Empty className="text-white border-white/20">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Film className="size-8" />
                        </EmptyMedia>
                        <EmptyTitle className="text-white">
                            {error ? 'Error Loading Movie' : 'Movie Not Found'}
                        </EmptyTitle>
                        <EmptyDescription className="text-gray-400">
                            {error || 'The movie you\'re looking for doesn\'t exist or has been removed.'}
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="bg-gray-500 border-white/20 text-white hover:bg-white/10 hover:text-white">
                            Go Back
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative">
            <div className="absolute top-0 left-4 z-10 bg-black bg-opacity-75 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                    <button
                        onClick={() => router.back()}
                        className="text-white hover:text-gray-300 transition-colors p-1 rounded hover:bg-white/10"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-white text-2xl font-bold">{movie.title}</h1>
                </div>
                <div className="text-gray-300 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                        <span>Score:</span>
                        <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span>{movie.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <video
                ref={videoRef}
                autoPlay
                controls
                poster={movie.image}
                className="w-full h-auto max-h-screen rounded-lg shadow-lg">
                <source src="/videos/BigBuckBunny.mp4" type="video/mp4" />
            </video>

            {videoEnded && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <Rating />
                </div>
            )}
        </div>
    )
}