
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const englishTestimonials = [
  { 
    id: 'english-testimonio1', 
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/testimonials/INGLeS%20TESTIMONIO%201.webm' 
  },
  { 
    id: 'english-testimonio2', 
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/testimonials/INGLeS%20TESTIMONIO%202.webm' 
  },
  { 
    id: 'english-testimonio3', 
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/testimonials/INGLeS%20TESTIMONIO%203.webm' 
  },
  { 
    id: 'english-testimonio4', 
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/testimonials/INGLeS%20TESTIMONIO%204.webm' 
  },
  { 
    id: 'english-testimonio5', 
    src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/testimonials/INGLeS%20TESTIMONIO%205.webm' 
  }
];

export function GlobalEnglishVideoTestimonials() {
  const location = useLocation();
  const { language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  console.log('🎥 GlobalEnglishVideoTestimonials mounted on:', location.pathname);
  console.log('🎥 Current video index:', currentVideoIndex);
  console.log('🎥 Current video:', englishTestimonials[currentVideoIndex]);

  const nextVideo = () => {
    console.log('🎥 Moving to next video from index:', currentVideoIndex);
    setCurrentVideoIndex((prev) => (prev + 1) % englishTestimonials.length);
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
          // Set timer to switch to next video after 60 seconds
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            console.log('🎥 Timer expired, switching to next video');
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
      console.error('🎥 Video loading error:', englishTestimonials[currentVideoIndex].id, e);
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

  // Don't show on Index page and only show for English/Portuguese/Romanian users
  if (location.pathname === '/' || !['en', 'pt', 'ro'].includes(language)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="w-32 h-24 rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          ref={videoRef}
          src={englishTestimonials[currentVideoIndex].src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
}
