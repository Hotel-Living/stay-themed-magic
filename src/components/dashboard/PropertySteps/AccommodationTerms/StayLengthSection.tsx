import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [selectedLengths, setSelectedLengths] = useState<number[]>(
    formData.stayLengths?.length ? formData.stayLengths : []
  );
  const { toast } = useToast();
  
  const stayLengthOptions = [8, 16, 24, 32];

  // Update local state when formData changes
  useEffect(() => {
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedLengths(formData.stayLengths);
    }
  }, [formData.stayLengths]);

  // Handle validation and update parent form data when selected stay lengths change
  useEffect(() => {
    const isValid = selectedLengths.length > 0;
    onValidationChange(isValid);
    
    // Update parent form data
    updateFormData("stayLengths", selectedLengths);
  }, [selectedLengths, onValidationChange, updateFormData]);

  const handleToggle = () => {
    setOpenState(!openState);
    onOpenChange();
  };
  
  const toggleStayLength = (length: number) => {
    setSelectedLengths(prev => {
      const isSelected = prev.includes(length);
      
      if (isSelected) {
        // Don't allow removing the last option
        if (prev.length <= 1) {
          toast.error("You must select at least one stay length.");
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
        <span className="text-lg font-medium">Stay Lengths</span>
        {openState ? <ChevronUp /> : <ChevronDown />}
      </button>
      
      {openState && (
        <div className="p-4 bg-[#350442] space-y-4">
          <p className="text-sm text-gray-300">
            Select the available stay lengths for your hotel.
          </p>
          
          <div className="p-4 rounded-md bg-[#420451]">
            <h3 className="text-sm font-bold mb-4 uppercase">AVAILABLE STAY LENGTHS (NIGHTS)</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stayLengthOptions.map(length => (
                <div 
                  key={length}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`stay-length-${length}`}
                    checked={selectedLengths.includes(length)}
                    onChange={() => toggleStayLength(length)}
                    className="w-5 h-5 accent-fuchsia-500"
                  />
                  <label htmlFor={`stay-length-${length}`} className="text-white">
                    {length}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {selectedLengths.length === 0 && (
            <div className="p-3 bg-red-900/30 text-red-200 rounded-md">
              Please select at least one stay length option.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
