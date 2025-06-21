
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { MenuItemText } from "./accordion/MenuItemText";
import { AccordionMenuItem } from "./accordion/AccordionMenuItem";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export function HotelAccordionMenuES() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {/* Benefit 1 */}
      <AccordionMenuItem value="benefit-1" title="1-   Beneficios únicos de unirse a nosotros">
        <MenuItemText items={[
          "Ingresos garantizados. Pagos seguros. Ocupación asegurada.",
          "Ocupación completa durante todo el año.",
          "Tasas de ocupación más altas que los hoteles tradicionales.",
          "Menos gastos de marketing y publicidad.",
          "Facturación 3 veces mayor que los hoteles tradicionales.",
          "Ideal para hoteles de cualquier tamaño.",
          "Sin riesgo ni obligación de exclusividad."
        ]} />
      </AccordionMenuItem>

      {/* Benefit 2 */}
      <AccordionMenuItem value="benefit-2" title="2-   Huéspedes ideales para tu hotel">
        <MenuItemText items={[
          "Personas educadas y confiables.",
          "Estancias prolongadas (desde 1 mes).",
          "Personas con ingresos estables.",
          "Huéspedes que cuidan las instalaciones.",
          "Comunidad autoorganizada.",
          "Menos trabajo para el personal del hotel.",
          "Ambiente más relajado y profesional."
        ]} />
      </AccordionMenuItem>

      {/* Benefit 3 */}
      <AccordionMenuItem value="benefit-3" title="3-   Nuestra revolucionaria tecnología">
        <MenuItemText items={[
          "Algoritmos de inteligencia artificial.",
          "Optimización automática de precios.",
          "Gestión inteligente de reservas.",
          "Análisis predictivo de ocupación.",
          "Integración perfecta con sistemas existentes.",
          "Soporte técnico especializado 24/7.",
          "Actualizaciones automáticas sin interrupciones."
        ]} />
      </AccordionMenuItem>

      {/* Benefit 4 */}
      <AccordionMenuItem value="benefit-4" title="4-   Proceso de incorporación simple">
        <MenuItemText items={[
          "Registro gratuito en línea.",
          "Configuración automática del sistema.",
          "Capacitación completa para el personal.",
          "Integración con sistemas existentes.",
          "Soporte técnico durante la transición.",
          "Prueba sin riesgo durante 30 días.",
          "Comienza a recibir huéspedes inmediatamente."
        ]} />
      </AccordionMenuItem>

      {/* Benefit 5 - Updated content */}
      <AccordionMenuItem value="specialized-hotels" title="5 –   ¿Qué son los hoteles por afinidades?">
        <div className="space-y-3 text-left py-4">
          <p className="text-lg font-semibold">EJEMPLO 1</p>
          <p className="text-base flex items-start pl-4">- Imagina un hotel enfocado en deportes - ciclismo, golf, tenis, etc.</p>
          <p className="text-base flex items-start pl-4">- Personas interesadas en ese deporte reservan juntas</p>
          <p className="text-base flex items-start pl-4">- Se forma una comunidad alrededor de intereses comunes</p>
          <p className="text-base flex items-start pl-4">- No hay brechas entre estancias. No hay pérdidas</p>
          
          <p className="text-lg font-semibold mt-6">EJEMPLO 2</p>
          <p className="text-base flex items-start pl-4">- Considera un hotel temático de cocina</p>
          <p className="text-base flex items-start pl-4">- Chefs, clases de cocina, maridajes de vinos, etc.</p>
          <p className="text-base flex items-start pl-4">- Tarifas premium por experiencias especializadas</p>
          <p className="text-base flex items-start pl-4">- Ocupación completa con estancias promedio más largas</p>
          
          <p className="text-lg font-semibold mt-6">EJEMPLO 3</p>
          <p className="text-base flex items-start pl-4">- Hoteles de inmersión de idiomas</p>
          <p className="text-base flex items-start pl-4">- Huéspedes de nivel de idioma similar agrupados</p>
          <p className="text-base flex items-start pl-4">- El personal habla el idioma objetivo</p>
          <p className="text-base flex items-start pl-4">- Experiencia lingüística completa</p>
          
          <p className="text-base italic mt-4">Estos hoteles especializados crean poderosas experiencias comunitarias mientras mantienen ingresos estables y predecibles</p>
        </div>
      </AccordionMenuItem>

      {/* Special menu items for items 6-9 */}
      <SpecialMenuItems startingNumber={6} />
    </Accordion>
  );
}
