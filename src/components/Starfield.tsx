
import { useEffect, useRef, useState } from 'react';

export function Starfield() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images
  const backgroundImages = [
    "/lovable-uploads/25eccc08-b169-49e6-9ed8-6dc9dc877882.png",
    "/lovable-uploads/0d3c0697-3280-440c-b107-47cdc3fcc664.png",
    "/lovable-uploads/77229d3f-d9ac-4d81-8cb5-93468fe7a350.png",
    "/lovable-uploads/6db26442-2739-42c5-a4f9-35772b324196.png"
  ];
  
  useEffect(() => {
    // Handle image transition effect
    const transitionInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 8000); // Change image every 8 seconds
    
    return () => {
      clearInterval(transitionInterval);
    };
  }, [backgroundImages.length]);
  
  return (
    <div ref={bgRef} className="background-slideshow fixed inset-0 -z-10">
      {backgroundImages.map((image, index) => (
        <div 
          key={index}
          className={`bg-slide absolute inset-0 transition-opacity duration-3000 ease-in-out bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? -10 : -20,
          }}
        />
      ))}
      <div className="overlay absolute inset-0 bg-black/40 backdrop-blur-sm" />
    </div>
  );
}
