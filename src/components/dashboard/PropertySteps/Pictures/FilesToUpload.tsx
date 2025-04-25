
import React from "react";
import { Loader2, Trash2, XCircle } from "lucide-react";

interface FilesToUploadProps {
  files: File[];
  uploading?: boolean;
  onUpload: () => void;
  onRemoveFile: (index: number) => void;
  onRemove?: (index: number) => void;
}

export default function FilesToUpload({ 
  files, 
  uploading = false, 
  onUpload, 
  onRemoveFile,
  onRemove
}: FilesToUploadProps) {
  // Automatically trigger upload when files are present
  React.useEffect(() => {
    if (files.length > 0 && !uploading) {
      onUpload();
    }
  }, [files, uploading, onUpload]);

  if (files.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-foreground/90">
          {uploading ? "Uploading..." : `Processing ${files.length} ${files.length === 1 ? 'file' : 'files'}`}
        </label>
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
                onClick={() => {
                  onRemoveFile(index);
                  if (onRemove) onRemove(index);
                }}
                className="p-1.5 rounded-full bg-red-500/50 hover:bg-red-500/70 transition-colors"
                aria-label="Remove file"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
