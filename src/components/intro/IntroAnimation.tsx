
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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'waiting' | 'approaching' | 'glowing' | 'dissolving'>('waiting');

  useEffect(() => {
    const startAnimation = () => {
      // Wait for stars to populate, then start showing all text in background
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

      // Set current message and start approach
      setCurrentMessageIndex(index);
      setAnimationPhase('approaching');
      
      // Phase 1: Approaching (2.5 seconds)
      setTimeout(() => {
        setAnimationPhase('glowing');
        
        // Phase 2: Glowing and readable (2 seconds)
        setTimeout(() => {
          setAnimationPhase('dissolving');
          
          // Phase 3: Dissolving into star dust (1.5 seconds)
          setTimeout(() => {
            setAnimationPhase('waiting');
            
            // Brief pause before next message (0.5 seconds)
            setTimeout(() => {
              startMessageSequence(index + 1);
            }, 500);
          }, 1500);
        }, 2000);
      }, 2500);
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
    
    if (!showText) {
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -2000px) scale(0.1)',
        filter: 'blur(20px)'
      };
    }

    if (isPast) {
      // Already dissolved messages
      return {
        opacity: 0,
        transform: 'translate3d(0, 0, -1000px) scale(0.3)',
        filter: 'blur(30px)'
      };
    }

    if (isCurrent) {
      // Current active message
      switch (animationPhase) {
        case 'approaching':
          return {
            opacity: 0.8,
            transform: 'translate3d(0, 0, -200px) scale(0.7)',
            filter: 'blur(4px)',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)'
          };
        case 'glowing':
          return {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) scale(1)',
            filter: 'blur(0px)',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.9), 0 0 80px rgba(255, 215, 0, 0.6), 0 0 120px rgba(255, 215, 0, 0.4)'
          };
        case 'dissolving':
          return {
            opacity: 0,
            transform: 'translate3d(0, -50px, 100px) scale(1.1)',
            filter: 'blur(15px)',
            textShadow: '0 0 60px rgba(255, 215, 0, 0.3), 0 0 120px rgba(255, 255, 255, 0.2)'
          };
        default:
          return {
            opacity: 0.3,
            transform: 'translate3d(0, 0, -800px) scale(0.4)',
            filter: 'blur(8px)'
          };
      }
    } else {
      // Future messages - floating in background
      const offset = (messageIndex - currentMessageIndex) * 100;
      return {
        opacity: 0.2,
        transform: `translate3d(${offset * 0.3}px, ${offset * 0.2}px, -${800 + offset * 100}px) scale(0.4)`,
        filter: 'blur(8px)',
        textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
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
              transition: 'all 2500ms cubic-bezier(0.23, 1, 0.32, 1)',
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
