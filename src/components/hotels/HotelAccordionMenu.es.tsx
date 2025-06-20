
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenuES() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 - Los beneficios
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">100% de ocupación todo el año</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Las tasas de ocupación pueden alcanzar el 100% durante todo el año
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Cero habitaciones vacías significa máximo beneficio
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ocupación completa incluso durante períodos tradicionalmente lentos
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Flujo de ingresos constante sin mínimos estacionales
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Menores costes operativos</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Solo un día laborable para todas las entradas/salidas. Cero huecos entre estancias
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Tasas de rotación reducidas significan menores costes de limpieza
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Estancias extendidas (8, 16, 24 y 32 días) reducen gastos operativos
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Procesos de check-in/out simplificados ahorran tiempo del personal
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Mayor estabilidad del personal</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ocupación constante = empleo durante todo el año
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Menor rotación de personal reduce costes de contratación y formación
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Mayor satisfacción de empleados con horarios estables
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Ingresos añadidos de actividades temáticas</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Nuevas fuentes de ingresos a través de eventos especializados
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Oportunidades de merchandising vinculadas a temas del hotel
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Ofertas de servicios extendidos generan mayor gasto
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2 – Comparamos sistemas
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="grid md:grid-cols-2 gap-6 py-6">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-red-300 text-center">MODELO TRADICIONAL</h4>
                <div className="space-y-3">
                  <p className="text-sm text-red-200">• Entradas/salidas constantes</p>
                  <p className="text-sm text-red-200">• Más limpieza, lavandería, rotación</p>
                  <p className="text-sm text-red-200">• Mayor carga de trabajo en recepción</p>
                  <p className="text-sm text-red-200">• Ocupación impredecible</p>
                  <p className="text-sm text-red-200">• Huecos entre reservas = Noches vacías = Beneficio perdido</p>
                  <p className="text-sm text-red-200">• Temporadas altas y bajas. El personal entra y sale</p>
                  <p className="text-sm text-red-200">• Personal desmotivado, sin formación, sin profesionalidad</p>
                  <p className="text-sm text-red-200">• Los huéspedes van y vienen. Sin conexión, sin fidelidad</p>
                  <p className="text-sm text-red-200">• Reservas frías, aisladas. Una tras otra</p>
                  <p className="text-sm text-red-200">• Los apartamentos ganan por precio más bajo</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-green-300 text-center">MODELO HOTEL LIVING</h4>
                <div className="space-y-3">
                  <p className="text-sm text-green-200">• Entradas/salidas fijas = Operación fluida</p>
                  <p className="text-sm text-green-200">• Menos limpieza, menos rotación</p>
                  <p className="text-sm text-green-200">• Recepción más eficiente y optimizada</p>
                  <p className="text-sm text-green-200">• Estancias largas = Más ocupación</p>
                  <p className="text-sm text-green-200">• Cero noches vacías = Máximo beneficio</p>
                  <p className="text-sm text-green-200">• Alta ocupación todo el año. Personal estable</p>
                  <p className="text-sm text-green-200">• Personal motivado, capacitado, profesional</p>
                  <p className="text-sm text-green-200">• Huéspedes se sienten en casa y repiten</p>
                  <p className="text-sm text-green-200">• No solo reservas: comunidades</p>
                  <p className="text-sm text-green-200">• Elegancia. Humanidad. Servicios. Ganan los hoteles</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3 – No solo llenamos habitaciones
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
        
        {/* Continue with remaining accordion items following the same pattern */}
        
      </Accordion>
    </div>
  );
}
