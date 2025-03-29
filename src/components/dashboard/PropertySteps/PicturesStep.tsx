
import React, { useRef } from "react";
import UploadArea from "./Pictures/UploadArea";
import FilesToUpload from "./Pictures/FilesToUpload";
import UploadedImages from "./Pictures/UploadedImages";
import { usePropertyImages } from "@/hooks/usePropertyImages";

export default function PicturesStep() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    files,
    uploadedImages,
    uploading,
    addFiles,
    removeFile,
    removeUploadedImage,
    uploadFiles,
    setMainImage
  } = usePropertyImages();
  
  const handleAddMoreClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (newFiles.length > 0) {
        addFiles(newFiles);
      }
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
