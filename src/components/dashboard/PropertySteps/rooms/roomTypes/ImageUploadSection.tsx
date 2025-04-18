
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadSectionProps {
  roomImages: File[];
  roomImagePreviews: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  error?: string;
}

export default function ImageUploadSection({
  roomImages,
  roomImagePreviews,
  onImageUpload,
  onRemoveImage,
  error
}: ImageUploadSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Room Images</h3>
      
      <div className="bg-fuchsia-950/50 p-4 rounded-lg border border-white/20">
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${error ? 'border-red-400 bg-red-900/10' : 'border-fuchsia-600 bg-fuchsia-950/30 hover:bg-fuchsia-900/30'}`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onImageUpload}
                multiple
              />
            </label>
          </div>
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
        
        {roomImagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {roomImagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Card className="overflow-hidden h-24 bg-fuchsia-950/70">
                  <img
                    src={preview}
                    alt={`Room preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 bg-red-600 hover:bg-red-700"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
