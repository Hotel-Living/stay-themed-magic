
import React from "react";
import HotelFaqAndTermsStep from "./FaqAndTerms/HotelFaqAndTermsStep";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";

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

  // Check if room types, meal plans, and stay lengths all exist and have valid values
  const hasValidRoomTypes = formData?.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0;
  const hasValidMealPlans = formData?.mealPlans && Array.isArray(formData.mealPlans) && formData.mealPlans.length > 0;
  const hasValidStayLengths = formData?.stayLengths && Array.isArray(formData.stayLengths) && formData.stayLengths.length > 0;
  
  // Only render price tables if all three conditions are met
  const shouldRenderPriceTables = hasValidRoomTypes && hasValidMealPlans && hasValidStayLengths;
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">{t("title")}</h2>
      
      {/* Only render price tables if all required data exists */}
      {shouldRenderPriceTables ? (
        formData.roomTypes.map((roomType: any) => (
          renderPriceTable?.(
            roomType.name || roomType.selectedRoomType || roomType, 
            formData.mealPlans || [], 
            formData.stayLengths || []
          )
        ))
      ) : (
        <div className="bg-fuchsia-950/30 p-4 rounded-lg border border-fuchsia-800/30">
          <p className="text-yellow-300">Please define room types, meal plans, and stay lengths in Step 3 before setting prices.</p>
        </div>
      )}
      
      <Accordion type="single" collapsible className="w-full mb-6">
        <AccordionItem value="faq" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
          <AccordionTrigger className="px-4 py-3">
            <h3 className="text-lg capitalize">{t("frequentlyAskedQuestions")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Pre-configured FAQs */}
              <div className="space-y-2">
                <h4 className="font-medium">Common FAQs</h4>
                <div className="rounded bg-fuchsia-950/20 p-3 mb-2">
                  <h5 className="font-medium mb-1">What time is check-in and check-out?</h5>
                  <Textarea 
                    defaultValue="Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request for an additional fee."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
                
                <div className="rounded bg-fuchsia-950/20 p-3 mb-2">
                  <h5 className="font-medium mb-1">Do you offer airport transfers?</h5>
                  <Textarea 
                    defaultValue="Yes, we offer airport transfers for an additional fee. Please contact us at least 48 hours before your arrival to arrange this service."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
                
                <div className="rounded bg-fuchsia-950/20 p-3">
                  <h5 className="font-medium mb-1">Is breakfast included?</h5>
                  <Textarea 
                    defaultValue="Breakfast is included in some of our room rates. Please check your specific booking for details."
                    className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-20 text-white"
                  />
                </div>
              </div>
              
              {/* Add new FAQ */}
              <div className="pt-4 border-t border-fuchsia-800/20">
                <button className="w-full py-2 bg-fuchsia-700/50 hover:bg-fuchsia-700/70 rounded-lg text-white">
                  {t("addQuestion")}
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="terms" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
          <AccordionTrigger className="px-4 py-3">
            <h3 className="text-lg capitalize">{t("hotelLivingTerms")}</h3>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Pre-configured Terms */}
              <div className="space-y-2">
                <Textarea 
                  defaultValue={t("termsContent")}
                  className="bg-fuchsia-950/30 border border-fuchsia-800/30 h-80 text-white"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
