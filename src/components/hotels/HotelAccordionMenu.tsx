
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
        content: renderBenefitsContent()
      },
      {
        title: t('hotels.accordion.comparison.title'),
        content: renderComparisonContent()
      },
      {
        title: t('hotels.accordion.fillRooms.title'),
        content: renderFillRoomsContent()
      },
      {
        title: t('hotels.accordion.profitMissing.title'),
        content: renderProfitMissingContent()
      },
      {
        title: t('hotels.accordion.affinityHotels.title'),
        content: renderAffinityHotelsContent()
      },
      {
        title: t('hotels.accordion.technology.title'),
        content: renderTechnologyContent()
      },
      {
        title: t('hotels.accordion.marketing.title'),
        content: renderMarketingContent()
      },
      {
        title: t('hotels.accordion.socialNetworks.title'),
        content: renderSocialNetworksContent()
      },
      {
        title: t('hotels.accordion.theyNeed.title'),
        content: renderTheyNeedContent()
      },
      {
        title: t('hotels.accordion.socialRevolution.title'),
        content: renderSocialRevolutionContent()
      },
      {
        title: t('hotels.accordion.integration.title'),
        content: renderIntegrationContent()
      },
      {
        title: t('hotels.accordion.stepsToJoin.title'),
        content: renderStepsToJoinContent()
      }
    ];

    return accordionSections;
  };

  const renderBenefitsContent = () => {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.benefits.fullOccupancy.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t('hotels.accordion.benefits.fullOccupancy.point1')}</li>
            <li>{t('hotels.accordion.benefits.fullOccupancy.point2')}</li>
            <li>{t('hotels.accordion.benefits.fullOccupancy.point3')}</li>
            <li>{t('hotels.accordion.benefits.fullOccupancy.point4')}</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.benefits.lowerCosts.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t('hotels.accordion.benefits.lowerCosts.point1')}</li>
            <li>{t('hotels.accordion.benefits.lowerCosts.point2')}</li>
            <li>{t('hotels.accordion.benefits.lowerCosts.point3')}</li>
            <li>{t('hotels.accordion.benefits.lowerCosts.point4')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.benefits.staffStability.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t('hotels.accordion.benefits.staffStability.point1')}</li>
            <li>{t('hotels.accordion.benefits.staffStability.point2')}</li>
            <li>{t('hotels.accordion.benefits.staffStability.point3')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.benefits.additionalRevenue.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>{t('hotels.accordion.benefits.additionalRevenue.point1')}</li>
            <li>{t('hotels.accordion.benefits.additionalRevenue.point2')}</li>
            <li>{t('hotels.accordion.benefits.additionalRevenue.point3')}</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderComparisonContent = () => {
    const items = t('hotels.accordion.comparison.items', { returnObjects: true }) as any[];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-red-300 mb-3 text-center">
              {t('hotels.accordion.comparison.traditional')}
            </h4>
            <ul className="space-y-2">
              {items?.map((item: any, index: number) => (
                <li key={index} className="text-red-200 text-sm border-l-2 border-red-400 pl-3">
                  {item.traditional}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-green-300 mb-3 text-center">
              {t('hotels.accordion.comparison.hotelLiving')}
            </h4>
            <ul className="space-y-2">
              {items?.map((item: any, index: number) => (
                <li key={index} className="text-green-200 text-sm border-l-2 border-green-400 pl-3">
                  {item.hotelLiving}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderFillRoomsContent = () => {
    const lines = t('hotels.accordion.fillRooms.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderProfitMissingContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-3">
            {t('hotels.accordion.profitMissing.section1.title')}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-2">
            {(t('hotels.accordion.profitMissing.section1.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-3">
            {t('hotels.accordion.profitMissing.section2.title')}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-2">
            {(t('hotels.accordion.profitMissing.section2.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-3">
            {t('hotels.accordion.profitMissing.section3.title')}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-2">
            {(t('hotels.accordion.profitMissing.section3.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderAffinityHotelsContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.affinityHotels.example1.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.affinityHotels.example1.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.affinityHotels.example2.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.affinityHotels.example2.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.affinityHotels.example3.title')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.affinityHotels.example3.points', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-3 bg-fuchsia-900/20 rounded-lg">
          <p className="text-fuchsia-200">{t('hotels.accordion.affinityHotels.conclusion')}</p>
        </div>
      </div>
    );
  };

  const renderTechnologyContent = () => {
    const lines = t('hotels.accordion.technology.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderMarketingContent = () => {
    const lines = t('hotels.accordion.marketing.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderSocialNetworksContent = () => {
    const lines = t('hotels.accordion.socialNetworks.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderTheyNeedContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.theyNeed.intro')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.theyNeed.population', { returnObjects: true }) as string[])?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-fuchsia-200 mb-2">
            {t('hotels.accordion.theyNeed.andMost')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.theyNeed.andMost', { returnObjects: true }) as string[])?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30 rounded-lg">
          <h4 className="font-semibold text-yellow-300 mb-2">
            {t('hotels.accordion.theyNeed.dream')}
          </h4>
          <p className="text-yellow-200 whitespace-pre-line">
            {t('hotels.accordion.theyNeed.dreamDetail')}
          </p>
        </div>

        <div className="text-center">
          <p className="text-orange-300 font-medium">
            {t('hotels.accordion.theyNeed.question')}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-green-300 mb-2">
            {t('hotels.accordion.theyNeed.solutionIntro')}
          </h4>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {(t('hotels.accordion.theyNeed.solutionPoints', { returnObjects: true }) as string[])?.map((point: string, index: number) => (
              <li key={index} className="text-green-200">{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderSocialRevolutionContent = () => {
    const lines = t('hotels.accordion.socialRevolution.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderIntegrationContent = () => {
    const lines = t('hotels.accordion.integration.lines', { returnObjects: true }) as string[];
    
    return (
      <div className="space-y-2">
        {lines?.map((line: string, index: number) => (
          <div key={index} className="flex items-start">
            <span className="text-fuchsia-300 mr-2">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStepsToJoinContent = () => {
    const steps = t('hotels.accordion.stepsToJoin.steps', { returnObjects: true }) as any[];
    
    return (
      <div className="space-y-6">
        {steps?.map((step: any, index: number) => (
          <div key={index} className="border-l-4 border-fuchsia-400 pl-4">
            <h4 className="font-semibold text-fuchsia-200 mb-2">
              {step.step}
            </h4>
            <div className="text-sm whitespace-pre-line">
              {step.details}
            </div>
          </div>
        ))}
      </div>
    );
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
              <div className="text-[#f0e3f2] text-sm md:text-base leading-relaxed">
                {item.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
