"use client";

import { useEffect } from "react";

export default function MoviePage() {
    useEffect(() => {
        const video = document.querySelector('video');
        if (video) {
            const handleVideoEnd = () => {
                console.log('Video finished playing - User completed watching');
            };

            const handleMetadataLoaded = () => {
                if (video.duration > 5) {
                    video.currentTime = video.duration - 5;
                }
            };

            video.addEventListener('ended', handleVideoEnd);
            video.addEventListener('loadedmetadata', handleMetadataLoaded);

            return () => {
                video.removeEventListener('ended', handleVideoEnd);
                video.removeEventListener('loadedmetadata', handleMetadataLoaded);
            };
        }
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <video
                autoPlay
                controls
                className="w-full h-auto max-h-screen rounded-lg shadow-lg"
                poster="/thumnails/sample-movie-poster.jpg"
            >
                <source src="/videos/BigBuckBunny.mp4" type="video/mp4" />
            </video>
        </div>
    )
}