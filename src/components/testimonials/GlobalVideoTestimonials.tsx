import React, { useState, useEffect, useRef } from 'react';
import { useVideoTestimonial } from '@/contexts/VideoTestimonialContext';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoTestimonial {
  url: string;
}

interface VideoTestimonials {
  [key: string]: VideoTestimonial[];
}

const videoTestimonials: VideoTestimonials = {
  en: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20EN.mp4' },
  ],
  de: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20DE.mp4' },
  ],
  es: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20ES.mp4' },
  ],
  fr: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20FR.mp4' },
  ],
  it: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20IT.mp4' },
  ],
  nl: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20NL.mp4' },
  ],
  pl: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20PL.mp4' },
  ],
  pt: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20PT.mp4' },
  ],
  ru: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20RU.mp4' },
  ],
  tr: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20TR.mp4' },
  ],
  zh: [
    { url: 'https://d29v1zwsqhk9mc.cloudfront.net/video/Hotel%20search%20testimonials%20-%20ZH.mp4' },
  ],
};

export function GlobalVideoTestimonials() {
  const { isVisible, setIsVisible, currentVideoIndex, setCurrentVideoIndex, isMuted, setIsMuted, hasStarted, setHasStarted } = useVideoTestimonial();
  const { i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 't' && !hasStarted) {
        setIsVisible(true);
        setHasStarted(true);
        event.preventDefault(); // Prevent 't' from being typed in any input field
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsVisible, setHasStarted, hasStarted]);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Autoplay only on first play
      if (!hasPlayedOnce) {
        videoRef.current.play().then(() => {
          setHasPlayedOnce(true);
        }).catch(error => {
          console.error("Autoplay failed:", error);
          // Handle autoplay failure (e.g., show a play button)
        });
      }
    }
  }, [isVisible, hasPlayedOnce]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  if (!isVisible) {
    return null;
  }

  const currentLangVideos = videoTestimonials[i18n.language as keyof typeof videoTestimonials] || videoTestimonials.en;
  const currentVideo = currentLangVideos[currentVideoIndex];

  return (
    <div className="fixed bottom-4 left-4 z-50 max-h-60">
      {/* Mute/Unmute button - top right of video */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Video - height constrained to 240px max, width adjusts automatically */}
      <video
        ref={videoRef}
        src={currentVideo.url}
        autoPlay
        muted={isMuted}
        playsInline
        controls={false}
        className="max-h-60 h-auto w-auto rounded-lg shadow-2xl"
        onError={(e) => {
          console.error("Error loading video:", currentVideo.url, e);
          // Try next video on error
          const nextIndex = (currentVideoIndex + 1) % currentLangVideos.length;
          setCurrentVideoIndex(nextIndex);
        }}
        onEnded={() => {
          // Auto-close when video ends
          setIsVisible(false);
        }}
        onLoadStart={() => {
          console.log("Video loading started:", currentVideo.url);
        }}
        onCanPlay={() => {
          console.log("Video can play:", currentVideo.url);
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
