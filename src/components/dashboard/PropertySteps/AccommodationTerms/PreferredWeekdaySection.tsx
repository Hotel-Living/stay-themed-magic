
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { weekdays } from "@/utils/constants";

interface PreferredWeekdayProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function PreferredWeekdaySection({ formData = {}, updateFormData = () => {} }: PreferredWeekdayProps) {
  const [selectedDay, setSelectedDay] = useState(formData.preferredCheckInDay || 'Monday');
  
  // Update form data when selected day changes
  useEffect(() => {
    updateFormData('preferredCheckInDay', selectedDay);
  }, [selectedDay, updateFormData]);
  
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };
  
  return (
    <Collapsible className="w-full bg-fuchsia-900/10 rounded-lg">
      <div className="px-4 py-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-sm font-medium uppercase">Preferred Check-In/Out Day</h2>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="px-4 pb-4">
        <div className="space-y-2">
          <p className="text-sm text-foreground/70">
            Select the preferred check-in/out day for your guests:
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {weekdays.map((day) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedDay === day
                    ? 'bg-fuchsia-600 text-white'
                    : 'bg-fuchsia-800/20 text-foreground/80 hover:bg-fuchsia-800/30'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
