
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { comparisonItems } from "./accordion/comparisonData";
import { BenefitsSection, ProfitSection, DontJustFillRoomsSection, AffinitiesRevolutionSection, TheyNeedHotelSection, SeamlessIntegrationSection, StepsToJoinSection } from "./accordion/sections";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenu() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  return <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1-   Los beneficios
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2-   Comparemos sistemas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable items={comparisonItems} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3-   No solo llenamos habitaciones
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <DontJustFillRoomsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="how-much-profit-missing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4-   ¿Cuántos beneficios estamos perdiendo?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ProfitSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="specialized-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5-   ¿Qué son los hoteles por afinidades?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg text-[#FFF9B0]">EJEMPLO 1</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Imagina un hotel enfocado en deportes - ciclismo, golf, tenis, etc.</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Las personas interesadas en ese deporte reservan juntas</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Se forma una comunidad en torno a intereses comunes</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Sin huecos entre estancias. Sin pérdidas</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EJEMPLO 2</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Considera un hotel temático de cocina</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Chefs, clases de cocina, maridajes de vinos, etc.</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Tarifas premium por experiencias especializadas</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Ocupación completa con estancias promedio más largas</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EJEMPLO 3</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Hoteles de inmersión lingüística</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Huéspedes de nivel de idioma similar agrupados juntos</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- El personal habla el idioma objetivo</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Experiencia lingüística completa</p>
              
              <p className="text-base italic mt-4 text-[#FFF9B0]">Estos hoteles especializados crean experiencias comunitarias poderosas mientras mantienen ingresos estables y predecibles</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="our-technology" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              6-   Nuestra tecnología hace lo que otros no pueden
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Conecta personas con intereses compartidos</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordina llegadas y salidas para cero huecos</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Optimiza estancias para máxima rentabilidad</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Una plataforma. Múltiples fuentes de ingresos</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="targeted-marketing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              7-   Marketing dirigido que nadie más puede igualar
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Segmentación de precisión por interés y afinidad</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Marketing a comunidades motivadas, no viajeros aleatorios</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Alcance global con enfoque hiper-específico</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tasas de conversión más altas. Costes de adquisición más bajos</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themed-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              8-   Hoteles por afinidades = Redes Sociales Perfectas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los intereses compartidos crean conexiones instantáneas</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La psicología grupal impulsa estancias más largas y retornos</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las actividades temáticas aumentan el compromiso y la lealtad</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La pertenencia comunitaria se vuelve adictiva</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="they-need-hotel" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              9-   Ellos necesitan su hotel
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <TheyNeedHotelSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="themes-revolution" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              10-   Las afinidades son la nueva revolución social
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <AffinitiesRevolutionSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="seamless-integration" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              11-   Somos integración perfecta
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <SeamlessIntegrationSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="steps-to-join" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              12-   Pasos para unirse a Hotel-Living
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <StepsToJoinSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>;
}
