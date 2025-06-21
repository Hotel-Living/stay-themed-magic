
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { CollapsibleMenuItem } from "./accordion/CollapsibleMenuItem";
import { ProfitSection } from "./accordion/sections/ProfitSection";
import { SpecialMenuItems } from "./accordion/sections/SpecialMenuItems";

export const HotelAccordionMenuES: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      <CollapsibleMenuItem title="1 - Introducción: Hotel-Living presenta una Revolución Hotelera">
        <div className="space-y-4 text-left py-6">
          <p className="text-base">
            Hotel-Living es la primera plataforma que conecta a huéspedes de larga estancia con hoteles que ofrecen <span className="font-semibold">habitaciones mensuales</span>.
          </p>
          <p className="text-base">
            Somos mucho más que una plataforma de reservas: somos <span className="font-semibold">el puente hacia el futuro del turismo</span>, donde la vida nómada, la flexibilidad y la autenticidad cultural se encuentran.
          </p>
          <p className="text-base">
            Nuestro enfoque revolucionario transforma habitaciones vacías en <span className="font-semibold">ingresos constantes y predecibles</span>, mientras creamos una nueva categoría de experiencias de viaje.
          </p>
          <p className="text-base">
            Hotel-Living no solo llena habitaciones: <span className="font-semibold">redefine el concepto de hospitalidad</span> para una nueva generación de viajeros conscientes.
          </p>
        </div>
      </CollapsibleMenuItem>

      <CollapsibleMenuItem title="2 - ¿Por qué los huéspedes necesitan Hotel-Living?">
        <div className="space-y-6 text-left py-6">
          <p className="text-base font-semibold">2.1 – HUÉSPEDES DE LARGA ESTANCIA: UN MERCADO EN EXPLOSIVO CRECIMIENTO</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Nómadas digitales: 15.5 millones a nivel mundial (crecimiento del 131% desde 2019)</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Jubilados viajeros: 76 millones en Europa y Norteamérica</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Profesionales en movilidad: 45 millones buscan estancias mensuales</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estudiantes internacionales: 6.4 millones necesitan alojamiento flexible</p>
          <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Trabajadores temporales: 32 millones requieren estancias de 1-6 meses</p>
          
          <p className="text-base font-semibold mt-14">2.2 – ¿POR QUÉ LOS HUÉSPEDES NO ENCUENTRAN LO QUE BUSCAN?</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Airbnb se cenfica en estancias cortas, no ofrece servicios hoteleros</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Booking.com penaliza las reservas largas con precios prohibitivos</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los apartamentos turísticos carecen de servicios diarios</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los alquileres tradicionales exigen contratos anuales</p>
          <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No existe una plataforma especializada en estancias mensuales con servicios premium</p>
          
          <p className="text-base font-semibold mt-14">2.3 – HOTEL-LIVING: LA SOLUCIÓN QUE EL MERCADO ESPERABA</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Especialización exclusiva en estancias de 8+ días</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Servicios hoteleros completos incluidos en el precio</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Flexibilidad total: sin contratos anuales ni depósitos abusivos</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Experiencias personalizadas basadas en afinidades culturales</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Red global de hoteles verificados y de calidad</p>
        </div>
      </CollapsibleMenuItem>

      <CollapsibleMenuItem title="3 - ¿Por qué los hoteles necesitan Hotel-Living?">
        <div className="space-y-6 text-left py-6">
          <p className="text-base font-semibold">3.1 – LA CRISIS INVISIBLE DE LA INDUSTRIA HOTELERA</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación media mundial: solo 58-65% anual</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 35-40% de habitaciones permanecen vacías cada noche</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Temporada baja: pérdidas de hasta 70% en ocupación</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Dependencias estacionales extremas generan inestabilidad financiera</p>
          <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Costos fijos permanentes vs. ingresos variables impredecibles</p>
          
          <p className="text-base font-semibold mt-14">3.2 – ¿POR QUE LAS PLATAFORMAS ACTUALES NO FUNCIONAN PARA HOTELES?</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Booking.com y Expedia cobran comisiones del 15-25%</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Airbnb no está diseñado para hoteles ni servicios profesionales</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Enfoque en estancias cortas de 1-3 noches</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No ofrecen herramientas para huéspedes de larga estancia</p>
          <p className="text-base flex items-start pl-4 mb-6"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Competencia feroz por el mismo segmento de mercado saturado</p>
          
          <p className="text-base font-semibold mt-14">3.3 – HOTEL-LIVING: LA OPORTUNIDAD DORADA PARA HOTELES</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Acceso a un mercado de 180+ millones de viajeros de larga estancia</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ingresos predecibles y estables durante todo el año</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Menor rotación = menores costos operativos</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Diferenciación clara en un océano azul sin competencia</p>
          <p className="text-base flex items-start pl-4"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Comisiones competitivas que permiten mayor rentabilidad</p>
        </div>
      </CollapsibleMenuItem>

      <CollapsibleMenuItem title="4 - ¿Cuántos beneficios está perdiendo?">
        <ProfitSection />
      </CollapsibleMenuItem>

      <SpecialMenuItems startingNumber={5} />
    </Accordion>
  );
};
