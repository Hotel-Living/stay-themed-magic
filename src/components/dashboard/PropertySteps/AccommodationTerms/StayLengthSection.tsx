
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface StayLengthSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StayLengthSection({
  isOpen,
  onOpenChange,
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: StayLengthSectionProps) {
  // Durations available for selection
  const durations = [8, 16, 24, 32];
  
  // Initialize selected lengths from form data or empty array
  const initialStayLengths = formData.stayLengths || [];
  const [selectedStayLengths, setSelectedStayLengths] = React.useState<number[]>(initialStayLengths);

  const handleStayLengthChange = (e: React.ChangeEvent<HTMLInputElement>, length: number) => {
    let newSelectedLengths: number[];
    
    if (e.target.checked) {
      newSelectedLengths = [...selectedStayLengths, length];
    } else {
      newSelectedLengths = selectedStayLengths.filter(l => l !== length);
    }
    
    setSelectedStayLengths(newSelectedLengths);
    
    // Save to context & localStorage for sharing with room type components
    localStorage.setItem('selectedStayLengths', JSON.stringify(newSelectedLengths));
    
    // Update parent form data
    if (updateFormData) {
      updateFormData('stayLengths', newSelectedLengths);
    }

    // Update validation status
    onValidationChange(newSelectedLengths.length > 0);
  };

  return (
    <Collapsible 
      className="w-full mb-4"
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left rounded-full bg-[#7a0486]">
        <label className="text-lg font-semibold text-white">
          Length of Stay
        </label>
        <ChevronDown className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="space-y-2">
          <label className="block uppercase text-sm">AVAILABLE STAY LENGTHS</label>
          <div className="grid grid-cols-2 gap-4">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                  checked={selectedStayLengths.includes(duration)}
                  onChange={(e) => handleStayLengthChange(e, duration)}
                />
                <span className="text-sm">{duration} days</span>
              </label>
            ))}
          </div>
          
          {selectedStayLengths.length > 0 && (
            <p className="text-green-400 text-xs mt-2">
              Selected stay lengths will automatically populate rate fields in Room Types section
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
