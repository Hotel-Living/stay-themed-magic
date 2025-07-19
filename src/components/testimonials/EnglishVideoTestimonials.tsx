import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, Mic, MicOff } from 'lucide-react';

const englishTestimonials = [
  'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%201.webm',
  'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS-TESTIMONIO-2_small.webm',
  'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS-TESTIMONIO-3_small.webm'
];

export function EnglishVideoTestimonials() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  // Only show on non-Index pages and non-Spanish languages
  const shouldShowVideos = location.pathname !== '/' && i18n.language !== 'es';

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Start the video sequence
  useEffect(() => {
    if (!shouldShowVideos || hasStartedRef.current || isComplete) {
      return;
    }

    console.log('Starting English testimonial video sequence');
    hasStartedRef.current = true;

    // Start first video at 1 second
    timerRef.current = setTimeout(() => {
      console.log('Starting first English video');
      setCurrentVideoIndex(0);
      setIsVisible(true);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldShowVideos, isComplete]);

  // Handle video playback and transitions
  useEffect(() => {
    if (!isVisible || !videoRef.current || isComplete) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log('English video loaded:', currentVideoIndex);
      // Auto-play the video (muted by default)
      video.play().catch((error) => {
        console.error('Error playing English video:', error);
      });
    };

    const handleEnded = () => {
      console.log('English video ended:', currentVideoIndex);
      
      // Hide video immediately after it ends
      setIsVisible(false);
      
      if (currentVideoIndex < englishTestimonials.length - 1) {
        // Move to next video based on timing
        const nextIndex = currentVideoIndex + 1;
        const delay = nextIndex === 1 ? 59000 : 60000; // 59s for second video (since first already played for 1s), 60s for third
        
        timerRef.current = setTimeout(() => {
          console.log('Starting next English video:', nextIndex);
          setCurrentVideoIndex(nextIndex);
          setIsVisible(true);
        }, delay);
      } else {
        // All videos complete - hide component permanently
        console.log('All English testimonial videos complete');
        setIsComplete(true);
      }
    };

    const handleError = (error: any) => {
      console.error('English video loading error:', error);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Set the video source
    video.src = englishTestimonials[currentVideoIndex];
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isVisible, currentVideoIndex, isComplete]);

  const handleToggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      console.log('Audio toggled:', videoRef.current.muted ? 'muted' : 'unmuted');
    }
  };

  const handleClose = () => {
    console.log('English video manually closed');
    setIsVisible(false);
    setIsComplete(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  if (!shouldShowVideos || !isVisible || isComplete) {
    return null;
  }

  return (
    <div
      className="group"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: window.innerWidth <= 768 ? '65px' : '110px',
        height: window.innerWidth <= 768 ? '115px' : '195px',
        maxWidth: window.innerWidth <= 768 ? '65px' : '110px',
        maxHeight: window.innerWidth <= 768 ? '115px' : '195px',
        minWidth: window.innerWidth <= 768 ? '65px' : '110px',
        minHeight: window.innerWidth <= 768 ? '115px' : '195px',
        zIndex: 50,
        borderRadius: '8px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        backgroundColor: 'black',
        flexShrink: 0,
        pointerEvents: 'auto'
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        style={{
          width: window.innerWidth <= 768 ? '65px' : '110px',
          height: window.innerWidth <= 768 ? '115px' : '195px',
          maxWidth: window.innerWidth <= 768 ? '65px' : '110px',
          maxHeight: window.innerWidth <= 768 ? '115px' : '195px',
          minWidth: window.innerWidth <= 768 ? '65px' : '110px',
          minHeight: window.innerWidth <= 768 ? '115px' : '195px',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none'
        }}
      />

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        style={{ pointerEvents: 'auto' }}
      >
        <X className="w-4 h-4 text-white" />
      </button>

      {/* Audio toggle button */}
      <button
        onClick={handleToggleAudio}
        className="absolute top-2 left-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        style={{ pointerEvents: 'auto' }}
        title={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? (
          <MicOff className="w-3 h-3 text-white" />
        ) : (
          <Mic className="w-3 h-3 text-white" />
        )}
      </button>
    </div>
  );
}