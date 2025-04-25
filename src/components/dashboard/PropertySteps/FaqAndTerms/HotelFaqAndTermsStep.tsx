
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

  // Direct handler for terms acceptance that updates everything in one place
  const handleTermsAcceptance = (checked: boolean) => {
    console.log("Setting terms accepted to:", checked);
    setTermsAccepted(checked);
    if (updateFormData) {
      updateFormData('termsAccepted', checked);
    }
    onValidationChange(checked);
  };

  // Ensure validation on mount and when terms change
  useEffect(() => {
    console.log("Terms accepted state in effect:", termsAccepted);
    onValidationChange(termsAccepted);
    if (updateFormData) {
      updateFormData('termsAccepted', termsAccepted);
    }
  }, [termsAccepted, updateFormData, onValidationChange]);

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
