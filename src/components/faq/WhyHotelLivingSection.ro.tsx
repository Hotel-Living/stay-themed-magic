import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StillRentingContent } from "./accordion/StillRentingContent";
import { RetiredContent } from "./accordion/RetiredContent";
import { OnlineWorkerContent } from "./accordion/OnlineWorkerContent";
import { CommuterContent } from "./accordion/CommuterContent";
import { FreeSoulContent } from "./accordion/FreeSoulContent";
import { HotelContent } from "./accordion/HotelContent";
import { SocietyContent } from "./accordion/SocietyContent";

export function WhyHotelLivingSectionRO() {
  const accordionOptions = [
    { id: "stillRenting", label: "Încă Închiriezi?" },
    { id: "retired", label: "Pensionar?" },
    { id: "onlineWorker", label: "Lucrător Online?" },
    { id: "commuter", label: "Departe de muncă?" },
    { id: "freeSoul", label: "Suflet Liber?" },
    { id: "hotel", label: "Hotel?" },
    { id: "society", label: "Societate?" }
  ];

  const renderContent = (id: string) => {
    switch (id) {
      case "stillRenting":
        return <StillRentingContent />;
      case "retired":
        return <RetiredContent />;
      case "onlineWorker":
        return <OnlineWorkerContent />;
      case "commuter":
        return <CommuterContent />;
      case "freeSoul":
        return <FreeSoulContent />;
      case "hotel":
        return <HotelContent />;
      case "society":
        return <SocietyContent />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#eedbf7] mb-4 glow">
          De ce Hotel-Living?
        </h2>
        <p className="text-lg text-[#e3d6e9] font-medium">
          Descoperă cum Hotel-Living îți transformă stilul de viață în funcție de cine ești
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-[#460F54]/80 to-[#300A38]/60 backdrop-blur-sm rounded-xl border border-fuchsia-400/30 p-6">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {accordionOptions.map((option) => (
            <AccordionItem 
              key={option.id} 
              value={option.id}
              className="border border-fuchsia-500/20 rounded-lg bg-gradient-to-r from-[#570366]/40 to-[#730483]/40 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-4 py-3 text-[#f9d3f6] hover:text-white font-semibold text-base md:text-lg hover:no-underline">
                {option.label}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-[#e3d6e9]">
                {renderContent(option.id)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
