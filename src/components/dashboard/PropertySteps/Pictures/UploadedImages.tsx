
import React from "react";
import { Button } from "@/components/ui/button";
import { UploadedImage } from "@/hooks/usePropertyImages";
import { useTranslation } from "@/hooks/useTranslation";

interface UploadedImagesProps {
  images: UploadedImage[];
  onRemoveImage: (index: number) => void;
  onSetMainImage: (index: number) => void;
  mainImageUrl: string;
  onAddMoreClick: () => void;
}

export default function UploadedImages({ 
  images, 
  onRemoveImage, 
  onSetMainImage, 
  mainImageUrl,
  onAddMoreClick 
}: UploadedImagesProps) {
  const { t } = useTranslation();
  
  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">{t('dashboard.uploadedPhotos')} ({images.length})</h4>
        <Button onClick={onAddMoreClick} variant="outline" size="sm">
          Add More
        </Button>
      </div>
      
      <p className="text-white/70 text-sm">{t('dashboard.selectMainImage')}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={`Hotel image ${index + 1}`}
              className={`w-full h-32 object-cover rounded-lg cursor-pointer transition-all ${
                image.url === mainImageUrl ? 'ring-2 ring-yellow-400' : ''
              }`}
              onClick={() => onSetMainImage(index)}
            />
            
            {image.url === mainImageUrl && (
              <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                MAIN
              </div>
            )}
            
            <button
              onClick={() => onRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
