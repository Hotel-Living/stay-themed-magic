
import React from "react";
import { PlusCircle, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedImage {
  url: string;
  isMain: boolean;
  id?: string;
  name?: string;
}

interface UploadedImagesProps {
  images: UploadedImage[];
  onSetMainImage: (index: number) => void;
  onRemoveImage: (index: number) => void;
  onAddMoreClick?: () => void;
  mainImageUrl?: string;
  onRemove?: (imageToRemove: UploadedImage) => void; 
  onSetMain?: (image: UploadedImage) => void;
}

export default function UploadedImages({
  images,
  onSetMainImage,
  onRemoveImage,
  onAddMoreClick = () => {},
  mainImageUrl,
  onRemove,
  onSetMain
}: UploadedImagesProps) {
  return <div className="mt-6">
      <label className="block text-sm font-medium text-foreground/90 mb-3">
        Uploaded Photos ({images.length})
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => <div key={index} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
            <img src={image.url} alt={`Uploaded image ${index}`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className={cn("p-1.5 rounded-full transition-colors mr-2", image.isMain ? "bg-amber-400/60 hover:bg-amber-400/80" : "bg-white/10 hover:bg-white/20")} 
                onClick={() => {
                  onSetMainImage(index);
                  if (onSetMain) onSetMain(image);
                }} 
                aria-label={image.isMain ? "Main image" : "Set as main image"}>
                <Star className={cn("w-4 h-4", image.isMain ? "fill-amber-400 text-amber-400" : "text-white")} />
              </button>
              <button onClick={() => {
                onRemoveImage(index);
                if (onRemove) onRemove(image);
              }} className="p-1.5 rounded-full bg-red-500/30 hover:bg-red-500/50 transition-colors" aria-label="Remove image">
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            {image.isMain && <div className="absolute top-2 left-2 bg-amber-400/80 text-amber-900 text-xs font-medium py-0.5 px-2 rounded-full">
                Main Photo
              </div>}
          </div>)}
        <div onClick={onAddMoreClick} className="flex items-center justify-center rounded-lg aspect-[4/3] border border-dashed border-fuchsia-800/40 cursor-pointer transition-colors bg-[#c21cf1]">
          <button className="p-2 rounded-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
            <PlusCircle className="w-6 h-6 text-fuchsia-300" />
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-foreground/50">
        <span className="text-fuchsia-300">★</span> Select a photo as the main image
      </div>
    </div>;
}
