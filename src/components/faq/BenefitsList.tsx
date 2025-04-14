
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CircleDot } from "lucide-react";

interface BenefitsListProps {
  benefits: string[];
}

export function BenefitsList({ benefits }: BenefitsListProps) {
  const isMobile = useIsMobile();

  return (
    <div className="glass-card backdrop-blur-lg bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl p-8 mb-16 shadow-lg">
      <h2 className={`${isMobile ? "text-3xl mb-8" : "text-2xl md:text-3xl mb-10"} font-bold text-center text-gradient animate-text-slow bg-clip-text text-transparent`}>
        Experience a Revolutionary Lifestyle
      </h2>
      
      <ul className="space-y-6 max-w-3xl mx-auto">
        {benefits.map((benefit, index) => (
          <li 
            key={index}
            className="flex items-center text-[#FFFBB3] hover:text-[#FFD700] transition-colors duration-300"
          >
            <CircleDot className="mr-3 text-yellow-500" fill="#FFC300" size={20} />
            <p className={`${isMobile ? "text-xl" : "text-base md:text-xl"} font-semibold text-left`}>
              {benefit}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
