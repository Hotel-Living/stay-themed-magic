
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

  useEffect(() => {
    if (updateFormData) {
      updateFormData('faqs', faqItems);
      updateFormData('terms', termsAndConditions);
      updateFormData('termsAccepted', true); // Always set terms as accepted
    }
  }, [faqItems, termsAndConditions, updateFormData]);

  useEffect(() => {
    onValidationChange(true); // Step is always valid now
  }, [onValidationChange]);

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
        isOpenTerms={isOpenTerms}
        setIsOpenTerms={setIsOpenTerms}
      />
      
      <div className="mt-4 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
        <p className="text-sm text-white">
          By clicking "Submit", you confirm that all information provided is accurate and your property complies with all local regulations and safety requirements.
        </p>
      </div>
    </div>
  );
}
