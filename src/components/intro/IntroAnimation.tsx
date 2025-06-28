import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const animationTexts = [
    t('intro.welcome'),
    t('intro.revolution'),
    t('intro.enjoy'),
    t('intro.community'),
    t('intro.future')
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < animationTexts.length - 1) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setIsVisible(true);
        }, 500);
      } else {
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep, animationTexts.length, onComplete]);

  const currentText = animationTexts[currentStep];
  
  // Check if current text needs mobile splitting
  const needsMobileSplit = currentText === "LA REVOLUCIÓN HA LLEGADO" || currentText === "DISFRUTA TUS PASIONES";
  
  let mobileLines: string[] = [];
  if (needsMobileSplit) {
    if (currentText === "LA REVOLUCIÓN HA LLEGADO") {
      mobileLines = ["LA REVOLUCIÓN", "HA LLEGADO"];
    } else if (currentText === "DISFRUTA TUS PASIONES") {
      mobileLines = ["DISFRUTA", "TUS PASIONES"];
    }
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Desktop version - single line */}
        <div className="hidden md:block">
          <h1 
            className={`text-6xl font-bold text-yellow-400 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
            }}
          >
            {currentText}
          </h1>
        </div>

        {/* Mobile version - split lines when needed */}
        <div className="block md:hidden">
          {needsMobileSplit ? (
            <div className="space-y-2">
              {mobileLines.map((line, index) => (
                <h1 
                  key={index}
                  className={`text-4xl font-bold text-yellow-400 transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
                  }}
                >
                  {line}
                </h1>
              ))}
            </div>
          ) : (
            <h1 
              className={`text-4xl font-bold text-yellow-400 transition-all duration-1000 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
              }}
            >
              {currentText}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export function useIntroAnimation() {
  return {};
}
