
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Mic, Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function GlobalEnglishVideoTestimonials() {
  const location = useLocation();
  const { language } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  // Check if already completed this session
  const sessionKey = 'englishTestimonialsCompleted';
  
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
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLES-TESTIMONIO-1.webm'
    },
    {
      id: 'testimonio2', 
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLES-TESTIMONIO-2.webm'
    },
    {
      id: 'testimonio3',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLES-TESTIMONIO-3.webm'
    },
    {
      id: 'testimonio4',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLES-TESTIMONIO-4.webm'
    },
    {
      id: 'testimonio5',
      src: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLES-TESTIMONIO-5.webm'
    }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const playCurrentVideo = async () => {
      if (videoRef.current) {
        try {
          console.log('Attempting to play English video:', testimonials[currentVideoIndex].src);
          // Start muted for autoplay compliance
          videoRef.current.muted = true;
          await videoRef.current.play();
          console.log('English video playing successfully');
          
          // If user has interacted and wants sound, unmute after starting
          if (hasUserInteracted && !isMuted) {
            videoRef.current.muted = false;
          }
        } catch (error) {
          console.error('English video autoplay prevented:', error);
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
  }, [currentVideoIndex, isVisible, hasUserInteracted, isMuted]);

  const handleClose = () => {
    sessionStorage.setItem(sessionKey, 'true');
    setIsVisible(false);
  };

  const toggleSound = () => {
    setHasUserInteracted(true);
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Only show for English, Portuguese, and Romanian
  if (!['en', 'pt', 'ro'].includes(language)) {
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
        {/* Close, Sound, and Mic Icons */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={toggleSound}
            className="text-white hover:text-gray-300 transition-colors"
            title={isMuted ? "Enable sound" : "Disable sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
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
          playsInline
          preload="auto"
          onError={(e) => {
            console.error('English video loading error:', e);
            console.error('Failed video URL:', testimonials[currentVideoIndex].src);
          }}
          onLoadStart={() => {
            console.log('English video loading started:', testimonials[currentVideoIndex].src);
          }}
          onCanPlay={() => {
            console.log('English video can play:', testimonials[currentVideoIndex].src);
          }}
        />
      </div>
    </div>
  );
}
