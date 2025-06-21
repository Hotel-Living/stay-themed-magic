import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";
import { StepsToJoinSection } from "./accordion/sections/StepsToJoinSection";
import { TheyNeedHotelSection } from "./accordion/sections/TheyNeedHotelSection";
import { SeamlessIntegrationSection } from "./accordion/sections/SeamlessIntegrationSection";
import { AffinitiesRevolutionSection } from "./accordion/sections/AffinitiesRevolutionSection";
import { DontJustFillRoomsSection } from "./accordion/sections/DontJustFillRoomsSection";

export function HotelAccordionMenuES() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {/* Section 1 */}
      <AccordionItem value="benefits" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          1 - Los beneficios de ser Hotel-Living
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <BenefitsSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 2 */}
      <AccordionItem value="revolution" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          2 - Revolución de las afinidades
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <AffinitiesRevolutionSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 3 */}
      <AccordionItem value="profit" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          3 - Ganancias extraordinarias
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <ProfitSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 4 */}
      <AccordionItem value="they-need" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          4 - Ellos necesitan tu hotel
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <TheyNeedHotelSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 5 */}
      <AccordionItem value="integration" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          5 - Integración perfecta
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <SeamlessIntegrationSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 6 - Updated content */}
      <AccordionItem value="segmentation" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          6 – Inigualable segmentación hotelera
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <div className="space-y-4 text-left py-6">
            <p className="text-lg text-[#FFF9B0] font-semibold">• Marketing dirigido que nadie más puede igualar</p>
            <p className="text-lg text-[#FFF9B0] font-semibold">• Segmentación precisa por interés y afinidad</p>
            <p className="text-lg text-[#FFF9B0] font-semibold">• Marketing a comunidades motivadas, no viajeros aleatorios</p>
            <p className="text-lg text-[#FFF9B0] font-semibold">• Alcance global con targeting híper-específico</p>
            <p className="text-lg text-[#FFF9B0] font-semibold">• Tasas de conversión más altas. Costes de adquisición más bajos</p>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Section 7 */}
      <AccordionItem value="fill-rooms" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          7 - No solo llenes habitaciones
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <DontJustFillRoomsSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 8 */}
      <AccordionItem value="special-items" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          8 - Elementos especiales del menú
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <SpecialMenuItems />
        </AccordionContent>
      </AccordionItem>

      {/* Section 9 */}
      <AccordionItem value="steps" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          9 - Pasos para unirse
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <StepsToJoinSection />
        </AccordionContent>
      </AccordionItem>

      {/* Section 10 */}
      <AccordionItem value="contact" className="border-none mb-4">
        <AccordionTrigger className="hover:no-underline text-left text-xl font-bold text-[#FFF9B0] hover:text-white transition-colors duration-200 px-6 py-4 bg-gradient-to-r from-[#8B1FA9] to-[#A855F7] rounded-t-xl border-l-6 border-[#FFF9B0]/50">
          10 - Contacto
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
          <div className="space-y-6 text-center py-6">
            <p className="text-lg text-[#FFF9B0] font-semibold">
              ¿Listo para revolucionar tu hotel?
            </p>
            <p className="text-base text-white/90">
              Contáctanos hoy para comenzar tu transformación hacia Hotel-Living
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:contact@hotel-living.com" 
                className="bg-gradient-to-r from-[#FFF9B0] to-[#F0E68C] text-[#8B1FA9] px-6 py-3 rounded-lg font-bold hover:from-[#F0E68C] to-[#FFF9B0] transition-all duration-200 transform hover:scale-105"
              >
                Enviar Email
              </a>
              <a 
                href="tel:+1234567890" 
                className="border-2 border-[#FFF9B0] text-[#FFF9B0] px-6 py-3 rounded-lg font-bold hover:bg-[#FFF9B0] hover:text-[#8B1FA9] transition-all duration-200 transform hover:scale-105"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
