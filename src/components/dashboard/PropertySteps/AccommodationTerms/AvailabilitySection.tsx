
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
  
  const { selectedMonths, handleMonthToggle } = useAvailabilityDates(
    formData?.available_months || [],
    updateFormData
  );
  
  // Get the preferred weekday from formData, default to Monday if not set
  const preferredWeekday = formData?.preferredWeekday || "Monday";
  
  // Handle availability changes
  const handleAvailabilityChange = (dates: string[]) => {
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
    }
  };
  
  // Notify parent component about validation state
  React.useEffect(() => {
    const hasSelectedDates = formData?.availableDates?.length > 0;
    if (onValidationChange) {
      onValidationChange(hasSelectedDates);
    }
  }, [formData?.availableDates, onValidationChange]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className="bg-fuchsia-950/50 border border-white/10 rounded-lg p-4 text-white">
          <p className="text-sm mb-3">
            Select the months your hotel is available:
          </p>
          {/* Pass all required props to AvailabilityDateSection */}
          <AvailabilityDateSection 
            preferredWeekday={preferredWeekday}
            onAvailabilityChange={handleAvailabilityChange}
            selectedDates={formData?.availableDates || []}
          />
        </div>
      </div>
    </div>
  );
}
