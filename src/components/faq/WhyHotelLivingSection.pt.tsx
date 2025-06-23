import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StillRentingContentPT } from "./accordion/StillRentingContent.pt";
import { RetiredContentPT } from "./accordion/RetiredContent.pt";
import { OnlineWorkerContentPT } from "./accordion/OnlineWorkerContent.pt";
import { CommuterContentPT } from "./accordion/CommuterContent.pt";
import { FreeSoulContentPT } from "./accordion/FreeSoulContent.pt";
import { HotelContentPT } from "./accordion/HotelContent.pt";
import { SocietyContentPT } from "./accordion/SocietyContent.pt";

export function WhyHotelLivingSectionPT() {
  const accordionOptions = [
    { 
      id: "still-renting", 
      label: "Ainda Aluga?", 
      component: <StillRentingContentPT />
    },
    { 
      id: "retired", 
      label: "Aposentado?", 
      component: <RetiredContentPT />
    },
    { 
      id: "online-worker", 
      label: "Trabalhador Online?", 
      component: <OnlineWorkerContentPT />
    },
    { 
      id: "commuter", 
      label: "Longe do trabalho?", 
      component: <CommuterContentPT />
    },
    { 
      id: "free-soul", 
      label: "Alma Livre?", 
      component: <FreeSoulContentPT />
    },
    { 
      id: "hotel", 
      label: "Hotel?", 
      component: <HotelContentPT />
    },
    { 
      id: "society", 
      label: "Sociedade?", 
      component: <SocietyContentPT />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient text-[#eedbf7] glow animate-text-slow tracking-tight leading-tight">
          Por que Hotel-Living?
        </h2>
        <p className="text-lg text-[#e3d6e9] mb-6">
          Descubra como Hotel-Living transforma seu estilo de vida
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
