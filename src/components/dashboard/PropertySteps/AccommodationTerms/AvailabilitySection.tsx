
import React from "react";
import { Label } from "@/components/ui/label";
import { format, addMonths } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import AvailabilityDateSection from "../rooms/roomTypes/AvailabilityDateSection";
import { useAvailabilityDates } from "./hooks/useAvailabilityDates";

interface AvailabilitySectionProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function AvailabilitySection({
  formData,
  updateFormData,
  onValidationChange
}: AvailabilitySectionProps) {
  const [expandedMonths, setExpandedMonths] = React.useState<Record<string, boolean>>({});
  
  const {
    selectedMonths,
    handleMonthToggle
  } = useAvailabilityDates(formData?.available_months || [], updateFormData);

  // Get the preferred weekday from formData, default to Monday if not set
  const preferredWeekday = formData?.preferredWeekday || "Monday";

  // Handle availability changes
  const handleAvailabilityChange = (dates: string[]) => {
    console.log("AvailabilitySection - handling availability change:", dates);
    
    if (updateFormData) {
      updateFormData('availableDates', dates);

      // Also update the available_months field for backward compatibility
      const months = dates.map(date => {
        try {
          const monthName = format(new Date(date), 'MMMM').toLowerCase();
          return monthName;
        } catch (e) {
          return '';
        }
      }).filter(Boolean);

      // Remove duplicates
      const uniqueMonths = [...new Set(months)];
      updateFormData('available_months', uniqueMonths);
      
      console.log("AvailabilitySection - updated available_months:", uniqueMonths);
    }
  };

  // Notify parent component about validation state
  React.useEffect(() => {
    const hasSelectedDates = (formData?.availableDates?.length > 0) || (formData?.available_months?.length > 0);
    if (onValidationChange) {
      onValidationChange(hasSelectedDates);
    }
  }, [formData?.availableDates, formData?.available_months, onValidationChange]);

  // Initialize selected dates from saved data
  const initialSelectedDates = React.useMemo(() => {
    const dates = [];
    
    // Add dates from availableDates if present
    if (formData?.availableDates && Array.isArray(formData.availableDates)) {
      dates.push(...formData.availableDates);
    }
    
    // Add dates from available_months if present (for backward compatibility)
    if (formData?.available_months && Array.isArray(formData.available_months)) {
      formData.available_months.forEach(month => {
        if (month) {
          // Create a representative date for the month
          const currentYear = new Date().getFullYear();
          const monthIndex = new Date(`${month} 1, ${currentYear}`).getMonth();
          const firstDay = new Date(currentYear, monthIndex, 1);
          dates.push(format(firstDay, 'yyyy-MM-dd'));
        }
      });
    }
    
    console.log("AvailabilitySection - initialized selected dates:", dates);
    return dates;
  }, [formData?.availableDates, formData?.available_months]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className="bg-fuchsia-950/50 border border-white/10 rounded-lg p-4 text-white">
          {/* Pass all required props to AvailabilityDateSection */}
          <AvailabilityDateSection 
            preferredWeekday={preferredWeekday} 
            onAvailabilityChange={handleAvailabilityChange} 
            selectedDates={initialSelectedDates}
          />
        </div>
      </div>
    </div>
  );
}
