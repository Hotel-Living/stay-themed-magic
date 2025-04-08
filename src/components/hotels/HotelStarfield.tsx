
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
    const speed = 0.6; // Speed increased by 20% (from 0.5 to 0.6)
    
    // Color palette for stars
    const starColors = [
      'rgba(255, 255, 255, 0.9)', // White
      'rgba(173, 216, 230, 0.9)', // Light blue
      'rgba(255, 223, 186, 0.9)', // Light orange
      'rgba(221, 160, 221, 0.9)', // Plum
      'rgba(175, 238, 238, 0.9)', // Pale turquoise
      'rgba(240, 128, 128, 0.9)', // Light coral
      'rgba(152, 251, 152, 0.9)', // Pale green
      'rgba(255, 182, 193, 0.9)'  // Light pink
    ];
    
    // Generate random stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * maxDepth,
        radius: 1 + Math.random() * 1.5,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }
    
    // Animation function
    function animate() {
      // Changed to rich purple background color with opacity
      context.fillStyle = 'rgba(100, 10, 150, 0.2)';
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
          // Assign a new random color when star resets
          star.color = starColors[Math.floor(Math.random() * starColors.length)];
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
      style={{ background: 'rgb(90, 20, 120)', pointerEvents: 'none' }}
    />
  );
}
