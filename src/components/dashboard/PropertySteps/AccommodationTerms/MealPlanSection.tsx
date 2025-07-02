
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
  const mealOptions = [
    { value: "breakfast", label: "Breakfast Included" },
    { value: "half-board", label: "Half Board" },
    { value: "full-board", label: "Full Board" },
    { value: "all-inclusive", label: "All Inclusive" }
  ];

  const handleMealPlanSelect = (plan: string) => {
    if (updateFormData) {
      updateFormData('selectedMealPlan', plan);
    }
  };

  const handleLaundryIncludedChange = (included: boolean) => {
    if (updateFormData) {
      updateFormData('laundryIncluded', included);
      if (included) {
        // If laundry is included, reset external laundry service
        updateFormData('externalLaundryAvailable', null);
      }
    }
  };

  const handleExternalLaundryChange = (available: boolean) => {
    if (updateFormData) {
      updateFormData('externalLaundryAvailable', available);
    }
  };

  const selectedMealPlan = formData?.selectedMealPlan;
  const laundryIncluded = formData?.laundryIncluded;
  const externalLaundryAvailable = formData?.externalLaundryAvailable;

  // Validation logic: Valid if meal plan selected and laundry question answered
  React.useEffect(() => {
    const isValid = !!selectedMealPlan && (laundryIncluded !== undefined);
    onValidationChange?.(isValid);
  }, [selectedMealPlan, laundryIncluded, onValidationChange]);

  return (
    <Accordion type="single" collapsible value={isOpen ? "meal-plan" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="meal-plan" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.2— MEAL PLANS</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <div>
              <p className="text-gray-300 mb-4">Select the meal plan for your property:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mealOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedMealPlan === option.value ? "default" : "outline"}
                    onClick={() => handleMealPlanSelect(option.value)}
                    className="h-12"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Laundry Service Section */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-300 mb-3">Laundry service included?</p>
                <div className="flex gap-3">
                  <Button
                    variant={laundryIncluded === true ? "default" : "outline"}
                    onClick={() => handleLaundryIncludedChange(true)}
                    className="flex-1"
                  >
                    ✅ Yes
                  </Button>
                  <Button
                    variant={laundryIncluded === false ? "default" : "outline"}
                    onClick={() => handleLaundryIncludedChange(false)}
                    className="flex-1"
                  >
                    ❌ No
                  </Button>
                </div>
              </div>

              {laundryIncluded === false && (
                <div>
                  <p className="text-gray-300 mb-3">Is external laundry service available (not included)?</p>
                  <div className="flex gap-3">
                    <Button
                      variant={externalLaundryAvailable === true ? "default" : "outline"}
                      onClick={() => handleExternalLaundryChange(true)}
                      className="flex-1"
                    >
                      ✅ Yes
                    </Button>
                    <Button
                      variant={externalLaundryAvailable === false ? "default" : "outline"}
                      onClick={() => handleExternalLaundryChange(false)}
                      className="flex-1"
                    >
                      ❌ No
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MealPlanSection;
