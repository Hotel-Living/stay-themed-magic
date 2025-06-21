
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CollapsibleMenuItem } from "./accordion/CollapsibleMenuItem";
import { ComparisonTable } from "./accordion/ComparisonTable";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";
import { StepsToJoinSection } from "./accordion/sections/StepsToJoinSection";
import { TheyNeedHotelSection } from "./accordion/sections/TheyNeedHotelSection";
import { SeamlessIntegrationSection } from "./accordion/sections/SeamlessIntegrationSection";
import { AffinitiesRevolutionSection } from "./accordion/sections/AffinitiesRevolutionSection";
import { DontJustFillRoomsSection } from "./accordion/sections/DontJustFillRoomsSection";
import { MenuItemText } from "./accordion/MenuItemText";

export const HotelAccordionMenuES = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      <AccordionItem value="item-1" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          1 – ¿Por qué los hoteles necesitan Hotel-Living?
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <TheyNeedHotelSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          2 – Beneficios para hoteles
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <BenefitsSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          3 – Ganancias garantizadas
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <ProfitSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          4 – No sólo llenas habitaciones… ¡Creas comunidades!
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <DontJustFillRoomsSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          5 – Hoteles tradicionales vs. Hotel-Living
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <ComparisonTable />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          6 – Integración perfecta
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <SeamlessIntegrationSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          7 – Revolución de las afinidades
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <AffinitiesRevolutionSection />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          8 – Hoteles por afinidades = Redes Sociales Perfectas
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <MenuItemText items={[
            "• Los intereses compartidos crean conexiones instantáneas",
            "• La psicología grupal impulsa estancias más largas y visitas de retorno",
            "• Las actividades temáticas aumentan el compromiso y la lealtad",
            "• La pertenencia comunitaria se vuelve adictiva"
          ]} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          9 – Ofertas especiales de lanzamiento
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <SpecialMenuItems />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10" className="border-b border-fuchsia-400/30 mb-1">
        <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
          10 – Pasos para unirse
        </AccordionTrigger>
        <AccordionContent className="text-white space-y-4 pt-4 pb-2">
          <StepsToJoinSection />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HotelAccordionMenuES;
