
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface FilesToUploadProps {
  files: File[];
  onUpload: () => void;
  onRemoveFile: (index: number) => void;
}

export default function FilesToUpload({ files, onUpload, onRemoveFile }: FilesToUploadProps) {
  const { t } = useTranslation();
  
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">Files to upload ({files.length})</h4>
        <Button onClick={onUpload} className="bg-green-600 hover:bg-green-700">
          {t('dashboard.uploadPhotos')}
        </Button>
      </div>
      
      <div className="space-y-1">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-white/10 rounded p-2">
            <span className="text-white text-sm">{file.name}</span>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
