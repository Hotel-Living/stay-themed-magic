import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TestimonialVideo {
  id: string;
  videoUrl: string;
  language: 'es' | 'en';
}

export function GlobalVideoTestimonials() {
  const testimonialVideos: TestimonialVideo[] = [
    {
      id: '1',
      videoUrl: 'https://hotel-living.s3.eu-west-3.amazonaws.com/global-testimonials/video-en-1.mp4',
      language: 'en'
    },
    {
      id: '2',
      videoUrl: 'https://hotel-living.s3.eu-west-3.amazonaws.com/global-testimonials/video-es-1.mp4',
      language: 'es'
    },
  ];

  const [currentVideo, setCurrentVideo] = useState<TestimonialVideo | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const language = navigator.language.startsWith('es') ? 'es' : 'en';
    const availableVideos = testimonialVideos.filter(video => video.language === language);
    
    if (availableVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      setCurrentVideo(availableVideos[randomIndex]);
      setCurrentVideoIndex(randomIndex);
    } else {
      setCurrentVideo(testimonialVideos[0]);
      setCurrentVideoIndex(0);
    }

    // Set up interval to switch videos every 2 minutes
    intervalRef.current = setInterval(() => {
      const language = navigator.language.startsWith('es') ? 'es' : 'en';
      const availableVideos = testimonialVideos.filter(video => video.language === language);
      
      if (availableVideos.length > 1) {
        setCurrentVideoIndex(prev => {
          const nextIndex = (prev + 1) % availableVideos.length;
          setCurrentVideo(availableVideos[nextIndex]);
          return nextIndex;
        });
      }
    }, 120000); // 2 minutes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        if (videoRef.current) {
          videoRef.current.play().catch(console.error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  if (!currentVideo || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[50px] h-[90px] sm:w-[130px] sm:h-[230px] rounded-lg overflow-hidden bg-black"
         style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
        style={{ fontSize: '12px', width: '20px', height: '20px' }}
      >
        <X size={12} />
      </button>
      
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}