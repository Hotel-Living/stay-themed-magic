
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HotelAccordionMenuEN() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  return (
    <div className="pt-4 border-t border-yellow-300/30 bg-[#460F54]/30 rounded-lg p-6 shadow-lg backdrop-blur-sm mb-2 px-0 py-[15px] my-0">
      <Accordion type="single" collapsible className="w-full space-y-3" value={openItem || ""} onValueChange={setOpenItem}>
        
        <AccordionItem value="the-benefits" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              1 - The benefits
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">100% occupancy all year round</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Occupancy rates can reach 100% throughout the year
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Zero empty rooms means maximum profit
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Full occupancy even during traditionally slow periods
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Constant revenue stream without seasonal lows
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Lower operational costs</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Only one working day for all check-ins/check-outs. Zero gaps between stays
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Reduced turnover rates mean lower cleaning costs
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Extended stays (8, 16, 24 and 32 days) reduce operating expenses
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Simplified check-in/out processes save staff time
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Greater staff stability</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Constant occupancy = year-round employment
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Lower staff turnover reduces hiring and training costs
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Greater employee satisfaction with stable schedules
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-[#FFF9B0] mb-3">Additional revenue from thematic activities</h4>
                <div className="space-y-2 pl-4">
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    New revenue sources through specialized events
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Merchandising opportunities linked to hotel themes
                  </p>
                  <p className="text-base flex items-start text-[#FFF9B0]">
                    <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                    Extended service offerings generate higher spending
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="compare-systems" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              2 – Let's compare systems
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="grid md:grid-cols-2 gap-6 py-6">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-red-300 text-center">TRADITIONAL MODEL</h4>
                <div className="space-y-3">
                  <p className="text-sm text-red-200">• Constant check-ins and check-outs</p>
                  <p className="text-sm text-red-200">• More cleaning, laundry, and turnover</p>
                  <p className="text-sm text-red-200">• Heavier workload at reception</p>
                  <p className="text-sm text-red-200">• Unpredictable occupancy</p>
                  <p className="text-sm text-red-200">• Gaps between bookings = Empty nights = Lost revenue</p>
                  <p className="text-sm text-red-200">• High and low seasons. Staff comes and goes</p>
                  <p className="text-sm text-red-200">• Unmotivated staff, untrainable, unprofessional</p>
                  <p className="text-sm text-red-200">• Guests come and go. No connection, no loyalty</p>
                  <p className="text-sm text-red-200">• Cold, isolated bookings. One after another</p>
                  <p className="text-sm text-red-200">• Rental apartments win with lower prices</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-green-300 text-center">HOTEL LIVING MODEL</h4>
                <div className="space-y-3">
                  <p className="text-sm text-green-200">• Fixed check-in/check-out days = Smoother operations</p>
                  <p className="text-sm text-green-200">• Less cleaning, fewer transitions</p>
                  <p className="text-sm text-green-200">• More efficient and optimized reception</p>
                  <p className="text-sm text-green-200">• Longer stays = Higher occupancy</p>
                  <p className="text-sm text-green-200">• Zero empty nights = Maximum profit</p>
                  <p className="text-sm text-green-200">• High season all year round. Stable staff</p>
                  <p className="text-sm text-green-200">• Motivated, trainable, professional staff</p>
                  <p className="text-sm text-green-200">• Guests feel at home and return</p>
                  <p className="text-sm text-green-200">• Not just bookings: communities</p>
                  <p className="text-sm text-green-200">• Elegance. Humanity. Services. Hotels win</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="we-dont-just-fill-rooms" className="overflow-hidden border-none shadow-xl">
          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300">
            <div className="text-[#FFF9B0] font-bold text-base md:text-lg">
              3 – We don't just fill rooms
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
            <div className="space-y-6 text-left py-6">
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                People grouped by affinities
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Zero randomness. 100% connections
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                Hotels for belonging, not just for staying
              </p>
              <p className="text-base flex items-start text-[#FFF9B0]">
                <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mr-2 mt-1.5"></span>
                We are transforming society
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Continue with remaining accordion items following the same pattern */}
        
      </Accordion>
    </div>
  );
}
