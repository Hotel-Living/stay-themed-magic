
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

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
    <div className="space-y-3">
      <div>
        <Label className="text-white text-sm">Room Images</Label>
        <div className="flex items-center gap-2 mt-1">
          <Button
            type="button"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white h-8 text-sm px-3"
            onClick={() => document.getElementById('room-images')?.click()}
          >
            <ImagePlus size={14} className="mr-1" />
            Upload Images
          </Button>
          <Input
            id="room-images"
            type="file"
            accept="image/*"
            multiple
            onChange={onImageUpload}
            className="hidden"
          />
          <span className="text-xs text-gray-300">
            {roomImages.length} {roomImages.length === 1 ? 'image' : 'images'} selected
          </span>
        </div>
      </div>
      
      {roomImagePreviews.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {roomImagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <img 
                src={preview} 
                alt={`Room preview ${index + 1}`} 
                className="w-full h-20 object-cover rounded"
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemoveImage(index)}
              >
                <Trash size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
