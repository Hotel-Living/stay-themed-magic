
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
      
      // Create many stars for better visibility
      const starCount = Math.floor((windowWidth * windowHeight) / 600);
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1px and 4px
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position across the screen
        const x = Math.random() * windowWidth;
        // Start from further back (higher z value) for 3D effect
        const y = Math.random() * windowHeight;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Brighter colors with more yellow stars
        const isYellow = Math.random() > 0.6;
        star.style.backgroundColor = isYellow ? '#FFF000' : '#FFFFFF';
        
        // Higher base opacity for better visibility
        star.style.opacity = `${0.8 + (size - 1) * 0.2}`;
        
        // Random speed for forward movement
        const speed = 2 + Math.random() * 8; // 2-10s range for speed variety
        star.style.animation = `moveForward ${speed}s linear infinite`;
        
        // Random delay to stagger animations
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        starfield.appendChild(star);
      }
    };
    
    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => {
      starfield.innerHTML = '';
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={starfieldRef} className="starfield fixed inset-0 -z-10"></div>;
}
