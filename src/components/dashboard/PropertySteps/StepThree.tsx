import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LengthOfStaySection from "./rooms/LengthOfStaySection";
import MealPlanSection from "./rooms/MealPlanSection";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";
import CheckInOutSection from "./rooms/CheckInOutSection";
import PreferredWeekdaySection from "./rooms/PreferredWeekdaySection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [isStayMealsOpen, setIsStayMealsOpen] = useState(true);
  const [isRoomsRatesOpen, setIsRoomsRatesOpen] = useState(false);
  const [isStayLengthMealsOpen, setIsStayLengthMealsOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

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

  // Show validation errors only when user tries to navigate away
  const handleNextStep = () => {
    setShowErrors(true);
  };
  return <div className="space-y-6">
      {/* Main title is now "ACCOMMODATION TERMS" */}
      <h2 className="text-xl font-bold mb-4">ACCOMMODATION TERMS</h2>
      
      {/* LENGTH OF STAY – MEALS & SERVICES as a nested collapsible */}
      <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" open={isStayLengthMealsOpen} onOpenChange={setIsStayLengthMealsOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-fuchsia-800/20 py-[4px]">
          <h2 className="font-medium text-base">LENGTH OF STAY – MEALS & SERVICES</h2>
          {isStayLengthMealsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-6">
            <LengthOfStaySection onValidationChange={isValid => {
            setStayLengthValid(isValid);
            checkValidation();
          }} showHeader={true} />
            
            <MealPlanSection onValidationChange={isValid => {
            setMealPlanValid(isValid);
            checkValidation();
          }} showHeader={true} />
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Room Types Section with updated title - Full width */}
      <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10" open={isRoomsRatesOpen} onOpenChange={setIsRoomsRatesOpen}>
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-fuchsia-800/20 py-[4px]">
          <h2 className="font-medium text-base">ROOMS & RATES</h2>
          {isRoomsRatesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <RoomTypeSection onValidationChange={isValid => {
          checkValidation();
        }} title="ROOMS & RATES" fullWidth={true} showHeader={false} />
        </CollapsibleContent>
      </Collapsible>
      
      {/* Preferred Weekday Section - Moved to be after Room Types with consistent styling */}
      <Collapsible className="w-full mb-6 border rounded-lg overflow-hidden bg-fuchsia-900/10">
        <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-fuchsia-800/20 py-[4px]">
          <h2 className="font-medium text-base">PREFERRED WEEKDAY FOR ALL CHECK-INS / OUTS</h2>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="grid grid-cols-7 gap-2 mt-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => <label key={day} className="flex flex-col items-center">
                <input type="radio" name="preferred-weekday" className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mb-1" />
                <span className="text-xs text-center">{day}</span>
              </label>)}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Validation Messages - Only shown when errors exist and showErrors is true */}
      {error && showErrors && <div className="p-3 rounded-md text-red-200 flex items-center gap-2 bg-[#540ea9]/20">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>}
      
      {mealPlans.length > 0 && stayLengthValid && !error && <div className="p-3 rounded-md bg-green-500/20 text-green-200 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>All required information has been provided</span>
        </div>}
    </div>;
}