
import { useState, useEffect, useCallback, useMemo } from "react";
import { HotelGalleryProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HotelGallery({ images, hotelName, isLoading }: HotelGalleryProps & { isLoading?: boolean }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  // Reset active image index when images change
  useEffect(() => {
    setActiveImageIndex(0);
    setIsImageLoading(true);
  }, [images]);
  
  // Fallback image for when no images are available
  const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";
  
  // Use the provided images or fallback to a default one - memoize this
  const displayImages = useMemo(() => {
    return images && images.length > 0 ? images : [fallbackImage];
  }, [images, fallbackImage]);

  // Optimize navigation with useCallback
  const handlePrevious = useCallback(() => {
    setActiveImageIndex(prev => {
      setIsImageLoading(true);
      return prev === 0 ? displayImages.length - 1 : prev - 1;
    });
  }, [displayImages.length]);
  
  const handleNext = useCallback(() => {
    setActiveImageIndex(prev => {
      setIsImageLoading(true);
      return prev === displayImages.length - 1 ? 0 : prev + 1;
    });
  }, [displayImages.length]);
  
  // Handle image load completion
  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);
  
  // Handle image error
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // If image fails to load, set src to fallback
    const target = e.target as HTMLImageElement;
    target.src = fallbackImage;
    setIsImageLoading(false);
  }, [fallbackImage]);

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <Skeleton className="aspect-[16/9] w-full" />
        <div className="p-4 flex gap-2 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8">
      <div className="aspect-[16/9] overflow-hidden relative group">
        {/* Add a loading indicator */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
            <div className="w-10 h-10 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={displayImages[activeImageIndex]} 
          alt={hotelName}
          className={`w-full h-full object-cover transition-all duration-500 ${isImageLoading ? 'opacity-40 scale-105' : 'opacity-100 scale-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {displayImages.length > 1 && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}
      </div>
      
      {displayImages.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setIsImageLoading(true);
                setActiveImageIndex(index);
              }}
              className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                index === activeImageIndex 
                  ? "ring-2 ring-fuchsia-500 opacity-100 scale-105" 
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1} of ${displayImages.length}`}
            >
              <img 
                src={image} 
                alt={`${hotelName} view ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy" // Lazy load thumbnails
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
