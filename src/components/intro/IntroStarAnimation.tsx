
import React, { useState, useEffect } from 'react';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

interface IntroStarAnimationProps {
  onComplete: () => void;
}

export const IntroStarAnimation: React.FC<IntroStarAnimationProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<'approaching' | 'exploding' | 'dissolving' | 'complete'>('approaching');
  const [direction, setDirection] = useState<'left' | 'right'>('left');

  const lines = [
    "LA REVOLUCIÓN HA LLEGADO",
    "MULTIPLICA TU VIDA",
    "VIVE EN HOTELES",
    "VIVE CON ESTILO",
    "CONOCE AFINES",
    "DISFRUTA TUS PASIONES"
  ];

  useEffect(() => {
    const sequenceTimer = setTimeout(() => {
      if (phase === 'approaching') {
        setPhase('exploding');
        setTimeout(() => {
          setPhase('dissolving');
          setTimeout(() => {
            if (currentLine < lines.length - 1) {
              setCurrentLine(prev => prev + 1);
              setDirection(prev => prev === 'left' ? 'right' : 'left');
              setPhase('approaching');
            } else {
              setPhase('complete');
              setTimeout(() => {
                onComplete();
              }, 1000);
            }
          }, 1500);
        }, 1000);
      }
    }, phase === 'approaching' ? 1500 : 0);

    return () => clearTimeout(sequenceTimer);
  }, [currentLine, phase, onComplete]);

  if (phase === 'complete' && currentLine >= lines.length - 1) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <HotelStarfield />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-4xl mx-auto px-4">
          {/* Approaching Star */}
          {phase === 'approaching' && (
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 star-approaching ${
                direction === 'left' ? 'star-from-left' : 'star-from-right'
              }`}
            >
              <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse" />
            </div>
          )}

          {/* Text Line */}
          {(phase === 'exploding' || phase === 'dissolving') && (
            <div className="text-center">
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-400 drop-shadow-lg transition-all duration-1000 ${
                  phase === 'exploding' 
                    ? 'opacity-100 scale-100 text-explosion' 
                    : 'opacity-0 scale-110 text-dissolve'
                }`}
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
                  WebkitTextStroke: '1px white'
                }}
              >
                {lines[currentLine]}
              </h1>
            </div>
          )}

          {/* Stardust particles for dissolve effect */}
          {phase === 'dissolving' && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-yellow-400 rounded-full stardust-particle stardust-${i}`}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${40 + Math.random() * 20}%`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .star-approaching {
            animation: starApproach 1.5s ease-out forwards;
          }
          
          .star-from-left {
            left: -100px;
            animation: starApproachLeft 1.5s ease-out forwards;
          }
          
          .star-from-right {
            right: -100px;
            animation: starApproachRight 1.5s ease-out forwards;
          }
          
          @keyframes starApproachLeft {
            0% {
              left: -100px;
              transform: translateY(-50%) scale(0.2);
              opacity: 0.5;
            }
            100% {
              left: 50%;
              transform: translateY(-50%) translateX(-50%) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes starApproachRight {
            0% {
              right: -100px;
              transform: translateY(-50%) scale(0.2);
              opacity: 0.5;
            }
            100% {
              right: 50%;
              transform: translateY(-50%) translateX(50%) scale(1);
              opacity: 1;
            }
          }
          
          .text-explosion {
            animation: textExplode 1s ease-out forwards;
          }
          
          @keyframes textExplode {
            0% {
              opacity: 0;
              transform: scale(0.1);
              filter: blur(10px);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
              filter: blur(2px);
            }
            100% {
              opacity: 1;
              transform: scale(1);
              filter: blur(0px);
            }
          }
          
          .text-dissolve {
            animation: textDissolve 1.5s ease-in forwards;
          }
          
          @keyframes textDissolve {
            0% {
              opacity: 1;
              transform: scale(1);
              filter: blur(0px);
            }
            100% {
              opacity: 0;
              transform: scale(1.2);
              filter: blur(5px);
            }
          }
          
          .stardust-particle {
            animation: stardustFloat 1.5s ease-out forwards;
          }
          
          @keyframes stardustFloat {
            0% {
              opacity: 1;
              transform: scale(1) translate(0, 0);
            }
            100% {
              opacity: 0;
              transform: scale(0.2) translate(var(--random-x, 100px), var(--random-y, -100px));
            }
          }
          
          .stardust-0 { --random-x: 50px; --random-y: -80px; animation-delay: 0s; }
          .stardust-1 { --random-x: -30px; --random-y: -60px; animation-delay: 0.1s; }
          .stardust-2 { --random-x: 80px; --random-y: -90px; animation-delay: 0.2s; }
          .stardust-3 { --random-x: -60px; --random-y: -40px; animation-delay: 0.1s; }
          .stardust-4 { --random-x: 40px; --random-y: -100px; animation-delay: 0.3s; }
          .stardust-5 { --random-x: -80px; --random-y: -70px; animation-delay: 0.15s; }
          .stardust-6 { --random-x: 90px; --random-y: -50px; animation-delay: 0.25s; }
          .stardust-7 { --random-x: -40px; --random-y: -90px; animation-delay: 0.05s; }
          .stardust-8 { --random-x: 70px; --random-y: -60px; animation-delay: 0.2s; }
          .stardust-9 { --random-x: -70px; --random-y: -80px; animation-delay: 0.1s; }
          .stardust-10 { --random-x: 60px; --random-y: -40px; animation-delay: 0.3s; }
          .stardust-11 { --random-x: -50px; --random-y: -100px; animation-delay: 0.05s; }
          .stardust-12 { --random-x: 30px; --random-y: -70px; animation-delay: 0.25s; }
          .stardust-13 { --random-x: -90px; --random-y: -50px; animation-delay: 0.15s; }
          .stardust-14 { --random-x: 100px; --random-y: -90px; animation-delay: 0.1s; }
          .stardust-15 { --random-x: -20px; --random-y: -60px; animation-delay: 0.2s; }
          .stardust-16 { --random-x: 80px; --random-y: -30px; animation-delay: 0.05s; }
          .stardust-17 { --random-x: -60px; --random-y: -100px; animation-delay: 0.3s; }
          .stardust-18 { --random-x: 50px; --random-y: -80px; animation-delay: 0.15s; }
          .stardust-19 { --random-x: -80px; --random-y: -40px; animation-delay: 0.25s; }
        `}
      </style>
    </div>
  );
};

export const useIntroStarAnimation = () => {
  const [shouldShowIntro, setShouldShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShouldShowIntro(false);
  };

  return {
    shouldShowIntro,
    handleIntroComplete
  };
};
