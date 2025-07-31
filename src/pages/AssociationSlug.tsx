import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { AssociationMiniCalculator } from "@/components/association/AssociationMiniCalculator";
import { AssociationSlogans } from "@/components/association/AssociationSlogans";
import { AssociationBenefits } from "@/components/association/AssociationBenefits";
import { AssociationOffers } from "@/components/association/AssociationOffers";
import { AssociationAccordion } from "@/components/association/AssociationAccordion";
import { AssociationDisclaimer } from "@/components/association/AssociationDisclaimer";

export default function AssociationSlug() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('associationSlug');

  // Function to format association name from slug
  const formatAssociationName = (slug?: string): string => {
    if (!slug) {
      return t('fallbackAssociation', 'Estimada Asociación');
    }

    // Replace hyphens with spaces and capitalize each word
    const formatted = slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return formatted;
  };

  const associationName = formatAssociationName(slug);

  return (
    <div className="relative min-h-screen">
      {/* Starfield Background - same style as /ambassador */}
      <div className="fixed inset-0 z-0">
        <Starfield />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/40 to-fuchsia-900/40"></div>
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-fuchsia-400/15 rounded-full blur-[80px] animate-pulse delay-2000"></div>
      </div>

      {/* Header Navigation */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-6xl mx-auto">
            
            {/* 1️⃣ Personalized Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <img 
                  src="/lovable-uploads/950ed52a-c737-4637-9751-d6f1db78b7b4.png" 
                  alt="Hotel-Living Logo" 
                  loading="eager" 
                  fetchPriority="high" 
                  className="h-20 md:h-24 drop-shadow-lg" 
                />
              </div>
              
              <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                  Estimada {associationName}
                </h1>
                
                <h2 className="text-xl md:text-2xl font-bold text-yellow-300 leading-relaxed">
                  ¿Cuánto dinero pierden cada año ustedes y sus hoteles por tantas habitaciones vacías?
                </h2>
              </div>
            </div>

            {/* 2️⃣ Mini Calculator */}
            <div className="mb-16">
              <AssociationMiniCalculator />
            </div>

            {/* 3️⃣ Slogans */}
            <div className="mb-16">
              <AssociationSlogans />
            </div>

            {/* 4️⃣ Benefits for Members */}
            <div className="mb-16">
              <AssociationBenefits />
            </div>

            {/* 5️⃣ What We Offer */}
            <div className="mb-16">
              <AssociationOffers />
            </div>

            {/* 6️⃣ Accordion Menu */}
            <div className="mb-16">
              <AssociationAccordion />
            </div>

            {/* 7️⃣ Society Has Changed Section */}
            <div className="mb-16">
              <div className="bg-[#7802A9] backdrop-blur-md rounded-2xl p-8 md:p-12 border border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.4)]">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-300 uppercase tracking-wide mb-8">
                    LA SOCIEDAD HA CAMBIADO. NUESTRO MODELO NO.
                  </h3>
                  <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                    <p>
                      Como es sabido Las grandes cadenas hoteleras (Hyatt, Marriott, Hilton, Accor, IHG, Radisson y muchas
                      más) hace ya años que están rentabilizando y ampliando el nuevo modelo social que nuestra sociedad va
                      imponiendo: las estancias residenciales en hoteles, de media y larga duración.
                    </p>
                    <h4 className="text-xl font-bold text-yellow-300 uppercase tracking-wide">
                      ¿SÓLO PARA LAS GRANDES CADENAS HOTELERAS?
                    </h4>
                    <p>
                      Mientras estas expanden sin cesar sus modelos residenciales, centenares de miles de pequeños hoteles
                      independientes y cadenas pequeñas o medianas no han podido rentabilizar hasta ahora este modelo, ni
                      acceder a sus inmensos beneficios, por falta de una herramienta común especializada y accesible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8️⃣ Legal Disclaimer */}
            <AssociationDisclaimer />

          </div>
        </div>
      </div>
    </div>
  );
}