
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface UploadAreaProps {
  onFilesSelected: (files: FileList) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function UploadArea({ onFilesSelected, fileInputRef }: UploadAreaProps) {
  const { t } = useTranslation();
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-white/50 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <div className="text-white/60">
        <p className="mb-2">{t('dashboard.dragDropPhotos')}</p>
        <p>{t('dashboard.orClickToBrowse')}</p>
      </div>
    </div>
  );
}
