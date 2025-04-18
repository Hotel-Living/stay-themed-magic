
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
            
            <div className="flex items-center space-x-2 mt-6">
              <input 
                type="checkbox"
                id="accept-terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
              />
              <Label htmlFor="accept-terms" className="text-sm text-white">
                I confirm that all information provided is accurate and I accept the Hotel-Living.com partner terms
              </Label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
