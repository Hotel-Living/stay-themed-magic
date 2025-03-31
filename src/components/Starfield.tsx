
import { useEffect, useRef } from 'react';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    starfield.innerHTML = '';
    
    // Create stars for the starfield effect
    const createStars = () => {
      // Generate 200 stars for better immersion
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        
        // Random starting z-index for 3D effect (between -50 and 50)
        const zIndex = Math.floor(Math.random() * 100) - 50;
        star.style.zIndex = `${zIndex}`;
        
        // Random starting position
        star.style.top = `${Math.random() * 100}vh`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random animation duration for the movement
        const duration = Math.random() * 15 + 10; // 10-25s
        star.style.animationDuration = `3s, ${duration}s, ${duration}s`;
        
        // Apply a random color class
        const colorClass = `star-color-${Math.floor(Math.random() * 5)}`;
        star.classList.add(colorClass);
        
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
