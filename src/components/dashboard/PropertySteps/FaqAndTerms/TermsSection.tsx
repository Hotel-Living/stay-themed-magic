
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TermsSectionProps {
  termsAndConditions: string;
  setTermsAndConditions: (value: string) => void;
  isOpenTerms: boolean;
  setIsOpenTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsSection({
  termsAndConditions,
  setTermsAndConditions,
  isOpenTerms,
  setIsOpenTerms
}: TermsSectionProps) {
  return (
    <div>
      <Collapsible className="w-full" open={isOpenTerms} onOpenChange={setIsOpenTerms}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <h3 className="text-xl font-bold uppercase text-white">TÉRMINOS Y CONDICIONES</h3>
          {isOpenTerms ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div>
            <Label htmlFor="terms" className="block text-sm font-medium text-foreground/90 mb-1 uppercase text-white">
              TEXTO DE TÉRMINOS Y CONDICIONES
            </Label>
            <Textarea 
              id="terms"
              placeholder="Ingrese términos y condiciones" 
              value={termsAndConditions} 
              onChange={e => setTermsAndConditions(e.target.value)} 
              className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 h-72 resize-none bg-[#810586] text-white" 
            />
            <p className="text-xs text-fuchsia-300/70 mt-2">
              Esta plantilla preconfigurada cubre las políticas estándar del hotel. Siéntase libre de modificarla para que coincida con sus requisitos específicos.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
