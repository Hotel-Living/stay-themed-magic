
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BenefitsListProps {
  benefits: string[];
  className?: string;
}

export function BenefitsList({ benefits, className = "" }: BenefitsListProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`mb-16 ${className}`}>
      <h2 className={`text-center font-bold ${isMobile ? "text-3xl" : "text-4xl"} mb-8 text-[#eedbf7] glow animate-text-slow`}>
        Experience the Benefits of Hotel-Living
      </h2>
      <div className="bg-[#460F54]/60 backdrop-blur-md rounded-xl p-6 border border-fuchsia-800/30 shadow-lg">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFF9B0] mr-3 mt-2 flex-shrink-0"></span>
            <p className="text-[#FFF9B0] text-sm md:text-base font-medium">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
