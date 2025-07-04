
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewStep5FinalReviewProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep5FinalReview({
  formData,
  updateFormData,
  onValidationChange
}: NewStep5FinalReviewProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  // Debug: Log all formData to identify what's actually stored
  useEffect(() => {
    console.log('🔍 STEP 5 DEBUG - Full formData:', formData);
    console.log('🔍 Images data:', formData.hotelImages);
    console.log('🔍 Themes data:', formData.selectedAffinities);
    console.log('🔍 Activities data:', formData.selectedActivities);
    console.log('🔍 Stay durations:', formData.selectedStayDurations);
    console.log('🔍 Meal plans:', formData.mealPlans);
    console.log('🔍 Availability packages:', formData.availabilityPackages);
  }, [formData]);
  
  // Validation - requires at least one image and terms acceptance
  useEffect(() => {
    const hasImages = formData.hotelImages && formData.hotelImages.length > 0;
    const termsAccepted = formData.termsAccepted === true;
    const isValid = hasImages && termsAccepted;
    console.log('✅ Step 5 validation:', isValid, { hasImages, termsAccepted });
    onValidationChange(isValid);
  }, [formData.hotelImages, formData.termsAccepted, onValidationChange]);

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('Hotel Images')
          .upload(`${formData.hotelName || 'property'}/${fileName}`, file, {
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
            .from('Hotel Images')
            .getPublicUrl(`${formData.hotelName || 'property'}/${fileName}`).data.publicUrl;

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

  return (
    <div className="space-y-6 bg-purple-900 text-white p-6 rounded-lg">
      
      <Card className="bg-purple-800 border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Step 5: Photos & Final Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Image Upload Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Hotel Images *</h4>
            <p className="text-purple-200 text-sm">Upload at least one image of your property to complete the listing</p>
            
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="hotel-images-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-600 border-dashed rounded-lg cursor-pointer bg-purple-800/50 hover:bg-purple-700/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-white" />
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input 
                  id="hotel-images-upload" 
                  type="file" 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                  onChange={handleFileUpload} 
                />
              </Label>
            </div>

            {/* Display uploaded images */}
            {formData.hotelImages && formData.hotelImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.hotelImages.map((imageUrl: string, index: number) => (
                  <div key={index} className="relative group">
                    <img src={imageUrl} alt={`Hotel Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <Button
                      onClick={() => handleRemoveImage(imageUrl)}
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {uploading && (
              <div className="text-center text-purple-200">
                Uploading images...
              </div>
            )}

            {(!formData.hotelImages || formData.hotelImages.length === 0) && (
              <div className="text-center text-red-300 bg-red-900/20 p-3 rounded border border-red-600">
                ⚠️ At least one image is required to complete your listing
              </div>
            )}
          </div>
          
          {/* Property Summary */}
          <div className="p-4 border border-purple-500 rounded-lg bg-purple-700/30">
            <h4 className="font-semibold mb-4 text-white">Property Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-purple-100">
                <p><strong className="text-white">Property Name:</strong> {formData.hotelName || 'Not specified'}</p>
                <p><strong className="text-white">Location:</strong> {formData.city}, {formData.country}</p>
                <p><strong className="text-white">Property Type:</strong> {formData.propertyType || 'Not specified'}</p>
                <p><strong className="text-white">Images:</strong> {(formData.hotelImages || []).length} uploaded</p>
              </div>
              <div className="text-purple-100">
                <p><strong className="text-white">Affinities:</strong> {(formData.selectedAffinities || []).length} selected</p>
                <p><strong className="text-white">Activities:</strong> {(formData.selectedActivities || []).length} selected</p>
                <p><strong className="text-white">Stay Durations:</strong> {(formData.selectedStayDurations || []).join(', ')} days</p>
                <p><strong className="text-white">Meal Plans:</strong> {(formData.mealPlans || []).length} selected</p>
                <p><strong className="text-white">Availability Packages:</strong> {(formData.availabilityPackages || []).length} created</p>
              </div>
            </div>
            
            {formData.description && (
              <div className="mt-4">
                <p className="text-purple-100"><strong className="text-white">Atmosphere:</strong> {formData.description}</p>
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          {formData.durationPricing && Object.keys(formData.durationPricing).length > 0 && (
            <div className="p-4 border border-purple-500 rounded-lg bg-purple-700/30">
              <h4 className="font-semibold mb-4 text-white">Pricing Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.durationPricing).map(([duration, pricing]: [string, any]) => (
                  <div key={duration} className="p-3 bg-purple-600/30 rounded border border-purple-400">
                    <p className="font-medium text-white">{duration} Days</p>
                    {pricing.double > 0 && <p className="text-sm text-purple-200">Double: €{pricing.double}</p>}
                    {pricing.single > 0 && <p className="text-sm text-purple-200">Single: €{pricing.single}</p>}
                  </div>
                ))}
              </div>
              
              {formData.enablePriceIncrease && (
                <p className="mt-3 text-sm text-purple-200">
                  Dynamic pricing enabled with {formData.priceIncreaseCap}% maximum increase
                </p>
              )}
            </div>
          )}

          {/* Availability Summary */}
          {(formData.availabilityPackages || []).length > 0 && (
            <div className="p-4 border border-purple-500 rounded-lg bg-purple-700/30">
              <h4 className="font-semibold mb-4 text-white">Availability Packages</h4>
              <div className="space-y-2">
                {formData.availabilityPackages.map((pkg: any, index: number) => (
                  <div key={pkg.id} className="p-3 bg-purple-600/30 rounded border border-purple-400">
                    <p className="font-medium text-white">{pkg.numberOfRooms} room(s) available</p>
                    <p className="text-sm text-purple-200">
                      {pkg.startDate} to {pkg.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Terms and Conditions</h4>
            
            <div className="p-4 border border-purple-500 rounded-lg bg-purple-700/30 max-h-96 overflow-y-auto text-sm text-purple-100">
              <h5 className="font-semibold mb-3 text-white">Platform Terms of Service</h5>
              <div className="space-y-2">
                <p>By submitting this property listing, you acknowledge and agree to the following:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All information provided is accurate and truthful</li>
                  <li>You have the legal authority to list this property</li>
                  <li>You agree to our commission structure and payment terms</li>
                  <li>You will maintain the property standards described</li>
                  <li>You will honor all confirmed bookings at the listed rates</li>
                  <li>You understand that false information may result in delisting</li>
                  <li>You agree to our cancellation and refund policies</li>
                  <li>You will provide 24/7 emergency contact information</li>
                  <li>Property photos must be current and accurate representations</li>
                  <li>You agree to respond to booking inquiries within 24 hours</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted || false}
                onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                className="mt-1 border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="termsAccepted" className="text-sm cursor-pointer text-white">
                I have read and agree to the terms and conditions outlined above. *
              </Label>
            </div>
          </div>

          {/* Submission Notice */}
          <div className="p-4 border border-purple-500 rounded-lg bg-purple-700/30">
            <h4 className="font-semibold mb-2 text-white">What happens next?</h4>
            <div className="text-sm text-purple-200 space-y-1">
              <p>1. Your property submission will be reviewed by our team</p>
              <p>2. We may contact you for additional information if needed</p>
              <p>3. You'll receive an email notification about the approval status</p>
              <p>4. Once approved, your property will be live on the platform</p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
