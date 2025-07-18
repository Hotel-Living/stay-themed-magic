
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { X, Mic } from 'lucide-react';

const testimonials = [
  { id: 'testimonio1', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm' },
  { id: 'testimonio2', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm' },
  { id: 'testimonio3', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm' },
  { id: 'testimonio4', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio4.webm' },
  { id: 'testimonio5', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio5.webm' }
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const { language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  console.log('🎥 GlobalVideoTestimonials mounted on:', location.pathname);
  console.log('🎥 Current video index:', currentVideoIndex);

  // Check session storage for completion status
  useEffect(() => {
    const completed = sessionStorage.getItem('spanish-testimonials-completed');
    if (completed === 'true') {
      setHasCompleted(true);
      setIsVisible(false);
    }
  }, []);

  const nextVideo = () => {
    console.log('🎥 Moving to next video from index:', currentVideoIndex);
    
    // Stop after the last video (index 4 = 5th video)
    if (currentVideoIndex >= testimonials.length - 1) {
      console.log('🎥 Sequence completed, hiding testimonials');
      sessionStorage.setItem('spanish-testimonials-completed', 'true');
      setHasCompleted(true);
      setIsVisible(false);
      return;
    }
    
    setCurrentVideoIndex(prev => prev + 1);
  };

  const startVideoSequence = () => {
    console.log('🎥 Starting video sequence at index:', currentVideoIndex);
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
          // Set timer for exactly 60 seconds regardless of video length
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            console.log('🎥 60-second timer expired, switching to next video');
            nextVideo();
          }, 60000);
        })
        .catch((error) => {
          console.error('🎥 Video play failed:', error);
          // Try next video after a short delay
          setTimeout(nextVideo, 1000);
        });
    }
  };

  const handleClose = () => {
    console.log('🎥 User closed testimonials');
    sessionStorage.setItem('spanish-testimonials-completed', 'true');
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (hasCompleted || !isVisible) return;
    
    console.log('🎥 Video index changed to:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 Video element not ready yet');
      return;
    }

    const handleLoadedData = () => {
      console.log('🎥 Video loaded, starting sequence');
      startVideoSequence();
    };

    const handleError = (e: Event) => {
      console.error('🎥 Video loading error:', testimonials[currentVideoIndex].id, e);
      // Try next video
      setTimeout(nextVideo, 1000);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Load the video
    video.load();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideoIndex, hasCompleted, isVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Don't show on Index page, only show for Spanish users, and don't show if completed or hidden
  if (location.pathname === '/' || language !== 'es' || !isVisible || hasCompleted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="relative w-40 h-32 rounded-lg overflow-hidden shadow-lg bg-black">
        {/* Video element with proper scaling */}
        <video
          ref={videoRef}
          src={testimonials[currentVideoIndex].src}
          className="w-full h-full object-contain"
          muted
          playsInline
          preload="metadata"
        />
        
        {/* UI Controls Overlay */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {/* Microphone Icon */}
          <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
            <Mic size={12} className="text-white" />
          </div>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close testimonials"
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
