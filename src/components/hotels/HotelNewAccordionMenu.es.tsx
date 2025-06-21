
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelNewAccordionMenuES() {
  return (
    <div className="max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60 z-20 mb-8">
      <Accordion type="single" collapsible className="w-full space-y-1">
        <AccordionItem value="benefits" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            1 – LOS BENEFICIOS
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="ocupacion" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  1.1 100% de ocupación todo el año
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las tasas de ocupación pueden alcanzar el 100% durante todo el año</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Cero habitaciones vacías significa máximo beneficio</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación completa incluso durante períodos tradicionalmente lentos</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Flujo de ingresos constante sin mínimos estacionales</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="costes" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  1.2 Menores costes operativos
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Solo un día laborable para todas las entradas/salidas. Cero huecos entre estancias</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tasas de rotación reducidas significan menores costes de limpieza</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estancias extendidas (8, 16, 24 y 32 días) reducen gastos operativos</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Procesos de check-in/out simplificados ahorran tiempo del personal</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="personal" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  1.3 Mayor estabilidad del personal
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ocupación constante = empleo durante todo el año</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Menor rotación de personal reduce costes de contratación y formación</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Mayor satisfacción de empleados con horarios estables</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="ingresos" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  1.4 Ingresos añadidos de actividades temáticas
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Nuevas fuentes de ingresos a través de eventos especializados</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Oportunidades de merchandising vinculadas a temas del hotel</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Ofertas de servicios extendidos generan mayor gasto</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="comparison" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            2 – COMPARAR SISTEMAS
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-[#460F54]/10 rounded-lg p-6 overflow-visible py-4">
              <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
                <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">MODELO TRADICIONAL</h3>
                <ul className="space-y-3 pr-2">
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">1.</span> 
                    <span className="text-white/90">Entradas/salidas constantes</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">2.</span> 
                    <span className="text-white/90">Más limpieza, lavandería, rotación</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">3.</span> 
                    <span className="text-white/90">Mayor carga de trabajo en recepción</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">4.</span> 
                    <span className="text-white/90">Ocupación impredecible</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">5.</span> 
                    <span className="text-white/90">Huecos entre reservas = Noches vacías = Beneficios perdidos</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">6.</span> 
                    <span className="text-white/90">Temporadas altas y bajas. El personal va y viene</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">7.</span> 
                    <span className="text-white/90">Personal desmotivado, no entrenable, no profesional</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">8.</span> 
                    <span className="text-white/90">Los huéspedes van y vienen. Sin conexión, sin lealtad</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">9.</span> 
                    <span className="text-white/90">Reservas frías, aisladas. Una tras otra</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">10.</span> 
                    <span className="text-white/90">Los apartamentos de alquiler ganan con precios más bajos</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3 bg-[#1A1F2C]/20 p-5 rounded-lg border-l-4 border-fuchsia-400/60">
                <h3 className="text-xl font-bold text-[#FEF7CD] mb-4 tracking-wide">MODELO HOTEL LIVING</h3>
                <ul className="space-y-3">
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">1.</span> 
                    <span className="text-white/90">Días fijos de entrada/salida = Operaciones más fluidas</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">2.</span> 
                    <span className="text-white/90">Menos limpiezas, menos transiciones</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">3.</span> 
                    <span className="text-white/90">Recepción más eficiente y optimizada</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">4.</span> 
                    <span className="text-white/90">Estancias más largas = Mayor ocupación</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">5.</span> 
                    <span className="text-white/90">Cero noches vacías = Máximo beneficio</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">6.</span> 
                    <span className="text-white/90">Temporada alta todo el año. Personal estable</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">7.</span> 
                    <span className="text-white/90">Personal motivado, entrenable, profesional</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">8.</span> 
                    <span className="text-white/90">Los huéspedes se sienten como en casa y regresan</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">9.</span> 
                    <span className="text-white/90">No solo reservas: comunidades</span>
                  </li>
                  <li className="flex text-xs md:text-sm whitespace-nowrap">
                    <span className="font-bold text-[#FEF7CD] mr-2 w-4 flex-shrink-0">10.</span> 
                    <span className="text-white/90">Elegancia. Humanidad. Servicios. Los hoteles ganan</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="habitaciones" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            3 – NO SOLO LLENAMOS HABITACIONES
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Personas agrupadas por afinidades</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Cero azar. 100% conexiones</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hoteles para pertenecer, no solo para alojarse</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Estamos transformando la sociedad</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="beneficio" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            4 – ¿CUÁNTO BENEFICIO SE ESTÁ PERDIENDO?
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="occidentales" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  4.1 Hoteles occidentales. ¿Cuántos beneficios perdemos cada año?
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> $90.000 millones cada año, según las estimaciones más conservadoras</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No es "facturación", sino ganancias puras, antes de impuestos</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La tasa real media de ocupación hotelera occidental es del 50%</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="su-hotel" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  4.2 ¿Y cuántos beneficios pierde su hotel cada año?
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 5 habitaciones vacías = unos $55.000 perdidos anualmente</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 20 habitaciones vacías = unos $220.000 de ganancia pura</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 200 habitaciones cerradas octubre-mayo = más de $1 millón perdido + $420.000 en pérdidas</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 500 habitaciones = más de $3 millones de ganancia perdida</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="mayoria" className="bg-[#5D0478]/10 hover:bg-[#5D0478]/20 rounded-md transition-all duration-200 p-2">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-white/80 group transition-colors duration-300">
                  4.3 Sí. La gran mayoría de hoteles pierden su verdadero potencial
                </AccordionTrigger>
                <AccordionContent className="mt-6 mb-6 overflow-visible">
                  <div className="space-y-2">
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las habitaciones vacías son nuestro oro sin explotar</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Pocos alcanzamos el 100% de ocupación todo el año</p>
                    <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Todos perdemos dinero, no importa el número de estrellas</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="afinidades" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            5 – ¿QUÉ SON LOS HOTELES POR AFINIDADES?
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Ejemplo 1</h4>
                <div className="space-y-1 pl-4">
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotel enfocado en tango, teatro o deportes (ciclismo, golf, tenis, etc.)</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Comunidad en torno a intereses comunes</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Sin huecos entre estancias. Sin pérdidas</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Ejemplo 2</h4>
                <div className="space-y-1 pl-4">
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hotel temático de cocina</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Chefs, clases, maridajes de vinos</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tarifas premium, estancias más largas</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Ejemplo 3</h4>
                <div className="space-y-1 pl-4">
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Hoteles de inmersión lingüística</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Huéspedes agrupados por nivel de idioma</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Personal que habla el idioma</p>
                  <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Experiencia lingüística completa</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tecnologia" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            6 – NUESTRA TECNOLOGÍA HACE LO QUE NINGUNA PUEDE
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Conecta personas con intereses compartidos</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordina entradas y salidas para cero huecos</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Optimiza estancias para máxima rentabilidad</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Una plataforma. Múltiples fuentes de ingresos</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Segmentación precisa por interés y afinidad</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Marketing a comunidades motivadas, no viajeros aleatorios</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Alcance global con targeting híper-específico</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tasas de conversión más altas. Costes de adquisición más bajos</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="redes-sociales" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            7 – HOTELES POR AFINIDADES = REDES SOCIALES PERFECTAS
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los intereses compartidos crean conexiones instantáneas</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La psicología grupal impulsa estancias más largas y visitas de retorno</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las actividades temáticas aumentan el compromiso y la lealtad</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La pertenencia comunitaria se vuelve adictiva</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="necesitan" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            8 – ELLOS NECESITAN SU HOTEL
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> 40% de la población occidental vive sola, en pareja, pre-jubilada, trabaja online, estudia lejos o vive lejos del trabajo</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> La mayoría quieren liberarse de tareas domésticas, superar la soledad, ampliar su vida social, conocer gente afín y tener seguridad</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="revolucion" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            9 – LAS AFINIDADES SON LA NUEVA REVOLUCIÓN SOCIAL
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los huéspedes no solo quieren habitaciones: quieren sentido</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los intereses conectan más rápido que los descuentos</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Las estancias temáticas generan fidelidad</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los desconocidos se convierten en comunidades</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No solo llenas habitaciones: generas pertenencia</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Atrae a los huéspedes adecuados</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Tu afinidad es tu imán</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Los hoteles con alma ganan el futuro</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="integracion" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            10 – SOMOS INTEGRACIÓN PERFECTA
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> No tiene que elegir entre sistemas</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Combine ambos modelos como desee</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Comience con solo unas pocas habitaciones</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Amplíe según sea necesario</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Cambie más habitaciones cuando tenga sentido</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Plataforma que se integra sin esfuerzo</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Cero interrupciones diarias</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Nos adaptamos a usted, no al revés</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Esto es flexibilidad. Esto es rentabilidad</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Esto es Integración Perfecta</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pasos" className="border-b border-fuchsia-400/30 mb-1 transition-all duration-200">
          <AccordionTrigger className="text-2xl font-bold text-white hover:text-[#FEF7CD] py-3 transition-colors duration-300 group">
            11 – PASOS PARA UNIRSE A HOTEL-LIVING
          </AccordionTrigger>
          <AccordionContent className="text-white space-y-4 pt-4 pb-2 overflow-visible">
            <div className="space-y-2">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Identifique habitaciones vacías (mínimo 8 días)</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Defina un concepto basado en afinidades</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Regístrese y use la calculadora en línea</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Añada su hotel en el panel</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
