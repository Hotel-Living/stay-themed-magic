
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RoomTypesSection } from "../components/RoomTypesSection";
import { useToast } from "@/hooks/use-toast";

interface NewStep3AccommodationTermsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep3AccommodationTerms: React.FC<NewStep3AccommodationTermsProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { toast } = useToast();
  const [isValid, setIsValid] = useState(false);

  // Validate the form
  const validateForm = () => {
    const hasStayLengths = formData.stayLengths && formData.stayLengths.length > 0;
    const hasMealPlan = formData.mealPlan && formData.mealPlan.trim() !== '';
    const hasLaundryInfo = formData.laundryAvailable !== undefined;
    const hasCheckInOut = formData.checkInTime && formData.checkOutTime;
    const hasRoomTypes = formData.roomTypes && formData.roomTypes.length > 0;
    
    const valid = hasStayLengths && hasMealPlan && hasLaundryInfo && hasCheckInOut && hasRoomTypes;
    setIsValid(valid);
    onValidationChange(valid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleStayLengthChange = (length: number, checked: boolean) => {
    const currentLengths = formData.stayLengths || [];
    const updatedLengths = checked 
      ? [...currentLengths, length]
      : currentLengths.filter((l: number) => l !== length);
    
    updateFormData('stayLengths', updatedLengths);
  };

  const handleMealPlanChange = (value: string) => {
    updateFormData('mealPlan', value);
  };

  const handleLaundryChange = (available: boolean) => {
    updateFormData('laundryAvailable', available);
  };

  const handleTimeChange = (field: string, value: string) => {
    updateFormData(field, value);
  };

  const handleRoomTypeValidation = (valid: boolean) => {
    // This will be called by RoomTypesSection when validation changes
    // The main validation will be handled in validateForm
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#7a0486] border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Accommodation Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stay Lengths */}
          <div className="space-y-4">
            <Label className="text-white text-lg font-semibold">Length of Stay Options</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[7, 14, 21, 28, 30, 60, 90, 365].map((length) => (
                <div key={length} className="flex items-center space-x-2">
                  <Checkbox
                    id={`stay-${length}`}
                    checked={formData.stayLengths?.includes(length) || false}
                    onCheckedChange={(checked) => handleStayLengthChange(length, checked as boolean)}
                  />
                  <Label htmlFor={`stay-${length}`} className="text-white">
                    {length} {length === 1 ? 'day' : 'days'}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Meal Plan - Single Selection */}
          <div className="space-y-4">
            <Label className="text-white text-lg font-semibold">Meal Plan</Label>
            <RadioGroup
              value={formData.mealPlan || ""}
              onValueChange={handleMealPlanChange}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="breakfast" id="breakfast" />
                <Label htmlFor="breakfast" className="text-white">Breakfast Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="half-board" id="half-board" />
                <Label htmlFor="half-board" className="text-white">Half Board</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-board" id="full-board" />
                <Label htmlFor="full-board" className="text-white">Full Board</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all-inclusive" id="all-inclusive" />
                <Label htmlFor="all-inclusive" className="text-white">All Inclusive</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Laundry Service */}
          <div className="space-y-4">
            <Label className="text-white text-lg font-semibold">Laundry Service</Label>
            <RadioGroup
              value={formData.laundryAvailable?.toString() || ""}
              onValueChange={(value) => handleLaundryChange(value === "true")}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="laundry-yes" />
                <Label htmlFor="laundry-yes" className="text-white">Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="laundry-no" />
                <Label htmlFor="laundry-no" className="text-white">Not Available</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Check-in/Check-out Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkin" className="text-white">Check-in Time</Label>
              <Input
                id="checkin"
                type="time"
                value={formData.checkInTime || ""}
                onChange={(e) => handleTimeChange('checkInTime', e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout" className="text-white">Check-out Time</Label>
              <Input
                id="checkout"
                type="time"
                value={formData.checkOutTime || ""}
                onChange={(e) => handleTimeChange('checkOutTime', e.target.value)}
                className="bg-purple-800/50 border-purple-600 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Types Section */}
      <RoomTypesSection
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={handleRoomTypeValidation}
      />
    </div>
  );
};
