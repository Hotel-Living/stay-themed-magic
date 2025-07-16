import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Starfield } from "@/components/Starfield";
import { AssociationProfitabilityCalculator } from "@/components/dashboard/rates-calculator/components/AssociationProfitabilityCalculator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
export default function HotelAssociation() {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const {
    t,
    i18n
  } = useTranslation('hotelAssociation');

  // Helper function to safely get array translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key, {
      returnObjects: true
    });
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
    const formatted = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Ensure "Asociación" is properly capitalized if present
    return formatted.replace(/asociacion/gi, 'Asociación');
  };
  const associationName = formatAssociationName(slug);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return <div className="relative min-h-screen">
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        <Starfield />
      </div>

      {/* Header Navigation */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/950ed52a-c737-4637-9751-d6f1db78b7b4.png" 
                  alt="Hotel-Living Logo" 
                  loading="eager" 
                  fetchPriority="high" 
                  className="h-20 md:h-24 drop-shadow-lg" 
                />
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
                <div className="space-y-2 mb-8">
                  <p className="text-lg md:text-xl font-semibold text-white/90 uppercase tracking-wide leading-relaxed">
                    UNA GRAN FUENTE DE INGRESOS PARA SU ASOCIACIÓN
                  </p>
                  <p className="text-lg md:text-xl font-semibold text-white/90 uppercase tracking-wide leading-relaxed">
                    POSIBLE OCUPACIÓN MASIVA PARA SUS HOTELES AFILIADOS
                  </p>
                </div>
                
                <h1 className="text-base md:text-lg font-bold text-yellow-300 uppercase tracking-wide leading-tight mb-24 drop-shadow-md">
                  💼 UNA REVOLUCIÓN HOTELERA QUE SU ASOCIACIÓN PUEDE INTRODUCIR EN PRIMICIA ENTRE SUS HOTELES
                </h1>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                    {t('greeting', { associationName })}
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Somos Hotel-Living.com, revolución hotelera, creada por hoteleros para hoteleros.
                    Estamos en plena expansión, y al entrar en un nuevo país intentamos lógicamente colaborar con los nuestros —las asociaciones hoteleras— con el objetivo de que todos los beneficios queden en lo posible en nuestro sector.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              
              {/* Opportunity Section */}
              <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-lg md:text-xl font-bold text-yellow-300 uppercase tracking-wide mb-8 drop-shadow-md">
                    📊 SOMOS UNA OPORTUNIDAD CONCRETA Y EN MARCHA
                  </h2>
                  <div className="space-y-2">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      Un sistema que genera beneficios directos
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      tanto para la asociación
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      como para sus hoteles afiliados
                    </p>
                  </div>
                </div>
              </section>

              {/* Industry Context Section */}
              <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <h3 className="text-xl md:text-2xl font-bold text-yellow-300 uppercase tracking-wide mb-8">
                      LA SOCIEDAD HA CAMBIADO. NUESTRO MODELO NO.
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed mb-8">
                      Como es sabido Las grandes cadenas hoteleras (Hyatt, Marriott, Hilton, Accor, IHG, Radisson y muchas
                      más) hace ya años que están rentabilizando y ampliando el nuevo modelo social que nuestra sociedad va
                      imponiendo: las estancias residenciales en hoteles, de media y larga duración.
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-yellow-300 uppercase tracking-wide mb-6">
                      ¿SÓLO PARA LAS GRANDES CADENAS HOTELERAS?
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      Mientras estas expanden sin cesar sus modelos residenciales, centenares de miles de pequeños hoteles
                      independientes y cadenas pequeñas o medianas no han podido rentabilizar hasta ahora este modelo, ni
                      acceder a sus inmensos beneficios, por falta de una herramienta común especializada y accesible.
                    </p>
                  </div>
                </div>
              </section>

              {/* What We Offer Section */}
              <section className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-300/20 shadow-xl">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-yellow-300 uppercase tracking-wide mb-6">
                    ¿QUÉ OFRECEMOS EN HOTEL-LIVING.COM?
                  </h2>
                  <div className="space-y-2 mb-8">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-semibold">
                      A LAS ASOCIACIONES HOTELERAS:
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      Un 4% del total de las reservas generadas por sus miembros,
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      un porcentaje que no afecta en absoluto a sus hoteles,
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      pues proviene de nuestro propio coste de gestión.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-6">
                    <p className="text-lg text-white/90 leading-relaxed font-medium">
                      Su asociación recibirá cada mes el 4% de las reservas generadas por sus hoteles durante los primeros 18 meses, y el 2% durante los 12 siguientes. Este ingreso no afecta en nada a los hoteles —proviene de nuestro propio coste de gestión— y podrá ser reinvertido en beneficio de la asociación y sus miembros.
                    </p>
                  </div>
                </div>
              </section>

              {/* Calculator Section */}
              <section className="my-20">
                <AssociationProfitabilityCalculator />
              </section>

              {/* Accordion Sections */}
              <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl">
                <Accordion type="multiple" className="space-y-4">
                  
                  {/* Section 1: Benefits for Hotels */}
                  <AccordionItem value="benefits" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
                      <span className="text-sm md:text-base font-bold text-yellow-300 tracking-wide">
                        ① {t('accordionSection1.title')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-white/3">
                      <div className="space-y-8 pt-4">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                              📊 {t('accordionSection1.profitabilityTitle')}
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                              {getArrayTranslation('accordionSection1.profitabilityPoints').map((point: string, index: number) => 
                                <li key={index}>{point}</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                              📜 {t('accordionSection1.costsTitle')}
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                              {getArrayTranslation('accordionSection1.costsPoints').map((point: string, index: number) => 
                                <li key={index}>{point}</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                              💼 {t('accordionSection1.staffTitle')}
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                              {getArrayTranslation('accordionSection1.staffPoints').map((point: string, index: number) => 
                                <li key={index}>{point}</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                              🪙 {t('accordionSection1.clientsTitle')}
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                              {getArrayTranslation('accordionSection1.clientsPoints').map((point: string, index: number) => 
                                <li key={index}>{point}</li>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <h4 className="text-lg font-bold text-yellow-300 mb-4 flex items-center">
                            🤖 {t('accordionSection1.technologyTitle')}
                          </h4>
                          <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                            {getArrayTranslation('accordionSection1.technologyPoints').map((point: string, index: number) => 
                              <li key={index}>{point}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 2: Hotel Association Benefits */}
                  <AccordionItem value="association-benefits" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
                      <span className="text-sm md:text-base font-bold text-yellow-300 tracking-wide">
                        ② ¿QUÉ VENTAJAS OBTIENEN SUS HOTELES ASOCIADOS POR REGISTRARSE A TRAVÉS DE SU ASOCIACIÓN?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-white/3">
                      <div className="space-y-6 pt-4">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <h4 className="text-lg font-bold text-yellow-300 mb-6">
                            UNA SUMA IMPORTANTE DE BENEFICIOS
                          </h4>
                          <ul className="space-y-3 text-base text-white/90 leading-relaxed">
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Posicionamiento preferente en los resultados</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Publicación garantizada en 48 horas</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Ficha destacada visualmente</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Participación automática en campañas locales</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Etiqueta oficial de "hotel aliado"</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Derecho a feedback directo con el equipo de Hotel Living</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Inclusión en sorteos promocionales</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Onboarding asistido personalizado</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Revisión gratuita de su ficha</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Traducción prioritaria de su ficha a otros idiomas</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Beneficio acumulativo si refiere a otros hoteles (no pertenecientes a ninguna asociación)</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Acceso anticipado a nuevos módulos del sistema Hotel Living</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Para probar funciones antes de su lanzamiento oficial</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Atención prioritaria en soporte técnico y resolución de incidencias</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Acceso gratuito a formaciones exclusivas sobre optimización de estancias largas y revenue management para su equipo</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Una mención o publicación personalizada mensual (rotativa)</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Etiqueta de "Top Hotel Asociación" en su ficha durante los 3 primeros meses</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Mayor frecuencia de aparición en segmentos de afinidades personalizadas</span>
                            </li>
                            <li className="flex items-start space-x-3">
                              <span className="text-green-400 text-lg flex-shrink-0 mt-0.5">✅</span>
                              <span>Convocatoria preferente a encuentros o mesas redondas con otros hoteles aliados</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 3: Millions of Clients Waiting */}
                  <AccordionItem value="clients-waiting" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
                      <span className="text-sm md:text-base font-bold text-yellow-300 tracking-wide">
                        ③ {t('accordionSection2.title')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-white/3">
                      <div className="space-y-6 pt-4">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <p className="text-lg text-white/90 leading-relaxed mb-4">
                            {t('accordionSection2.introduction')}
                          </p>
                          <p className="text-lg font-semibold text-yellow-300 mb-6">
                            {t('accordionSection2.subtitle')}
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                            {getArrayTranslation('accordionSection2.points').map((point: string, index: number) => 
                              <li key={index}>{point}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 4: Potential Clients */}
                  <AccordionItem value="potential-clients" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
                      <span className="text-sm md:text-base font-bold text-yellow-300 tracking-wide">
                        ④ {t('accordionSection3.title')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-white/3">
                      <div className="space-y-6 pt-4">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed mb-6">
                            {getArrayTranslation('accordionSection3.clientTypes').map((type: string, index: number) => 
                              <li key={index}>{type}</li>
                            )}
                          </ul>
                          
                          <div className="border-t border-white/10 pt-6">
                            <p className="text-lg font-semibold text-yellow-300 mb-4">
                              {t('accordionSection3.commonFactor')}
                            </p>
                            <div className="space-y-3 text-base text-white/90 leading-relaxed mb-6">
                              <p>{t('accordionSection3.notAboutRenting')}</p>
                              <p><strong className="text-yellow-300">{t('accordionSection3.aboutLivingDifferent')}</strong></p>
                              <p>{t('accordionSection3.hotelSolution')}</p>
                              <p><strong className="text-yellow-300">{t('accordionSection3.hotelLivingChanges')}</strong></p>
                            </div>
                            
                            <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                              {getArrayTranslation('accordionSection3.features').map((feature: string, index: number) => 
                                <li key={index}>{feature}</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Section 5: Hotel Sector Crisis */}
                  <AccordionItem value="sector-crisis" className="bg-white/5 border border-white/20 rounded-xl overflow-hidden shadow-lg">
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-white/5 transition-colors duration-200">
                      <span className="text-sm md:text-base font-bold text-yellow-300 tracking-wide">
                        ⑤ {t('accordionSection4.title')}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 bg-white/3">
                      <div className="space-y-6 pt-4">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <div className="space-y-4">
                            <p className="text-lg text-white/90 leading-relaxed">
                              {t('accordionSection4.obsoleteModel')}
                            </p>
                            <p className="text-base text-white/80"><strong className="text-yellow-300">{t('accordionSection4.occupancyReality')}</strong></p>
                            <p className="text-lg font-semibold text-yellow-300">
                              {t('accordionSection4.emptyRooms')}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                              <div>
                                <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                                  {getArrayTranslation('accordionSection4.consequences').map((consequence: string, index: number) => 
                                    <li key={index}>{consequence}</li>
                                  )}
                                </ul>
                              </div>
                              
                              <div>
                                <p className="text-lg font-semibold text-yellow-300 mb-3">
                                  {t('accordionSection4.meanwhile')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-base text-white/80 leading-relaxed">
                                  {getArrayTranslation('accordionSection4.desires').map((desire: string, index: number) => 
                                    <li key={index}>{desire}</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="border-t border-white/10 pt-6 space-y-3 text-base text-white/90 leading-relaxed">
                              <p><strong className="text-yellow-300">{t('accordionSection4.emptyRoomOpportunity')}</strong></p>
                              <p>{t('accordionSection4.finalWarning')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* Call to Action Section */}
              <section className="text-center py-16">
                <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 backdrop-blur-sm rounded-2xl p-12 border border-purple-300/30 shadow-2xl">
                  <button className="bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-2xl transform hover:scale-105 border border-purple-400/30">
                    REGISTRE SU ASOCIACIÓN
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>;
}