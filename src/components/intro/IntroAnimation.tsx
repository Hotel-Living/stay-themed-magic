import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface StarburstStar {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [starbursts, setStarbursts] = useState<StarburstStar[]>([]);

  const messages = [
    t('home.heroSection.revolutionHasCome'),
    t('home.heroSection.liveInHotels'),
    t('home.heroSection.boostYourLife'),
    t('home.heroSection.slogans.getRidOfChores'),
    t('home.heroSection.slogans.selectHotelsByThemes'),
    t('home.heroSection.slogans.boostSocialLife'),
    t('home.heroSection.slogans.meetLikeMinded')
  ];

  const createStarburst = (index: number) => {
    const stars: StarburstStar[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create 12-15 stars for the burst
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      stars.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1,
        size: 2 + Math.random() * 3
      });
    }
    
    setStarbursts(prev => [...prev, ...stars]);
    
    // Animate the starburst stars
    let frame = 0;
    const animate = () => {
      frame++;
      setStarbursts(prev => 
        prev.map(star => ({
          ...star,
          x: star.x + star.vx * 3,
          y: star.y + star.vy * 3,
          opacity: Math.max(0, star.opacity - 0.03),
          vx: star.vx * 0.98,
          vy: star.vy * 0.98
        })).filter(star => star.opacity > 0.1)
      );
      
      if (frame < 60) { // 1 second at 60fps
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (currentPhase >= messages.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      // Create starburst before moving to next phase
      if (currentPhase > 0) {
        createStarburst(currentPhase - 1);
      }
      setCurrentPhase(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPhase, messages.length, onComplete]);

  // Calculate smooth approach transform
  const getTransform = (index: number) => {
    const relativePhase = currentPhase - index;
    
    if (relativePhase <= 0) {
      // Not yet shown
      return 'translateZ(-2000px) scale(0.1)';
    } else if (relativePhase === 1) {
      // Currently showing - smooth continuous approach
      return 'translateZ(0px) scale(1)';
    } else {
      // Past phases - fade out
      return 'translateZ(200px) scale(1.2)';
    }
  };

  const getOpacity = (index: number) => {
    const relativePhase = currentPhase - index;
    
    if (relativePhase <= 0) {
      return 0;
    } else if (relativePhase === 1) {
      return 1;
    } else {
      return Math.max(0, 1 - (relativePhase - 1) * 0.5);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Starburst particles */}
      {starbursts.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
          }}
        />
      ))}
      
      {/* Text messages */}
      <div className="relative text-center perspective-1000">
        {messages.map((message, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            style={{
              transform: getTransform(index),
              opacity: getOpacity(index),
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d'
            }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white text-center px-4 drop-shadow-2xl">
              {message}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

interface UseIntroAnimationReturn {
  shouldShowIntro: boolean;
  handleIntroComplete: () => void;
}

export const useIntroAnimation = (): UseIntroAnimationReturn => {
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);

  useEffect(() => {
    const introCompleted = localStorage.getItem('introCompleted');
    if (introCompleted === 'true') {
      setHasCompletedIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('introCompleted', 'true');
    setHasCompletedIntro(true);
  };

  return {
    shouldShowIntro: !hasCompletedIntro,
    handleIntroComplete,
  };
};
