
import { useEffect, useRef, useState } from 'react';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
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
        const centerX = windowWidth / 2;
        const centerY = windowHeight / 2;
        
        // Reduce star count for better performance
        const starCount = Math.min(100, Math.floor((windowWidth * windowHeight) / 8000));
        
        // Define color palette for dynamic star colors
        const colorPalette = [
          '#FFFFFF', // White
          '#F7F700', // Golden yellow
          '#FF9DF5', // Light pink
          '#8B5CF6', // Purple
        ];
        
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        
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
          
          // Set color from the palette randomly
          const colorIndex = Math.floor(Math.random() * colorPalette.length);
          star.style.backgroundColor = colorPalette[colorIndex];
          
          // Set opacity based on size for depth effect
          star.style.opacity = `${0.5 + (size - 1) * 0.25}`;
          
          // Animation duration based on distance from center
          const duration = 5 + Math.random() * 5; // 5-10s
          star.style.animation = `starMovement ${duration}s linear infinite`;
          
          // Set the starting position for animation
          star.style.setProperty('--start-x', `${x}px`);
          star.style.setProperty('--start-y', `${y}px`);
          
          // Set the end position (moving away from center)
          const endX = x + (x - centerX) * 2;
          const endY = y + (y - centerY) * 2;
          star.style.setProperty('--end-x', `${endX}px`);
          star.style.setProperty('--end-y', `${endY}px`);
          
          fragment.appendChild(star);
        }
        
        starfield.appendChild(fragment);
      } catch (err) {
        console.error('Error creating starfield:', err);
        setIsVisible(false);
      }
    };
    
    // Only create stars if they should be visible
    if (isVisible) {
      createStars();
    }
    
    // Recreate stars on window resize, but with debounce for performance
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      
      resizeTimer = window.setTimeout(() => {
        if (isVisible) {
          createStars();
        }
      }, 200);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [isVisible]);
  
  // If stars aren't visible, provide a simple gradient background
  if (!isVisible) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-purple-900 to-blue-900"></div>;
  }
  
  return <div ref={starfieldRef} className="starfield fixed inset-0 -z-10"></div>;
}
