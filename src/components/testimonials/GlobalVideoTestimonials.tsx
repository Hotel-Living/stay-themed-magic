import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const testimonials = [
  { id: 'testimonio1', src: '/lovable-uploads/testimonio1.webm' },
  { id: 'testimonio2', src: '/lovable-uploads/testimonio2.webm' },
  { id: 'testimonio3', src: '/lovable-uploads/testimonio3.webm' },
  { id: 'testimonio4', src: '/lovable-uploads/testimonio4.webm' },
  { id: 'testimonio5', src: '/lovable-uploads/testimonio5.webm' }
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // No mostrar en Index
  if (location.pathname === '/') {
    return null;
  }

  useEffect(() => {
    const startVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = 0;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('🎥 Error al reproducir video:', error);
        });
      }
    };

    const handleLoad = () => {
      startVideo();
    };

    const handleError = (e: Event) => {
      console.error('🎥 Error al cargar video:', testimonials[currentVideoIndex].id, e);
    };

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    // ⏰ Mecanismo de cambio de vídeo cada 60 segundos, independientemente de la duración
    timerRef.current = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % testimonials.length);
    }, 60000); // cada 60.000 ms = 60 segundos

    video.load(); // cargar primer vídeo inmediatamente

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideoIndex]);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="w-32 h-24 rounded-lg overflow-hidden shadow-lg bg-black">
        <video
          ref={videoRef}
          src={testimonials[currentVideoIndex].src}
          className="w-full h-full"
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload"
        />
      </div>
    </div>
  );
}
