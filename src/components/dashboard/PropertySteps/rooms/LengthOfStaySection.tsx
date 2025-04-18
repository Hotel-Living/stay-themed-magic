
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
}

export default function LengthOfStaySection({ 
  onValidationChange,
  title = "LENGTH OF STAY",
  showHeader = true
}: LengthOfStaySectionProps) {
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>([]);
  const [stayLengthsValid, setStayLengthsValid] = useState(false);

  // Updated stay lengths to 8, 16, 24, 32 days
  const stayLengths = [8, 16, 24, 32];

  // Custom durations to replace the imported ones
  const durations = [
    { value: 8 },
    { value: 16 },
    { value: 24 },
    { value: 32 }
  ];

  useEffect(() => {
    const storedLengths = getSelectedStayLengths();
    
    // If we have stored lengths, use them
    if (storedLengths.length > 0) {
      // Filter to make sure we only use valid durations (8, 16, 24, 32)
      const validStoredLengths = storedLengths.filter(len => 
        stayLengths.includes(len)
      );
      
      if (validStoredLengths.length > 0) {
        setSelectedStayLengths(validStoredLengths);
        setStayLengthsValid(true);
        onValidationChange(true);
      } else {
        // If no valid lengths, set the default ones
        const defaultLengths = [8, 16];
        setSelectedStayLengths(defaultLengths);
        saveSelectedStayLengths(defaultLengths);
        setStayLengthsValid(true);
        onValidationChange(true);
      }
    } else {
      // No stored lengths, set defaults
      const defaultLengths = [8, 16];
      setSelectedStayLengths(defaultLengths);
      saveSelectedStayLengths(defaultLengths);
      setStayLengthsValid(true);
      onValidationChange(true);
    }
  }, []);

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
    <Collapsible className="w-full">
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
