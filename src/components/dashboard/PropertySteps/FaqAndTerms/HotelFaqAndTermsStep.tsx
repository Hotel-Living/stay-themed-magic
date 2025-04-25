
import React, { useState, useEffect } from "react";
import { predefinedFaqs, predefinedTerms } from "./constants";
import { FaqItem } from "./types";
import FaqSection from "./FaqSection";
import TermsSection from "./TermsSection";

interface HotelFaqAndTermsStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function HotelFaqAndTermsStep({ 
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: HotelFaqAndTermsStepProps) {
  const [faqItems, setFaqItems] = useState<FaqItem[]>(formData.faqs || predefinedFaqs);
  const [termsAndConditions, setTermsAndConditions] = useState(formData.terms || predefinedTerms);
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(formData.termsAccepted || false);

  // Update form data when FAQs or terms change
  useEffect(() => {
    if (updateFormData) {
      updateFormData('faqs', faqItems);
      updateFormData('terms', termsAndConditions);
    }
  }, [faqItems, termsAndConditions, updateFormData]);

  // Update form data when terms acceptance changes
  useEffect(() => {
    if (updateFormData) {
      updateFormData('termsAccepted', termsAccepted);
    }
    
    // Immediately call validation change when terms acceptance changes
    onValidationChange(termsAccepted);
    
    // Log for debugging
    console.log("Terms accepted state changed:", termsAccepted);
  }, [termsAccepted, updateFormData, onValidationChange]);

  // Handler function to ensure state is properly updated
  const handleTermsAcceptance = (checked: boolean) => {
    setTermsAccepted(checked);
    updateFormData('termsAccepted', checked);
    onValidationChange(checked);
    console.log("Terms manually set to:", checked);
  };

  return (
    <div className="space-y-6 max-w-[80%]">
      <FaqSection 
        faqItems={faqItems}
        setFaqItems={setFaqItems}
        isOpenFaq={isOpenFaq}
        setIsOpenFaq={setIsOpenFaq}
      />
      
      <TermsSection 
        termsAndConditions={termsAndConditions}
        setTermsAndConditions={setTermsAndConditions}
        termsAccepted={termsAccepted}
        setTermsAccepted={handleTermsAcceptance}
        isOpenTerms={isOpenTerms}
        setIsOpenTerms={setIsOpenTerms}
      />
    </div>
  );
}
