import React from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";

interface UploadedImagesProps {
  images: UploadedImage[];
  onRemove?: (image: UploadedImage) => void;
  onSetMain?: (image: UploadedImage) => void;
  onRemoveImage?: (image: UploadedImage) => void;
  onSetMainImage?: (image: UploadedImage) => void;
}

export default function UploadedImages({ 
  images, 
  onRemove, 
  onSetMain,
  onRemoveImage,
  onSetMainImage 
}: UploadedImagesProps) {
  // Use the provided handlers or fall back to the alternative names
  const handleRemove = onRemove || onRemoveImage;
  const handleSetMain = onSetMain || onSetMainImage;

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-foreground/90">
          Uploaded Images
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.id || index} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={image.url} 
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => handleRemove && handleRemove(image)}
                className="p-1.5 rounded-full bg-red-500/50 hover:bg-red-500/70 transition-colors"
                aria-label="Remove image"
              >
                {/* <Trash2 className="w-4 h-4 text-white" /> */}
                Remove
              </button>
              {!image.isMain && (
                <button 
                  onClick={() => handleSetMain && handleSetMain(image)}
                  className="p-1.5 rounded-full bg-fuchsia-500/50 hover:bg-fuchsia-500/70 transition-colors ml-2"
                  aria-label="Set as main image"
                >
                  {/* <Star className="w-4 h-4 text-white" /> */}
                  Set as Main
                </button>
              )}
            </div>
            {image.isMain && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-fuchsia-500/80 text-white text-xs">
                Main
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
