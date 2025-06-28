
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
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'fadingIn' | 'displaying' | 'fadingOut' | 'complete'>('waiting');

  useEffect(() => {
    const startAnimation = () => {
      // Wait for stars to populate, then start showing text
      setTimeout(() => {
        setShowText(true);
        startMessageSequence(0);
      }, 2000);
    };

    const startMessageSequence = (index: number) => {
      if (index >= INTRO_MESSAGES.length) {
        // All messages completed, start outro
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            updateVisitCount();
            onComplete();
          }, 1500);
        }, 1000);
        return;
      }

      // Set current message
      setCurrentMessageIndex(index);
      setAnimationPhase('fadingIn');
      
      // Phase 1: Fade in (2 seconds)
      setTimeout(() => {
        setMessageVisible(true);
        setAnimationPhase('displaying');
        
        // Phase 2: Display (1.5 seconds)
        setTimeout(() => {
          setAnimationPhase('fadingOut');
          
          // Phase 3: Fade out (2 seconds)
          setTimeout(() => {
            setMessageVisible(false);
            setAnimationPhase('waiting');
            
            // Phase 4: Brief pause before next message (0.5 seconds)
            setTimeout(() => {
              startMessageSequence(index + 1);
            }, 500);
          }, 2000);
        }, 1500);
      }, 2000);
    };

    startAnimation();
  }, [onComplete]);

  const updateVisitCount = () => {
    const currentCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    localStorage.setItem(VISIT_COUNT_KEY, (currentCount + 1).toString());
  };

  if (!isVisible) return null;

  // Calculate animation state based on phase
  const getAnimationState = () => {
    switch (animationPhase) {
      case 'fadingIn':
        return messageVisible;
      case 'displaying':
        return true;
      case 'fadingOut':
        return false;
      default:
        return false;
    }
  };

  const animationState = getAnimationState();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#411052' }}>
      <HotelStarfield />
      
      {showText && (
        <div className="relative z-10 text-center px-8">
          <div 
            className={`font-bold text-4xl md:text-6xl lg:text-7xl transition-all duration-[2000ms] transform ${
              animationState ? 'opacity-100 scale-100 translate-z-0' : 'opacity-0 scale-80 translate-z-[-400px]'
            }`}
            style={{
              color: '#FFD700', // Pure yellow color
              WebkitTextStroke: '0.5px white', // Thin white outline
              textShadow: '0 0 40px rgba(255, 215, 0, 0.9), 0 0 80px rgba(255, 215, 0, 0.6), 0.5px 0.5px 0px white, -0.5px -0.5px 0px white, 0.5px -0.5px 0px white, -0.5px 0.5px 0px white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              filter: animationState ? 'blur(0px)' : 'blur(12px)',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transition: 'all 2000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Very smooth easing
              willChange: 'transform, opacity, filter'
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
