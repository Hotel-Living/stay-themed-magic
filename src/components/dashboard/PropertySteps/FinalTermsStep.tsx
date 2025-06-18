
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface FinalTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function FinalTermsStep({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: FinalTermsStepProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const isValid = formData?.termsAccepted === true;
    onValidationChange(isValid);
  }, [formData?.termsAccepted, onValidationChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.faqAndTerms')}</h2>
        <p className="text-gray-300">{t('dashboard.finalTermsAndConditions')}</p>
      </div>

      <div className="bg-fuchsia-900/10 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4 uppercase text-white">{t('dashboard.important')}</h3>
        <p className="text-gray-300 mb-4">
          {t('dashboard.importantStep4')}
        </p>
        
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms-accepted"
            checked={formData?.termsAccepted || false}
            onChange={(e) => updateFormData("termsAccepted", e.target.checked)}
            className="w-5 h-5 mt-1"
          />
          <label htmlFor="terms-accepted" className="text-white">
            {t('dashboard.acceptTermsAndConditions')}
          </label>
        </div>
      </div>
    </div>
  );
}
