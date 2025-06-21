
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { TheyNeedHotelSection } from "./accordion/sections/TheyNeedHotelSection";
import { SeamlessIntegrationSection } from "./accordion/sections/SeamlessIntegrationSection";
import { AffinitiesRevolutionSection } from "./accordion/sections/AffinitiesRevolutionSection";
import { DontJustFillRoomsSection } from "./accordion/sections/DontJustFillRoomsSection";
import { StepsToJoinSection } from "./accordion/sections/StepsToJoinSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenuES() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Section 1 */}
      <AccordionItem value="benefits" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          1 - Los Beneficios
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <BenefitsSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 2 */}
      <AccordionItem value="compare" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          2 - Comparar Sistemas
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <ComparisonTable />
        </AccordionContent>
      </AccordionItem>

      {/* Section 3 */}
      <AccordionItem value="fill-rooms" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          3 - No solo llenamos habitaciones
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <div className="space-y-6 text-left py-6">
            <p className="text-xl text-[#FFF9B0] font-bold">• Personas agrupadas por afinidades</p>
            <p className="text-xl text-[#FFF9B0] font-bold">• Cero azar. 100% conexiones</p>
            <p className="text-xl text-[#FFF9B0] font-bold">• Hoteles para pertenecer, no solo para alojarse</p>
            <p className="text-xl text-[#FFF9B0] font-bold">• Estamos transformando la sociedad</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Section 4 */}
      <AccordionItem value="profits" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          4 - ¿Cuánto beneficio estás perdiendo?
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <div className="space-y-8 text-left py-6">
            {/* Section 4.1 */}
            <div className="space-y-4">
              <p className="text-lg font-bold text-[#FFF9B0]">4.1 - Solo el 30% de ocupación anual</p>
              <div className="space-y-2 pl-4">
                <p className="text-base text-[#FFF9B0]">• Los hoteles tradicionales solo alcanzan el 30% de ocupación anual</p>
                <p className="text-base text-[#FFF9B0]">• Esto significa que el 70% del tiempo están perdiendo dinero</p>
                <p className="text-base text-[#FFF9B0]">• Con nosotros: 100% de ocupación todo el año</p>
                <p className="text-base text-[#FFF9B0]">• Eliminamos completamente la estacionalidad</p>
              </div>
            </div>

            {/* Section 4.2 */}
            <div className="space-y-4">
              <p className="text-lg font-bold text-[#FFF9B0]">4.2 - Millones perdidos por apartamentos</p>
              <div className="space-y-2 pl-4">
                <p className="text-base text-[#FFF9B0]">• Los apartamentos capturan el 70% del mercado de estancias largas</p>
                <p className="text-base text-[#FFF9B0]">• Esos clientes deberían estar en hoteles</p>
                <p className="text-base text-[#FFF9B0]">• Representan millones en ingresos perdidos</p>
                <p className="text-base text-[#FFF9B0]">• Nosotros los recuperamos para ti</p>
              </div>
            </div>

            {/* Section 4.3 */}
            <div className="space-y-4">
              <p className="text-lg font-bold text-[#FFF9B0]">4.3 - Costes operativos disparados</p>
              <div className="space-y-2 pl-4">
                <p className="text-base text-[#FFF9B0]">• Personal contratado y despedido constantemente</p>
                <p className="text-base text-[#FFF9B0]">• Costes de formación repetidos</p>
                <p className="text-base text-[#FFF9B0]">• Ineficiencias por falta de experiencia del equipo</p>
                <p className="text-base text-[#FFF9B0]">• Con ocupación constante: equipo estable y eficiente</p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Section 5 */}
      <AccordionItem value="specialized" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          5 - ¿Qué son los hoteles por afinidades?
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <div className="space-y-6 text-left py-6">
            <p className="text-base font-semibold text-[#FFF9B0]">EJEMPLO 1</p>
            <p className="text-base text-[#FFF9B0]">- Imagina un hotel enfocado en deportes - ciclismo, golf, tenis, etc.</p>
            <p className="text-base text-[#FFF9B0]">- Las personas interesadas en ese deporte reservan juntas</p>
            <p className="text-base text-[#FFF9B0]">- Se forma una comunidad en torno a intereses comunes</p>
            <p className="text-base text-[#FFF9B0] mb-6">- Sin huecos entre estancias. Sin pérdidas</p>
            
            <p className="text-base font-semibold text-[#FFF9B0] mt-8">EJEMPLO 2</p>
            <p className="text-base text-[#FFF9B0]">- Considera un hotel temático de cocina</p>
            <p className="text-base text-[#FFF9B0]">- Chefs, clases de cocina, maridajes de vinos, etc.</p>
            <p className="text-base text-[#FFF9B0]">- Tarifas premium por experiencias especializadas</p>
            <p className="text-base text-[#FFF9B0] mb-6">- Ocupación completa con estancias promedio más largas</p>
            
            <p className="text-base font-semibold text-[#FFF9B0] mt-8">EJEMPLO 3</p>
            <p className="text-base text-[#FFF9B0]">- Hoteles de inmersión lingüística</p>
            <p className="text-base text-[#FFF9B0]">- Huéspedes de nivel de idioma similar agrupados juntos</p>
            <p className="text-base text-[#FFF9B0]">- El personal habla el idioma objetivo</p>
            <p className="text-base text-[#FFF9B0] mb-6">- Experiencia lingüística completa</p>
            
            <p className="text-base italic text-[#FFF9B0] mt-8">Estos hoteles especializados crean experiencias comunitarias poderosas mientras mantienen ingresos estables y previsibles.</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Section 6 */}
      <AccordionItem value="technology" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          6 - Nuestra Tecnología
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <SeamlessIntegrationSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 7 */}
      <AccordionItem value="guests" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          7 - Los clientes que ya tienes
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <AffinitiesRevolutionSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 8 */}
      <AccordionItem value="operation" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          8 - No te limites a llenar habitaciones
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <DontJustFillRoomsSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 9 */}
      <AccordionItem value="steps" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          9 - Pasos para unirte
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <StepsToJoinSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 10 */}
      <AccordionItem value="menu" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          10 - Menú de Servicios Especiales
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <SpecialMenuItems startingNumber={5} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
