import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections";
import { ProfitSection } from "./accordion/sections/ProfitSection";

export function HotelAccordionMenuES() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 - Los Beneficios
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <BenefitsSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2 - Comparar Sistemas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3 - No solo llenamos habitaciones
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Personas agrupadas por afinidades
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Cero azar. 100% conexiones
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Hoteles para pertenecer, no solo para alojarse
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Estamos transformando la sociedad
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="how-much-profit-missing" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4 - ¿Cuánto beneficio estás perdiendo?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ProfitSection />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="specialized-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5 - Hoteles Especializados
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg text-[#FFF9B0]">Hoteles Pet-Friendly</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Bienvenidas las mascotas</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Amenidades especiales para mascotas</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">Hoteles de Bienestar</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Instalaciones de spa y fitness</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Opciones de comida saludable</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="our-technology" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              6 - Nuestra Tecnología
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Sistema de reservas avanzado
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Actualizaciones de disponibilidad en tiempo real
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
