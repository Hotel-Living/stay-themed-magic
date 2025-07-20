
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

export function WhyHotelLivingSectionEN() {
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
                <span className="text-center w-full">STILL RENTING?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Perfect! We'll help you stop renting.</p>
                <p>Living in hotels can be more economical than renting an apartment. Calculate your current monthly expenses and compare them with our hotel options. Many of our users have reduced their housing costs by up to 40%.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 2 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">RETIRED?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Enjoy your retirement by traveling!</p>
                <p>Retirement is the perfect time to explore the world. With our hotels, you can live comfortably while discovering new places, without worrying about property maintenance.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 3 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">REMOTE WORK?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Work from anywhere!</p>
                <p>With remote work, you can live wherever you want. Our hotels offer high-speed WiFi, comfortable workspaces, and the flexibility to change locations whenever you wish.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Button 4 */}
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                <span className="text-center w-full">FREE SOUL?</span>
              </AccordionTrigger>
              <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                <p className="mb-2 text-yellow-300 font-semibold">Live without ties!</p>
                <p>If you seek total freedom, living in hotels allows you to change cities or countries without long-term commitments. Perfect for those who value flexibility and adventure.</p>
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
              {isExpanded ? 'Show fewer options' : 'Show more options'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {/* Additional buttons */}
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-5" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">DIGITAL NOMAD?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">The perfect lifestyle for you!</p>
                    <p>As a digital nomad, you need flexibility and comfort. Our hotels offer you a stable base in each destination, with all the amenities you need to work and live.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-6" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">ENTREPRENEUR?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Optimize your time and resources!</p>
                    <p>As an entrepreneur, your time is valuable. Living in hotels eliminates home maintenance worries and allows you to focus on growing your business.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-7" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">STUDENT?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">Study in comfort!</p>
                    <p>For university or graduate students, living in hotels near campus offers comfort, included services, and the flexibility to change according to your academic needs.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="item-8" className="border-0">
                  <AccordionTrigger className="bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 border-0 hover:no-underline group">
                    <span className="text-center w-full">SEPARATED?</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-xs md:text-sm border border-white/20">
                    <p className="mb-2 text-yellow-300 font-semibold">A fresh start!</p>
                    <p>After a separation, living in hotels gives you time to reorganize your life without committing to long rental contracts. It's a perfect temporary solution while you plan your future.</p>
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
          If you want to learn more about the topic, you can read:
        </p>
        <a 
          href="/hotel-crisis" 
          className="inline-block bg-gradient-to-r from-[#7A0486] to-[#B626D6] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Portrait of the Hotel Crisis
        </a>
      </div>
    </div>
  );
}
