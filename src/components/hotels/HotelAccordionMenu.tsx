
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function HotelAccordionMenu() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());
  const { t, language } = useTranslation();

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  const getAccordionContent = () => {
    const accordionSections = [
      {
        title: t('hotels.accordion.benefits.title'),
        content: t('hotels.accordion.benefits.content')
      },
      {
        title: t('hotels.accordion.comparison.title'),
        content: t('hotels.accordion.comparison.content')
      },
      {
        title: t('hotels.accordion.fillRooms.title'),
        content: t('hotels.accordion.fillRooms.content')
      },
      {
        title: t('hotels.accordion.profitMissing.title'),
        content: t('hotels.accordion.profitMissing.content')
      },
      {
        title: t('hotels.accordion.affinityHotels.title'),
        content: t('hotels.accordion.affinityHotels.content')
      },
      {
        title: t('hotels.accordion.technology.title'),
        content: t('hotels.accordion.technology.content')
      },
      {
        title: t('hotels.accordion.marketing.title'),
        content: t('hotels.accordion.marketing.content')
      },
      {
        title: t('hotels.accordion.socialNetworks.title'),
        content: t('hotels.accordion.socialNetworks.content')
      },
      {
        title: t('hotels.accordion.theyNeed.title'),
        content: t('hotels.accordion.theyNeed.content')
      },
      {
        title: t('hotels.accordion.socialRevolution.title'),
        content: t('hotels.accordion.socialRevolution.content')
      },
      {
        title: t('hotels.accordion.integration.title'),
        content: t('hotels.accordion.integration.content')
      },
      {
        title: t('hotels.accordion.stepsToJoin.title'),
        content: t('hotels.accordion.stepsToJoin.content')
      }
    ];

    return accordionSections;
  };

  const accordionItems = getAccordionContent();

  return (
    <div className="w-full space-y-3">
      {accordionItems.map((item, index) => (
        <div key={index} className="border border-fuchsia-400/30 rounded-lg overflow-hidden bg-gradient-to-r from-[#6a0a95]/20 to-[#460F54]/20 backdrop-blur-sm">
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-fuchsia-500/10 transition-colors duration-200"
          >
            <h3 className="text-[#f9d3f6] font-semibold text-base md:text-lg">
              {item.title}
            </h3>
            <ChevronDown 
              className={`h-5 w-5 text-fuchsia-300 transition-transform duration-200 ${
                openSections.has(index) ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openSections.has(index) && (
            <div className="px-6 pb-4 border-t border-fuchsia-400/20">
              <div className="text-[#f0e3f2] text-sm md:text-base leading-relaxed whitespace-pre-line">
                {item.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
