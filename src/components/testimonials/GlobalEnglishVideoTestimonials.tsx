
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { X, Mic } from 'lucide-react';

const testimonials = [
  { id: 'testimonio-one', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/testimonio-one.webm' },
  { id: 'testimonio-two', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/testimonio-two.webm' },
  { id: 'testimonio-three', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/testimonio-three.webm' }
];

export function GlobalEnglishVideoTestimonials() {
  const location = useLocation();
  const { language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  console.log('🎥 GlobalEnglishVideoTestimonials mounted on:', location.pathname);
  console.log('🎥 Current video index:', currentVideoIndex);

  // Check session storage for completion status - allow restart on new page loads
  useEffect(() => {
    const completed = sessionStorage.getItem('english-testimonials-completed');
    const lastPageLoad = sessionStorage.getItem('english-testimonials-page-load');
    const currentPageLoad = Date.now().toString();
    
    // If it's a new page load (different from last stored), reset the sequence
    if (lastPageLoad !== currentPageLoad) {
      sessionStorage.setItem('english-testimonials-page-load', currentPageLoad);
      sessionStorage.removeItem('english-testimonials-completed');
      setHasCompleted(false);
      setIsVisible(true);
      setCurrentVideoIndex(0);
    } else if (completed === 'true') {
      setHasCompleted(true);
      setIsVisible(false);
    }
  }, []);

  const nextVideo = () => {
    console.log('🎥 Moving to next video from index:', currentVideoIndex);
    
    // Stop after the last video (index 2 = 3rd video)
    if (currentVideoIndex >= testimonials.length - 1) {
      console.log('🎥 English sequence completed, hiding testimonials');
      sessionStorage.setItem('english-testimonials-completed', 'true');
      setHasCompleted(true);
      setIsVisible(false);
      return;
    }
    
    setCurrentVideoIndex(prev => prev + 1);
  };

  const startVideoSequence = () => {
    console.log('🎥 Starting English video sequence at index:', currentVideoIndex);
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
          console.log('🎥 English video started playing successfully');
          // Set timer for exactly 60 seconds regardless of video length
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            console.log('🎥 60-second timer expired, switching to next English video');
            nextVideo();
          }, 60000);
        })
        .catch((error) => {
          console.error('🎥 English video play failed:', error);
          // Try next video after a short delay
          setTimeout(nextVideo, 1000);
        });
    }
  };

  const handleClose = () => {
    console.log('🎥 User closed English testimonials');
    sessionStorage.setItem('english-testimonials-completed', 'true');
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (hasCompleted || !isVisible) return;
    
    console.log('🎥 English video index changed to:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 English video element not ready yet');
      return;
    }

    const handleLoadedData = () => {
      console.log('🎥 English video loaded, starting sequence');
      startVideoSequence();
    };

    const handleError = (e: Event) => {
      console.error('🎥 English video loading error:', testimonials[currentVideoIndex].id, e);
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

  // Don't show on Index page, only show for English users, and don't show if completed or hidden
  if (location.pathname === '/' || language !== 'en' || !isVisible || hasCompleted) {
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
