
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
  const [isOpenFaq, setIsOpenFaq] = useState(true);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(formData.termsAccepted || false);

  // Update parent form data when FAQs or terms change
  useEffect(() => {
    if (updateFormData) {
      updateFormData('faqs', faqItems);
      updateFormData('terms', termsAndConditions);
    }
  }, [faqItems, termsAndConditions, updateFormData]);

  // Update parent form data when terms acceptance changes
  useEffect(() => {
    if (updateFormData) {
      updateFormData('termsAccepted', termsAccepted);
    }
  }, [termsAccepted, updateFormData]);

  useEffect(() => {
    // Validate based on having at least one FAQ and terms and conditions
    const isValid = faqItems.length > 0 && termsAndConditions.trim().length > 0;
    onValidationChange(isValid);
  }, [faqItems, termsAndConditions, onValidationChange]);

  return (
    <div className="space-y-6">
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
        setTermsAccepted={setTermsAccepted}
        isOpenTerms={isOpenTerms}
        setIsOpenTerms={setIsOpenTerms}
      />
    </div>
  );
}
