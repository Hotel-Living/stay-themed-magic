
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_MESSAGES = [
  "La revolución ha llegado",
  "Multiplica tu vida", 
  "Vive en hoteles · Vive con estilo",
  "Conoce afines · Disfruta tus pasiones"
];

const VISIT_COUNT_KEY = 'hotel-living-intro-visits';
const MAX_INTRO_SHOWS = 5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageVisible, setMessageVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const startAnimation = () => {
      // Wait for stars to populate, then start showing text
      setTimeout(() => {
        setShowText(true);
        // First message appears after stars have populated
        setTimeout(() => {
          setMessageVisible(true);
        }, 800);
      }, 1000);

      // Cycle through messages with overlapping fade transitions
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          if (prev < INTRO_MESSAGES.length - 1) {
            // Start fading out current message while preparing next
            setMessageVisible(false);
            
            // Show next message with overlap
            setTimeout(() => {
              setMessageVisible(true);
            }, 400); // Shorter overlap for smoother transition
            
            return prev + 1;
          } else {
            // All messages shown, start outro
            clearInterval(messageInterval);
            
            // Fade out last message
            setMessageVisible(false);
            
            // Fade out entire animation
            setTimeout(() => {
              setIsVisible(false);
              
              // Complete animation and update visit count
              setTimeout(() => {
                updateVisitCount();
                onComplete();
              }, 800);
            }, 1000);
            
            return prev;
          }
        });
      }, 1400); // Each message cycle for better pacing over 7 seconds

      return () => clearInterval(messageInterval);
    };

    startAnimation();
  }, [onComplete]);

  const updateVisitCount = () => {
    const currentCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    localStorage.setItem(VISIT_COUNT_KEY, (currentCount + 1).toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#411052' }}>
      <HotelStarfield />
      
      {showText && (
        <div className="relative z-10 text-center px-8">
          <div 
            className={`font-bold text-4xl md:text-6xl lg:text-7xl transition-all duration-1000 transform ${
              messageVisible ? 'opacity-100 scale-100 translate-z-0' : 'opacity-0 scale-75 translate-z-[-100px]'
            }`}
            style={{
              color: '#FFD700', // Pure yellow color
              WebkitTextStroke: '2px white', // White outline
              textStroke: '2px white', // For other browsers
              textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4), 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              filter: messageVisible ? 'blur(0px)' : 'blur(4px)'
            }}
          >
            {INTRO_MESSAGES[currentMessageIndex]}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook to check if intro should be shown
export function useIntroAnimation() {
  const [shouldShowIntro, setShouldShowIntro] = useState(false);

  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    setShouldShowIntro(visitCount < MAX_INTRO_SHOWS);
  }, []);

  const handleIntroComplete = () => {
    setShouldShowIntro(false);
  };

  return {
    shouldShowIntro,
    handleIntroComplete
  };
}
