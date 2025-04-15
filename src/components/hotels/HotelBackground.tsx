
import React, { useEffect, useState } from 'react';

export function HotelBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of background gradients
  const backgrounds = [
    "bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#86198f]",
    "bg-gradient-to-br from-[#3b0764] via-[#5b21b6] to-[#7e22ce]",
    "bg-gradient-to-br from-[#4a044e] via-[#500632] to-[#701a75]",
    "bg-gradient-to-br from-[#701a75] via-[#86198f] to-[#a21caf]"
  ];
  
  // Array of decorative elements
  const decorations = [
    // Position decorative elements
    { shape: "circle", size: "w-64 h-64", position: "top-[-100px] right-[-50px]", color: "bg-fuchsia-600/10" },
    { shape: "circle", size: "w-96 h-96", position: "bottom-[-200px] left-[-100px]", color: "bg-fuchsia-400/5" },
    { shape: "circle", size: "w-48 h-48", position: "top-[30%] left-[-100px]", color: "bg-magenta-500/10" },
    { shape: "square", size: "w-72 h-72", position: "bottom-[20%] right-[-100px]", color: "bg-magenta-600/5" },
  ];
  
  useEffect(() => {
    // Change background every 30 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [backgrounds.length]);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-3000">
      {/* Main gradient background */}
      <div className={`absolute inset-0 ${backgrounds[currentIndex]} transition-opacity duration-3000`}></div>
      
      {/* Overlay with slight blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Decorative elements */}
      {decorations.map((item, index) => (
        <div 
          key={index} 
          className={`absolute ${item.size} ${item.position} ${item.color} rounded-${item.shape === 'circle' ? 'full' : 'lg'} blur-3xl`}
        ></div>
      ))}
      
      {/* Animated particle effect */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/25eccc08-b169-49e6-9ed8-6dc9dc877882.png')] bg-repeat opacity-5"></div>
    </div>
  );
}
