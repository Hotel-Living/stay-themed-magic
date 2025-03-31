
import { useEffect, useRef } from 'react';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    starfield.innerHTML = '';
    
    // Create stars for the starfield effect
    const createStars = () => {
      // Generate 150 stars - increasing the number for more visibility
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 2px and 4px - increasing size for better visibility
        const size = Math.random() * 2 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        
        // Random starting position
        star.style.top = `${Math.random() * 100}vh`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random animation duration for the movement
        const duration = Math.random() * 15 + 15; // 15-30s
        star.style.animationDuration = `3s, ${duration}s`;
        
        starfield.appendChild(star);
      }
    };
    
    // Initial creation
    createStars();
    
    // Recreate stars every 20 seconds to ensure we always have stars
    const interval = setInterval(createStars, 20000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div ref={starfieldRef} className="starfield fixed inset-0 -z-10"></div>;
}
