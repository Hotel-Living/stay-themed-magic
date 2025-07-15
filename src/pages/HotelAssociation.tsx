import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Starfield } from "@/components/Starfield";
import { AssociationProfitabilityCalculator } from "@/components/dashboard/rates-calculator/components/AssociationProfitabilityCalculator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function HotelAssociation() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('hotelAssociation');

  // Helper function to safely get array translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key, { returnObjects: true });
    console.log(`Translation for ${key}:`, result);
    
    // Check if result is an array and all elements are strings
    if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
      return result as string[];
    }
    
    // If it's not an array of strings, return empty array
    console.warn(`Translation key ${key} did not return an array of strings:`, typeof result, result);
    return [];
  };

  // Function to format association name from slug
  const formatAssociationName = (slug?: string): string => {
    if (!slug) {
      return t('fallbackAssociation');
    }
    
    // Replace hyphens with spaces and capitalize each word
    const formatted = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Ensure "Asociación" is properly capitalized if present
    return formatted.replace(/asociacion/gi, 'Asociación');
  };

  const associationName = formatAssociationName(slug);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative min-h-screen">
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        <Starfield />
      </div>

      {/* Language Selector */}
      <div className="relative z-10 flex justify-end p-4">
        <div className="flex gap-2">
          <button
            onClick={() => changeLanguage('es')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'es' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background/80 hover:bg-background/90'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'en' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background/80 hover:bg-background/90'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-12 shadow-lg">
          
          {/* Centered Logo and Brand */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/950ed52a-c737-4637-9751-d6f1db78b7b4.png" 
                alt="Hotel-Living Logo"
                loading="eager"
                fetchPriority="high"
                className="h-16 md:h-20"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              HOTEL-LIVING
            </h1>
            <p className="text-lg md:text-xl font-bold text-white">
              {t('slogan')}
            </p>
          </div>

          {/* Revolution Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              💼 {t('revolutionTitle')}
            </h2>
            <p className="text-xl md:text-2xl mb-4 font-bold text-white">
              {t('greeting', { associationName })}
            </p>
            <p className="text-lg mb-4">
              {t('introduction')}
            </p>
            <p className="text-lg mb-8">
              {t('expansion')}
            </p>
          </div>

          {/* Static Content Blocks */}
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">📊 {t('opportunityTitle')}</h3>
              <p className="text-lg">{t('opportunityDescription')}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">🏨 {t('knownFactTitle')}</h3>
              <p className="text-lg mb-4">{t('knownFactDescription')}</p>
              <h4 className="text-lg font-bold mb-4">{t('onlyForBigChains')}</h4>
              <p className="text-lg">{t('smallHotelsDescription')}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t('whatWeOfferTitle')}</h3>
              <p className="text-lg">{t('whatWeOfferDescription')}</p>
            </div>

            {/* Calculator Section */}
            <div>
              <AssociationProfitabilityCalculator />
            </div>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Benefits for Hotels */}
            <AccordionItem value="benefits" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-2xl font-bold">
                  ① {t('accordionSection1.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold mb-3">📊 {t('accordionSection1.profitabilityTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-base">
                      {getArrayTranslation('accordionSection1.profitabilityPoints').map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3">📜 {t('accordionSection1.costsTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-base">
                      {getArrayTranslation('accordionSection1.costsPoints').map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3">💼 {t('accordionSection1.staffTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-base">
                      {getArrayTranslation('accordionSection1.staffPoints').map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3">🪙 {t('accordionSection1.clientsTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-base">
                      {getArrayTranslation('accordionSection1.clientsPoints').map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3">🤖 {t('accordionSection1.technologyTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-base">
                      {getArrayTranslation('accordionSection1.technologyPoints').map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 2: Millions of Clients Waiting */}
            <AccordionItem value="clients-waiting" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-2xl font-bold">
                  ② {t('accordionSection2.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-xl">{t('accordionSection2.introduction')}</p>
                  <p className="text-xl font-bold">{t('accordionSection2.subtitle')}</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {getArrayTranslation('accordionSection2.points').map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Potential Clients */}
            <AccordionItem value="potential-clients" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-2xl font-bold">
                  ③ {t('accordionSection3.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {getArrayTranslation('accordionSection3.clientTypes').map((type: string, index: number) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                  <p className="text-xl font-bold">{t('accordionSection3.commonFactor')}</p>
                  <div className="space-y-2 text-base">
                    <p>{t('accordionSection3.notAboutRenting')}</p>
                    <p><strong>{t('accordionSection3.aboutLivingDifferent')}</strong></p>
                    <p>{t('accordionSection3.hotelSolution')}</p>
                    <p><strong>{t('accordionSection3.hotelLivingChanges')}</strong></p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 mt-4 text-base">
                    {getArrayTranslation('accordionSection3.features').map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Hotel Sector Crisis */}
            <AccordionItem value="sector-crisis" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-2xl font-bold">
                  ④ {t('accordionSection4.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-xl">{t('accordionSection4.obsoleteModel')}</p>
                  <p className="text-base"><strong>{t('accordionSection4.occupancyReality')}</strong></p>
                  <p className="text-xl font-bold">{t('accordionSection4.emptyRooms')}</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {getArrayTranslation('accordionSection4.consequences').map((consequence: string, index: number) => (
                      <li key={index}>{consequence}</li>
                    ))}
                  </ul>
                  <p className="text-xl font-bold">{t('accordionSection4.meanwhile')}</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {getArrayTranslation('accordionSection4.desires').map((desire: string, index: number) => (
                      <li key={index}>{desire}</li>
                    ))}
                  </ul>
                  <div className="space-y-2 mt-4 text-base">
                    <p><strong>{t('accordionSection4.emptyRoomOpportunity')}</strong></p>
                    <p>{t('accordionSection4.finalWarning')}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}