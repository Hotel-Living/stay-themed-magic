
import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';
import { useTranslation } from 'react-i18next';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for initial delay
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    t('intro.welcome'),
    t('intro.tagline'),
    t('intro.experience'),
    t('intro.style'),
    t('intro.community'),
    t('intro.passion')
  ];

  // ✅ Esta función divide correctamente en dos líneas visuales
  const formatTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index} className="block">{line}</span>
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
              index === currentStep 
                ? 'opacity-100 scale-100 translate-y-0' 
                : index < currentStep 
                  ? 'opacity-0 scale-95 -translate-y-4' 
                  : 'opacity-0 scale-105 translate-y-4'
            }`}
          >
            <h1 
              className="text-lg md:text-2xl lg:text-3xl font-bold text-yellow-400 max-w-4xl leading-tight uppercase text-center animate-pulse-glow"
              style={{
                textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-x 3s ease infinite, pulse-glow 2s infinite alternate',
                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
              }}
            >
              {formatTextWithLineBreaks(message)}
            </h1>
          </div>
        ))}
        
        {/* Dust particle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-20 animate-floating"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const useIntroAnimation = () => {
  const [shouldShow, setShouldShow] = useState(() => {
    return !localStorage.getItem('intro-animation-seen');
  });

  const handleComplete = () => {
    localStorage.setItem('intro-animation-seen', 'true');
    setShouldShow(false);
  };

  return {
    shouldShowIntro: shouldShow,
    handleIntroComplete: handleComplete
  };
};
