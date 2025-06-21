
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections";

export function HotelAccordionMenuES() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  const handleItemToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        <AccordionItem value="benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1-   Los beneficios de formar parte de nuestra red
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Acceso exclusivo a nuestra plataforma tecnológica</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Marketing dirigido a comunidades específicas</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación garantizada sin espacios vacíos</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Precios premium por experiencias especializadas</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="models" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2-   Modelos de colaboración disponibles
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo de comisión por reserva</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo de tarifa fija mensual</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Modelo híbrido personalizado</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Opciones de integración completa</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="revenue" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3-   Maximización de ingresos garantizada
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Algoritmos de optimización de precios</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordinación perfecta de llegadas y salidas</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Eliminación de períodos vacíos</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Rentabilidad superior al modelo tradicional</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="guests" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4-   Huéspedes de mayor calidad
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Filtro automático de huéspedes por afinidades</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estancias más largas y repetidas</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Menor rotación y mayor satisfacción</p>
              <p className="text-base flex items-start text-[#FFF9B0]"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Comunidades auto-reguladas</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="specialized-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5 – ¿Qué son los hoteles por afinidades?
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg font-semibold text-[#FFF9B0]">EJEMPLO 1</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Hotel para emprendedores en Barcelona</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Espacios de coworking, networking events</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Comunidad de startups y empresarios</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Ocupación completa, estancias largas</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EJEMPLO 2</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Hotel para amantes de la naturaleza en Costa Rica</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Tours ecológicos, actividades sostenibles</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Huéspedes comprometidos con el medio ambiente</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Precios premium por experiencias únicas</p>
              
              <p className="text-lg font-semibold mt-6 text-[#FFF9B0]">EJEMPLO 3</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Hotel para artistas en París</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Talleres creativos, exposiciones</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Comunidad artística colaborativa</p>
              <p className="text-base flex items-start pl-4 text-[#FFF9B0]">- Experiencia cultural inmersiva</p>
              
              <p className="text-base italic mt-4 text-[#FFF9B0]">Los hoteles especializados crean experiencias comunitarias poderosas mientras mantienen ingresos estables y predecibles</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              Comparar Sistemas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <ComparisonTable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
