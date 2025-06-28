
import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';
import { useTranslation } from 'react-i18next';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for initial delay
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    t('intro.revolution'),
    t('intro.multiply'),
    t('intro.liveHotels'),
    t('intro.liveStyle'),
    t('intro.meetAffinities'),
    t('intro.enjoyPassions')
  ];

  useEffect(() => {
    // Initial 1 second delay before starting
    if (currentStep === -1) {
      const timer = setTimeout(() => {
        setCurrentStep(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (currentStep >= messages.length) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Each text shows for 2.5 seconds total (fade in + display + fade out)
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentStep, messages.length, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Starfield />
      <div className="relative z-10 text-center px-8">
        {currentStep >= 0 && messages.map((message, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              index === currentStep ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 
              className="text-5xl md:text-9xl lg:text-12xl font-bold text-yellow-400 max-w-4xl leading-tight whitespace-pre-line uppercase"
              style={{
                textShadow: '0 0 1px rgba(255, 255, 255, 0.075), 0 0 2px rgba(255, 255, 255, 0.0375)',
                WebkitTextStroke: '0.125px rgba(255, 255, 255, 0.1)'
              }}
            >
              {message}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export const useIntroStarAnimation = () => {
  const [shouldShow, setShouldShow] = useState(() => {
    return !localStorage.getItem('intro-star-seen');
  });

  const handleComplete = () => {
    localStorage.setItem('intro-star-seen', 'true');
    setShouldShow(false);
  };

  return {
    shouldShowIntro: shouldShow,
    handleIntroComplete: handleComplete
  };
};
