
import { useEffect, useRef, useState } from 'react';
import '../styles/starfield.css';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    
    // Create stars with improved performance
    const createStars = () => {
      // Clear previous stars to prevent memory leaks
      starfield.innerHTML = '';
      
      try {
        // Get viewport dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Reduce star count for better performance
        const starCount = Math.min(100, Math.floor((windowWidth * windowHeight) / 10000));
        
        // Define color palette for stars
        const colorPalette = [
          '#FFFFFF', // White
          '#F7F700', // Golden yellow
          '#FF9DF5', // Light pink
          '#8B5CF6', // Purple
        ];
        
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < starCount; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          
          // Random size between 1px and 3px
          const size = Math.random() * 2 + 1;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          
          // Random position in the viewport
          const x = Math.random() * windowWidth;
          const y = Math.random() * windowHeight;
          
          star.style.left = `${x}px`;
          star.style.top = `${y}px`;
          
          // Random color from palette
          const colorIndex = Math.floor(Math.random() * colorPalette.length);
          star.style.backgroundColor = colorPalette[colorIndex];
          
          // Random opacity for depth effect
          star.style.opacity = (0.5 + Math.random() * 0.5).toString();
          
          // Animation duration
          const duration = 5 + Math.random() * 15;
          star.style.animationDuration = `${duration}s`;
          
          // Movement direction
          const startX = x;
          const startY = y;
          const endX = startX + (Math.random() * 100 - 50);
          const endY = startY + (Math.random() * 100 - 50);
          
          star.style.setProperty('--start-x', `${startX}px`);
          star.style.setProperty('--start-y', `${startY}px`);
          star.style.setProperty('--end-x', `${endX}px`);
          star.style.setProperty('--end-y', `${endY}px`);
          
          fragment.appendChild(star);
        }
        
        starfield.appendChild(fragment);
      } catch (err) {
        console.error('Error creating starfield:', err);
      }
    };
    
    createStars();
    
    // Recreate stars on window resize, with debounce
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      
      resizeTimer = window.setTimeout(() => {
        createStars();
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Ensure stars are recreated when coming back to a tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        createStars();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, []);
  
  return (
    <div 
      ref={starfieldRef} 
      className="starfield"
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
}
