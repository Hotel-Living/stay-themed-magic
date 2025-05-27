
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AccordionContentRenderer } from "./accordion/AccordionContentRenderer";

export function WhyHotelLivingSection() {
  const [activeAccordionTab, setActiveAccordionTab] = useState("");
  const isMobile = useIsMobile();

  const accordionOptions = [
    { id: "still-renting", label: "STILL RENTING?" },
    { id: "retired", label: "RETIRED?" },
    { id: "online-worker", label: "ONLINE WORKER?" },
    { id: "commuter", label: "COMMUTER?" },
    { id: "free-soul", label: "A FREE SOUL?" },
    { id: "hotel", label: "Hotel?" },
    { id: "society", label: "Society?" }
  ];

  const handleAccordionTabChange = (value: string) => {
    if (value === activeAccordionTab) {
      setActiveAccordionTab("");
    } else {
      setActiveAccordionTab(value);
    }
  };

  return (
    <>
      {/* First title - WHY HOTEL-LIVING? */}
      <div className="text-center mb-6">
        <div className="flex justify-center">
          <h1 className={`
            ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
            font-bold mb-4 text-[#eedbf7] glow 
            tracking-tight leading-tight
            bg-[#8017B0] py-2 px-8 rounded-lg inline-block
          `}>
            WHY HOTEL-LIVING?
          </h1>
        </div>
      </div>

      {/* First Horizontal Accordion Menu */}
      <div className="mb-24">
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <div className={`flex flex-wrap justify-center gap-1 p-1 bg-[#8017B0] rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1" : "grid grid-cols-7"}`}>
              {accordionOptions.map((option) => (
                <button 
                  key={option.id} 
                  onClick={() => handleAccordionTabChange(option.id)}
                  className={`px-2 uppercase whitespace-nowrap text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-justify rounded-lg font-medium flex flex-col items-center justify-center ${isMobile ? "text-xs px-2 py-3" : "text-sm px-3 py-3"} ${activeAccordionTab === option.id ? "!bg-[#5F1183]" : "bg-[#8017B0]"}`}
                >
                  <span className="mb-1">{option.label}</span>
                  <span className="text-xs">▼</span>
                </button>
              ))}
            </div>
          </div>
          
          {activeAccordionTab && (
            <div className="mt-4">
              <div className="bg-[#8017B0]/10 p-6 rounded-lg border border-[#8017B0]/30">
                <AccordionContentRenderer optionId={activeAccordionTab} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
