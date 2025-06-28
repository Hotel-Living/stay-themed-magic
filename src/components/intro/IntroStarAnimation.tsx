
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [starPhase, setStarPhase] = useState<'approaching' | 'exploding' | 'showing' | 'dissolving'>('approaching');
  const [starDirection, setStarDirection] = useState<'left' | 'right'>('left');
  
  const lines = [
    'LA REVOLUCIÓN HA LLEGADO',
    'MULTIPLICA TU VIDA',
    'VIVE EN HOTELES',
    'VIVE CON ESTILO',
    'CONOCE AFINES',
    'DISFRUTA TUS PASIONES'
  ];

  useEffect(() => {
    if (currentLine >= lines.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const sequence = async () => {
      // Set star direction (alternate)
      setStarDirection(currentLine % 2 === 0 ? 'left' : 'right');
      
      // Phase 1: Star approaching (1.5s)
      setStarPhase('approaching');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Phase 2: Star exploding into text (0.3s)
      setStarPhase('exploding');
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Phase 3: Text showing (1s)
      setStarPhase('showing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 4: Text dissolving into stardust (0.7s)
      setStarPhase('dissolving');
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Move to next line
      setCurrentLine(prev => prev + 1);
    };

    const timer = setTimeout(sequence, 100);
    return () => clearTimeout(timer);
  }, [currentLine, lines.length, onComplete]);

  if (currentLine >= lines.length) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <HotelStarfield />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <HotelStarfield />
      
      {/* Approaching Star */}
      {starPhase === 'approaching' && (
        <div 
          className={`absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg transition-all duration-1500 ease-out ${
            starDirection === 'left' 
              ? 'animate-[approachFromLeft_1.5s_ease-out_forwards]' 
              : 'animate-[approachFromRight_1.5s_ease-out_forwards]'
          }`}
          style={{
            boxShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24',
            filter: 'brightness(1.5)',
          }}
        />
      )}

      {/* Exploding Star Effect */}
      {starPhase === 'exploding' && (
        <div className="absolute">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-[starBurst_0.3s_ease-out_forwards]"
              style={{
                transform: `rotate(${i * 30}deg) translateX(0px)`,
                animationDelay: `${i * 0.02}s`,
                boxShadow: '0 0 10px #fde047',
              }}
            />
          ))}
        </div>
      )}

      {/* Text Display */}
      {(starPhase === 'exploding' || starPhase === 'showing' || starPhase === 'dissolving') && (
        <div 
          className={`text-center transition-all duration-300 ${
            starPhase === 'exploding' ? 'animate-[textAppear_0.3s_ease-out_forwards] opacity-0' :
            starPhase === 'showing' ? 'opacity-100 scale-100' :
            'animate-[textDissolve_0.7s_ease-out_forwards]'
          }`}
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-400 leading-tight"
            style={{
              textShadow: '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 0 0 20px #fbbf24',
              WebkitTextStroke: '1px white',
            }}
          >
            {lines[currentLine]}
          </h1>
        </div>
      )}

      {/* Dissolving Stars Effect */}
      {starPhase === 'dissolving' && (
        <div className="absolute">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-[stardustDissolve_0.7s_ease-out_forwards]"
              style={{
                left: `${Math.random() * 100}px`,
                top: `${Math.random() * 100}px`,
                animationDelay: `${Math.random() * 0.5}s`,
                boxShadow: '0 0 5px #fde047',
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes approachFromLeft {
          0% {
            left: -200px;
            top: 50%;
            transform: translateY(-50%) scale(0.2);
            opacity: 0.3;
          }
          100% {
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes approachFromRight {
          0% {
            right: -200px;
            top: 50%;
            transform: translateY(-50%) scale(0.2);
            opacity: 0.3;
          }
          100% {
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes starBurst {
          0% {
            transform: rotate(var(--rotation)) translateX(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) translateX(60px) scale(0);
            opacity: 0;
          }
        }

        @keyframes textAppear {
          0% {
            opacity: 0;
            transform: scale(0.5);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        @keyframes textDissolve {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
            filter: blur(5px);
          }
        }

        @keyframes stardustDissolve {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
          100% {
            opacity: 0;
            transform: scale(0) translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
};

export const useIntroStarAnimation = () => {
  const [shouldShowIntro, setShouldShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntroStar');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntroStar', 'true');
    setShouldShowIntro(false);
  };

  return { shouldShowIntro, handleIntroComplete };
};
