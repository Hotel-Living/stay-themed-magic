
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/RoomTypeSection";
import CheckInOutSection from "./rooms/CheckInOutSection";
import PreferredWeekdaySection from "./rooms/PreferredWeekdaySection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface StepThreeProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepThree({
  onValidationChange = () => {}
}: StepThreeProps) {
  const [mealPlans, setMealPlans] = useState<string[]>([]);
  const [stayLengthValid, setStayLengthValid] = useState(false);
  const [mealPlanValid, setMealPlanValid] = useState(false);
  const [error, setError] = useState<string>("");
  
  // Check if all required fields are completed
  const checkValidation = () => {
    if (mealPlans.length === 0) {
      setError("Please select at least one meal plan");
      onValidationChange(false);
      return false;
    }
    
    if (!stayLengthValid) {
      setError("Please select at least one stay length");
      onValidationChange(false);
      return false;
    }
    
    setError("");
    onValidationChange(true);
    return true;
  };

  // Handle meal plan selection
  const handleMealPlanChange = (value: string) => {
    if (!mealPlans.includes(value)) {
      setMealPlans([value]);
    }

    // Check validation after change
    setTimeout(checkValidation, 100);
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [mealPlans, stayLengthValid, mealPlanValid]);
  
  return (
    <div className="space-y-6">
      {/* Main section with LENGTH OF STAY and MEALS & SERVICES as accordion */}
      <div className="mb-6">
        <h2 className="font-medium text-lg mb-4">LENGTH OF STAY – MEALS & SERVICES</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="length-of-stay">
            <AccordionTrigger className="py-2 px-4 bg-fuchsia-900/20 rounded-t-lg">
              <span className="text-sm font-medium uppercase">LENGTH OF STAY</span>
            </AccordionTrigger>
            <AccordionContent className="bg-fuchsia-900/10 p-4 rounded-b-lg">
              <LengthOfStaySection 
                onValidationChange={(isValid) => {
                  setStayLengthValid(isValid);
                  checkValidation();
                }} 
                showHeader={false}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="meals" className="mt-2">
            <AccordionTrigger className="py-2 px-4 bg-fuchsia-900/20 rounded-t-lg">
              <span className="text-sm font-medium uppercase">MEALS & SERVICES</span>
            </AccordionTrigger>
            <AccordionContent className="bg-fuchsia-900/10 p-4 rounded-b-lg">
              <MealPlanSection 
                onValidationChange={(isValid) => {
                  setMealPlanValid(isValid);
                  checkValidation();
                }}
                showHeader={false}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Room Types Section with updated title - Full width */}
      <div className="mb-6">
        <RoomTypeSection 
          onValidationChange={(isValid) => {
            checkValidation();
          }}
          title="ROOMS & RATES"
          fullWidth={true}
        />
      </div>
      
      {/* Preferred Weekday Section - Moved to be after Room Types */}
      <div className="mb-6">
        <PreferredWeekdaySection />
      </div>
      
      {/* Check In/Out Section - After Preferred Weekday */}
      <div className="mb-6">
        <CheckInOutSection />
      </div>
      
      {/* Validation Messages */}
      {error && 
        <div className="p-3 rounded-md text-red-200 flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      }
      
      {mealPlans.length > 0 && stayLengthValid && !error && 
        <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>
      }
    </div>
  );
}
