
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { saveSelectedStayLengths, getSelectedStayLengths } from "@/utils/stayLengthsContext";

interface LengthOfStaySectionProps {
  onValidationChange: (isValid: boolean) => void;
  title?: string;
  showHeader?: boolean;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function LengthOfStaySection({ 
  onValidationChange,
  title = "LENGTH OF STAY",
  showHeader = true,
  formData = {},
  updateFormData = () => {}
}: LengthOfStaySectionProps) {
  // Initialize from form data if available, otherwise empty array
  const initialStayLengths = formData.stayLengths || [];
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(initialStayLengths);
  const [stayLengthsValid, setStayLengthsValid] = useState(initialStayLengths.length > 0);

  // Updated stay lengths to 8, 16, 24, 32 days
  const stayLengths = [8, 16, 24, 32];

  const durations = [
    { value: 8 },
    { value: 16 },
    { value: 24 },
    { value: 32 }
  ];

  // Load initial data from form or context
  useEffect(() => {
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedStayLengths(formData.stayLengths);
      setStayLengthsValid(true);
      onValidationChange(true);
    } else {
      const contextStayLengths = getSelectedStayLengths();
      if (contextStayLengths.length > 0) {
        setSelectedStayLengths(contextStayLengths);
        // Update parent form data with context values
        if (updateFormData) {
          updateFormData('stayLengths', contextStayLengths);
        }
        setStayLengthsValid(true);
        onValidationChange(true);
      } else {
        setSelectedStayLengths([]);
        setStayLengthsValid(false);
        onValidationChange(false);
      }
    }
  }, [formData]);

  const handleStayLengthChange = (e: React.ChangeEvent<HTMLInputElement>, length: number) => {
    let newSelectedLengths: number[];
    
    if (e.target.checked) {
      newSelectedLengths = [...selectedStayLengths, length];
    } else {
      newSelectedLengths = selectedStayLengths.filter(l => l !== length);
    }
    
    setSelectedStayLengths(newSelectedLengths);
    
    // Save to context & localStorage for sharing with room type components
    saveSelectedStayLengths(newSelectedLengths);
    
    // Update parent form data
    if (updateFormData) {
      updateFormData('stayLengths', newSelectedLengths);
    }
  };

  useEffect(() => {
    const isValid = selectedStayLengths.length > 0;
    setStayLengthsValid(isValid);
    onValidationChange(isValid);
  }, [selectedStayLengths, onValidationChange]);

  const stayLengthContent = (
    <div className="grid grid-cols-2 gap-4 mt-2">
      <div className="col-span-2">
        <label className="block text-sm mb-1 uppercase">AVAILABLE STAY LENGTHS</label>
        <div className="grid grid-cols-2 gap-2">
          {durations.map((duration) => (
            <label key={duration.value} className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                checked={selectedStayLengths.includes(duration.value)}
                onChange={(e) => handleStayLengthChange(e, duration.value)}
              />
              <span className="text-sm">{duration.value} days</span>
            </label>
          ))}
        </div>
        {!stayLengthsValid && (
          <p className="text-red-400 text-xs mt-1">Please select at least one stay length</p>
        )}
        
        {selectedStayLengths.length > 0 && (
          <p className="text-green-400 text-xs mt-2">
            Selected stay lengths will automatically populate rate fields in Room Types section
          </p>
        )}
      </div>
    </div>
  );

  if (!showHeader) {
    return stayLengthContent;
  }

  return (
    <Collapsible className="w-full" defaultOpen={false}>
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          {title}
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {stayLengthContent}
      </CollapsibleContent>
    </Collapsible>
  );
}
