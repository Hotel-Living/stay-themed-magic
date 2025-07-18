
import React, { useState, useEffect, useRef } from 'react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      console.log('2 minutes passed, showing video...');
      setShowVideo(true);
    }, 120000); // 2 minutes
  };

  // Handle video end
  const handleVideoEnd = () => {
    console.log('Video ended, hiding and preparing next...');
    setShowVideo(false);
    resetVideoIfNeeded();
    startNextVideoTimer();
  };

  // Initialize first video timer
  useEffect(() => {
    console.log('Initializing video testimonial system...');
    // Start first video after 10 seconds (to avoid immediate popup)
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
      
      // Reset video to start
      video.currentTime = 0;
      
      // Attempt to play
      video.play().catch(error => {
        console.error('Autoplay failed:', error);
        // If autoplay fails, hide the video and continue cycle
        setShowVideo(false);
        resetVideoIfNeeded();
        startNextVideoTimer();
      });
    }
  }, [showVideo, currentVideoIndex]);

  if (!showVideo) {
    return null;
  }

  const currentVideo = videoTestimonials[currentVideoIndex];

  return (
    <div className="w-[260px] h-[460px] fixed bottom-6 left-6 z-50">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg shadow-2xl"
        muted
        loop={false}
        playsInline
        preload="metadata"
        onEnded={handleVideoEnd}
        onError={(e) => {
          console.error('Video error:', e);
          handleVideoEnd(); // Move to next video on error
        }}
      >
        <source src={currentVideo.videoUrl} type="video/webm" />
        <source src={currentVideo.videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
