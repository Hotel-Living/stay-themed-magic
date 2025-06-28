
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showStar, setShowStar] = useState(false);
  const [showText, setShowText] = useState(false);
  const [dissolving, setDissolving] = useState(false);

  const messages = [
    t('intro.message1'),
    t('intro.message2'),
    t('intro.message3'),
    t('intro.message4'),
    t('intro.finalMessage')
  ];

  useEffect(() => {
    if (currentStep >= messages.length) {
      setTimeout(() => {
        onComplete();
      }, 1000);
      return;
    }

    const sequence = async () => {
      // Show star
      setShowStar(true);
      setShowText(false);
      setDissolving(false);
      
      // Wait for star to appear
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Transform star to text
      setShowText(true);
      setShowStar(false);
      
      // Wait for text to be visible
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start dissolving
      setDissolving(true);
      
      // Wait for dissolve animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
    };

    sequence();
  }, [currentStep, messages.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <style>
        {`
          @keyframes starPulse {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          }
          
          @keyframes starToText {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.5) rotate(90deg); opacity: 0.5; }
            100% { transform: scale(1) rotate(0deg); opacity: 0; }
          }
          
          @keyframes textAppear {
            0% { transform: scale(0) translateZ(0px); opacity: 0; }
            50% { transform: scale(1.1) translateZ(20px); opacity: 0.8; }
            100% { transform: scale(1) translateZ(50px); opacity: 1; }
          }
          
          @keyframes dissolveToStars {
            0% { 
              opacity: 1; 
              transform: scale(1); 
              filter: blur(0px);
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.1); 
              filter: blur(1px);
            }
            100% { 
              opacity: 0; 
              transform: scale(0.8); 
              filter: blur(3px);
            }
          }
          
          .star-pulse {
            animation: starPulse 1.5s ease-in-out;
          }
          
          .star-transform {
            animation: starToText 0.8s ease-out forwards;
          }
          
          .text-appear {
            animation: textAppear 0.8s ease-out forwards;
          }
          
          .dissolve-stars {
            animation: dissolveToStars 1s ease-out forwards;
          }
          
          .stardust {
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffd700;
            border-radius: 50%;
            animation: float 2s ease-out forwards;
          }
          
          @keyframes float {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
          }
        `}
      </style>

      <div className="relative flex items-center justify-center min-h-[200px]">
        {/* Star */}
        {showStar && (
          <div className={`absolute inset-0 flex items-center justify-center ${showText ? 'star-transform' : 'star-pulse'}`}>
            <div className="text-6xl text-yellow-400" style={{ filter: 'drop-shadow(0 0 10px #ffd700)' }}>
              ✦
            </div>
          </div>
        )}

        {/* Text */}
        {showText && currentStep < messages.length && (
          <div className={`relative flex items-center justify-center ${dissolving ? 'dissolve-stars' : 'text-appear'}`}>
            <h1 
              className="text-4xl md:text-6xl font-bold text-center px-4 max-w-4xl"
              style={{
                color: '#ffd700',
                textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 2px 0px #000, 2px 0px 0px #000, 0px -2px 0px #000, -2px 0px 0px #000',
                transform: 'translateZ(50px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {messages[currentStep]}
            </h1>
            
            {/* Stardust particles for dissolve effect */}
            {dissolving && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="stardust"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      '--dx': `${(Math.random() - 0.5) * 200}px`,
                      '--dy': `${(Math.random() - 0.5) * 200}px`,
                      animationDelay: `${Math.random() * 0.5}s`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const useIntroAnimation = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleComplete = () => {
    setShowIntro(false);
  };

  return {
    showIntro,
    handleComplete
  };
};
