
import React, { useState, useEffect } from "react";

interface LengthOfStaySectionProps {
  onValidationChange?: (isValid: boolean) => void;
  title?: string;
  initialStayLengths?: number[];
  onStayLengthsChange?: (stayLengths: number[]) => void;
  showHeader?: boolean;
}

export default function LengthOfStaySection({ 
  onValidationChange = () => {},
  title = "LENGTH OF STAY",
  initialStayLengths = [],
  onStayLengthsChange = () => {},
  showHeader = true
}: LengthOfStaySectionProps) {
  const [selectedDurations, setSelectedDurations] = useState<number[]>(initialStayLengths);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isChecked = e.target.checked;
    
    let newDurations: number[];
    if (isChecked) {
      newDurations = [...selectedDurations, value].sort((a, b) => a - b);
    } else {
      newDurations = selectedDurations.filter(d => d !== value);
    }
    
    setSelectedDurations(newDurations);
    onStayLengthsChange(newDurations);
  };

  useEffect(() => {
    // Initial validation
    onValidationChange(selectedDurations.length > 0);

    // Update when selectedDurations changes
    onStayLengthsChange(selectedDurations);
  }, [selectedDurations]);

  // Load initial values
  useEffect(() => {
    if (initialStayLengths && initialStayLengths.length > 0) {
      console.log("Setting initial stay lengths:", initialStayLengths);
      setSelectedDurations(initialStayLengths);
    }
  }, [initialStayLengths]);

  return (
    <div className="space-y-3">
      {showHeader && <h3 className="text-sm font-semibold uppercase">{title}</h3>}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 7, 14, 21, 30, 60, 90].map(days => (
          <label key={days} className="flex items-center space-x-2 bg-fuchsia-950/30 px-3 py-2 rounded-md">
            <input
              type="checkbox"
              value={days}
              checked={selectedDurations.includes(days)}
              onChange={handleDurationChange}
              className="rounded border-fuchsia-500 text-fuchsia-600 focus:ring-fuchsia-500"
            />
            <span className="text-sm whitespace-nowrap">
              {days === 1 ? '1 day' : `${days} days`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
