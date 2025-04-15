
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FEF7CD] mr-2 mt-1.5 flex-shrink-0"></span>
            <p className="text-[#e3d6e9] hover:text-[#FEF7CD] transition-colors">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
