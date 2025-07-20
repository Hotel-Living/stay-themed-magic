
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

export function WhyHotelLivingSectionPT() {
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
                <span className="text-center w-full">AINDA ALUGAS?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Perfeito! Ajudamos-te a deixar de alugar.</p>
                <p>Viver em hotéis pode ser mais económico do que alugar um apartamento. Calcula os teus gastos mensais atuais e compara-os com as nossas opções hoteleiras. Muitos dos nossos utilizadores reduziram os seus gastos de habitação até 40%.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 2 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">REFORMADO?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Desfruta da tua reforma viajando!</p>
                <p>A reforma é o momento perfeito para explorar o mundo. Com os nossos hotéis, podes viver confortavelmente enquanto descobres novos lugares, sem te preocupares com a manutenção de uma propriedade.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 3 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">TELETRABALHO?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Trabalha de qualquer lugar!</p>
                <p>Com o teletrabalho, podes viver onde quiseres. Os nossos hotéis oferecem WiFi de alta velocidade, espaços de trabalho confortáveis e a flexibilidade de mudares de localização quando desejares.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 4 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">ALMA LIVRE?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Vive sem amarras!</p>
                <p>Se procuras liberdade total, viver em hotéis permite-te mudar de cidade ou país sem compromissos a longo prazo. Perfeito para quem valoriza a flexibilidade e a aventura.</p>
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
              {isExpanded ? 'Ver menos opções' : 'Ver mais opções'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {/* Additional buttons */}
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-5" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">NÓMADA DIGITAL?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">O estilo de vida perfeito para ti!</p>
                    <p>Como nómada digital, precisas de flexibilidade e conforto. Os nossos hotéis oferecem-te uma base estável em cada destino, com todas as comodidades que precisas para trabalhar e viver.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-6" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">EMPRESÁRIO?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Otimiza o teu tempo e recursos!</p>
                    <p>Como empresário, o teu tempo é valioso. Viver em hotéis elimina as preocupações de manutenção doméstica e permite-te focar no crescimento do teu negócio.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-7" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">ESTUDANTE?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Estuda com conforto!</p>
                    <p>Para estudantes universitários ou de pós-graduação, viver em hotéis perto do campus oferece conforto, serviços incluídos e a flexibilidade de mudares conforme as tuas necessidades académicas.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-8" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">SEPARADO/A?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Um novo começo!</p>
                    <p>Depois de uma separação, viver em hotéis dá-te tempo para reorganizar a tua vida sem te comprometeres com contratos de aluguer longos. É uma solução temporária perfeita enquanto planeias o teu futuro.</p>
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
          Se quiseres aprofundar mais sobre o tema, podes ler:
        </p>
        <a 
          href="/crise-hoteleira" 
          className="inline-block bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Retrato da Crise Hoteleira
        </a>
      </div>
    </div>
  );
}
