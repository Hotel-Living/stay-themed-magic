
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
    
    // Star properties for a joyful, optimistic effect
    const stars: {x: number; y: number; z: number; radius: number; color: string; twinkleSpeed: number; twinklePhase: number}[] = [];
    const starCount = 300; // More stars for a richer effect
    const maxDepth = 800;
    const speed = 0.3; // Gentle movement
    
    // Bright, optimistic star colors
    const starColors = [
      'rgba(255, 255, 255, 0.9)', // Bright white
      'rgba(255, 248, 220, 0.8)', // Warm white
      'rgba(173, 216, 230, 0.7)', // Light blue
      'rgba(255, 250, 205, 0.8)', // Light golden
      'rgba(230, 230, 250, 0.7)', // Lavender
      'rgba(240, 248, 255, 0.8)', // Alice blue
    ];
    
    // Generate random stars with twinkle properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * maxDepth,
        radius: 0.5 + Math.random() * 1.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: 0.02 + Math.random() * 0.03, // Gentle twinkling
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
    
    let time = 0;
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      time += 0.016; // Roughly 60fps
      
      // Clear canvas with transparency to show background
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Gentle forward movement
        star.z -= speed;
        
        // Reset star to far distance if it gets too close
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.color = starColors[Math.floor(Math.random() * starColors.length)];
        }
        
        // Calculate star position with perspective
        const depth = star.z / maxDepth;
        const screenX = (star.x / depth) + canvas.width / 2;
        const screenY = (star.y / depth) + canvas.height / 2;
        
        // Calculate star size based on depth
        const size = Math.max(0.3, (1 - depth) * star.radius);
        
        // Calculate twinkle effect
        const twinkleIntensity = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        
        // Extract base color and apply twinkle
        const baseOpacity = parseFloat(star.color.match(/[\d.]+(?=\))/)?.[0] || '0.8');
        const finalOpacity = baseOpacity * twinkleIntensity;
        const twinkleColor = star.color.replace(/[\d.]+(?=\))/, finalOpacity.toString());
        
        // Draw star with glow effect for extra sparkle
        context.fillStyle = twinkleColor;
        context.shadowColor = twinkleColor;
        context.shadowBlur = size * 2;
        context.beginPath();
        context.arc(screenX, screenY, size, 0, Math.PI * 2);
        context.fill();
        
        // Reset shadow for next star
        context.shadowBlur = 0;
      }
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
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
