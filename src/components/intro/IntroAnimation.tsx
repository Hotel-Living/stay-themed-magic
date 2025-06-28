
import React, { useState, useEffect } from 'react';
import { Starfield } from '@/components/Starfield';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface StarburstParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [starburst, setStarburst] = useState<StarburstParticle[]>([]);
  
  const messages = [
    "Welcome to the future of hotel living",
    "Where comfort meets community",
    "Discover your perfect long-term stay",
    "Experience hospitality reimagined",
    "Your home away from home awaits",
    "Join the hotel living revolution"
  ];

  const createStarburst = (centerX: number, centerY: number) => {
    const particles: StarburstParticle[] = [];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      particles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1,
        size: 2 + Math.random() * 2
      });
    }
    
    setStarburst(particles);
    
    // Animate starburst particles
    let frame = 0;
    const animateStarburst = () => {
      frame++;
      setStarburst(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: Math.max(0, 1 - frame * 0.05),
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        }))
      );
      
      if (frame < 60) {
        requestAnimationFrame(animateStarburst);
      } else {
        setStarburst([]);
      }
    };
    
    requestAnimationFrame(animateStarburst);
  };

  useEffect(() => {
    if (currentLine >= messages.length) {
      setTimeout(() => onComplete(), 500);
      return;
    }

    const timer = setTimeout(() => {
      // Create starburst effect at text center before moving to next
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      createStarburst(centerX, centerY);
      
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 300);
    }, 1500); // Each line displays for 1.5 seconds

    return () => clearTimeout(timer);
  }, [currentLine, messages.length, onComplete]);

  if (currentLine >= messages.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-purple-900 via-indigo-900 to-black overflow-hidden">
      <Starfield />
      
      {/* Background floating messages */}
      <div className="absolute inset-0 flex items-center justify-center">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`absolute text-white font-light transition-all duration-1000 ease-out ${
              index === currentLine 
                ? 'text-2xl md:text-4xl opacity-100 transform scale-110 text-center px-8' 
                : 'text-lg md:text-xl opacity-30 transform scale-75'
            }`}
            style={{
              transform: index === currentLine 
                ? 'translateZ(0) scale(1.1)' 
                : `translateZ(-100px) scale(0.75) translateX(${(index - currentLine) * 50}px) translateY(${Math.sin(index) * 30}px)`,
              filter: index === currentLine ? 'blur(0px)' : 'blur(1px)',
              textShadow: index === currentLine 
                ? '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)' 
                : '0 0 10px rgba(255, 255, 255, 0.2)',
              animation: index === currentLine 
                ? 'smooth-approach 1.5s ease-out' 
                : 'gentle-float 3s ease-in-out infinite'
            }}
          >
            {message}
          </div>
        ))}
      </div>
      
      {/* Starburst particles */}
      {starburst.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes smooth-approach {
          0% {
            transform: translateZ(-200px) scale(0.5);
            opacity: 0.3;
            filter: blur(2px);
          }
          50% {
            transform: translateZ(-50px) scale(0.8);
            opacity: 0.7;
            filter: blur(1px);
          }
          100% {
            transform: translateZ(0) scale(1.1);
            opacity: 1;
            filter: blur(0px);
          }
        }
        
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export const useIntroAnimation = () => {
  const [shouldShowIntro, setShouldShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShouldShowIntro(false);
  };

  return { shouldShowIntro, handleIntroComplete };
};
