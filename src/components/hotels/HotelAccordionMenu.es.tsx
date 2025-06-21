
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { MenuItemText } from "./accordion/MenuItemText";
import { BenefitsSection } from "./accordion/sections/BenefitsSection";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";
import { StepsToJoinSection } from "./accordion/sections/StepsToJoinSection";
import { TheyNeedHotelSection } from "./accordion/sections/TheyNeedHotelSection";
import { SeamlessIntegrationSection } from "./accordion/sections/SeamlessIntegrationSection";
import { AffinitiesRevolutionSection } from "./accordion/sections/AffinitiesRevolutionSection";
import { DontJustFillRoomsSection } from "./accordion/sections/DontJustFillRoomsSection";
import { ComparisonTable } from "./accordion/ComparisonTable";

export function HotelAccordionMenuES() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {/* Section 1 */}
      <AccordionMenuItem value="benefits" title="1 – Beneficios Principales">
        <BenefitsSection />
      </AccordionMenuItem>

      {/* Section 2 */}
      <AccordionMenuItem value="models" title="2 – Comparativa Hotel vs Apartamento">
        <ComparisonTable />
      </AccordionMenuItem>

      {/* Section 3 */}
      <AccordionMenuItem value="revenue" title="3 – Su Nuevo Perfil de Ingresos">
        <ProfitSection />
      </AccordionMenuItem>

      {/* Section 4 */}
      <AccordionMenuItem value="guests" title="4 – Ellos Necesitan Su Hotel">
        <TheyNeedHotelSection />
      </AccordionMenuItem>

      {/* Section 5 */}
      <AccordionMenuItem value="affinities" title="5 – ¿Qué son los hoteles por afinidades?">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-fuchsia-200 mb-4">EJEMPLO 1</h3>
            <div className="space-y-2">
              <p className="text-white">– Su hotel está en una ciudad universitaria</p>
              <p className="text-white">– Usted decide especializarse en "estudiantes universitarios"</p>
              <p className="text-white">– Sus huéspedes permanecen 8, 16 o 24 días</p>
              <p className="text-white">– Ocupación garantizada durante todo el curso académico</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-fuchsia-200 mb-4">EJEMPLO 2</h3>
            <div className="space-y-2">
              <p className="text-white">– Su hotel está cerca de un hospital importante</p>
              <p className="text-white">– Usted decide especializarse en "familiares de pacientes"</p>
              <p className="text-white">– Sus huéspedes permanecen el tiempo que dure el tratamiento</p>
              <p className="text-white">– Demanda constante y predecible</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-fuchsia-200 mb-4">EJEMPLO 3</h3>
            <div className="space-y-2">
              <p className="text-white">– Su hotel está en una zona de teletrabajo</p>
              <p className="text-white">– Usted decide especializarse en "nómadas digitales"</p>
              <p className="text-white">– Sus huéspedes buscan estadías de 8 a 32 días</p>
              <p className="text-white">– Mercado creciente y bien remunerado</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-white italic">Los hoteles por afinidades transforman nichos específicos en fuentes de ingresos estables y predecibles.</p>
          </div>
        </div>
      </AccordionMenuItem>
    </Accordion>
  );
}
