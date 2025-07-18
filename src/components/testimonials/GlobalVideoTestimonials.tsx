
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Mic } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const { language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Check if already completed this session
  const sessionKey = 'spanishTestimonialsCompleted';
  
  useEffect(() => {
    const completed = sessionStorage.getItem(sessionKey);
    if (completed === 'true') {
      setIsVisible(false);
      return;
    }
  }, []);

  // Updated Spanish video URLs to match actual Supabase filenames
  const testimonials = [
    {
      id: 'testimonio1',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio1.webm'
    },
    {
      id: 'testimonio2',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio2.webm'
    },
    {
      id: 'testimonio3',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio3.webm'
    },
    {
      id: 'testimonio4',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio4.webm'
    },
    {
      id: 'testimonio5',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio5.webm'
    }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const playCurrentVideo = async () => {
      if (videoRef.current) {
        try {
          console.log('Attempting to play Spanish video:', testimonials[currentVideoIndex].src);
          await videoRef.current.play();
          console.log('Spanish video playing successfully');
        } catch (error) {
          console.error('Spanish video autoplay prevented:', error);
        }
      }
    };

    playCurrentVideo();

    // Set timer for 60 seconds
    timerRef.current = setTimeout(() => {
      if (currentVideoIndex < testimonials.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      } else {
        // Sequence completed - hide and mark as completed
        sessionStorage.setItem(sessionKey, 'true');
        setIsVisible(false);
      }
    }, 60000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentVideoIndex, isVisible]);

  const handleClose = () => {
    sessionStorage.setItem(sessionKey, 'true');
    setIsVisible(false);
  };

  // Only show for Spanish
  if (language !== 'es') {
    return null;
  }

  // Don't show on index page
  if (location.pathname === '/') {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative w-40 h-32 rounded-lg overflow-hidden shadow-lg">
        {/* Close and Mic Icons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <Mic className="w-4 h-4 text-white opacity-80" />
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <video
          ref={videoRef}
          key={testimonials[currentVideoIndex].id}
          src={testimonials[currentVideoIndex].src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            console.error('Spanish video loading error:', e);
            console.error('Failed video URL:', testimonials[currentVideoIndex].src);
          }}
          onLoadStart={() => {
            console.log('Spanish video loading started:', testimonials[currentVideoIndex].src);
          }}
          onCanPlay={() => {
            console.log('Spanish video can play:', testimonials[currentVideoIndex].src);
          }}
        />
      </div>
    </div>
  );
}
