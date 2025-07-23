
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";

export const FaqAccordionSection: React.FC = () => {
  const { t } = useTranslation("dashboard-faq-terms");

  return (
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
  );
};
