
import { useState } from 'react';

export function useRoomTypeImages() {
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      setRoomImages(prev => [...prev, ...newImages]);
      
      // Create URL previews for new images
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setRoomImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    // Remove the image file
    setRoomImages(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    
    // Remove the image preview URL
    setRoomImagePreviews(prev => {
      const updated = [...prev];
      // Revoke the object URL to prevent memory leaks
      if (updated[index] && updated[index].startsWith('blob:')) {
        URL.revokeObjectURL(updated[index]);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  return {
    roomImages,
    roomImagePreviews,
    handleImageUpload,
    removeImage,
    setRoomImagePreviews // Expose this setter to allow external updates
  };
}
