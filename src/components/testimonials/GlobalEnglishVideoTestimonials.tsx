
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const englishTestimonials = [
  { id: 'ingles-testimonio1', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%201.mp4' },
  { id: 'ingles-testimonio2', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%202.mp4' },
  { id: 'ingles-testimonio3', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%203.mp4' },
  { id: 'ingles-comercial1', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20COMERCIAL%201.mp4' },
  { id: 'ingles-comercial2', src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20COMERCIAL%202.mp4' }
];

export function GlobalEnglishVideoTestimonials() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Only show for English, Romanian, and Portuguese languages
  const shouldShow = ['en', 'ro', 'pt'].includes(i18n.language);

  console.log('🎥 GlobalEnglishVideoTestimonials mounted on:', location.pathname);
  console.log('🎥 Language:', i18n.language, 'Should show:', shouldShow);
  console.log('🎥 Current video index:', currentVideoIndex);
  console.log('🎥 Current video:', englishTestimonials[currentVideoIndex]);

  const nextVideo = () => {
    console.log('🎥 Moving to next English video from index:', currentVideoIndex);
    setCurrentVideoIndex((prev) => (prev + 1) % englishTestimonials.length);
    setIsPlaying(false);
  };

  const startVideo = () => {
    console.log('🎥 Starting English video at index:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 No English video element found');
      return;
    }

    video.currentTime = 0;
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('🎥 English video started playing successfully');
          setIsPlaying(true);
          // Set timer to switch to next video after 60 seconds (1 minute)
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

  useEffect(() => {
    console.log('🎥 English video index changed to:', currentVideoIndex);
    const video = videoRef.current;
    if (!video) {
      console.log('🎥 English video element not ready yet');
      return;
    }

    const handleLoadedData = () => {
      console.log('🎥 English video loaded, starting playback');
      startVideo();
    };

    const handleError = (e: Event) => {
      console.error('🎥 English video loading error:', englishTestimonials[currentVideoIndex].id, e);
      // Try next video
      setTimeout(nextVideo, 1000);
    };

    const handleEnded = () => {
      console.log('🎥 English video ended naturally');
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

  // Don't show on Index page or if language is not en/ro/pt
  if (location.pathname === '/' || !shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
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
