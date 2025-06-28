
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showStarfield, setShowStarfield] = useState(false);
  const [showStar, setShowStar] = useState(false);

  const messages = [
    t('intro.message1'),
    t('intro.message2'),
    t('intro.message3'),
    t('intro.message4'),
    t('intro.message5'),
    t('intro.finalMessage')
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < messages.length - 1) {
        // Start dissolve into stars
        setShowStarfield(true);
        setIsVisible(false);
        
        setTimeout(() => {
          setShowStarfield(false);
          setCurrentStep(currentStep + 1);
          setShowStar(true);
          
          // Star transforms into text
          setTimeout(() => {
            setShowStar(false);
            setIsVisible(true);
          }, 500);
        }, 800);
      } else {
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, messages.length, onComplete]);

  // Generate random stars for starfield effect
  const generateStars = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`
        }}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center relative">
        {/* Starfield dissolve effect */}
        {showStarfield && (
          <div className="absolute inset-0 w-96 h-32">
            {generateStars()}
          </div>
        )}
        
        {/* Single star that transforms into text */}
        {showStar && (
          <div className="flex items-center justify-center h-32">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse transform transition-all duration-500" />
          </div>
        )}
        
        {/* Text with smooth single approach animation */}
        {isVisible && !showStar && (
          <h1 
            className="text-4xl md:text-6xl font-bold text-yellow-400 animate-fade-in transition-all duration-1000 ease-out"
            style={{
              WebkitTextStroke: '2px white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
              transform: 'translateZ(0) scale(1)',
              animation: 'smoothApproach 1s ease-out forwards'
            }}
          >
            {messages[currentStep]}
          </h1>
        )}
      </div>
      
      <style jsx>{`
        @keyframes smoothApproach {
          0% {
            transform: translateZ(-1000px) scale(0.1);
            opacity: 0;
          }
          100% {
            transform: translateZ(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function useIntroAnimation() {
  const [shouldShowIntro, setShouldShowIntro] = useState(() => {
    return !localStorage.getItem('intro-seen');
  });

  const handleIntroComplete = () => {
    localStorage.setItem('intro-seen', 'true');
    setShouldShowIntro(false);
  };

  return {
    shouldShowIntro,
    handleIntroComplete
  };
}
