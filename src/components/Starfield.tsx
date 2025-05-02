
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function Starfield() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const backgroundImages = [
    "/lovable-uploads/81e58c1b-eb97-48d4-8edc-761ef83b8200.png",
    "/lovable-uploads/700a3810-de89-47fe-8e74-fc675f3ea96c.png",
    "/lovable-uploads/eb8164ca-fefe-4c41-8310-5f51d1046afc.png",
    "/lovable-uploads/3954535b-74be-4099-abb1-f20cf5a65820.png",
    "/lovable-uploads/4f3e63d0-ee04-4ed3-99e9-d38c6812d31a.png",
    "/lovable-uploads/50d5ecd1-ae81-426f-8b97-a7e5333aa6da.png",
    "/lovable-uploads/fcfc71f6-35b0-4f42-b2c4-4a1761439989.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={bgRef} className="background-slideshow fixed inset-0 -z-10" style={{ backgroundColor: "#C9CAFE" }}>
      <Carousel className="h-full w-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {backgroundImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className={`bg-slide absolute inset-0 bg-cover bg-center transition-opacity duration-3000 ease-in-out ${currentSlide === index ? 'opacity-60' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="overlay absolute inset-0 bg-black/14 backdrop-blur-[2.1px]" />
    </div>
  );
}
