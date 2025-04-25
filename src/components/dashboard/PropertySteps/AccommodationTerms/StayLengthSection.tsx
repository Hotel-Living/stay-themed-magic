
import React, { useState, useEffect } from "react";
import { Plus, Minus, ChevronUp, ChevronDown } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";

interface StayLengthSectionProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StayLengthSection({
  isOpen = false,
  onOpenChange = () => {},
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StayLengthSectionProps) {
  const [openState, setOpenState] = useState(isOpen);
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(
    formData.stayLengths?.length ? formData.stayLengths : []
  );
  const { toast } = useToast();

  const stayLengthOptions = [8, 16, 24, 32];

  // Update local state when formData changes
  useEffect(() => {
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      console.log("StayLengthSection: Received stay lengths:", formData.stayLengths);
      setSelectedStayLengths(formData.stayLengths);
      
      // Update the context
      saveSelectedStayLengths(formData.stayLengths);
    }
  }, [formData.stayLengths]);

  // Handle validation and update parent form data when selected stay lengths change
  useEffect(() => {
    const isValid = selectedStayLengths.length > 0;
    onValidationChange(isValid);
    
    // Update parent form data
    updateFormData("stayLengths", selectedStayLengths);
    
    // Save to context for other components
    saveSelectedStayLengths(selectedStayLengths);
  }, [selectedStayLengths, onValidationChange, updateFormData]);

  const handleToggle = () => {
    setOpenState(!openState);
    onOpenChange();
  };

  const toggleStayLength = (length: number) => {
    setSelectedStayLengths(prev => {
      const isSelected = prev.includes(length);
      
      if (isSelected) {
        // Don't allow removing the last option
        if (prev.length <= 1) {
          toast({
            title: "Cannot remove all options",
            description: "You must select at least one stay length.",
            variant: "destructive"
          });
          return prev;
        }
        
        return prev.filter(item => item !== length);
      } else {
        return [...prev, length];
      }
    });
  };

  return (
    <div className="border border-purple-500/30 rounded-lg overflow-hidden">
      <button 
        className="w-full p-4 flex items-center justify-between bg-[#430453] hover:bg-[#4f0564] transition"
        onClick={handleToggle}
      >
        <span className="text-lg font-medium">Length of Stay</span>
        {openState ? <ChevronUp /> : <ChevronDown />}
      </button>
      
      {openState && (
        <div className="p-4 bg-[#350442] space-y-4">
          <p className="text-sm text-gray-300">
            Select which stay durations your hotel offers to guests.
          </p>
          
          <div className="p-4 rounded-md bg-[#420451]">
            <h3 className="text-sm font-bold mb-4 uppercase">AVAILABLE STAY LENGTHS</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {stayLengthOptions.map(days => (
                <div 
                  key={days}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`stay-length-${days}`}
                    checked={selectedStayLengths.includes(days)}
                    onChange={() => toggleStayLength(days)}
                    className="w-5 h-5 accent-fuchsia-500"
                  />
                  <label htmlFor={`stay-length-${days}`} className="text-white">
                    {days} days
                  </label>
                </div>
              ))}
            </div>
            
            <p className="text-green-400 text-sm mt-4">
              Selected stay lengths will populate rate fields in Room Types
            </p>
          </div>
          
          {selectedStayLengths.length === 0 && (
            <div className="p-3 bg-red-900/30 text-red-200 rounded-md">
              Please select at least one stay duration option.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
