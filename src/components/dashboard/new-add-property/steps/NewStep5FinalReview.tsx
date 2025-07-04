
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
  
  // Debug: Log all formData to identify what's actually stored
  useEffect(() => {
    console.log('🔍 STEP 5 DEBUG - Full formData:', formData);
    console.log('🔍 Images data:', formData.hotelImages);
    console.log('🔍 Themes data:', formData.themes);
    console.log('🔍 Activities data:', formData.activities);
    console.log('🔍 Stay durations:', formData.selectedStayDurations);
    console.log('🔍 Meal plans:', formData.mealPlans);
    console.log('🔍 Availability packages:', formData.availabilityPackages);
  }, [formData]);
  
  // Validation - only requires terms acceptance
  useEffect(() => {
    const isValid = formData.termsAccepted === true;
    console.log('✅ Step 5 validation:', isValid);
    onValidationChange(isValid);
  }, [formData.termsAccepted, onValidationChange]);

  return (
    <div className="space-y-6 bg-purple-900 text-white p-6 rounded-lg">
      
      <Card className="bg-purple-800 border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Step 5: Final Review & Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
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
                <p><strong className="text-white">Themes:</strong> {(formData.themes || []).length} selected</p>
                <p><strong className="text-white">Activities:</strong> {(formData.activities || []).length} selected</p>
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
