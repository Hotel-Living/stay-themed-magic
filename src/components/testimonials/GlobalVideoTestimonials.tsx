
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const testimonials = [
  { 
    id: 'testimonio1', 
    webm: '/lovable-uploads/testimonio1.webm',
    mp4: '/lovable-uploads/testimonio1.mp4'
  },
  { 
    id: 'testimonio2', 
    webm: '/lovable-uploads/testimonio2.webm',
    mp4: '/lovable-uploads/testimonio2.mp4'
  },
  { 
    id: 'testimonio3', 
    webm: '/lovable-uploads/testimonio3.webm',
    mp4: '/lovable-uploads/testimonio3.mp4'
  },
  { 
    id: 'testimonio4', 
    webm: '/lovable-uploads/testimonio4.webm',
    mp4: '/lovable-uploads/testimonio4.mp4'
  },
  { 
    id: 'testimonio5', 
    webm: '/lovable-uploads/testimonio5.webm',
    mp4: '/lovable-uploads/testimonio5.mp4'
  }
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // No mostrar en Index
  if (location.pathname === '/') {
    return null;
  }

  useEffect(() => {
    console.log('🎥 GlobalVideoTestimonials: Initializing video', {
      currentIndex: currentVideoIndex,
      testimonial: testimonials[currentVideoIndex],
      pathname: location.pathname
    });

    const video = videoRef.current;
    if (!video) {
      console.error('🎥 Video element not found');
      return;
    }

    // Reset states
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    const handleLoadStart = () => {
      console.log('🎥 Video load started:', testimonials[currentVideoIndex].id);
      setIsLoading(true);
    };

    const handleLoadedData = () => {
      console.log('🎥 Video loaded successfully:', testimonials[currentVideoIndex].id);
      setIsLoading(false);
      setHasError(false);
      
      // Start playing the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('🎥 Video playing:', testimonials[currentVideoIndex].id);
          })
          .catch((error) => {
            console.error('🎥 Error playing video:', error);
            setErrorMessage('Error playing video');
          });
      }
    };

    const handleError = (e: Event) => {
      console.error('🎥 Video load error:', {
        testimonialId: testimonials[currentVideoIndex].id,
        error: e,
        videoSrc: video.src,
        videoError: video.error
      });
      
      setIsLoading(false);
      setHasError(true);
      setErrorMessage(`Failed to load ${testimonials[currentVideoIndex].id}`);
    };

    const handleCanPlay = () => {
      console.log('🎥 Video can play:', testimonials[currentVideoIndex].id);
      setIsLoading(false);
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Set video source (prefer webm, fallback to mp4)
    const currentTestimonial = testimonials[currentVideoIndex];
    video.src = currentTestimonial.webm;
    
    // Load the video
    video.load();

    // Set up timer for video rotation (60 seconds)
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      console.log('🎥 Switching to next video after 60 seconds');
      setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length);
    }, 60000);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideoIndex, location.pathname]);

  const handleRetry = () => {
    console.log('🎥 Retrying video load');
    setHasError(false);
    setErrorMessage('');
    setIsLoading(true);
    
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  };

  const handleFallbackToMp4 = () => {
    console.log('🎥 Falling back to MP4 format');
    const video = videoRef.current;
    if (video) {
      const currentTestimonial = testimonials[currentVideoIndex];
      video.src = currentTestimonial.mp4;
      video.load();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="w-32 h-24 rounded-lg overflow-hidden shadow-lg bg-black relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-2">
            <div className="text-white text-xs text-center mb-2">
              Video Error
            </div>
            <div className="flex gap-1">
              <button 
                onClick={handleRetry}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Retry
              </button>
              <button 
                onClick={handleFallbackToMp4}
                className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                MP4
              </button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
          muted
        >
          <source src={testimonials[currentVideoIndex].webm} type="video/webm" />
          <source src={testimonials[currentVideoIndex].mp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
