
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
  
  // Validation - only requires terms acceptance
  useEffect(() => {
    const isValid = formData.termsAccepted === true;
    console.log('✅ Step 5 validation:', isValid);
    onValidationChange(isValid);
  }, [formData.termsAccepted, onValidationChange]);

  return (
    <div className="space-y-6">
      
      <Card>
        <CardHeader>
          <CardTitle>Step 5: Final Review & Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Property Summary */}
          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-semibold mb-4">Property Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Property Name:</strong> {formData.hotelName || 'Not specified'}</p>
                <p><strong>Location:</strong> {formData.city}, {formData.country}</p>
                <p><strong>Property Type:</strong> {formData.propertyType || 'Not specified'}</p>
                <p><strong>Images:</strong> {(formData.hotelImages || []).length} uploaded</p>
              </div>
              <div>
                <p><strong>Themes:</strong> {(formData.themes || []).length} selected</p>
                <p><strong>Activities:</strong> {(formData.activities || []).length} selected</p>
                <p><strong>Stay Durations:</strong> {(formData.selectedStayDurations || []).join(', ')} days</p>
                <p><strong>Meal Plans:</strong> {(formData.mealPlans || []).length} selected</p>
              </div>
            </div>
            
            {formData.atmosphere && (
              <div className="mt-4">
                <p><strong>Atmosphere:</strong> The atmosphere is {formData.atmosphere}</p>
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          {formData.durationPricing && Object.keys(formData.durationPricing).length > 0 && (
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-semibold mb-4">Pricing Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.durationPricing).map(([duration, pricing]: [string, any]) => (
                  <div key={duration} className="p-3 bg-white rounded border">
                    <p className="font-medium">{duration} Days</p>
                    {pricing.double > 0 && <p className="text-sm">Double: €{pricing.double}</p>}
                    {pricing.single > 0 && <p className="text-sm">Single: €{pricing.single}</p>}
                  </div>
                ))}
              </div>
              
              {formData.enablePriceIncrease && (
                <p className="mt-3 text-sm text-gray-600">
                  Dynamic pricing enabled with {formData.priceIncreaseCap}% maximum increase
                </p>
              )}
            </div>
          )}

          {/* Availability Summary */}
          {(formData.availabilityPackages || []).length > 0 && (
            <div className="p-4 border rounded-lg bg-purple-50">
              <h4 className="font-semibold mb-4">Availability Packages</h4>
              <div className="space-y-2">
                {formData.availabilityPackages.map((pkg: any, index: number) => (
                  <div key={pkg.id} className="p-3 bg-white rounded border">
                    <p className="font-medium">{pkg.numberOfRooms} room(s) available</p>
                    <p className="text-sm text-gray-600">
                      {pkg.startDate} to {pkg.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="terms">Property Terms & Conditions</Label>
              <Textarea
                id="terms"
                value={formData.terms || ''}
                onChange={(e) => updateFormData('terms', e.target.value)}
                placeholder="Enter your property's terms and conditions, cancellation policy, house rules, etc."
                rows={6}
              />
            </div>

            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted || false}
                  onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                />
                <div className="space-y-2">
                  <Label htmlFor="termsAccepted" className="font-medium">
                    I accept the terms and conditions *
                  </Label>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>By checking this box, I confirm that:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>All information provided is accurate and complete</li>
                      <li>I have the authority to list this property</li>
                      <li>I agree to the platform's terms of service</li>
                      <li>I understand that the property will be reviewed before approval</li>
                      <li>I acknowledge that false information may result in rejection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Notice */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <div className="text-sm text-gray-600 space-y-1">
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
