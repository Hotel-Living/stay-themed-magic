
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create stars
    const stars: Star[] = [];
    const STAR_COUNT = 150;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < STAR_COUNT; i++) {
      // Calculate random angle for radial motion
      const angle = Math.random() * Math.PI * 2;
      // Start stars closer to center
      const distance = Math.random() * (canvas.width * 0.2) + 10;
      
      stars.push({
        // Position stars in radial pattern around center
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 1 + 0.2, // Smaller sizes
        speed: Math.random() * 1.5 + 0.5,
        angle: angle
      });
    }
    
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Move star outward from center along its angle
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Grow star slightly as it moves outward to create depth effect
        star.size += 0.005;
        
        // Reset star position if it goes off screen
        if (
          star.x < 0 || star.x > canvas.width || 
          star.y < 0 || star.y > canvas.height
        ) {
          // Reset to center with new angle
          const newAngle = Math.random() * Math.PI * 2;
          star.x = centerX + Math.cos(newAngle) * 10;
          star.y = centerY + Math.sin(newAngle) * 10;
          star.size = Math.random() * 1 + 0.2;
          star.angle = newAngle;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ backgroundColor: '#5B0155' }}
    />
  );
}
