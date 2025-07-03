
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { Country, City } from 'country-state-city';
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { useImageUploadLimiter } from "@/hooks/useImageUploadLimiter";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Check } from "lucide-react";

interface NewStep1HotelInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep1HotelInfo({
  formData,
  updateFormData,
  onValidationChange
}: NewStep1HotelInfoProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [cities, setCities] = useState<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  // Image upload functionality
  const {
    files,
    uploadedImages,
    uploading,
    addFiles,
    removeFile,
    removeUploadedImage,
    uploadFiles
  } = usePropertyImages(formData.images || [], updateFormData);

  const imageLimiter = useImageUploadLimiter({
    maxImages: 20,
    maxUploadsPerMinute: 10,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  });

  // Get all countries
  const countries = Country.getAllCountries();

  // Update cities when country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.name === formData.country);
      if (selectedCountry) {
        const countryCities = City.getCitiesOfCountry(selectedCountry.isoCode) || [];
        setCities(countryCities);
      }
    }
  }, [formData.country]);

  // Load Google Maps
  useEffect(() => {
    if (!window.google && !document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO8Y8qxJ1Q8Qc8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
    } else if (window.google) {
      setMapLoaded(true);
      initializeMap();
    }
  }, []);

  // Initialize map
  const initializeMap = () => {
    if (!window.google || !mapLoaded) return;

    const mapElement = document.getElementById('property-map');
    if (!mapElement) return;

    const lat = parseFloat(formData.latitude) || 40.7128;
    const lng = parseFloat(formData.longitude) || -74.0060;

    const googleMap = new window.google.maps.Map(mapElement, {
      center: { lat, lng },
      zoom: 13,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#1a1a2e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }]
        }
      ]
    });

    const mapMarker = new window.google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      draggable: true
    });

    mapMarker.addListener('dragend', () => {
      const position = mapMarker.getPosition();
      if (position) {
        const newLat = position.lat().toString();
        const newLng = position.lng().toString();
        updateFormData('latitude', newLat);
        updateFormData('longitude', newLng);
      }
    });

    setMap(googleMap);
    setMarker(mapMarker);
  };

  // Update map when coordinates change
  useEffect(() => {
    if (map && marker && formData.latitude && formData.longitude) {
      const lat = parseFloat(formData.latitude);
      const lng = parseFloat(formData.longitude);
      const position = { lat, lng };
      
      map.setCenter(position);
      marker.setPosition(position);
    }
  }, [formData.latitude, formData.longitude, map, marker]);

  // Handle file selection for images
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);
    
    // Validate files
    const { validFiles, errors } = imageLimiter.validateFiles(fileArray);
    
    if (errors.length > 0) {
      errors.forEach(error => {
        toast({
          title: "File Error",
          description: error,
          variant: "destructive"
        });
      });
    }

    if (validFiles.length === 0) return;

    // Check upload limits
    if (!imageLimiter.canUpload(uploadedImages.length, validFiles.length)) {
      return;
    }

    // Add files and automatically upload them
    addFiles(validFiles);
    
    // Auto-upload after files are added
    setTimeout(async () => {
      try {
        await uploadFiles();
        imageLimiter.recordUpload(validFiles.length);
        
        toast({
          title: "Images Uploaded",
          description: `${validFiles.length} image(s) uploaded successfully`,
          variant: "default"
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Error",
          description: "Failed to upload images. Please try again.",
          variant: "destructive"
        });
      }
    }, 100);

    // Clear the input
    event.target.value = '';
  };

  // Validation
  useEffect(() => {
    const isValid = !!(
      formData.hotelName &&
      formData.propertyStyle &&
      formData.propertyType &&
      formData.category &&
      formData.description &&
      formData.country &&
      formData.city &&
      formData.latitude &&
      formData.longitude
    );
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hotel Name */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            {t('dashboard.hotelName')}
          </Label>
          <Input
            type="text"
            value={formData.hotelName || ''}
            onChange={(e) => updateFormData('hotelName', e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400"
            placeholder={t('dashboard.enterHotelName')}
          />
        </div>

        {/* Property Style */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Property Style
          </Label>
          <Select
            value={formData.propertyStyle || ''}
            onValueChange={(value) => updateFormData('propertyStyle', value)}
          >
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select property style" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="modern" className="text-white hover:bg-purple-700">Modern</SelectItem>
              <SelectItem value="classic" className="text-white hover:bg-purple-700">Classic</SelectItem>
              <SelectItem value="boutique" className="text-white hover:bg-purple-700">Boutique</SelectItem>
              <SelectItem value="luxury" className="text-white hover:bg-purple-700">Luxury</SelectItem>
              <SelectItem value="budget" className="text-white hover:bg-purple-700">Budget</SelectItem>
              <SelectItem value="historic" className="text-white hover:bg-purple-700">Historic</SelectItem>
              <SelectItem value="contemporary" className="text-white hover:bg-purple-700">Contemporary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Property Type
          </Label>
          <Select
            value={formData.propertyType || ''}
            onValueChange={(value) => updateFormData('propertyType', value)}
          >
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="hotel" className="text-white hover:bg-purple-700">Hotel</SelectItem>
              <SelectItem value="apartment" className="text-white hover:bg-purple-700">Apartment</SelectItem>
              <SelectItem value="guesthouse" className="text-white hover:bg-purple-700">Guesthouse</SelectItem>
              <SelectItem value="hostel" className="text-white hover:bg-purple-700">Hostel</SelectItem>
              <SelectItem value="resort" className="text-white hover:bg-purple-700">Resort</SelectItem>
              <SelectItem value="villa" className="text-white hover:bg-purple-700">Villa</SelectItem>
              <SelectItem value="bed-breakfast" className="text-white hover:bg-purple-700">Bed & Breakfast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Category
          </Label>
          <Select
            value={formData.category || ''}
            onValueChange={(value) => updateFormData('category', value)}
          >
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="1-star" className="text-white hover:bg-purple-700">1 Star</SelectItem>
              <SelectItem value="2-star" className="text-white hover:bg-purple-700">2 Star</SelectItem>
              <SelectItem value="3-star" className="text-white hover:bg-purple-700">3 Star</SelectItem>
              <SelectItem value="4-star" className="text-white hover:bg-purple-700">4 Star</SelectItem>
              <SelectItem value="5-star" className="text-white hover:bg-purple-700">5 Star</SelectItem>
              <SelectItem value="unrated" className="text-white hover:bg-purple-700">Unrated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address Section */}
        <div className="space-y-6 bg-purple-800/30 p-6 rounded-lg border border-purple-600">
          <h3 className="text-white text-xl font-semibold">Add Address</h3>
          
          {/* Country Selection */}
          <div className="space-y-2">
            <Label className="text-white text-lg font-medium">Country</Label>
            <Select
              value={formData.country || ''}
              onValueChange={(value) => {
                updateFormData('country', value);
                updateFormData('city', ''); // Reset city when country changes
              }}
            >
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600 max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.isoCode} 
                    value={country.name}
                    className="text-white hover:bg-purple-700"
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Selection */}
          {formData.country && (
            <div className="space-y-2">
              <Label className="text-white text-lg font-medium">City</Label>
              <Select
                value={formData.city || ''}
                onValueChange={(value) => updateFormData('city', value)}
              >
                <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="bg-purple-800 border-purple-600 max-h-60 overflow-y-auto">
                  {cities.map((city) => (
                    <SelectItem 
                      key={city.name} 
                      value={city.name}
                      className="text-white hover:bg-purple-700"
                    >
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Address Input */}
          <div className="space-y-2">
            <Label className="text-white text-lg font-medium">Street Address</Label>
            <Input
              type="text"
              value={formData.address || ''}
              onChange={(e) => updateFormData('address', e.target.value)}
              className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400"
              placeholder="Enter street address"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white text-lg font-medium">Latitude</Label>
              <Input
                type="number"
                step="any"
                value={formData.latitude || ''}
                onChange={(e) => updateFormData('latitude', e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400"
                placeholder="0.000000"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg font-medium">Longitude</Label>
              <Input
                type="number"
                step="any"
                value={formData.longitude || ''}
                onChange={(e) => updateFormData('longitude', e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400"
                placeholder="0.000000"
              />
            </div>
          </div>

          {/* Google Maps */}
          <div className="space-y-2">
            <Label className="text-white text-lg font-medium">Location on Map</Label>
            <div 
              id="property-map" 
              className="w-full h-64 bg-purple-700/50 border border-purple-600 rounded-lg"
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full text-purple-300">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hotel Description */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Hotel Description
          </Label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400 min-h-[120px]"
            placeholder="Describe your hotel..."
          />
        </div>

        {/* Upload Images Section */}
        <div className="space-y-4 bg-purple-800/30 p-6 rounded-lg border border-purple-600">
          <Label className="text-white text-lg font-medium">Upload Images</Label>
          
          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              disabled={uploading}
            />
            <div className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center bg-purple-800/20 hover:bg-purple-800/40 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <p className="text-lg font-medium text-white mb-2">
                {uploading ? 'Uploading...' : 'Drag and drop photos here'}
              </p>
              <p className="text-sm text-purple-300">
                or click to browse • Supported formats: JPG, PNG, WebP • Maximum file size: 10MB
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="flex items-center space-x-2 text-purple-300">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
              <span>Processing images...</span>
            </div>
          )}

          {/* Uploaded Images Gallery */}
          {uploadedImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Uploaded Images ({uploadedImages.length})</h4>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={`Hotel image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    
                    {/* Success indicator */}
                    <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeUploadedImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ideal Guests */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Ideal Guests
          </Label>
          <Textarea
            value={formData.idealGuests || ''}
            onChange={(e) => updateFormData('idealGuests', e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400 min-h-[120px]"
            placeholder="Describe your ideal guests..."
          />
        </div>

        {/* Atmosphere */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Atmosphere
          </Label>
          <Textarea
            value={formData.atmosphere || ''}
            onChange={(e) => updateFormData('atmosphere', e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400 min-h-[120px]"
            placeholder="Describe the atmosphere..."
          />
        </div>

        {/* Location Description */}
        <div className="space-y-2">
          <Label className="text-white text-lg font-medium">
            Location Description
          </Label>
          <Textarea
            value={formData.locationDescription || ''}
            onChange={(e) => updateFormData('locationDescription', e.target.value)}
            className="bg-purple-800/50 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400 min-h-[120px]"
            placeholder="Describe the location..."
          />
        </div>

      </div>
    </div>
  );
}
