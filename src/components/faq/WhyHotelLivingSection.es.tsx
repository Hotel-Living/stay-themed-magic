import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StillRentingContentES } from "./accordion/StillRentingContent.es";
import { RetiredContentES } from "./accordion/RetiredContent.es";
import { OnlineWorkerContentES } from "./accordion/OnlineWorkerContent.es";
import { CommuterContentES } from "./accordion/CommuterContent.es";
import { FreeSoulContentES } from "./accordion/FreeSoulContent.es";
import { HotelContentES } from "./accordion/HotelContent.es";
import { SocietyContentES } from "./accordion/SocietyContent.es";

export function WhyHotelLivingSectionES() {
  const accordionOptions = [
    { 
      id: "still-renting", 
      label: "¿Aún Alquilas?", 
      component: <StillRentingContentES />
    },
    { 
      id: "retired", 
      label: "¿Jubilado?", 
      component: <RetiredContentES />
    },
    { 
      id: "online-worker", 
      label: "¿Trabajador Online?", 
      component: <OnlineWorkerContentES />
    },
    { 
      id: "commuter", 
      label: "¿Lejos del trabajo?", 
      component: <CommuterContentES />
    },
    { 
      id: "free-soul", 
      label: "¿Alma Libre?", 
      component: <FreeSoulContentES />
    },
    { 
      id: "hotel", 
      label: "¿Hotel?", 
      component: <HotelContentES />
    },
    { 
      id: "society", 
      label: "¿Sociedad?", 
      component: <SocietyContentES />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient text-[#eedbf7] glow animate-text-slow tracking-tight leading-tight">
          ¿Por qué Hotel-Living?
        </h2>
        <p className="text-lg text-[#e3d6e9] mb-6">
          Descubre cómo Hotel-Living transforma tu estilo de vida
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
