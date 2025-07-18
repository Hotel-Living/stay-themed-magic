
import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useVideoTestimonial } from '@/contexts/VideoTestimonialContext';

interface VideoTestimonial {
  id: string;
  url: string;
  title: string;
  description: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'María José - Jubilada',
    description: 'Testimonial de cliente satisfecha'
  },
  {
    id: '2', 
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Carlos - Empresario',
    description: 'Experiencia con AffinityStays'
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
    title: 'Ana - Profesora',
    description: 'Recomendación personal'
  }
];

export function SpanishVideoTestimonials() {
  const { i18n } = useTranslation();
  const {
    isVisible,
    setIsVisible,
    currentVideoIndex,
    setCurrentVideoIndex,
    isMuted,
    setIsMuted,
    hasStarted,
    setHasStarted,
  } = useVideoTestimonial();
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Show video immediately for Spanish users, then every 2 minutes
  useEffect(() => {
    if (i18n.language === 'es') {
      // Show immediately on page load
      if (!hasStarted) {
        setIsVisible(true);
        setHasStarted(true);
        
        // Set up interval for subsequent videos (every 2 minutes)
        intervalRef.current = setInterval(() => {
          const nextIndex = (currentVideoIndex + 1) % videoTestimonials.length;
          setCurrentVideoIndex(nextIndex);
          setIsVisible(true);
          setIsMuted(true); // Reset to muted for each new video
        }, 120000); // 2 minutes
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [i18n.language, hasStarted, currentVideoIndex, setIsVisible, setHasStarted, setCurrentVideoIndex, setIsMuted]);

  // Update video mute state when isMuted changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Don't render if not Spanish or not visible
  if (i18n.language !== 'es' || !isVisible) {
    return null;
  }

  const currentVideo = videoTestimonials[currentVideoIndex];

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 h-48 bg-black rounded-lg overflow-hidden shadow-2xl border border-fuchsia-400/30">
      {/* Close button - top right */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
        aria-label="Close video"
      >
        <X size={16} />
      </button>

      {/* Mute/Unmute button - bottom right */}
      <button
        onClick={toggleMute}
        className="absolute bottom-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Video element - prevent clicks from closing the video */}
      <video
        ref={videoRef}
        src={currentVideo.url}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        controls={false}
        className="w-full h-full object-cover cursor-default"
        onError={(e) => {
          console.error('Error loading video:', currentVideo.url, e);
          // Try next video on error
          const nextIndex = (currentVideoIndex + 1) % videoTestimonials.length;
          setCurrentVideoIndex(nextIndex);
        }}
        onLoadStart={() => {
          console.log('Video loading started:', currentVideo.url);
        }}
        onCanPlay={() => {
          console.log('Video can play:', currentVideo.url);
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Do nothing on video click to prevent disappearing
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Video title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pb-8 pointer-events-none">
        <p className="text-white text-sm font-medium">{currentVideo.title}</p>
      </div>
    </div>
  );
}
