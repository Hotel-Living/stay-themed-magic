
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StarburstStar {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(0.3);
  const [starbursts, setStarbursts] = useState<StarburstStar[]>([]);

  const messages = [
    t('intro.message1', 'Themed hotels for extended stays'),
    t('intro.message2', 'Where your interests become your home'),
    t('intro.message3', 'Experience Hotel-Living')
  ];

  const createStarburst = (lineIndex: number) => {
    const newStars: StarburstStar[] = [];
    const starCount = 12;
    
    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      newStars.push({
        id: Date.now() + i,
        x: 50, // Center of screen
        y: 50 + (lineIndex - 1) * 8, // Position based on line
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        opacity: 1,
        size: Math.random() * 3 + 2
      });
    }
    
    setStarbursts(prev => [...prev, ...newStars]);
    
    // Animate starburst stars
    setTimeout(() => {
      setStarbursts(prev => prev.filter(star => !newStars.includes(star)));
    }, 1000);
  };

  useEffect(() => {
    // Single smooth scaling animation
    const scaleInterval = setInterval(() => {
      setScale(prev => {
        const newScale = prev + 0.02;
        if (newScale >= 1) {
          clearInterval(scaleInterval);
          return 1;
        }
        return newScale;
      });
    }, 50);

    // Text progression
    const messageInterval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < messages.length - 1) {
          if (prev >= 0) {
            createStarburst(prev);
          }
          return prev + 1;
        } else {
          clearInterval(messageInterval);
          createStarburst(prev);
          setTimeout(onComplete, 1500);
          return prev;
        }
      });
    }, 2000);

    return () => {
      clearInterval(scaleInterval);
      clearInterval(messageInterval);
    };
  }, [messages.length, onComplete]);

  // Animate existing starburst stars
  useEffect(() => {
    if (starbursts.length === 0) return;

    const animationInterval = setInterval(() => {
      setStarbursts(prev => prev.map(star => ({
        ...star,
        x: star.x + star.vx,
        y: star.y + star.vy,
        opacity: star.opacity - 0.05,
        vx: star.vx * 0.98,
        vy: star.vy * 0.98
      })).filter(star => star.opacity > 0));
    }, 50);

    return () => clearInterval(animationInterval);
  }, [starbursts.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-black flex items-center justify-center overflow-hidden">
      {/* Starburst stars */}
      {starbursts.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      
      <div 
        className="text-center space-y-6 transition-transform duration-100 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`text-4xl md:text-6xl font-bold transition-all duration-1000 ${
              index <= currentIndex 
                ? 'opacity-100 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                : 'opacity-0'
            } ${
              index < currentIndex ? 'animate-pulse opacity-0' : ''
            }`}
            style={{
              textShadow: '2px 2px 4px rgba(255,255,255,0.3), -1px -1px 2px rgba(255,255,255,0.3)',
              WebkitTextStroke: '1px white'
            }}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export function useIntroAnimation() {
  const [shouldShowIntro, setShouldShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShouldShowIntro(false);
  };

  return {
    shouldShowIntro,
    handleIntroComplete
  };
}
