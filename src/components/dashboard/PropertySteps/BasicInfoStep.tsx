
import React, { useEffect } from "react";
import { usePropertyImages } from "@/hooks/usePropertyImages";

export default function BasicInfoStep({ 
  formData = {},
  updateFormData = () => {},
  onValidationChange = () => {} 
}) {
  const { 
    files, 
    uploadedImages, 
    uploading, 
    addFiles, 
    removeFile, 
    removeUploadedImage, 
    uploadFiles, 
    setMainImage 
  } = usePropertyImages(formData.hotelImages || []);

  // Update form data when uploaded images change
  useEffect(() => {
    if (uploadedImages.length > 0) {
      // Find main image
      const mainImage = uploadedImages.find(img => img.isMain)?.url || uploadedImages[0].url;
      updateFormData('hotelImages', uploadedImages);
      updateFormData('mainImageUrl', mainImage);
    }
  }, [uploadedImages, updateFormData]);

  // Validate step when necessary fields change
  useEffect(() => {
    const isValid = formData.hotelName && 
                    formData.propertyType && 
                    formData.description;
    onValidationChange(!!isValid);
  }, [formData.hotelName, formData.propertyType, formData.description, onValidationChange]);

  return (
    <div className="space-y-5">
      <div>
        <button
          onClick={() => document.getElementById('hotel-images-upload')?.click()}
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#690695] text-white hover:bg-[#7a0486] transition-colors mb-4"
        >
          Add Hotel Pictures
        </button>
        <input
          type="file"
          id="hotel-images-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(Array.from(e.target.files));
            }
          }}
        />
        {files.length > 0 && (
          <div className="mb-4">
            <p className="text-sm mb-2">Selected files:</p>
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="mt-2 px-4 py-2 bg-[#690695] text-white rounded-lg hover:bg-[#7a0486] transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Selected Images'}
            </button>
          </div>
        )}
        {uploadedImages.length > 0 && (
          <div className="mb-4">
            <p className="text-sm mb-2">Uploaded images:</p>
            <div className="flex flex-wrap gap-2">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg ${image.isMain ? 'ring-2 ring-fuchsia-500' : ''}`}
                  />
                  <button
                    onClick={() => removeUploadedImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                  {!image.isMain && (
                    <button
                      onClick={() => setMainImage(index)}
                      className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1"
                    >
                      Set as Main
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          HOTEL NAME
        </label>
        <input 
          type="text" 
          placeholder="Enter hotel name" 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#8a07b2]" 
          value={formData.hotelName || ''}
          onChange={(e) => updateFormData('hotelName', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          CATEGORY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#a505d4]"
          value={formData.category || ''}
          onChange={(e) => updateFormData('category', e.target.value)}
        >
          <option value="">Select hotel category</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          TYPE OF PROPERTY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da]"
          value={formData.propertyType || ''}
          onChange={(e) => updateFormData('propertyType', e.target.value)}
        >
          <option value="">Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="boutique">Hotel Boutique</option>
          <option value="resort">Resort</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          STYLE OF PROPERTY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#af09df]"
          value={formData.style || ''}
          onChange={(e) => updateFormData('style', e.target.value)}
        >
          <option value="">Select property style</option>
          <option value="classic">Classic</option>
          <option value="classic-elegant">Classic Elegant</option>
          <option value="design">Design</option>
          <option value="modern">Modern</option>
          <option value="countryside">Countryside</option>
          <option value="urban">Urban</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase bg-[#690695]">
          HOTEL DESCRIPTION
        </label>
        <textarea 
          placeholder="Enter a detailed description of your hotel" 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[120px] bg-[#b10be0]"
          value={formData.description || ''}
          onChange={(e) => updateFormData('description', e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
