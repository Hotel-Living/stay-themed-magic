
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
      <div className="text-center mb-8">
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

      {/* Two spectacular highlighted boxes with slogans */}
      <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-8"} mb-16 relative`}>
        {/* Left box - Enhanced design */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#1a0933] via-[#2d0f47] to-[#1a0933] backdrop-blur-xl border-2 border-fuchsia-400/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-fuchsia-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🏨</span>
                <span className="text-base font-semibold tracking-wide">Hotels need people</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-fuchsia-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">👥</span>
                <span className="text-base font-semibold tracking-wide">People need better living</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-fuchsia-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🌐</span>
                <span className="text-base font-semibold tracking-wide">Society needs an update</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-fuchsia-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">💡</span>
                <span className="text-base font-semibold tracking-wide">All need Hotel Living</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right box - Enhanced design */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#1a0933] via-[#2d0f47] to-[#1a0933] backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🛏️</span>
                <span className="text-base font-semibold tracking-wide">5 billion hotel nights need to be full</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">👨‍👩‍👧‍👦</span>
                <span className="text-base font-semibold tracking-wide">400 million people need better living</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🔁</span>
                <span className="text-base font-semibold tracking-wide">Society keeps repeating the past</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🚀</span>
                <span className="text-base font-semibold tracking-wide">Hotel Living changes that</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Horizontal Accordion Menu */}
      <div className="mb-24">
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <div className={`flex flex-wrap justify-center gap-1 p-1 bg-[#8017B0] rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1 place-items-center" : "grid grid-cols-7 place-items-center"}`}>
              {accordionOptions.map((option) => (
                <button 
                  key={option.id} 
                  onClick={() => handleAccordionTabChange(option.id)}
                  className={`px-2 uppercase whitespace-nowrap text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-center rounded-lg font-medium flex flex-col items-center justify-center ${isMobile ? "text-xs px-2 py-3" : "text-sm px-3 py-3"} ${activeAccordionTab === option.id ? "!bg-[#5F1183]" : "bg-[#8017B0]"}`}
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
