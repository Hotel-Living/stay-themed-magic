
import React from "react";
import { Label } from "@/components/ui/label";
import { format, addMonths } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  
  const currentDate = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(currentDate, i);
    return format(date, "MMMM yyyy");
  });
  
  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };
  
  // Notify parent component about validation state
  React.useEffect(() => {
    const hasSelectedMonths = Object.values(selectedMonths).some(isSelected => isSelected);
    if (onValidationChange) {
      onValidationChange(hasSelectedMonths);
    }
  }, [selectedMonths, onValidationChange]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <div className="bg-fuchsia-950/50 border border-white/10 rounded-lg p-4 text-white">
          <p className="text-sm mb-3">
            Select the months your hotel is available:
          </p>
          <div className="space-y-2">
            {months.map((month) => (
              <Collapsible
                key={month}
                open={expandedMonths[month]}
                onOpenChange={() => toggleMonth(month)}
                className="border border-fuchsia-800/30 rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-fuchsia-900/30 hover:bg-fuchsia-900/50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMonths[month] || false}
                      onChange={(e) => handleMonthToggle(month, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                    />
                    <span>{month}</span>
                  </div>
                  {expandedMonths[month] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 py-2">
                  <p className="text-sm text-fuchsia-300">Month selected</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
