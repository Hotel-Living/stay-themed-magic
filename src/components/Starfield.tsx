
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Starfield() {
  const starfieldRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starfieldRef.current) return;
    
    const starfield = starfieldRef.current;
    starfield.innerHTML = '';
    
    // Create floating shapes instead of stars
    const createShapes = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Number of shapes based on screen size
      const shapeCount = Math.max(30, Math.floor((windowWidth * windowHeight) / 10000));
      
      const shapes = [
        'circle',
        'square',
        'triangle',
        'diamond'
      ];

      // Colors
      const colors = [
        'rgba(99, 102, 241, 0.1)',  // Indigo
        'rgba(79, 70, 229, 0.1)',   // Violet
        'rgba(139, 92, 246, 0.1)',  // Purple
        'rgba(59, 130, 246, 0.1)',  // Blue
      ];
      
      for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        
        // Random shape type
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Random size between 20px and 80px
        const size = Math.random() * 60 + 20;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Position randomly
        const x = Math.random() * windowWidth;
        const y = Math.random() * windowHeight;
        
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
        
        // Set color
        const color = colors[Math.floor(Math.random() * colors.length)];
        shape.style.backgroundColor = color;
        
        // Set shape
        shape.style.position = 'absolute';
        shape.style.borderRadius = shapeType === 'circle' ? '50%' : 
                                   shapeType === 'square' ? '4px' : 
                                   shapeType === 'triangle' ? '0' : '0';
                                   
        if (shapeType === 'triangle') {
          shape.style.width = '0';
          shape.style.height = '0';
          shape.style.backgroundColor = 'transparent';
          shape.style.borderLeft = `${size/2}px solid transparent`;
          shape.style.borderRight = `${size/2}px solid transparent`;
          shape.style.borderBottom = `${size}px solid ${color}`;
        }
        
        if (shapeType === 'diamond') {
          shape.style.transform = 'rotate(45deg)';
        }
        
        // Animation duration
        const duration = 20 + Math.random() * 30;
        shape.style.animation = `float ${duration}s ease-in-out infinite`;
        shape.style.animationDelay = `${Math.random() * duration}s`;
        
        starfield.appendChild(shape);
      }
    };
    
    createShapes();
    
    // Recreate shapes on window resize
    const handleResize = () => {
      starfield.innerHTML = '';
      createShapes();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <div ref={starfieldRef} className="fixed inset-0 -z-10 overflow-hidden"></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-50 via-indigo-50/50 to-purple-50/80"></div>
    </>
  );
}
