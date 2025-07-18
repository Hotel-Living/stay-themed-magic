
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

const videoTestimonials = {
  es: [
    {
      id: 'es-1',
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm',
      title: 'Antonio - Jubilado',
      description: 'Testimonial de cliente satisfecho'
    },
    {
      id: 'es-2', 
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm',
      title: 'Luisa - Jubilada',
      description: 'Experiencia con AffinityStays'
    },
    {
      id: 'es-3',
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm', 
      title: 'María - Retirada',
      description: 'Recomendación personal'
    }
  ],
  en: [
    {
      id: 'en-1',
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio5.webm',
      title: 'John - Retired',
      description: 'Satisfied customer testimonial'
    },
    {
      id: 'en-2',
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio6.webm',
      title: 'Antonio - Retired',
      description: 'AffinityStays experience'
    },
    {
      id: 'en-3',
      url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm',
      title: 'Martin - Retired',
      description: 'Personal recommendation'
    }
  ]
};

export function GlobalVideoTestimonials() {
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

  // Show video immediately for all supported languages, then every 2 minutes
  useEffect(() => {
    if (i18n.language === 'es' || i18n.language === 'en') {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Show immediately on page load if not started
      if (!hasStarted) {
        setIsVisible(true);
        setHasStarted(true);
      }
      
      // Set up interval for subsequent videos (every 2 minutes)
      intervalRef.current = setInterval(() => {
        const currentLangVideos = videoTestimonials[i18n.language as keyof typeof videoTestimonials] || videoTestimonials.en;
        const nextIndex = (currentVideoIndex + 1) % currentLangVideos.length;
        setCurrentVideoIndex(nextIndex);
        setIsVisible(true);
        setIsMuted(true); // Reset to muted for each new video
      }, 120000); // 2 minutes
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [i18n.language, hasStarted, setIsVisible, setHasStarted, setCurrentVideoIndex, setIsMuted]);

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

  // Don't render if language not supported or not visible
  if ((i18n.language !== 'es' && i18n.language !== 'en') || !isVisible) {
    return null;
  }

  const currentLangVideos = videoTestimonials[i18n.language as keyof typeof videoTestimonials] || videoTestimonials.en;
  const currentVideo = currentLangVideos[currentVideoIndex];

  return (
    <div className="fixed bottom-4 left-4 z-50 w-72 bg-black rounded-lg overflow-hidden shadow-2xl border border-fuchsia-400/30 transition-all duration-300">
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

      {/* Video container with proper aspect ratio */}
      <div className="relative w-full aspect-video bg-black">
        <video
          ref={videoRef}
          src={currentVideo.url}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls={false}
          className="w-full h-full object-contain cursor-default"
          onError={(e) => {
            console.error('Error loading video:', currentVideo.url, e);
            // Try next video on error
            const currentLangVideos = videoTestimonials[i18n.language as keyof typeof videoTestimonials] || videoTestimonials.en;
            const nextIndex = (currentVideoIndex + 1) % currentLangVideos.length;
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
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pb-8 pointer-events-none">
        <p className="text-white text-sm font-medium">{currentVideo.title}</p>
      </div>
    </div>
  );
}
