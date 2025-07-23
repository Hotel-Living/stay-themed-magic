
import { useState } from 'react';

export function useRoomTypeImages() {
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      setRoomImages(prev => [...prev, ...newImages]);
      
      // Create URL previews for new images - these will be converted to permanent URLs when saved
      const newPreviews = newImages.map(file => {
        const blobUrl = URL.createObjectURL(file);
        console.log("Created blob URL for room image:", blobUrl);
        return blobUrl;
      });
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
    
    // Remove the image preview URL and clean up blob URLs
    setRoomImagePreviews(prev => {
      const updated = [...prev];
      const urlToRemove = updated[index];
      
      // Only revoke blob URLs, not permanent storage URLs
      if (urlToRemove && urlToRemove.startsWith('blob:')) {
        console.log("Revoking blob URL:", urlToRemove);
        URL.revokeObjectURL(urlToRemove);
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
