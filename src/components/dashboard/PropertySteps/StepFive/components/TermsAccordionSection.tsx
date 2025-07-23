
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";

export const TermsAccordionSection: React.FC = () => {
  const { t } = useTranslation("dashboard-faq-terms");

  return (
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
  );
};
