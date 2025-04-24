
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RoomImageSectionProps {
  roomImages: File[];
  roomImagePreviews: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export default function RoomImageSection({
  roomImages,
  roomImagePreviews,
  onImageUpload,
  onRemoveImage
}: RoomImageSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white">Room Images</Label>
        <Input 
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          className="bg-[#850390] text-white border-white"
        />
      </div>
      
      {roomImagePreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {roomImagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img 
                src={preview} 
                alt={`Room preview ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
