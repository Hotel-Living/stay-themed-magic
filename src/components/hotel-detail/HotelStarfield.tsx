
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
    
    // Star properties for visible, joyful effect
    const stars: {x: number; y: number; originalX: number; originalY: number; speed: number; size: number; maxSize: number; color: string; opacity: number; life: number; maxLife: number; angle: number}[] = [];
    const starCount = 60; // Increased for better visibility
    
    // Brighter, more vibrant star colors
    const starColors = [
      '#FFD700', // Bright gold
      '#FFB6C1', // Light pink
      '#FFA500', // Orange
      '#DDA0DD', // Plum
      '#98FB98', // Pale green
      '#87CEEB', // Sky blue
      '#F0E68C', // Khaki
      '#FFE4E1', // Misty rose
      '#FFFFE0', // Light yellow
      '#E6E6FA'  // Lavender
    ];
    
    // Create stars starting from center
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    function createStar() {
      const angle = Math.random() * Math.PI * 2; // Random direction
      const distance = Math.random() * 100; // Start near center
      
      return {
        originalX: centerX + Math.cos(angle) * distance,
        originalY: centerY + Math.sin(angle) * distance,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        speed: 0.8 + Math.random() * 1.2, // Visible movement speed
        size: 0.5,
        maxSize: 2 + Math.random() * 2, // Larger maximum size
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: 0,
        life: 0,
        maxLife: 180 + Math.random() * 120, // Shorter lifecycle for more dynamic
        angle: angle
      };
    }
    
    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each star
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Update star lifecycle
        star.life++;
        
        // Calculate outward movement from center
        const progress = star.life / star.maxLife;
        const maxDistance = Math.min(canvas.width, canvas.height) * 0.6;
        const currentDistance = progress * maxDistance * star.speed;
        
        star.x = centerX + Math.cos(star.angle) * currentDistance;
        star.y = centerY + Math.sin(star.angle) * currentDistance;
        
        // Enhanced size growth and fade with better visibility
        if (progress < 0.2) {
          // Growing phase - faster growth
          star.size = (progress / 0.2) * star.maxSize;
          star.opacity = (progress / 0.2) * 0.9; // Higher opacity
        } else if (progress < 0.8) {
          // Stable phase - fully visible
          star.size = star.maxSize;
          star.opacity = 0.9;
        } else {
          // Fading phase
          const fadeProgress = (progress - 0.8) / 0.2;
          star.size = star.maxSize * (1 - fadeProgress * 0.5);
          star.opacity = 0.9 * (1 - fadeProgress);
        }
        
        // Reset star when lifecycle is complete
        if (star.life >= star.maxLife) {
          const newStar = createStar();
          stars[i] = newStar;
          continue;
        }
        
        // Draw star with enhanced visibility
        if (star.opacity > 0 && star.size > 0) {
          context.save();
          
          // Main star body with stronger glow
          context.globalAlpha = star.opacity;
          context.shadowColor = star.color;
          context.shadowBlur = star.size * 4;
          context.fillStyle = star.color;
          
          // Draw the main star
          context.beginPath();
          context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          context.fill();
          
          // Add bright center highlight
          context.shadowBlur = 0;
          context.fillStyle = '#FFFFFF';
          context.globalAlpha = star.opacity * 0.8;
          context.beginPath();
          context.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
          context.fill();
          
          // Add sparkle effect for extra visibility
          context.globalAlpha = star.opacity * 0.6;
          context.fillStyle = star.color;
          context.fillRect(star.x - star.size * 0.8, star.y - star.size * 0.1, star.size * 1.6, star.size * 0.2);
          context.fillRect(star.x - star.size * 0.1, star.y - star.size * 0.8, star.size * 0.2, star.size * 1.6);
          
          context.restore();
        }
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
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
