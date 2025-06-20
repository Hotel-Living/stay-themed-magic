
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelAccordionMenu() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { t } = useTranslation();
  
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 - {t('hotels.accordion.benefits.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.comparison.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.dontJustFill.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              {(Array.isArray(t('hotels.accordion.fillRooms.lines', { returnObjects: true })) 
                ? t('hotels.accordion.fillRooms.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="how-much-profit-missing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.profitMissing.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <p className="text-base font-semibold py-0">{t('hotels.accordion.profitMissing.section1.title')}</p>
              {(Array.isArray(t('hotels.accordion.profitMissing.section1.points', { returnObjects: true }))
                ? t('hotels.accordion.profitMissing.section1.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {point}
                </p>
              ))}
              
              <p className="text-base font-semibold mt-14 py-[9px]">{t('hotels.accordion.profitMissing.section2.title')}</p>
              {(Array.isArray(t('hotels.accordion.profitMissing.section2.points', { returnObjects: true }))
                ? t('hotels.accordion.profitMissing.section2.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {point}
                </p>
              ))}
              
              <p className="text-base font-semibold mt-14 py-[17px]">{t('hotels.accordion.profitMissing.section3.title')}</p>
              {(Array.isArray(t('hotels.accordion.profitMissing.section3.points', { returnObjects: true }))
                ? t('hotels.accordion.profitMissing.section3.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {point}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="specialized-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.specializedHotels.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg text-[#FFF9B0]">{t('hotels.accordion.affinityHotels.example1.title')}</p>
              {(Array.isArray(t('hotels.accordion.affinityHotels.example1.points', { returnObjects: true }))
                ? t('hotels.accordion.affinityHotels.example1.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">- {point}</p>
              ))}
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">{t('hotels.accordion.affinityHotels.example2.title')}</p>
              {(Array.isArray(t('hotels.accordion.affinityHotels.example2.points', { returnObjects: true }))
                ? t('hotels.accordion.affinityHotels.example2.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">- {point}</p>
              ))}
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">{t('hotels.accordion.affinityHotels.example3.title')}</p>
              {(Array.isArray(t('hotels.accordion.affinityHotels.example3.points', { returnObjects: true }))
                ? t('hotels.accordion.affinityHotels.example3.points', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">- {point}</p>
              ))}
              
              <p className="text-base italic mt-4 text-[#FFF9B0]">{t('hotels.accordion.affinityHotels.conclusion')}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="our-technology" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.technology.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              {(Array.isArray(t('hotels.accordion.technology.lines', { returnObjects: true }))
                ? t('hotels.accordion.technology.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="targeted-marketing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.marketing.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              {(Array.isArray(t('hotels.accordion.marketing.lines', { returnObjects: true }))
                ? t('hotels.accordion.marketing.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themed-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.themedHotels.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              {(Array.isArray(t('hotels.accordion.socialNetworks.lines', { returnObjects: true }))
                ? t('hotels.accordion.socialNetworks.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="they-need-hotel" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.theyNeed.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <p className="text-base font-semibold text-[#FFF9B0]">{t('hotels.accordion.theyNeed.intro')}</p>
              {(Array.isArray(t('hotels.accordion.theyNeed.population', { returnObjects: true }))
                ? t('hotels.accordion.theyNeed.population', { returnObjects: true }) as string[]
                : []
              ).map((item: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {item}
                </p>
              ))}
              
              <p className="text-base font-semibold mt-6 text-[#FFF9B0]">AND MOST OF THEM:</p>
              {(Array.isArray(t('hotels.accordion.theyNeed.andMost', { returnObjects: true }))
                ? t('hotels.accordion.theyNeed.andMost', { returnObjects: true }) as string[]
                : []
              ).map((item: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {item}
                </p>
              ))}
              
              <div className="mt-8 text-center">
                <p className="text-lg font-bold text-[#FFF9B0]">{t('hotels.accordion.theyNeed.dream')}</p>
                <p className="text-base italic text-[#FFF9B0] whitespace-pre-line">{t('hotels.accordion.theyNeed.dreamDetail')}</p>
              </div>
              
              <p className="text-base font-semibold text-center text-[#FFF9B0] mt-6">{t('hotels.accordion.theyNeed.question')}</p>
              
              <p className="text-base font-semibold mt-6 text-[#FFF9B0]">{t('hotels.accordion.theyNeed.solutionIntro')}</p>
              {(Array.isArray(t('hotels.accordion.theyNeed.solutionPoints', { returnObjects: true }))
                ? t('hotels.accordion.theyNeed.solutionPoints', { returnObjects: true }) as string[]
                : []
              ).map((point: string, index: number) => (
                <p key={index} className="text-base flex items-start pl-4 text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {point}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themes-revolution" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.affinitiesRevolution.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-6">
              {(Array.isArray(t('hotels.accordion.socialRevolution.lines', { returnObjects: true }))
                ? t('hotels.accordion.socialRevolution.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="seamless-integration" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.seamlessIntegration.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              {(Array.isArray(t('hotels.accordion.integration.lines', { returnObjects: true }))
                ? t('hotels.accordion.integration.lines', { returnObjects: true }) as string[]
                : []
              ).map((line: string, index: number) => (
                <p key={index} className="text-base flex items-start text-[#FFF9B0]">
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                  {line}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="steps-to-join" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              {t('hotels.accordion.stepsToJoin.title')}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-8 text-left py-6">
              {(Array.isArray(t('hotels.accordion.stepsToJoin.steps', { returnObjects: true }))
                ? t('hotels.accordion.stepsToJoin.steps', { returnObjects: true }) as any[]
                : []
              ).map((step: any, index: number) => (
                <div key={index} className="space-y-3">
                  <p className="text-base font-semibold text-[#FFF9B0]">{step.step}</p>
                  <p className="text-base text-[#FFF9B0] pl-4 whitespace-pre-line">{step.details}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
