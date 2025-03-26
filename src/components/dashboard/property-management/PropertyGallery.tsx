
import React, { useState } from 'react';
import { X, Upload, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

// Mock images for demonstration
const mockPropertyImages = {
  "1": [
    { id: "1", url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", isMain: true },
    { id: "2", url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", isMain: false },
    { id: "3", url: "https://images.unsplash.com/photo-1540304453527-54392eda051a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80", isMain: false },
  ],
  "2": [
    { id: "4", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", isMain: true },
    { id: "5", url: "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", isMain: false },
  ]
};

interface PropertyGalleryProps {
  propertyId: string;
}

export function PropertyGallery({ propertyId }: PropertyGalleryProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(mockPropertyImages[propertyId as keyof typeof mockPropertyImages] || []);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    
    // Simulate file upload delay
    setTimeout(() => {
      const newImages = Array.from(e.target.files || []).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        isMain: images.length === 0 // Make it main if it's the first image
      }));
      
      setImages([...images, ...newImages]);
      setUploading(false);
      
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) have been uploaded.`,
      });
      
      // Reset file input
      e.target.value = "";
    }, 1500);
  };
  
  const setMainImage = (imageId: string) => {
    setImages(images.map(img => ({
      ...img,
      isMain: img.id === imageId
    })));
    
    toast({
      title: "Main image set",
      description: "The main property image has been updated.",
    });
  };
  
  const deleteImage = (imageId: string) => {
    setImages(images.filter(img => img.id !== imageId));
    
    toast({
      title: "Image deleted",
      description: "The image has been deleted from the gallery.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Property Images</h3>
        
        <div className="relative">
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Images"}
            {!uploading && <Upload className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {images.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-semibold">No images yet</h3>
          <p className="text-muted-foreground">Upload images to showcase your property</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card 
              key={image.id} 
              className={`relative overflow-hidden group ${image.isMain ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-1 ring-2 ring-fuchsia-500' : ''}`}
            >
              <img 
                src={image.url} 
                alt="Property"
                className="w-full h-48 object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                  onClick={() => setMainImage(image.id)}
                  disabled={image.isMain}
                >
                  <Star className={`h-4 w-4 ${image.isMain ? 'fill-yellow-500' : ''}`} />
                  {image.isMain ? 'Main' : 'Set as Main'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white/20 hover:text-white"
                  onClick={() => deleteImage(image.id)}
                >
                  <X className="h-4 w-4" />
                  Delete
                </Button>
              </div>
              
              {image.isMain && (
                <div className="absolute top-2 left-2">
                  <span className="bg-fuchsia-500 text-white text-xs py-1 px-2 rounded-full">
                    Main Image
                  </span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
