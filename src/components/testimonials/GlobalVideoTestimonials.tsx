
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
    
    // Start showing loading immediately
    setIsLoading(true);
    setHasError(false);
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

  // Don't show anything if no video selected
  if (!currentVideo) {
    console.log('GlobalVideoTestimonials - No video selected, hiding');
    return null;
  }

  // Hide completely if there's an error
  if (hasError) {
    console.log('GlobalVideoTestimonials - Video error, hiding component');
    return null;
  }

  // Always show loading state first
  if (isLoading) {
    console.log('GlobalVideoTestimonials - Showing loading state');
    return (
      <div 
        className="fixed bottom-6 left-6 z-50 w-[50px] h-[90px] sm:w-[130px] sm:h-[230px] flex items-center justify-center bg-black/80 rounded-lg"
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

  console.log('GlobalVideoTestimonials - Rendering video');
  return (
    <div 
      className="fixed bottom-6 left-6 z-50 w-[50px] h-[90px] sm:w-[130px] sm:h-[230px] rounded-lg overflow-hidden bg-black"
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
        className="w-full h-full object-cover"
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
