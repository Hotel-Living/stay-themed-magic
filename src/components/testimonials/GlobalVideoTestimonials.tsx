
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const testimonials = [
  { id: 'testimonio1', src: '/lovable-uploads/testimonio1.mp4' },
  { id: 'testimonio2', src: '/lovable-uploads/testimonio2.mp4' },
  { id: 'testimonio3', src: '/lovable-uploads/testimonio3.mp4' },
  { id: 'testimonio4', src: '/lovable-uploads/testimonio4.mp4' },
  { id: 'testimonio5', src: '/lovable-uploads/testimonio5.mp4' }
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }

  console.log('🎥 GlobalVideoTestimonials mounted on:', location.pathname);
  console.log('🎥 Current video index:', currentVideoIndex);
  console.log('🎥 Current video:', testimonials[currentVideoIndex]);

  const nextVideo = () => {
    console.log('🎥 Moving to next video from index:', currentVideoIndex);
    setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const startVideo = () => {
    console.log('🎥 Starting video at index:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 No video element found');
      return;
    }

    video.currentTime = 0;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('🎥 Video started playing successfully');
          setIsPlaying(true);
          // Set timer to switch to next video after 8 seconds
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            console.log('🎥 Timer expired, switching to next video');
            nextVideo();
          }, 8000);
        })
        .catch((error) => {
          console.error('🎥 Video play failed:', error);
          // Try next video after a short delay
          setTimeout(nextVideo, 1000);
        });
    }
  };

  useEffect(() => {
    console.log('🎥 Video index changed to:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 Video element not ready yet');
      return;
    }

    const handleLoadedData = () => {
      console.log('🎥 Video loaded, starting playback');
      startVideo();
    };

    const handleError = (e: Event) => {
      console.error('🎥 Video loading error:', testimonials[currentVideoIndex].id, e);
      // Try next video
      setTimeout(nextVideo, 1000);
    };

    const handleEnded = () => {
      console.log('🎥 Video ended naturally');
      nextVideo();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Load the video
    video.load();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="w-32 h-24 rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          ref={videoRef}
          src={testimonials[currentVideoIndex].src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
