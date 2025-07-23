
import React from "react";
import { Upload } from "lucide-react";
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center cursor-pointer hover:border-purple-300 transition-colors"
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
      <p className="text-lg font-medium text-white mb-2">
        {t('dashboard.dragDropPhotos')}
      </p>
      <p className="text-sm text-purple-300">
        {t('dashboard.orClickToBrowse')}
      </p>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
