
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; 

interface TermsSectionProps {
  termsAndConditions: string;
  setTermsAndConditions: (value: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  isOpenTerms: boolean;
  setIsOpenTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsSection({
  termsAndConditions,
  setTermsAndConditions,
  termsAccepted,
  setTermsAccepted,
  isOpenTerms,
  setIsOpenTerms
}: TermsSectionProps) {
  // Direct handler function for checkbox changes
  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    const isChecked = checked === true;
    console.log("Checkbox changed to:", isChecked);
    setTermsAccepted(isChecked);
  };

  return (
    <div>
      <Collapsible className="w-full" open={isOpenTerms} onOpenChange={setIsOpenTerms}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <h3 className="text-xl font-bold uppercase text-white">TERMS & CONDITIONS</h3>
          {isOpenTerms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div>
            <Label htmlFor="terms" className="block text-sm font-medium text-foreground/90 mb-1 uppercase text-white">
              TERMS & CONDITIONS TEXT
            </Label>
            <Textarea 
              id="terms"
              placeholder="Enter terms and conditions" 
              value={termsAndConditions} 
              onChange={e => setTermsAndConditions(e.target.value)} 
              className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 h-72 resize-none bg-[#810586] text-white" 
            />
            <p className="text-xs text-fuchsia-300/70 mt-2">
              This pre-configured template covers standard hotel policies. Feel free to modify it to match your specific requirements.
            </p>
            
            <div className="flex items-start gap-3 mt-6 bg-fuchsia-900/30 p-3 rounded-lg border border-fuchsia-500/30">
              <div className="flex-none mt-0.5">
                <Checkbox 
                  id="accept-terms"
                  checked={termsAccepted}
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
              <Label 
                htmlFor="accept-terms" 
                className="text-sm text-white cursor-pointer"
              >
                I confirm that all information provided is accurate and I accept the Hotel-Living.com partner terms <span className="text-red-400">*</span>
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
