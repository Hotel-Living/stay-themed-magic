
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { PriceTablesSection } from "./StepFive/components/PriceTablesSection";
import { FaqAccordionSection } from "./StepFive/components/FaqAccordionSection";
import { TermsAccordionSection } from "./StepFive/components/TermsAccordionSection";
import { useStepFiveValidation } from "./StepFive/hooks/useStepFiveValidation";

interface StepFiveProps {
  onValidationChange?: (isValid: boolean) => void;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StepFive({ 
  onValidationChange = () => {}, 
  renderPriceTable,
  formData = {},
  updateFormData = () => {}
}: StepFiveProps) {
  const { t } = useTranslation("dashboard-faq-terms");
  const { shouldRenderPriceTables } = useStepFiveValidation(formData);
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">{t("title")}</h2>
      
      <PriceTablesSection
        shouldRenderPriceTables={shouldRenderPriceTables}
        formData={formData}
        renderPriceTable={renderPriceTable}
      />
      
      <FaqAccordionSection />
      
      <TermsAccordionSection />
    </div>
  );
}
