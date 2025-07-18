
import { useEffect, useRef } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { useEnglishVideoTestimonial } from '@/contexts/EnglishVideoTestimonialContext';
import { useTranslation } from '@/hooks/useTranslation';

const englishVideos = [
  {
    id: 'english-testimonio1',
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%201.mp4',
    title: 'English Testimonial 1'
  },
  {
    id: 'english-testimonio2',
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%202.mp4',
    title: 'English Testimonial 2'
  },
  {
    id: 'english-testimonio3',
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20TESTIMONIO%203.mp4',
    title: 'English Testimonial 3'
  },
  {
    id: 'english-comercial1',
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20COMERCIAL%201.mp4',
    title: 'English Commercial 1'
  },
  {
    id: 'english-comercial2',
    url: 'https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/videoenglish/INGLeS%20COMERCIAL%202.mp4',
    title: 'English Commercial 2'
  }
];

export function GlobalEnglishVideoTestimonials() {
  const { 
    isVisible, 
    setIsVisible, 
    currentVideoIndex, 
    setCurrentVideoIndex, 
    isMuted, 
    setIsMuted 
  } = useEnglishVideoTestimonial();
  
  const { i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Only show for English, Romanian, or Portuguese languages
  const shouldShow = i18n.language === 'en' || i18n.language === 'ro' || i18n.language === 'pt';

  useEffect(() => {
    if (!shouldShow) {
      console.log('English videos hidden - language is:', i18n.language);
      return;
    }

    console.log('English videos should show - language is:', i18n.language);
    
    // Start first video after 1 second
    const initialTimer = setTimeout(() => {
      console.log('Starting English video testimonials after 1 second');
      setIsVisible(true);
      setCurrentVideoIndex(0);
      setupContinuousTimer();
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldShow, i18n.language]);

  const setupContinuousTimer = () => {
    console.log('Setting up 60-second continuous cycle timer for English videos');
    timerRef.current = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % englishVideos.length;
        console.log(`60 seconds elapsed - showing next English video: ${nextIndex}`);
        return nextIndex;
      });
    }, 60000);
  };

  const currentVideo = englishVideos[currentVideoIndex];

  useEffect(() => {
    if (!isVisible || !videoRef.current || !currentVideo) return;

    const video = videoRef.current;
    
    console.log(`Setting up English video: ${currentVideo.id}`);
    
    const handleLoadedData = () => {
      console.log(`English video loaded successfully: ${currentVideo.id}`);
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`English video started playing: ${currentVideo.id}`);
          })
          .catch(error => {
            console.error(`Error playing English video ${currentVideo.id}:`, error);
          });
      }
    };

    const handleEnded = () => {
      console.log(`English video ended: ${currentVideo.id}`);
    };

    const handleError = (e: Event) => {
      console.error(`Error loading English video ${currentVideo.id}:`, e);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    video.muted = isMuted;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideo, isVisible, isMuted]);

  if (!shouldShow || !isVisible || !currentVideo) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="relative bg-black/80 rounded-lg overflow-hidden shadow-2xl border border-fuchsia-500/20">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-48 h-32 object-cover"
            playsInline
            muted={isMuted}
            preload="metadata"
          >
            <source src={currentVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={toggleMute}
              className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            
            <button
              onClick={handleClose}
              className="p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              title="Close"
            >
              <X size={14} />
            </button>
          </div>
          
          <div className="absolute bottom-1 left-2 right-2">
            <div className="text-xs text-white/80 truncate">
              {currentVideo.title}
            </div>
            <div className="flex space-x-1 mt-1">
              {englishVideos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index === currentVideoIndex ? 'bg-fuchsia-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
