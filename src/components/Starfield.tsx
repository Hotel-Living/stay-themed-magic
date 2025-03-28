
import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/starfield.css';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hasFallbackRendered, setHasFallbackRendered] = useState(false);
  
  // More efficient star creation function with error handling
  const createStars = useCallback(() => {
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    
    // Clear previous stars to prevent memory leaks
    starfield.innerHTML = '';
    
    try {
      // Get viewport dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Reduce star count for better performance - even fewer stars for mobile
      const isMobile = window.innerWidth < 768;
      const starCount = Math.min(isMobile ? 50 : 100, Math.floor((windowWidth * windowHeight) / 12000));
      
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
        
        // Random size between 1px and 2.5px (smaller stars for better performance)
        const size = Math.random() * 1.5 + 1;
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
        
        // Animation duration - shorter for better performance
        const duration = 5 + Math.random() * 10;
        star.style.animationDuration = `${duration}s`;
        
        // Movement direction - smaller movement range for better performance
        const startX = x;
        const startY = y;
        const endX = startX + (Math.random() * 80 - 40);
        const endY = startY + (Math.random() * 80 - 40);
        
        star.style.setProperty('--start-x', `${startX}px`);
        star.style.setProperty('--start-y', `${startY}px`);
        star.style.setProperty('--end-x', `${endX}px`);
        star.style.setProperty('--end-y', `${endY}px`);
        
        fragment.appendChild(star);
      }
      
      starfield.appendChild(fragment);
      setHasFallbackRendered(true);
    } catch (err) {
      console.error('Error creating starfield:', err);
      // If we failed to create the stars dynamically, set a fallback
      if (!hasFallbackRendered) {
        setHasFallbackRendered(true);
        starfield.classList.add('fallback-starfield');
      }
    }
  }, [hasFallbackRendered]);
  
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Initial creation of stars
    createStars();
    
    // Recreate stars on window resize, with debounce
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      
      resizeTimer = window.setTimeout(() => {
        createStars();
      }, 300); // Longer debounce time
    };
    
    window.addEventListener('resize', handleResize);
    
    // Ensure stars are recreated when coming back to a tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        createStars();
      }
    };
    
    // Re-create stars when network is reconnected
    const handleNetworkReconnect = () => {
      createStars();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleNetworkReconnect);
    window.addEventListener('app:networkReconnected', handleNetworkReconnect);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleNetworkReconnect);
      window.removeEventListener('app:networkReconnected', handleNetworkReconnect);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [createStars]);
  
  return (
    <div 
      ref={starfieldRef} 
      className="starfield"
      aria-hidden="true"
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
}
