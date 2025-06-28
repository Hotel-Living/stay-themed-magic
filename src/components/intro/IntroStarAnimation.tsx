
import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';
import { useTranslation } from 'react-i18next';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    t('intro.welcome'),
    t('intro.tagline'),
    t('intro.experience'),
    t('intro.style'),
    t('intro.community'),
    t('intro.passion')
  ];

  useEffect(() => {
    if (currentStep >= messages.length) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Smoother, faster transitions - each text shows for 2 seconds total
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, messages.length, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Starfield />
      <div className="relative z-10 text-center px-8">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              index === currentStep ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 
              className="text-7xl md:text-11xl font-bold text-yellow-400 max-w-4xl leading-tight whitespace-pre-line uppercase"
              style={{
                textShadow: '0 0 2px rgba(255, 255, 255, 0.15), 0 0 4px rgba(255, 255, 255, 0.075)',
                WebkitTextStroke: '0.25px rgba(255, 255, 255, 0.2)'
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
