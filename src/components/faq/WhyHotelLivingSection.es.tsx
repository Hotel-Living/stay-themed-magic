
import React, { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function WhyHotelLivingSectionES() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Accordion Section - moved up to replace removed elements */}
      <div className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
          {/* Button 1 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">¿AÚN ALQUILAS?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">¡Perfecto! Te ayudamos a dejar de alquilar.</p>
                <p>Vivir en hoteles puede ser más económico que alquilar un apartamento. Calcula tus gastos mensuales actuales y compáralos con nuestras opciones hoteleras. Muchos de nuestros usuarios han reducido sus gastos de vivienda hasta un 40%.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 2 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">¿JUBILADO?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">¡Disfruta tu jubilación viajando!</p>
                <p>La jubilación es el momento perfecto para explorar el mundo. Con nuestros hoteles, puedes vivir cómodamente mientras descubres nuevos lugares, sin preocuparte por el mantenimiento de una propiedad.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 3 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">¿TELETRABAJO?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">¡Trabaja desde cualquier lugar!</p>
                <p>Con el teletrabajo, puedes vivir donde quieras. Nuestros hoteles ofrecen WiFi de alta velocidad, espacios de trabajo cómodos y la flexibilidad de cambiar de ubicación cuando lo desees.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 4 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">¿ALMA LIBRE?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">¡Vive sin ataduras!</p>
                <p>Si buscas libertad total, vivir en hoteles te permite cambiar de ciudad o país sin compromisos a largo plazo. Perfecto para quienes valoran la flexibilidad y la aventura.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Expandable content */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div className="text-center mb-4">
            <CollapsibleTrigger 
              onClick={toggleExpanded}
              className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              {isExpanded ? 'Ver menos opciones' : 'Ver más opciones'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {/* Additional buttons */}
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-5" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">¿NÓMADA DIGITAL?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">¡El estilo de vida perfecto para ti!</p>
                    <p>Como nómada digital, necesitas flexibilidad y comodidad. Nuestros hoteles te ofrecen una base estable en cada destino, con todas las comodidades que necesitas para trabajar y vivir.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-6" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">¿EMPRESARIO?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">¡Optimiza tu tiempo y recursos!</p>
                    <p>Como empresario, tu tiempo es valioso. Vivir en hoteles elimina las preocupaciones del mantenimiento doméstico y te permite enfocarte en hacer crecer tu negocio.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-7" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">¿ESTUDIANTE?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">¡Estudia con comodidad!</p>
                    <p>Para estudiantes universitarios o de posgrado, vivir en hoteles cerca del campus ofrece comodidad, servicios incluidos y la flexibilidad de cambiar según tus necesidades académicas.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-8" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">¿SEPARADO/A?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">¡Un nuevo comienzo!</p>
                    <p>Después de una separación, vivir en hoteles te da tiempo para reorganizar tu vida sin comprometerte con contratos de alquiler largos. Es una solución temporal perfecta mientras planificas tu futuro.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Link section */}
      <div className="text-center">
        <p className="text-[#e3d6e9] text-sm mb-4">
          Si quieres profundizar más sobre el tema, puedes leer:
        </p>
        <a 
          href="/crisis-hotelera" 
          className="inline-block bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Retrato de la Crisis Hotelera
        </a>
      </div>
    </div>
  );
}
