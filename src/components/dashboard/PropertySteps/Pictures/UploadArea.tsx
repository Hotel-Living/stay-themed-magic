
import React, { useState, useCallback, RefObject } from "react";
import { Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  fileInputRef?: RefObject<HTMLInputElement>;
}

export default function UploadArea({ onFilesSelected, fileInputRef }: UploadAreaProps) {
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (newFiles.length > 0) {
        onFilesSelected(newFiles);
        toast({
          title: "Files added",
          description: `${newFiles.length} image${newFiles.length > 1 ? 's' : ''} ready to upload.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only.",
          variant: "destructive",
        });
      }
    }
  }, [toast, onFilesSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (newFiles.length > 0) {
        onFilesSelected(newFiles);
        toast({
          title: "Files added",
          description: `${newFiles.length} image${newFiles.length > 1 ? 's' : ''} ready to upload.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only.",
          variant: "destructive",
        });
      }
    }
  }, [toast, onFilesSelected]);

  return (
    <div 
      className={cn(
        "bg-fuchsia-950/30 p-8 rounded-lg border border-dashed border-fuchsia-800/40 text-center",
        dragOver && "bg-fuchsia-950/50 border-fuchsia-500/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-fuchsia-400/50" />
      <p className="text-foreground/90 font-medium mb-1">Drag & drop photos here</p>
      <p className="text-sm text-foreground/60 mb-4">or click to browse from your device</p>
      <label className="inline-flex items-center px-4 py-2 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors cursor-pointer">
        <Image className="w-4 h-4 mr-2" /> 
        Upload Photos
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </label>
    </div>
  );
}
