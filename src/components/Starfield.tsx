
import { useEffect, useRef, useState } from 'react';

export function Starfield() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images including both existing and new ones
  const backgroundImages = [
    "/lovable-uploads/25eccc08-b169-49e6-9ed8-6dc9dc877882.png",
    "/lovable-uploads/0d3c0697-3280-440c-b107-47cdc3fcc664.png",
    "/lovable-uploads/77229d3f-d9ac-4d81-8cb5-93468fe7a350.png",
    "/lovable-uploads/6db26442-2739-42c5-a4f9-35772b324196.png",
    // New uploaded images
    "/lovable-uploads/c7742345-9823-4422-bafa-83b8d1fee4bd.png",
    "/lovable-uploads/ca361635-7b30-4d8a-8f92-9b2471f6fe29.png",
    "/lovable-uploads/104ca835-26ab-45f6-ad0f-8df52ad85b44.png",
    "/lovable-uploads/3265eb79-ce84-4e22-8944-0528b7ea16cd.png",
    "/lovable-uploads/23962811-66f0-4fdf-ba22-b1aab72cc267.png",
    "/lovable-uploads/e6fccee7-fe77-4595-9f44-3fadf9a43325.png",
    "/lovable-uploads/3f6ce0b6-7f6f-49ae-a699-ec416968a0a5.png",
    "/lovable-uploads/a6661243-e289-44fa-a726-a8e3fb743d43.png",
    "/lovable-uploads/d900857a-770f-4a5b-a0a1-5232f3d3b677.png",
    "/lovable-uploads/72defac9-6468-4f27-97f3-4ef30cecec3a.png",
    "/lovable-uploads/9e9a15b6-7cdd-4711-b6c0-e805cfba3147.png",
    "/lovable-uploads/d6ff1526-137c-44ae-b524-848cd46473b2.png"
  ];
  
  useEffect(() => {
    // Speed up transition interval by 40% (8000ms → 4800ms)
    const transitionInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4800); // 40% faster than the original 8000ms
    
    return () => {
      clearInterval(transitionInterval);
    };
  }, [backgroundImages.length]);
  
  return (
    <div ref={bgRef} className="background-slideshow fixed inset-0 -z-20">
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={`bg-slide absolute inset-0 transition-opacity duration-3000 ease-in-out bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentImageIndex ? 0.4 : 0, // Reduced from 0.8 to 0.4 (50% lighter)
            zIndex: index === currentImageIndex ? -20 : -30,
          }}
        />
      ))}
      {/* Reduced opacity to make content more visible */}
      <div className="overlay absolute inset-0 bg-black/15 backdrop-blur-[1.5px]" /> {/* Reduced from bg-black/25 to bg-black/15 */}
    </div>
  );
}
