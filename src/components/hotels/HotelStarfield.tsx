
import { useEffect, useRef } from 'react';

export function HotelStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Star properties
    const stars: {x: number; y: number; z: number; radius: number; color: string}[] = [];
    const starCount = 500; // Number of stars
    const maxDepth = 1000; // Maximum depth
    const speed = 0.5; // Speed of travel
    
    // Generate random stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * maxDepth,
        radius: 1 + Math.random() * 1.5,
        color: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`
      });
    }
    
    // Animation function
    function animate() {
      context.fillStyle = 'rgba(0, 0, 0, 0.2)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Move star closer (decrease z)
        star.z -= speed;
        
        // Reset star to far distance if it gets too close
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }
        
        // Calculate star position with perspective
        const depth = star.z / maxDepth;
        const screenX = (star.x / depth) + canvas.width / 2;
        const screenY = (star.y / depth) + canvas.height / 2;
        
        // Calculate star size based on depth
        const size = Math.max(0.5, (1 - depth) * star.radius * 2);
        
        // Draw star
        context.fillStyle = star.color;
        context.beginPath();
        context.arc(screenX, screenY, size, 0, Math.PI * 2);
        context.fill();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
      style={{ background: 'transparent', pointerEvents: 'none' }}
    />
  );
}
