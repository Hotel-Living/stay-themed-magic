
import React, { useState, useEffect } from 'react';
import { Starfield } from '../Starfield';

const LINES = [
  "LA REVOLUCIÓN HA LLEGADO",
  "MULTIPLICA TU VIDA", 
  "VIVE EN HOTELES",
  "VIVE CON ESTILO",
  "CONOCE AFINES",
  "DISFRUTA TUS PASIONES"
];

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export const IntroStarAnimation = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [phase, setPhase] = useState<'approaching' | 'exploding' | 'showing' | 'dissolving'>('approaching');
  const [starPosition, setStarPosition] = useState<{ x: number; y: number }>({ x: -100, y: 50 });
  const [particles, setParticles] = useState<StarParticle[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const isFromLeft = currentLineIndex % 2 === 0;

  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      switch (phase) {
        case 'approaching':
          setPhase('exploding');
          break;
        case 'exploding':
          setPhase('showing');
          break;
        case 'showing':
          setPhase('dissolving');
          break;
        case 'dissolving':
          if (currentLineIndex < LINES.length - 1) {
            setCurrentLineIndex(prev => prev + 1);
            setPhase('approaching');
            // Reset star position for next line
            const nextIsFromLeft = (currentLineIndex + 1) % 2 === 0;
            setStarPosition({ 
              x: nextIsFromLeft ? -100 : window.innerWidth + 100, 
              y: Math.random() * 40 + 30 
            });
          } else {
            setIsComplete(true);
          }
          break;
      }
    }, getPhaseTimeout(phase));

    return () => clearTimeout(timer);
  }, [phase, currentLineIndex, isComplete]);

  // Animate star approach
  useEffect(() => {
    if (phase === 'approaching') {
      const startX = isFromLeft ? -100 : window.innerWidth + 100;
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight / 2;
      
      setStarPosition({ x: startX, y: targetY });
      
      const animateApproach = () => {
        setStarPosition(prev => {
          const dx = targetX - prev.x;
          const dy = targetY - prev.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            return { x: targetX, y: targetY };
          }
          
          const speed = 8;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed
          };
        });
      };

      const approachInterval = setInterval(animateApproach, 16);
      return () => clearInterval(approachInterval);
    }
  }, [phase, isFromLeft]);

  // Generate explosion particles
  useEffect(() => {
    if (phase === 'exploding') {
      const newParticles: StarParticle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: starPosition.x,
          y: starPosition.y,
          size: Math.random() * 4 + 2,
          opacity: 1,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10
        });
      }
      setParticles(newParticles);
    }
  }, [phase, starPosition]);

  // Animate particles during dissolving
  useEffect(() => {
    if (phase === 'dissolving') {
      const animateParticles = () => {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: Math.max(0, particle.opacity - 0.02),
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        })));
      };

      const particleInterval = setInterval(animateParticles, 16);
      return () => clearInterval(particleInterval);
    }
  }, [phase]);

  const getPhaseTimeout = (currentPhase: string) => {
    switch (currentPhase) {
      case 'approaching': return 1500;
      case 'exploding': return 300;
      case 'showing': return 2000;
      case 'dissolving': return 800;
      default: return 1000;
    }
  };

  if (isComplete) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Starfield />
      
      <style>
        {`
          @keyframes starGlow {
            0% { 
              transform: scale(1);
              filter: brightness(1) drop-shadow(0 0 10px #ffd700);
            }
            50% { 
              transform: scale(1.2);
              filter: brightness(1.5) drop-shadow(0 0 20px #ffd700);
            }
            100% { 
              transform: scale(1);
              filter: brightness(1) drop-shadow(0 0 10px #ffd700);
            }
          }
          
          @keyframes textExplosion {
            0% {
              opacity: 0;
              transform: scale(0.5);
              filter: brightness(2);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
              filter: brightness(1.5);
            }
            100% {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
            }
          }
          
          @keyframes textDissolve {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.8);
              filter: blur(2px);
            }
          }
          
          .star-particle {
            position: absolute;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            filter: drop-shadow(0 0 6px #ffd700);
          }
        `}
      </style>

      {/* Approaching Star */}
      {phase === 'approaching' && (
        <div
          className="absolute w-6 h-6 bg-yellow-400 rounded-full pointer-events-none"
          style={{
            left: `${starPosition.x}px`,
            top: `${starPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'starGlow 0.5s ease-in-out infinite',
            filter: 'drop-shadow(0 0 15px #ffd700)',
            zIndex: 60
          }}
        />
      )}

      {/* Explosion Particles */}
      {phase === 'exploding' && particles.map(particle => (
        <div
          key={particle.id}
          className="star-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            zIndex: 60
          }}
        />
      ))}

      {/* Dissolving Particles */}
      {phase === 'dissolving' && particles.map(particle => (
        <div
          key={particle.id}
          className="star-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            zIndex: 60
          }}
        />
      ))}

      {/* Text Display */}
      {(phase === 'exploding' || phase === 'showing' || phase === 'dissolving') && (
        <div 
          className="text-center z-50"
          style={{
            animation: phase === 'exploding' ? 'textExplosion 0.3s ease-out' :
                      phase === 'dissolving' ? 'textDissolve 0.8s ease-in' : 'none'
          }}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold text-yellow-400 leading-tight"
            style={{
              textShadow: '3px 3px 0 white, -3px -3px 0 white, 3px -3px 0 white, -3px 3px 0 white, 0 0 20px #ffd700',
              WebkitTextStroke: '2px white',
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
            }}
          >
            {LINES[currentLineIndex]}
          </h1>
        </div>
      )}
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
