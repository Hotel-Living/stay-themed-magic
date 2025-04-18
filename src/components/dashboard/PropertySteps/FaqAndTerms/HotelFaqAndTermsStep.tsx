
import React, { useState, useEffect } from "react";
import { predefinedFaqs, predefinedTerms } from "./constants";
import { FaqItem } from "./types";
import FaqSection from "./FaqSection";
import TermsSection from "./TermsSection";

interface HotelFaqAndTermsStepProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
  termsAccepted?: boolean;
  setTermsAccepted?: (value: boolean) => void;
}

export default function HotelFaqAndTermsStep({ 
  onValidationChange = () => {},
  termsAccepted = false,
  setTermsAccepted = () => {}
}: HotelFaqAndTermsStepProps) {
  const [faqItems, setFaqItems] = useState<FaqItem[]>(predefinedFaqs);
  const [termsAndConditions, setTermsAndConditions] = useState(predefinedTerms);
  const [isOpenFaq, setIsOpenFaq] = useState(true);
  const [isOpenTerms, setIsOpenTerms] = useState(false);

  useEffect(() => {
    // Validate based on having at least one FAQ and terms and conditions
    const isValid = faqItems.length > 0 && termsAndConditions.trim().length > 0;
    onValidationChange(isValid, {
      faqItems,
      termsAndConditions,
      termsAccepted
    });
  }, [faqItems, termsAndConditions, termsAccepted, onValidationChange]);

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
