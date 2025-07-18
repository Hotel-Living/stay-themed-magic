
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

  // Only show for Spanish
  if (language !== 'es') {
    return null;
  }

  // Don't show on index page
  if (location.pathname === '/') {
    return null;
  }

  // Check if already completed this session
  const sessionKey = 'spanishTestimonialsCompleted';
  
  useEffect(() => {
    const completed = sessionStorage.getItem(sessionKey);
    if (completed === 'true') {
      setIsVisible(false);
      return;
    }
  }, []);

  const testimonials = [
    {
      id: 'testimonio1',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio-one.webm'
    },
    {
      id: 'testimonio2',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio-two.webm'
    },
    {
      id: 'testimonio3',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio-three.webm'
    },
    {
      id: 'testimonio4',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio-four.webm'
    },
    {
      id: 'testimonio5',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoespanol/testimonio-five.webm'
    }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const playCurrentVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log('Video autoplay prevented:', error);
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
        />
      </div>
    </div>
  );
}
