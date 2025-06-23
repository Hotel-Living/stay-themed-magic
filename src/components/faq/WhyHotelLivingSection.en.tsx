import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StillRentingContent } from "./accordion/StillRentingContent";
import { RetiredContent } from "./accordion/RetiredContent";
import { OnlineWorkerContent } from "./accordion/OnlineWorkerContent";
import { CommuterContent } from "./accordion/CommuterContent";
import { FreeSoulContent } from "./accordion/FreeSoulContent";
import { HotelContent } from "./accordion/HotelContent";
import { SocietyContent } from "./accordion/SocietyContent";

export function WhyHotelLivingSectionEN() {
  const accordionOptions = [
    { 
      id: "still-renting", 
      label: "Still Renting?", 
      component: <StillRentingContent />
    },
    { 
      id: "retired", 
      label: "Retired?", 
      component: <RetiredContent />
    },
    { 
      id: "online-worker", 
      label: "Online Worker?", 
      component: <OnlineWorkerContent />
    },
    { 
      id: "commuter", 
      label: "Commuter?", 
      component: <CommuterContent />
    },
    { 
      id: "free-soul", 
      label: "Free Soul?", 
      component: <FreeSoulContent />
    },
    { 
      id: "hotel", 
      label: "Hotel?", 
      component: <HotelContent />
    },
    { 
      id: "society", 
      label: "Society?", 
      component: <SocietyContent />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient text-[#eedbf7] glow animate-text-slow tracking-tight leading-tight">
          Why Hotel-Living?
        </h2>
        <p className="text-lg text-[#e3d6e9] mb-6">
          Discover how Hotel-Living transforms your lifestyle
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
