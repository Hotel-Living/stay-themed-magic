
import React, { useState, useEffect } from "react";
import HotelFaqAndTermsStep from "./HotelFaqAndTermsStep";
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
      <HotelFaqAndTermsStep />
      
      <div className="space-y-6 mt-8">
        <div>
          <Label htmlFor="faq-content" className="block text-sm font-medium mb-2">
            FAQ Content <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="faq-content"
            value={faqContent}
            onChange={(e) => setFaqContent(e.target.value)}
            placeholder="Add your property's FAQ content here"
            className="h-32 bg-fuchsia-950/50 border border-fuchsia-500/30"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="terms-content" className="block text-sm font-medium mb-2">
            Terms & Conditions <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="terms-content"
            value={termsContent}
            onChange={(e) => setTermsContent(e.target.value)}
            placeholder="Add your property's terms and conditions here"
            className="h-32 bg-fuchsia-950/50 border border-fuchsia-500/30"
            required
          />
        </div>
        
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="accept-terms" 
            checked={termsAccepted} 
            onChange={e => setTermsAccepted(e.target.checked)} 
            className="mt-1" 
          />
          <Label htmlFor="accept-terms" className="text-sm">
            I confirm that all information provided is accurate and I accept the Hotel-Living.com partner terms <span className="text-red-500">*</span>
          </Label>
        </div>
        
        {error && (
          <div className="p-3 rounded-md bg-red-500/20 text-red-200 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        
        {termsAccepted && faqContent && termsContent && !error && (
          <div className="p-3 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>All required information has been provided</span>
          </div>
        )}
      </div>
    </div>
  );
}
