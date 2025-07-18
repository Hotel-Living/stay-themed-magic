
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface VideoTestimonial {
  id: string;
  webm: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'testimonio1',
    webm: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio1.webm'
  },
  {
    id: 'testimonio2', 
    webm: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio2.webm'
  },
  {
    id: 'testimonio3',
    webm: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio3.webm'
  },
  {
    id: 'testimonio4',
    webm: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio4.webm'
  },
  {
    id: 'testimonio5',
    webm: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videos/testimonio5.webm'
  }
];

export function GlobalVideoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  // Don't show testimonials on the homepage
  const shouldShow = location.pathname !== '/';

  useEffect(() => {
    if (!shouldShow) {
      setIsVisible(false);
      return;
    }

    // Show testimonials after a short delay on non-homepage routes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [shouldShow, location.pathname]);

  useEffect(() => {
    if (!isVisible || videoTestimonials.length === 0) return;

    const interval = setInterval(() => {
      console.log('🎥 Switching to next video after 60 seconds');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoTestimonials.length);
    }, 60000); // Switch every 60 seconds

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;
    const currentTestimonial = videoTestimonials[currentIndex];

    console.log('🎥 GlobalVideoTestimonials: Initializing video', {
      currentIndex,
      testimonial: currentTestimonial,
      pathname: location.pathname
    });

    setIsLoading(true);
    setVideoError(null);

    const handleLoadStart = () => {
      console.log('🎥 Video load started:', currentTestimonial.id);
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      console.log('🎥 Video can play:', currentTestimonial.id);
      setIsLoading(false);
      setVideoError(null);
    };

    const handleError = (e: Event) => {
      const error = (e.target as HTMLVideoElement).error;
      const errorMessage = `Failed to load video: ${currentTestimonial.id}`;
      
      console.error('🎥 Video load error:', {
        testimonialId: currentTestimonial.id,
        error: e,
        videoSrc: video.src,
        videoError: error
      });
      
      setVideoError(errorMessage);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      console.log('🎥 Video loaded successfully:', currentTestimonial.id);
      setIsLoading(false);
      setVideoError(null);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    // Load the video
    video.src = currentTestimonial.webm;
    video.load();

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentIndex, isVisible, location.pathname]);

  if (!shouldShow || !isVisible) {
    return null;
  }

  const currentTestimonial = videoTestimonials[currentIndex];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-xs">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Loading video...</span>
              </div>
            </div>
          )}
          
          {videoError && (
            <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-10 p-4">
              <div className="text-center">
                <div className="text-red-600 text-sm font-medium mb-2">Video Error</div>
                <div className="text-red-500 text-xs">{videoError}</div>
                <button 
                  onClick={() => {
                    setCurrentIndex((prev) => (prev + 1) % videoTestimonials.length);
                  }}
                  className="mt-2 text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
                >
                  Try Next Video
                </button>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-48 object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            style={{ display: isLoading || videoError ? 'none' : 'block' }}
          />
          
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1}/{videoTestimonials.length}
          </div>
        </div>
        
        <div className="p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">
            Customer Testimonial
          </div>
          <div className="text-xs text-gray-600">
            Real experiences from our guests
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setCurrentIndex((prev) => prev === 0 ? videoTestimonials.length - 1 : prev - 1)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
              disabled={isLoading}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % videoTestimonials.length)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
              disabled={isLoading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
