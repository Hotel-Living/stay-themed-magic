import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StillRentingContent } from "./accordion/StillRentingContent.ro";
import { RetiredContent } from "./accordion/RetiredContent.ro";
import { OnlineWorkerContent } from "./accordion/OnlineWorkerContent.ro";
import { CommuterContent } from "./accordion/CommuterContent.ro";
import { FreeSoulContent } from "./accordion/FreeSoulContent.ro";
import { HotelContent } from "./accordion/HotelContent.ro";
import { SocietyContent } from "./accordion/SocietyContent.ro";

export function WhyHotelLivingSectionRO() {
  const accordionOptions = [
    { 
      id: "still-renting", 
      label: "Încă Închiriezi?", 
      component: <StillRentingContent />
    },
    { 
      id: "retired", 
      label: "Pensionar?", 
      component: <RetiredContent />
    },
    { 
      id: "online-worker", 
      label: "Lucrător Online?", 
      component: <OnlineWorkerContent />
    },
    { 
      id: "commuter", 
      label: "Navetist?", 
      component: <CommuterContent />
    },
    { 
      id: "free-soul", 
      label: "Suflet Liber?", 
      component: <FreeSoulContent />
    },
    { 
      id: "hotel", 
      label: "Hotel?", 
      component: <HotelContent />
    },
    { 
      id: "society", 
      label: "Societate?", 
      component: <SocietyContent />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient text-[#eedbf7] glow animate-text-slow tracking-tight leading-tight">
          De ce Hotel-Living?
        </h2>
        <p className="text-lg text-[#e3d6e9] mb-6">
          Descoperă cum Hotel-Living îți transformă stilul de viață
        </p>
      </div>
      
      <div className="glass-card rounded-lg p-6 backdrop-blur-sm border border-fuchsia-400/20">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {accordionOptions.map((option) => (
            <AccordionItem key={option.id} value={option.id} className="border border-fuchsia-400/20 rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 bg-gradient-to-r from-[#730483] to-[#570366] text-white hover:from-[#981DA1] hover:to-[#730483] transition-all duration-200 text-left font-semibold">
                {option.label}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-6 bg-[#460F54]/50 text-[#f9d3f6]">
                {option.component}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
