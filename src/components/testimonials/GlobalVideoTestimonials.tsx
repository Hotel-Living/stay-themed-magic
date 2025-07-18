import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useVideoTestimonial } from '@/contexts/VideoTestimonialContext';
import { X, Volume2, VolumeX } from 'lucide-react';

const videoTestimonials = [
  {
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm',
    id: 'testimonio1'
  },
  {
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm',
    id: 'testimonio2'
  },
  {
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm',
    id: 'testimonio3'
  },
  {
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio4.webm',
    id: 'testimonio4'
  },
  {
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio5.webm',
    id: 'testimonio5'
  }
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const {
    isVisible,
    setIsVisible,
    currentVideoIndex,
    setCurrentVideoIndex,
    isMuted,
    setIsMuted,
  } = useVideoTestimonial();

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  const hasErrorRef = useRef(false);
  const isLoadedRef = useRef(false);

  // Only show on non-Index pages and Spanish language
  const shouldShowVideos = location.pathname !== '/' && i18n.language === 'es';

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (cycleTimerRef.current) {
        clearTimeout(cycleTimerRef.current);
      }
    };
  }, []);

  // Initial timer - start showing videos immediately
  useEffect(() => {
    if (!shouldShowVideos || hasStartedRef.current) {
      return;
    }

    console.log('Starting testimonial video system');
    hasStartedRef.current = true;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log('Initial timer - showing first video immediately');
      setCurrentVideoIndex(0);
      setIsVisible(true);
      hasErrorRef.current = false;
      isLoadedRef.current = false;
    }, 1000); // Start immediately after 1 second

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldShowVideos, setIsVisible, setCurrentVideoIndex]);

  // Set up 60-second continuous cycling timer
  useEffect(() => {
    if (!shouldShowVideos) return;

    console.log('Setting up 60-second continuous cycle timer');

    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
    }

    cycleTimerRef.current = setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videoTestimonials.length;
      console.log('60 seconds elapsed - showing next video:', nextIndex);
      setCurrentVideoIndex(nextIndex);
      setIsVisible(true);
      hasErrorRef.current = false;
      isLoadedRef.current = false;
    }, 60000); // 60 seconds

    return () => {
      if (cycleTimerRef.current) {
        clearTimeout(cycleTimerRef.current);
      }
    };
  }, [shouldShowVideos, currentVideoIndex, setCurrentVideoIndex, setIsVisible]);

  // Handle video loading and playback
  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;
    const currentVideo = videoTestimonials[currentVideoIndex];

    console.log('Setting up video:', currentVideo.id);

    const handleLoadedData = () => {
      console.log('Video loaded successfully:', currentVideo.id);
      isLoadedRef.current = true;
      hasErrorRef.current = false;

      // Auto-play the video
      video.play().catch((error) => {
        console.error('Error playing video:', error);
        hasErrorRef.current = true;
      });
    };

    const handleError = (error: any) => {
      console.error('Video loading error:', error);
      hasErrorRef.current = true;
    };

    const handleEnded = () => {
      console.log('Video ended:', currentVideo.id);
      // Video ended, but don't hide - let the cycle timer handle next video
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Set the video source
    video.src = currentVideo.url;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isVisible, currentVideoIndex]);

  const handleClose = () => {
    console.log('Video manually closed');
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!shouldShowVideos || !isVisible) {
    return null;
  }

  const currentVideo = videoTestimonials[currentVideoIndex];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        width: '65px',
        height: '115px',
        maxWidth: '65px',
        maxHeight: '115px',
        minWidth: '65px',
        minHeight: '115px',
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
        muted={isMuted}
        playsInline
        preload="metadata"
        style={{
          width: '65px',
          height: '115px',
          maxWidth: '65px',
          maxHeight: '115px',
          minWidth: '65px',
          minHeight: '115px',
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

      {/* Volume toggle button */}
      <button
        onClick={toggleMute}
        className="absolute top-2 left-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        style={{ pointerEvents: 'auto' }}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>
    </div>
  );
}
