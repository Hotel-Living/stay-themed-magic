
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface HotelGalleryProps {
  images: string[];
  hotelName: string;
  isLoading?: boolean;
}

export function HotelGallery({ images, hotelName, isLoading = false }: HotelGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <Skeleton className="h-[300px] md:h-[400px] w-full rounded-xl bg-white/10" />
        <div className="grid grid-cols-5 gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-lg bg-white/10" />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="mb-8 rounded-xl bg-gray-200 h-[300px] md:h-[400px] flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        {/* Main image */}
        <div className="relative rounded-xl overflow-hidden group bg-black">
          <img
            src={images[activeIndex]}
            alt={`${hotelName} - Image ${activeIndex + 1}`}
            className="w-full h-[300px] md:h-[400px] object-cover"
            loading={activeIndex === 0 ? "eager" : "lazy"}
            onClick={toggleFullscreen}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white bg-black/40 px-3 py-1 rounded-lg text-sm">
              Click to enlarge
            </span>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2 mt-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer",
                  activeIndex === index && "ring-2 ring-fuchsia-500"
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`${hotelName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleFullscreen}
              className="text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative w-full max-w-7xl max-h-[85vh] flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt={`${hotelName} - Image ${activeIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Navigation arrows for fullscreen */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails in fullscreen mode */}
          <div className="mt-4 flex gap-2 px-4 overflow-x-auto max-w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer flex-shrink-0",
                  activeIndex === index && "ring-2 ring-fuchsia-500"
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`${hotelName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
