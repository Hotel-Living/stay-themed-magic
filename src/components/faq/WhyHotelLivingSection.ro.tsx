
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AccordionContentRenderer } from "./accordion/AccordionContentRenderer";

export function WhyHotelLivingSectionRO() {
  const [activeAccordionTab, setActiveAccordionTab] = useState("");
  const isMobile = useIsMobile();

  const accordionOptions = [
    { id: "still-renting", label: "ÎNCĂ\nÎNCHIRIEZI?" },
    { id: "retired", label: "PENSIONAR?" },
    { id: "airbnb", label: "¿AIRBNB?" },
    { id: "online-worker", label: "LUCRĂTOR\nONLINE?" },
    { id: "commuter", label: "NAVETIST?" },
    { id: "free-soul", label: "SUFLET\nLIBER?" },
    { id: "hotel", label: "HOTEL?" },
    { id: "society", label: "SOCIETATE?" }
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
          <div className="relative group w-fit">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h1 className={`
              ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
              font-bold mb-4 text-[#eedbf7] glow 
              tracking-tight leading-tight
              bg-[#8017B0] py-2 px-8 rounded-lg inline-block relative
            `}>
              DE CE HOTEL-LIVING?
            </h1>
          </div>
        </div>
      </div>

      {/* Two spectacular highlighted boxes with slogans - Vertically Stacked and Centered */}
      <div className="flex flex-col items-center gap-8 mb-16 relative">
        {/* Top box - Enhanced design with blue glow and purple background */}
        <div className="relative group w-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🏨</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Hotelurile au nevoie de oameni</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🧑‍🤝‍🧑</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Oamenii au nevoie de viață mai bună</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🌐</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Societatea are nevoie de actualizare</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">💡</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Toți au nevoie de Hotel-Living</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom box - Enhanced design with blue glow and purple background */}
        <div className="relative group w-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-[#5E1183] backdrop-blur-xl border-2 border-cyan-400/60 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="space-y-5">
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🛏️</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">
                  {isMobile ? '5B nopți de hotel de umplut' : '5.000 milioane nopți de hotel de umplut'}
                </span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">👨‍👩‍👧‍👦</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">
                  {isMobile ? '400M oameni au nevoie de viață mai bună' : '400 milioane oameni au nevoie de viață mai bună'}
                </span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🔁</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Societatea repetă trecutul</span>
              </div>
              <div className="flex items-center text-white group/item hover:text-cyan-200 transition-colors duration-200">
                <span className="text-2xl mr-4 filter drop-shadow-lg">🚀</span>
                <span className="text-base font-semibold tracking-wide whitespace-nowrap">Hotel-Living schimbă asta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Horizontal Accordion Menu */}
      <div className="mb-24">
        <div className="w-full">
          <div className="flex justify-center mb-4">
            <div className={`flex flex-wrap justify-center gap-1 p-1 bg-[#8017B0] rounded-xl border border-fuchsia-500/30 backdrop-blur-md ${isMobile ? "grid grid-cols-2 gap-1 place-items-center" : "grid grid-cols-8 place-items-center"}`}>
              {accordionOptions.map((option) => (
                <button 
                  key={option.id} 
                  onClick={() => handleAccordionTabChange(option.id)}
                  className={`px-2 uppercase whitespace-pre text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-center rounded-lg font-medium flex flex-col items-center justify-center ${isMobile ? "text-xs px-2 py-3" : "text-sm px-3 py-3"} ${activeAccordionTab === option.id ? "!bg-[#5F1183]" : "bg-[#8017B0]"}`}
                >
                  <span className="mb-1 leading-tight">{option.label}</span>
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
