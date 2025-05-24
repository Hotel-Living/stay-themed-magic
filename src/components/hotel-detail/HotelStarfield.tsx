
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
    
    // Star properties for subtle, refined effect
    const stars: {x: number; y: number; originalX: number; originalY: number; speed: number; size: number; maxSize: number; color: string; opacity: number; life: number; maxLife: number}[] = [];
    const starCount = 40; // Much lower density for subtlety
    
    // Soft, joyful star colors - very light and pastel
    const starColors = [
      '#FFF9E6', // Very soft cream-yellow
      '#FFE4B5', // Soft pastel orange
      '#E6E6FA', // Light lavender
      '#F0F8FF', // Very light blue
      '#FFF0F5', // Soft pink
      '#F5FFFA', // Mint cream
      '#FFFACD', // Light golden yellow
      '#F8F8FF'  // Ghost white
    ];
    
    // Create stars starting from center with gentle outward movement
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    function createStar() {
      const angle = Math.random() * Math.PI * 2; // Random direction
      const distance = Math.random() * 50; // Start close to center
      
      return {
        originalX: centerX + Math.cos(angle) * distance,
        originalY: centerY + Math.sin(angle) * distance,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        speed: 0.3 + Math.random() * 0.4, // Very slow movement
        size: 0.5, // Start very small
        maxSize: 1.5 + Math.random() * 1, // Small maximum size
        color: starColors[Math.floor(Math.random() * starColors.length)],
        opacity: 0,
        life: 0,
        maxLife: 300 + Math.random() * 200 // Longer, gentle lifecycle
      };
    }
    
    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }
    
    let animationTime = 0;
    
    // Animation function for gentle outward drift
    function animate() {
      requestAnimationFrame(animate);
      animationTime += 0.01;
      
      // Clear canvas with transparency to show background
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each star
      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Update star lifecycle
        star.life++;
        
        // Calculate outward movement from center
        const progress = star.life / star.maxLife;
        const angle = Math.atan2(star.originalY - centerY, star.originalX - centerX);
        const maxDistance = Math.min(canvas.width, canvas.height) * 0.4;
        const currentDistance = progress * maxDistance * star.speed;
        
        star.x = centerX + Math.cos(angle) * currentDistance;
        star.y = centerY + Math.sin(angle) * currentDistance;
        
        // Gentle size growth and fade
        if (progress < 0.3) {
          // Growing phase
          star.size = (progress / 0.3) * star.maxSize;
          star.opacity = (progress / 0.3) * 0.6;
        } else if (progress < 0.7) {
          // Stable phase
          star.size = star.maxSize;
          star.opacity = 0.6;
        } else {
          // Fading phase
          const fadeProgress = (progress - 0.7) / 0.3;
          star.size = star.maxSize * (1 - fadeProgress * 0.3);
          star.opacity = 0.6 * (1 - fadeProgress);
        }
        
        // Reset star when lifecycle is complete
        if (star.life >= star.maxLife) {
          const newStar = createStar();
          stars[i] = newStar;
          continue;
        }
        
        // Draw star with soft glow
        if (star.opacity > 0 && star.size > 0) {
          context.save();
          context.globalAlpha = star.opacity;
          
          // Very subtle glow
          context.shadowColor = star.color;
          context.shadowBlur = star.size * 3;
          context.fillStyle = star.color;
          
          // Draw the star as a soft circle
          context.beginPath();
          context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          context.fill();
          
          // Add gentle twinkle with center highlight
          context.shadowBlur = 0;
          context.fillStyle = '#FFFFFF';
          context.globalAlpha = star.opacity * 0.5;
          context.beginPath();
          context.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
          context.fill();
          
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
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
