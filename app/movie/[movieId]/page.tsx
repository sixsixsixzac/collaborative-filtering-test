"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function MoviePage() {
    const [videoEnded, setVideoEnded] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const video = document.querySelector('video');
        if (video) {
            const onEnd = () => {
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
    }, []);

    const onRate = (starValue: number) => {
        setRating(starValue);
        setHoverRating(0);
        setVideoEnded(false);
    };

    const Rating = () => {
        return (
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-lg shadow-xl">
                <h2 className="text-white text-xl font-semibold">Rate this movie?</h2>
                <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => onRate(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            className="transition-colors duration-150 focus:outline-none p-1 cursor-pointer"
                        >
                            <Star
                                size={40}
                                className={`${star <= (hoverRating || rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-600'
                                    } hover:text-yellow-300 hover:fill-yellow-300`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative">
            <video
                autoPlay
                controls
                className="w-full h-auto max-h-screen rounded-lg shadow-lg"
                poster="/thumnails/sample-movie-poster.jpg"
            >
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