
import React from "react";
import UploadArea from "./Pictures/UploadArea";
import FilesToUpload from "./Pictures/FilesToUpload";
import UploadedImages from "./Pictures/UploadedImages";
import { usePropertyImages, UploadedImage } from "@/hooks/usePropertyImages";

interface PicturesStepProps {
  formData: {
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
  };
  updateFormData: (field: string, value: any) => void;
}

export default function PicturesStep({ 
  formData,
  updateFormData
}: PicturesStepProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const {
    files,
    images: uploadedImages,
    uploading,
    handleAddFiles: addFiles,
    handleRemoveFile: removeFile,
    handleRemoveImage: removeUploadedImage,
    handleUploadImages: uploadFiles,
    handleSetMainImage: setMainImage
  } = usePropertyImages(formData.hotelImages || []);

  // Update form data when uploaded images change
  React.useEffect(() => {
    console.log("PicturesStep: uploadedImages changed", uploadedImages);
    
    // Only update the form if the current images are different from the form data
    const currentImagesJson = JSON.stringify(uploadedImages);
    const formImagesJson = JSON.stringify(formData.hotelImages || []);
    
    if (currentImagesJson !== formImagesJson) {
      if (uploadedImages.length > 0) {
        // Find main image
        const mainImage = uploadedImages.find(img => img.isMain)?.url || uploadedImages[0].url;
        updateFormData('hotelImages', uploadedImages);
        updateFormData('mainImageUrl', mainImage);
        
        console.log("PicturesStep: Updated form data with images", {
          count: uploadedImages.length,
          mainImage
        });
      } else {
        // Clear images if none are uploaded
        updateFormData('hotelImages', []);
        updateFormData('mainImageUrl', '');
      }
    }
  }, [uploadedImages, updateFormData, formData.hotelImages]);
  
  const handleAddMoreClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">PICTURES</h3>
      
      <UploadArea onFilesSelected={addFiles} />
      
      <FilesToUpload 
        files={files}
        uploading={uploading}
        onUpload={uploadFiles}
        onRemoveFile={removeFile}
      />
      
      <UploadedImages 
        images={uploadedImages}
        onSetMainImage={setMainImage}
        onRemoveImage={removeUploadedImage}
        onAddMoreClick={handleAddMoreClick}
      />
      
      <input
        ref={fileInputRef}
        id="add-more-photos"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
