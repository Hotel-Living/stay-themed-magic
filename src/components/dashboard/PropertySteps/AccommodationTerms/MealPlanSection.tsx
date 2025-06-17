
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

interface MealPlanSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const MealPlanSection: React.FC<MealPlanSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  
  const mealPlans = [
    { value: "breakfast", label: "Breakfast Included" },
    { value: "half-board", label: "Half Board" },
    { value: "full-board", label: "Full Board" },
    { value: "all-inclusive", label: "All Inclusive" }
  ];

  const handleMealPlanToggle = (planValue: string) => {
    const currentPlans = formData?.mealPlans || [];
    const newPlans = currentPlans.includes(planValue)
      ? currentPlans.filter((plan: string) => plan !== planValue)
      : [...currentPlans, planValue];
    
    if (updateFormData) {
      updateFormData('mealPlans', newPlans);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "meal-plans" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="meal-plans" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.4— MEAL PLANS</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mealPlans.map((plan) => (
                <div key={plan.value} className="text-center">
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      formData?.mealPlans?.includes(plan.value)
                        ? 'border-fuchsia-500 bg-fuchsia-500/20'
                        : 'border-fuchsia-800/30 hover:border-fuchsia-500/50'
                    }`}
                    onClick={() => handleMealPlanToggle(plan.value)}
                  >
                    <h4 className="font-medium text-white">{plan.label}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-fuchsia-950/30 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-white mb-2">Laundry</h5>
                  <p className="text-sm text-gray-300">External Laundry Service Available</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MealPlanSection;
