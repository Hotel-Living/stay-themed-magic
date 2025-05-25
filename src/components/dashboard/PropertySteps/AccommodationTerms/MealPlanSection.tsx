
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealPlanSectionProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function MealPlanSection({
  isOpen = false,
  onOpenChange = () => {},
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: MealPlanSectionProps) {
  const [openState, setOpenState] = useState(isOpen);
  const [selectedPlans, setSelectedPlans] = useState<string[]>(
    formData.mealPlans?.length ? formData.mealPlans : []
  );
  const { toast } = useToast();
  
  // Updated meal plan options - removed "Self Catering", replaced with "Laundry", and added "External Laundry Service Available"
  const mealPlanOptions = [
    { id: "breakfast", label: "Breakfast" },
    { id: "half-board", label: "Half Board (Breakfast + Dinner)" },
    { id: "full-board", label: "Full Board (All Meals)" },
    { id: "all-inclusive", label: "All Inclusive" },
    { id: "laundry", label: "Laundry" },
    { id: "external-laundry", label: "External Laundry Service Available" }
  ];

  // Update local state when formData changes
  useEffect(() => {
    if (formData.mealPlans && formData.mealPlans.length > 0) {
      console.log("MealPlanSection: Received meal plans:", formData.mealPlans);
      setSelectedPlans(formData.mealPlans);
    }
  }, [formData.mealPlans]);

  // Handle validation and update parent form data when selected meal plans change
  useEffect(() => {
    const isValid = selectedPlans.length > 0;
    onValidationChange(isValid);
    
    // Update parent form data
    updateFormData("mealPlans", selectedPlans);
  }, [selectedPlans, onValidationChange, updateFormData]);

  const handleToggle = () => {
    setOpenState(!openState);
    onOpenChange();
  };
  
  const toggleMealPlan = (planId: string) => {
    setSelectedPlans(prev => {
      const isSelected = prev.includes(planId);
      
      if (isSelected) {
        // Don't allow removing the last option
        if (prev.length <= 1) {
          toast({
            title: "Error",
            description: "Cannot remove all options - You must select at least one meal plan.",
            variant: "destructive"
          });
          return prev;
        }
        
        return prev.filter(item => item !== planId);
      } else {
        return [...prev, planId];
      }
    });
  };

  return (
    <div className="border border-purple-500/30 rounded-lg overflow-hidden">
      <button 
        className="w-full p-4 flex items-center justify-between bg-[#430453] hover:bg-[#4f0564] transition"
        onClick={handleToggle}
      >
        <span className="text-lg font-medium">Meals</span>
        {openState ? <ChevronUp /> : <ChevronDown />}
      </button>
      
      {openState && (
        <div className="p-4 bg-[#350442] space-y-4">
          <p className="text-sm text-gray-300">
            Select which meal plans your hotel offers to guests.
          </p>
          
          <div className="p-4 rounded-md bg-[#420451]">
            <h3 className="text-sm font-bold mb-4 uppercase">AVAILABLE MEAL PLANS</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {mealPlanOptions.map(plan => (
                <div 
                  key={plan.id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`meal-plan-${plan.id}`}
                    checked={selectedPlans.includes(plan.id)}
                    onChange={() => toggleMealPlan(plan.id)}
                    className="w-5 h-5 accent-fuchsia-500"
                  />
                  <label htmlFor={`meal-plan-${plan.id}`} className="text-white">
                    {plan.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {selectedPlans.length === 0 && (
            <div className="p-3 bg-red-900/30 text-red-200 rounded-md">
              Please select at least one meal plan option.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
