
import React from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImageUploadSectionProps {
  roomImages: File[];
  roomImagePreviews: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export default function ImageUploadSection({
  roomImages,
  roomImagePreviews,
  onImageUpload,
  onRemoveImage
}: ImageUploadSectionProps) {
  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <Label className="text-right text-sm text-white">Room Images</Label>
      <div className="col-span-3">
        <div className="flex items-center gap-3 mb-3">
          <Button 
            type="button" 
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white flex items-center gap-2"
            onClick={() => document.getElementById('room-images-upload')?.click()}
          >
            <ImagePlus size={16} />
            Upload Images
          </Button>
          <input 
            id="room-images-upload" 
            type="file" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={onImageUpload} 
          />
          <span className="text-xs text-gray-300">
            {roomImages.length} {roomImages.length === 1 ? 'image' : 'images'} selected
          </span>
        </div>
        
        {/* Image previews */}
        {roomImagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {roomImagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img 
                  src={preview} 
                  alt={`Room preview ${index + 1}`} 
                  className="h-20 w-full object-cover rounded-md" 
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemoveImage(index)}
                >
                  <Trash size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
