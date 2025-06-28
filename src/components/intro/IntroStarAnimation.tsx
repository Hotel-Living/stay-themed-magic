
import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';
import { useTranslation } from 'react-i18next';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    t('intro.welcome'),
    t('intro.tagline'),
    t('intro.experience'),
    t('intro.style'),
    t('intro.community'),
    t('intro.people'),
    t('intro.passion')
  ];

  const formatTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index}>{line.toUpperCase()}</div>
    ));
  };

  useEffect(() => {
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
        {currentStep === -1 && <div />}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
              index === currentStep ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-yellow-400 max-w-6xl leading-tight whitespace-pre-line uppercase tracking-wider"
              style={{
                textShadow: '3px 3px 0px white, -3px -3px 0px white, 3px -3px 0px white, -3px 3px 0px white, 0px 3px 0px white, 3px 0px 0px white, 0px -3px 0px white, -3px 0px 0px white, 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white',
                WebkitTextStroke: '1px white',
                fontWeight: '900',
                letterSpacing: '0.05em'
              }}
            >
              {formatTextWithLineBreaks(message)}
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
