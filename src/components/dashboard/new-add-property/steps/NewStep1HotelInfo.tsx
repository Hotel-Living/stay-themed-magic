import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, X, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Country } from 'country-state-city';

interface NewStep1HotelInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
  isAdmin: boolean;
}

export function NewStep1HotelInfo({
  formData,
  updateFormData,
  onValidationChange,
  isAdmin
}: NewStep1HotelInfoProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [cities, setCities] = useState<Array<{name: string, placeId: string}>>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const { data, error } = await supabase.storage
          .from('hotel-images')
          .upload(`${formData.hotelName}/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          toast({
            title: "Upload error",
            description: "Could not upload image: " + error.message,
            variant: "destructive",
          });
          console.error("File upload error:", error);
        } else {
          toast({
            title: "Image uploaded",
            description: `Image ${file.name} uploaded successfully.`,
          });
          console.log("File uploaded successfully:", data);

          // Update form data with the new image URL
          const imageUrl = supabase.storage
            .from('hotel-images')
            .getPublicUrl(`${formData.hotelName}/${file.name}`).data.publicUrl;

          updateFormData('hotelImages', [...(formData.hotelImages || []), imageUrl]);
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    updateFormData(
      'hotelImages',
      formData.hotelImages.filter((url: string) => url !== imageUrl)
    );
  };

  // Predefined list of allowed countries for better performance
  const allowedCountries = [
    'Germany', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 
    'Canada', 'Colombia', 'South Korea', 'Costa Rica', 'Croatia', 'Denmark', 'Ecuador', 
    'Egypt', 'United Arab Emirates', 'Slovakia', 'Spain', 'United States', 'Estonia', 
    'Philippines', 'Finland', 'France', 'Georgia', 'Greece', 'Hungary', 'Indonesia', 
    'Ireland', 'Iceland', 'Italy', 'Japan', 'Kazakhstan', 'Latvia', 'Lithuania', 
    'Luxembourg', 'Malaysia', 'Malta', 'Morocco', 'Mexico', 'Norway', 'New Zealand', 
    'Netherlands', 'Panama', 'Paraguay', 'Peru', 'Poland', 'Portugal', 'United Kingdom', 
    'Czech Republic', 'Dominican Republic', 'Romania', 'Singapore', 'Sri Lanka', 
    'Sweden', 'Switzerland', 'Thailand', 'Taiwan', 'Turkey', 'Uruguay'
  ];

  // Filter countries to only show allowed ones
  const countries = Country.getAllCountries().filter(country => 
    allowedCountries.includes(country.name)
  );

  // Load Google Maps with proper API key
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        if (error) throw error;
        
        const apiKey = data.key || data.apiKey;
        if (!apiKey) {
          console.error('No API key received from server');
          return;
        }

        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => setMapsLoaded(true);
          document.head.appendChild(script);
        } else {
          setMapsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, []);

  // Fetch top 10 prominent cities using Google Maps Places API
  const fetchProminentCities = async (countryName: string) => {
    if (!mapsLoaded || !window.google?.maps?.places) {
      console.log('Google Maps Places API not loaded yet');
      return;
    }

    setLoadingCities(true);
    try {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      const request = {
        query: `cities in ${countryName}`,
        type: 'locality',
        fields: ['name', 'place_id', 'geometry']
      };

      service.textSearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          // Limit to top 10 most prominent cities
          const topCities = results
            .slice(0, 10)
            .map(place => ({
              name: place.name,
              placeId: place.place_id
            }));
          
          setCities(topCities);
        } else {
          console.error('Places API request failed:', status);
          setCities([]);
        }
        setLoadingCities(false);
      });

    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
      setLoadingCities(false);
    }
  };

  // Update cities when country changes
  useEffect(() => {
    if (formData.country && mapsLoaded) {
      fetchProminentCities(formData.country);
    } else {
      setCities([]);
    }
  }, [formData.country, mapsLoaded]);

  // Auto-geocode selected city for coordinates
  const geocodeCity = (cityName: string, countryName: string) => {
    if (!window.google?.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: `${cityName}, ${countryName}` },
      (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const location = results[0].geometry.location;
          updateFormData('latitude', location.lat().toString());
          updateFormData('longitude', location.lng().toString());
        }
      }
    );
  };

  // Validate form when data changes
  useEffect(() => {
    const isValid = !!(formData?.hotelName && 
                      formData?.country && 
                      formData?.city && 
                      formData?.propertyType &&
                      formData?.category &&
                      formData?.description);
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Hotel Information</h2>
        <p className="text-gray-300">Basic details about your property</p>
      </div>

      {/* Note about images */}
      <div className="text-center text-purple-200 bg-purple-800/30 p-4 rounded-lg border border-purple-600">
        <p className="text-sm">📸 Hotel images will be uploaded in the final step (Step 5)</p>
      </div>

      {/* Hotel Information Form */}
      <Card className="p-6 bg-purple-900/30 border-purple-600">
        <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
        
        <div className="space-y-6">
          {/* Hotel Name */}
          <div>
            <Label className="text-white text-lg font-medium">Hotel Name *</Label>
            <Input
              value={formData.hotelName || ''}
              onChange={(e) => updateFormData('hotelName', e.target.value)}
              placeholder="Enter hotel name"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-gray-400"
              required
            />
          </div>

          {/* Referral Association (Admin Only) */}
          {isAdmin && (
            <div>
              <Label className="text-white text-lg font-medium">Referral Association (Admin Only)</Label>
              <Input
                value={formData.referralAssociation || ''}
                onChange={(e) => updateFormData('referralAssociation', e.target.value)}
                placeholder="e.g., FEHGRA, AHRA, etc."
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-gray-400"
              />
              <p className="text-xs text-purple-300 mt-1">Optional field for tracking revenue share agreements</p>
            </div>
          )}

          {/* Country and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white text-lg font-medium">Country *</Label>
              <Select
                value={formData.country || ''}
                onValueChange={(value) => {
                  updateFormData('country', value);
                  updateFormData('city', ''); // Reset city when country changes
                  updateFormData('latitude', ''); // Reset coordinates
                  updateFormData('longitude', '');
                }}
              >
                <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-600">
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.name} className="text-white hover:bg-purple-800">
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white text-lg font-medium">City *</Label>
              <Select
                value={formData.city || ''}
                onValueChange={(value) => {
                  updateFormData('city', value);
                  // Auto-geocode the selected city for coordinates
                  if (value && formData.country) {
                    geocodeCity(value, formData.country);
                  }
                }}
                disabled={!formData.country || loadingCities}
              >
                <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                  <SelectValue placeholder={
                    loadingCities ? "Loading cities..." : 
                    !formData.country ? "Select country first" : 
                    "Select city"
                  } />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-600">
                  {cities.map((city) => (
                    <SelectItem key={city.placeId} value={city.name} className="text-white hover:bg-purple-800">
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address */}
          <div>
            <Label className="text-white text-lg font-medium">Address</Label>
            <Input
              value={formData.address || ''}
              onChange={(e) => updateFormData('address', e.target.value)}
              placeholder="Enter street address"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-white text-lg font-medium">Property Type *</Label>
            <Select
              value={formData.propertyType || ''}
              onValueChange={(value) => updateFormData('propertyType', value)}
            >
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                <SelectItem value="Hotel" className="text-white hover:bg-purple-800">Hotel</SelectItem>
                <SelectItem value="Resort" className="text-white hover:bg-purple-800">Resort</SelectItem>
                <SelectItem value="Boutique Hotel" className="text-white hover:bg-purple-800">Boutique Hotel</SelectItem>
                <SelectItem value="Country House" className="text-white hover:bg-purple-800">Country House</SelectItem>
                <SelectItem value="Roadside Motel" className="text-white hover:bg-purple-800">Roadside Motel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div>
            <Label className="text-white text-lg font-medium">Category *</Label>
            <Select
              value={formData.category || ''}
              onValueChange={(value) => updateFormData('category', value)}
            >
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select hotel category" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                <SelectItem value="1" className="text-white hover:bg-purple-800">1 Star</SelectItem>
                <SelectItem value="2" className="text-white hover:bg-purple-800">2 Stars</SelectItem>
                <SelectItem value="3" className="text-white hover:bg-purple-800">3 Stars</SelectItem>
                <SelectItem value="4" className="text-white hover:bg-purple-800">4 Stars</SelectItem>
                <SelectItem value="5" className="text-white hover:bg-purple-800">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label className="text-white text-lg font-medium">Description *</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe your property atmosphere, unique features, and ideal guests"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-gray-400 resize-none"
              rows={4}
              required
            />
          </div>

          {/* Coordinates Display */}
          {formData.latitude && formData.longitude && (
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <Label className="text-gray-400">Latitude</Label>
                <div className="bg-purple-800/30 p-2 rounded">{formData.latitude}</div>
              </div>
              <div>
                <Label className="text-gray-400">Longitude</Label>
                <div className="bg-purple-800/30 p-2 rounded">{formData.longitude}</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
