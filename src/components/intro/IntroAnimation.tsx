
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

const INTRO_MESSAGES = [
  "LA REVOLUCIÓN HA LLEGADO",
  "MULTIPLICA TU VIDA", 
  "VIVE EN HOTELES",
  "VIVE CON ESTILO",
  "CONOCE AFINES",
  "DISFRUTA TUS PASIONES"
];

const VISIT_COUNT_KEY = 'hotel-living-intro-visits';
const MAX_INTRO_SHOWS = 5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);
  const [showAllText, setShowAllText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'approaching' | 'glowing' | 'dissolving'>('waiting');

  useEffect(() => {
    const startAnimation = () => {
      // Wait for stars to populate, then show all text floating in background
      setTimeout(() => {
        setShowAllText(true);
        // Start the sequential animation after all text is visible
        setTimeout(() => {
          startMessageSequence(0);
        }, 500);
      }, 1000);
    };

    const startMessageSequence = (index: number) => {
      if (index >= INTRO_MESSAGES.length) {
        // All messages completed, start outro
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            updateVisitCount();
            onComplete();
          }, 750);
        }, 500);
        return;
      }

      // Set current message and start approach
      setCurrentMessageIndex(index);
      setAnimationPhase('approaching');
      
      // Phase 1: Approaching (1 seconds)
      setTimeout(() => {
        setAnimationPhase('glowing');
        
        // Phase 2: Glowing and readable (1 second)
        setTimeout(() => {
          setAnimationPhase('dissolving');
          
          // Phase 3: Dissolving into star dust (1 second)
          setTimeout(() => {
            setAnimationPhase('waiting');
            
            // Brief pause before next message (0.25 seconds)
            setTimeout(() => {
              startMessageSequence(index + 1);
            }, 250);
          }, 1000);
        }, 1000);
      }, 1000);
    };

    startAnimation();
  }, [onComplete]);

  const updateVisitCount = () => {
    const currentCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0');
    localStorage.setItem(VISIT_COUNT_KEY, (currentCount + 1).toString());
  };

  if (!isVisible) return null;

  // Get animation styles for each message
  const getMessageStyles = (messageIndex: number) => {
    const isCurrent = messageIndex === currentMessageIndex;
    const isPast = messageIndex < currentMessageIndex;
    
    if (!showAllText) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -3000px) scale(0.1)',
        filter: 'blur(30px)'
      };
    }

    if (isPast) {
      // Already dissolved messages - completely invisible
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -2000px) scale(0.2)',
        filter: 'blur(40px)'
      };
    }

    if (isCurrent) {
      // Current active message
      switch (animationPhase) {
        case 'approaching':
          return {
            opacity: 0.9,
            transform: 'translate3d(0, 0, -100px) scale(0.85)',
            filter: 'blur(2px)',
            textShadow: '0 0 30px rgba(255, 215, 0, 0.7), 0 0 60px rgba(255, 215, 0, 0.5)'
          };
        case 'glowing':
          return {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0px)',
            textShadow: '0 0 50px rgba(255, 215, 0, 1), 0 0 100px rgba(255, 215, 0, 0.8), 0 0 150px rgba(255, 215, 0, 0.6)'
          };
        case 'dissolving':
          return {
            opacity: 0,
            transform: 'translate3d(0, -30px, 50px) scale(1.05)',
            filter: 'blur(20px)',
            textShadow: '0 0 80px rgba(255, 215, 0, 0.4), 0 0 160px rgba(255, 255, 255, 0.3)'
          };
        default:
          return {
            opacity: 0.15,
            transform: 'translate3d(0, 0, -1200px) scale(0.3)',
            filter: 'blur(12px)'
          };
      }
    } else {
      // Future messages - floating in deep background like distant spacecraft
      const offset = (messageIndex - Math.max(currentMessageIndex, 0)) * 80;
      const depth = 1500 + offset * 150;
      return {
        opacity: 0.12,
        transform: `translate3d(${offset * 0.4}px, ${offset * 0.3}px, -${depth}px) scale(0.25)`,
        filter: 'blur(15px)',
        textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#411052' }}>
      <HotelStarfield />
      
      <div className="relative z-10 text-center px-8 w-full h-full flex items-center justify-center">
        {INTRO_MESSAGES.map((message, index) => (
          <div
            key={index}
            className="absolute font-bold text-4xl md:text-6xl lg:text-7xl whitespace-nowrap"
            style={{
              color: '#FFD700',
              WebkitTextStroke: '1px white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1)',
              willChange: 'transform, opacity, filter',
              ...getMessageStyles(index)
            }}
          >
            {message}
          </div>
        ))}
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
