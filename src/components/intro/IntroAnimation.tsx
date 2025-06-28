
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_MESSAGES = [
  "La revolución ha llegado",
  "Multiplica tu vida", 
  "Vive en hoteles",
  "Vive con estilo",
  "Conoce afines",
  "Disfruta tus pasiones"
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
        // First message appears slowly from the background
        setTimeout(() => {
          setMessageVisible(true);
        }, 1500);
      }, 2000);

      // Cycle through messages with very slow, cinematic timing
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          if (prev < INTRO_MESSAGES.length - 1) {
            // Start dissolving current message very slowly
            setMessageVisible(false);
            
            // Show next message after a gentle transition
            setTimeout(() => {
              setMessageVisible(true);
            }, 1400); // Longer, smoother transition
            
            return prev + 1;
          } else {
            // All messages shown, start outro
            clearInterval(messageInterval);
            
            // Fade out last message very slowly
            setMessageVisible(false);
            
            // Fade out entire animation
            setTimeout(() => {
              setIsVisible(false);
              
              // Complete animation and update visit count
              setTimeout(() => {
                updateVisitCount();
                onComplete();
              }, 1200);
            }, 2000);
            
            return prev;
          }
        });
      }, 3000); // Much slower - each message cycle takes 3 seconds

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
            className={`font-bold text-4xl md:text-6xl lg:text-7xl transition-all duration-1800 transform ${
              messageVisible ? 'opacity-100 scale-100 translate-z-0' : 'opacity-0 scale-75 translate-z-[-300px]'
            }`}
            style={{
              color: '#FFD700', // Pure yellow color
              WebkitTextStroke: '0.5px white', // Thinner white outline
              textShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.5), 0.5px 0.5px 0px white, -0.5px -0.5px 0px white, 0.5px -0.5px 0px white, -0.5px 0.5px 0px white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              filter: messageVisible ? 'blur(0px)' : 'blur(8px)',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transition: 'all 1800ms cubic-bezier(0.23, 1, 0.32, 1)' // Much smoother, slower easing
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
