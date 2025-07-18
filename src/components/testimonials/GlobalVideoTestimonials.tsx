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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const language = navigator.language.startsWith('es') ? 'es' : 'en';
    const availableVideos = testimonialVideos.filter(video => video.language === language);
    
    if (availableVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      setCurrentVideo(availableVideos[randomIndex]);
    } else {
      setCurrentVideo(testimonialVideos[0]);
    }

    // Auto-hide after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        if (videoRef.current) {
          videoRef.current.play();
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
  };

  if (!currentVideo || !isVisible) {
    return null;
  }

  return (
    <div 
      className="testimonial-video-container w-[50px] h-[90px] sm:w-[130px] sm:h-[230px]"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
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
        loop
        playsInline
        preload="auto"
        onLoadStart={() => console.log('Video loading started:', currentVideo.videoUrl)}
        onCanPlay={() => console.log('Video can play')}
        onError={(e) => console.error('Video error:', e)}
        className="w-[50px] h-[90px] sm:w-[130px] sm:h-[230px]"
        style={{
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
