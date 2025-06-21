import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenuES() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="hotel-living" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 – Hotel-Living = Apartamentos + Comunidad
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Más espacio que una habitación de hotel tradicional
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Cocina totalmente equipada
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Servicios de limpieza y mantenimiento incluidos
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Comunidad incorporada
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits-of-hotel-living" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2 – Beneficios para los huéspedes
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Flexibilidad de estadías prolongadas
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Comodidad y confort del hogar
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Oportunidades de socialización y networking
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Experiencias enriquecedoras y personalizadas
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits-for-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3 – Beneficios para los hoteles
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Mayor ocupación y rentabilidad
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Diversificación de ingresos
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Reducción de costos operativos
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Marketing y promoción diferenciados
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hotel-living-vs-traditional-hotels" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              4 – Hotel-Living vs Hoteles tradicionales
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Estancias más largas vs estancias cortas
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Mayor enfoque en la comunidad vs enfoque individual
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Servicios personalizados vs servicios estandarizados
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Experiencias únicas vs experiencias genéricas
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hotel-living-vs-apartments" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              5 – Hotel-Living vs Apartamentos
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Servicios y comodidades incluidos vs servicios adicionales
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Mayor flexibilidad de contrato vs contratos a largo plazo
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Comunidad y eventos organizados vs vida independiente
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Menos responsabilidades vs más responsabilidades
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hotel-living-vs-coliving" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              6 – Hotel-Living vs Co-living
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Mayor privacidad vs espacios compartidos
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Servicios de hotel vs servicios básicos
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Comunidad más amplia vs comunidad enfocada
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Mayor flexibilidad vs normas de convivencia
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hotel-living-revenue-models" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              7 – Modelos de ingresos de Hotel-Living
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Suscripciones mensuales o trimestrales
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Tarifas por noche para estancias cortas
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Venta de servicios adicionales
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Programas de fidelización y recompensas
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="affinity-hotels-social-networks" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              8 – Hoteles por afinidades = Redes Sociales Perfectas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Los intereses compartidos crean conexiones instantáneas
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                La psicología grupal impulsa estancias más largas y visitas de retorno
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Las actividades temáticas aumentan el compromiso y la lealtad
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                La pertenencia comunitaria se vuelve adictiva
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
