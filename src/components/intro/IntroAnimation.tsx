
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_MESSAGES = [
  "LA REVOLUCIÓN HA LLEGADO",
  "MULTIPLICA TU VIDA", 
  "VIVE EN HOTELES · VIVE CON ESTILO",
  "CONOCE AFINES · DISFRUTA TUS PASIONES"
];

const VISIT_COUNT_KEY = 'hotel-living-intro-visits';
const MAX_INTRO_SHOWS = 5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const startAnimation = () => {
      // First message appears after a brief delay
      setTimeout(() => {
        setMessageVisible(true);
      }, 500);

      // Cycle through messages
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          if (prev < INTRO_MESSAGES.length - 1) {
            // Fade out current message
            setMessageVisible(false);
            
            // Show next message after fade out
            setTimeout(() => {
              setMessageVisible(true);
            }, 300);
            
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
              }, 500);
            }, 800);
            
            return prev;
          }
        });
      }, 1200); // Each message shows for 1.2 seconds

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <HotelStarfield />
      
      <div className="relative z-10 text-center px-8">
        <div 
          className={`text-white font-bold text-4xl md:text-6xl lg:text-7xl transition-all duration-300 transform ${
            messageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.05em'
          }}
        >
          {INTRO_MESSAGES[currentMessageIndex]}
        </div>
      </div>
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
