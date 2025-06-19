import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection, ProfitSection, DontJustFillRoomsSection, AffinitiesRevolutionSection, TheyNeedHotelSection, SeamlessIntegrationSection, StepsToJoinSection } from "./accordion/sections";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelAccordionMenu() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { t } = useTranslation();
  
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  
  return <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1-   {t('hotels.accordion.benefits.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2-   {t('hotels.accordion.comparison.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3-   {t('hotels.accordion.dontJustFill.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <DontJustFillRoomsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="how-much-profit-missing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4-   {t('hotels.accordion.profitMissing.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ProfitSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="specialized-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5-   {t('hotels.accordion.specializedHotels.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg text-[#FFF9B0]">{t('hotels.accordion.specializedHotels.example1.title')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example1.point1')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example1.point2')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example1.point3')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example1.point4')}</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">{t('hotels.accordion.specializedHotels.example2.title')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example2.point1')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example2.point2')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example2.point3')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example2.point4')}</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">{t('hotels.accordion.specializedHotels.example3.title')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example3.point1')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example3.point2')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example3.point3')}</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- {t('hotels.accordion.specializedHotels.example3.point4')}</p>
              
              <p className="text-base italic mt-4 text-[#FFF9B0]">{t('hotels.accordion.specializedHotels.conclusion')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="our-technology" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              6-   {t('hotels.accordion.technology.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.technology.point1')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.technology.point2')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.technology.point3')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.technology.point4')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="targeted-marketing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              7-   {t('hotels.accordion.marketing.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.marketing.point1')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.marketing.point2')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.marketing.point3')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.marketing.point4')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themed-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              8-   {t('hotels.accordion.themedHotels.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.themedHotels.point1')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.themedHotels.point2')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.themedHotels.point3')}</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> {t('hotels.accordion.themedHotels.point4')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="they-need-hotel" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              9-   {t('hotels.accordion.theyNeed.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <TheyNeedHotelSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themes-revolution" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              10-   {t('hotels.accordion.affinitiesRevolution.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <AffinitiesRevolutionSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="seamless-integration" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              11-   {t('hotels.accordion.seamlessIntegration.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <SeamlessIntegrationSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="steps-to-join" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              12-   {t('hotels.accordion.stepsToJoin.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <StepsToJoinSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
}
