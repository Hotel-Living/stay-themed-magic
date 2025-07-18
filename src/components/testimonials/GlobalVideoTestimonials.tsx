
import React, { useState, useEffect, useRef } from 'react';
import { useVideoTestimonial } from '../../contexts/VideoTestimonialContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Volume2, VolumeX, X } from 'lucide-react';

const videoTestimonials = [
  {
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm',
    id: 'testimonio1'
  },
  {
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm',
    id: 'testimonio2'
  },
  {
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm',
    id: 'testimonio3'
  }
];

export function GlobalVideoTestimonials() {
  const { i18n } = useTranslation();
  const { 
    isVisible, 
    setIsVisible, 
    currentVideoIndex, 
    setCurrentVideoIndex, 
    isMuted, 
    setIsMuted 
  } = useVideoTestimonial();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Only show videos in Spanish
  const shouldShowVideos = i18n.language === 'es';

  console.log('GlobalVideoTestimonials render:', {
    language: i18n.language,
    shouldShowVideos,
    isVisible,
    currentVideoIndex,
    hasError,
    isLoaded
  });

  // Initialize first video after 10 seconds
  useEffect(() => {
    if (!shouldShowVideos) {
      console.log('Not showing videos - language is not Spanish');
      return;
    }

    console.log('Setting up initial 10-second timer');
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log('10 seconds elapsed - showing first video');
      setCurrentVideoIndex(0);
      setIsVisible(true);
      setHasError(false);
      setIsLoaded(false);
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldShowVideos, setIsVisible, setCurrentVideoIndex]);

  // Set up 2-minute cycling timer
  useEffect(() => {
    if (!shouldShowVideos || !isVisible) return;

    console.log('Setting up 2-minute cycle timer');
    
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
    }

    cycleTimerRef.current = setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videoTestimonials.length;
      console.log('2 minutes elapsed - cycling to next video:', nextIndex);
      setCurrentVideoIndex(nextIndex);
      setHasError(false);
      setIsLoaded(false);
    }, 120000); // 2 minutes

    return () => {
      if (cycleTimerRef.current) {
        clearTimeout(cycleTimerRef.current);
      }
    };
  }, [shouldShowVideos, isVisible, currentVideoIndex, setCurrentVideoIndex]);

  // Handle video loading and playback
  useEffect(() => {
    if (!isVisible || !videoRef.current || hasError) return;

    const video = videoRef.current;
    const currentVideo = videoTestimonials[currentVideoIndex];
    
    console.log('Loading video:', currentVideo.src);

    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsLoaded(true);
      setHasError(false);
      
      // Start playing muted
      video.muted = isMuted;
      video.play().catch(error => {
        console.error('Error playing video:', error);
        if (error.name !== 'AbortError') {
          setHasError(true);
        }
      });
    };

    const handleError = (e: Event) => {
      console.error('Video loading error:', e);
      setHasError(true);
      setIsLoaded(false);
    };

    const handleEnded = () => {
      console.log('Video playback ended - hiding video');
      setIsVisible(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Load the video
    video.src = currentVideo.src;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isVisible, currentVideoIndex, isMuted, hasError]);

  const handleClose = () => {
    console.log('User closed video');
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      videoRef.current.muted = newMutedState;
      console.log('Toggled mute:', newMutedState);
    }
  };

  // Don't render if not in Spanish or not visible
  if (!shouldShowVideos || !isVisible) {
    return null;
  }

  // Don't render if there's an error
  if (hasError) {
    console.log('Not rendering due to error');
    return null;
  }

  const currentVideo = videoTestimonials[currentVideoIndex];

  return (
    <div className="w-[260px] h-[460px] fixed bottom-6 left-6 z-50 rounded-lg shadow-2xl overflow-hidden bg-black">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          preload="metadata"
        />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
          aria-label="Cerrar video"
        >
          <X size={16} />
        </button>

        {/* Mute/Unmute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Loading state */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
