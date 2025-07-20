
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

export function WhyHotelLivingSectionRO() {
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
                <span className="text-center w-full">ÎNCĂ ÎNCHIRIEZI?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Perfect! Te ajutăm să nu mai închiriezi.</p>
                <p>Locuirea în hoteluri poate fi mai economică decât închirierea unui apartament. Calculează cheltuielile tale lunare actuale și compară-le cu opțiunile noastre hoteliere. Mulți dintre utilizatorii noștri și-au redus costurile de locuire cu până la 40%.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 2 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">PENSIONAR?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Bucură-te de pensie călătorind!</p>
                <p>Pensia este momentul perfect pentru a explora lumea. Cu hotelurile noastre, poți locui confortabil în timp ce descoperi locuri noi, fără să îți faci griji pentru întreținerea unei proprietăți.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 3 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">TELEMUNCĂ?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Lucrează de oriunde!</p>
                <p>Cu telemunca, poți locui oriunde dorești. Hotelurile noastre oferă WiFi de mare viteză, spații de lucru confortabile și flexibilitatea de a schimba locația când dorești.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 4 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">SUFLET LIBER?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Trăiește fără legături!</p>
                <p>Dacă cauți libertate totală, locuirea în hoteluri îți permite să schimbi orașe sau țări fără angajamente pe termen lung. Perfect pentru cei care apreciază flexibilitatea și aventura.</p>
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
              {isExpanded ? 'Vezi mai puține opțiuni' : 'Vezi mai multe opțiuni'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {/* Additional buttons */}
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-5" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">NOMAD DIGITAL?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Stilul de viață perfect pentru tine!</p>
                    <p>Ca nomad digital, ai nevoie de flexibilitate și confort. Hotelurile noastre îți oferă o bază stabilă în fiecare destinație, cu toate facilitățile de care ai nevoie pentru a lucra și a trăi.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-6" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">ANTREPRENOR?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Optimizează-ți timpul și resursele!</p>
                    <p>Ca antreprenor, timpul tău este prețios. Locuirea în hoteluri elimină grijile legate de întreținerea casei și îți permite să te concentrezi pe dezvoltarea afacerii tale.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-7" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">STUDENT?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Studiază în confort!</p>
                    <p>Pentru studenții universitari sau de master, locuirea în hoteluri aproape de campus oferă confort, servicii incluse și flexibilitatea de a schimba în funcție de nevoile tale academice.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-8" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">SEPARAT/Ă?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Un nou început!</p>
                    <p>După o separare, locuirea în hoteluri îți dă timp să îți reorganizezi viața fără să te angajezi cu contracte de închiriere pe termen lung. Este o soluție temporară perfectă în timp ce îți planifici viitorul.</p>
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
          Dacă vrei să aprofundezi mai mult despre subiect, poți citi:
        </p>
        <a 
          href="/criza-hoteliera" 
          className="inline-block bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Portretul Crizei Hoteliere
        </a>
      </div>
    </div>
  );
}
