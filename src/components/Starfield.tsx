
import { useCallback, useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  speed: number;
  twinkle: boolean;
  element: HTMLDivElement;
}

export default function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  const createStar = useCallback(() => {
    if (!starfieldRef.current) return;
    
    const starElement = document.createElement('div');
    const size = Math.random() > 0.7 
      ? 'large' 
      : (Math.random() > 0.5 ? 'medium' : 'small');
    
    starElement.className = `star star-${size} ${Math.random() > 0.3 ? 'star-twinkle' : ''}`;
    
    // Calculate random positions (visible area)
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    starElement.style.left = `${x}px`;
    starElement.style.top = `${y}px`;
    
    // Random animation speed (3-8 seconds)
    const speed = 3 + Math.random() * 5;
    starElement.style.animationDuration = `${speed}s`;
    
    // Random delay to start animation
    const delay = Math.random() * 5;
    starElement.style.animationDelay = `-${delay}s`;
    
    // Add star to DOM
    starfieldRef.current.appendChild(starElement);
    
    // Create the star object
    const star: Star = {
      x,
      y,
      size,
      speed,
      twinkle: Math.random() > 0.3,
      element: starElement
    };
    
    starsRef.current.push(star);
    
    // Remove stars that have moved out of view
    setTimeout(() => {
      if (starElement.parentNode === starfieldRef.current) {
        starfieldRef.current?.removeChild(starElement);
        starsRef.current = starsRef.current.filter(s => s.element !== starElement);
      }
    }, (speed + delay) * 1000);
  }, []);

  const generateStars = useCallback(() => {
    // Create initial set of stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }
    
    // Continuously add new stars
    const interval = setInterval(() => {
      if (starsRef.current.length < 150) {
        for (let i = 0; i < 3; i++) {
          createStar();
        }
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [createStar]);

  useEffect(() => {
    const cleanup = generateStars();
    
    // Handle window resize
    const handleResize = () => {
      // Clear existing stars
      if (starfieldRef.current) {
        while (starfieldRef.current.firstChild) {
          starfieldRef.current.removeChild(starfieldRef.current.firstChild);
        }
      }
      starsRef.current = [];
      
      // Regenerate stars
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateStars]);

  return <div ref={starfieldRef} className="starfield" />;
}
