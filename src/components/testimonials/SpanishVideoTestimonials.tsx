
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { X } from 'lucide-react';

const testimonialVideos = [
  "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm",
  "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm",
  "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm",
  "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio5.webm",
  "https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio6.webm"
];

export const SpanishVideoTestimonials: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(-1);
  const [shownVideos, setShownVideos] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const currentVideoRef = useRef(0);

  // Check if we should show videos
  const shouldShowVideos = i18n.language === 'es' && location.pathname !== '/';

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset state when language changes or on index page
    if (!shouldShowVideos) {
      setVisibleVideoIndex(-1);
      setShownVideos([]);
      currentVideoRef.current = 0;
      return;
    }

    // Start the video cycle
    const startVideoCycle = () => {
      intervalRef.current = setInterval(() => {
        if (currentVideoRef.current < testimonialVideos.length) {
          setVisibleVideoIndex(currentVideoRef.current);
          setShownVideos(prev => [...prev, currentVideoRef.current]);
          currentVideoRef.current += 1;
        } else {
          // All videos shown, clear interval
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      }, 120000); // 2 minutes = 120,000ms
    };

    // Start immediately if we haven't shown any videos yet
    if (shownVideos.length === 0) {
      startVideoCycle();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldShowVideos, shownVideos.length]);

  const handleCloseVideo = () => {
    setVisibleVideoIndex(-1);
  };

  // Don't render anything if conditions aren't met
  if (!shouldShowVideos || visibleVideoIndex === -1) {
    return null;
  }

  return (
    <div 
      id="video-popup" 
      className="fixed bottom-4 left-4 w-[180px] sm:w-[100px] z-50 rounded-xl shadow-lg overflow-hidden bg-black"
    >
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={testimonialVideos[visibleVideoIndex]}
          className="w-full h-auto rounded-xl"
          onError={(e) => {
            console.error('Video failed to load:', testimonialVideos[visibleVideoIndex]);
          }}
        />
        <button
          onClick={handleCloseVideo}
          className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
          aria-label="Cerrar video"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
