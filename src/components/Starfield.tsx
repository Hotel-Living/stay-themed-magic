
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
      
      // Significantly increased star count for better visibility
      const starCount = Math.floor((windowWidth * windowHeight) / 800);
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1px and 4px (increased max size)
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position randomly across the entire screen
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Brighter colors with more yellow stars
        const isYellow = Math.random() > 0.5;
        star.style.backgroundColor = isYellow ? '#FFF000' : '#FFFFFF';
        
        // Increased base opacity for better visibility
        star.style.opacity = `${0.7 + (size - 1) * 0.3}`;
        
        // Faster animation for more dynamic effect
        const duration = 2 + Math.random() * 4; // 2-6s
        star.style.animation = `twinkle ${duration}s ease-in-out infinite`;
        
        // Random delay to stagger animations
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
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
  
  return <div ref={starfieldRef} className="starfield fixed inset-0 -z-10"></div>;
}
