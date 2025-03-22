
import { useEffect, useRef } from 'react';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    starfield.innerHTML = '';
    
    // Create stars
    const createStars = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;
      
      // Number of stars based on screen size
      const starCount = Math.max(50, Math.floor((windowWidth * windowHeight) / 3000));
      
      for (let i = 0; i < starCount; i++) {
        // Calculate position from center with random angle
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * Math.min(windowWidth, windowHeight) * 0.8;
        
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position relative to center
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Animation duration based on distance from center (stars farther away appear to move faster)
        const duration = 5 + Math.random() * 10;
        star.style.animation = `starMovement ${duration}s linear infinite`;
        
        // Set the starting position for animation
        star.style.setProperty('--start-x', `${x}px`);
        star.style.setProperty('--start-y', `${y}px`);
        
        // Set the end position (moving away from center)
        const endX = x + (x - centerX) * 2;
        const endY = y + (y - centerY) * 2;
        star.style.setProperty('--end-x', `${endX}px`);
        star.style.setProperty('--end-y', `${endY}px`);
        
        starfield.appendChild(star);
      }
    };
    
    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => {
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={starfieldRef} className="starfield"></div>;
}
