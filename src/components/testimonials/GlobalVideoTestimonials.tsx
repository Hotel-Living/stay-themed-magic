
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

const videoTestimonials = [
  {
    id: 1,
    videoUrl: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonial1.webm',
  },
  {
    id: 2,
    videoUrl: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonial2.webm',
  },
  {
    id: 3,
    videoUrl: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonial3.webm',
  },
];

export function GlobalVideoTestimonials() {
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { i18n } = useTranslation();

  // Only show videos if language is Spanish
  if (i18n.language !== 'es') {
    return null;
  }

  // Reset video cycle when all videos have been shown
  const resetVideoIfNeeded = () => {
    if (currentVideoIndex >= videoTestimonials.length - 1) {
      setCurrentVideoIndex(0);
    } else {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  // Start the timer for the next video
  const startNextVideoTimer = () => {
    console.log('Starting 2-minute timer for next video...');
    timerRef.current = setTimeout(() => {
      if (!hasError) {
        console.log('2 minutes passed, showing video...');
        setShowVideo(true);
        setHasError(false);
      }
    }, 120000); // 2 minutes
  };

  // Handle video end
  const handleVideoEnd = () => {
    console.log('Video ended, hiding and preparing next...');
    setShowVideo(false);
    resetVideoIfNeeded();
    startNextVideoTimer();
  };

  // Handle video error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error occurred:', e);
    setHasError(true);
    setShowVideo(false);
    // Don't immediately trigger next video on error
  };

  // Handle manual close
  const handleClose = () => {
    setShowVideo(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    startNextVideoTimer();
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Initialize first video timer
  useEffect(() => {
    console.log('Initializing Spanish video testimonial system...');
    // Start first video after 10 seconds
    timerRef.current = setTimeout(() => {
      console.log('Showing first video...');
      setShowVideo(true);
    }, 10000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle video play when shown
  useEffect(() => {
    if (showVideo && videoRef.current) {
      console.log(`Playing video ${currentVideoIndex + 1}...`);
      const video = videoRef.current;
      
      // Reset video to start and ensure muted
      video.currentTime = 0;
      video.muted = isMuted;
      
      // Attempt to play (muted videos should autoplay)
      video.play().catch(error => {
        console.error('Autoplay failed:', error);
        setHasError(true);
        setShowVideo(false);
      });
    }
  }, [showVideo, currentVideoIndex, isMuted]);

  if (!showVideo || hasError) {
    return null;
  }

  const currentVideo = videoTestimonials[currentVideoIndex];

  return (
    <div className="w-[260px] h-[460px] fixed bottom-6 left-6 z-50">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
          muted={isMuted}
          loop={false}
          playsInline
          preload="metadata"
          onEnded={handleVideoEnd}
          onError={handleVideoError}
        >
          <source src={currentVideo.videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
          aria-label="Close video"
        >
          <X size={16} />
        </button>
        
        {/* Mute/Unmute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
}
