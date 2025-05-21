
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function JoinUsHeader() {
  const isMobile = useIsMobile();
  
  return (
    <header className="mb-16 text-center">
      <div className="flex justify-center mb-4">
        <h1 className={`
          ${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} 
          font-bold mb-4 text-[#FFF9B0] tracking-tight leading-tight
          bg-[#8017B0] py-2 px-8 rounded-lg inline-block
        `}>
          READY TO JOIN THE REVOLUTION?
        </h1>
      </div>
    </header>
  );
}
