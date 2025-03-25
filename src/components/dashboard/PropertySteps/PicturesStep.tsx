
import React, { useState, useCallback } from "react";
import { Upload, Image, PlusCircle, Star, Trash2, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function PicturesStep() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<{ url: string; isMain: boolean; id?: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(-1);
  const [dragOver, setDragOver] = useState(false);
  const { user } = useAuth();
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
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      );
      
      if (newFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const removeFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const removeUploadedImage = useCallback(async (index: number) => {
    const imageToRemove = uploadedImages[index];
    
    // If this is a placeholder, just remove from state
    if (!imageToRemove.url.startsWith('http')) {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
      return;
    }
    
    try {
      // Extract the file path from the URL
      const imagePath = imageToRemove.url.split('/').pop();
      
      if (imagePath) {
        await supabase.storage
          .from('hotel-images')
          .remove([imagePath]);
        
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        
        toast({
          title: "Image removed",
          description: "The image has been removed successfully.",
        });
      }
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Error removing image",
        description: "There was a problem removing the image.",
        variant: "destructive",
      });
    }
  }, [uploadedImages, toast]);

  const uploadFiles = useCallback(async () => {
    if (!user || files.length === 0) return;
    
    setUploading(true);
    
    try {
      const newUploadedImages = [...uploadedImages];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { data, error } = await supabase.storage
          .from('hotel-images')
          .upload(filePath, file);
        
        if (error) {
          throw error;
        }
        
        const { data: urlData } = supabase.storage
          .from('hotel-images')
          .getPublicUrl(data.path);
          
        newUploadedImages.push({
          url: urlData.publicUrl,
          isMain: false
        });
      }
      
      setUploadedImages(newUploadedImages);
      setFiles([]);
      
      toast({
        title: "Upload successful",
        description: `${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully.`,
      });
    } catch (error: any) {
      console.error("Error uploading files:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your images.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [user, files, uploadedImages, toast]);
  
  const setMainImage = useCallback((index: number) => {
    setUploadedImages(prev => 
      prev.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    );
    setMainImageIndex(index);
  }, []);

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">PICTURES</h3>
      
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
          />
        </label>
      </div>
      
      {/* Files ready to be uploaded */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-foreground/90">
              Files to Upload ({files.length})
            </label>
            <button
              onClick={uploadFiles}
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
                    onClick={() => removeFile(index)}
                    className="p-1.5 rounded-full bg-red-500/50 hover:bg-red-500/70 transition-colors"
                    aria-label="Remove file"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute top-2 right-2">
                  <button 
                    onClick={() => removeFile(index)}
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
      )}
      
      {/* Uploaded Photos */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Uploaded Photos ({uploadedImages.length})
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
              <img 
                src={image.url} 
                alt={`Uploaded image ${index}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  className={cn(
                    "p-1.5 rounded-full transition-colors mr-2",
                    image.isMain ? "bg-amber-400/60 hover:bg-amber-400/80" : "bg-white/10 hover:bg-white/20" 
                  )}
                  onClick={() => setMainImage(index)}
                  aria-label={image.isMain ? "Main image" : "Set as main image"}
                >
                  <Star className={cn("w-4 h-4", image.isMain ? "fill-amber-400 text-amber-400" : "text-white")} />
                </button>
                <button 
                  onClick={() => removeUploadedImage(index)}
                  className="p-1.5 rounded-full bg-red-500/30 hover:bg-red-500/50 transition-colors"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
              {image.isMain && (
                <div className="absolute top-2 left-2 bg-amber-400/80 text-amber-900 text-xs font-medium py-0.5 px-2 rounded-full">
                  Main Photo
                </div>
              )}
            </div>
          ))}
          <div 
            className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg aspect-[4/3] border border-dashed border-fuchsia-800/40 cursor-pointer hover:bg-fuchsia-950/40 transition-colors"
            onClick={() => document.getElementById('add-more-photos')?.click()}
          >
            <button className="p-2 rounded-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
              <PlusCircle className="w-6 h-6 text-fuchsia-300" />
            </button>
            <input
              id="add-more-photos"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-foreground/50">
          <span className="text-fuchsia-300">★</span> Select a photo as the main image
        </div>
      </div>
    </div>
  );
}
