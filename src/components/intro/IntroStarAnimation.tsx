
import React, { useEffect, useRef, useState } from 'react';

interface IntroStarAnimationProps {
  onComplete?: () => void;
}

export function IntroStarAnimation({ onComplete }: IntroStarAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animation state
    let animationId: number;
    let startTime: number | null = null;
    const duration = 4000; // 4 seconds total animation

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      speed: number;
    }> = [];

    // Generate stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 80%)`, // Blue to purple range
        speed: Math.random() * 2 + 1
      });
    }

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (!canvas || !context) return;

      // Clear canvas
      context.fillStyle = 'rgba(15, 15, 30, 0.1)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with animation effects
      stars.forEach((star, index) => {
        const phase = (index / stars.length) * Math.PI * 2;
        const wave = Math.sin(elapsed * 0.002 + phase) * 0.5 + 0.5;
        
        // Animate star movement
        star.x += Math.sin(elapsed * 0.001 + phase) * star.speed * 0.5;
        star.y += Math.cos(elapsed * 0.0008 + phase) * star.speed * 0.3;
        
        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star with glow effect
        context.save();
        context.globalAlpha = star.opacity * wave * (1 - progress * 0.3);
        context.fillStyle = star.color;
        context.shadowBlur = star.size * 3;
        context.shadowColor = star.color;
        
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      // Add center burst effect
      if (progress > 0.7) {
        const burstProgress = (progress - 0.7) / 0.3;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        context.save();
        context.globalAlpha = (1 - burstProgress) * 0.8;
        const gradient = context.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 200 * burstProgress
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(200, 150, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 50, 200, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
      }

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation complete - fade out
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete?.();
          }, 500);
        }, 500);
      }
    }

    animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <style>
        {`
          @keyframes starPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
}

export function useIntroStarAnimation() {
  const [shouldShowIntro, setShouldShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenStarIntro');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenStarIntro', 'true');
    setShouldShowIntro(false);
  };

  return {
    shouldShowIntro,
    handleIntroComplete
  };
}
