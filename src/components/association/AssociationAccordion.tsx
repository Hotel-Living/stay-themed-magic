import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

export function AssociationAccordion() {
  const { t } = useTranslation('hotelAssociation');

  // Helper function to safely get array translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key, { returnObjects: true });
    
    if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
      return result as string[];
    }
    
    return [];
  };

  return (
    <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-6 md:p-8 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
      <Accordion type="multiple" className="space-y-4">
        
        {/* Point 3: Association Benefits */}
        <AccordionItem value="association-benefits" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
            <span className="text-lg md:text-xl font-bold text-yellow-300 tracking-wide uppercase">
              ¿Qué ventajas obtienen sus hoteles asociados por registrarse a través de su asociación?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 bg-white/3">
            <div className="space-y-6 pt-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                    📊 {t('accordionSection3.profitabilityTitle')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                    {getArrayTranslation('accordionSection3.profitabilityPoints').map((point: string, index: number) => 
                      <li key={index}>{point}</li>
                    )}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                    📜 {t('accordionSection3.costsTitle')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                    {getArrayTranslation('accordionSection3.costsPoints').map((point: string, index: number) => 
                      <li key={index}>{point}</li>
                    )}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                    💼 {t('accordionSection3.staffTitle')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                    {getArrayTranslation('accordionSection3.staffPoints').map((point: string, index: number) => 
                      <li key={index}>{point}</li>
                    )}
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                    💰 {t('accordionSection3.economicTitle')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                    {getArrayTranslation('accordionSection3.economicPoints').map((point: string, index: number) => 
                      <li key={index}>{point}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Point 4: Millions of Clients Waiting */}
        <AccordionItem value="clients-waiting" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
          <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
            <span className="text-lg md:text-xl font-bold text-yellow-300 tracking-wide uppercase">
              Cientos de millones de clientes están esperando
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 bg-white/3">
            <div className="space-y-6 pt-4">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg text-white/90 leading-relaxed">
                  {t('accordionSection4.intro')}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-yellow-300 mb-4">
                      {t('accordionSection4.demographicsTitle')}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                      {getArrayTranslation('accordionSection4.demographicsPoints').map((point: string, index: number) => 
                        <li key={index}>{point}</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-yellow-300 mb-4">
                      {t('accordionSection4.socialTitle')}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                      {getArrayTranslation('accordionSection4.socialPoints').map((point: string, index: number) => 
                        <li key={index}>{point}</li>
                      )}
                    </ul>
                  </div>
                </div>

                <p className="text-lg text-yellow-300 font-semibold mt-6">
                  {t('accordionSection4.conclusion')}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}