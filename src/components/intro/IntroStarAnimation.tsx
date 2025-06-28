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
  const [exitingStep, setExitingStep] = useState<number | null>(null);

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
      // Set the current step as exiting before moving to next
      setExitingStep(currentStep);
      setTimeout(() => {
        setExitingStep(null);
        setCurrentStep(prev => prev + 1);
      }, 600); // Allow time for star dust animation
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
            } ${exitingStep === index ? 'animate-star-dust-exit' : ''}`}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-yellow-400 max-w-6xl leading-tight whitespace-pre-line uppercase tracking-wider"
              style={{
                textShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.6), 0 0 90px rgba(255, 215, 0, 0.4), 0 0 120px rgba(255, 215, 0, 0.3), 0 0 150px rgba(255, 215, 0, 0.2)',
                WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.6)',
                fontWeight: '900',
                letterSpacing: '0.05em',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
              }}
            >
              {formatTextWithLineBreaks(message)}
            </h1>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes star-dust-exit {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
            filter: blur(1px);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
            filter: blur(3px);
          }
        }
        
        .animate-star-dust-exit {
          animation: star-dust-exit 0.6s ease-out forwards;
        }
        
        .animate-star-dust-exit::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, 
            rgba(255, 215, 0, 0.3) 0%, 
            rgba(138, 43, 226, 0.2) 30%, 
            transparent 70%);
          animation: particle-scatter 0.6s ease-out forwards;
          pointer-events: none;
          z-index: -1;
          transform: translate(-50%, -50%);
        }
        
        @keyframes particle-scatter {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          30% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `}</style>
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
