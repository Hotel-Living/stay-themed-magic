
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, VolumeX, Volume2 } from 'lucide-react';

interface Video {
  id: string;
  src: string;
}

const videos: Video[] = [
  { id: 'testimonio1', src: '/lovable-uploads/2c7cc8c5-95e2-40e8-9ca7-da0d80c21e1e.mp4' },
  { id: 'testimonio2', src: '/lovable-uploads/ee8c7b57-4c4c-4cb3-b49f-93bce5f8c21b.mp4' },
  { id: 'testimonio3', src: '/lovable-uploads/12aaffd5-5c41-426b-937b-21f3e9a31e5f.mp4' },
  { id: 'testimonio4', src: '/lovable-uploads/5ce6c8d1-0b38-4f7e-8d87-da4d9a1a60df.mp4' },
  { id: 'testimonio5', src: '/lovable-uploads/3b4f7a09-0a2d-4e8f-9c1b-12345678abcd.mp4' },
];

export function GlobalVideoTestimonials() {
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }

  const currentVideo = videos[currentVideoIndex];

  const closeVideo = () => {
    setIsVisible(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const moveToNextVideo = () => {
    console.log('Moving to next video from index:', currentVideoIndex);
    
    if (currentVideoIndex < videos.length - 1) {
      // Not the last video, move to next immediately
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsVisible(true);
      console.log('Next video index:', currentVideoIndex + 1);
    } else {
      // Last video reached, complete the sequence
      console.log('Sequence complete, waiting 60 seconds before restart');
      setIsSequenceComplete(true);
      setIsVisible(false);
      
      // Wait 60 seconds before restarting the cycle
      setTimeout(() => {
        console.log('Restarting cycle from first video');
        setCurrentVideoIndex(0);
        setIsSequenceComplete(false);
        setIsVisible(true);
      }, 60000);
    }
  };

  const handleVideoError = (videoIndex: number) => {
    console.log('Video loading error for:', videos[videoIndex].id);
    // Skip the problematic video and move to next
    if (videoIndex < videos.length - 1) {
      setCurrentVideoIndex(videoIndex + 1);
    } else {
      // If it's the last video that failed, restart cycle
      setCurrentVideoIndex(0);
    }
  };

  useEffect(() => {
    if (!isVisible || isSequenceComplete) return;

    const video = document.getElementById(`testimonial-video-${currentVideo.id}`) as HTMLVideoElement;
    if (!video) return;

    const handleLoadedData = () => {
      console.log('Video loaded successfully:', currentVideo.id);
      video.muted = isMuted;
      video.play().catch(error => {
        console.log('Autoplay failed:', error);
      });
    };

    const handleEnded = () => {
      console.log('Video ended:', currentVideo.id);
      // Hide video when it ends to prevent frozen frame
      setIsVisible(false);
      // Move to next video after a short delay
      setTimeout(() => {
        moveToNextVideo();
      }, 1000);
    };

    const handleError = () => {
      console.log('Video loading error:', currentVideo.id);
      handleVideoError(currentVideoIndex);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideo, isVisible, isMuted, currentVideoIndex, isSequenceComplete]);

  // Update video mute state when isMuted changes
  useEffect(() => {
    const video = document.getElementById(`testimonial-video-${currentVideo.id}`) as HTMLVideoElement;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted, currentVideo.id]);

  if (!isVisible || isSequenceComplete) {
    return null;
  }

  return (
    <div className="group fixed bottom-6 left-6 z-50 rounded-lg shadow-2xl w-40 h-[65px] md:w-64 md:h-[115px]">
      {/* Close button */}
      <button
        onClick={closeVideo}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <X className="w-3 h-3" />
      </button>

      {/* Video element */}
      <video
        key={currentVideo.id}
        id={`testimonial-video-${currentVideo.id}`}
        src={currentVideo.src}
        autoPlay
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-lg pointer-events-none"
      />

      {/* Volume toggle button */}
      <button
        onClick={toggleMute}
        className="absolute top-2 left-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        style={{ pointerEvents: 'auto' }}
      >
        {isMuted ? (
          <VolumeX className="w-3 h-3 text-white" />
        ) : (
          <Volume2 className="w-3 h-3 text-white" />
        )}
      </button>
    </div>
  );
}
