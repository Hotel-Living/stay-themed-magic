import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenu() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="benefits" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">1 – Benefits of the affinities-hotels</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Flexible accommodation solutions for any lifestyle</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> All-inclusive pricing with no hidden fees</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Built-in communities and networking opportunities</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Professional workspaces and reliable WiFi</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Housekeeping and maintenance included</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Access to amenities and local experiences</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="models" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">2 – Models of affinities-hotels</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Themed hotels</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Co-living spaces</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Extended stay apartments</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Vacation rentals with community features</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="revenue" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">3 – Revenue streams of affinities-hotels</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Accommodation fees</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Membership fees for community access</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Revenue sharing from local experiences and activities</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Sponsorships and partnerships with relevant brands</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="guests" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">4 – Who are the guests of affinities-hotels?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Digital nomads and remote workers</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Travelers seeking authentic local experiences</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Individuals looking for community and connection</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> People interested in specific themes or activities</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Point 5 - Updated content only */}
        <AccordionItem value="specialized-hotels" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">5 – ¿Qué son los hoteles por afinidades?</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-3 text-left py-4">
              <p className="text-lg font-semibold">EJEMPLO 1</p>
              <p className="text-base flex items-start pl-4">- Imagina un hotel enfocado en deportes: ciclismo, golf, tenis, etc.</p>
              <p className="text-base flex items-start pl-4">- Las personas interesadas en ese deporte reservan juntas</p>
              <p className="text-base flex items-start pl-4">- Se forma una comunidad en torno a intereses comunes</p>
              <p className="text-base flex items-start pl-4">- No hay huecos entre estancias. No hay pérdidas</p>
              
              <p className="text-lg font-semibold mt-6">EJEMPLO 2</p>
              <p className="text-base flex items-start pl-4">- Considera un hotel temático de cocina</p>
              <p className="text-base flex items-start pl-4">- Chefs, clases de cocina, maridajes de vinos, etc.</p>
              <p className="text-base flex items-start pl-4">- Tarifas premium para experiencias especializadas</p>
              <p className="text-base flex items-start pl-4">- Ocupación completa con estancias promedio más largas</p>
              
              <p className="text-lg font-semibold mt-6">EJEMPLO 3</p>
              <p className="text-base flex items-start pl-4">- Hoteles de inmersión lingüística</p>
              <p className="text-base flex items-start pl-4">- Huéspedes de nivel de idioma similar agrupados</p>
              <p className="text-base flex items-start pl-4">- El personal habla el idioma objetivo</p>
              <p className="text-base flex items-start pl-4">- Experiencia lingüística completa</p>
              
              <p className="text-base italic mt-4">Estos hoteles especializados crean experiencias comunitarias poderosas mientras mantienen ingresos estables y predecibles</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="our-technology" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">6 – Our technology does what others cannot</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Matches people with shared interests</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Coordinates arrivals & departures for zero gaps</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Optimizes stays for maximum profitability</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Single platform. Multiple revenue streams</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="targeted-marketing" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">7 – Targeted marketing no one else can match</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Precision targeting by interest & affinity</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Market to motivated communities, not random travelers</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Global reach with hyper-specific focus</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Higher conversion rates. Lower acquisition costs</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="themed-hotels" className="border border-fuchsia-400/30 rounded-lg bg-gradient-to-r from-[#5A0080]/20 to-[#300A38]/20 backdrop-blur-sm">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-[#5D0478]/20 transition-all duration-300 rounded-md">
            <span className="text-xl font-medium text-white">8 – Affinities hotels = Perfect Social Networks</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-200">
            <div className="space-y-4 text-left py-4">
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Shared interests create instant connections</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Group psychology drives longer stays & returns</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Themed activities boost engagement & loyalty</p>
              <p className="text-base flex items-start"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span> Community belonging becomes addictive</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
