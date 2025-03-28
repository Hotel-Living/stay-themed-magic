
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import '../styles/starfield.css';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  
  // Simplified star creation function that won't fail
  const createStars = useCallback(() => {
    if (!starfieldRef.current) return;
    
    try {
      const starfield = starfieldRef.current;
      
      // Clear previous stars
      if (starfield.children.length > 0) {
        starfield.innerHTML = '';
      }
      
      // Apply fallback if needed
      if (useFallback) {
        return;
      }
      
      // Get viewport dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Reduce star count for better performance
      const isMobile = window.innerWidth < 768;
      const starCount = Math.min(isMobile ? 15 : 30, Math.floor((windowWidth * windowHeight) / 25000));
      
      // Simple color palette for stars
      const colorPalette = [
        '#FFFFFF', // White
        '#F7F7FF', // Off-white
        '#EEEEEE', // Light gray
      ];
      
      // Use document fragment for better performance
      const fragment = document.createDocumentFragment();
      
      // Create stars with minimal properties
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Fixed size for better performance
        const size = 1.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position in the viewport
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Simple color from palette
        const colorIndex = Math.floor(Math.random() * colorPalette.length);
        star.style.backgroundColor = colorPalette[colorIndex];
        
        // Fixed opacity
        star.style.opacity = "0.7";
        
        fragment.appendChild(star);
      }
      
      starfield.appendChild(fragment);
    } catch (err) {
      console.error('Error creating starfield, switching to fallback:', err);
      setUseFallback(true);
    }
  }, [useFallback]);
  
  // Use layout effect to ensure this runs early in the render cycle
  useLayoutEffect(() => {
    try {
      // Apply fallback immediately to ensure something renders
      if (starfieldRef.current) {
        starfieldRef.current.classList.add('fallback-starfield');
      }
      
      // Set component as mounted
      setMounted(true);
    } catch (e) {
      console.error('Critical starfield initialization error:', e);
    }
  }, []);
  
  // Main effect for star creation
  useEffect(() => {
    if (!mounted) return;
    
    try {
      // Initial creation of stars
      createStars();
      
      // Handle resize with debounce
      let resizeTimer: number | null = null;
      const handleResize = () => {
        if (resizeTimer) window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          try {
            createStars();
          } catch (e) {
            console.error('Failed to recreate stars on resize:', e);
            setUseFallback(true);
          }
        }, 500);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (resizeTimer) window.clearTimeout(resizeTimer);
      };
    } catch (e) {
      console.error('Error in starfield effect:', e);
      setUseFallback(true);
    }
  }, [mounted, createStars]);
  
  return (
    <div 
      ref={starfieldRef} 
      className={`starfield ${useFallback ? 'fallback-starfield' : ''}`}
      aria-hidden="true"
    />
  );
}
