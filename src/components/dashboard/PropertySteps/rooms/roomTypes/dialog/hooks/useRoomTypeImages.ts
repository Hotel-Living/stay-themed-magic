
import { useState } from "react";

interface UseRoomTypeImagesReturn {
  roomImages: File[];
  roomImagePreviews: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export function useRoomTypeImages(): UseRoomTypeImagesReturn {
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setRoomImages(prev => [...prev, ...newFiles]);
      setRoomImagePreviews(prev => [
        ...prev,
        ...newFiles.map(file => URL.createObjectURL(file))
      ]);
    }
  };

  const removeImage = (index: number) => {
    setRoomImages(prev => prev.filter((_, i) => i !== index));
    setRoomImagePreviews(prev => {
      const urlToRevoke = prev[index];
      URL.revokeObjectURL(urlToRevoke);
      return prev.filter((_, i) => i !== index);
    });
  };

  return {
    roomImages,
    roomImagePreviews,
    handleImageUpload,
    removeImage
  };
}
