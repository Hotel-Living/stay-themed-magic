
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelNewAccordionMenuES() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* Point 1 with sub-accordions */}
        <AccordionItem value="benefits" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              1 – LOS BENEFICIOS
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Accordion type="single" collapsible className="w-full space-y-1">
              <AccordionItem value="benefits-1-1" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  1.1 100% de ocupación todo el año
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Las tasas de ocupación pueden alcanzar el 100% durante todo el año</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Cero habitaciones vacías significa máximo beneficio</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Ocupación completa incluso durante períodos tradicionalmente lentos</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Flujo de ingresos constante sin mínimos estacionales</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="benefits-1-2" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  1.2 Menores costes operativos
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Solo un día laborable para todas las entradas/salidas. Cero huecos entre estancias</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Tasas de rotación reducidas significan menores costes de limpieza</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Estancias extendidas (8, 16, 24 y 32 días) reducen gastos operativos</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Procesos de check-in/out simplificados ahorran tiempo del personal</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="benefits-1-3" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  1.3 Mayor estabilidad del personal
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Ocupación constante = empleo durante todo el año</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Menor rotación de personal reduce costes de contratación y formación</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Mayor satisfacción de empleados con horarios estables</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="benefits-1-4" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  1.4 Ingresos añadidos de actividades temáticas
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Nuevas fuentes de ingresos a través de eventos especializados</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Oportunidades de merchandising vinculadas a temas del hotel</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Ofertas de servicios extendidos generan mayor gasto</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Point 2 with two-column layout */}
        <AccordionItem value="compare" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              2 – COMPARAR SISTEMAS
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3">MODELO TRADICIONAL</h4>
                <div className="space-y-2 text-[#e3d6e9]">
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Entradas/salidas constantes</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Más limpieza, lavandería, rotación</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Mayor carga de trabajo en recepción</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Ocupación impredecible</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Huecos entre reservas = Noches vacías = Beneficios perdidos</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Temporadas altas y bajas. El personal va y viene</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Personal desmotivado, no entrenable, no profesional</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Los huéspedes van y vienen. Sin conexión, sin lealtad</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Reservas frías, aisladas. Una tras otra</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2 flex-shrink-0"></span> Los apartamentos de alquiler ganan con precios más bajos</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3">MODELO HOTEL LIVING</h4>
                <div className="space-y-2 text-[#e3d6e9]">
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Días fijos de entrada/salida = Operaciones más fluidas</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Menos limpiezas, menos transiciones</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Recepción más eficiente y optimizada</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Estancias más largas = Mayor ocupación</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Cero noches vacías = Máximo beneficio</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Temporada alta todo el año. Personal estable</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Personal motivado, entrenable, profesional</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Los huéspedes se sienten como en casa y regresan</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> No solo reservas: comunidades</p>
                  <p className="flex items-start"><span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 mt-2 flex-shrink-0"></span> Elegancia. Humanidad. Servicios. Los hoteles ganan</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Point 3 */}
        <AccordionItem value="not-just-fill" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              3 – NO SOLO LLENAMOS HABITACIONES
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Personas agrupadas por afinidades</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Cero azar. 100% conexiones</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Hoteles para pertenecer, no solo para alojarse</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Estamos transformando la sociedad</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Point 4 with sub-accordions */}
        <AccordionItem value="profit-loss" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              4 – ¿CUÁNTO BENEFICIO SE ESTÁ PERDIENDO?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Accordion type="single" collapsible className="w-full space-y-1">
              <AccordionItem value="profit-4-1" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  4.1 Hoteles occidentales. ¿Cuántos beneficios perdemos cada año?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> $90.000 millones cada año, según las estimaciones más conservadoras</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> No es "facturación", sino ganancias puras, antes de impuestos</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> La tasa real media de ocupación hotelera occidental es del 50%</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="profit-4-2" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  4.2 ¿Y cuántos beneficios pierde su hotel cada año?
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> 5 habitaciones vacías = unos $55.000 perdidos anualmente</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> 20 habitaciones vacías = unos $220.000 de ganancia pura</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> 200 habitaciones cerradas octubre-mayo = más de $1 millón perdido + $420.000 en pérdidas</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> 500 habitaciones = más de $3 millones de ganancia perdida</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="profit-4-3" className="border border-fuchsia-400/10 rounded-md">
                <AccordionTrigger className="px-4 py-3 text-base font-medium text-[#e3d6e9]">
                  4.3 Sí. La gran mayoría de hoteles pierden su verdadero potencial
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-[#e3d6e9]">
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Las habitaciones vacías son nuestro oro sin explotar</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Pocos alcanzamos el 100% de ocupación todo el año</p>
                    <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Todos perdemos dinero, no importa el número de estrellas</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Points 5-11 continue with the rest of the content */}
        <AccordionItem value="affinity-hotels" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              5 – ¿QUÉ SON LOS HOTELES POR AFINIDADES?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4 text-[#e3d6e9]">
              <div>
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-2">Ejemplo 1</h4>
                <div className="space-y-1 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Hotel enfocado en tango, teatro o deportes (ciclismo, golf, tenis, etc.)</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Comunidad en torno a intereses comunes</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Sin huecos entre estancias. Sin pérdidas</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-2">Ejemplo 2</h4>
                <div className="space-y-1 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Hotel temático de cocina</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Chefs, clases, maridajes de vinos</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Tarifas premium, estancias más largas</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-2">Ejemplo 3</h4>
                <div className="space-y-1 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Hoteles de inmersión lingüística</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Huéspedes agrupados por nivel de idioma</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Personal que habla el idioma</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Experiencia lingüística completa</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="technology" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              6 – NUESTRA TECNOLOGÍA HACE LO QUE NINGUNA PUEDE
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Conecta personas con intereses compartidos</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Coordina entradas y salidas para cero huecos</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Optimiza estancias para máxima rentabilidad</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Una plataforma. Múltiples fuentes de ingresos</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Segmentación precisa por interés y afinidad</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Marketing a comunidades motivadas, no viajeros aleatorios</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Alcance global con targeting híper-específico</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Tasas de conversión más altas. Costes de adquisición más bajos</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="perfect-social" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              7 – HOTELES POR AFINIDADES = REDES SOCIALES PERFECTAS
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Los intereses compartidos crean conexiones instantáneas</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> La psicología grupal impulsa estancias más largas y visitas de retorno</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Las actividades temáticas aumentan el compromiso y la lealtad</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> La pertenencia comunitaria se vuelve adictiva</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="they-need-hotel" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              8 – ELLOS NECESITAN SU HOTEL
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4 text-[#e3d6e9]">
              <div>
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3">PORQUE EL 40% DE LA POBLACIÓN OCCIDENTAL:</h4>
                <div className="space-y-2 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Vive sola o en pareja</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Está pre-jubilada o jubilada</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Es trabajadora online</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Es estudiante que vive lejos de casa</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Vive demasiado lejos del trabajo</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3">Y LA MAYORÍA DE ELLOS:</h4>
                <div className="space-y-2 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Quisieran liberarse de las tareas domésticas</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Se sienten demasiado solos</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> No tienen vínculos familiares</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Desean ampliar su vida social</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Desean conocer personas con gustos y mentalidades similares</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Necesitan la seguridad completa de vivir en un hotel, especialmente en el caso de personas mayores o solteras</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#460F54]/30 to-[#300A38]/30 rounded-lg border border-fuchsia-400/20">
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3 text-center">PORQUE EL SUEÑO DE LA HUMANIDAD ES VIVIR EN UN HOTEL</h4>
                <div className="text-center space-y-2">
                  <p className="text-[#e3d6e9] font-medium">Con todo resuelto</p>
                  <p className="text-[#e3d6e9] font-medium">En unas vacaciones sin fin</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#FEF7CD] mb-3">Entonces, ¿por qué tenemos un 50% de habitaciones vacías cada año?</h4>
                <div className="space-y-2 pl-4">
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Porque las personas quieren socializar. Hacer amigos</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Quieren quedarse más tiempo en su hotel</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Quieren que usted se ocupe de sus tareas domésticas</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Necesitan urgentemente sus habitaciones vacías y sus servicios</p>
                  <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Ayúdeles: deles ambas cosas</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="affinities-revolution" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              9 – LAS AFINIDADES SON LA NUEVA REVOLUCIÓN SOCIAL
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Los huéspedes no solo quieren habitaciones: quieren sentido</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Los intereses conectan más rápido que los descuentos</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Las estancias temáticas generan fidelidad</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Los desconocidos se convierten en comunidades</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> No solo llenas habitaciones: generas pertenencia</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Atrae a los huéspedes adecuados</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Tu afinidad es tu imán</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Los hoteles con alma ganan el futuro</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="perfect-integration" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              10 – SOMOS INTEGRACIÓN PERFECTA
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> No tiene que elegir entre sistemas</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Combine ambos modelos como desee</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Comience con solo unas pocas habitaciones</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Amplíe según sea necesario</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Cambie más habitaciones cuando tenga sentido</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Plataforma que se integra sin esfuerzo</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Cero interrupciones diarias</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Nos adaptamos a usted, no al revés</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Esto es flexibilidad. Esto es rentabilidad</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Esto es Integración Perfecta</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="steps-to-join" className="border border-fuchsia-400/20 rounded-lg bg-gradient-to-r from-[#460F54]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
            <span className="text-xl font-medium text-[#FEF7CD] group-hover:text-white transition-colors">
              11 – PASOS PARA UNIRSE A HOTEL-LIVING
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3 text-[#e3d6e9]">
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Identifique habitaciones vacías (mínimo 8 días)</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Defina un concepto basado en afinidades</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Regístrese y use la calculadora en línea</p>
              <p className="flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5 flex-shrink-0"></span> Añada su hotel en el panel</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
