
import React from "react";
import { Loader2, Trash2, Upload, XCircle } from "lucide-react";

interface FilesToUploadProps {
  files: File[];
  uploading: boolean;
  onUpload: () => void;
  onRemoveFile: (index: number) => void;
}

export default function FilesToUpload({ 
  files, 
  uploading, 
  onUpload, 
  onRemoveFile 
}: FilesToUploadProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-foreground/90">
          Files to Upload ({files.length})
        </label>
        <button
          onClick={onUpload}
          disabled={uploading}
          className="inline-flex items-center px-3 py-1 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors disabled:opacity-70"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" /> Upload All
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div key={index} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Upload preview ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => onRemoveFile(index)}
                className="p-1.5 rounded-full bg-red-500/50 hover:bg-red-500/70 transition-colors"
                aria-label="Remove file"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="absolute top-2 right-2">
              <button 
                onClick={() => onRemoveFile(index)}
                className="p-1 rounded-full bg-red-500/80 text-white"
                aria-label="Remove file"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
