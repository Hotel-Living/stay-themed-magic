
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MealPlanSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const MealPlanSection: React.FC<MealPlanSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  onValidationChange
}) => {
  const mealPlans = [
    { value: "no-meals", label: "No meals" },
    { value: "breakfast", label: "Breakfast included" },
    { value: "half-board", label: "Half board" },
    { value: "full-board", label: "Full board" },
    { value: "all-inclusive", label: "All inclusive" }
  ];

  const handleMealPlanChange = (value: string) => {
    if (updateFormData) {
      updateFormData('selectedMealPlan', value);
    }
  };

  const handleAllInclusiveDescriptionChange = (value: string) => {
    if (updateFormData) {
      updateFormData('allInclusiveDescription', value);
    }
  };

  const handleLaundryIncludedChange = (value: string) => {
    const isIncluded = value === 'yes';
    if (updateFormData) {
      updateFormData('laundryIncluded', isIncluded);
      if (isIncluded) {
        updateFormData('externalLaundryAvailable', false);
      }
    }
  };

  const handleExternalLaundryChange = (value: string) => {
    if (updateFormData) {
      updateFormData('externalLaundryAvailable', value === 'yes');
    }
  };

  const selectedMealPlan = formData?.selectedMealPlan || '';
  const laundryIncluded = formData?.laundryIncluded;
  const isLaundryDisabled = laundryIncluded === true;

  // Validation logic: Valid if meal plan selected and laundry options set
  React.useEffect(() => {
    const isValid = !!(selectedMealPlan && laundryIncluded !== undefined);
    onValidationChange?.(isValid);
  }, [selectedMealPlan, laundryIncluded, onValidationChange]);

  return (
    <Accordion type="single" collapsible value={isOpen ? "meal-plans" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="meal-plans" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.2— MEAL PLANS</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <div>
              <p className="text-gray-300 mb-4">Select one meal plan option:</p>
              <RadioGroup value={selectedMealPlan} onValueChange={handleMealPlanChange}>
                {mealPlans.map((plan) => (
                  <div key={plan.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={plan.value} 
                      id={plan.value}
                      className="border-fuchsia-500 text-fuchsia-500"
                    />
                    <Label htmlFor={plan.value} className="text-white cursor-pointer">
                      {plan.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {selectedMealPlan === 'all-inclusive' && (
              <div>
                <Label htmlFor="all-inclusive-description" className="text-white">
                  All Inclusive Description
                </Label>
                <Input
                  id="all-inclusive-description"
                  value={formData?.allInclusiveDescription || ''}
                  onChange={(e) => handleAllInclusiveDescriptionChange(e.target.value)}
                  placeholder="Describe what's included in your all-inclusive plan..."
                  className="bg-fuchsia-950/50 border-fuchsia-800/30 text-white placeholder-gray-400 mt-2"
                />
              </div>
            )}

            <div className="border-t border-fuchsia-800/30 pt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-3 block">Laundry included?</Label>
                  <RadioGroup 
                    value={laundryIncluded === true ? 'yes' : laundryIncluded === false ? 'no' : ''} 
                    onValueChange={handleLaundryIncludedChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="laundry-yes" className="border-fuchsia-500 text-fuchsia-500" />
                      <Label htmlFor="laundry-yes" className="text-white cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="laundry-no" className="border-fuchsia-500 text-fuchsia-500" />
                      <Label htmlFor="laundry-no" className="text-white cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {laundryIncluded === false && (
                  <div>
                    <Label className="text-white mb-3 block">External laundry service available?</Label>
                    <RadioGroup 
                      value={formData?.externalLaundryAvailable === true ? 'yes' : formData?.externalLaundryAvailable === false ? 'no' : ''} 
                      onValueChange={handleExternalLaundryChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="external-yes" className="border-fuchsia-500 text-fuchsia-500" />
                        <Label htmlFor="external-yes" className="text-white cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="external-no" className="border-fuchsia-500 text-fuchsia-500" />
                        <Label htmlFor="external-no" className="text-white cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MealPlanSection;
