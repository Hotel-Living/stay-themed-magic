
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
      <h2 className={`text-center font-medium ${isMobile ? "text-2xl" : "text-3xl"} mb-8 text-[#e3d6e9]`}>
        Experience Hotel-Living benefits:
      </h2>
      <div className="bg-[#460F54]/60 backdrop-blur-md rounded-xl p-6 border border-fuchsia-800/30 shadow-lg">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start mb-4">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FFF600] mr-3 mt-2 flex-shrink-0"></span>
            <p className="text-[#FFF600] text-xl md:text-2xl font-medium">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
