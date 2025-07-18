
import { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('GlobalVideoTestimonials - Component mounted');
    
    const language = navigator.language.startsWith('es') ? 'es' : 'en';
    const availableVideos = testimonialVideos.filter(video => video.language === language);
    
    if (availableVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      setCurrentVideo(availableVideos[randomIndex]);
      console.log('GlobalVideoTestimonials - Selected video:', availableVideos[randomIndex]);
    } else {
      setCurrentVideo(testimonialVideos[0]);
      console.log('GlobalVideoTestimonials - Using fallback video:', testimonialVideos[0]);
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        if (videoRef.current && !hasError) {
          videoRef.current.play().catch(console.error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasError]);

  const handleClose = () => {
    console.log('GlobalVideoTestimonials - Closing video');
    setIsVisible(false);
  };

  const handleVideoLoad = () => {
    console.log('GlobalVideoTestimonials - Video loaded successfully');
    setIsLoading(false);
    setHasError(false);
    setIsVisible(true);
  };

  const handleVideoError = (e: any) => {
    console.error('GlobalVideoTestimonials - Video failed to load:', e, currentVideo?.videoUrl);
    setIsLoading(false);
    setHasError(true);
    setIsVisible(false);
  };

  const handleVideoEnd = () => {
    console.log('GlobalVideoTestimonials - Video ended, hiding');
    setIsVisible(false);
  };

  // Test if we should show anything at all
  if (!currentVideo || hasError) {
    return null;
  }

  // Show loading state
  if (isLoading && !isVisible) {
    return (
      <div 
        className="testimonial-video-container w-[50px] h-[90px] sm:w-[130px] sm:h-[230px] flex items-center justify-center bg-black/80"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Loader2 className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-spin" />
      </div>
    );
  }

  // Show video only when loaded and visible
  if (!isVisible) {
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
        playsInline
        preload="auto"
        onLoadStart={() => console.log('Video loading started:', currentVideo.videoUrl)}
        onCanPlay={handleVideoLoad}
        onError={handleVideoError}
        onEnded={handleVideoEnd}
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
