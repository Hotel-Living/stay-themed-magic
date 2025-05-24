
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
    
    // Star properties for vivid, joyful rain effect
    const stars: {x: number; y: number; speed: number; size: number; color: string; opacity: number; twinkle: number}[] = [];
    const starCount = 150; // More stars for better visibility
    
    // Vibrant, joyful star colors
    const starColors = [
      '#FFD700', // Bright gold
      '#FF69B4', // Hot pink
      '#FF6347', // Tomato/coral
      '#98FB98', // Pale green
      '#87CEEB', // Sky blue
      '#DDA0DD', // Plum/lavender
      '#F0E68C', // Khaki/light yellow
      '#FFA07A', // Light salmon
      '#20B2AA', // Light sea green
      '#FF1493', // Deep pink
      '#00CED1', // Dark turquoise
      '#FFB6C1'  // Light pink
    ];
    
    // Initialize stars with random positions and properties
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // Start above screen
        speed: 1 + Math.random() * 3, // Varying fall speeds
        size: 2 + Math.random() * 4, // Larger, more visible sizes
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: 0.7 + Math.random() * 0.3, // Good visibility
        twinkle: Math.random() * Math.PI * 2
      });
    }
    
    let animationTime = 0;
    
    // Animation function for rain of stars
    function animate() {
      requestAnimationFrame(animate);
      animationTime += 0.02;
      
      // Clear canvas with transparency to show background
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each star
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Move star downward
        star.y += star.speed;
        
        // Reset star to top when it falls off screen
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
          star.color = starColors[Math.floor(Math.random() * starColors.length)];
        }
        
        // Calculate twinkling effect
        const twinkleIntensity = 0.3 + 0.7 * (Math.sin(animationTime * 3 + star.twinkle) + 1) / 2;
        const currentOpacity = star.opacity * twinkleIntensity;
        
        // Draw star with vibrant colors and glow effect
        context.save();
        context.globalAlpha = currentOpacity;
        
        // Create glow effect
        context.shadowColor = star.color;
        context.shadowBlur = star.size * 2;
        context.fillStyle = star.color;
        
        // Draw the star as a circle
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();
        
        // Add extra sparkle with a smaller bright center
        context.shadowBlur = 0;
        context.fillStyle = '#FFFFFF';
        context.globalAlpha = currentOpacity * 0.8;
        context.beginPath();
        context.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
        context.fill();
        
        context.restore();
      }
    }
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redistribute stars across new canvas size
      stars.forEach(star => {
        if (star.x > canvas.width) {
          star.x = Math.random() * canvas.width;
        }
      });
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
