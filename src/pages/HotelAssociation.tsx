import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Starfield } from "@/components/Starfield";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function HotelAssociation() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('hotelAssociation');

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
          
          {/* Centered Slogan */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🏨 HOTEL-LIVING
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('slogan')}
            </p>
          </div>

          {/* Revolution Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              💼 {t('revolutionTitle')}
            </h2>
            <p className="text-lg mb-4">
              <strong>{t('greeting', { associationName })}</strong>
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

            <div>
              <h3 className="text-xl font-bold mb-8">📈 {t('onlineCalculatorTitle')}</h3>
            </div>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="space-y-4">
            {/* Section 1: Benefits for Hotels */}
            <AccordionItem value="benefits" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-lg font-bold">
                  ① {t('accordionSection1.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-3">📊 {t('accordionSection1.profitabilityTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(t('accordionSection1.profitabilityPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-3">📜 {t('accordionSection1.costsTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(t('accordionSection1.costsPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-3">💼 {t('accordionSection1.staffTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(t('accordionSection1.staffPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-3">🪙 {t('accordionSection1.clientsTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(t('accordionSection1.clientsPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-3">🤖 {t('accordionSection1.technologyTitle')}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(t('accordionSection1.technologyPoints', { returnObjects: true }) as string[]).map((point: string, index: number) => (
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
                <span className="text-lg font-bold">
                  ② {t('accordionSection2.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-lg">{t('accordionSection2.introduction')}</p>
                  <p className="text-lg font-bold">{t('accordionSection2.subtitle')}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {(t('accordionSection2.points', { returnObjects: true }) as string[]).map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 3: Potential Clients */}
            <AccordionItem value="potential-clients" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-lg font-bold">
                  ③ {t('accordionSection3.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <ul className="list-disc list-inside space-y-1">
                    {(t('accordionSection3.clientTypes', { returnObjects: true }) as string[]).map((type: string, index: number) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
                  <p className="text-lg font-bold">{t('accordionSection3.commonFactor')}</p>
                  <div className="space-y-2">
                    <p>{t('accordionSection3.notAboutRenting')}</p>
                    <p><strong>{t('accordionSection3.aboutLivingDifferent')}</strong></p>
                    <p>{t('accordionSection3.hotelSolution')}</p>
                    <p><strong>{t('accordionSection3.hotelLivingChanges')}</strong></p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 mt-4">
                    {(t('accordionSection3.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Section 4: Hotel Sector Crisis */}
            <AccordionItem value="sector-crisis" className="border rounded-lg">
              <AccordionTrigger className="px-6 py-4 text-left">
                <span className="text-lg font-bold">
                  ④ {t('accordionSection4.title')}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-lg">{t('accordionSection4.obsoleteModel')}</p>
                  <p><strong>{t('accordionSection4.occupancyReality')}</strong></p>
                  <p className="text-lg font-bold">{t('accordionSection4.emptyRooms')}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {(t('accordionSection4.consequences', { returnObjects: true }) as string[]).map((consequence: string, index: number) => (
                      <li key={index}>{consequence}</li>
                    ))}
                  </ul>
                  <p className="text-lg font-bold">{t('accordionSection4.meanwhile')}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {(t('accordionSection4.desires', { returnObjects: true }) as string[]).map((desire: string, index: number) => (
                      <li key={index}>{desire}</li>
                    ))}
                  </ul>
                  <div className="space-y-2 mt-4">
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