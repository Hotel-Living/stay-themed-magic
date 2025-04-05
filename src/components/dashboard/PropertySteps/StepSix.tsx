
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";

interface StepSixProps {
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepSix({
  onValidationChange = () => {}
}: StepSixProps) {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [faqContent, setFaqContent] = useState<string>("");
  const [termsContent, setTermsContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showValidationError, setShowValidationError] = useState(false);

  // Check if all required fields are completed
  const checkValidation = () => {
    if (!faqContent.trim()) {
      setError("Please add FAQ content");
      onValidationChange(false);
      return false;
    }
    if (!termsContent.trim()) {
      setError("Please add Terms & Conditions content");
      onValidationChange(false);
      return false;
    }
    if (!termsAccepted) {
      setError("Please accept the terms");
      onValidationChange(false);
      return false;
    }
    setError("");
    onValidationChange(true);
    return true;
  };

  useEffect(() => {
    // Validate on mount and when fields change
    checkValidation();
  }, [faqContent, termsContent, termsAccepted]);

  return (
    <div className="space-y-6">
      {/* Additional configuration section */}
      <div className="space-y-6 mt-8">
        <div>
          <Label htmlFor="additional-notes" className="block text-sm font-medium mb-2">
            Additional Notes for Hotel-Living Staff
          </Label>
          <Textarea 
            id="additional-notes"
            placeholder="Any additional information or special requests regarding your property listing"
            className="h-32 bg-fuchsia-950/50 border border-fuchsia-500/30"
          />
          <p className="text-xs text-muted-foreground mt-1">
            This information will be reviewed by our team during the approval process but won't be visible to guests.
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="finalize-terms" 
            checked={termsAccepted} 
            onChange={e => setTermsAccepted(e.target.checked)} 
            className="mt-1" 
          />
          <Label htmlFor="finalize-terms" className="text-sm">
            I confirm that all information provided is accurate and my property complies with all local regulations and safety requirements <span className="text-red-500">*</span>
          </Label>
        </div>
        
        {error && showValidationError && (
          <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        
        {termsAccepted && !error && (
          <div className="p-3 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Your property is ready for submission!</span>
          </div>
        )}
      </div>
    </div>
  );
}
