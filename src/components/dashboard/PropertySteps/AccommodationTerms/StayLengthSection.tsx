
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const durations = [8, 16, 24, 32];
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
    
    localStorage.setItem('selectedStayLengths', JSON.stringify(newSelectedLengths));
    
    if (updateFormData) {
      updateFormData('stayLengths', newSelectedLengths);
    }

    onValidationChange(newSelectedLengths.length > 0);
  };

  return (
    <Collapsible 
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen} 
      onOpenChange={onOpenChange}
      defaultOpen={false}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
        <label className="text-base font-medium text-white">
          Length of Stay
        </label>
        {isOpen ? 
          <ChevronUp className="h-4 w-4 text-white" /> : 
          <ChevronDown className="h-4 w-4 text-white" />
        }
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        <div className="space-y-1">
          <label className="block text-sm uppercase text-white/90">AVAILABLE STAY LENGTHS</label>
          <div className="grid grid-cols-2 gap-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2"
                  checked={selectedStayLengths.includes(duration)}
                  onChange={(e) => handleStayLengthChange(e, duration)}
                />
                <span className="text-sm text-white/90">{duration} days</span>
              </label>
            ))}
          </div>
          
          {selectedStayLengths.length > 0 && (
            <p className="text-green-400 text-xs mt-1">
              Selected stay lengths will populate rate fields in Room Types
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
