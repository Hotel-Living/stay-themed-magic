
import React, { useState, useEffect } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StayLengthMealsSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStayLengthValidChange: (isValid: boolean) => void;
  onMealPlanValidChange: (isValid: boolean) => void;
  initialStayLengths?: number[];
  initialMealPlans?: string[];
}

export default function StayLengthMealsSection({ 
  isOpen, 
  onOpenChange,
  onStayLengthValidChange,
  onMealPlanValidChange,
  initialStayLengths = [],
  initialMealPlans = []
}: StayLengthMealsSectionProps) {
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(initialStayLengths);
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(initialMealPlans);

  // Available stay lengths
  const stayLengths = [1, 2, 3, 7, 14, 30, 60, 90, 120, 180, 365];
  
  // Available meal plan options
  const mealPlans = [
    { id: "room-only", label: "Room Only (No Meals)" },
    { id: "breakfast", label: "Breakfast Included" },
    { id: "half-board", label: "Half Board (Breakfast + Dinner)" },
    { id: "full-board", label: "Full Board (All Meals)" },
    { id: "all-inclusive", label: "All Inclusive (All Meals + Drinks)" }
  ];

  // Validate stay lengths and meal plans
  useEffect(() => {
    onStayLengthValidChange(selectedStayLengths.length > 0);
  }, [selectedStayLengths, onStayLengthValidChange]);

  useEffect(() => {
    onMealPlanValidChange(selectedMealPlans.length > 0);
  }, [selectedMealPlans, onMealPlanValidChange]);

  // Toggle stay length selection
  const toggleStayLength = (length: number) => {
    setSelectedStayLengths(prev => 
      prev.includes(length) 
        ? prev.filter(l => l !== length) 
        : [...prev, length].sort((a, b) => a - b)
    );
  };

  // Toggle meal plan selection
  const toggleMealPlan = (id: string) => {
    setSelectedMealPlans(prev => 
      prev.includes(id) 
        ? prev.filter(plan => plan !== id) 
        : [...prev, id]
    );
  };

  return (
    <AccordionItem 
      value="stay-length-meals" 
      className="border rounded-xl overflow-hidden bg-fuchsia-900/10"
    >
      <AccordionTrigger 
        onClick={() => onOpenChange(!isOpen)} 
        className={`px-4 py-3 ${isOpen ? "bg-fuchsia-800/20" : ""}`}
      >
        <h3 className="text-lg capitalize">Stay Length & Meal Options</h3>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          {/* Stay Length Selection */}
          <div>
            <h4 className="text-sm font-medium mb-3 uppercase">Stay Length Options</h4>
            <p className="text-sm mb-3">Select all the stay lengths you want to offer:</p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {stayLengths.map(length => (
                <button
                  key={length}
                  onClick={() => toggleStayLength(length)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedStayLengths.includes(length)
                      ? "bg-fuchsia-600 text-white"
                      : "bg-fuchsia-900/20 hover:bg-fuchsia-800/30 text-white"
                  }`}
                >
                  {length} {length === 1 ? "day" : "days"}
                </button>
              ))}
            </div>
            
            {selectedStayLengths.length === 0 && (
              <p className="text-sm text-red-400 mt-1">Please select at least one stay length option</p>
            )}
          </div>
          
          {/* Meal Plans */}
          <div>
            <h4 className="text-sm font-medium mb-3 uppercase">Meal Plans</h4>
            <p className="text-sm mb-3">Select all meal plans that you offer:</p>
            
            <ScrollArea className="h-48 rounded-md border border-fuchsia-950/30 bg-fuchsia-950/20 p-2">
              <div className="space-y-3">
                {mealPlans.map(plan => (
                  <div key={plan.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`meal-${plan.id}`} 
                      checked={selectedMealPlans.includes(plan.id)}
                      onCheckedChange={() => toggleMealPlan(plan.id)}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor={`meal-${plan.id}`}
                      className="font-normal leading-tight"
                    >
                      {plan.label}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {selectedMealPlans.length === 0 && (
              <p className="text-sm text-red-400 mt-1">Please select at least one meal plan</p>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
